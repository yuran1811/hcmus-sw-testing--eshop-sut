# FR04-USRME-SEC-005: Thử cập nhật user khác bằng id trong body

## Requirement ID

FR-04

## Module / Test type / Technique

User Profile API / API Testing / Security / SEC-06

## Preconditions

- Backend API đang chạy tại `http://localhost:3000`
- Đặc tả API tham chiếu: mục 2.2 `PUT /api/users/me` trong `api_specification.md`
- Người dùng thường đã đăng nhập.

## Test data

| Field    | Value                                                                                         |
| -------- | --------------------------------------------------------------------------------------------- |
| API      | `PUT /api/users/me`                                                                           |
| Method   | `PUT`                                                                                         |
| Endpoint | `/api/users/me`                                                                               |
| Category | Security                                                                                      |
| SEC Ref  | SEC-06                                                                                        |
| Priority | High                                                                                          |
| Input    | `{"id":2,"user_id":2,"name":"Thử IDOR","phone":"0912345678","shipping_address":"123 Lê Lợi"}` |

## Test steps

1. Chuẩn bị request `PUT http://localhost:3000/api/users/me`.
2. Cấu hình header theo precondition, bao gồm `Authorization: Bearer <token>` nếu test case yêu cầu.
3. Gửi body JSON hoặc dữ liệu đầu vào như bảng Test data.
4. Quan sát status code, response body và dữ liệu hồ sơ sau request nếu test case yêu cầu.

## Expected result

API bỏ qua hoặc từ chối `id/user_id`; chỉ hồ sơ của user trong token caller có thể bị tác động.

## Status / Related bugs

Not Run / None
