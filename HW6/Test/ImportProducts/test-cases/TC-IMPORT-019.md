# TC-IMPORT-019: Import Thất Bại - Thiếu Trường Gốc Products (Missing Key)

## Requirement ID
FR-16

## Module / Test type / Technique
Admin Product Import / Functional / Negative Equivalence Partitioning

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
| Body (JSON) | `{}` |

## Test steps
1. Gửi HTTP POST request đến `/api/admin/import-products` với body JSON rỗng `{}`
2. Kiểm tra HTTP Status Code và nội dung phản hồi

## Expected result
Mã trạng thái HTTP `400 Bad Request`. Body trả về: `{"error": "Không có dữ liệu để import"}`.

## Status / Related bugs
Not Run / None
