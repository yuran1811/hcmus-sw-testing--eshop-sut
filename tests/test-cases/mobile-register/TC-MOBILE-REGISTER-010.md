# TC-MOBILE-REGISTER-010: Đăng ký với Mật khẩu không chứa chữ số

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
| Password         | TestPass!         |
| Confirm Password | TestPass!         |

## Test steps

1. Nhập Full Name: Nguyen Van A
2. Nhập Email: newuser@gmail.com
3. Nhập Password: TestPass!
4. Nhập Confirm Password: TestPass!
5. Bấm nút Đăng ký

## Expected result

Hệ thống từ chối đăng ký và hiển thị thông báo lỗi mật khẩu phải chứa ít nhất 1 chữ số.

## EC / Partition Covered

EC12 + OC2

## Status / Related bugs

Not Run / None
