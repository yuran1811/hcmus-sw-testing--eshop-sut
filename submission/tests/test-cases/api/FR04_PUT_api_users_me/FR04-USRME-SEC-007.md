# FR04-USRME-SEC-007: XSS trong địa chỉ

## Requirement ID

FR-04

## Module / Test type / Technique

User Profile API / API Testing / Security / SEC-04

## Preconditions

- Backend API đang chạy tại `http://localhost:3000`
- Đặc tả API tham chiếu: mục 2.2 `PUT /api/users/me` trong `api_specification.md`
- Người dùng đã đăng nhập bằng JWT hợp lệ.

- Fixture service đặt lại hai seed user, lưu snapshot hồ sơ và quyền trước mỗi iteration; sau iteration sẽ đối chiếu rồi khôi phục dữ liệu.

## Test data

| Field    | Value                                                                                            |
| -------- | ------------------------------------------------------------------------------------------------ |
| API      | `PUT /api/users/me`                                                                              |
| Method   | `PUT`                                                                                            |
| Endpoint | `/api/users/me`                                                                                  |
| Category | Security                                                                                         |
| SEC Ref  | SEC-04                                                                                           |
| Priority | High                                                                                             |
| Input    | `{"name":"Nguyễn Văn A","phone":"0912345678","shipping_address":"<img src=x onerror=alert(1)>"}` |

## Test steps

1. Chuẩn bị request `PUT http://localhost:3000/api/users/me`.
2. Cấu hình header theo precondition, bao gồm `Authorization: Bearer <token>` nếu test case yêu cầu.
3. Gửi body JSON hoặc dữ liệu đầu vào như bảng Test data.
4. Quan sát status code, response body và dữ liệu hồ sơ sau request nếu test case yêu cầu.

## Expected result

Theo execution contract A-FR04: HTTP 200; response khớp schema profile_update_required; GET /api/users/me xác nhận các trường được phép khớp request, còn id, email, role và user khác không đổi.

## Status / Related bugs

Not Run / None
