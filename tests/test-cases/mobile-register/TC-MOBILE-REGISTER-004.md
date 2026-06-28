# TC-MOBILE-REGISTER-004: Đăng ký với Email sai định dạng

## Requirement ID

FR-01, FR-20

## Module / Test type / Technique

Mobile Registration / Functional / Domain Testing (Equivalence Partitioning)

## Preconditions

- Người dùng mở ứng dụng Mobile và đang ở trang Đăng ký.

## Test data

| Field            | Value         |
| ---------------- | ------------- |
| Full Name        | Nguyen Van A  |
| Email            | invalid-email |
| Password         | Test1234!     |
| Confirm Password | Test1234!     |

## Test steps

1. Nhập Full Name: Nguyen Van A
2. Nhập Email: invalid-email
3. Nhập Password: Test1234!
4. Nhập Confirm Password: Test1234!
5. Bấm nút Đăng ký

## Expected result

Hệ thống từ chối đăng ký và hiển thị thông báo lỗi yêu cầu nhập đúng định dạng Email.

## EC / Partition Covered

EC5 + OC2

## Status / Related bugs

Not Run / None
