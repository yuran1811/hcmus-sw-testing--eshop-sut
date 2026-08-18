# FR09-APPLY-DP-017: Tổng tiền có phần thập phân

## Requirement ID

FR-09

## Module / Test type / Technique

Coupon API / API Testing / Domain Partition

## Preconditions

- Backend API đang chạy tại `http://localhost:3000`
- Đặc tả API tham chiếu: mục 5.1 Áp dụng mã giảm giá trong `api_specification.md`
- Người dùng đã đăng nhập.

## Test data

| Field    | Value                                                    |
| -------- | -------------------------------------------------------- |
| API      | `POST /api/apply-coupon`                                 |
| Method   | `POST`                                                   |
| Endpoint | `/api/apply-coupon`                                      |
| Category | Domain Partition                                         |
| SEC Ref  | N/A                                                      |
| Priority | Medium                                                   |
| Input    | `{"code":"SAVE10","total_amount":500000.75,"user_id":1}` |

## Test steps

1. Chuẩn bị request `POST http://localhost:3000/api/apply-coupon`.
2. Cấu hình header theo precondition, bao gồm `Authorization: Bearer <token>` nếu test case yêu cầu.
3. Gửi body JSON hoặc dữ liệu đầu vào như bảng Test data.
4. Quan sát status code, response body và trạng thái dữ liệu liên quan sau request nếu test case yêu cầu.

## Expected result

Nếu hệ thống chấp nhận giá trị thập phân thì phải tính theo công thức và quy tắc làm tròn thực tế; nếu không chấp nhận thì phải xử lý có kiểm soát. Spec hiện chưa chốt quy ước tiền tệ.

## Status / Related bugs

Not Run / None
