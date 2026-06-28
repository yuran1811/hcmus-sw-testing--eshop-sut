# TC-MOBILE_LOGIN-002: Email để trống

**Requirement ID:** FR-20
**Test Type:** Domain Testing

### 1. Preconditions

- App Mobile đang ở màn hình Đăng nhập.
- Tài khoản không bị khóa.

### 2. Test Data (Inputs)

- Email: `` (để trống)
- Mật khẩu: `Test1234!` (hợp lệ)

### 3. Test Steps

1. Mở màn hình Đăng nhập.
2. Để trống Email, nhập Mật khẩu hợp lệ.
3. Bấm "Đăng nhập".

### 4. Expected Result

- Hệ thống hiển thị lỗi "Email là trường bắt buộc".
- Không gửi yêu cầu đăng nhập; bộ đếm sai không thay đổi.
