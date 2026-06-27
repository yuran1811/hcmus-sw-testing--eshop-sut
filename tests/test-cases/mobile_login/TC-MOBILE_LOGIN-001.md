# TC-MOBILE_LOGIN-001: Đăng nhập thành công với thông tin hợp lệ

**Requirement ID:** FR-20
**Test Type:** Domain Testing

### 1. Preconditions

- App Mobile đang ở màn hình Đăng nhập.
- Tồn tại tài khoản hợp lệ `test@eshop.com` / `Test1234!` (tài khoản test mặc định theo README).
- Tài khoản không bị khóa (bộ đếm sai = 0).

### 2. Test Data (Inputs)

- Email: `test@eshop.com` (đúng định dạng, đã đăng ký)
- Mật khẩu: `Test1234!` (đúng mật khẩu)

### 3. Test Steps

1. Mở màn hình Đăng nhập trên app.
2. Nhập Email và Mật khẩu hợp lệ.
3. Bấm "Đăng nhập".

### 4. Expected Result

- Đăng nhập thành công; hệ thống trả về JWT Token và lưu phía client.
- App chuyển vào màn hình chính.
- Các request có xác thực sau đó gửi kèm header `Authorization: Bearer <token>`.
