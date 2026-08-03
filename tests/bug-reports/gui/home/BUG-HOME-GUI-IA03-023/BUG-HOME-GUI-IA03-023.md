---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Home] Nút đăng xuất hiển thị sai nhãn"
assignees: ""
labels: "type: bug, module: product, severity: minor, priority: P2, status: new, found-by: test-case, type: gui-issue, screen: home"
---

## Found by Test Case

HOME-GUI-IA03-023

## Requirement liên quan

FR-23

## Severity / Priority

Minor / P2

## Environment

- Browser: Google Chrome (Windows 11)
- Browser: Mozilla Firefox (Windows 11)

URL: `http://localhost:5173` (hoặc local Metro Bundler với di động)

## Steps to reproduce

1. Đăng nhập bằng tài khoản hợp lệ.
2. Mở lại trang Home.
3. Quan sát nút thoát trên header.

## Expected result

Nút phải hiển thị đúng nhãn `Đăng xuất`.

## Actual result

Nút đang hiển thị là `Thoát`, không khớp nhãn yêu cầu.

## Console / Repro

```javascript
localStorage.getItem('token');
document.querySelector('button.bg-red-500')?.textContent;
```

## Evidence

- **Ảnh chụp lỗi trên Google Chrome:** ![Evidence 1](BUG-HOME-GUI-IA03-023_01.png)
- **Ảnh chụp lỗi trên Firefox:** ![Evidence 2](BUG-HOME-GUI-IA03-023_02.png)
