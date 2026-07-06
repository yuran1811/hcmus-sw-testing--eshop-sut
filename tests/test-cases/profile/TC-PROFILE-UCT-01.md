# TC-PROFILE-UCT-01: Cập nhật thông tin hồ sơ cá nhân thành công với dữ liệu hợp lệ (Main Success Scenario)

## Requirement ID

FR-04

## Module / Test type / Technique

profile / Functional / Use Case Testing

## Scenario Type / Extension ID

Main Success Scenario

## Primary Actor

Người dùng đã đăng nhập (Logged-in User)

## Preconditions

- Người dùng `test@eshop.com` đã đăng nhập và sở hữu Token JWT hợp lệ.

## Test data

| Field / Parameter | Value                                    |
| ----------------- | ---------------------------------------- |
| Name              | `Nguyen Van Test`                        |
| Phone             | `0912345678` (10 chữ số, bắt đầu bằng 0) |
| Shipping Address  | `123 Đường Nguyễn Huệ, Quận 1, TP.HCM`   |

## Test steps

1. Gửi request `PUT /api/users/me` kèm Token JWT hợp lệ với Body chứa `name`, `phone`, và `shipping_address` hợp lệ.
2. Kiểm tra phản hồi HTTP từ server.
3. Gửi request `GET /api/users/me` để kiểm tra lại thông tin hồ sơ sau khi cập nhật.

## Expected result

- Đối chiếu với **Success Guarantees**:
  - Trả về status `200 OK` với thông báo cập nhật thành công.
  - Các thông tin `name`, `phone`, `shipping_address` được cập nhật chính xác trong CSDL.
  - Trường `email` và `role` giữ nguyên không thay đổi.

## Status / Related bugs

Pass / None
