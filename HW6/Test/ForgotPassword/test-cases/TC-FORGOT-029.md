# TC-FORGOT-029: Bảo mật: Kiểm tra giới hạn tần suất yêu cầu chống Spam/DoS (Rate Limiting - CWE-799)

## Requirement ID
SEC-01 / CWE-799

## Module / Test type / Technique
Forgot Password / Security / Anti-Automation

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`

## Test data
| Field | Value |
|---|---|
| Endpoint | POST /api/forgot-password |
| Body.email | test@eshop.com |

## Test steps
1. Gửi liên tiếp nhiều request yêu cầu reset password trong thời gian ngắn
2. Kiểm tra xem server có trả về HTTP 429 Too Many Requests hoặc header giới hạn hay không

## Expected result
Đánh giá khả năng phòng vệ chống spam và ghi đè token liên tục của hệ thống.

## Status / Related bugs
Not Run / None
