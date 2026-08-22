# TC-CANCEL-016: Thử nghiệm SQL Injection - Stacked Query DROP TABLE (SEC-05)

## Requirement ID
SEC-05

## Module / Test type / Technique
Order Cancel / Security / Destructive SQL Injection

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Tài khoản người dùng có Bearer Token hợp lệ
- Header `X-Student-Id: 23127148` được đính kèm trong request

## Test data
| Field | Value |
|---|---|
| Endpoint | PUT /api/orders/1; DROP TABLE orders;--/cancel |
| Header Authorization | Bearer {{userToken}} |
| Header X-Student-Id | 23127148 |
| Param.id | 1; DROP TABLE orders;-- |

## Test steps
1. Gửi HTTP PUT request đến `/api/orders/1;%20DROP%20TABLE%20orders;--/cancel`
2. Đính kèm header `X-Student-Id: 23127148`
3. Nhận và kiểm tra mã trạng thái HTTP response

## Expected result
Mã trạng thái HTTP 404 Not Found (hoặc 400). Câu lệnh phá hoại DROP TABLE không được thực thi; cơ sở dữ liệu và bảng `orders` vẫn an toàn.

## Status / Related bugs
Pass (SUT sử dụng Prepared Statement tham số hóa)
