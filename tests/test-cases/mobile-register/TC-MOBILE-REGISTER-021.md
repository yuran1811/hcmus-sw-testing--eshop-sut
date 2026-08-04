# TC-MOBILE-REGISTER-021: Đăng ký với ký tự đặc biệt ngoài danh sách cho phép

## Requirement ID

FR-01, FR-20

## Module / Test type / Technique

Mobile Registration / Functional / Domain Testing (Equivalence Partitioning)

## Preconditions

- Người dùng mở ứng dụng Mobile và đang ở trang Đăng ký.
- Email sử dụng chưa từng được đăng ký trong hệ thống.

## Test data

| Field            | Value                        |
| ---------------- | ---------------------------- |
| Full Name        | Nguyen Van A                 |
| Email            | unsupported.special@gmail.com|
| Password         | Test1234#                    |
| Confirm Password | Test1234#                    |

## Test steps

1. Nhập Full Name: Nguyen Van A
2. Nhập Email: unsupported.special@gmail.com
3. Nhập Password: Test1234#
4. Nhập Confirm Password: Test1234#
5. Bấm nút Đăng ký

## Expected result

Hệ thống từ chối đăng ký và thông báo mật khẩu phải có ít nhất một ký tự đặc biệt thuộc danh sách FR-01: `@`, `$`, `!`, `%`, `*`, `?`, `&`; không tạo user.

## EC / Partition Covered

EC24 (Password chỉ có ký tự đặc biệt ngoài tập cho phép) + OC2

## Status / Related bugs

Not Run / N/A

