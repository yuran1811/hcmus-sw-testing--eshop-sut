# TC-MOBILE-REGISTER-020: Đăng ký với Email chứa khoảng trắng bên trong

## Requirement ID

FR-01, FR-20

## Module / Test type / Technique

Mobile Registration / Functional / Domain Testing (Equivalence Partitioning)

## Preconditions

- Người dùng mở ứng dụng Mobile và đang ở trang Đăng ký.

## Test data

| Field            | Value              |
| ---------------- | ------------------ |
| Full Name        | Nguyen Van A       |
| Email            | user @domain.com   |
| Password         | Test1234!          |
| Confirm Password | Test1234!          |

## Test steps

1. Nhập Full Name: Nguyen Van A
2. Nhập Email: `user @domain.com`
3. Nhập Password: Test1234!
4. Nhập Confirm Password: Test1234!
5. Bấm nút Đăng ký

## Expected result

Hệ thống từ chối đăng ký, hiển thị lỗi Email sai định dạng và không tạo user; không được tự ý xóa khoảng trắng nằm giữa local-part để biến input thành email khác.

## EC / Partition Covered

EC23 (Email có whitespace nội bộ) + OC2

## Status / Related bugs

Not Run / N/A

