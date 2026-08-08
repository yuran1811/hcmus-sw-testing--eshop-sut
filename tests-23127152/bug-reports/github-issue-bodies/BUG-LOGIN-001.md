## Found by Test Case

LOGIN-VIS-02

## Requirement liên quan

FR-02 (Login)

## Severity / Priority

Major / P1

## Environment

- Browser: Chromium (Playwright), 1440×900
- URL: http://localhost:5173/login
- Build: nhánh `hw3/23127152`

## Steps to reproduce

1. Mở `http://localhost:5173/login`
2. Đọc tiêu đề `<h2>` phía trên form

## Expected result

Tiêu đề phản ánh màn hình đăng nhập (ví dụ "Đăng nhập").

## Actual result

Tiêu đề hiển thị **"Đăng Ký"** — nhầm với trang Register.

## Evidence

`../screenshots/BUG-LOGIN-001-wrong-title-dang-ky.png`

Local path: `tests-23127152/bug-reports/login/BUG-LOGIN-001.md`

## Notes



---
Reported by SV **23127152** — HW03 GUI Checklist (Task 1).
