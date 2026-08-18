---
name: postman-newman-builder
description: Chuyển bộ test case API thành Postman collection chạy được - sinh pm.test script, pre-request script gắn header X-Student-Id, environment, biến chuỗi request E2E, data-driven run bằng CSV, rồi chạy Newman xuất HTML report và liệt kê Postman features đã dùng. LUÔN dùng skill này khi người dùng nhắc tới "Postman collection", "pm.test", "Newman", "chạy test API", "collection runner", "data-driven test", "newman html report", hoặc muốn biến bảng test case thành script thực thi.
---

# Postman & Newman Builder

Chuyển bộ test case đã audit thành collection chạy được, chạy bằng Newman, xuất báo cáo HTML. Đây là bước **Execute** của HW06 và cũng là nơi tích luỹ bằng chứng thực thi mà TA kiểm tra.

Hai ràng buộc từ đề bài phải luôn thoả mãn:

1. **Mọi request** mang header `X-Student-Id: {StudentID}` — cài qua pre-request script ở cấp collection, kèm `console.log` để chụp màn hình làm bằng chứng (mục 11).
2. Newman chạy trên deployment thật của SUT, hostname là `localhost` / `127.0.0.1` — **không được bịa output**. Nếu SUT chưa chạy được, dừng lại và báo người dùng dựng SUT trước, đừng sinh report giả.

## Input cần có

- File `TC_<API>.csv` đã audit (có cột `AuditLabel`, `Source`)
- `baseUrl` của deployment local, ví dụ `http://localhost:3000`
- Student ID thật
- Tài khoản test: 1 user thường, 1 user thứ hai (cho case IDOR), 1 admin

## Cấu trúc collection

Tổ chức theo API rồi theo category — cấu trúc này khiến Newman report đọc được như bản đồ coverage:

```
EShop API Testing - HW06 (collection)
├── [pre-request script cấp collection: X-Student-Id + console.log]
├── 00 - Setup
│   ├── Login as user A      -> lưu {{tokenUserA}}
│   ├── Login as user B      -> lưu {{tokenUserB}}
│   └── Login as admin       -> lưu {{adminToken}}
├── API1 - <Pool A endpoint>
│   ├── FN - happy path
│   ├── DP - domain partition
│   ├── ST - state transition
│   ├── SEC - security
│   └── SCH - schema validation
├── API2 - <Pool B endpoint>
├── API3 - <Pool C endpoint>
└── 99 - Teardown  (xoá dữ liệu test đã tạo)
```

Folder `00 - Setup` chạy đầu tiên nên đặt tiền tố số — Newman chạy theo thứ tự trong collection.

## Sinh script

Đọc `references/pm-script-patterns.md` để lấy mẫu cho từng loại test (status, response time, JSON schema, negative, security, IDOR, chuỗi E2E, data-driven). Các quy tắc chính:

- Một `pm.test` kiểm một điều. Gộp schema và giá trị nghiệp vụ vào cùng một test thì khi fail không biết hỏng ở đâu.
- Tên test dùng tiền tố `Functional:` / `Contract:` / `Security:` / `Performance:` và **chứa TC_ID** để map ngược về bảng test case: `Functional: [TC-A-LOGIN-DP-003] Rejects malformed email`.
- Với case security, luôn có assert phủ định (`expect(body).to.not.have.property('passwordHash')`), không chỉ assert status.
- Không hard-code id/token trong request — dùng biến collection/environment để chạy lại được nhiều lần.
- Dữ liệu tạo mới dùng giá trị động (`{{$timestamp}}`, `{{$randomEmail}}`) để tránh vướng unique constraint khi chạy lần 2.

## Biến và môi trường

| Loại biến | Dùng cho | Ví dụ |
|---|---|---|
| Environment | Khác nhau giữa local/CI | `baseUrl`, `studentId` |
| Collection | Dùng chung, không đổi giữa môi trường | `userEmailA`, `adminEmail` |
| Runtime (set trong script) | Sinh ra khi chạy | `tokenUserA`, `orderId`, `productId` |

Không đặt mật khẩu thật hay token dài hạn vào file environment rồi commit lên GitHub public. Dùng `secret` type trong Postman, và trong CI dùng GitHub Secrets — collection nộp kèm phải sạch credential.

## Data-driven run

Đề bài khuyến khích dùng Collection Runner với data file. Cách làm gọn nhất: gom nhóm DP của một tham số thành **một request duy nhất** đọc dữ liệu từ CSV.

```
newman run collection.json -e env.json -d data/login-dp.csv --reporters cli,htmlextra
```

File CSV cần cột `expectedStatus` để script assert động — mẫu ở `assets/data-file-template.csv`. Lưu ý: mỗi dòng CSV vẫn phải map được về một TC_ID (thêm cột `tcId`), nếu không sẽ mất truy vết giữa báo cáo và bảng test case.

## Chạy Newman

```bash
npm install -g newman newman-reporter-htmlextra

newman run collections/eshop-hw06.postman_collection.json \
  -e envs/local.postman_environment.json \
  -d data/login-dp.csv \
  --reporters cli,htmlextra,json \
  --reporter-htmlextra-export reports/newman-report.html \
  --reporter-json-export reports/newman-report.json \
  --timeout-request 10000
```

`htmlextra` cho report đẹp và có phân nhóm folder; `json` để trích số liệu vào bảng tổng kết README.

Sau khi chạy, tổng hợp bảng này (đề bài yêu cầu trong README):

| API | Case sinh bởi AI | Case tự thêm | Đã chạy | Pass | Fail | Bug phát hiện |
|---|---|---|---|---|---|---|

Nếu có case fail, **không sửa test cho pass**. Phân loại trước: SUT có bug hay test sai (dùng skill `api-testcase-auditor` phần 3).

## Bằng chứng cần chụp màn hình

Chuẩn bị sẵn khi chạy, vì đây là thứ TA kiểm:

1. Console Postman/Newman hiển thị dòng log `X-Student-Id: <ID>` từ pre-request script
2. Newman CLI output có hostname `localhost`/`127.0.0.1` và summary table
3. Report HTML mở trong trình duyệt
4. Collection Runner với data file (nếu dùng)

## Liệt kê Postman features đã dùng

Đề bài chấm phần này riêng. Dùng `references/postman-features-checklist.md` để đánh dấu những gì thực sự đã dùng và viết một dòng mô tả **dùng vào việc gì** cho mỗi feature — liệt kê suông không có giá trị. Chỉ ghi feature đã dùng thật; kê khai feature không dùng là rủi ro khi bị hỏi trong oral defense.

## Tài nguyên kèm theo

- `references/pm-script-patterns.md` — mẫu pm.test cho từng loại test
- `references/postman-features-checklist.md` — danh sách feature + gợi ý áp dụng
- `assets/pre-request-student-id.js` — script gắn header cấp collection
- `assets/data-file-template.csv` — mẫu data file cho data-driven run
