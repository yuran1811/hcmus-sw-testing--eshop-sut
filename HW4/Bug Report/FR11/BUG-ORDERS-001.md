# [BUG][Lịch Sử Đơn Hàng] Trang lịch sử đơn hàng rỗng không hiển thị hình ảnh minh họa (Empty State)

## Found by Test Case

- F11-TC-010

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

1. Đăng nhập bằng một tài khoản chưa có lịch sử mua hàng (ví dụ: `user_f11_empty@eshop.com`).
2. Điều hướng tới trang cá nhân `/profile` và cuộn xuống mục Lịch sử đơn hàng.
3. Quan sát hiển thị của khu vực danh sách đơn hàng.

## Expected result

- Hệ thống hiển thị trạng thái trống (Empty State) bao gồm một thông điệp rõ ràng đi kèm một hình ảnh minh họa hoặc biểu tượng (illustration/icon) trực quan để làm đẹp giao diện.

## Actual result

- Hệ thống chỉ hiển thị một dòng văn bản thuần: "Bạn chưa có đơn hàng nào." mà không có bất kỳ hình ảnh minh họa hay biểu tượng đồ họa nào kèm theo, gây đơn điệu về mặt UX/UI.

## Evidence

- Screenshot: ![Screenshot](../Evidences/FR11/F11-TC-010.png)

