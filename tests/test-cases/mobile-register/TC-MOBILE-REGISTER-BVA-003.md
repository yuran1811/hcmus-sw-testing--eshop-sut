# TC-MOBILE-REGISTER-BVA-003: Đăng ký với Full Name dài đúng 1 ký tự

## Requirement ID

FR-01, FR-20

## Module / Test type / Technique

Mobile Registration / Functional / Boundary Value Analysis (3-point / 2-point)

## Preconditions

- Người dùng mở ứng dụng Mobile và đang ở trang Đăng ký.
- Email sử dụng chưa từng được đăng ký trong hệ thống.

## Test data

| Field            | Value                 |
| ---------------- | --------------------- |
| Full Name        | A                     |
| Email            | bva.name1@gmail.com   |
| Password         | Test1234!             |
| Confirm Password | Test1234!             |

## Test steps

1. Nhập Full Name: A
2. Nhập Email: bva.name1@gmail.com
3. Nhập Password: Test1234!
4. Nhập Confirm Password: Test1234!
5. Bấm nút Đăng ký

## Expected result

Đăng ký thành công và hệ thống chuyển người dùng tới trang Đăng nhập. Một ký tự không phải whitespace thỏa điều kiện Full Name bắt buộc.

## BVA Coverage

Full Name effective minimum-length boundary, B = 1, covered by 3-Point and 2-Point. Biên này được suy ra từ ràng buộc "bắt buộc" của FR-01; SRS không quy định độ dài tối đa.

## Status / Related bugs

Not Run / N/A

