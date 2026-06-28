# TC-MOBILE-REGISTER-007: Đăng ký với Mật khẩu quá ngắn (< 8 ký tự)

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
| Password         | Te1!abc           |
| Confirm Password | Te1!abc           |

## Test steps

1. Nhập Full Name: Nguyen Van A
2. Nhập Email: newuser@gmail.com
3. Nhập Password: Te1!abc
4. Nhập Confirm Password: Te1!abc
5. Bấm nút Đăng ký

## Expected result

Hệ thống từ chối đăng ký và hiển thị thông báo lỗi mật khẩu phải có tối thiểu 8 ký tự.

## EC / Partition Covered

EC9 + OC2

## Status / Related bugs

Fail / BUG-MOBILE-REGISTER-001
