# BUG-04: Unhandled TypeError Causing Server Crash (500) on Non-JSON Content-Type

## 1. General Information

| Field | Value |
| :--- | :--- |
| **Bug ID** | `BUG-FORGOT-02` (Crash-500) |
| **Feature / Module** | FR-03: Forgot Password Input Handling |
| **Endpoint** | `POST /api/forgot-password` |
| **Severity** | **MEDIUM** |
| **Priority** | **MEDIUM** |
| **Defect Type** | Robustness / Unhandled Exception (CWE-754) |
| **Discovered By** | Antigravity AI & Nguyen An (Student ID: 23127148) |
| **Related Test Case** | `TC-FORGOT-034 & TC-FORGOT-035: Content-Type Tampering (text/plain & urlencoded)` |

---

## 2. Description & Impact

When an incoming HTTP request is sent with `Content-Type: text/plain` or `Content-Type: application/x-www-form-urlencoded`, Express's `body-parser.json()` does not parse the payload, leaving `req.body` as `undefined`.

In `backend/server.js:69`, the route immediately attempts object destructuring:
```javascript
const { email } = req.body;
```
This triggers an unhandled `TypeError: Cannot destructure property 'email' of 'req.body' as it is undefined`, crashing the request handler and leaking internal Node.js stack traces with HTTP status `500 Internal Server Error`.

---

## 3. Steps to Reproduce

1. Send an HTTP `POST` request to `http://localhost:3000/api/forgot-password` with:
   - Header: `Content-Type: text/plain`
   - Header: `X-Student-Id: 23127148`
   - Raw body: `email=test@eshop.com`
2. Observe server terminal output and response code.

---

## 4. Expected vs Actual Result

- **Expected Result:** HTTP `400 Bad Request` or `415 Unsupported Media Type` returning a clean JSON error `{ "error": "Invalid Content-Type or missing body" }`.
- **Actual Result:** HTTP `500 Internal Server Error` with unhandled exception stack trace:
  ```text
  TypeError: Cannot destructure property 'email' of 'req.body' as it is undefined.
      at backend/server.js:69:11
  ```

---

## 5. Vulnerable Code Location & Recommended Fix

### Vulnerable Code (`backend/server.js:68-69`):
```javascript
app.post("/api/forgot-password", (req, res) => {
  const { email } = req.body; // Crashes when req.body is undefined
```

### Recommended Fix:
```javascript
app.post("/api/forgot-password", (req, res) => {
  if (!req.body || typeof req.body !== 'object') {
    return res.status(400).json({ error: "Request body must be a valid JSON object" });
  }
  const email = req.body.email;
  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: "Valid email string is required" });
  }
  // ...
```
