# [BUG][Forgot Password] Bước 2 thiếu ô nhập "Xác nhận mật khẩu mới" và nhãn OTP ghi sai 4 số

## Found by Test Case

- GUI-FORGOT-IA02-05, GUI-FORGOT-IA02-06, GUI-FORGOT-IA02-08

## Requirement liên quan

- FR-03

## Severity / Priority

- **Severity**: Major
- **Priority**: P1

## Environment

- Browser: Google Chrome
- OS: Windows 11
- URL: http://localhost:5173/forgot-password
- Build/Commit: 9b1ecea

## Steps to reproduce

1. Truy cập http://localhost:5173/forgot-password
2. Nhập email "admin@eshop.com" và nhấn "Lấy mã OTP"
3. Quan sát form ở Bước 2

## Expected result

- Nhãn OTP ghi "Mã OTP (6 số)" và Bước 2 có thêm trường "Xác nhận mật khẩu mới" riêng biệt

## Actual result

- Nhãn ghi "Mã OTP (4 số)" và Bước 2 chỉ có 2 trường (Mã OTP và Mật khẩu mới), hoàn toàn thiếu trường Xác nhận mật khẩu mới

## Evidence

- Screenshot: ![Screenshot](../../Evidences/GUI-FORGOT-IA02-05.png)
