# [BUG][Forgot Password] Giao diện không có chỉ báo bước (Bước 1/2)

## Found by Test Case

- GUI-FORGOT-IA02-04

## Requirement liên quan

- FR-03, FR-22

## Severity / Priority

- **Severity**: Minor
- **Priority**: P2

## Environment

- Browser: Google Chrome
- OS: Windows 11
- URL: http://localhost:5173/forgot-password
- Build/Commit: 9b1ecea

## Steps to reproduce

1. Truy cập trang Quên Mật Khẩu tại http://localhost:5173/forgot-password
2. Quan sát toàn bộ giao diện form Quên Mật Khẩu

## Expected result

- Hiển thị chỉ báo tiến trình trực quan ("Bước 1/2" ở bước 1 và "Bước 2/2" ở bước 2)

## Actual result

- Không có chỉ báo bước nào hiển thị trên giao diện làm người dùng không biết vị trí trong quy trình khôi phục mật khẩu

## Evidence

- Screenshot: ![Screenshot](../../Evidences/GUI-FORGOT-IA02-04.png)
