# TC-MOBILE_LOGIN-007: Bộ đếm tăng đúng 1 đơn vị sau mỗi lần sai

**Requirement ID:** FR-20
**Test Type:** Domain Testing

### 1. Preconditions

- App Mobile đang ở màn hình Đăng nhập.
- Tồn tại tài khoản `test@eshop.com` / `Test1234!`.
- Tài khoản không bị khóa, bộ đếm sai = 0.

### 2. Test Data (Inputs)

- Email: `test@eshop.com` (hợp lệ)
- Mật khẩu: `WrongPass1!` (sai mật khẩu) — đăng nhập sai **1 lần**

### 3. Test Steps

1. Mở màn hình Đăng nhập.
2. Đăng nhập sai 1 lần với mật khẩu sai.
3. Quan sát trạng thái tài khoản.

### 4. Expected Result

- Bộ đếm đăng nhập sai = 1 (tăng đúng 1 đơn vị, không nhảy vọt — theo FR-02).
- Tài khoản **chưa** bị khóa; người dùng vẫn được phép thử lại.
