# TC-ORDER-HISTORY-003: Đảm bảo cô lập dữ liệu đơn hàng giữa các người dùng (Functional - Access Control)

## Requirement ID

FR-11

## Module / Test type / Technique

order-history / Functional & Security / Equivalence Partitioning (Data Isolation)

## Preconditions

- Người dùng đã đăng nhập thành công vào tài khoản `test@eshop.com` (User A).
- Trong hệ thống tồn tại đơn hàng mã `ORD999` thuộc về tài khoản `other@eshop.com` (User B).

## Test data

| Parameter | Value |
| --- | --- |
| userSession | logged in as test@eshop.com |
| targetOrderId | ORD999 (thuộc sở hữu của other@eshop.com) |

## Test steps

1. Đăng nhập vào EShop bằng tài khoản `test@eshop.com` và đi tới trang Lịch sử đơn hàng.
2. Kiểm tra danh sách hiển thị xem đơn hàng `ORD999` có xuất hiện trong bảng hay không.
3. Thử gửi request API trực tiếp hoặc thay đổi URL (nếu hệ thống hỗ trợ trang chi tiết đơn hàng dạng `http://localhost:5173/orders/ORD999`) để xem chi tiết đơn hàng `ORD999`.

## Expected result

- Đơn hàng `ORD999` tuyệt đối không xuất hiện trong danh sách Lịch sử đơn hàng của `test@eshop.com`.
- Khi cố tình truy cập chi tiết đơn hàng `ORD999` bằng URL trực tiếp hoặc qua API, hệ thống hiển thị thông báo lỗi "Bạn không có quyền xem đơn hàng này" hoặc điều hướng về trang lỗi 403 / trang chủ.

## Status / Related bugs

Not Run / None
