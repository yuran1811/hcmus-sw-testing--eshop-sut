# TC-IMPORT-016: Import Thành Công Đơn Lẻ (Single Valid Product - Happy Path)

## Requirement ID
FR-16

## Module / Test type / Technique
Admin Product Import / Functional / Equivalence Partitioning (Valid)

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
| Body (JSON) | `{"products": [{"name": "Single Product Valid", "price": 100000, "description": "Single Valid Description", "imageUrl": "https://placehold.co/300x300", "category_id": 1}]}` |

## Test steps
1. Gửi HTTP POST request đến `/api/admin/import-products` với payload 1 sản phẩm đầy đủ thông tin
2. Kiểm tra HTTP Status Code và nội dung phản hồi

## Expected result
Mã trạng thái HTTP `200 OK`. Body trả về:
```json
{
  "message": "Import hoàn tất: 1/1 sản phẩm được thêm",
  "inserted": 1,
  "errors": []
}
```

## Status / Related bugs
Not Run / None
