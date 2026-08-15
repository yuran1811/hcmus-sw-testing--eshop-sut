# [BUG][Categories API] Thiếu kiểm tra phân quyền Admin (RBAC) trên các endpoint quản lý danh mục (POST/PUT/DELETE /api/categories)

## Found by Test Case

- SEC-CAT-001 (Kiểm toán an ninh phân quyền API quản trị danh mục)

## Requirement liên quan

- FR-17 / NFR-SEC-01 (Kiểm soát truy cập dựa trên vai trò - Role-Based Access Control)
- Endpoints: `POST /api/categories`, `PUT /api/categories/:id`, `DELETE /api/categories/:id`

## Severity / Priority

- **Severity**: Major (Lỗ hổng bảo mật Broken Access Control)
- **Priority**: P1

## Environment

- Tool: Postman / cURL / REST Client
- OS: Windows 11
- Backend: Node.js v20.x, Express.js 4.x
- Source Code: `backend/server.js:249-278`

## Steps to reproduce

1. Đăng ký một tài khoản người dùng bình thường: `POST /api/register` (vai trò mặc định `customer`).
2. Đăng nhập để lấy Bearer Token của tài khoản khách hàng thông thường: `POST /api/login`.
3. Dùng token khách hàng đó gửi request tạo danh mục:
   ```bash
   curl -X POST http://localhost:3000/api/categories \
        -H "Authorization: Bearer <CUSTOMER_TOKEN>" \
        -H "Content-Type: application/json" \
        -d '{"name": "Hacked Category"}'
   ```
4. Gửi tiếp request xóa một danh mục quan trọng: `DELETE /api/categories/1` với cùng token khách hàng.

## Expected result

- Hệ thống phải từ chối yêu cầu và trả về mã lỗi `HTTP 403 Forbidden` do tài khoản khách hàng không có vai trò `admin`.

## Actual result

- Server xử lý thành công và trả về `HTTP 200 OK` (`{"message": "Category created", "id": ...}` hoặc `{"message": "Category deleted"}`).
- Nguyên nhân: Các router `POST`, `PUT`, `DELETE` tại `backend/server.js:249-278` chỉ gắn middleware `authenticateToken` (chỉ kiểm tra token hợp lệ) mà hoàn toàn không kiểm tra `if (req.user.role !== 'admin')`.

## Evidence

- Trích xuất mã nguồn `backend/server.js:249-278`:
  ```javascript
  app.post("/api/categories", authenticateToken, (req, res) => { // THIẾU: requireAdmin
    const { name } = req.body;
    db.run("INSERT INTO categories (name) VALUES (?)", [name], function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Category created", id: this.lastID });
    });
  });
  ```
