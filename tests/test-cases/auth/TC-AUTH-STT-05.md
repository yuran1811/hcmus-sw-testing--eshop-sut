# TC-AUTH-STT-05: Đăng nhập thành công khi đang có 2 lần sai liên tiếp

## Requirement ID

FR-02

## Module / Test type / Technique

auth / Functional / State Transition Testing

## Preconditions

- Tài khoản `test@eshop.com` đã đăng nhập sai 2 lần liên tiếp.
- Trạng thái ban đầu của tài khoản: `Unlocked (2 failed)` (bộ đếm sai = 2).

## Test data

| Field           | Value                 |
| --------------- | --------------------- |
| Initial State   | `Unlocked (2 failed)` |
| Email           | `test@eshop.com`      |
| Password        | `Test1234!`           |
| Trigger Event   | `Login_Valid`         |
| Guard Condition | Không bị khóa         |

## Test steps

1. Truy cập trang Đăng nhập EShop.
2. Nhập Email = `test@eshop.com` và Mật khẩu đúng = `Test1234!`.
3. Bấm nút "Đăng nhập".

## Expected result

- **Trạng thái tiếp theo**: `Authenticated` (Đã đăng nhập thành công).
- **Phản hồi/Hành vi hệ thống**:
  - Đăng nhập thành công, nhận JWT Token.
  - Bộ đếm số lần đăng nhập sai được reset hoàn toàn về 0.

## Status / Related bugs

Fail / BUG-AUTH-003
