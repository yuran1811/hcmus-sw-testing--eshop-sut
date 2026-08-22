Title: [BUG][Import Products] Lỗ hổng leo thang đặc quyền BFLA cho phép người dùng thường import sản phẩm của Admin

## Found by Test Case
TC-IMPORT-001

## Requirement liên quan
FR-16 (CSV Product Import), OWASP API5:2023 (Broken Function Level Authorization), SEC-03 (Role-Based Access Control)

## Severity / Priority
Critical / P1

## Environment
- OS: Windows 11 / Linux Ubuntu 22.04
- SUT Base URL: `http://localhost:3000`
- Target Endpoint: `POST /api/admin/import-products`
- Tool: Postman v10+ / Newman CLI v6.2.2

## Steps to reproduce
1. Đăng nhập tài khoản khách hàng thông thường (`test@eshop.com`, mật khẩu: `Test1234!`, `role: user`) để lấy standard Bearer JWT Token.
2. Gửi HTTP `POST` request đến `http://localhost:3000/api/admin/import-products` với:
   - Header: `Authorization: Bearer <user_token>`
   - Header: `X-Student-Id: 23127148`
   - Header: `Content-Type: application/json`
   - Body:
     ```json
     {
       "products": [
         {
           "name": "Sản phẩm hack bởi User thường",
           "price": 1000,
           "description": "Unauthorized Import Test",
           "imageUrl": "https://placehold.co/300x300",
           "category_id": 1
         }
       ]
     }
     ```
3. Quan sát response trả về và kiểm tra danh sách sản phẩm qua `GET /api/products`.

## Expected result
Hệ thống phải từ chối request với mã lỗi **HTTP `403 Forbidden`** kèm thông báo lỗi rõ ràng:
```json
{
  "error": "Forbidden: Admin access required"
}
```
Không cho phép thêm sản phẩm vào cơ sở dữ liệu.

## Actual result
Do middleware tại `backend/server.js:199` chỉ xác thực tính hợp lệ của token mà **hoàn toàn không kiểm tra `req.user.role === 'admin'`**:
```javascript
app.post("/api/admin/import-products", authenticateToken, (req, res) => {
```
Hệ thống **chấp nhận thực thi quyền Admin cho User thường**, trả về **`200 OK`** với `{ "inserted": 1, "errors": [] }` và chèn thành công sản phẩm vào Database.

## Evidence
- Mã nguồn vi phạm tại `backend/server.js:199`:
  ```javascript
  app.post("/api/admin/import-products", authenticateToken, (req, res) => {
    const { products: rows } = req.body;
    // THIẾU ROLE CHECK: if (req.user.role !== 'admin') ...
  ```
- Thử nghiệm thực tế: User thường đăng nhập lấy token gửi request $\to$ Response trả về HTTP 200 OK.
