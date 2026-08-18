# FR09-APPLY-SEC-006: IDOR qua user_id trong body

## Requirement ID

FR-09

## Module / Test type / Technique

Coupon API / API Testing / Security / SEC-02

## Preconditions

- Backend API đang chạy tại `http://localhost:3000`
- Đặc tả API tham chiếu: mục 5.1 Áp dụng mã giảm giá trong `api_specification.md`
- Token hợp lệ của user A; body cố tình gửi `user_id` của user B.

## Test data

| Field    | Value                                                 |
| -------- | ----------------------------------------------------- |
| API      | `POST /api/apply-coupon`                              |
| Method   | `POST`                                                |
| Endpoint | `/api/apply-coupon`                                   |
| Category | Security                                              |
| SEC Ref  | SEC-02                                                |
| Priority | High                                                  |
| Input    | `{"code":"SAVE10","total_amount":500000,"user_id":2}` |

## Test steps

1. Chuẩn bị request `POST http://localhost:3000/api/apply-coupon`.
2. Cấu hình header theo precondition, bao gồm `Authorization: Bearer <token>` nếu test case yêu cầu.
3. Gửi body JSON hoặc dữ liệu đầu vào như bảng Test data.
4. Quan sát status code, response body và trạng thái dữ liệu liên quan sau request nếu test case yêu cầu.

## Expected result

403 Forbidden hoặc hệ thống bỏ qua body `user_id` và dùng user từ JWT. User A không được tiêu lượt coupon của user B.

## Status / Related bugs

Not Run / None
