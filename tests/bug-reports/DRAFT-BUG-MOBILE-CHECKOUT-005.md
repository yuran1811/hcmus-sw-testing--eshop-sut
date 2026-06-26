# [BUG][Mobile Checkout] Không nhất quán ngôn ngữ tiếng Việt (hiển thị Username và Sign In bằng tiếng Anh) trên màn hình đăng nhập

## Found by Test Case
TC-MOBILE-CHECKOUT-017

## Requirement liên quan
FR-20

## Severity / Priority
Trivial / P3

## Environment
- Browser: Google Chrome
- OS: Windows 11
- URL: http://localhost:8081
- Build/Commit: a6352864919d5523bbaa295fe7f68f40d59def82

## Steps to reproduce
1. Mở ứng dụng di động EShop.
2. Nhấn vào liên kết "Đăng nhập" ở trên thanh điều hướng.
3. Quan sát các nhãn văn bản và nút bấm trên màn hình đăng nhập.

## Expected result
Giao diện phải nhất quán 100% tiếng Việt theo quy chuẩn. Cụ thể:
- Nhãn nhập tên tài khoản hiển thị: "Tên đăng nhập" hoặc "Email".
- Nút đăng nhập hiển thị: "Đăng nhập".

## Actual result
Giao diện có sự pha trộn tiếng Anh:
- Nhãn của trường Email hiển thị là `Username` (mặc dù placeholder là `Email`).
- Nút gửi form đăng nhập hiển thị là `Sign In`.

## Evidence
Ảnh chụp màn hình Đăng nhập hiển thị lỗi nhãn tiếng Anh: [mobile_login_before_typing.png](evidence/mobile_login_before_typing.png)
