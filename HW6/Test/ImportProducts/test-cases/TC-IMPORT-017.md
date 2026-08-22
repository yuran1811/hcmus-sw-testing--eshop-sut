# TC-IMPORT-017: Import Thành Công Nhiều Sản Phẩm (Valid Multi-Product Batch)

## Requirement ID
FR-16

## Module / Test type / Technique
Admin Product Import / Functional / Batch Processing Verification

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
| Body (JSON) | `{"products": [{"name": "Batch SP 1", "price": 10000, "category_id": 1}, {"name": "Batch SP 2", "price": 20000, "category_id": 1}, {"name": "Batch SP 3", "price": 30000, "category_id": 2}, {"name": "Batch SP 4", "price": 40000, "category_id": 2}, {"name": "Batch SP 5", "price": 50000, "category_id": 3}]}` |

## Test steps
1. Gửi HTTP POST request đến `/api/admin/import-products` chứa mảng 5 sản phẩm hợp lệ
2. Kiểm tra HTTP Status Code và nội dung phản hồi

## Expected result
Mã trạng thái HTTP `200 OK`. Body trả về:
```json
{
  "message": "Import hoàn tất: 5/5 sản phẩm được thêm",
  "inserted": 5,
  "errors": []
}
```

## Status / Related bugs
Not Run / None
