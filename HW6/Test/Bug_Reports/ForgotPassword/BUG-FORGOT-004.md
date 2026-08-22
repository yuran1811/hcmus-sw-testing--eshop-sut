Title: [BUG][Forgot Password] Sập server (500 Internal Server Error) do TypeError khi nhận Content-Type không phải JSON

## Found by Test Case
TC-FORGOT-034, TC-FORGOT-035

## Requirement liên quan
FR-03 (Forgot Password), RFC 7231 / Input Robustness (CWE-754)

## Severity / Priority
Major / P2

## Environment
- OS: Windows 11 / Linux Ubuntu 22.04
- SUT Base URL: `http://localhost:3000`
- Target Endpoint: `POST /api/forgot-password`
- Tool: Postman v10+ / Newman CLI v6.2.2

## Steps to reproduce
1. Gửi HTTP `POST` request đến `http://localhost:3000/api/forgot-password`
2. Đính kèm header `Content-Type: text/plain` (hoặc `application/x-www-form-urlencoded`)
3. Body gửi chuỗi: `email=test@eshop.com`
4. Gửi request và quan sát log của server backend.

## Expected result
Hệ thống xử lý an toàn, trả về mã lỗi HTTP `400 Bad Request` hoặc `415 Unsupported Media Type` với thông điệp JSON rõ ràng. Tuyệt đối không làm sập server hoặc trả về mã 500.

## Actual result
Do `body-parser.json()` không parse được kiểu `text/plain`, biến `req.body` nhận giá trị `undefined`. Khi chạy đến dòng `const { email } = req.body`, Node.js văng ngoại lệ không được bắt:
```text
TypeError: Cannot destructure property 'email' of 'req.body' as it is undefined.
    at backend/server.js:69:11
```
Hệ thống trả về **`500 Internal Server Error`** kèm HTML stack trace nội bộ của framework Express.

## Evidence
- Mã nguồn tại `backend/server.js:68-69`:
  ```javascript
  app.post("/api/forgot-password", (req, res) => {
    const { email } = req.body; // Gây crash khi req.body là undefined
  ```
- Newman Assertion Error: `expected [ 400, 404, 415 ] to include 500`
