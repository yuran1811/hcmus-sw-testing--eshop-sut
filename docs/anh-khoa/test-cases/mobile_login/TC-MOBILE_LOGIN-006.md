# TC-MOBILE_LOGIN-006: Email đã đăng ký nhưng sai mật khẩu

**Requirement ID:** FR-20
**Test Type:** Domain Testing

### 1. Preconditions

- App Mobile đang ở màn hình Đăng nhập.
- Tồn tại tài khoản `test@eshop.com` / `Test1234!`.
- Tài khoản không bị khóa (bộ đếm sai = 0).

### 2. Test Data (Inputs)

- Email: `test@eshop.com` (hợp lệ, đã đăng ký)
- Mật khẩu: `WrongPass1!` (sai mật khẩu)

### 3. Test Steps

1. Mở màn hình Đăng nhập.
2. Nhập đúng Email nhưng sai Mật khẩu.
3. Bấm "Đăng nhập".

### 4. Expected Result

- Hệ thống trả về lỗi đăng nhập **chung chung** (không lộ rằng email đúng/mật khẩu sai — theo FR-02).
- Bộ đếm đăng nhập sai tăng đúng 1 đơn vị.
