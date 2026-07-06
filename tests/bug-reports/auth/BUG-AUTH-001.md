---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Authentication] Bộ đếm số lần đăng nhập sai bị cộng 2 đơn vị thay vì 1 đơn vị"
labels: "type: bug, module: auth, severity: Major, priority: P1, status: new, found-by: test-case"
assignees: ""
---

## Found by Test Case

TC-AUTH-STT-02, TC-AUTH-STT-04

## Requirement liên quan

FR-02 (Đăng nhập & Khóa tài khoản)

## Severity / Priority

Major / P1

## Environment

Browser: Google Chrome / Microsoft Edge, OS: Windows, URL: http://localhost:3000

## Steps to reproduce

1. Đưa tài khoản `test@eshop.com` về trạng thái ban đầu (`login_attempts = 0`).
2. Gửi request `POST /api/login` với email `test@eshop.com` và password sai `WrongPassword123!`.
3. Kiểm tra giá trị thuộc tính `login_attempts` của tài khoản trong CSDL hoặc qua API `GET /api/admin/users`.

## Expected result

Sau lần nhập sai đầu tiên, `login_attempts` phải bằng **1** (tuân theo FR-02: _"Sau mỗi lần đăng nhập sai, hệ thống tăng bộ đếm lên đúng 1 đơn vị"_).

## Actual result

`login_attempts` bị cộng 2 đơn vị (`const newAttempts = user.login_attempts + 2`), nhảy từ 0 lên 2 ngay sau 1 lần đăng nhập sai duy nhất.
