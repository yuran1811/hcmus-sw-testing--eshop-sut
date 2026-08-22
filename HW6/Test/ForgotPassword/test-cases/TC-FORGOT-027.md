# TC-FORGOT-027: Bảo mật: Kiểm tra rò rỉ mã đặt lại mật khẩu trong response body (CWE-200)

## Requirement ID
SEC-04 / CWE-200

## Module / Test type / Technique
Forgot Password / Security / Sensitive Data Exposure

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Tài khoản `test@eshop.com` hợp lệ

## Test data
| Field | Value |
|---|---|
| Endpoint | POST /api/forgot-password |
| Header Content-Type | application/json |
| Body.email | test@eshop.com |

## Test steps
1. Gửi HTTP POST request đến `/api/forgot-password`
2. Kiểm tra xem `resetToken` có bị trả về trực tiếp trong response body hay không

## Expected result
Mã trạng thái 200 OK. Phát hiện `resetToken` bị lộ trực tiếp trong response body (Lỗ hổng bảo mật Sensitive Data Exposure CWE-200).

## Status / Related bugs
Not Run / None
