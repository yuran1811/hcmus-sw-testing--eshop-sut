# TC-IMPORT-026: Thiếu Trường Hình Ảnh Không Bắt Buộc (Optional ImageUrl Fallback)

## Requirement ID
FR-16

## Module / Test type / Technique
Admin Product Import / Functional / Default Value Fallback

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
| Body (JSON) | `{"products": [{"name": "No Image Product", "price": 60000, "category_id": 1}]}` |

## Test steps
1. Gửi HTTP POST request đến `/api/admin/import-products` không có thuộc tính `imageUrl`
2. Kiểm tra HTTP Status Code và xác nhận sản phẩm được thêm thành công

## Expected result
Mã trạng thái HTTP `200 OK`. `inserted: 1`. SUT tự động gán giá trị mặc định chuỗi rỗng `""` cho `imageUrl`.

## Status / Related bugs
Not Run / None
