# TC-REGISTER-005: Email để trống

**Requirement ID:** FR-01
**Test Type:** Domain Testing

### 1. Preconditions

- Người dùng đang ở trang Đăng ký, chưa đăng nhập.

### 2. Test Data (Inputs)

- Họ Tên: `Nguyễn Văn A`
- Email: `` (để trống)
- Mật khẩu: `Abcd123!`
- Xác nhận mật khẩu: `Abcd123!`

### 3. Test Steps

1. Mở trang Đăng ký.
2. Để trống trường Email, nhập đầy đủ các trường còn lại theo Test Data.
3. Bấm nút "Đăng ký".

### 4. Expected Result

- Hệ thống hiển thị lỗi "Email là trường bắt buộc".
- Không có tài khoản nào được tạo.
