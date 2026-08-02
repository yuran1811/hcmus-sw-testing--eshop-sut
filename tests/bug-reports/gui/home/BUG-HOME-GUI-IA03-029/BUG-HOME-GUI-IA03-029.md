---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Home] Footer không có link điều hướng"
assignees: ""
---

## Found by Test Case

HOME-GUI-IA03-029

## Requirement liên quan

N/A

## Severity / Priority

Minor / P3

## Environment

Browser: Google Chrome / Microsoft Edge, OS: Windows, URL: `http://localhost:5173`

## Steps to reproduce

1. Mở trang Home.
2. Kéo xuống footer.
3. Kiểm tra các link điều hướng ở footer.

## Expected result

Footer phải có các link hoạt động, không làm người dùng bị dead-end.

## Actual result

Footer không có link điều hướng nào.

## Console / Repro

```text
[...document.querySelectorAll('footer a')].map((a) => ({ text: a.textContent.trim(), href: a.href }))
```

## Evidence

- ![Evidence 1](BUG-HOME-GUI-IA03-029_01.png)
