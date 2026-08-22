# TC-IMPORT-029: Phân Tích Giá Trị Biên - Giá Số Âm (Negative Price Boundary)

## Requirement ID
FR-16

## Module / Test type / Technique
Admin Product Import / Boundary Value Analysis / Negative Number Domain

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
| Body (JSON) | `{"products": [{"name": "Negative Price Product", "price": -50000, "category_id": 1}]}` |

## Test steps
1. Gửi HTTP POST request đến `/api/admin/import-products` với `price` mang giá trị âm (-50000)
2. Kiểm tra HTTP Status Code và kiểm tra nghiệp vụ giá âm

## Expected result
Kiểm tra phản hồi của SUT. Hệ thống không bị crash (500). Theo chuẩn nghiệp vụ lý tưởng, giá âm cần được đưa vào danh sách `errors`.

## Status / Related bugs
**SUT Logic Finding:** SUT hiện tại không ràng buộc `price >= 0` và cho phép chèn số âm vào database.
