# TC-IMPORT-021: Import Thất Bại - Trường Products Là Kiểu Chuỗi (String Type Violation)

## Requirement ID
FR-16

## Module / Test type / Technique
Admin Product Import / Robustness / Type Violation Negative Partition

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
| Body (JSON) | `{"products": "SP 1, 10000, Mo ta 1"}` |

## Test steps
1. Gửi HTTP POST request đến `/api/admin/import-products` với `products` là một chuỗi thay vì mảng
2. Kiểm tra HTTP Status Code và nội dung phản hồi

## Expected result
Mã trạng thái HTTP `400 Bad Request`. Body trả về: `{"error": "Không có dữ liệu để import"}`.

## Status / Related bugs
Not Run / None
