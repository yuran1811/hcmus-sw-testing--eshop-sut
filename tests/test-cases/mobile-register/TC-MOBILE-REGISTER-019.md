# TC-MOBILE-REGISTER-019: Đăng ký với Email chứa nhiều hơn một ký tự @

## Requirement ID

FR-01, FR-20

## Module / Test type / Technique

Mobile Registration / Functional / Domain Testing (Equivalence Partitioning)

## Preconditions

- Người dùng mở ứng dụng Mobile và đang ở trang Đăng ký.

## Test data

| Field            | Value             |
| ---------------- | ----------------- |
| Full Name        | Nguyen Van A      |
| Email            | user@@domain.com  |
| Password         | Test1234!         |
| Confirm Password | Test1234!         |

## Test steps

1. Nhập Full Name: Nguyen Van A
2. Nhập Email: user@@domain.com
3. Nhập Password: Test1234!
4. Nhập Confirm Password: Test1234!
5. Bấm nút Đăng ký

## Expected result

Hệ thống từ chối đăng ký, hiển thị lỗi Email sai định dạng và không tạo user.

## EC / Partition Covered

EC22 (Email có nhiều ký tự @) + OC2

## Status / Related bugs

Not Run / N/A

