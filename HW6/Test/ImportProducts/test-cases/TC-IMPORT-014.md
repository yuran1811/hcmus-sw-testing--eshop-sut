# TC-IMPORT-014: Bảo mật - SSRF Probing Cloud Metadata Address trong ImageUrl

## Requirement ID
FR-16 / OWASP API7:2023 (SSRF - Cloud Metadata Exfiltration)

## Module / Test type / Technique
Admin Product Import / Security / Metadata IP Probing

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
| Body (JSON) | `{"products": [{"name": "SSRF Cloud Meta Product", "price": 10000, "imageUrl": "http://169.254.169.254/latest/meta-data/"}]}` |

## Test steps
1. Gửi HTTP POST request đến `/api/admin/import-products` chứa địa chỉ metadata `169.254.169.254` trong `imageUrl`
2. Kiểm tra HTTP Status Code và phản hồi

## Expected result
Mã trạng thái HTTP `200 OK`. Server không thực hiện tải ngoại vi hoặc rò rỉ metadata hệ thống.

## Status / Related bugs
Not Run / None
