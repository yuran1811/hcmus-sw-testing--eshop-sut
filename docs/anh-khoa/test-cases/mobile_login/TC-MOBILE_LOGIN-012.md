# TC-MOBILE_LOGIN-012: BVA — Vẫn còn khóa tại t = 29 giây (Off-point biên thời gian khóa 30s)

**Requirement ID:** FR-20
**Test Type:** Boundary Value Analysis

### 1. Preconditions

- App Mobile đang ở màn hình Đăng nhập.
- Tồn tại tài khoản `test@eshop.com` / `Test1234!`.
- Tài khoản chưa bị khóa, bộ đếm sai = 0 (trước khi bắt đầu).

### 2. Test Data (Inputs)

- Bước gây khóa: 3 lần sai liên tiếp với Email `test@eshop.com` + Mật khẩu `WrongPass1!`.
- Bước kiểm biên: Email `test@eshop.com` + Mật khẩu `Test1234!` (ĐÚNG), thực hiện tại thời điểm **t ≈ 29 giây** sau khi tài khoản bị khóa.

### 3. Test Steps

1. Đăng nhập sai 3 lần liên tiếp để kích hoạt khóa 30 giây.
2. Chờ khoảng **29 giây** (vẫn nằm trong cửa sổ khóa, ngay trước mốc 30s).
3. Nhập đúng Email và Mật khẩu, bấm "Đăng nhập".

### 4. Expected Result

- Đăng nhập **vẫn bị từ chối** vì thời gian khóa chưa hết (mới qua 29/30 giây), kèm thông báo lỗi phù hợp, không lộ chi tiết nguyên nhân.
- _Mục tiêu BVA:_ kiểm điểm Off sát mốc mở khóa mà Domain Testing chưa chạm (TC-010 kiểm ở t≈0, TC-011 kiểm ở t≥30). Nếu đăng nhập **thành công** tại t=29s → khóa đã hết hạn **sớm hơn 30 giây** → không tuân thủ ràng buộc "tạm khóa 30 giây".
