# TC-IMPORT-013: Bảo mật - SSRF Probing Loopback Address trong ImageUrl

## Requirement ID
FR-16 / OWASP API7:2023 (Server-Side Request Forgery / SSRF)

## Module / Test type / Technique
Admin Product Import / Security / Internal Network Probing

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
| Body (JSON) | `{"products": [{"name": "SSRF Loopback Product", "price": 10000, "imageUrl": "http://127.0.0.1:3000/api/users/me"}]}` |

## Test steps
1. Gửi HTTP POST request đến `/api/admin/import-products` chứa loopback URL trong `imageUrl`
2. Kiểm tra HTTP Status Code và xác nhận server không kích hoạt request nội bộ

## Expected result
Mã trạng thái HTTP `200 OK`. Server lưu trữ URL dưới dạng chuỗi và không thực hiện tải ảnh từ máy chủ nội bộ.

## Status / Related bugs
Not Run / None
