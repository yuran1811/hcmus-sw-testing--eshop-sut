# TC-AUTH-STT-03: Đăng nhập thành công sau 1 lần đăng nhập sai

## Requirement ID

FR-02

## Module / Test type / Technique

auth / Functional / State Transition Testing

## Preconditions

- Tài khoản `test@eshop.com` vừa mới đăng nhập sai 1 lần.
- Trạng thái ban đầu của tài khoản: `Unlocked (1 failed)` (bộ đếm sai = 1).

## Test data

| Field           | Value                 |
| --------------- | --------------------- |
| Initial State   | `Unlocked (1 failed)` |
| Email           | `test@eshop.com`      |
| Password        | `Test1234!`           |
| Trigger Event   | `Login_Valid`         |
| Guard Condition | Không bị khóa         |

## Test steps

1. Truy cập trang Đăng nhập EShop.
2. Nhập Email = `test@eshop.com` và Mật khẩu đúng = `Test1234!`.
3. Bấm nút "Đăng nhập".

## Expected result

- **Trạng thái tiếp theo**: `Authenticated` (Đã đăng nhập).
- **Phản hồi/Hành vi hệ thống**:
  - Đăng nhập thành công, trả về JWT Token.
  - Bộ đếm số lần đăng nhập sai được reset về 0.

## Status / Related bugs

Blocked / BUG-AUTH-001
