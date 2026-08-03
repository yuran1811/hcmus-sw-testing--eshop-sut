---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Home] Ảnh sản phẩm không có alt text mô tả"
assignees: ""
---

## Found by Test Case

HOME-GUI-IA04-034

## Requirement liên quan

FR-05, FR-24, WCAG

## Severity / Priority

Minor / P2

## Environment

- Browser: Google Chrome (Windows 11)
- Browser: Mozilla Firefox (Windows 11)

URL: `http://localhost:5173` (hoặc local Metro Bundler với di động)

## Steps to reproduce

1. Mở trang Home.
2. Quan sát một product card bất kỳ trong danh sách sản phẩm.
3. Kiểm tra thuộc tính `alt` của ảnh sản phẩm.

## Expected result

Mỗi ảnh sản phẩm phải có `alt` mô tả rõ nội dung ảnh để hỗ trợ screen reader và trợ năng.

## Actual result

Ảnh sản phẩm đang dùng `alt=""`, nên người dùng dùng screen reader không nhận được mô tả nào cho hình ảnh.

## Console / Repro

```javascript
document.querySelectorAll('img:not([alt]), img[alt=""]').length
```

## Evidence

- **HOME-GUI-IA04-034 (Ảnh 1: Home page với product grid):**
- **Ảnh chụp lỗi trên Google Chrome:** ![Evidence 1](BUG-HOME-GUI-IA04-034_01.png)
- **Ảnh chụp lỗi trên Firefox:** ![Evidence 2](BUG-HOME-GUI-IA04-034_02.png)
