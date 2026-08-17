# FR-03 Forgot Password and Password Reset - Test Case Design Report

Feature: Forgot password and password reset (two steps)
Feature code: FR03
Total designed test cases: 22
Automation spec: `HW4/tests/FR03_forgot_password.spec.ts`
Data file: `HW4/test-data/FR03_data.json`

## Design Summary

| Category | Count |
| --- | ---: |
| Positive | 2 |
| Negative | 11 |
| Security | 4 |
| GUI | 5 |

## Traceability

| Case ID | Test case file | Category | Purpose |
| --- | --- | --- | --- |
| F03-TC-001 | [TC-FORGOT-PASSWORD-001.md](./TC-FORGOT-PASSWORD-001.md) | Positive | Khôi phục mật khẩu thành công (End-to-End Happy Path tương thích SUT) |
| F03-TC-002 | [TC-FORGOT-PASSWORD-002.md](./TC-FORGOT-PASSWORD-002.md) | Negative | Yêu cầu OTP với email chưa đăng ký |
| F03-TC-003 | [TC-FORGOT-PASSWORD-003.md](./TC-FORGOT-PASSWORD-003.md) | Negative | Yêu cầu OTP với email trống |
| F03-TC-004 | [TC-FORGOT-PASSWORD-004.md](./TC-FORGOT-PASSWORD-004.md) | Negative | Yêu cầu OTP với email sai định dạng |
| F03-TC-005 | [TC-FORGOT-PASSWORD-005.md](./TC-FORGOT-PASSWORD-005.md) | Negative | Đặt lại mật khẩu với mã OTP không chính xác |
| F03-TC-006 | [TC-FORGOT-PASSWORD-006.md](./TC-FORGOT-PASSWORD-006.md) | Negative | Đặt lại mật khẩu sử dụng mã OTP của tài khoản khác |
| F03-TC-007 | [TC-FORGOT-PASSWORD-007.md](./TC-FORGOT-PASSWORD-007.md) | Negative | Đặt lại mật khẩu với mật khẩu mới quá ngắn (< 8 ký tự) |
| F03-TC-008 | [TC-FORGOT-PASSWORD-008.md](./TC-FORGOT-PASSWORD-008.md) | Negative | Đặt lại mật khẩu thiếu chữ hoa |
| F03-TC-009 | [TC-FORGOT-PASSWORD-009.md](./TC-FORGOT-PASSWORD-009.md) | Negative | Đặt lại mật khẩu thiếu chữ thường |
| F03-TC-010 | [TC-FORGOT-PASSWORD-010.md](./TC-FORGOT-PASSWORD-010.md) | Negative | Đặt lại mật khẩu thiếu chữ số |
| F03-TC-011 | [TC-FORGOT-PASSWORD-011.md](./TC-FORGOT-PASSWORD-011.md) | Negative | Đặt lại mật khẩu đúng đặc tả nhưng bị SUT từ chối do lỗi regex (Kiểm tra Bug Regex) |
| F03-TC-012 | [TC-FORGOT-PASSWORD-012.md](./TC-FORGOT-PASSWORD-012.md) | Negative | Đặt lại mật khẩu với Xác nhận mật khẩu không khớp |
| F03-TC-013 | [TC-FORGOT-PASSWORD-013.md](./TC-FORGOT-PASSWORD-013.md) | Security | Sử dụng lại OTP đã dùng thành công |
| F03-TC-014 | [TC-FORGOT-PASSWORD-014.md](./TC-FORGOT-PASSWORD-014.md) | Security | SQL Injection trong trường Email ở Bước 1 |
| F03-TC-015 | [TC-FORGOT-PASSWORD-015.md](./TC-FORGOT-PASSWORD-015.md) | Security | XSS Injection trong trường Email ở Bước 1 |
| F03-TC-016 | [TC-FORGOT-PASSWORD-016.md](./TC-FORGOT-PASSWORD-016.md) | Security | Yêu cầu gửi OTP liên tục nhiều lần (Spamming) |
| F03-TC-017 | [TC-FORGOT-PASSWORD-017.md](./TC-FORGOT-PASSWORD-017.md) | GUI | Kiểm tra hiển thị Step Indicator và các liên kết điều hướng |
| F03-TC-018 | [TC-FORGOT-PASSWORD-018.md](./TC-FORGOT-PASSWORD-018.md) | GUI | Kiểm tra nhãn trường bắt buộc * và màu sắc nút bấm |
| F03-TC-019 | [TC-FORGOT-PASSWORD-019.md](./TC-FORGOT-PASSWORD-019.md) | GUI | Kiểm tra vị trí hiển thị thông báo lỗi trên nút submit |
| F03-TC-020 | [TC-FORGOT-PASSWORD-020.md](./TC-FORGOT-PASSWORD-020.md) | Positive | Đặt lại mật khẩu với mật khẩu mới cực dài (Boundary) |
| F03-TC-021 | [TC-FORGOT-PASSWORD-021.md](./TC-FORGOT-PASSWORD-021.md) | GUI | Kiểm tra vô hiệu hóa nút submit khi đang xử lý yêu cầu (Double Submit Prevention) |
| F03-TC-022 | [TC-FORGOT-PASSWORD-022.md](./TC-FORGOT-PASSWORD-022.md) | GUI | Kiểm tra định dạng type của các trường nhập liệu |

## Automation Notes

- These design files are the human-readable source of the automated scenarios.
- Primitive input and expected values are synchronized with the external JSON data file.
- The Playwright spec converts these cases into executable data-driven tests across Chromium, Firefox, and WebKit.
