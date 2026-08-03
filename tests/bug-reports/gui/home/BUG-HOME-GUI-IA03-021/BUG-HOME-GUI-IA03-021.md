---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Home] Navbar không có active state cho Trang Chủ"
assignees: ""
labels: "type: bug, module: product, severity: minor, priority: P3, status: new, found-by: test-case, type: gui-issue, screen: home"
---

## Found by Test Case

HOME-GUI-IA03-021

## Requirement liên quan

FR-23

## Severity / Priority

Minor / P3

## Environment

- Browser: Google Chrome (Windows 11)
- Browser: Mozilla Firefox (Windows 11)
- Device: Samsung Galaxy S9+ (Android 10) / App: Expo Go (React Native)

URL: `http://localhost:5173` (hoặc local Metro Bundler với di động)

## Steps to reproduce

1. Mở trang Home.
2. Quan sát mục Trang Chủ trong navbar.
3. Kiểm tra trạng thái active hiện tại.

## Expected result

Navbar phải thể hiện rõ mục Trang Chủ đang active khi user ở Home.

## Actual result

Navbar không có active state rõ ràng cho mục Trang Chủ.

## Console / Repro

```javascript
document.querySelector('a[aria-current="page"]')?.textContent
```

## Evidence

- **Ảnh chụp lỗi trên Google Chrome:** ![Evidence 1](BUG-HOME-GUI-IA03-021_01.png)
- **Ảnh chụp lỗi trên Firefox:** ![Evidence 2](BUG-HOME-GUI-IA03-021_02.png)
- **Ảnh chụp lỗi trên Expo Go (Android):** ![Evidence 3](BUG-HOME-GUI-IA03-021_03.png)

## GitHub Issue

https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/180
