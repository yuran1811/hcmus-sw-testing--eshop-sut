# FR04-USRME-DP-021: Body rỗng

## Requirement ID

FR-04

## Module / Test type / Technique

User Profile API / API Testing / Domain Partition

## Preconditions

- Backend API đang chạy tại `http://localhost:3000`
- Đặc tả API tham chiếu: mục 2.2 `PUT /api/users/me` trong `api_specification.md`
- Người dùng đã đăng nhập bằng JWT hợp lệ.

## Test data

| Field    | Value               |
| -------- | ------------------- |
| API      | `PUT /api/users/me` |
| Method   | `PUT`               |
| Endpoint | `/api/users/me`     |
| Category | Domain Partition    |
| SEC Ref  | N/A                 |
| Priority | Medium              |
| Input    | `{}`                |

## Test steps

1. Chuẩn bị request `PUT http://localhost:3000/api/users/me`.
2. Cấu hình header theo precondition, bao gồm `Authorization: Bearer <token>` nếu test case yêu cầu.
3. Gửi body JSON hoặc dữ liệu đầu vào như bảng Test data.
4. Quan sát status code, response body và dữ liệu hồ sơ sau request nếu test case yêu cầu.

## Expected result

FR-04 không quy định body rỗng phải có mã lỗi nào hoặc phải chứa ít nhất một trường; ghi nhận response và bảo đảm không có cập nhật ngoài ý muốn.

## Status / Related bugs

Not Run / None
