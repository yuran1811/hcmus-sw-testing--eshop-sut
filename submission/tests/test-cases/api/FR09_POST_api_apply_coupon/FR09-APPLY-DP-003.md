# FR09-APPLY-DP-003: Áp dụng mã VIP100 tại đúng ngưỡng tối thiểu

## Requirement ID

FR-09

## Module / Test type / Technique

Coupon API / API Testing / Domain Partition

## Preconditions

- Backend API đang chạy tại `http://localhost:3000`
- Đặc tả API tham chiếu: mục 5.1 Áp dụng mã giảm giá trong `api_specification.md`
- Người dùng đã đăng nhập; mã VIP100 active, chưa hết hạn và user chưa vượt số lượt.

## Test data

| Field    | Value                                                 |
| -------- | ----------------------------------------------------- |
| API      | `POST /api/apply-coupon`                              |
| Method   | `POST`                                                |
| Endpoint | `/api/apply-coupon`                                   |
| Category | Domain Partition                                      |
| SEC Ref  | N/A                                                   |
| Priority | High                                                  |
| Input    | `{"code":"VIP100","total_amount":300000,"user_id":1}` |

## Test steps

1. Chuẩn bị request `POST http://localhost:3000/api/apply-coupon`.
2. Cấu hình header theo precondition, bao gồm `Authorization: Bearer <token>` nếu test case yêu cầu.
3. Gửi body JSON hoặc dữ liệu đầu vào như bảng Test data.
4. Quan sát status code, response body và trạng thái dữ liệu liên quan sau request nếu test case yêu cầu.

## Expected result

200 OK. Response có `discount_amount = 100000` và `final_amount = 200000`.

## Status / Related bugs

Not Run / None
