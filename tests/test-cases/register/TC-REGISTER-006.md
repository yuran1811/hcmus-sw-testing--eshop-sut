# TC-REGISTER-006: Mật khẩu ít hơn 8 ký tự (biên dưới không hợp lệ)

**Requirement ID:** FR-01
**Test Type:** Domain Testing

### 1. Preconditions

- Người dùng đang ở trang Đăng ký, chưa đăng nhập.

### 2. Test Data (Inputs)

- Họ Tên: `Nguyễn Văn A`
- Email: `nguyenvana06@gmail.com`
- Mật khẩu: `Aa1!aa2` (7 ký tự — vẫn đủ chữ hoa/thường/số/ký tự đặc biệt, chỉ vi phạm độ dài)
- Xác nhận mật khẩu: `Aa1!aa2`

### 3. Test Steps

1. Mở trang Đăng ký.
2. Nhập Mật khẩu và Xác nhận mật khẩu đều là `Aa1!aa2` (7 ký tự), nhập đầy đủ các trường còn lại theo Test Data.
3. Bấm nút "Đăng ký".

### 4. Expected Result

- Hệ thống hiển thị lỗi định dạng mật khẩu (yêu cầu tối thiểu 8 ký tự).
- Không có tài khoản nào được tạo.
