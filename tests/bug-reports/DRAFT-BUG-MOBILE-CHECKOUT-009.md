# [BUG][Mobile Checkout] Không hiển thị dialog xác nhận khi khách hàng nhấn nút hủy đơn hàng trong lịch sử đơn hàng

## Found by Test Case
TC-MOBILE-CHECKOUT-022

## Requirement liên quan
FR-20

## Severity / Priority
Minor / P2

## Environment
- Browser: Google Chrome
- OS: Windows 11
- URL: http://localhost:8081
- Build/Commit: a6352864919d5523bbaa295fe7f68f40d59def82

## Steps to reproduce
1. Đăng nhập và tạo một đơn hàng mới trên ứng dụng di động.
2. Truy cập màn hình "Hồ sơ của bạn > Lịch sử đơn hàng".
3. Nhấn nút "Hủy đơn" bên cạnh đơn hàng mới tạo (đang ở trạng thái "Chờ xác nhận").

## Expected result
Ứng dụng di động phải hiển thị hộp thoại xác nhận (Alert confirm dialog) hỏi: "Bạn có chắc chắn muốn hủy đơn hàng này?" để đảm bảo tính an toàn cho người dùng khi vô tình chạm nhầm.

## Actual result
Đơn hàng bị hủy trực tiếp ngay lập tức, chuyển sang trạng thái "Đã hủy" (canceled) mà không yêu cầu người dùng xác nhận lại.

## Evidence
- Ảnh chụp màn hình đơn hàng bị hủy trực tiếp không qua xác nhận: [mobile_order_cancelled_immediately.png](evidence/mobile_order_cancelled_immediately.png)
- Video ghi nhận phiên kiểm thử: [mobile_checkout_run.webp](evidence/mobile_checkout_run.webp)
