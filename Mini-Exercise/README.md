# Huong Dan Thuc Hanh Mini Exercise (API Testing)

Huong dan tung buoc de hoan thanh bai thuc hanh Mini Exercise. Doc ky [Mini_Exercise.md](Mini_Exercise.md) truoc khi bat dau.

## Muc luc

1. [Chuan bi moi truong](#1-chuan-bi-moi-truong)
2. [Khoi dong Server API (SUT)](#2-khoi-dong-server-api-sut)
3. [Chon API va Generate test case bang AI](#3-chon-api-va-generate-test-case-bang-ai)
4. [Audit va Extend](#4-audit-va-extend)
5. [Tao data file va cau hinh Postman](#5-tao-data-file-va-cau-hinh-postman)
6. [Chay Newman CLI](#6-chay-newman-cli)
7. [Tich hop CI/CD tren GitHub Actions](#7-tich-hop-cicd-tren-github-actions)
8. [Dong goi bai nop](#8-dong-goi-bai-nop)

---

## 1. Chuan bi moi truong

Kiem tra cac cong cu can thiet:

```bash
node --version    # Can Node.js 18 hoac 20 LTS
npm --version
git --version
newman --version  # Neu chua co: npm install -g newman
```

Clone repository nhom da fork tu `eshop-sut` va tao nhanh rieng:

```bash
git clone <URL-repo-nhom>
cd <ten-repo>
git checkout -b feature/<MSSV>
```

---

## 2. Khoi dong Server API (SUT)

Terminal 1 - khoi dong server:

```bash
cd backend
npm install       # Lan dau
npm run dev
```

Terminal 2 - kiem tra server hoat dong:

```bash
curl http://localhost:3000/api/products/1
```

Ket qua mong doi: tra ve JSON san pham iPhone 15 Pro Max (status 200).

---

## 3. Chon API va Generate test case bang AI

1. Chon 1 API tu bang trong [Mini_Exercise.md](Mini_Exercise.md#danh-sach-cac-api-de-chon-lua). Khong trung voi ban cung nhom.
2. Mo cong cu AI (ChatGPT, Claude, Gemini...) va mo ta API da chon: endpoint, method, request/response mau.
3. Yeu cau AI sinh >= 12 test case bao phu: domain partitions, state transitions (neu co), security, schema validation.
4. Tham khao [postman-contract-test-prompt-guide.md](postman-contract-test-prompt-guide.md) de viet prompt hieu qua.
5. Luu prompt va output AI vao file `test-design.md`.

---

## 4. Audit va Extend

1. Trong `test-design.md`, tao bang audit danh gia tung test case AI de xuat:

   | TC    | Nhan                                 | Nhan xet / Chinh sua |
   | ----- | ------------------------------------ | -------------------- |
   | AI-01 | `VALID`, `INVALID` hoac `INCOMPLETE` | ...                  |

2. Bo sung >= 2 test case AI da bo sot, giai thich vi sao AI thieu.

---

## 5. Tao data file va cau hinh Postman

### 5.1 Tao data file

Tao file `mini-categories.data.json` chua 5 test case tuong ung voi cac kich ban kiem thu cua `GET /api/categories`. Vi du:

```json
[
  {
    "tc_id": "GET_CAT_01",
    "description": "Lay danh sach danh muc hop le",
    "query_param": "",
    "expected_status": 200
  },
  {
    "tc_id": "GET_CAT_02",
    "description": "Truyen query param khong anh huong",
    "query_param": "?extra=true",
    "expected_status": 200
  },
  {
    "tc_id": "GET_CAT_03",
    "description": "Kiem tra accept header hop le",
    "query_param": "",
    "expected_status": 200
  },
  {
    "tc_id": "GET_CAT_04",
    "description": "Kiem tra schema kieu du lieu tra ve",
    "query_param": "",
    "expected_status": 200
  },
  {
    "tc_id": "GET_CAT_05",
    "description": "Kiem tra response time phai nhanh",
    "query_param": "",
    "expected_status": 200
  }
]
```

### 5.2 Cau hinh Postman

1. Mo Postman Desktop, tao Collection moi dat ten: `Eshop - Categories API`.
2. Tao Environment moi voi cac bien:
   - `baseUrl` = `http://localhost:3000`
   - `studentId` = `<MSSV>`
3. Them Pre-request Script vao Collection (tab Pre-request Script cap Collection):

   ```javascript
   pm.request.headers.upsert({
     key: "X-Student-Id",
     value: pm.environment.get("studentId"),
   });
   ```

4. Tao request `GET {{baseUrl}}/api/categories{{query_param}}` trong Collection. Viet assertions trong tab Tests:
   - Kiem tra status code tra ve trung voi `expected_status` tu data file:
     ```javascript
     pm.test("Status code is " + pm.variables.get("expected_status"), () => {
         pm.response.to.have.status(parseInt(pm.variables.get("expected_status")));
     });
     ```
   - Kiem tra response content-type:
     ```javascript
     pm.test("Content-Type is application/json", () => {
         pm.expect(pm.response.headers.get("Content-Type")).to.include("application/json");
     });
     ```
5. Chay Collection Runner voi file `mini-categories.data.json`. Dam bao ca 5 iteration deu pass.
6. Export:
   - Collection: `mini-categories.postman_collection.json`
   - Environment: `mini-local.postman_environment.json`

---

## 6. Chay Newman CLI

Chay lenh sau tai thu muc `Mini-Exercise`:

```bash
newman run mini-categories.postman_collection.json \
  -e mini-local.postman_environment.json \
  -d mini-categories.data.json \
  -r cli,json \
  --reporter-json-export mini-newman-report.json
```

Kiem tra:
- Cả 5 iteration deu pass.
- File `mini-newman-report.json` duoc tao.

---

## 7. Tich hop CI/CD tren GitHub Actions

### 7.1 Tao workflow

Tao file `.github/workflows/newman-api-test.yml` trong repository:

```yaml
name: Newman API tests

on:
  push:
    branches: [main, feature/*]
  workflow_dispatch: {}

jobs:
  test:
    runs-on: ubuntu-latest
    timeout-minutes: 10
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install backend dependencies
        working-directory: backend
        run: npm ci

      - name: Start SUT
        working-directory: backend
        run: |
          nohup npm run dev > /dev/null 2>&1 &
          for i in $(seq 1 30); do
            curl -fsS http://127.0.0.1:3000/api/products/1 > /dev/null && break
            sleep 1
          done

      - name: Install Newman
        run: npm install -g newman

      - name: Run Newman
        run: |
          newman run Mini-Exercise/mini-categories.postman_collection.json \
            -e Mini-Exercise/mini-local.postman_environment.json \
            -d Mini-Exercise/mini-categories.data.json \
            -r cli,json \
            --reporter-json-export Mini-Exercise/mini-newman-report.json
```

### 7.2 Commit pass

```bash
git add Mini-Exercise/ .github/workflows/
git commit -m "feat: add API test for categories"
git push origin feature/<MSSV>
```

Kiem tra tab Actions tren GitHub: pipeline xanh. Chup anh luu `ci-pass.png`.

### 7.3 Commit fail (co chu dich)

Sua `expected_status` cua 1 test case trong file `mini-categories.data.json` o local tu `200` sang `999`. Commit va push. Kiem tra pipeline do. Chup anh luu `ci-fail.png`.

### 7.4 Khoi phuc

Sua lai ve `200`, commit va push. Pipeline phai xanh tro lai.

---

## 8. Dong goi bai nop

Tao file `test-design.md` gom:
- Prompt da gui cho AI
- Output AI (rut gon)
- Bang Audit
- Test case tu bo sung (Extend)
- Bang Postman features

Nen zip voi ten `<MSSV>_Mini_API_Testing.zip`:

1. `test-design.md`
2. `mini-categories.data.json`
3. `mini-categories.postman_collection.json`
4. `mini-local.postman_environment.json`
5. `mini-newman-report.json`
6. `newman-api-test.yml`
7. `ci-pass.png`
8. `ci-fail.png`
