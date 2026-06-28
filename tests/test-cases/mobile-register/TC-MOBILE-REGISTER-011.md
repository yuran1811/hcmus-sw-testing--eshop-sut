# TC-MOBILE-REGISTER-011: Đăng ký với Mật khẩu không chứa ký tự đặc biệt

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
| Password         | Test12345         |
| Confirm Password | Test12345         |

## Test steps

1. Nhập Full Name: Nguyen Van A
2. Nhập Email: newuser@gmail.com
3. Nhập Password: Test12345
4. Nhập Confirm Password: Test12345
5. Bấm nút Đăng ký

## Expected result

Hệ thống từ chối đăng ký và hiển thị thông báo lỗi mật khẩu phải chứa ít nhất 1 ký tự đặc biệt.

## EC / Partition Covered

EC13 + OC2

## Status / Related bugs

Fail / BUG-MOBILE-REGISTER-001
