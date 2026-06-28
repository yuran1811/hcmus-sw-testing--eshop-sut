# TC-MOBILE-REGISTER-006: Đăng ký với Mật khẩu trống

## Requirement ID

FR-01, FR-20

## Module / Test type / Technique

Mobile Registration / Functional / Domain Testing (Equivalence Partitioning)

## Preconditions

- Người dùng mở ứng dụng Mobile và đang ở trang Đăng ký.

## Test data

| Field            | Value             |
| ---------------- | ----------------- |
| Full Name        | Nguyen Van A      |
| Email            | newuser@gmail.com |
| Password         |                   |
| Confirm Password | Test1234!         |

## Test steps

1. Nhập Full Name: Nguyen Van A
2. Nhập Email: newuser@gmail.com
3. Bỏ trống Password
4. Nhập Confirm Password: Test1234!
5. Bấm nút Đăng ký

## Expected result

Hệ thống từ chối đăng ký và hiển thị thông báo lỗi yêu cầu nhập Mật khẩu.

## EC / Partition Covered

EC8 + OC2

## Status / Related bugs

Fail / BUG-MOBILE-REGISTER-001
