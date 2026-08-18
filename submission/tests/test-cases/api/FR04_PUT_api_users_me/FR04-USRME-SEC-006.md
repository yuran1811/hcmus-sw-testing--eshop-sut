# FR04-USRME-SEC-006: XSS trong họ tên

## Requirement ID

FR-04

## Module / Test type / Technique

User Profile API / API Testing / Security / SEC-04

## Preconditions

- Backend API đang chạy tại `http://localhost:3000`
- Đặc tả API tham chiếu: mục 2.2 `PUT /api/users/me` trong `api_specification.md`
- Người dùng đã đăng nhập bằng JWT hợp lệ.

## Test data

| Field    | Value                                                                                       |
| -------- | ------------------------------------------------------------------------------------------- |
| API      | `PUT /api/users/me`                                                                         |
| Method   | `PUT`                                                                                       |
| Endpoint | `/api/users/me`                                                                             |
| Category | Security                                                                                    |
| SEC Ref  | SEC-04                                                                                      |
| Priority | High                                                                                        |
| Input    | `{"name":"<script>alert(1)</script>","phone":"0912345678","shipping_address":"123 Lê Lợi"}` |

## Test steps

1. Chuẩn bị request `PUT http://localhost:3000/api/users/me`.
2. Cấu hình header theo precondition, bao gồm `Authorization: Bearer <token>` nếu test case yêu cầu.
3. Gửi body JSON hoặc dữ liệu đầu vào như bảng Test data.
4. Quan sát status code, response body và dữ liệu hồ sơ sau request nếu test case yêu cầu.

## Expected result

payload XSS có thể được lưu như text, nhưng SEC-04 yêu cầu kiểm tra ở lúc hiển thị UI. Case API phải thêm bước mở UI/đọc DOM và xác nhận script không chạy; không bắt buộc 400.

## Status / Related bugs

Not Run / None
