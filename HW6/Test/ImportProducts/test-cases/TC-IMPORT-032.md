# TC-IMPORT-032: Phân Tích Giá Trị Biên - Giá Trị Nguyên Cực Đại 32-bit (Integer Max)

## Requirement ID
FR-16

## Module / Test type / Technique
Admin Product Import / Boundary Value Analysis / Extreme Upper Integer Boundary

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
| Body (JSON) | `{"products": [{"name": "Max Int Price Product", "price": 2147483647, "category_id": 1}]}` |

## Test steps
1. Gửi HTTP POST request đến `/api/admin/import-products` với `price: 2147483647`
2. Kiểm tra HTTP Status Code và phản hồi

## Expected result
Mã trạng thái HTTP `200 OK`. `inserted: 1`. Hệ thống xử lý giá trị số nguyên lớn mà không bị tràn bộ nhớ (overflow).

## Status / Related bugs
Not Run / None
