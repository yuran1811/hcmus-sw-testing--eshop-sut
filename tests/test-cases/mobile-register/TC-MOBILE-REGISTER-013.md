# TC-MOBILE-REGISTER-013: Đăng ký với Xác nhận mật khẩu không khớp

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
| Password         | Test1234!         |
| Confirm Password | Test1234@         |

## Test steps

1. Nhập Full Name: Nguyen Van A
2. Nhập Email: newuser@gmail.com
3. Nhập Password: Test1234!
4. Nhập Confirm Password: Test1234@
5. Bấm nút Đăng ký

## Expected result

Hệ thống từ chối đăng ký và hiển thị thông báo lỗi hai mật khẩu không khớp nhau.

## EC / Partition Covered

EC16 + OC2

## Status / Related bugs

Fail / BUG-MOBILE-REGISTER-001
