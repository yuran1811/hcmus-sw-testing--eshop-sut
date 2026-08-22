# TC-IMPORT-034: Kiểm Thử Tải Mảng Lớn (Extreme Batch Stress - 50 Items)

## Requirement ID
FR-16

## Module / Test type / Technique
Admin Product Import / Performance & Scalability / Large Batch Insertion

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
| Body (JSON) | `{"products": [ 50 phần tử sản phẩm hợp lệ ]}` |

## Test steps
1. Gửi HTTP POST request đến `/api/admin/import-products` chứa mảng 50 sản phẩm
2. Kiểm tra HTTP Status Code và xác nhận toàn bộ 50 sản phẩm được import hoàn tất

## Expected result
Mã trạng thái HTTP `200 OK`. `inserted: 50`, `errors: []`. Phản hồi thông báo: `"Import hoàn tất: 50/50 sản phẩm được thêm"`.

## Status / Related bugs
Not Run / None
