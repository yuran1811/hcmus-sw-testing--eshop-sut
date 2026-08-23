# FR17-ADMINCOUP-ST-006: Validation thất bại không tạo bản ghi

## Requirement ID

FR-17

## Module / Test type / Technique

Coupon API / API Testing / State Transition

## Preconditions

- JWT admin hợp lệ.
- Code `ATOMICBAD` chưa tồn tại.

- Fixture service đặt lại seed user/coupon, bảo đảm code thử nghiệm chưa tồn tại, lưu snapshot và xóa dữ liệu tạo trong iteration khi hoàn tất.

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

Theo execution contract A-FR17: HTTP 400; response khớp schema error_required, không lộ secret/stack trace; không tạo coupon và không thay đổi dữ liệu seed.

## Status / Related bugs

Executed on 2026-08-22 — see [official test run](../../../test-runs/api/FR17_POST_api_admin_coupons/FR17_POST_api_admin_coupons_test_run.md) for Pass/Fail result and related bugs.
