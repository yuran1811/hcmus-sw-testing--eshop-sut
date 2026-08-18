# FR04-USRME-SC-001: Schema response thành công

## Requirement ID

FR-04

## Module / Test type / Technique

User Profile API / API Testing / Schema Validation

## Preconditions

- Backend API đang chạy tại `http://localhost:3000`
- Đặc tả API tham chiếu: mục 2.2 `PUT /api/users/me` trong `api_specification.md`
- Người dùng đã đăng nhập; request hợp lệ.

## Test data

| Field    | Value                                                                               |
| -------- | ----------------------------------------------------------------------------------- |
| API      | `PUT /api/users/me`                                                                 |
| Method   | `PUT`                                                                               |
| Endpoint | `/api/users/me`                                                                     |
| Category | Schema Validation                                                                   |
| SEC Ref  | N/A                                                                                 |
| Priority | High                                                                                |
| Input    | `{"name":"Người dùng Schema","phone":"0912345678","shipping_address":"123 Lê Lợi"}` |

## Test steps

1. Chuẩn bị request `PUT http://localhost:3000/api/users/me`.
2. Cấu hình header theo precondition, bao gồm `Authorization: Bearer <token>` nếu test case yêu cầu.
3. Gửi body JSON hoặc dữ liệu đầu vào như bảng Test data.
4. Quan sát status code, response body và dữ liệu hồ sơ sau request nếu test case yêu cầu.

## Expected result

Status 200. Response JSON có các trường hồ sơ mong đợi như `id`, `name`, `email`, `phone`, `shipping_address`, `role` nếu API trả user; kiểu dữ liệu đúng.

## Status / Related bugs

Not Run / None
