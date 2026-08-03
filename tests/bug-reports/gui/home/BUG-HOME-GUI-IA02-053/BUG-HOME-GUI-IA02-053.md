---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Home] Search chưa ổn định với khoảng trắng đầu/cuối"
assignees: ""
labels: "type: bug, module: product, severity: minor, priority: P3, status: new, found-by: test-case, type: gui-issue, screen: home"
---

## Found by Test Case

HOME-GUI-IA02-053

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
2. Nhập từ khóa có khoảng trắng đầu/cuối vào ô tìm kiếm.
3. Kích hoạt tìm kiếm và quan sát kết quả.

## Expected result

Search phải xử lý ổn định khoảng trắng đầu/cuối và chuỗi hợp lệ.

## Actual result

Khoảng trắng đầu/cuối chưa được xử lý ổn định như mong muốn.

## Console / Repro

```javascript
const input = document.querySelector('input[type="text"]');
input.value = '  iPhone  ';
input.dispatchEvent(new Event('input', { bubbles: true }));
input.closest('form').requestSubmit();
```

## Evidence

- **Ảnh chụp lỗi trên Google Chrome:** ![Evidence 1](BUG-HOME-GUI-IA02-053_01.png)
- **Ảnh chụp lỗi trên Firefox:** ![Evidence 2](BUG-HOME-GUI-IA02-053_02.png)
- **Ảnh chụp lỗi trên Expo Go (Android):** ![Evidence 3](BUG-HOME-GUI-IA02-053_03.png)
