# TC-IMPORT-031: Phân Tích Giá Trị Biên - Giá Dạng Chuỗi Số (Numeric String Price)

## Requirement ID
FR-16

## Module / Test type / Technique
Admin Product Import / Robustness / Type Coercion Boundary

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
| Body (JSON) | `{"products": [{"name": "String Price Product", "price": "50000", "category_id": 1}]}` |

## Test steps
1. Gửi HTTP POST request đến `/api/admin/import-products` với `price: "50000"` (chuỗi ký tự số thay vì integer)
2. Kiểm tra HTTP Status Code và xác nhận sản phẩm được thêm thành công

## Expected result
Mã trạng thái HTTP `200 OK`. `inserted: 1`. Driver SQLite và backend tự động ép kiểu hợp lệ hoặc lưu trữ an toàn mà không bị crash.

## Status / Related bugs
Not Run / None
