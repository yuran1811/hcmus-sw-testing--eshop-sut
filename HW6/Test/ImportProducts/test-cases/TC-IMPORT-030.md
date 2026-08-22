# TC-IMPORT-030: Phân Tích Giá Trị Biên - Giá Số Thực / Thập Phân (Floating-point Price)

## Requirement ID
FR-16

## Module / Test type / Technique
Admin Product Import / Boundary Value Analysis / Floating-Point Boundary

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
| Body (JSON) | `{"products": [{"name": "Decimal Price Product", "price": 199.99, "category_id": 1}]}` |

## Test steps
1. Gửi HTTP POST request đến `/api/admin/import-products` với `price: 199.99`
2. Kiểm tra HTTP Status Code và xác nhận sản phẩm được thêm thành công

## Expected result
Mã trạng thái HTTP `200 OK`. `inserted: 1`. Giá trị số thực được xử lý hợp lệ trong SQLite.

## Status / Related bugs
Not Run / None
