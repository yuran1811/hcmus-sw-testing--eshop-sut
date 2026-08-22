# TC-IMPORT-015: Bảo mật - Mass Assignment Body Pollution (Injected Fields)

## Requirement ID
FR-16 / SEC-07 (Mass Assignment Protection)

## Module / Test type / Technique
Admin Product Import / Security / Field Whitelist Enforcement

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
| Body (JSON) | `{"products": [{"name": "Mass Assignment Product", "price": 10000, "id": 9999, "role": "admin", "is_admin": 1, "created_at": "2020-01-01"}]}` |

## Test steps
1. Gửi HTTP POST request đến `/api/admin/import-products` chứa các trường không cho phép trong từng phần tử product
2. Kiểm tra HTTP Status Code và kiểm tra các trường bị chèn có bị ghi đè vào database hay không

## Expected result
Mã trạng thái HTTP `200 OK`. SUT sử dụng câu lệnh `INSERT` tường minh chỉ gán đúng các trường hợp lệ, loại bỏ an toàn các trường thừa `id`, `role`, `is_admin`.

## Status / Related bugs
Not Run / None
