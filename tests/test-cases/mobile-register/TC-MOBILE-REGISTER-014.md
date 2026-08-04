# TC-MOBILE-REGISTER-014: Đăng ký với Full Name chỉ chứa khoảng trắng

## Requirement ID

FR-01, FR-20

## Module / Test type / Technique

Mobile Registration / Functional / Domain Testing (Equivalence Partitioning)

## Preconditions

- Người dùng mở ứng dụng Mobile và đang ở trang Đăng ký.
- Email sử dụng chưa từng được đăng ký trong hệ thống.

## Test data

| Field            | Value                   |
| ---------------- | ----------------------- |
| Full Name        | `   ` (3 khoảng trắng)  |
| Email            | name.space@gmail.com    |
| Password         | Test1234!               |
| Confirm Password | Test1234!               |

## Test steps

1. Nhập 3 ký tự khoảng trắng vào Full Name
2. Nhập Email: name.space@gmail.com
3. Nhập Password: Test1234!
4. Nhập Confirm Password: Test1234!
5. Bấm nút Đăng ký

## Expected result

Hệ thống trim dữ liệu, từ chối đăng ký và hiển thị thông báo yêu cầu nhập Họ Tên; không tạo user mới. Trường bắt buộc không được xem chuỗi chỉ có khoảng trắng là dữ liệu hợp lệ.

## EC / Partition Covered

EC17 (Full Name chỉ chứa whitespace) + OC2

## Status / Related bugs

Not Run / N/A

