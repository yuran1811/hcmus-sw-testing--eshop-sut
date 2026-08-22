# TC-FORGOT-026: Bảo mật: Kiểm tra lỗ hổng dò quét tài khoản người dùng (User Enumeration - CWE-203)

## Requirement ID
SEC-03 / CWE-203

## Module / Test type / Technique
Forgot Password / Security / Side-Channel Analysis

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Đã biết tài khoản `test@eshop.com` tồn tại, và tài khoản `unregistered_probe@eshop.com` không tồn tại

## Test data
| Field | Value |
|---|---|
| Endpoint | POST /api/forgot-password |
| Existing Email | test@eshop.com (Status: 200) |
| Non-Existing Email | unregistered_probe@eshop.com (Status: 404) |

## Test steps
1. Gửi yêu cầu với email đã tồn tại và ghi nhận response code (200)
2. Gửi yêu cầu với email không tồn tại và ghi nhận response code (404)
3. Đối chiếu sự khác biệt mã phản hồi để xác định nguy cơ dò quét tài khoản

## Expected result
Theo chuẩn OWASP, cả 2 trường hợp nên trả về 200 cùng thông báo chung. Trên SUT trả về 404, xác nhận tồn tại nguy cơ User Enumeration (CWE-203).

## Status / Related bugs
Not Run / None
