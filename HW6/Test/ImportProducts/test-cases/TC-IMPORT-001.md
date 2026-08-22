# TC-IMPORT-001: Phân quyền API Import Products (Role Escalation - User Token to Admin Route)

## Requirement ID
FR-16 / SEC-03 (Broken Function Level Authorization / BFLA)

## Module / Test type / Technique
Admin Product Import / Security / Role-Based Access Control (RBAC)

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Tài khoản người dùng tiêu chuẩn `test@eshop.com` (role: `user`) đã đăng nhập và nhận `userToken` hợp lệ
- Header `X-Student-Id: 23127148` được đính kèm trong request

## Test data
| Field | Value |
|---|---|
| Endpoint | POST /api/admin/import-products |
| Header Authorization | Bearer {{userToken}} |
| Header X-Student-Id | 23127148 |
| Body (JSON) | `{"products": [{"name": "Unauthorized Product", "price": 10000}]}` |

## Test steps
1. Gửi HTTP POST request đến `/api/admin/import-products` sử dụng Bearer token của tài khoản người dùng thường (`role: 'user'`)
2. Đính kèm header `X-Student-Id: 23127148` và payload sản phẩm hợp lệ
3. Kiểm tra HTTP Status Code và Response Body

## Expected result
Mã trạng thái HTTP `403 Forbidden` do endpoint thuộc phân quyền quản trị viên (`admin`). Người dùng thường không được phép import sản phẩm.

## Status / Related bugs
**SUT Bug (server.js:199):** SUT chỉ sử dụng middleware `authenticateToken` nhưng bỏ sót kiểm tra `req.user.role === 'admin'`. Người dùng thường gửi request nhận về `200 OK` thay vì `403 Forbidden`.
