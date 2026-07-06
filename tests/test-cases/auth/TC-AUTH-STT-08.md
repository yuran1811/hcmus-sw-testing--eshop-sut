# TC-AUTH-STT-08: Đăng nhập với thông tin SAI khi tài khoản đang bị khóa (Invalid Transition)

## Requirement ID

FR-02

## Module / Test type / Technique

auth / Functional / State Transition Testing

## Preconditions

- Tài khoản `test@eshop.com` đang ở trạng thái bị tạm khóa 30 giây.
- Trạng thái ban đầu của tài khoản: `Locked (30s)`.
- Thời gian trôi qua kể từ khi bị khóa: < 30 giây (ví dụ: mới trôi qua 15 giây).

## Test data

| Field           | Value               |
| --------------- | ------------------- |
| Initial State   | `Locked (30s)`      |
| Email           | `test@eshop.com`    |
| Password        | `WrongPassword123!` |
| Trigger Event   | `Login_Invalid`     |
| Guard Condition | Thời gian < 30s     |

## Test steps

1. Trong vòng 15 giây sau khi bị khóa, truy cập trang Đăng nhập EShop.
2. Nhập Email = `test@eshop.com` và Mật khẩu SAI = `WrongPassword123!`.
3. Bấm nút "Đăng nhập".

## Expected result

- **Trạng thái mong đợi**: `Locked (30s)` (Không đổi — vẫn bị khóa).
- **Phản hồi/Hành vi hệ thống**:
  - Hệ thống từ chối đăng nhập.
  - Hiển thị thông báo tài khoản đang bị tạm khóa.
  - KHÔNG cấp JWT Token.

## Status / Related bugs

Pass / None
