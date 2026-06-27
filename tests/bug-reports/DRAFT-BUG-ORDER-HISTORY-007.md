# [BUG][Order History] Giao diện Lịch sử đơn hàng trống (0 đơn hàng) hiển thị dạng văn bản thô sơ thay vì Empty State chuẩn FR-24

## Found by Test Case

- TC-ORDER-HISTORY-004

## Requirement liên quan

- FR-24 (Trạng thái trang phản hồi)

## Severity / Priority

- **Severity**: Minor
- **Priority**: P2

## Environment

- Browser: Google Chrome
- OS: Windows 11
- URL: http://localhost:5173/profile
- Build/Commit: a6352864919d5523bbaa295fe7f68f40d59def82

## Steps to reproduce

1. Đăng nhập bằng một tài khoản mới đăng ký chưa hề có bất kỳ đơn hàng nào.
2. Truy cập màn hình Lịch sử đơn hàng (`http://localhost:5173/profile`).
3. Quan sát giao diện hiển thị tại mục "Lịch sử đơn hàng".

## Expected result

- Khi số lượng đơn hàng bằng 0, hệ thống phải hiển thị giao diện trạng thái trống (Empty State) đạt chuẩn thiết kế bao gồm:
  - Một hình vẽ minh họa hoặc biểu tượng trực quan thân thiện.
  - Thông báo rõ ràng: "Bạn chưa có đơn hàng nào."
  - Một nút kêu gọi hành động (CTA) "Mua sắm ngay" để điều hướng người dùng quay trở lại trang chủ/danh sách sản phẩm.

## Actual result

- Giao diện chỉ hiển thị một dòng chữ thô sơ, đơn điệu: "Bạn chưa có đơn hàng nào." dạng thẻ `<p>` thường, không có hình minh họa hay nút CTA quay trở lại trang mua sắm.

## Evidence

- Screenshot of empty profile: [profile_page_empty_1782469522045.png](evidence/profile_page_empty_1782469522045.png)
- Browser recording session: [order_history_ui_exploration_1782469485421.webp](evidence/order_history_ui_exploration_1782469485421.webp)
