# TC-FORGOT-006: Yêu cầu mã đặt lại mật khẩu với email chưa từng đăng ký (Unregistered Email)

## Requirement ID
FR-03

## Module / Test type / Technique
Forgot Password / Functional / Equivalence Partitioning

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Email `unregistered_user_99999@eshop.com` hoàn toàn không có trong database

## Test data
| Field | Value |
|---|---|
| Endpoint | POST /api/forgot-password |
| Header Content-Type | application/json |
| Body.email | unregistered_user_99999@eshop.com |

## Test steps
1. Gửi HTTP POST request đến `/api/forgot-password` với email chưa đăng ký
2. Kiểm tra mã trạng thái và thông báo lỗi

## Expected result
Mã trạng thái HTTP 404 Not Found với body `{"error": "User not found"}`.

## Status / Related bugs
Not Run / None
