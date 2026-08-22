# TC-FORGOT-043: Kiểm tra hành vi chống gửi yêu cầu dồn dập (Rate Limiting / Chống Spam OTP)

## Requirement ID
FR-03, NFR-SEC-01

## Module / Test type / Technique
Forgot Password / Stress & Abuse Testing / Rate Limiting & Flooding Prevention

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Tài khoản người dùng `victim@eshop.com` đang hoạt động bình thường trong hệ thống
- Header `X-Student-Id: 23127148` được đính kèm trong request

## Test data
| Field | Value |
|---|---|
| Endpoint | POST /api/forgot-password |
| Header Content-Type | application/json |
| Header X-Student-Id | 23127148 |
| Body.email | victim@eshop.com |
| Request Burst Count | 6 requests trong vòng < 10 giây |

## Test steps
1. Gửi liên tiếp 5 HTTP POST request đến `/api/forgot-password` với cùng email `victim@eshop.com` trong khoảng thời gian dưới 10 giây.
2. Gửi tiếp HTTP POST request thứ 6 ngay sau đó từ cùng địa chỉ IP.
3. Kiểm tra mã trạng thái HTTP response, header `Retry-After` và header `X-RateLimit-Remaining`.
4. Xác minh hệ thống không kích hoạt dịch vụ gửi email/SMS cho request thứ 6.

## Expected result
- Các request trong ngưỡng (tối đa 3-5 lần/phút): Trả về `200 OK` (hoặc `202 Accepted`).
- Request thứ 6 vượt ngưỡng: Phải bị chặn với mã HTTP `429 Too Many Requests`.
- Response Body chứa thông báo lỗi rõ ràng: `{"success": false, "message": "Quá nhiều yêu cầu cấp OTP. Vui lòng thử lại sau 60 giây.", "errorCode": "ERR_RATE_LIMIT_EXCEEDED"}`.
- Không phát sinh chi phí gateway bên thứ ba ngoài dự kiến.

## Status / Related bugs
Not Run / Security Enhancement (Bảo vệ chống DoS và cạn kiệt ngân sách dịch vụ bên thứ ba)
