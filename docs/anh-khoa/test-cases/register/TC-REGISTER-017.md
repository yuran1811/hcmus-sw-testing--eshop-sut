# TC-REGISTER-017: SEC-01 — Mật khẩu được lưu dạng hash, không phải plaintext

**Requirement ID:** FR-01 (SEC-01)
**Test Type:** Security / White-box (kiểm tra lưu trữ CSDL)

### 1. Preconditions

- Có quyền truy cập CSDL backend (SQLite) để kiểm tra bảng `users`.
- Email `sec01.check@gmail.com` chưa tồn tại trong hệ thống.

### 2. Test Data (Inputs)

- Họ Tên: `Nguyễn Văn A`
- Email: `sec01.check@gmail.com`
- Mật khẩu: `Abcd123!`
- Xác nhận mật khẩu: `Abcd123!`

### 3. Test Steps

1. Đăng ký tài khoản mới với dữ liệu hợp lệ ở trên.
2. Truy vấn bản ghi vừa tạo trong bảng `users` của CSDL.
3. Đối chiếu giá trị trường mật khẩu lưu trong CSDL với chuỗi `Abcd123!` đã nhập.

### 4. Expected Result

- Trường mật khẩu trong CSDL là **chuỗi đã băm (hash)** — ví dụ bcrypt có tiền tố `$2a$`/`$2b$`/`$2y$` — **khác hoàn toàn** với plaintext `Abcd123!`.
- Không có bất kỳ nơi nào lưu mật khẩu dưới dạng plaintext (tuân thủ SEC-01).
- _Lưu ý phạm vi:_ đây là kiểm thử hộp trắng, bổ trợ cho bộ Domain/BVA (vốn chỉ kiểm hộp đen tầng nhập liệu).
