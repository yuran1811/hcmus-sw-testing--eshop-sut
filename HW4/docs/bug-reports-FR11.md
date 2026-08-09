# BÁO CÁO LỖI (BUG REPORT) - PHÂN HỆ FR-11 (LỊCH SỬ ĐƠN HÀNG)

Báo cáo danh sách các lỗi phát hiện qua ma trận kiểm thử cho phân hệ FR-11 (Lịch sử đơn hàng của người dùng).

---

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

---

# [BUG][Lịch Sử Đơn Hàng] Cho phép người dùng hủy đơn hàng đang ở trạng thái "shipping" (Đang giao)

## Found by Test Case

- F11-TC-013

## Requirement liên quan

- FR-11

## Severity / Priority

- **Severity**: Critical
- **Priority**: P0

## Environment

- Browser: Google Chrome
- OS: Windows 11
- URL: http://localhost:5173/profile
- Build/Commit: 3aa95b1

## Steps to reproduce

1. Đăng nhập bằng tài khoản có đơn hàng đang ở trạng thái "Đang giao" (`shipping`) (ví dụ: `user_f11_main@eshop.com`).
2. Truy cập trang cá nhân `/profile` và cuộn xuống mục Lịch sử đơn hàng.
3. Tìm đến đơn hàng có trạng thái "Đang giao" và kiểm tra xem nút "Hủy đơn" có hiển thị hay không.
4. Nhấn nút "Hủy đơn" và kiểm tra hành vi của hệ thống.

## Expected result

- Đối với các đơn hàng ở trạng thái "Đang giao" (shipping) hoặc "Đã giao" (delivered), nút "Hủy đơn" phải bị ẩn hoặc vô hiệu hóa. Người dùng chỉ được phép hủy đơn ở trạng thái "Chờ xác nhận" (pending) hoặc "Đã xác nhận" (confirmed).

## Actual result

- Nút "Hủy đơn" vẫn hiển thị hoạt động bình thường trên đơn hàng có trạng thái "Đang giao". Khi nhấn, hệ thống gửi yêu cầu PUT tới `/api/orders/:id/cancel`, thông báo "Hủy đơn thành công!" và cập nhật trạng thái đơn hàng sang "Đã hủy" (canceled), vi phạm logic quy trình xử lý đơn hàng.

## Evidence

- Screenshot: ![Screenshot](../Evidences/FR11/F11-TC-013.png)

---

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
