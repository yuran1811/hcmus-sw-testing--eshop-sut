# TC-AUTH-STT-04: Đăng nhập sai lần thứ 2 liên tiếp từ trạng thái Unlocked (1 failed)

## Requirement ID

FR-02

## Module / Test type / Technique

auth / Functional / State Transition Testing

## Preconditions

- Tài khoản `test@eshop.com` đã đăng nhập sai 1 lần trước đó.
- Trạng thái ban đầu của tài khoản: `Unlocked (1 failed)` (bộ đếm sai = 1).

## Test data

| Field           | Value                 |
| --------------- | --------------------- |
| Initial State   | `Unlocked (1 failed)` |
| Email           | `test@eshop.com`      |
| Password        | `WrongPassword123!`   |
| Trigger Event   | `Login_Invalid`       |
| Guard Condition | Không                 |

## Test steps

1. Truy cập trang Đăng nhập EShop.
2. Nhập Email = `test@eshop.com` và Mật khẩu sai = `WrongPassword123!`.
3. Bấm nút "Đăng nhập".

## Expected result

- **Trạng thái tiếp theo**: `Unlocked (2 failed)` (bộ đếm đăng nhập sai tăng lên đúng 2).
- **Phản hồi/Hành vi hệ thống**:
  - Hệ thống từ chối đăng nhập.
  - Hiển thị thông báo lỗi phù hợp.
  - Tài khoản vẫn chưa bị khóa (vì chưa đủ 3 lần sai).

## Status / Related bugs

Fail / BUG-AUTH-001, BUG-AUTH-003
