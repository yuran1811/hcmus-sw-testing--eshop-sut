# TC-MOBILE-REGISTER-BVA-008: Xác nhận mật khẩu dài hơn mật khẩu 1 ký tự

## Requirement ID

FR-01, FR-20

## Module / Test type / Technique

Mobile Registration / Robustness / Relative-length Reference Analysis

## Preconditions

- Người dùng mở ứng dụng Mobile và đang ở trang Đăng ký.
- Email sử dụng chưa từng được đăng ký trong hệ thống.

## Test data

| Field            | Value                    |
| ---------------- | ------------------------ |
| Full Name        | Nguyen Van A             |
| Email            | bva.confirm.plus@gmail.com|
| Password         | Test1234! (9 ký tự)      |
| Confirm Password | Test1234!! (10 ký tự)    |

## Test steps

1. Nhập Full Name: Nguyen Van A
2. Nhập Email: bva.confirm.plus@gmail.com
3. Nhập Password: Test1234!
4. Nhập Confirm Password: Test1234!!
5. Bấm nút Đăng ký

## Expected result

Hệ thống từ chối đăng ký, hiển thị thông báo hai mật khẩu không khớp và không tạo user.

## BVA Coverage

Điểm tham chiếu `R+1`: `len(confirm) = len(password) + 1`. Đây là representative chắc chắn mismatch quanh `R=0`, không phải BVA chuẩn của equality. Điểm exact-match được phủ bởi TC-MOBILE-REGISTER-001/BVA-001; TC-MOBILE-REGISTER-013 phủ cùng độ dài nhưng khác nội dung.

## Status / Related bugs

Not Run / N/A
