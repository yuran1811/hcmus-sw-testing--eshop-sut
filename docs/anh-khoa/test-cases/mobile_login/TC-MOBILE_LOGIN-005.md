# TC-MOBILE_LOGIN-005: Email đúng định dạng nhưng chưa đăng ký

**Requirement ID:** FR-20
**Test Type:** Domain Testing

### 1. Preconditions

- App Mobile đang ở màn hình Đăng nhập.
- Không tồn tại tài khoản `notexist@eshop.com` trong hệ thống.
- Tài khoản không bị khóa.

### 2. Test Data (Inputs)

- Email: `notexist@eshop.com` (đúng định dạng, chưa đăng ký)
- Mật khẩu: `Test1234!` (định dạng hợp lệ)

### 3. Test Steps

1. Mở màn hình Đăng nhập.
2. Nhập Email chưa đăng ký và một mật khẩu.
3. Bấm "Đăng nhập".

### 4. Expected Result

- Hệ thống trả về lỗi đăng nhập **chung chung** (không nêu rõ là sai email hay sai mật khẩu — theo FR-02).
- Bộ đếm đăng nhập sai tăng đúng 1 đơn vị.
