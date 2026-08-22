# BUG-REGISTER-002: Mật khẩu được lưu và trả về dưới dạng plaintext (không hash)

## Found by Test Case

Không có TC_ID chính thức trong bộ 3 API đã chọn cho HW06 (`register`/`cart`/`admin/users`) — phát hiện qua thao tác probe thủ công `POST /api/login` khi chuẩn bị token cho Postman collection (endpoint `login` thuộc FR-02, không nằm trong phạm vi 3 API được chọn). Ghi nhận riêng vì mức độ nghiêm trọng cao và liên quan trực tiếp tới `POST /api/register` (nơi mật khẩu được tạo ra).

## Requirement liên quan

SEC-01 ("Mật khẩu **không** được lưu dưới dạng plaintext")

## Severity / Priority

Critical / P0

## Environment

- Tool: curl
- Backend: Node.js + Express + SQLite, chạy local tại `http://localhost:3000`
- Build: nhánh `hw06/23127211`, commit `47748c1`

## Steps to reproduce

1. Đăng ký hoặc dùng tài khoản có sẵn (`test@eshop.com` / `Test1234!`).
2. Gọi `POST /api/login` với đúng thông tin đó.

```bash
curl -s -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@eshop.com","password":"Test1234!"}'
```

## Expected result

Response chỉ chứa `token` và thông tin user tối thiểu (không có field `password`/`passwordHash`). Mật khẩu trong DB phải là chuỗi hash (bcrypt/argon2...), không phải chuỗi gốc người dùng nhập.

## Actual result

Response trả về nguyên văn mật khẩu dưới dạng **plaintext** trong object `user`:

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 2,
    "name": "Test User",
    "email": "test@eshop.com",
    "password": "Test1234!",
    "role": "user",
    "login_attempts": 0,
    "locked_until": null,
    "reset_token": null,
    "shipping_address": null,
    "phone": null
  }
}
```

## Evidence

Console output ở trên (chạy trực tiếp trên deployment local, không bịa).

## Notes

Đọc `backend/server.js` xác nhận nguyên nhân gốc, cả ở `POST /api/register` (dòng ~21-24: `INSERT INTO users (name, email, password) VALUES (?, ?, ?)` — insert thẳng password gốc, không gọi `bcrypt.hash`) và `POST /api/login` (dòng ~46: so sánh `user.password === password` — so sánh plaintext trực tiếp, không dùng `bcrypt.compare`). Đây là 2 vi phạm SEC-01 riêng biệt nhưng cùng gốc:

1. **Lưu trữ**: mật khẩu nằm trong DB dưới dạng plaintext (`database.sqlite`) — ai truy cập được file DB (hoặc bất kỳ lỗi injection/backup rò rỉ nào khác) sẽ có toàn bộ mật khẩu người dùng dưới dạng đọc được ngay.
2. **Rò rỉ qua API**: response `POST /api/login` trả nguyên mật khẩu ra ngoài, dù client không cần thông tin này để hoạt động.

Đây là 1 trong những bug nghiêm trọng nhất tìm được trong đợt test — nên ưu tiên sửa cả 2 điểm (hash khi lưu + loại field `password` khỏi mọi response) trước khi triển khai bất kỳ đâu ngoài môi trường demo.
