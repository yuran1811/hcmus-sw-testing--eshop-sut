# FR04-USRME-ST-004: Trạng thái xác thực hết hạn

## Requirement ID

FR-04

## Module / Test type / Technique

User Profile API / API Testing / State Transition

## Preconditions

- Backend API đang chạy tại `http://localhost:3000`
- Đặc tả API tham chiếu: mục 2.2 `PUT /api/users/me` trong `api_specification.md`
- Có token hết hạn hoặc token đã bị thu hồi nếu SUT hỗ trợ hết hạn token.

## Test data

| Field    | Value                                                                           |
| -------- | ------------------------------------------------------------------------------- |
| API      | `PUT /api/users/me`                                                             |
| Method   | `PUT`                                                                           |
| Endpoint | `/api/users/me`                                                                 |
| Category | State Transition                                                                |
| SEC Ref  | N/A                                                                             |
| Priority | High                                                                            |
| Input    | `{"name":"Token hết hạn","phone":"0912345678","shipping_address":"123 Lê Lợi"}` |

## Test steps

1. Chuẩn bị request `PUT http://localhost:3000/api/users/me`.
2. Cấu hình header theo precondition, bao gồm `Authorization: Bearer <token>` nếu test case yêu cầu.
3. Gửi body JSON hoặc dữ liệu đầu vào như bảng Test data.
4. Quan sát status code, response body và dữ liệu hồ sơ sau request nếu test case yêu cầu.

## Expected result

401 Unauthorized. Hồ sơ không bị cập nhật.

## Status / Related bugs

Not Run / None
