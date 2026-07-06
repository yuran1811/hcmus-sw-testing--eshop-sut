# BUG-01: Email format không được validate

## Thông tin chung

| Trường | Giá trị |
|--------|---------|
| Bug ID | BUG-01 |
| Feature | FR-01 — Account Register |
| Severity | High |
| Status | Open |
| Ngày phát hiện | 2026-06-29 |
| Phát hiện bởi | Playwright DTT — TC-REGISTER-DTT-009, TC-REGISTER-DTT-011 |

## Mô tả

Input field Email sử dụng `type="text"` thay vì `type="email"`. Hệ thống không thực hiện bất kỳ kiểm tra nào về định dạng email trước khi submit form. Người dùng có thể nhập bất kỳ chuỗi ký tự nào (vd: `notanemail`, `@nodomain`, `abc`) và form vẫn submit thành công, tạo tài khoản với email không hợp lệ.

## Steps to Reproduce

1. Mở `http://localhost:5173/register`
2. Nhập Name: `Test User`
3. Nhập Email: `notanemail` (không có `@` và domain)
4. Nhập Password: `Abc 12345` (password pass được flawed regex hiện tại)
5. Bấm **Đăng Ký**

## Expected Result

Hệ thống hiển thị lỗi: *"Email không đúng định dạng"* và không submit form.

## Actual Result

Form submit thành công, tài khoản được tạo với email `notanemail` trong DB. Không có thông báo lỗi nào về định dạng email.

## Root Cause

```jsx
// frontend-web/src/pages/Register.jsx : 48
<input
  type="text"   // ← phải là type="email" hoặc thêm regex validation
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  ...
/>
```

Ngoài ra, backend cũng không validate email format (xem BUG-05).

## Fix đề xuất

```jsx
// frontend-web/src/pages/Register.jsx
// Đổi type và thêm validation:
<input
  type="email"
  value={email}
  ...
/>

// Hoặc thêm regex check trước khi submit:
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  setError('Email không đúng định dạng.');
  return;
}
```

## Related TC

- TC-REGISTER-DTT-009 (C1=F, C3=T, C4=T)
- TC-REGISTER-DTT-010 (C1=F, C3=T, C4=F)
- TC-REGISTER-DTT-011 (C1=F, C3=F, C4=T)
- TC-REGISTER-DTT-012 (C1=F, C3=F, C4=F)
