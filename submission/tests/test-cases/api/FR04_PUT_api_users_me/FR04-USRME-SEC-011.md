# FR04-USRME-SEC-011: Trường OTP/reset token ngoài đặc tả

## Requirement ID

FR-04

## Module / Test type / Technique

User Profile API / API Testing / Security / SEC-07

## Preconditions

- Backend API đang chạy tại `http://localhost:3000`
- Đặc tả API tham chiếu: mục 2.2 `PUT /api/users/me` trong `api_specification.md`
- Người dùng đã đăng nhập bằng JWT hợp lệ.

## Test data

| Field    | Value                                                                                                |
| -------- | ---------------------------------------------------------------------------------------------------- |
| API      | `PUT /api/users/me`                                                                                  |
| Method   | `PUT`                                                                                                |
| Endpoint | `/api/users/me`                                                                                      |
| Category | Security                                                                                             |
| SEC Ref  | SEC-07                                                                                               |
| Priority | Medium                                                                                               |
| Input    | `{"name":"Nguyễn Văn A","phone":"0912345678","shipping_address":"123 Lê Lợi","resetToken":"123456"}` |

## Test steps

1. Chuẩn bị request `PUT http://localhost:3000/api/users/me`.
2. Cấu hình header theo precondition, bao gồm `Authorization: Bearer <token>` nếu test case yêu cầu.
3. Gửi body JSON hoặc dữ liệu đầu vào như bảng Test data.
4. Quan sát status code, response body và dữ liệu hồ sơ sau request nếu test case yêu cầu.

## Expected result

API phải bỏ qua hoặc từ chối `resetToken` và không đưa trường này vào response. Ảnh hưởng tới OTP phải được kiểm tra riêng trên flow FR-03 hoặc database; endpoint profile không đủ oracle để kết luận toàn bộ SEC-07.

## Status / Related bugs

Not Run / None
