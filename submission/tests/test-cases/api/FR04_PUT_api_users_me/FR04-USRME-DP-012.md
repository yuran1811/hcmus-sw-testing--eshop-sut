# FR04-USRME-DP-012: Số điện thoại quá dài

## Requirement ID

FR-04

## Module / Test type / Technique

User Profile API / API Testing / Domain Partition

## Preconditions

- Backend API đang chạy tại `http://localhost:3000`
- Đặc tả API tham chiếu: mục 2.2 `PUT /api/users/me` trong `api_specification.md`
- Người dùng đã đăng nhập bằng JWT hợp lệ.

- Fixture service đặt lại hai seed user, lưu snapshot hồ sơ và quyền trước mỗi iteration; sau iteration sẽ đối chiếu rồi khôi phục dữ liệu.

## Test data

| Field    | Value                                                                            |
| -------- | -------------------------------------------------------------------------------- |
| API      | `PUT /api/users/me`                                                              |
| Method   | `PUT`                                                                            |
| Endpoint | `/api/users/me`                                                                  |
| Category | Domain Partition                                                                 |
| SEC Ref  | N/A                                                                              |
| Priority | High                                                                             |
| Input    | `{"name":"Nguyễn Văn A","phone":"091234567890","shipping_address":"123 Lê Lợi"}` |

## Test steps

1. Chuẩn bị request `PUT http://localhost:3000/api/users/me`.
2. Cấu hình header theo precondition, bao gồm `Authorization: Bearer <token>` nếu test case yêu cầu.
3. Gửi body JSON hoặc dữ liệu đầu vào như bảng Test data.
4. Quan sát status code, response body và dữ liệu hồ sơ sau request nếu test case yêu cầu.

## Expected result

Theo execution contract A-FR04: HTTP 400; response khớp schema error_required; hồ sơ, role, email, password/reset token và user khác không thay đổi.

## Status / Related bugs

Executed on 2026-08-22 — see [official test run](../../../test-runs/api/FR04_PUT_api_users_me/FR04_PUT_api_users_me_test_run.md) for Pass/Fail result and related bugs.
