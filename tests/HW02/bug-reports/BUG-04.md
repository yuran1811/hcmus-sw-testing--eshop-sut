# BUG-04: Email input dùng type="text" thay vì type="email"

## Thông tin

| Trường | Giá trị |
|--------|---------|
| Bug ID | BUG-04 |
| Feature | FR-02: Login & Account Lockout |
| Severity | Minor |
| Priority | Medium |
| Status | Open |
| File:Line | `frontend-web/src/pages/Login.jsx:30` |

## Mô tả

Trường email trên trang đăng nhập dùng `type="text"` thay vì `type="email"`. Spec yêu cầu dùng `type="email"` để có HTML5 format validation tự động.

## Expected vs Actual

| | Expected | Actual |
|-|----------|--------|
| Input type | `type="email"` | `type="text"` |
| HTML5 validation | Báo lỗi nếu không đúng format email | Không validate |
| Mobile keyboard | Bàn phím email (có ký tự @) | Bàn phím thông thường |

## Root Cause

```jsx
// frontend-web/src/pages/Login.jsx line 30
<input type="text" placeholder="Email" />
// Spec yêu cầu:
<input type="email" placeholder="Email" />
```

## Screenshots

**Email input type="text" — không có HTML5 email validation:**

![Email Input Type](../playwright-tests/screenshots/FR02/DT-FR02-email-input-type.png)

*Playwright script: `playwright-tests/fr02-login.spec.js` — Test case DT-FR02-14*
