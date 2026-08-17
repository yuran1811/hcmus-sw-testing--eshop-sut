# TC-ORDER-HISTORY-027: Kiểm tra thứ tự chuyển tiêu điểm bàn phím (Tab Order) trên trang Lịch sử Đơn hàng (FR-21)

## Requirement ID

FR-21

## Module / Test type / Technique

order-history / GUI / Error Isolation

## Preconditions

- Tài khoản `test@eshop.com` đang đăng nhập và đang ở màn hình "Lịch sử đơn hàng" (`http://localhost:5173/orders`).
- Tiêu điểm (focus) hiện tại đang nằm ở thanh điều hướng Sidebar.

## Test data

| Parameter | Value |
| --- | --- |
| userSession | logged in as test@eshop.com |

## Test steps

1. Nhấn phím `Tab` liên tục trên bàn phím.
2. Quan sát đường đi của đường viền tiêu điểm (focus indicator border) di chuyển qua các phần tử tương tác trên trang.

## Expected result

- Tiêu điểm di chuyển tuần tự đúng quy chuẩn giao diện tiếp cận từ trên xuống dưới, từ trái sang phải (FR-21):
  1. Sidebar menu điều hướng.
  2. Các nút/tab bộ lọc trạng thái (từ "Tất cả", "Chờ xác nhận", "Đã xác nhận", ..., đến "Đã hủy").
  3. Các liên kết Mã đơn hàng hoặc các nút "Xem chi tiết" của từng dòng đơn hàng trong bảng từ dòng đầu tiên xuống dòng cuối cùng.
  4. Các nút điều khiển của thanh phân trang (Trang trước, Trang 1, Trang 2, Trang sau) ở cuối bảng.
  5. Phần chân trang (Footer).
- Không có hiện tượng tiêu điểm di chuyển lộn xộn, nhảy cóc, bị bỏ qua hoặc bị kẹt (focus trap) ở bất kỳ phần tử nào.

## Status / Related bugs

Not Run / None
