# TC-FORGOT-044: Kiểm tra sự đồng nhất khi nhập email chữ hoa, chữ thường và khoảng trắng thừa (Email Normalization & Trimming)

## Requirement ID
FR-03, NFR-UX-01

## Module / Test type / Technique
Forgot Password / Robustness & Data Normalization / Equivalence Partitioning

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Tài khoản người dùng `customer.vip@eshop.com` đã đăng ký trong cơ sở dữ liệu
- Header `X-Student-Id: 23127148` được đính kèm trong request

## Test data
| Field | Value |
|---|---|
| Endpoint | POST /api/forgot-password |
| Header Content-Type | application/json |
| Header X-Student-Id | 23127148 |
| Body.email | `   Customer.VIP@EShop.COM  ` (chứa leading/trailing spaces và mixed case) |

## Test steps
1. Gửi HTTP POST request đến `/api/forgot-password` với body chứa email định dạng hỗn hợp hoa thường và khoảng trắng đầu cuối: `   Customer.VIP@EShop.COM  `.
2. Kiểm tra mã trạng thái HTTP response và body trả về.
3. Kiểm tra bản ghi `users` trong cơ sở dữ liệu để xác nhận mã OTP (`reset_token`) được cập nhật chính xác cho tài khoản `customer.vip@eshop.com`.

## Expected result
- HTTP Status: `200 OK`.
- Response Body: `{"success": true, "message": "Mã xác thực đã được gửi tới email của bạn."}` (hoặc tương đương).
- Hệ thống tự động sanitize `.trim()` và `.toLowerCase()`, gán mã OTP thành công cho tài khoản hợp lệ thay vì từ chối người dùng bằng lỗi 400 hoặc 404.

## Status / Related bugs
Not Run / Usability & Robustness Testing (Tối ưu trải nghiệm người dùng trên thiết bị di động)
