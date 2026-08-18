# FR04-USRME-DP-009: Số điện thoại hợp lệ 11 chữ số

## Requirement ID

FR-04

## Module / Test type / Technique

User Profile API / API Testing / Domain Partition

## Preconditions

- Backend API đang chạy tại `http://localhost:3000`
- Đặc tả API tham chiếu: mục 2.2 `PUT /api/users/me` trong `api_specification.md`
- Người dùng đã đăng nhập bằng JWT hợp lệ.

## Test data

| Field    | Value                                                                           |
| -------- | ------------------------------------------------------------------------------- |
| API      | `PUT /api/users/me`                                                             |
| Method   | `PUT`                                                                           |
| Endpoint | `/api/users/me`                                                                 |
| Category | Domain Partition                                                                |
| SEC Ref  | N/A                                                                             |
| Priority | High                                                                            |
| Input    | `{"name":"Nguyễn Văn A","phone":"01234567890","shipping_address":"123 Lê Lợi"}` |

## Test steps

1. Chuẩn bị request `PUT http://localhost:3000/api/users/me`.
2. Cấu hình header theo precondition, bao gồm `Authorization: Bearer <token>` nếu test case yêu cầu.
3. Gửi body JSON hoặc dữ liệu đầu vào như bảng Test data.
4. Quan sát status code, response body và dữ liệu hồ sơ sau request nếu test case yêu cầu.

## Expected result

200 OK. Số điện thoại 11 chữ số bắt đầu bằng 0 được chấp nhận theo FR-04.

## Status / Related bugs

Not Run / None
