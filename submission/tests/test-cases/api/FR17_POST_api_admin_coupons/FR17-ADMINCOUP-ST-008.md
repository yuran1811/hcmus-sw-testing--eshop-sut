# FR17-ADMINCOUP-ST-008: Xóa rồi tạo lại cùng code

## Requirement ID

FR-17

## Module / Test type / Technique

Coupon API / API Testing / State Transition

## Preconditions

- Admin JWT hợp lệ.
- Có quyền gọi `DELETE /api/admin/coupons/:id` và tạo coupon mới.

- Fixture service đặt lại seed user/coupon, bảo đảm code thử nghiệm chưa tồn tại, lưu snapshot và xóa dữ liệu tạo trong iteration khi hoàn tất.

## Test data

| Field    | Value                                               |
| -------- | --------------------------------------------------- |
| API      | `POST /api/admin/coupons`                           |
| Method   | `POST`                                              |
| Endpoint | `/api/admin/coupons`                                |
| Category | State Transition                                    |
| SEC Ref  | N/A                                                 |
| Priority | Medium                                              |
| Input    | Tạo, xóa, rồi tạo lại coupon có code `RECREATE2026` |

## Test steps

1. Tạo coupon `RECREATE2026`.
2. Xóa coupon bằng API delete.
3. Gửi lại request tạo cùng code.
4. Kiểm tra số bản ghi active và danh sách coupon.

## Expected result

Theo execution contract A-FR17: tạo trả HTTP 201, xóa cứng trả HTTP 204, tạo lại cùng code trả HTTP 201; trạng thái cuối có đúng một coupon khớp request.

## Status / Related bugs

Not Run / None
