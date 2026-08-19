# FR17-ADMINCOUP-ST-006: Validation thất bại không tạo bản ghi

## Requirement ID

FR-17

## Module / Test type / Technique

Coupon API / API Testing / State Transition

## Preconditions

- JWT admin hợp lệ.
- Code `ATOMICBAD` chưa tồn tại.

## Test data

| Field    | Value                                                       |
| -------- | ----------------------------------------------------------- |
| API      | `POST /api/admin/coupons`                                   |
| Method   | `POST`                                                      |
| Endpoint | `/api/admin/coupons`                                        |
| Category | State Transition                                            |
| SEC Ref  | N/A                                                         |
| Priority | High                                                        |
| Input    | Body có `discount_value = -1` hoặc thiếu một field bắt buộc |

## Test steps

1. Ghi nhận danh sách coupon trước request.
2. Gửi request invalid.
3. Kiểm tra lại danh sách và tìm `ATOMICBAD`.

## Expected result

Request bị từ chối và không có coupon `ATOMICBAD` hoặc bản ghi một phần. Không làm thay đổi các coupon đã tồn tại.

## Status / Related bugs

Not Run / None
