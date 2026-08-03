---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Auth] Mật khẩu hợp lệ theo FR-01 bị từ chối khi đăng ký"
assignees: ""
labels: "type: bug, module: auth, severity: blocker, priority: P0, status: new, found-by: usability-test, type: usability-issue"
---

## Found by Test Case

F01 (Sessions: P01, P02, P03, P04, P05, P06, P07)

## Requirement liên quan

FR-01, FR-22

## Severity / Priority

Blocker / P0

Severity là Blocker vì cả 7/7 participant không thể hoàn thành đăng ký và đều cần M2. Priority P0 vì lỗi chặn entry point của luồng chính.

## Environment

Browser/OS: Chrome, Brave, Microsoft Edge / Windows; Zen / Linux  
URL/build: `https://23127115-testing-hw3.vercel.app/`, observed 01–02/08/2026

## Steps to reproduce

1. Mở private/incognito window và truy cập `/register`.
2. Nhập họ tên và một email hợp lệ chưa tồn tại.
3. Nhập mật khẩu `Test1234!`, đáp ứng ≥8 ký tự, chữ hoa, chữ thường, số và ký tự đặc biệt `!`.
4. Bấm **Đăng Ký**.

## Expected result

Mật khẩu được chấp nhận theo FR-01; account được tạo và người dùng được chuyển tới `/login`.

## Actual result

Client hiển thị "Mật khẩu quá yếu" và không gửi đăng ký. Trong 7 phiên, participant thử nhiều biến thể nhưng đều bị kẹt và cần recovery account.

## Source corroboration

`frontend-web/src/pages/Register.jsx` dùng regex yêu cầu whitespace (`(?=.*\s)`) và chỉ cho `[A-Za-z\d\s]`, nên các ký tự đặc biệt FR-01 như `@`, `$`, `!`, `%`, `*`, `?`, `&` bị từ chối.

## Evidence

- [P04 note — 01:55–02:23](../../../../usability-tests/U-001/3_sessions/P04.md)
- [P07 note — 01:07–01:41](../../../../usability-tests/U-001/3_sessions/P07.md)
- [P04 video 02:23](https://drive.google.com/file/d/1Wy3gdWqb1sOhwFKaxgG_JJm6SnXKKjI-/view?usp=drive_link#t=143s)
- [P07 video 01:41](https://drive.google.com/file/d/1m_XPwGj0JsTt6yPhziYBINCvaFliqJN3/view?usp=sharing#t=1m41s)

## Review notes

- Re-run với email unique và ít nhất `Test1234!`, `Abcdef1@`, `Abcdef1$`.
- Sau fix, kiểm tra thêm password không đủ rule vẫn bị từ chối với message đúng.

## Status

New

## GitHub Issue

Not yet filed

## GitHub Issue

https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/194
