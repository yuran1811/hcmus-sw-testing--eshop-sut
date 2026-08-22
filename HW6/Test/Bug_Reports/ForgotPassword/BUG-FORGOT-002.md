Title: [BUG][Forgot Password] Sinh mã OTP độ dài 4 chữ số với entropy quá thấp và PRNG yếu

## Found by Test Case
TC-FORGOT-028

## Requirement liên quan
FR-03 (Forgot Password / OTP Generation), SEC-04 (Cryptography & Randomness)

## Severity / Priority
Major / P2

## Environment
- OS: Windows 11 / Linux Ubuntu 22.04
- SUT Base URL: `http://localhost:3000`
- Target Endpoint: `POST /api/forgot-password`
- Tool: Postman v10+ / Newman CLI v6.2.2

## Steps to reproduce
1. Gửi HTTP `POST` request đến `/api/forgot-password` với `{"email": "test@eshop.com"}`
2. Kiểm tra độ dài và không gian mẫu của mã `resetToken` được sinh ra.
3. Kiểm tra hàm sinh số ngẫu nhiên trong mã nguồn backend (`backend/server.js:72`).

## Expected result
Mã OTP khôi phục mật khẩu phải có độ dài tối thiểu $\ge 6$ ký tự chữ số ngẫu nhiên hoặc token bảo mật dạng UUID v4 / Cryptographic Hex (tối thiểu 128-bit entropy) sử dụng module `crypto.randomBytes()`.

## Actual result
Mã OTP được sinh bằng thuật toán giả ngẫu nhiên không an toàn:
```javascript
const resetToken = Math.floor(1000 + Math.random() * 9000).toString();
```
Tạo ra mã OTP 4 chữ số từ `1000` đến `9999` (chỉ có đúng **9,000 không gian mẫu**). Kẻ tấn công có thể thực hiện brute-force toàn bộ không gian mẫu này trong vòng chưa đầy 1 giây.

## Evidence
- Mã nguồn vi phạm tại `backend/server.js:72`:
  ```javascript
  const resetToken = Math.floor(1000 + Math.random() * 9000).toString();
  ```
- Newman Console Log: `SECURITY ALERT: Weak 4-digit numeric OTP detected (9,000 entropy space)`
