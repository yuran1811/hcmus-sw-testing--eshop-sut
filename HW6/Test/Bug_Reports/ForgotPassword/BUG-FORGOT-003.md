Title: [BUG][Forgot Password] Lỗ hổng dò quét người dùng (User Enumeration) qua phân biệt Response Code

## Found by Test Case
TC-FORGOT-026

## Requirement liên quan
FR-03 (Forgot Password), OWASP API3:2023 (Broken Object Property Level Authorization)

## Severity / Priority
Medium / P2

## Environment
- OS: Windows 11 / Linux Ubuntu 22.04
- SUT Base URL: `http://localhost:3000`
- Target Endpoint: `POST /api/forgot-password`
- Tool: Postman v10+ / Newman CLI v6.2.2

## Steps to reproduce
1. Gửi request `POST /api/forgot-password` với email **đã đăng ký** (`test@eshop.com`) $\to$ Nhận phản hồi.
2. Gửi request `POST /api/forgot-password` với email **chưa đăng ký** (`unregistered_999@eshop.com`) $\to$ Nhận phản hồi.
3. So sánh mã trạng thái HTTP và nội dung response body.

## Expected result
Để ngăn chặn tấn công dò quét danh sách khách hàng (User Enumeration - CWE-203), cả 2 trường hợp email tồn tại và không tồn tại đều phải trả về cùng **mã trạng thái HTTP 200 OK** với thông điệp đồng nhất: `"Nếu email tồn tại trong hệ thống, hướng dẫn đặt lại mật khẩu đã được gửi đi."`.

## Actual result
- Email tồn tại: Trả về **`200 OK`**.
- Email không tồn tại: Trả về **`404 Not Found`** với `{ "error": "User not found" }`.
Sự khác biệt rõ ràng này cho phép kẻ tấn công tạo script tự động dò quét kiểm tra hàng triệu email xem tài khoản nào đã đăng ký trên EShop.

## Evidence
- Mã nguồn tại `backend/server.js:70-71`:
  ```javascript
  db.get("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
    if (!user) return res.status(404).json({ error: "User not found" });
  ```
