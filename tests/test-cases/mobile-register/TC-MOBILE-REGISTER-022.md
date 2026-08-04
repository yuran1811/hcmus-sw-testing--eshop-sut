# TC-MOBILE-REGISTER-022: Form hiển thị trường Xác nhận mật khẩu bắt buộc và che nội dung

## Requirement ID

FR-01, FR-20, FR-22

## Module / Test type / Technique

Mobile Registration / UI Functional / Requirements-based Testing

## Preconditions

- Người dùng mở ứng dụng Mobile.
- Email `mobile.form.check@example.com` chưa tồn tại trong hệ thống.

## Test data

| Field            | Value     |
| ---------------- | --------- |
| Full Name        | Nguyen Van A |
| Email            | mobile.form.check@example.com |
| Password         | Test1234! |
| Confirm Password | Test1234! |
| Invalid confirm  | Test1234@ |

## Test steps

1. Điều hướng tới trang Đăng ký
2. Quan sát các nhãn và trường nhập trên form
3. Focus trường Email; kiểm tra input semantics bằng React Native inspector/accessibility props và bàn phím nền tảng.
4. Nhập Full Name `Nguyen Van A` và Email unique `mobile.form.check@example.com`.
5. Nhập Password: Test1234!
6. Nhập Confirm Password: Test1234! và quan sát cách hai giá trị được hiển thị.
7. Đổi Confirm Password thành Test1234@, bấm Đăng ký để tạo riêng validation error về mismatch.
8. Kiểm tra vị trí thông báo lỗi trong visual layout/component tree so với nút Đăng ký.

## Expected result

- Form có đủ bốn trường Họ Tên, Email, Mật khẩu và Xác nhận mật khẩu.
- Cả bốn nhãn bắt buộc có ký hiệu `*`.
- Trường Email dùng semantic tương đương `type=email`: trên React Native có `keyboardType="email-address"`, không tự viết hoa; trên web dùng `type="email"`.
- Trường Mật khẩu và Xác nhận mật khẩu đều che nội dung đã nhập; không hiển thị plaintext.
- Trường Xác nhận mật khẩu nằm trước nút Đăng ký và có thể nhận dữ liệu độc lập với trường Mật khẩu.
- Khi submit dữ liệu sai, thông báo lỗi xuất hiện phía trên nút Đăng ký (không nằm dưới nút) và mô tả đúng lỗi mismatch.

## EC / Partition Covered

OC4 (Cấu trúc form đăng ký đúng FR-01/FR-22)

## Status / Related bugs

Not Run / N/A
