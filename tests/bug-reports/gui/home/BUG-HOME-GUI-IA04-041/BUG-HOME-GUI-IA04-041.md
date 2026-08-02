---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Home] Không có thông báo lỗi rõ ràng khi request thất bại"
assignees: ""
---

## Found by Test Case

HOME-GUI-IA04-041

## Requirement liên quan

Nielsen #9 Help users recognize errors

## Severity / Priority

Major / P1

## Environment

Browser: Google Chrome / Microsoft Edge, OS: Windows, URL: `http://localhost:5173`

## Steps to reproduce

1. Mở trang Home.
2. Gây lỗi hoặc mất kết nối khi tải danh sách sản phẩm.
3. Quan sát phản hồi trên màn hình.

## Expected result

Trang phải hiển thị thông báo lỗi rõ ràng thay vì để người dùng nhìn thấy màn
hình trống.

## Actual result

Không có thông báo lỗi rõ ràng khi request sản phẩm thất bại.

## Console / Repro

```text
Open DevTools > Network, set throttling to `Offline`, then reload Home.
```

## Evidence

- ![Evidence 1](BUG-HOME-GUI-IA04-041_01.png)
