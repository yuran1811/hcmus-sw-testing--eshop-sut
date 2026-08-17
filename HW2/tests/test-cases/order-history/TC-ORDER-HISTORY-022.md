# TC-ORDER-HISTORY-022: Kiểm tra phân trang lịch sử đơn hàng - Số lượng đơn hàng vượt kích thước trang 1 đơn vị

## Requirement ID

FR-11

## Module / Test type / Technique

order-history / Functional / Boundary Value Analysis (2-Point BVA)

## Preconditions

- Tài khoản `test@eshop.com` đang đăng nhập.
- Kích thước trang mặc định hiển thị đơn hàng là 5 đơn hàng/trang.
- Tài khoản này có đúng 6 đơn hàng trong cơ sở dữ liệu.

## Test data

| Parameter | Value |
| --- | --- |
| ordersInDB | 6 orders |
| pageSize | 5 |

## Test steps

1. Đăng nhập EShop bằng tài khoản `test@eshop.com` và truy cập trang "Lịch sử đơn hàng".
2. Quan sát số lượng đơn hàng hiển thị ở Trang 1.
3. Nhấp chọn nút chuyển sang "Trang sau" hoặc nút "Trang 2".
4. Quan sát số lượng đơn hàng hiển thị ở Trang 2.

## Expected result

- Giao diện điều khiển phân trang xuất hiện rõ ràng và hoạt động bình thường (BVA-PAGE-COUNT-2).
- Trang 1 hiển thị đúng 5 đơn hàng đầu tiên (mới nhất).
- Sau khi click sang Trang 2, bảng cập nhật hiển thị đúng 1 đơn hàng còn lại (cũ nhất).

## Status / Related bugs

Not Run / None
