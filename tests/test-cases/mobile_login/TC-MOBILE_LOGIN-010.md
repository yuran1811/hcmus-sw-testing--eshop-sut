# TC-MOBILE_LOGIN-010: Đăng nhập khi tài khoản đang bị khóa (dù nhập đúng) → bị từ chối

**Requirement ID:** FR-20
**Test Type:** Domain Testing

### 1. Preconditions

- App Mobile đang ở màn hình Đăng nhập.
- Tài khoản `test@eshop.com` vừa bị khóa do sai 3 lần liên tiếp (đang trong 30 giây khóa).

### 2. Test Data (Inputs)

- Email: `test@eshop.com` (hợp lệ, đã đăng ký)
- Mật khẩu: `Test1234!` (ĐÚNG mật khẩu)

### 3. Test Steps

1. Trong lúc tài khoản đang bị khóa, nhập đúng Email và Mật khẩu.
2. Bấm "Đăng nhập".

### 4. Expected Result

- Đăng nhập **bị từ chối** mặc dù thông tin đăng nhập hoàn toàn đúng (trạng thái khóa phủ quyết).
- Hệ thống trả về thông báo lỗi phù hợp, không để lộ chi tiết nguyên nhân.
