# TC-FORGOT-045: Kiểm tra chênh lệch thời gian phản hồi giữa email tồn tại và không tồn tại (Timing Attack Prevention)

## Requirement ID
FR-03, NFR-SEC-02

## Module / Test type / Technique
Forgot Password / Side-Channel Security Testing / Response Time Variance Analysis

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Email A: `existing.user@eshop.com` (tồn tại trong database)
- Email B: `nonexistent.user.999@eshop.com` (không tồn tại trong database)
- Header `X-Student-Id: 23127148` được đính kèm trong request

## Test data
| Field | Value |
|---|---|
| Endpoint | POST /api/forgot-password |
| Header Content-Type | application/json |
| Header X-Student-Id | 23127148 |
| Email Exists | existing.user@eshop.com |
| Email Non-Exists | nonexistent.user.999@eshop.com |
| Sampling Iterations | 20 mẫu cho mỗi trường hợp |

## Test steps
1. Gửi 20 HTTP POST request với `email: "existing.user@eshop.com"`, ghi nhận thời gian phản hồi trung bình $\bar{T}_1$.
2. Gửi 20 HTTP POST request với `email: "nonexistent.user.999@eshop.com"`, ghi nhận thời gian phản hồi trung bình $\bar{T}_2$.
3. So sánh thông điệp phản hồi và độ chênh lệch thời gian $|\bar{T}_1 - \bar{T}_2|$.

## Expected result
- Cả 2 trường hợp đều trả về cùng mã HTTP `200 OK` (hoặc thông báo chung: `"Nếu email tồn tại trong hệ thống, mã xác thực sẽ được gửi."`).
- Độ lệch thời gian trung bình $|\bar{T}_1 - \bar{T}_2| < 50\text{ms}$ (hệ thống sử dụng tác vụ nền không đồng bộ hoặc dummy time để tránh rò rỉ thông tin danh tính người dùng qua side-channel).

## Status / Related bugs
Not Run / Security Audit (Chống tấn công Account Enumeration qua phân tích thời gian)
