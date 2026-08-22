# TC-IMPORT-037: Tính Toàn Vẹn Dữ Liệu - Xác Minh Lưu Trữ Database (End-to-End Persistence)

## Requirement ID
FR-16

## Module / Test type / Technique
Admin Product Import / Data Integrity / State & Persistence Verification

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Đã đăng nhập bằng tài khoản admin và có `adminToken` hợp lệ
- Header `X-Student-Id: 23127148` được đính kèm trong request

## Test data
| Field | Value |
|---|---|
| Endpoint 1 | POST /api/admin/import-products |
| Body (JSON) | `{"products": [{"name": "Unique Persistence Product 23127148", "price": 888888, "description": "Persistent Item", "category_id": 1}]}` |
| Endpoint 2 | GET /api/products?search=Unique Persistence Product 23127148 |

## Test steps
1. Gửi HTTP POST request đến `/api/admin/import-products` để import 1 sản phẩm có tên độc nhất
2. Nhận kết quả thành công `200 OK`
3. Gửi HTTP GET request đến `/api/products?search=Unique Persistence Product 23127148`
4. Kiểm tra xem sản phẩm vừa tạo có trong kết quả trả về hay không

## Expected result
Mã trạng thái HTTP `200 OK`. Danh sách sản phẩm trả về từ GET request chứa sản phẩm `Unique Persistence Product 23127148` với đúng các thông tin đã import.

## Status / Related bugs
Not Run / None
