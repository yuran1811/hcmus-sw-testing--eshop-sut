# FR04-USRME-ST-001: Trạng thái dữ liệu sau cập nhật thành công

## Requirement ID

FR-04

## Module / Test type / Technique

User Profile API / API Testing / State Transition

## Preconditions

- Backend API đang chạy tại `http://localhost:3000`
- Đặc tả API tham chiếu: mục 2.2 `PUT /api/users/me` trong `api_specification.md`
- Có user A và user B; token của user A hợp lệ.

## Test data

| Field    | Value                                                                               |
| -------- | ----------------------------------------------------------------------------------- |
| API      | `PUT /api/users/me`                                                                 |
| Method   | `PUT`                                                                               |
| Endpoint | `/api/users/me`                                                                     |
| Category | State Transition                                                                    |
| SEC Ref  | N/A                                                                                 |
| Priority | High                                                                                |
| Input    | `{"name":"User A đã cập nhật","phone":"0911111111","shipping_address":"Địa chỉ A"}` |

## Test steps

1. Chuẩn bị request `PUT http://localhost:3000/api/users/me`.
2. Cấu hình header theo precondition, bao gồm `Authorization: Bearer <token>` nếu test case yêu cầu.
3. Gửi body JSON hoặc dữ liệu đầu vào như bảng Test data.
4. Quan sát status code, response body và dữ liệu hồ sơ sau request nếu test case yêu cầu.

## Expected result

PUT trả 200 OK; gọi `GET /api/users/me` bằng token A sau đó trả về đúng thông tin mới của user A.

## Status / Related bugs

Not Run / None
