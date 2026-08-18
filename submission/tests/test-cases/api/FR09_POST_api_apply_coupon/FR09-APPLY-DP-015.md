# FR09-APPLY-DP-015: Tổng tiền là chuỗi số

## Requirement ID

FR-09

## Module / Test type / Technique

Coupon API / API Testing / Domain Partition

## Preconditions

- Backend API đang chạy tại `http://localhost:3000`
- Đặc tả API tham chiếu: mục 5.1 Áp dụng mã giảm giá trong `api_specification.md`
- Người dùng đã đăng nhập.

## Test data

| Field    | Value                                                   |
| -------- | ------------------------------------------------------- |
| API      | `POST /api/apply-coupon`                                |
| Method   | `POST`                                                  |
| Endpoint | `/api/apply-coupon`                                     |
| Category | Domain Partition                                        |
| SEC Ref  | N/A                                                     |
| Priority | Medium                                                  |
| Input    | `{"code":"SAVE10","total_amount":"500000","user_id":1}` |

## Test steps

1. Chuẩn bị request `POST http://localhost:3000/api/apply-coupon`.
2. Cấu hình header theo precondition, bao gồm `Authorization: Bearer <token>` nếu test case yêu cầu.
3. Gửi body JSON hoặc dữ liệu đầu vào như bảng Test data.
4. Quan sát status code, response body và trạng thái dữ liệu liên quan sau request nếu test case yêu cầu.

## Expected result

Hệ thống xử lý theo schema thực tế, không ép kiểu mơ hồ làm sai discount/final amount và không lỗi 5xx.

## Status / Related bugs

Not Run / None
