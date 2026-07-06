# TC-PROFILE-UCT-03: Cập nhật hồ sơ thất bại khi Số điện thoại không bắt đầu bằng số 0 (Extension 3a)

## Requirement ID

FR-04

## Module / Test type / Technique

profile / Functional / Use Case Testing

## Scenario Type / Extension ID

Extension 3a

## Primary Actor

Người dùng đã đăng nhập (Logged-in User)

## Preconditions

- Người dùng đã đăng nhập thành công.

## Test data

| Field / Parameter | Value                                                               |
| ----------------- | ------------------------------------------------------------------- |
| Name              | `Nguyen Van Test`                                                   |
| Phone             | `1234567890` (10 chữ số nhưng bắt đầu bằng số 1 — vi phạm quy định) |
| Shipping Address  | `123 Đường ABC`                                                     |

## Test steps

1. Truy cập trang Cập nhật hồ sơ.
2. Nhập Số điện thoại = `1234567890`.
3. Bấm "Lưu thay đổi".

## Expected result

- Đối chiếu với **Minimal Guarantees**:
  - Hệ thống từ chối cập nhật và hiển thị thông báo lỗi "Số điện thoại phải bắt đầu bằng số 0".
  - Dữ liệu trong CSDL giữ nguyên không bị thay đổi.

## Status / Related bugs

Fail / BUG-PROFILE-002
