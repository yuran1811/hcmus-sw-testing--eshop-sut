---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Cart] Guest cart bị mất trong quá trình authentication recovery"
assignees: ""
labels: "type: bug, module: cart, severity: major, priority: P2, status: new, found-by: usability-test, type: usability-issue"
---

## Found by Test Case

F08 (Session: P02)

## Requirement liên quan

FR-07, FR-08

## Severity / Priority

Major / P2

Participant mất toàn bộ lựa chọn và phải thêm lại; chỉ quan sát 1/7 nên Priority thấp hơn các lỗi systemic. Severity/Priority cần xác nhận sau exact re-run.

## Environment

Browser/OS: Brave / Windows / Desktop  
URL/build: `https://23127115-testing-hw3.vercel.app/`, observed 01/08/2026

## Steps to reproduce

1. Mở private window ở trạng thái guest và thêm nhiều sản phẩm vào giỏ.
2. Chọn checkout để được chuyển tới login.
3. Đi qua register failure/recovery theo observed path; nếu recovery yêu cầu reload, reload tại auth flow.
4. Đăng nhập bằng account hợp lệ và mở cart.

## Expected result

Guest cart được giữ hoặc merge có kiểm soát vào authenticated cart; nếu hệ thống quyết định xóa, phải cảnh báo và xin xác nhận trước.

## Actual result

Trong P02, ngay sau recovery login, cart trước đăng nhập trống hoàn toàn và participant hỏi "ủa giỏ hàng của tôi đâu".

## Source corroboration

`CartContext.jsx` chỉ lưu cart trong React memory, không localStorage/server persistence; reload trong auth/recovery làm mất cart. Source chưa chứng minh login SPA đơn thuần luôn xóa cart, vì vậy exact observed sequence phải được chạy lại.

## Evidence

- [P02 note — 03:34](../../../../usability-tests/U-001/3_sessions/P02.md)
- [P02 video 03:34](https://drive.google.com/file/d/1UnZxGGsmdV04Kp1MBT1dl3RqPO1Z3t8U/view?usp=sharing#t=214s)

## Review notes

- Bắt buộc xác định chính xác trigger: login navigation, register navigation hay page reload.
- Nếu không reproduce theo sequence không reload, thu hẹp title/steps thành "Cart không persist qua reload".

## Status

New

## GitHub Issue

Not yet filed

## GitHub Issue

https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/198
