---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Home] Trạng thái hover/visited/active chưa đủ phân biệt"
assignees: ""
---

## Found by Test Case

HOME-GUI-IA01-049

## Requirement liên quan

N/A

## Severity / Priority

Minor / P3

## Environment

- Browser: Google Chrome (Windows 11)
- Browser: Mozilla Firefox (Windows 11)

URL: `http://localhost:5173` (hoặc local Metro Bundler với di động)

## Steps to reproduce

1. Mở trang Home.
2. Hover hoặc truy cập qua lại các link điều hướng.
3. Quan sát trạng thái hiển thị của link và button.

## Expected result

Các link và nút phải có trạng thái hover/visited/active dễ phân biệt.

## Actual result

Trạng thái hover/visited/active chưa đủ rõ để phân biệt một cách nhất quán.

## Console / Repro

```javascript
const cart = document.querySelector('a[href="/cart"]');
getComputedStyle(cart).textDecorationLine;
```

## Evidence

- **Ảnh chụp lỗi trên Google Chrome:** ![Evidence 1](BUG-HOME-GUI-IA01-049_01.png)
- **Ảnh chụp lỗi trên Firefox:** ![Evidence 2](BUG-HOME-GUI-IA01-049_02.png)
