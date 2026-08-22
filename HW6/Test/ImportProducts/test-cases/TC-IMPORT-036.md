# TC-IMPORT-036: Tính Toàn Vẹn Dữ Liệu - Xử Lý Lỗi Từng Phần (Partial Failure Atomicity)

## Requirement ID
FR-16

## Module / Test type / Technique
Admin Product Import / Data Integrity / Mixed Batch Validation

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
| Body (JSON) | `{"products": [{"name": "Valid 1", "price": 10000}, {"price": 20000}, {"name": "Valid 2", "price": 30000}, {"description": "No Name", "price": 40000}]}` |

## Test steps
1. Gửi HTTP POST request đến `/api/admin/import-products` chứa mảng gồm 2 hàng hợp lệ và 2 hàng thiếu `name`
2. Kiểm tra HTTP Status Code và nội dung JSON phản hồi

## Expected result
Mã trạng thái HTTP `200 OK`. `inserted: 2`. `errors` có độ dài 2 tương ứng với hàng 3 và hàng 5 (`"Hàng 3: Thiếu tên sản phẩm"`, `"Hàng 5: Thiếu tên sản phẩm"`).

## Status / Related bugs
Not Run / None
