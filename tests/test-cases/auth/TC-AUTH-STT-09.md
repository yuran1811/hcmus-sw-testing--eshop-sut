# TC-AUTH-STT-09: Tự động mở khóa tài khoản sau khi hết thời hạn 30 giây

## Requirement ID

FR-02

## Module / Test type / Technique

auth / Functional / State Transition Testing

## Preconditions

- Tài khoản `test@eshop.com` đang ở trạng thái bị khóa `Locked (30s)`.
- Trạng thái ban đầu: `Locked (30s)`.

## Test data

| Field           | Value            |
| --------------- | ---------------- |
| Initial State   | `Locked (30s)`   |
| Trigger Event   | `Timeout_30s`    |
| Guard Condition | Thời gian >= 30s |

## Test steps

1. Chờ cho đủ thời gian 30 giây trôi qua kể từ thời điểm tài khoản bị khóa.
2. Kiểm tra trạng thái lưu trữ của tài khoản trên hệ thống/DB.

## Expected result

- **Trạng thái tiếp theo**: `Unlocked (0 failed)` (Tài khoản tự động trở lại trạng thái bình thường).
- **Phản hồi/Hành vi hệ thống**:
  - Thời hạn 30 giây kết thúc, hệ thống gỡ bỏ trạng thái khóa.
  - Bộ đếm đăng nhập sai được reset về 0.

## Status / Related bugs

Fail / BUG-AUTH-002
