# TC-AUTH-STT-10: Đăng nhập thành công sau khi tài khoản hết 30 giây bị khóa (Sequence End-to-End)

## Requirement ID

FR-02

## Module / Test type / Technique

auth / Functional / State Transition Testing

## Preconditions

- Tài khoản `test@eshop.com` đã bị khóa 30 giây và vừa hết thời gian khóa.
- Trạng thái ban đầu: `Unlocked (0 failed)` (sau khi hết 30s timeout).

## Test data

| Field           | Value                 |
| --------------- | --------------------- |
| Initial State   | `Unlocked (0 failed)` |
| Email           | `test@eshop.com`      |
| Password        | `Test1234!` (ĐÚNG)    |
| Trigger Event   | `Login_Valid`         |
| Guard Condition | Thời gian >= 30s      |

## Test steps

1. Đợi 31 giây sau khi bị khóa.
2. Truy cập lại trang Đăng nhập EShop.
3. Nhập Email = `test@eshop.com` và Mật khẩu ĐÚNG = `Test1234!`.
4. Bấm nút "Đăng nhập".

## Expected result

- **Trạng thái tiếp theo**: `Authenticated` (Đã đăng nhập thành công).
- **Phản hồi/Hành vi hệ thống**:
  - Hệ thống cho phép đăng nhập bình thường.
  - Trả về JWT Token hợp lệ.
  - Bộ đếm đăng nhập sai duy trì ở mức 0.

## Status / Related bugs

Fail / BUG-AUTH-002
