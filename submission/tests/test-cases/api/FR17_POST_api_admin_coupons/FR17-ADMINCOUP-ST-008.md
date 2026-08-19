# FR17-ADMINCOUP-ST-008: Xóa rồi tạo lại cùng code

## Requirement ID

FR-17

## Module / Test type / Technique

Coupon API / API Testing / State Transition

## Preconditions

- Admin JWT hợp lệ.
- Có quyền gọi `DELETE /api/admin/coupons/:id` và tạo coupon mới.

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

Không có hai coupon active trùng code. Kết quả tạo lại phải phù hợp với chính sách hard-delete/soft-delete được đặc tả; nếu chưa có chính sách, ghi nhận behavior thay vì ép một status.

## Status / Related bugs

Not Run / None
