# TC-MOBILE_LOGIN-009: Sai 3 lần liên tiếp → khóa tài khoản 30 giây (biên kích hoạt)

**Requirement ID:** FR-20
**Test Type:** Domain Testing

### 1. Preconditions

- App Mobile đang ở màn hình Đăng nhập.
- Tồn tại tài khoản `test@eshop.com` / `Test1234!`.
- Tài khoản không bị khóa, bộ đếm sai = 0.

### 2. Test Data (Inputs)

- 3 lần sai liên tiếp: Email `test@eshop.com` + Mật khẩu `WrongPass1!`

### 3. Test Steps

1. Đăng nhập sai 3 lần liên tiếp.
2. Quan sát phản hồi sau lần sai thứ 3.

### 4. Expected Result

- Sau lần sai thứ 3 (đủ điều kiện "từ 3 lần trở lên"), tài khoản bị **tạm khóa 30 giây**.
- Hệ thống trả về thông báo lỗi phù hợp, không để lộ chi tiết nguyên nhân.
