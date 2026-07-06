# TC-AUTH-STT-07: Đăng nhập với thông tin ĐÚNG khi tài khoản đang bị khóa (Invalid Transition)

## Requirement ID

FR-02

## Module / Test type / Technique

auth / Functional / State Transition Testing

## Preconditions

- Tài khoản `test@eshop.com` vừa mới bị khóa do đăng nhập sai 3 lần liên tiếp.
- Trạng thái ban đầu của tài khoản: `Locked (30s)`.
- Thời gian trôi qua kể từ khi bị khóa: < 30 giây (ví dụ: mới trôi qua 10 giây).

## Test data

| Field           | Value              |
| --------------- | ------------------ |
| Initial State   | `Locked (30s)`     |
| Email           | `test@eshop.com`   |
| Password        | `Test1234!` (ĐÚNG) |
| Trigger Event   | `Login_Valid`      |
| Guard Condition | Thời gian < 30s    |

## Test steps

1. Trong vòng 10 giây sau khi bị khóa, truy cập trang Đăng nhập EShop.
2. Nhập Email = `test@eshop.com` và Mật khẩu ĐÚNG = `Test1234!`.
3. Bấm nút "Đăng nhập".

## Expected result

- **Trạng thái mong đợi**: `Locked (30s)` (Không đổi — vẫn bị khóa).
- **Phản hồi/Hành vi hệ thống**:
  - Hệ thống từ chối đăng nhập dù mật khẩu đúng.
  - Hiển thị thông báo tài khoản đang bị khóa/tạm dừng.
  - KHÔNG cấp JWT Token.

## Status / Related bugs

Pass / None
