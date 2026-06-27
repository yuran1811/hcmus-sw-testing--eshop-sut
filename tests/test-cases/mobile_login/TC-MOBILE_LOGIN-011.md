# TC-MOBILE_LOGIN-011: Hết 30 giây khóa → đăng nhập đúng lại thành công (biên thời gian)

**Requirement ID:** FR-20
**Test Type:** Domain Testing

### 1. Preconditions

- App Mobile đang ở màn hình Đăng nhập.
- Tài khoản `test@eshop.com` vừa bị khóa do sai 3 lần liên tiếp.

### 2. Test Data (Inputs)

- Email: `test@eshop.com` (hợp lệ)
- Mật khẩu: `Test1234!` (đúng)

### 3. Test Steps

1. Chờ qua mốc 30 giây kể từ khi tài khoản bị khóa.
2. Nhập đúng Email và Mật khẩu.
3. Bấm "Đăng nhập".

### 4. Expected Result

- Sau khi hết thời gian khóa 30 giây, tài khoản được mở lại.
- Đăng nhập với thông tin đúng → thành công, nhận JWT Token và vào màn hình chính.
