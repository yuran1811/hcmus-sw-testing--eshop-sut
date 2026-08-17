# [BUG][Lịch Sử Đơn Hàng] Giao diện hiển thị sai màu hoặc sai nhãn tiếng Việt theo quy định (Nút đăng xuất hiển thị sai)

## Found by Test Case

- F11-TC-018

## Requirement liên quan

- FR-11

## Severity / Priority

- **Severity**: Minor
- **Priority**: P2

## Environment

- Browser: Google Chrome
- OS: Windows 11
- URL: http://localhost:5173/profile
- Build/Commit: 3aa95b1

## Steps to reproduce

1. Đăng nhập vào tài khoản người dùng bình thường.
2. Điều hướng tới trang cá nhân `/profile`.
3. Kiểm tra nhãn và thiết kế của nút đăng xuất trên thanh điều hướng hoặc trang cá nhân.

## Expected result

- Nút đăng xuất phải được hiển thị bằng tiếng Việt chuẩn theo quy định đặc tả là "Đăng xuất".

## Actual result

- Nút đăng xuất hiển thị nhãn là "Thoát" thay vì "Đăng xuất" như quy định của đặc tả giao diện tiếng Việt chuyên nghiệp.

## Evidence

- Screenshot: ![Screenshot](../Evidences/FR11/F11-TC-018.png)

