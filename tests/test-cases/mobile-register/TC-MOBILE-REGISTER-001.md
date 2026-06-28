# TC-MOBILE-REGISTER-001: Đăng ký với thông tin hợp lệ

## Requirement ID

FR-01, FR-20

## Module / Test type / Technique

Mobile Registration / Functional / Domain Testing (Equivalence Partitioning)

## Preconditions

- Người dùng mở ứng dụng Mobile và đang ở trang Đăng ký.
- Email sử dụng chưa từng được đăng ký trong hệ thống.

## Test data

| Field            | Value             |
| ---------------- | ----------------- |
| Full Name        | Nguyen Van A      |
| Email            | newuser@gmail.com |
| Password         | Test1234!         |
| Confirm Password | Test1234!         |

## Test steps

1. Nhập Full Name: Nguyen Van A
2. Nhập Email: newuser@gmail.com
3. Nhập Password: Test1234!
4. Nhập Confirm Password: Test1234!
5. Bấm nút Đăng ký

## Expected result

Đăng ký thành công, hệ thống chuyển hướng người dùng tới trang Đăng nhập.

## EC / Partition Covered

EC1 + EC3 + EC7 + EC14 + OC1

## Status / Related bugs

Fail / BUG-MOBILE-REGISTER-001
