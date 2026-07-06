# TC-AUTH-STT-02: Đăng nhập sai lần thứ 1 từ trạng thái Unlocked (0 failed)

## Requirement ID

FR-02

## Module / Test type / Technique

auth / Functional / State Transition Testing

## Preconditions

- Tài khoản `test@eshop.com` tồn tại trong hệ thống.
- Trạng thái ban đầu của tài khoản: `Unlocked (0 failed)` (bộ đếm sai = 0).

## Test data

| Field           | Value                 |
| --------------- | --------------------- |
| Initial State   | `Unlocked (0 failed)` |
| Email           | `test@eshop.com`      |
| Password        | `WrongPassword123!`   |
| Trigger Event   | `Login_Invalid`       |
| Guard Condition | Không                 |

## Test steps

1. Truy cập trang Đăng nhập EShop.
2. Nhập Email = `test@eshop.com` và Mật khẩu sai = `WrongPassword123!`.
3. Bấm nút "Đăng nhập".

## Expected result

- **Trạng thái tiếp theo**: `Unlocked (1 failed)` (bộ đếm đăng nhập sai tăng lên 1).
- **Phản hồi/Hành vi hệ thống**:
  - Hệ thống từ chối đăng nhập.
  - Hiển thị thông báo lỗi phù hợp (ví dụ: "Email hoặc mật khẩu không chính xác").
  - Không cấp JWT Token.

## Status / Related bugs

Fail / BUG-AUTH-001
