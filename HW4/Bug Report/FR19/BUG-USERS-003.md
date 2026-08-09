# [BUG][Quản Lý Người Dùng Admin] Tiêu đề trang quản lý sử dụng sai thẻ h2 thay vì thẻ h1

## Found by Test Case

- F19-TC-014

## Requirement liên quan

- FR-19

## Severity / Priority

- **Severity**: Trivial
- **Priority**: P3

## Environment

- Browser: Google Chrome
- OS: Windows 11
- URL: http://localhost:5174/
- Build/Commit: 3aa95b1

## Steps to reproduce

1. Đăng nhập vào trang quản trị Admin tại `http://localhost:5174/` bằng tài khoản admin.
2. Bấm chọn tab "Người dùng".
3. Mở công cụ Developer Tools của trình duyệt (F12) và kiểm tra (Inspect) mã nguồn HTML của tiêu đề trang chính "Quản lý Người dùng".

## Expected result

- Tiêu đề chính hiển thị nội dung trang phải sử dụng thẻ tiêu đề cao nhất là `<h1>` theo đúng tiêu chuẩn Semantic HTML5 và khả năng tiếp cận (Accessibility).

## Actual result

- Tiêu đề chính của trang sử dụng thẻ `<h2>` (`<h2 className="text-2xl font-bold mb-6">Quản lý Người dùng</h2>`). Trong khi đó, thẻ `<h1>` duy nhất trên trang đang được dùng cho logo thương hiệu ở thanh bên (sidebar).

## Evidence

- Screenshot: ![Screenshot](../Evidences/FR19/F19-TC-014.png)

