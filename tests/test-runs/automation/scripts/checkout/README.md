# Checkout (FR-08) — Playwright Automation Test Suite

> **Student:** Mạch Quốc Tấn — MSSV: **23127115**  
> **Assignment:** Homework 04 — Automation Testing  
> **Feature:** FR-08 Checkout  
> **Course:** CS423 / CSC15003 — Software Testing

---

## Tổng quan

Bộ kiểm thử tự động này bao phủ toàn bộ **22 test case** cho tính năng Checkout (FR-08) của EShop SUT, được tổ chức thành 3 file spec:

| File spec                    | Test cases                | Kỹ thuật                 |
| ---------------------------- | ------------------------- | ------------------------ |
| `tests/checkout-api.spec.ts` | TC-CHECKOUT-001 → 015     | Equivalence Partitioning |
| `tests/checkout-ui.spec.ts`  | TC-CHECKOUT-011, 012      | EP (Web UI)              |
| `tests/checkout-bva.spec.ts` | TC-CHECKOUT-BVA-001 → 007 | Boundary Value Analysis  |

### Assertion patterns được dùng (≥ 3 loại theo yêu cầu đề)

| Pattern | Loại                      | Ví dụ trong script                                                   |
| ------- | ------------------------- | -------------------------------------------------------------------- |
| 1       | Trạng thái HTTP / phần tử | `expect(resp.status()).toBe(200)`, `toBeVisible()`, `toBeDisabled()` |
| 2       | Nội dung / giá trị trường | `toContain('Checkout successful')`, `toBe('pending')`                |
| 3       | Soft assertion            | `expect.soft(order.total_amount).toBe(10000000)`                     |
| 4       | Mạng / API response       | `request.post(...)`, kiểm tra `status()` và `json()`                 |
| 5       | Số lượng / đếm phần tử    | `toHaveLength(0)`, `toHaveLength(2)`                                 |

---

## Yêu cầu môi trường

| Phần mềm         | Phiên bản tối thiểu     |
| ---------------- | ----------------------- |
| Node.js          | ≥ 18.x                  |
| npm              | ≥ 9.x (hoặc pnpm ≥ 8.x) |
| @playwright/test | ^1.49.1                 |

### Dịch vụ cần chạy trước khi test

| Dịch vụ          | URL mặc định            | Ghi chú                              |
| ---------------- | ----------------------- | ------------------------------------ |
| **Backend API**  | `http://localhost:3000` | Express.js backend                   |
| **Frontend Web** | `http://localhost:5173` | Vite frontend (chỉ cần cho UI tests) |

---

## Cài đặt

```bash
# 1. Di chuyển vào thư mục này
cd tests/scripts/checkout

# 2. Cài đặt dependencies
npm install

# 3. Cài browser binaries (lần đầu)
npx playwright install
```

---

## Chạy test

### Chạy toàn bộ (3 browsers: Chromium, Firefox, WebKit)

```bash
npm test
# hoặc
npx playwright test
```

### Chạy theo browser riêng lẻ

```bash
npm run test:chromium       # Chỉ Chromium
npm run test:firefox        # Chỉ Firefox
npm run test:webkit         # Chỉ WebKit (Safari engine)
```

### Chạy theo file spec riêng lẻ

```bash
npm run test:api            # Chỉ API tests (TC-001 → TC-015)
npm run test:bva            # Chỉ BVA tests (BVA-001 → BVA-007)
npm run test:ui             # Chỉ UI tests (TC-011, TC-012)
```

### Chạy với output chi tiết

```bash
npx playwright test --reporter=list,html
```

### Mở HTML Report

```bash
npm run report
# hoặc
npx playwright show-report
```

Report được sinh ra tại `playwright-report/index.html`.  
Tiêu đề report sẽ hiển thị: **"Run by: 23127115 (Mạch Quốc Tấn)"** kèm ISO timestamp.

---

## Cấu trúc thư mục

```
tests/scripts/checkout/
├── package.json                      # Dependencies & npm scripts
├── playwright.config.ts              # Multi-browser config, student metadata
├── tsconfig.json                     # TypeScript config
│
├── pages/
│   └── CheckoutPage.ts               # Page Object Model (API helper + Web UI)
│
├── data/
│   └── checkout-test-data.json       # Test data cho tất cả test cases
│
├── tests/
│   ├── checkout-api.spec.ts          # TC-001–015 (Equivalence Partitioning, API)
│   ├── checkout-ui.spec.ts           # TC-011, 012 (Web UI tests)
│   └── checkout-bva.spec.ts          # BVA-001–007 (Boundary Value Analysis)
│
└── playwright-report/                # (tự sinh sau khi chạy)
    └── index.html
```

---

## Tài khoản test mặc định

Bộ test sẽ tự **đăng ký** hai tài khoản khi khởi chạy (nếu chưa tồn tại):

| Tài khoản | Email               | Password       |
| --------- | ------------------- | -------------- |
| User A    | `user_a@eshop.test` | `Password123!` |
| User B    | `user_b@eshop.test` | `Password123!` |

> **Lưu ý:** Nếu backend đã có tài khoản trùng email, bước đăng ký sẽ bỏ qua (ignore 400) và tiến hành đăng nhập bình thường.

---

## Thiết lập thủ công (nếu cần)

Nếu muốn dùng tài khoản có sẵn, chỉnh sửa file `data/checkout-test-data.json`:

```json
{
  "users": {
    "userA": {
      "email": "your_account@domain.com",
      "password": "YourPassword",
      "name": "Your Name"
    }
  }
}
```

---

## Lưu ý về thứ tự chạy test

- Tests được cấu hình chạy **tuần tự** (`fullyParallel: false`, `workers: 1`) để tránh race condition trên cart state chia sẻ giữa các test.
- Mỗi test tự **reset cart** trước khi thực thi (gọi `DELETE /api/cart` hoặc checkout để làm trống giỏ).
- Các test characterization (`TC-008`, `TC-009`, `TC-010`, `TC-013`) dùng `expect.soft()` vì SRS chưa định nghĩa hành vi bắt buộc — các test này **ghi nhận hành vi thực tế** thay vì áp đặt một kết quả cụ thể.

---

## Kết quả mong đợi và bugs đã biết

| Test ID                     | Expected                          | Status   | Bug                   |
| --------------------------- | --------------------------------- | -------- | --------------------- |
| TC-CHECKOUT-001             | 200 + cart cleared                | **FAIL** | BUG-CHECKOUT-001, 002 |
| TC-CHECKOUT-002             | 401 Unauthorized                  | Pass     | —                     |
| TC-CHECKOUT-003             | 400 Empty cart                    | **FAIL** | BUG-CHECKOUT-003      |
| TC-CHECKOUT-004             | 400 or 200 w/ server total        | **FAIL** | BUG-CHECKOUT-004      |
| TC-CHECKOUT-005             | 200 + address preserved           | Not Run  | —                     |
| TC-CHECKOUT-006             | 200 + Unicode address OK          | Not Run  | —                     |
| TC-CHECKOUT-007             | XSS safe (no alert)               | Not Run  | —                     |
| TC-CHECKOUT-008             | 200 or 400, no 500                | Not Run  | —                     |
| TC-CHECKOUT-009             | 200 or 400, no 500                | Not Run  | —                     |
| TC-CHECKOUT-010             | 200 or 400, no `[object Object]`  | Not Run  | —                     |
| TC-CHECKOUT-011             | All product rows visible          | Not Run  | —                     |
| TC-CHECKOUT-012             | Total read-only, backend enforces | Not Run  | —                     |
| TC-CHECKOUT-013             | 200, backend computes total       | Not Run  | —                     |
| TC-CHECKOUT-014             | Forged items rejected             | Not Run  | —                     |
| TC-CHECKOUT-015             | Only actor's cart cleared         | Not Run  | —                     |
| TC-CHECKOUT-BVA-001         | 200 + 1-item cart success         | **FAIL** | BUG-CHECKOUT-001      |
| TC-CHECKOUT-BVA-002         | 400 or 200 w/ server total        | **FAIL** | BUG-CHECKOUT-004      |
| TC-CHECKOUT-BVA-003         | 400 or 200 w/ server total        | **FAIL** | BUG-CHECKOUT-004      |
| TC-CHECKOUT-BVA-004         | No 500; 200 or 400                | Not Run  | —                     |
| TC-CHECKOUT-BVA-005         | No 500; 200 or 400                | Not Run  | —                     |
| TC-CHECKOUT-BVA-006         | No 500, no truncation             | Not Run  | —                     |
| TC-CHECKOUT-BVA-007 (A/B/C) | No 500, no truncation             | Not Run  | —                     |

---

## Tham khảo thêm

- [Playwright Docs](https://playwright.dev/docs/intro)
- [API Specification EShop](../../api_specification.md)
- [Test Cases Checkout](../../test-cases/checkout/)
- [Bug Reports](../../../docs/report/)
