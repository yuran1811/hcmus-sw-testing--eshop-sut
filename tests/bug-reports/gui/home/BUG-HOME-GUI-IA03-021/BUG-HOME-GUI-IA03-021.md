---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Home] Navbar không có active state cho Trang Chủ"
assignees: ""
---

## Found by Test Case

HOME-GUI-IA03-021

## Requirement liên quan

FR-23

## Severity / Priority

Minor / P3

## Environment

Browser: Google Chrome / Microsoft Edge, OS: Windows, URL: `http://localhost:5173`

## Steps to reproduce

1. Mở trang Home.
2. Quan sát mục Trang Chủ trong navbar.
3. Kiểm tra trạng thái active hiện tại.

## Expected result

Navbar phải thể hiện rõ mục Trang Chủ đang active khi user ở Home.

## Actual result

Navbar không có active state rõ ràng cho mục Trang Chủ.

## Console / Repro

```text
document.querySelector('a[aria-current="page"]')?.textContent
```

## Evidence

- ![Evidence 1](BUG-HOME-GUI-IA03-021_01.png)
