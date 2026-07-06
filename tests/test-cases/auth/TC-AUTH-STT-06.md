# TC-AUTH-STT-06: Đăng nhập sai lần thứ 3 liên tiếp dẫn đến khóa tài khoản 30 giây

## Requirement ID

FR-02

## Module / Test type / Technique

auth / Functional / State Transition Testing

## Preconditions

- Tài khoản `test@eshop.com` đã đăng nhập sai 2 lần liên tiếp trước đó.
- Trạng thái ban đầu của tài khoản: `Unlocked (2 failed)` (bộ đếm sai = 2).

## Test data

| Field           | Value                 |
| --------------- | --------------------- |
| Initial State   | `Unlocked (2 failed)` |
| Email           | `test@eshop.com`      |
| Password        | `WrongPassword123!`   |
| Trigger Event   | `Login_Invalid`       |
| Guard Condition | Đã sai 2 lần trước đó |

## Test steps

1. Truy cập trang Đăng nhập EShop.
2. Nhập Email = `test@eshop.com` và Mật khẩu sai = `WrongPassword123!`.
3. Bấm nút "Đăng nhập".

## Expected result

- **Trạng thái tiếp theo**: `Locked (30s)` (Tài khoản bị tạm khóa trong đúng 30 giây).
- **Phản hồi/Hành vi hệ thống**:
  - Hệ thống từ chối đăng nhập.
  - Bộ đếm đăng nhập sai tăng lên 3.
  - Hiển thị thông báo lỗi phù hợp báo tài khoản bị khóa/tạm dừng dịch vụ.
  - Thông báo lỗi KHÔNG tiết lộ chi tiết nguyên nhân nội bộ hoặc cơ chế khóa bảo mật.

## Status / Related bugs

Fail / BUG-AUTH-002
