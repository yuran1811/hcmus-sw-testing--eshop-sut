# FR04-USRME-DP-020: Địa chỉ quá dài

## Requirement ID

FR-04

## Module / Test type / Technique

User Profile API / API Testing / Domain Partition

## Preconditions

- Backend API đang chạy tại `http://localhost:3000`
- Đặc tả API tham chiếu: mục 2.2 `PUT /api/users/me` trong `api_specification.md`
- Người dùng đã đăng nhập bằng JWT hợp lệ.

## Test data

| Field    | Value                                                                                                  |
| -------- | ------------------------------------------------------------------------------------------------------ |
| API      | `PUT /api/users/me`                                                                                    |
| Method   | `PUT`                                                                                                  |
| Endpoint | `/api/users/me`                                                                                        |
| Category | Domain Partition                                                                                       |
| SEC Ref  | N/A                                                                                                    |
| Priority | Medium                                                                                                 |
| Input    | `{"name":"Nguyễn Văn A","phone":"0912345678","shipping_address":"<chuỗi địa chỉ dài hơn 2000 ký tự>"}` |

## Test steps

1. Chuẩn bị request `PUT http://localhost:3000/api/users/me`.
2. Cấu hình header theo precondition, bao gồm `Authorization: Bearer <token>` nếu test case yêu cầu.
3. Gửi body JSON hoặc dữ liệu đầu vào như bảng Test data.
4. Quan sát status code, response body và dữ liệu hồ sơ sau request nếu test case yêu cầu.

## Expected result

400 Bad Request hoặc 413 Payload Too Large. Hệ thống không bị lỗi server/DB và thông báo lỗi an toàn.

## Status / Related bugs

Not Run / None
