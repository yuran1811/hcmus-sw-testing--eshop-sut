# TC-IMPORT-024: Kiểm Tra Hàng Thiếu Tên Sản Phẩm Bắt Buộc (Missing Name Error Reporting)

## Requirement ID
FR-16

## Module / Test type / Technique
Admin Product Import / Functional / Partial Validation Error Reporting

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
| Body (JSON) | `{"products": [{"price": 100000, "description": "Không có tên"}]}` |

## Test steps
1. Gửi HTTP POST request đến `/api/admin/import-products` với 1 hàng sản phẩm không có thuộc tính `name`
2. Kiểm tra HTTP Status Code và cấu trúc mảng `errors`

## Expected result
Mã trạng thái HTTP `200 OK`. `inserted` bằng 0. Mảng `errors` chứa thông báo: `"Hàng 2: Thiếu tên sản phẩm"`.

## Status / Related bugs
Not Run / None
