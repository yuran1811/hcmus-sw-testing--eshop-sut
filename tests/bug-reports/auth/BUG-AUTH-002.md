---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Authentication] Thời gian khóa tài khoản bị thiết lập là 180 giây (3 phút) thay vì 30 giây"
labels: "type: bug, module: auth, severity: Major, priority: P1, status: new, found-by: test-case"
assignees: ""
---

## Found by Test Case

TC-AUTH-STT-06, TC-AUTH-STT-09, TC-AUTH-STT-10

## Requirement liên quan

FR-02 (Đăng nhập & Khóa tài khoản)

## Severity / Priority

Major / P1

## Environment

Browser: Google Chrome / Microsoft Edge, OS: Windows, URL: http://localhost:3000

## Steps to reproduce

1. Đăng nhập sai liên tiếp cho tài khoản `test@eshop.com` để kích hoạt trạng thái bị khóa.
2. Kiểm tra thuộc tính `locked_until` của tài khoản trong CSDL.
3. Chờ 31 giây và gửi request đăng nhập lại `POST /api/login`.

## Expected result

Tài khoản chỉ bị tạm khóa trong **30 giây** (`lockedUntil = Date.now() + 30000`). Sau 30 giây, tài khoản tự động mở khóa và cho phép đăng nhập lại bình thường.

## Actual result

Backend thiết lập `locked_until` = `Date.now() + 180000` (180 giây / 3 phút). Sau 30 giây, tài khoản vẫn ở trạng thái bị khóa và bị trả về lỗi HTTP 403 Forbidden ("Tài khoản đã bị khóa. Vui lòng thử lại sau.").
