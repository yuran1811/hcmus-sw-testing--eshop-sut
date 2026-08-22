# BUG-01: Broken Function Level Authorization (BFLA) on Product Batch Import

## 1. General Information

| Field | Value |
| :--- | :--- |
| **Bug ID** | `BUG-IMPORT-01` (BFLA) |
| **Feature / Module** | FR-16: CSV Product Batch Import |
| **Endpoint** | `POST /api/admin/import-products` |
| **Severity** | **CRITICAL** |
| **Priority** | **HIGH** |
| **Vulnerability Type** | OWASP API5:2023 - Broken Function Level Authorization (CWE-285) |
| **Discovered By** | Antigravity AI & Nguyen An (Student ID: 23127148) |
| **Related Test Case** | `TC-IMPORT-001: Standard User Role Privilege Escalation (SEC-03)` |

---

## 2. Description & Impact

The administrative endpoint `POST /api/admin/import-products` is designed exclusively for administrators to perform bulk product catalog modifications. 

However, in `backend/server.js:199`, the route uses `authenticateToken` middleware but completely omits checking if `req.user.role === 'admin'`. As a result, **any authenticated customer with a standard user account can perform bulk product insertions**, corrupting the product database and escalating privileges.

---

## 3. Steps to Reproduce

1. Authenticate as a standard customer (`email: test@eshop.com`, `role: user`) via `POST /api/login` to obtain a standard Bearer JWT.
2. Send an HTTP `POST` request to `http://localhost:3000/api/admin/import-products` with:
   - Header: `Authorization: Bearer <standard_user_token>`
   - Header: `X-Student-Id: 23127148`
   - Header: `Content-Type: application/json`
   - Body:
     ```json
     {
       "products": [
         {
           "name": "Hacked Product Item",
           "price": 1000,
           "description": "Unauthorized Admin Import",
           "imageUrl": "https://example.com/item.png",
           "category_id": 1
         }
       ]
     }
     ```
3. Observe the response status code and database modifications.

---

## 4. Expected vs Actual Result

- **Expected Result:** HTTP `403 Forbidden` with `{ "error": "Forbidden: Admin access required" }`. The product is NOT inserted.
- **Actual Result:** HTTP `200 OK` with `{ "message": "Import hoàn tất: 1/1 sản phẩm được thêm", "inserted": 1, "errors": [] }`. The product is persisted in the database.

---

## 5. Vulnerable Code Location & Recommended Fix

### Vulnerable Code (`backend/server.js:199`):
```javascript
app.post("/api/admin/import-products", authenticateToken, (req, res) => {
  const { products: rows } = req.body;
  // MISSING: Role validation guard
```

### Recommended Fix:
```javascript
app.post("/api/admin/import-products", authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: "Forbidden: Admin access required" });
  }
  const { products: rows } = req.body;
  // ...
```
