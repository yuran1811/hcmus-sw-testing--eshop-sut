# TC-IMPORT-028: Phân Tích Giá Trị Biên - Giá Bằng 0 (Zero Price Boundary)

## Requirement ID
FR-16

## Module / Test type / Technique
Admin Product Import / Boundary Value Analysis / Numeric Zero Boundary

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
| Body (JSON) | `{"products": [{"name": "Zero Price Product", "price": 0, "category_id": 1}]}` |

## Test steps
1. Gửi HTTP POST request đến `/api/admin/import-products` với `price: 0`
2. Kiểm tra HTTP Status Code và xác nhận sản phẩm được thêm thành công

## Expected result
Mã trạng thái HTTP `200 OK`. `inserted: 1`. Sản phẩm với giá 0 (ví dụ quà tặng / khuyến mãi) được hệ thống ghi nhận hợp lệ.

## Status / Related bugs
Not Run / None
