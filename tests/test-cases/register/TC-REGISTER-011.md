# TC-REGISTER-011: Mật khẩu có ký tự đặc biệt nằm ngoài tập cho phép

**Requirement ID:** FR-01
**Test Type:** Domain Testing

### 1. Preconditions

- Người dùng đang ở trang Đăng ký, chưa đăng nhập.

### 2. Test Data (Inputs)

- Họ Tên: `Nguyễn Văn A`
- Email: `nguyenvana11@gmail.com`
- Mật khẩu: `Abcd1234#` (9 ký tự, đủ hoa/thường/số; ký tự đặc biệt `#` **không** thuộc tập cho phép `@ $ ! % * ? &`)
- Xác nhận mật khẩu: `Abcd1234#`

### 3. Test Steps

1. Mở trang Đăng ký.
2. Nhập Mật khẩu và Xác nhận mật khẩu đều là `Abcd1234#`, nhập đầy đủ các trường còn lại theo Test Data.
3. Bấm nút "Đăng ký".

### 4. Expected Result

- Theo đặc tả FR-01, chỉ ký tự đặc biệt trong tập `@ $ ! % * ? &` được công nhận; `#` nằm ngoài tập này nên mật khẩu bị coi là **không có ký tự đặc biệt hợp lệ**.
- Hệ thống phải hiển thị lỗi định dạng mật khẩu và không tạo tài khoản.
- _Ghi chú kiểm thử:_ Nếu hệ thống chấp nhận mật khẩu này → implementation nới lỏng tập ký tự đặc biệt so với đặc tả (điểm không tuân thủ cần ghi nhận).
