# TC-MOBILE_LOGIN-008: Sai 2 lần liên tiếp → chưa khóa (biên dưới)

**Requirement ID:** FR-20
**Test Type:** Domain Testing

### 1. Preconditions

- App Mobile đang ở màn hình Đăng nhập.
- Tồn tại tài khoản `test@eshop.com` / `Test1234!`.
- Tài khoản không bị khóa, bộ đếm sai = 0.

### 2. Test Data (Inputs)

- 2 lần sai: Email `test@eshop.com` + Mật khẩu `WrongPass1!`
- Lần thứ 3: Email `test@eshop.com` + Mật khẩu `Test1234!` (đúng)

### 3. Test Steps

1. Đăng nhập sai 2 lần liên tiếp (bộ đếm = 2).
2. Đăng nhập lần thứ 3 với thông tin đúng.

### 4. Expected Result

- Sau 2 lần sai, tài khoản **chưa** bị khóa (vì điều kiện khóa là "từ 3 lần trở lên").
- Lần thứ 3 với thông tin đúng → đăng nhập thành công, bộ đếm sai được reset.
