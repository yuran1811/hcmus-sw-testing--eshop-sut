# BUG-03: Sensitive Data Exposure - Cleartext OTP Leaked in HTTP Response Body

## 1. General Information

| Field | Value |
| :--- | :--- |
| **Bug ID** | `BUG-FORGOT-01` (Cleartext-OTP) |
| **Feature / Module** | FR-03: Forgot Password / OTP Generation |
| **Endpoint** | `POST /api/forgot-password` |
| **Severity** | **CRITICAL** |
| **Priority** | **HIGH** |
| **Vulnerability Type** | OWASP API3:2023 - Broken Object Property Level Authorization / Sensitive Data Exposure (CWE-200) |
| **Discovered By** | Antigravity AI & Nguyen An (Student ID: 23127148) |
| **Related Test Case** | `TC-FORGOT-027: Sensitive Data Exposure - Cleartext OTP in Response (CWE-200)` |

---

## 2. Description & Impact

When a user initiates a password reset via `POST /api/forgot-password`, the generated One-Time Password (OTP) must be transmitted exclusively through a side-channel (e.g. email or SMS). Under no circumstances should the OTP be returned to the client in the API response.

In `backend/server.js:78-82`, the API responds with:
```javascript
res.json({
  message: "Mã đặt lại mật khẩu đã được tạo",
  resetToken: resetToken,
});
```
This allows an attacker knowing any customer's email address to request a reset and capture the OTP directly from the response body, **taking over any customer account in seconds without email access**.

---

## 3. Steps to Reproduce

1. Send an HTTP `POST` request to `http://localhost:3000/api/forgot-password` with:
   - Header: `Content-Type: application/json`
   - Header: `X-Student-Id: 23127148`
   - Body: `{"email": "admin@eshop.com"}`
2. Observe the JSON response body.

---

## 4. Expected vs Actual Result

- **Expected Result:** HTTP `200 OK` returning `{ "message": "Mã đặt lại mật khẩu đã được gửi về email của bạn" }` WITHOUT any `resetToken` property.
- **Actual Result:** HTTP `200 OK` exposing `{ "message": "Mã đặt lại mật khẩu đã được tạo", "resetToken": "3248" }`.

---

## 5. Vulnerable Code Location & Recommended Fix

### Vulnerable Code (`backend/server.js:78-82`):
```javascript
res.json({
  message: "Mã đặt lại mật khẩu đã được tạo",
  resetToken: resetToken, // CRITICAL: Exposes cleartext secret
});
```

### Recommended Fix:
```javascript
// Send resetToken via email service in production:
// await emailService.sendOTP(user.email, resetToken);

res.json({
  message: "Mã đặt lại mật khẩu đã được gửi đến email của bạn",
});
```
