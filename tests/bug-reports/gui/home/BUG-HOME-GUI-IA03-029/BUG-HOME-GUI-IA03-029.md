---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Home] Footer không có link điều hướng"
assignees: ""
labels: "type: bug, module: product, severity: minor, priority: P3, status: new, found-by: test-case, type: gui-issue, screen: home"
---

## Found by Test Case

HOME-GUI-IA03-029

## Requirement liên quan

N/A

## Severity / Priority

Minor / P3

## Environment

- Browser: Google Chrome (Windows 11)
- Browser: Mozilla Firefox (Windows 11)
- Device: Samsung Galaxy S9+ (Android 10) / App: Expo Go (React Native)

URL: `http://localhost:5173` (hoặc local Metro Bundler với di động)

## Steps to reproduce

1. Mở trang Home.
2. Kéo xuống footer.
3. Kiểm tra các link điều hướng ở footer.

## Expected result

Footer phải có các link hoạt động, không làm người dùng bị dead-end.

## Actual result

Footer không có link điều hướng nào.

## Console / Repro

```javascript
[...document.querySelectorAll('footer a')].map((a) => ({ text: a.textContent.trim(), href: a.href }))
```

## Evidence

- **Ảnh chụp lỗi trên Google Chrome:** ![Evidence 1](BUG-HOME-GUI-IA03-029_01.png)
- **Ảnh chụp lỗi trên Firefox:** ![Evidence 2](BUG-HOME-GUI-IA03-029_02.png)
- **Ảnh chụp lỗi trên Expo Go (Android):** ![Evidence 3](BUG-HOME-GUI-IA03-029_03.png)
