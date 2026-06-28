# TC-REGISTER-003: Email sai định dạng

**Requirement ID:** FR-01
**Test Type:** Domain Testing

### 1. Preconditions

- Người dùng đang ở trang Đăng ký, chưa đăng nhập.

### 2. Test Data (Inputs)

- Họ Tên: `Nguyễn Văn A`
- Email: `nguyenvana03@` (thiếu phần domain — không đúng định dạng `user@domain.com`)
- Mật khẩu: `Abcd123!`
- Xác nhận mật khẩu: `Abcd123!`

### 3. Test Steps

1. Mở trang Đăng ký.
2. Nhập Email sai định dạng (`nguyenvana03@`), nhập đầy đủ các trường còn lại theo Test Data.
3. Bấm nút "Đăng ký".

### 4. Expected Result

- Hệ thống hiển thị lỗi định dạng email.
- Không có tài khoản nào được tạo.
