# TC-MOBILE-REGISTER-018: Đăng ký với Email thiếu dấu chấm và hậu tố miền

## Requirement ID

FR-01, FR-20

## Module / Test type / Technique

Mobile Registration / Functional / Domain Testing (Equivalence Partitioning)

## Preconditions

- Người dùng mở ứng dụng Mobile và đang ở trang Đăng ký.

## Test data

| Field            | Value        |
| ---------------- | ------------ |
| Full Name        | Nguyen Van A |
| Email            | user@domain  |
| Password         | Test1234!    |
| Confirm Password | Test1234!    |

## Test steps

1. Nhập Full Name: Nguyen Van A
2. Nhập Email: user@domain
3. Nhập Password: Test1234!
4. Nhập Confirm Password: Test1234!
5. Bấm nút Đăng ký

## Expected result

Hệ thống từ chối đăng ký, hiển thị lỗi Email sai định dạng và không tạo user vì Email không theo cấu trúc `user@domain.com` của FR-01.

## EC / Partition Covered

EC21 (Email thiếu dấu chấm/hậu tố miền) + OC2

## Status / Related bugs

Not Run / N/A

