---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Authentication] Tài khoản bị khóa sớm ngay từ lần đăng nhập sai thứ 2"
labels: "type: bug, module: auth, severity: Major, priority: P1, status: new, found-by: test-case"
assignees: ""
---

## Found by Test Case

TC-AUTH-STT-04, TC-AUTH-STT-05

## Requirement liên quan

FR-02 (Đăng nhập & Khóa tài khoản)

## Severity / Priority

Major / P1

## Environment

Browser: Google Chrome / Microsoft Edge, OS: Windows, URL: http://localhost:3000

## Steps to reproduce

1. Đưa tài khoản `test@eshop.com` về trạng thái ban đầu (`login_attempts = 0`).
2. Gửi request `POST /api/login` nhập sai mật khẩu lần 1 (`login_attempts` nhảy lên 2).
3. Gửi request `POST /api/login` nhập sai mật khẩu lần 2 (`login_attempts` nhảy lên 4 >= 3).
4. Kiểm tra phản hồi và trạng thái tài khoản.

## Expected result

Sau 2 lần sai liên tiếp, tài khoản vẫn phải ở trạng thái bình thường (chưa bị khóa), cho phép người dùng thử đăng nhập lại ở lần thứ 3 hoặc đăng nhập đúng để reset bộ đếm.

## Actual result

Tài khoản bị khóa ngay sau lần đăng nhập sai thứ 2. Người dùng bị từ chối truy cập (status 403 Forbidden) ngay cả khi nhập đúng mật khẩu ở lần đăng nhập tiếp theo.
