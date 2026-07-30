---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Home] Request chậm không có phản hồi chờ rõ ràng"
assignees: ""
---

## Found by Test Case

HOME-GUI-IA04-044

## Requirement liên quan

N/A

## Severity / Priority

Major / P1

## Environment

Browser: Google Chrome / Microsoft Edge, OS: Windows, URL: `http://localhost:5173`

## Steps to reproduce

1. Mở trang Home.
2. Làm chậm request tải sản phẩm.
3. Quan sát phản hồi trong lúc chờ.

## Expected result

Khi request chậm, Home phải cho người dùng thấy trạng thái chờ hoặc lỗi rõ
ràng.

## Actual result

Trang không hiển thị phản hồi chờ rõ ràng cho request chậm.

## Console / Repro

```text
Open DevTools > Network, set throttling to `Slow 3G`, then reload Home and watch for feedback.
```

## Evidence

- ![Evidence 1](BUG-HOME-GUI-IA04-044_01.png)
