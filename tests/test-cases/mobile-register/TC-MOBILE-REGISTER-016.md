# TC-MOBILE-REGISTER-016: Đăng ký với Email thiếu local-part

## Requirement ID

FR-01, FR-20

## Module / Test type / Technique

Mobile Registration / Functional / Domain Testing (Equivalence Partitioning), Boundary Value Analysis

## Preconditions

- Người dùng mở ứng dụng Mobile và đang ở trang Đăng ký.

## Test data

| Field            | Value       |
| ---------------- | ----------- |
| Full Name        | Nguyen Van A|
| Email            | @gmail.com  |
| Password         | Test1234!   |
| Confirm Password | Test1234!   |

## Test steps

1. Nhập Full Name: Nguyen Van A
2. Nhập Email: @gmail.com
3. Nhập Password: Test1234!
4. Nhập Confirm Password: Test1234!
5. Bấm nút Đăng ký

## Expected result

Hệ thống từ chối đăng ký, hiển thị lỗi Email sai định dạng và không tạo user. Đây là điểm B-1 của biên cấu trúc local-part tối thiểu 1 ký tự.

## EC / Partition Covered

EC19 (Email thiếu local-part) + OC2

## Status / Related bugs

Not Run / N/A

