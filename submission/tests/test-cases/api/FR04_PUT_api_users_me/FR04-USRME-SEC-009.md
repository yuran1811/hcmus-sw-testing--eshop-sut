# FR04-USRME-SEC-009: SQL injection trong địa chỉ

## Requirement ID

FR-04

## Module / Test type / Technique

User Profile API / API Testing / Security / SEC-05

## Preconditions

- Backend API đang chạy tại `http://localhost:3000`
- Đặc tả API tham chiếu: mục 2.2 `PUT /api/users/me` trong `api_specification.md`
- Người dùng đã đăng nhập bằng JWT hợp lệ.

## Test data

| Field    | Value                                                                                        |
| -------- | -------------------------------------------------------------------------------------------- |
| API      | `PUT /api/users/me`                                                                          |
| Method   | `PUT`                                                                                        |
| Endpoint | `/api/users/me`                                                                              |
| Category | Security                                                                                     |
| SEC Ref  | SEC-05                                                                                       |
| Priority | High                                                                                         |
| Input    | `{"name":"Nguyễn Văn A","phone":"0912345678","shipping_address":"1 A; DROP TABLE users;--"}` |

## Test steps

1. Chuẩn bị request `PUT http://localhost:3000/api/users/me`.
2. Cấu hình header theo precondition, bao gồm `Authorization: Bearer <token>` nếu test case yêu cầu.
3. Gửi body JSON hoặc dữ liệu đầu vào như bảng Test data.
4. Quan sát status code, response body và dữ liệu hồ sơ sau request nếu test case yêu cầu.

## Expected result

Behavioral oracle: payload được xử lý như dữ liệu literal, bảng `users` và các hồ sơ vẫn tồn tại, không gây lỗi 5xx và không lộ SQL/stack trace. Việc dùng parameterized query phải được xác minh thêm bằng source-code review theo SEC-05.

## Status / Related bugs

Not Run / None
