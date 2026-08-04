# TC-MOBILE-REGISTER-BVA-004: Đăng ký với Full Name dài 2 ký tự

## Requirement ID

FR-01, FR-20

## Module / Test type / Technique

Mobile Registration / Functional / Boundary Value Analysis (3-point)

## Preconditions

- Người dùng mở ứng dụng Mobile và đang ở trang Đăng ký.
- Email sử dụng chưa từng được đăng ký trong hệ thống.

## Test data

| Field            | Value                 |
| ---------------- | --------------------- |
| Full Name        | An                    |
| Email            | bva.name2@gmail.com   |
| Password         | Test1234!             |
| Confirm Password | Test1234!             |

## Test steps

1. Nhập Full Name: An
2. Nhập Email: bva.name2@gmail.com
3. Nhập Password: Test1234!
4. Nhập Confirm Password: Test1234!
5. Bấm nút Đăng ký

## Expected result

Đăng ký thành công và hệ thống chuyển người dùng tới trang Đăng nhập.

## BVA Coverage

Full Name effective minimum-length boundary, B+1 = 2, covered by 3-Point. Biên tối thiểu được suy ra từ ràng buộc "bắt buộc"; không giả định biên tối đa.

## Status / Related bugs

Not Run / N/A

