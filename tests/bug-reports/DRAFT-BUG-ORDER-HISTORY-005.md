# [BUG][Order History] Trang Hồ sơ không tự động điều hướng người dùng chưa đăng nhập về trang Login

## Found by Test Case
- TC-ORDER-HISTORY-002

## Requirement liên quan
- FR-11 (Xem lịch sử đơn hàng)

## Severity / Priority
- **Severity**: Major
- **Priority**: P1

## Environment
- Browser: Google Chrome
- OS: Windows 11
- URL: http://localhost:5173/profile
- Build/Commit: a6352864919d5523bbaa295fe7f68f40d59def82

## Steps to reproduce
1. Đảm bảo bạn chưa đăng nhập tài khoản (hoặc nhấn đăng xuất).
2. Truy cập trực tiếp đường dẫn trang hồ sơ: `http://localhost:5173/profile`.
3. Quan sát hành vi điều hướng của trình duyệt và giao diện hiển thị.

## Expected result
- Vì trang Hồ sơ chứa thông tin cá nhân và lịch sử mua hàng bắt buộc phải bảo mật, hệ thống phải tự động chuyển hướng (redirect) người dùng chưa đăng nhập quay trở về màn hình Đăng nhập (`http://localhost:5173/login`) kèm thông báo yêu cầu đăng nhập.

## Actual result
- Trình duyệt không hề thực hiện chuyển hướng. Người dùng vẫn ở lại đường dẫn `/profile` và màn hình chỉ hiển thị một dòng chữ thô sơ: "Vui lòng đăng nhập" ở giữa trang.

## Evidence
- Code file: [Profile.jsx:L108](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/frontend-web/src/pages/Profile.jsx#L108)
- Screenshot of empty page state: [profile_page_empty_1782469522045.png](evidence/profile_page_empty_1782469522045.png)
