# TC-IMPORT-033: Phân Phùng Dữ Liệu - Category ID Không Tồn Tại (Non-existent Foreign Key)

## Requirement ID
FR-16

## Module / Test type / Technique
Admin Product Import / Domain Partitioning / Foreign Key Constraint Testing

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Đã đăng nhập bằng tài khoản admin và có `adminToken` hợp lệ
- Header `X-Student-Id: 23127148` được đính kèm trong request

## Test data
| Field | Value |
|---|---|
| Endpoint | POST /api/admin/import-products |
| Header Authorization | Bearer {{adminToken}} |
| Header X-Student-Id | 23127148 |
| Body (JSON) | `{"products": [{"name": "FK Test Product", "price": 50000, "category_id": 99999}]}` |

## Test steps
1. Gửi HTTP POST request đến `/api/admin/import-products` với `category_id: 99999` (ID thể loại không tồn tại trong bảng `categories`)
2. Kiểm tra HTTP Status Code và kiểm tra tính toàn vẹn xử lý

## Expected result
Hệ thống xử lý an toàn (200 OK), không sinh lỗi `500 Internal Server Error`.

## Status / Related bugs
Not Run / None
