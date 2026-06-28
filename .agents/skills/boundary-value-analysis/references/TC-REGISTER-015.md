# TC-REGISTER-050: BVA — Mật khẩu có đúng 1 chữ thường (On-point biên đếm chữ thường)

**Requirement ID:** FR-01
**Test Type:** Boundary Value Analysis

### 1. Preconditions

- Người dùng đang ở trang Đăng ký, chưa đăng nhập.
- Email `bva.lower@gmail.com` chưa tồn tại trong hệ thống.

### 2. Test Data (Inputs)

- Họ Tên: `Nguyễn Văn A`
- Email: `bva.lower@gmail.com`
- Mật khẩu: `ABCD12a!` (8 ký tự: 4 chữ hoa, **đúng 1 chữ thường** `a`, 2 chữ số, 1 ký tự đặc biệt)
- Xác nhận mật khẩu: `ABCD12a!`

### 3. Test Steps

1. Mở trang Đăng ký.
2. Nhập đầy đủ 4 trường theo Test Data.
3. Bấm "Đăng ký".

### 4. Expected Result

- Đăng ký thành công: mật khẩu thỏa ràng buộc "≥ 1 chữ thường" ngay tại giá trị biên dưới (đúng 1).
- Hệ thống chuyển hướng sang trang Đăng nhập.
- _Mục tiêu BVA:_ phát hiện lỗi nếu implementation lỡ yêu cầu ≥ 2 chữ thường (Domain Testing TC-REGISTER-001 dùng 3 chữ thường nên không bắt được lỗi này).
