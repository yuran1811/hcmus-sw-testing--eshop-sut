# TC-MOBILE-REGISTER-BVA-002: Đăng ký với mật khẩu độ dài vượt biên (9 ký tự)

## Requirement ID

FR-01, FR-20

## Module / Test type / Technique

Mobile Registration / Functional / Boundary Value Analysis (3-point)

## Preconditions

- Người dùng mở ứng dụng Mobile và đang ở trang Đăng ký.
- Email sử dụng chưa từng được đăng ký trong hệ thống.

## Test data

| Field            | Value              |
| ---------------- | ------------------ |
| Full Name        | Nguyen Van A       |
| Email            | newuser2@gmail.com |
| Password         | Te1!abcde          |
| Confirm Password | Te1!abcde          |

## Test steps

1. Nhập Full Name: Nguyen Van A
2. Nhập Email: newuser2@gmail.com
3. Nhập Password: Te1!abcde
4. Nhập Confirm Password: Te1!abcde
5. Bấm nút Đăng ký

## Expected result

Đăng ký thành công, hệ thống chuyển hướng người dùng tới trang Đăng nhập. (Trường hợp B+1 = 9 là valid).

## BVA Coverage

Password length Min boundary, B+1 = 9, covered by 3-Point only

## Status / Related bugs

Not Run / None
