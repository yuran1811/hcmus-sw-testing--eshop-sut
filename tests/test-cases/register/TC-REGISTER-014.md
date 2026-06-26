# TC-REGISTER-014: Xác nhận mật khẩu để trống

**Requirement ID:** FR-01
**Test Type:** Domain Testing

### 1. Preconditions

- Người dùng đang ở trang Đăng ký, chưa đăng nhập.

### 2. Test Data (Inputs)

- Họ Tên: `Nguyễn Văn A`
- Email: `nguyenvana14@gmail.com`
- Mật khẩu: `Abcd123!` (hợp lệ)
- Xác nhận mật khẩu: `` (để trống)

### 3. Test Steps

1. Mở trang Đăng ký.
2. Nhập Mật khẩu là `Abcd123!`, để trống Xác nhận mật khẩu, nhập đầy đủ các trường còn lại theo Test Data.
3. Bấm nút "Đăng ký".

### 4. Expected Result

- Hệ thống hiển thị lỗi "Xác nhận mật khẩu là trường bắt buộc".
- Không có tài khoản nào được tạo.
