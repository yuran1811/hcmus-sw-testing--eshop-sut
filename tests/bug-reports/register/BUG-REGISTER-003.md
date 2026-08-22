# BUG-REGISTER-003: POST /api/register trả lỗi 500 khi Content-Type: text/plain kèm JSON body

## Found by Test Case

TC-A-REGISTER-SEC-008

## Requirement liên quan

api_specification.md mục 1.1 (đăng ký tài khoản) — không có mục nào của spec cho phép server crash (500) với bất kỳ input nào

## Severity / Priority

Minor / P2

## Environment

- Tool: Postman + Newman
- Backend: Node.js + Express + SQLite, chạy local tại `http://localhost:3000`
- Build: nhánh `hw06/23127211`, commit `47748c1`

## Steps to reproduce

```bash
curl -s -w "\nSTATUS:%{http_code}\n" -X POST http://localhost:3000/api/register \
  -H "Content-Type: text/plain" \
  -d '{"name":"Sec G","email":"sec008test@domain.com","password":"Password123!"}'
```

## Expected result

`400` (body không parse được theo Content-Type khai báo) hoặc `415 Unsupported Media Type`. Không được là lỗi 500.

## Actual result

Trả về `500 Internal Server Error` — exception không được xử lý (unhandled exception), do middleware parse body không hỗ trợ `Content-Type: text/plain` nhưng code phía sau vẫn cố truy cập `req.body.name`/`req.body.email` như thể đã parse thành công.

## Evidence

`tests/postman/reports/newman-report.json` — request `[TC-A-REGISTER-SEC-008]`, assertion `Security: [TC-A-REGISTER-SEC-008] Trả về 1 trong các status hợp lệ [400,415]` FAIL với message `expected [ 400, 415 ] to include 500`.

## Notes

Lỗi 500 là dấu hiệu code không có try/catch hoặc validation middleware bảo vệ route — ngoài vấn đề trải nghiệm xấu, response 500 mặc định của Express có thể vô tình lộ stack trace (cần kiểm tra thêm nội dung body của response 500 này khi viết bug fix để xác nhận có lộ thông tin nhạy cảm không).
