# FR04-USRME-ST-003: Cập nhật lặp lại

## Requirement ID

FR-04

## Module / Test type / Technique

User Profile API / API Testing / State Transition

## Preconditions

- Backend API đang chạy tại `http://localhost:3000`
- Đặc tả API tham chiếu: mục 2.2 `PUT /api/users/me` trong `api_specification.md`
- Người dùng đã đăng nhập bằng JWT hợp lệ.

## Test data

| Field    | Value                                                                                                                                      |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| API      | `PUT /api/users/me`                                                                                                                        |
| Method   | `PUT`                                                                                                                                      |
| Endpoint | `/api/users/me`                                                                                                                            |
| Category | State Transition                                                                                                                           |
| SEC Ref  | N/A                                                                                                                                        |
| Priority | Medium                                                                                                                                     |
| Input    | `Lần 1: {"name":"Lần 1","phone":"0911111111","shipping_address":"A"}; Lần 2: {"name":"Lần 2","phone":"0922222222","shipping_address":"B"}` |

## Test steps

1. Chuẩn bị request `PUT http://localhost:3000/api/users/me`.
2. Cấu hình header theo precondition, bao gồm `Authorization: Bearer <token>` nếu test case yêu cầu.
3. Gửi body JSON hoặc dữ liệu đầu vào như bảng Test data.
4. Quan sát status code, response body và dữ liệu hồ sơ sau request nếu test case yêu cầu.

## Expected result

Lần cập nhật thứ hai ghi đè đúng các trường được gửi; hệ thống không sinh bản ghi user mới.

## Status / Related bugs

Not Run / None
