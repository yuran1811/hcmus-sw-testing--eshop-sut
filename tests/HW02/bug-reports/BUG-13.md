# BUG-13: API_URL hardcoded trong Mobile App

## Thông tin

| Trường | Giá trị |
|--------|---------|
| Bug ID | BUG-13 |
| Feature | FR-20 (Mobile) — Cấu hình |
| Severity | Minor |
| Priority | Low |
| Status | Open |
| File:Line | `frontend-mobile/App.js:16` |

## Mô tả

URL của backend API được hardcode thành địa chỉ IP cục bộ cố định (`192.168.10.13:3000`). Bất kỳ ai chạy app trên môi trường khác (mạng khác, IP máy chủ khác) sẽ không kết nối được backend.

## Root Cause

```javascript
// frontend-mobile/App.js:16
const API_URL = "http://192.168.10.13:3000/api";
// Nên dùng biến môi trường hoặc config file
```

## Expected

```javascript
// Dùng biến môi trường hoặc config
const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000/api";
```

## Impact

- Người chạy app phải sửa tay IP mỗi lần thay đổi môi trường
- Không thể deploy app mà không sửa code
