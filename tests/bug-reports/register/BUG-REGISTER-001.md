# BUG-REGISTER-001: POST /api/register hầu như không validate input

## Found by Test Case

TC-A-REGISTER-DP-001, DP-002, DP-003, DP-004, DP-008, DP-009, DP-010, DP-011, DP-012, DP-015, DP-017, DP-018, DP-019, DP-020, DP-021, SEC-001, ST-002, ST-003

## Requirement liên quan

FR-01 (Đăng ký tài khoản — bắt buộc Họ Tên, email đúng định dạng và **duy nhất**, password tối thiểu 8 ký tự có đủ hoa/thường/số/ký tự đặc biệt)

## Severity / Priority

Major / P1

## Environment

- Tool: curl / Postman + Newman
- Backend: Node.js + Express + SQLite, chạy local tại `http://localhost:3000`
- Build: nhánh `hw06/23127211`, commit `47748c1`

## Steps to reproduce

**Kịch bản A — email trùng (TC-A-REGISTER-ST-002/003):**

```bash
curl -s -w "\nSTATUS:%{http_code}\n" -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Dup","email":"test@eshop.com","password":"Password123!"}'
```

**Kịch bản B — name rỗng/null/number (TC-A-REGISTER-DP-001/003/004):**

```bash
curl -s -w "\nSTATUS:%{http_code}\n" -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"","email":"a1@domain.com","password":"Password123!"}'
```

**Kịch bản C — email sai định dạng (TC-A-REGISTER-DP-008):**

```bash
curl -s -w "\nSTATUS:%{http_code}\n" -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"X","email":"abcdomain.com","password":"Password123!"}'
```

**Kịch bản D — password yếu, thiếu ký tự đặc biệt/hoa/số (TC-A-REGISTER-DP-015/017/018/019/020):**

```bash
curl -s -w "\nSTATUS:%{http_code}\n" -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"X","email":"a2@domain.com","password":"weak"}'
```

## Expected result

- Kịch bản A: `400`/`409` — email đã tồn tại, từ chối tạo tài khoản trùng.
- Kịch bản B/C/D: `400` — dữ liệu không hợp lệ, từ chối tạo tài khoản.

## Actual result

Cả 4 kịch bản đều trả **`200 OK`**, tài khoản vẫn được tạo thành công không có bất kỳ validation nào:

```
STATUS:200  {"message":"User registered successfully","id":4}   (email trùng test@eshop.com)
```

Toàn bộ 15+ test case domain-partition tương ứng (name rỗng/null/number/quá dài, email sai định dạng, password thiếu hoa/thường/số/ký tự đặc biệt/ngắn hơn 8 ký tự) đều pass với cùng nguyên nhân: server insert thẳng dữ liệu vào bảng `users` mà không qua bước validate nào.

## Evidence

- `tests/postman/reports/newman-report.json` — 18 assertion FAIL trong folder `API1 - POST /api/register / DP - Domain partition` và `SEC - Security`, cùng message dạng `expected response to have status code 400 but got 200`.
- Console output ở trên (chạy trực tiếp, không bịa).

## Notes

Đọc `backend/server.js` (dòng ~21-24) xác nhận nguyên nhân gốc: `INSERT INTO users (name, email, password) VALUES (?, ?, ?)` chạy thẳng với dữ liệu client gửi, không có bước kiểm tra định dạng/độ dài/độ phức tạp nào trước đó, và không có ràng buộc `UNIQUE` trên cột `email` ở schema (`backend/database.js`).

Bug này còn kéo theo hệ quả dây chuyền sang endpoint khác — xem BUG-ADMUSER-003 (dữ liệu `name: null` tạo được ở đây bị lộ nguyên vẹn khi admin xem danh sách user).
