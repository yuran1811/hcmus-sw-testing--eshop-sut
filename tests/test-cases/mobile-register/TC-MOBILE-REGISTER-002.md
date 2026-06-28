# TC-MOBILE-REGISTER-002: Đăng ký với Full Name trống

## Requirement ID

FR-01, FR-20

## Module / Test type / Technique

Mobile Registration / Functional / Domain Testing (Equivalence Partitioning)

## Preconditions

- Người dùng mở ứng dụng Mobile và đang ở trang Đăng ký.

## Test data

| Field            | Value             |
| ---------------- | ----------------- |
| Full Name        |                   |
| Email            | newuser@gmail.com |
| Password         | Test1234!         |
| Confirm Password | Test1234!         |

## Test steps

1. Bỏ trống Full Name
2. Nhập Email: newuser@gmail.com
3. Nhập Password: Test1234!
4. Nhập Confirm Password: Test1234!
5. Bấm nút Đăng ký

## Expected result

Hệ thống từ chối đăng ký và hiển thị thông báo lỗi yêu cầu nhập Họ Tên (validation error xuất hiện trên nút submit).

## EC / Partition Covered

EC2 + OC2

## Status / Related bugs

Not Run / None
