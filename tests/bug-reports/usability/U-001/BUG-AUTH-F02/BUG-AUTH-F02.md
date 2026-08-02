---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Auth] Trường mật khẩu đăng nhập hiển thị plain-text"
assignees: ""
---

## Found by Test Case

F02 (Sessions: P01, P02, P04, P05, P06)

## Requirement liên quan

FR-02, FR-22

## Severity / Priority

Major / P1

Mật khẩu bị lộ trực tiếp trên màn hình, ảnh hưởng privacy/security và niềm tin; 5/7 participant nhận ra lỗi.

## Environment

Browser/OS: Chrome, Brave, Microsoft Edge / Windows; Zen / Linux  
URL/build: `https://23127115-testing-hw3.vercel.app/`, observed 01–02/08/2026

## Steps to reproduce

1. Truy cập `/login`.
2. Đặt focus vào trường **Mật khẩu**.
3. Nhập một chuỗi bất kỳ, ví dụ `Test1234!`.
4. Quan sát ký tự trong input.

## Expected result

Ký tự mật khẩu được che mặc định bằng input `type="password"`; nếu có show/hide thì phải là hành động chủ động của người dùng.

## Actual result

Toàn bộ mật khẩu hiển thị rõ dạng plain-text.

## Source corroboration

`frontend-web/src/pages/Login.jsx` khai báo trường mật khẩu với `type="text"`.

## Evidence

- [P01 note — 03:37](../../../../usability-tests/U-001/3_sessions/P01.md)
- [P06 note — 02:22](../../../../usability-tests/U-001/3_sessions/P06.md)
- [P01 video 03:37](https://drive.google.com/file/d/1zkPgCgSC0gVMEPaQh-E1dnG0fnSfbuNj/view?usp=drive_link#t=217s)
- [P06 video 02:22](https://drive.google.com/file/d/1Wz8BLp15dhaxPXwhJElNxajRZD6ea_Wy/view?usp=sharing#t=2m22s)

## Review notes

- Re-run trên desktop và kiểm tra DOM type sau fix.
- Xác nhận password manager/autofill vẫn hoạt động.

## Status

New

## GitHub Issue

Not yet filed
