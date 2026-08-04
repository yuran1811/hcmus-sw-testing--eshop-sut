# TC-MOBILE-REGISTER-015: Đăng ký với Full Name tiếng Việt có dấu

## Requirement ID

FR-01, FR-20

## Module / Test type / Technique

Mobile Registration / Functional / Domain Testing (Equivalence Partitioning)

## Preconditions

- Người dùng mở ứng dụng Mobile và đang ở trang Đăng ký.
- Email sử dụng chưa từng được đăng ký trong hệ thống.

## Test data

| Field            | Value                     |
| ---------------- | ------------------------- |
| Full Name        | Nguyễn Thị Ánh            |
| Email            | unicode.name@gmail.com    |
| Password         | Test1234!                 |
| Confirm Password | Test1234!                 |

## Test steps

1. Nhập Full Name: Nguyễn Thị Ánh
2. Nhập Email: unicode.name@gmail.com
3. Nhập Password: Test1234!
4. Nhập Confirm Password: Test1234!
5. Bấm nút Đăng ký

## Expected result

Đăng ký thành công, họ tên Unicode được lưu nguyên vẹn và hệ thống chuyển người dùng tới trang Đăng nhập.

## EC / Partition Covered

EC18 (Full Name Unicode hợp lệ) + EC3 + EC7 + EC14 + OC1

## Status / Related bugs

Not Run / N/A

