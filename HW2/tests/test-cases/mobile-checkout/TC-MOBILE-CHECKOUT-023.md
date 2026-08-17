# TC-MOBILE-CHECKOUT-023: Chặn không cho phép Hủy đơn hàng trên Mobile khi đang giao hàng

## Requirement ID

FR-20, FR-10

## Module / Test type / Technique

mobile-checkout / Functional / State Transition

## Preconditions

- Tài khoản `test@eshop.com` đã đăng nhập trên ứng dụng di động EShop.
- Người dùng có một đơn hàng đã được hệ thống (hoặc Admin) chuyển sang trạng thái `Đang giao hàng` (shipping).

## Test data

| Parameter | Value |
| --- | --- |
| userSession | logged in as test@eshop.com |
| orderStatus | shipping |

## Test steps

1. Mở ứng dụng di động EShop và đăng nhập tài khoản.
2. Từ trang cá nhân (Profile Screen) hoặc menu điều hướng, nhấp chọn mục "Lịch sử đơn hàng".
3. Chọn đơn hàng đang ở trạng thái "Đang giao hàng" (shipping).
4. Quan sát sự xuất hiện và trạng thái của nút "Hủy đơn hàng" trên giao diện chi tiết đơn hàng di động.

## Expected result

- Nút "Hủy đơn hàng" hoàn toàn không xuất hiện hoặc bị vô hiệu hóa (disabled) trên giao diện ứng dụng di động của người dùng thường.
- Người dùng thường không thể tự ý thực hiện hành động hủy đơn khi đơn hàng đã ở trạng thái `shipping` theo đúng sơ đồ State Machine tại FR-10.

## Status / Related bugs

Not Run / None
