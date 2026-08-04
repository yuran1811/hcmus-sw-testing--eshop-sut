# TC-MOBILE-REGISTER-BVA-005: Đăng ký với local-part Email dài đúng 1 ký tự

## Requirement ID

FR-01, FR-20

## Module / Test type / Technique

Mobile Registration / Functional / Boundary Value Analysis (3-point / 2-point)

## Preconditions

- Người dùng mở ứng dụng Mobile và đang ở trang Đăng ký.
- Email `a@gmail.com` chưa từng được đăng ký trong hệ thống.

## Test data

| Field            | Value        |
| ---------------- | ------------ |
| Full Name        | Nguyen Van A |
| Email            | a@gmail.com  |
| Password         | Test1234!    |
| Confirm Password | Test1234!    |

## Test steps

1. Nhập Full Name: Nguyen Van A
2. Nhập Email: a@gmail.com
3. Nhập Password: Test1234!
4. Nhập Confirm Password: Test1234!
5. Bấm nút Đăng ký

## Expected result

Đăng ký thành công và hệ thống chuyển người dùng tới trang Đăng nhập. Local-part có 1 ký tự vẫn đúng cấu trúc email hợp lệ.

## BVA Coverage

Email structural local-part boundary, B = 1 ký tự, covered by 3-Point and 2-Point. Đây là biên cấu trúc tham chiếu từ định dạng `user@domain.com`, không phải giới hạn độ dài tối đa do SRS quy định.

## Status / Related bugs

Not Run / N/A

