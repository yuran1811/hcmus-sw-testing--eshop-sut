# FR04-USRME-DP-007: Cập nhật một phần trường họ tên

## Requirement ID

FR-04

## Module / Test type / Technique

User Profile API / API Testing / Domain Partition

## Preconditions

- Backend API đang chạy tại `http://localhost:3000`
- Đặc tả API tham chiếu: mục 2.2 `PUT /api/users/me` trong `api_specification.md`
- Người dùng đã đăng nhập bằng JWT hợp lệ.

## Test data

| Field    | Value                 |
| -------- | --------------------- |
| API      | `PUT /api/users/me`   |
| Method   | `PUT`                 |
| Endpoint | `/api/users/me`       |
| Category | Domain Partition      |
| SEC Ref  | N/A                   |
| Priority | High                  |
| Input    | `{"name":"Lê Văn C"}` |

## Test steps

1. Chuẩn bị request `PUT http://localhost:3000/api/users/me`.
2. Cấu hình header theo precondition, bao gồm `Authorization: Bearer <token>` nếu test case yêu cầu.
3. Gửi body JSON hoặc dữ liệu đầu vào như bảng Test data.
4. Quan sát status code, response body và dữ liệu hồ sơ sau request nếu test case yêu cầu.

## Expected result

PUT và body mẫu được mô tả, nhưng đặc tả không nói cập nhật một phần có được hỗ trợ hay không. Nếu hỗ trợ thì kỳ vọng 200 và hai trường không gửi giữ nguyên; nếu không, lỗi rõ ràng và không đổi hồ sơ.

## Status / Related bugs

Not Run / None
