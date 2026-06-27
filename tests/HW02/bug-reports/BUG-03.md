# BUG-03: Password input hiển thị plaintext (type="text")

## Thông tin

| Trường | Giá trị |
|--------|---------|
| Bug ID | BUG-03 |
| Feature | FR-02: Login & Account Lockout |
| Severity | Critical |
| Priority | High |
| Status | Open |
| File:Line | `frontend-web/src/pages/Login.jsx:40` |

## Mô tả

Trường mật khẩu trên trang đăng nhập dùng `type="text"` thay vì `type="password"`. Hệ quả: mật khẩu hiển thị dưới dạng **văn bản thường** (plaintext) khi người dùng nhập, ai đứng gần màn hình đều có thể thấy.

## Reproduce Steps

1. Mở `http://localhost:5173/login`
2. Click vào trường Password
3. Nhập bất kỳ ký tự nào
4. Quan sát: ký tự hiện ra dưới dạng text thông thường, không bị ẩn thành `●●●●`

## Expected vs Actual

| | Expected | Actual |
|-|----------|--------|
| Input type | `type="password"` | `type="text"` |
| Hiển thị khi nhập | `●●●●●` (ẩn) | Text thô (hiện) |

## Root Cause

```jsx
// frontend-web/src/pages/Login.jsx line 40
<input type="text" ... placeholder="Password" />
// Phải là:
<input type="password" ... placeholder="Password" />
```

## Impact

Nghiêm trọng: mật khẩu bị lộ với bất kỳ ai nhìn vào màn hình người dùng.
