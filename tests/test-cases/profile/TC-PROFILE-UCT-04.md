# TC-PROFILE-UCT-04: Cập nhật hồ sơ thất bại khi Số điện thoại vượt quá 11 chữ số (Extension 3a)

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

| Field / Parameter | Value                                                        |
| ----------------- | ------------------------------------------------------------ |
| Name              | `Nguyen Van Test`                                            |
| Phone             | `0912345678901` (13 chữ số — vượt quá giới hạn tối đa 11 số) |
| Shipping Address  | `123 Đường ABC`                                              |

## Test steps

1. Truy cập trang Cập nhật hồ sơ.
2. Nhập Số điện thoại = `0912345678901`.
3. Bấm "Lưu thay đổi".

## Expected result

- Đối chiếu với **Minimal Guarantees**:
  - Hệ thống từ chối cập nhật và trả về thông báo lỗi thích hợp.
  - Thông tin số điện thoại cũ được bảo toàn trong CSDL.

## Status / Related bugs

Fail / BUG-PROFILE-002
