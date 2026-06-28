# TC-MOBILE-REGISTER-BVA-001: Đăng ký với mật khẩu độ dài bằng biên (8 ký tự)

## Requirement ID

FR-01, FR-20

## Module / Test type / Technique

Mobile Registration / Functional / Boundary Value Analysis (3-point / 2-point)

## Preconditions

- Người dùng mở ứng dụng Mobile và đang ở trang Đăng ký.
- Email sử dụng chưa từng được đăng ký trong hệ thống.

## Test data

| Field            | Value              |
| ---------------- | ------------------ |
| Full Name        | Nguyen Van A       |
| Email            | newuser1@gmail.com |
| Password         | Te1!abcd           |
| Confirm Password | Te1!abcd           |

## Test steps

1. Nhập Full Name: Nguyen Van A
2. Nhập Email: newuser1@gmail.com
3. Nhập Password: Te1!abcd
4. Nhập Confirm Password: Te1!abcd
5. Bấm nút Đăng ký

## Expected result

Đăng ký thành công, hệ thống chuyển hướng người dùng tới trang Đăng nhập. (Trường hợp B = 8 là valid).

## BVA Coverage

Password length Min boundary, B = 8, covered by 3-Point and 2-Point

## Status / Related bugs

Fail / BUG-MOBILE-REGISTER-001
