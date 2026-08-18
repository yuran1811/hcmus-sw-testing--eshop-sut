# FR04-USRME-SC-005: Schema với trường role ngoài đặc tả

## Requirement ID

FR-04

## Module / Test type / Technique

User Profile API / API Testing / Schema Validation

## Preconditions

- Backend API đang chạy tại `http://localhost:3000`
- Đặc tả API tham chiếu: mục 2.2 `PUT /api/users/me` trong `api_specification.md`
- Người dùng đã đăng nhập.

## Test data

| Field    | Value                                                                                        |
| -------- | -------------------------------------------------------------------------------------------- |
| API      | `PUT /api/users/me`                                                                          |
| Method   | `PUT`                                                                                        |
| Endpoint | `/api/users/me`                                                                              |
| Category | Schema Validation                                                                            |
| SEC Ref  | N/A                                                                                          |
| Priority | High                                                                                         |
| Input    | `{"name":"Schema Role","phone":"0912345678","shipping_address":"123 Lê Lợi","role":"admin"}` |

## Test steps

1. Chuẩn bị request `PUT http://localhost:3000/api/users/me`.
2. Cấu hình header theo precondition, bao gồm `Authorization: Bearer <token>` nếu test case yêu cầu.
3. Gửi body JSON hoặc dữ liệu đầu vào như bảng Test data.
4. Quan sát status code, response body và dữ liệu hồ sơ sau request nếu test case yêu cầu.

## Expected result

API specification chưa định nghĩa JSON schema response nên không được yêu cầu một schema cụ thể. Nếu request thành công, `role` của user vẫn phải giữ nguyên và không thành `admin`; nếu trường `role` không có trong response thì xác minh bằng `GET /api/users/me` hoặc nguồn dữ liệu đối chứng.

## Status / Related bugs

Not Run / None
