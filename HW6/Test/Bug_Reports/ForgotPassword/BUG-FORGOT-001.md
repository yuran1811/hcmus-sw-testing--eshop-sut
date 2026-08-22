Title: [BUG][Forgot Password] Lộ mã xác thực OTP (resetToken) dạng văn bản rõ trong HTTP response body

## Found by Test Case
TC-FORGOT-027

## Requirement liên quan
FR-03 (Forgot Password / Password Reset), SEC-04 (Sensitive Data Exposure)

## Severity / Priority
Critical / P1

## Environment
- OS: Windows 11 / Linux Ubuntu 22.04
- SUT Base URL: `http://localhost:3000`
- Target Endpoint: `POST /api/forgot-password`
- Tool: Postman v10+ / Newman CLI v6.2.2

## Steps to reproduce
1. Mở Postman hoặc Terminal gửi HTTP `POST` request đến `http://localhost:3000/api/forgot-password`
2. Đính kèm header `Content-Type: application/json` và `X-Student-Id: 23127148`
3. Request Body chứa email của nạn nhân:
   ```json
   {
     "email": "test@eshop.com"
   }
   ```
4. Gửi request và kiểm tra nội dung JSON trả về trong Response Body.

## Expected result
Hệ thống trả về HTTP 200 OK với thông báo thành công và chỉ gửi mã OTP qua kênh an toàn (Email/SMS). Response body tuyệt đối không được chứa trường `resetToken`:
```json
{
  "message": "Mã đặt lại mật khẩu đã được gửi đến email của bạn"
}
```

## Actual result
Hệ thống trả về HTTP 200 OK và **để lộ trực tiếp mã OTP dạng rõ trong response body**:
```json
{
  "message": "Mã đặt lại mật khẩu đã được tạo",
  "resetToken": "3248"
}
```
Kẻ tấn công chỉ cần biết email là có thể chiếm đoạt tài khoản ngay lập tức mà không cần quyền truy cập email của nạn nhân.

## Evidence
- Mã nguồn vi phạm tại `backend/server.js:78-82`:
  ```javascript
  res.json({
    message: "Mã đặt lại mật khẩu đã được tạo",
    resetToken: resetToken,
  });
  ```
- Newman Console Log: `SECURITY ALERT: resetToken leaked in HTTP response body (CWE-200): '3248'`
