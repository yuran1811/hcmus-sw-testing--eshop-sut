# TC-AUTH-STT-01: Đăng nhập thành công lần đầu khi tài khoản ở trạng thái Unlocked (0 failed)

## Requirement ID

FR-02

## Module / Test type / Technique

auth / Functional / State Transition Testing

## Preconditions

- Tài khoản `test@eshop.com` đã được đăng ký và hoạt động bình thường.
- Trạng thái ban đầu của tài khoản: `Unlocked (0 failed)` (bộ đếm sai = 0, chưa đăng nhập).

## Test data

| Field           | Value                 |
| --------------- | --------------------- |
| Initial State   | `Unlocked (0 failed)` |
| Email           | `test@eshop.com`      |
| Password        | `Test1234!`           |
| Trigger Event   | `Login_Valid`         |
| Guard Condition | Không bị khóa         |

## Test steps

1. Truy cập trang Đăng nhập hệ thống EShop.
2. Nhập Email = `test@eshop.com` và Mật khẩu = `Test1234!`.
3. Bấm nút "Đăng nhập" (hoặc submit form).

## Expected result

- **Trạng thái tiếp theo**: `Authenticated` (Đã đăng nhập thành công).
- **Phản hồi/Hành vi hệ thống**:
  - Hệ thống xác thực thành công, trả về JWT Token hợp lệ.
  - Bộ đếm đăng nhập sai được duy trì/reset về 0.
  - Chuyển hướng người dùng vào trang cá nhân/trang chủ.

## Status / Related bugs

Pass / None
