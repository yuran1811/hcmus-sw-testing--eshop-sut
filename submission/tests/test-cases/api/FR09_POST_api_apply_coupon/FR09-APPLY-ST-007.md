# FR09-APPLY-ST-007: Áp dụng phép tính không tự làm thay đổi lượt dùng

## Requirement ID

FR-09

## Module / Test type / Technique

Coupon API / API Testing / State Transition

## Preconditions

- JWT hợp lệ; user có `use_count(SAVE10) = 0`.
- Theo mô tả API, endpoint đang được kiểm tra như phép tính tổng tiền, chưa có bước checkout xác nhận.

## Test data

| Field    | Value                                                 |
| -------- | ----------------------------------------------------- |
| API      | `POST /api/apply-coupon`                              |
| Method   | `POST`                                                |
| Endpoint | `/api/apply-coupon`                                   |
| Category | State Transition                                      |
| SEC Ref  | N/A                                                   |
| Priority | Medium                                                |
| Input    | `{"code":"SAVE10","total_amount":500000,"user_id":1}` |

## Test steps

1. Ghi nhận `use_count` trước request.
2. Gửi request hợp lệ một lần.
3. Đọc lại `use_count` sau request.

## Expected result

Response tính đúng discount/final amount. Không kết luận endpoint tăng lượt dùng nếu API contract chưa quy định; nếu hệ thống tăng, phải có đặc tả rõ trigger và transaction boundary.

## Status / Related bugs

Not Run / None
