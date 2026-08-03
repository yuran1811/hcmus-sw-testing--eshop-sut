---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Auth] Trang đăng nhập dùng tiêu đề và nhãn của đăng ký"
assignees: ""
labels: "type: bug, module: auth, severity: major, priority: P1, status: new, found-by: usability-test, type: usability-issue"
---

## Found by Test Case

F03 (Sessions: P01, P03, P05)

## Requirement liên quan

FR-02, FR-21, FR-22

## Severity / Priority

Major / P1

Ba participant nhầm đang đăng ký hay đăng nhập, làm sai mental model tại bước bắt buộc của checkout.

## Environment

Browser/OS: Chrome / Windows, Zen / Linux  
URL/build: `https://23127115-testing-hw3.vercel.app/login`, observed 01/08/2026

## Steps to reproduce

1. Ở trạng thái chưa đăng nhập, mở `/cart` và chọn **Tiến hành thanh toán**, hoặc truy cập trực tiếp `/login`.
2. Quan sát heading, nhãn trường định danh và CTA submit.
3. So sánh với route và yêu cầu đăng nhập bằng email trong FR-02.

## Expected result

Heading ghi **Đăng nhập**, trường định danh ghi **Email**, và CTA dùng nhãn tiếng Việt nhất quán như **Đăng nhập**.

## Actual result

Route login hiển thị heading **Đăng Ký**, nhãn **Username** dù backend cần email, và CTA **Sign In**. Participant nhầm đây là form đăng ký.

## Source corroboration

`frontend-web/src/pages/Login.jsx` chứa trực tiếp ba chuỗi `Đăng Ký`, `Username` và `Sign In`.

## Evidence

- [P05 note — 02:56, 03:21, 05:15](../../../../usability-tests/U-001/3_sessions/P05.md)
- [P05 video 03:21](https://drive.google.com/file/d/1cBgjcD05Xyzq2sC3j2L85z_iyfAwLI5h/view?usp=drive_link#t=3m21s)
- [P01 video 01:03](https://drive.google.com/file/d/1zkPgCgSC0gVMEPaQh-E1dnG0fnSfbuNj/view?usp=drive_link#t=63s)

## Review notes

- Review as one consistency defect because all three labels occur in the same form and create the same confusion.

## Status

New

## GitHub Issue

Not yet filed
