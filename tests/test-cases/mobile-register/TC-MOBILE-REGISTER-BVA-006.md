# TC-MOBILE-REGISTER-BVA-006: Đăng ký với local-part Email dài 2 ký tự

## Requirement ID

FR-01, FR-20

## Module / Test type / Technique

Mobile Registration / Functional / Boundary Value Analysis (3-point)

## Preconditions

- Người dùng mở ứng dụng Mobile và đang ở trang Đăng ký.
- Email `ab@gmail.com` chưa từng được đăng ký trong hệ thống.

## Test data

| Field            | Value        |
| ---------------- | ------------ |
| Full Name        | Nguyen Van A |
| Email            | ab@gmail.com |
| Password         | Test1234!    |
| Confirm Password | Test1234!    |

## Test steps

1. Nhập Full Name: Nguyen Van A
2. Nhập Email: ab@gmail.com
3. Nhập Password: Test1234!
4. Nhập Confirm Password: Test1234!
5. Bấm nút Đăng ký

## Expected result

Đăng ký thành công và hệ thống chuyển người dùng tới trang Đăng nhập.

## BVA Coverage

Email structural local-part boundary, B+1 = 2 ký tự, covered by 3-Point. SRS không quy định độ dài tối đa cho toàn bộ Email.

## Status / Related bugs

Not Run / N/A

