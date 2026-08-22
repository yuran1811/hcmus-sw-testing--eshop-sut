# FR17-ADMINCOUP-SEC-008: Race condition khi tạo trùng code

## Requirement ID

FR-17

## Module / Test type / Technique

Coupon API / API Testing / Security

## Preconditions

- Hai request đồng thời dùng JWT admin hợp lệ.
- Code `RACE2026` chưa tồn tại.

- Fixture service đặt lại seed user/coupon, bảo đảm code thử nghiệm chưa tồn tại, lưu snapshot và xóa dữ liệu tạo trong iteration khi hoàn tất.

## Test data

| Field    | Value                                                                                                                            |
| -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| API      | `POST /api/admin/coupons`                                                                                                        |
| Method   | `POST`                                                                                                                           |
| Endpoint | `/api/admin/coupons`                                                                                                             |
| Category | Security                                                                                                                         |
| SEC Ref  | SEC-06                                                                                                                           |
| Priority | High                                                                                                                             |
| Input    | `{"code":"RACE2026","type":"fixed","discount_value":10000,"min_order_amount":0,"expired_at":"2099-12-31","max_uses_per_user":1}` |

## Test steps

1. Gửi hai request giống nhau đồng thời.
2. Kiểm tra số bản ghi `RACE2026` sau khi cả hai request hoàn tất.

## Expected result

Theo execution contract A-FR17: hai request tạo cùng code chạy đồng thời cho kết quả một HTTP 201 và một HTTP 409; CSDL chỉ có đúng một coupon RACE2026 và không có thay đổi ngoài phạm vi.

## Status / Related bugs

Not Run / None
