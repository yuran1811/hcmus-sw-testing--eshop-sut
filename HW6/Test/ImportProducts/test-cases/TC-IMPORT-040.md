# TC-IMPORT-040: Kiểm Toán Học Thuật - Header Truy Vết Bắt Buộc (X-Student-Id: 23127148)

## Requirement ID
FR-16 / Academic Traceability (HW06 §6.1)

## Module / Test type / Technique
Admin Product Import / Audit & Compliance / Traceability Header Verification

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Đã đăng nhập bằng tài khoản admin và có `adminToken` hợp lệ
- Header `X-Student-Id: 23127148` được cấu hình tự động trong Pre-request script của Postman Collection

## Test data
| Field | Value |
|---|---|
| Endpoint | POST /api/admin/import-products |
| Header Authorization | Bearer {{adminToken}} |
| Header X-Student-Id | 23127148 |
| Body (JSON) | `{"products": [{"name": "Traceability Product", "price": 50000}]}` |

## Test steps
1. Gửi request import sản phẩm với header `X-Student-Id: 23127148`
2. Kiểm tra log và xác nhận header được gửi thành công kèm request

## Expected result
Request được gửi đi với header `X-Student-Id: 23127148`. Phản hồi trả về `200 OK`.

## Status / Related bugs
Not Run / None
