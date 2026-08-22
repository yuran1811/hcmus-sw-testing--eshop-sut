# TC-IMPORT-035: Phân Tích Giá Trị Biên - Chuỗi Ký Tự Quá Khổ (Oversized Strings >1000 chars)

## Requirement ID
FR-16

## Module / Test type / Technique
Admin Product Import / Boundary Value Analysis / Buffer Boundary

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
| Body (JSON) | `{"products": [{"name": "<Chuỗi 1000 ký tự 'A'>", "price": 50000, "description": "<Chuỗi 2000 ký tự 'B'>"}]}` |

## Test steps
1. Gửi HTTP POST request đến `/api/admin/import-products` với chuỗi `name` và `description` có độ dài lớn
2. Kiểm tra HTTP Status Code và khả năng xử lý của server

## Expected result
Mã trạng thái HTTP `200 OK`. Server và SQLite xử lý chuỗi ký tự dài an toàn mà không bị crash.

## Status / Related bugs
Not Run / None
