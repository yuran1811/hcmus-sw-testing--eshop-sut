# BUG-14: Missing Role-Based Access Control on All Admin Endpoints

## Bug Information

| Field       | Value                          |
|-------------|-------------------------------|
| **Bug ID**  | BUG-14                        |
| **Feature** | FR-12 / FR-18 / FR-10         |
| **Severity**| Critical                       |
| **Priority**| P0                            |
| **Status**  | Open                          |
| **Found by**| Domain Testing – DT-FR10-17, DT-FR18-02, DT-FR12-01 |

## Description

The `authenticateToken` middleware (`server.js:100–110`) only verifies that a JWT token is **valid** — it does NOT check whether the authenticated user has the `admin` role. As a result, **any logged-in regular user** can access all `/api/admin/*` endpoints:

- `GET /api/admin/orders` — returns ALL orders from ALL users
- `PUT /api/admin/orders/:id/status` — updates order status (can confirm, ship, deliver, cancel any order)
- `GET /api/admin/users` — returns complete user list with personal data

## Steps to Reproduce

1. Register as a regular user and obtain a JWT token via `POST /api/login`.
2. Use that token to call:
   ```bash
   curl -H "Authorization: Bearer <USER_TOKEN>" http://localhost:3000/api/admin/orders
   # Returns HTTP 200 with ALL orders
   
   curl -X PUT -H "Authorization: Bearer <USER_TOKEN>" \
     -H "Content-Type: application/json" \
     -d '{"status":"confirmed"}' \
     http://localhost:3000/api/admin/orders/1/status
   # Returns HTTP 200, status updated!
   ```

## Root Cause

```javascript
// server.js:100–110
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(401).json({ error: "Unauthorized" });
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: "Forbidden" });
    req.user = user;
    next();  // ← NO ROLE CHECK — any authenticated user passes
  });
};
```

Admin endpoints use `authenticateToken` but never verify `req.user.role === 'admin'`.

## Expected Behavior

- Regular user token → `GET /api/admin/orders` → `HTTP 403 Forbidden`
- Regular user token → `PUT /api/admin/orders/:id/status` → `HTTP 403 Forbidden`
- Only admin tokens (role=admin) should be granted access

## Actual Behavior

All `/api/admin/*` endpoints return **HTTP 200** for any authenticated user.

## Affected Endpoints

| Endpoint | Method |
|----------|--------|
| `/api/admin/orders` | GET |
| `/api/admin/orders/:id/status` | PUT |
| `/api/admin/users` | GET |
| `/api/admin/products` | GET, POST, PUT, DELETE |
| `/api/admin/categories` | GET, POST |
| `/api/admin/coupons` | GET, POST |

## Suggested Fix

Add an `authorizeAdmin` middleware:

```javascript
const authorizeAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden: Admin access required' });
  }
  next();
};

// Apply to all admin routes:
app.get('/api/admin/orders', authenticateToken, authorizeAdmin, ...);
app.put('/api/admin/orders/:id/status', authenticateToken, authorizeAdmin, ...);
```

## Test Evidence

| TC-ID | Test | Expected | Actual |
|-------|------|----------|--------|
| DT-FR18-02 | User GET /api/admin/orders | HTTP 403 | **HTTP 200** |
| DT-FR10-17 | User PUT /api/admin/orders/:id/status | HTTP 403 | **HTTP 200** |
| DT-FR12-01 | User GET /api/admin/users | HTTP 403 | **HTTP 200** |

## Security Impact

**CRITICAL** — This is a Broken Access Control vulnerability (OWASP Top 10 #1). A malicious user can:
1. View all customers' orders and personal data (GDPR breach)
2. Manipulate any order status (financial fraud)
3. Access admin-only features without authorization
