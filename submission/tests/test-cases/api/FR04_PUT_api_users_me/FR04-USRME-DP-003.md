# FR04-USRME-DP-003: Biên dưới hợp lệ của trường họ tên

## Requirement ID

FR-04

## Module / Test type / Technique

User Profile API / API Testing / Domain Partition

## Preconditions

- Backend API đang chạy tại `http://localhost:3000`
- Đặc tả API tham chiếu: mục 2.2 `PUT /api/users/me` trong `api_specification.md`
- Người dùng đã đăng nhập bằng JWT hợp lệ.

## Test data

| Field    | Value                                                        |
| -------- | ------------------------------------------------------------ |
| API      | `PUT /api/users/me`                                          |
| Method   | `PUT`                                                        |
| Endpoint | `/api/users/me`                                              |
| Category | Domain Partition                                             |
| SEC Ref  | N/A                                                          |
| Priority | Low                                                          |
| Input    | `{"name":"A","phone":"0900000000","shipping_address":"1 A"}` |

## Test steps

1. Chuẩn bị request `PUT http://localhost:3000/api/users/me`.
2. Cấu hình header theo precondition, bao gồm `Authorization: Bearer <token>` nếu test case yêu cầu.
3. Gửi body JSON hoặc dữ liệu đầu vào như bảng Test data.
4. Quan sát status code, response body và dữ liệu hồ sơ sau request nếu test case yêu cầu.

## Expected result

200 OK nếu đặc tả không quy định độ dài tối thiểu cho họ tên; các trường khác không bị cập nhật sai.

## Status / Related bugs

Not Run / None
