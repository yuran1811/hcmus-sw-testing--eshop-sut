# TC-MOBILE-REGISTER-005: Đăng ký với Email đã tồn tại

## Requirement ID

FR-01, FR-20

## Module / Test type / Technique

Mobile Registration / Functional / Domain Testing (Equivalence Partitioning)

## Preconditions

- Người dùng mở ứng dụng Mobile và đang ở trang Đăng ký.
- Trong hệ thống đã tồn tại tài khoản có email là `test@eshop.com`.

## Test data

| Field            | Value          |
| ---------------- | -------------- |
| Full Name        | Nguyen Van A   |
| Email            | test@eshop.com |
| Password         | Test1234!      |
| Confirm Password | Test1234!      |

## Test steps

1. Nhập Full Name: Nguyen Van A
2. Nhập Email: test@eshop.com
3. Nhập Password: Test1234!
4. Nhập Confirm Password: Test1234!
5. Bấm nút Đăng ký

## Expected result

Hệ thống từ chối đăng ký và hiển thị thông báo lỗi báo email đã được sử dụng. (API trả về HTTP 409).

## EC / Partition Covered

EC6 + OC3

## Status / Related bugs

Not Run / None
