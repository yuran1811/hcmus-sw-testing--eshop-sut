---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Home] Search chưa ổn định với khoảng trắng đầu/cuối"
assignees: ""
---

## Found by Test Case

HOME-GUI-IA02-053

## Requirement liên quan

N/A

## Severity / Priority

Minor / P3

## Environment

Browser: Google Chrome / Microsoft Edge, OS: Windows, URL: `http://localhost:5173`

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
