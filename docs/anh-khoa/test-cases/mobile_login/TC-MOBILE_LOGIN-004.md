# TC-MOBILE_LOGIN-004: Mật khẩu để trống

**Requirement ID:** FR-20
**Test Type:** Domain Testing

### 1. Preconditions

- App Mobile đang ở màn hình Đăng nhập.
- Tài khoản không bị khóa.

### 2. Test Data (Inputs)

- Email: `test@eshop.com` (hợp lệ)
- Mật khẩu: `` (để trống)

### 3. Test Steps

1. Mở màn hình Đăng nhập.
2. Nhập Email hợp lệ, để trống Mật khẩu.
3. Bấm "Đăng nhập".

### 4. Expected Result

- Hệ thống hiển thị lỗi "Mật khẩu là trường bắt buộc".
- Không gửi yêu cầu đăng nhập; bộ đếm sai không thay đổi.
