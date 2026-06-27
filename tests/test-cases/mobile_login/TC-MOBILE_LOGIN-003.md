# TC-MOBILE_LOGIN-003: Email sai định dạng

**Requirement ID:** FR-20
**Test Type:** Domain Testing

### 1. Preconditions

- App Mobile đang ở màn hình Đăng nhập.
- Tài khoản không bị khóa.

### 2. Test Data (Inputs)

- Email: `test@` (sai định dạng email)
- Mật khẩu: `Test1234!` (hợp lệ)

### 3. Test Steps

1. Mở màn hình Đăng nhập.
2. Nhập Email sai định dạng (`test@`), nhập Mật khẩu hợp lệ.
3. Bấm "Đăng nhập".

### 4. Expected Result

- Hệ thống hiển thị lỗi định dạng email (validate bằng logic ứng dụng vì Mobile không có `type="email"`).
- Không thực hiện đăng nhập.
