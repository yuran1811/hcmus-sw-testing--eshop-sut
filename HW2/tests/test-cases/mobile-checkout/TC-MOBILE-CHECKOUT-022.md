# TC-MOBILE-CHECKOUT-022: Hủy đơn hàng thành công trên Mobile khi ở trạng thái Chờ xác nhận

## Requirement ID

FR-20, FR-10

## Module / Test type / Technique

mobile-checkout / Functional / State Transition

## Preconditions

- Tài khoản `test@eshop.com` đã đăng nhập trên ứng dụng di động EShop.
- Tài khoản có một đơn hàng vừa mới đặt, đang ở trạng thái `Chờ xác nhận` (pending).

## Test data

| Parameter | Value |
| --- | --- |
| userSession | logged in as test@eshop.com |
| orderStatus | pending |

## Test steps

1. Mở ứng dụng di động EShop và đăng nhập tài khoản.
2. Từ trang cá nhân (Profile Screen) hoặc menu điều hướng, nhấp chọn mục "Lịch sử đơn hàng".
3. Chọn đơn hàng vừa mới đặt đang ở trạng thái "Chờ xác nhận".
4. Nhấn nút "Hủy đơn hàng" (nút được hiển thị bằng màu đỏ nổi bật theo đúng FR-21).
5. Khi dialog xác nhận hủy đơn hàng hiển thị, nhấn chọn "Xác nhận".
6. Quan sát sự thay đổi trạng thái của đơn hàng trên màn hình.

## Expected result

- Hệ thống xử lý hủy đơn hàng thành công.
- Trạng thái đơn hàng hiển thị trên giao diện di động được cập nhật thành: "Đã hủy" (canceled), với màu sắc phân biệt trực quan.
- Người dùng không thể thực hiện hành động thay đổi trạng thái nào khác trên đơn hàng này nữa vì đây là trạng thái kết thúc (Final State) theo FR-10.

## Status / Related bugs

Not Run / None
