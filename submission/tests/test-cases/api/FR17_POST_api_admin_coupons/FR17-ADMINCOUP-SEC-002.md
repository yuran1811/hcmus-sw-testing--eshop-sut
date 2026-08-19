# FR17-ADMINCOUP-SEC-002: User thường gọi API admin

## Requirement ID

FR-17

## Module / Test type / Technique

Coupon API / API Testing / Security / SEC-03

## Preconditions

- Backend API đang chạy tại `http://localhost:3000`
- Đặc tả API tham chiếu: mục 6.4 Quản lý Mã Giảm Giá trong `api_specification.md`
- User thường đăng nhập bằng JWT hợp lệ nhưng không có role admin.

## Test data

| Field    | Value                                                                                                                              |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| API      | `POST /api/admin/coupons`                                                                                                          |
| Method   | `POST`                                                                                                                             |
| Endpoint | `/api/admin/coupons`                                                                                                               |
| Category | Security                                                                                                                           |
| SEC Ref  | SEC-03                                                                                                                             |
| Priority | High                                                                                                                               |
| Input    | `{"code":"USERCREATE","type":"fixed","discount_value":10000,"min_order_amount":0,"expired_at":"2099-01-31","max_uses_per_user":1}` |

## Test steps

1. Chuẩn bị request `POST http://localhost:3000/api/admin/coupons`.
2. Cấu hình header theo precondition, bao gồm `Authorization: Bearer <token>` nếu test case yêu cầu.
3. Gửi body JSON hoặc dữ liệu đầu vào như bảng Test data.
4. Quan sát status code, response body và trạng thái dữ liệu liên quan sau request nếu test case yêu cầu.

## Expected result

User không có `role = admin` thì không được tạo coupon; API phải kiểm tra quyền chứ không chỉ token tồn tại. Ghi nhận mã trạng thái thực tế.

## Status / Related bugs

Not Run / None
