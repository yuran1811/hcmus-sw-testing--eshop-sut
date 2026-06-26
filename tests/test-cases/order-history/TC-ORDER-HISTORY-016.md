# TC-ORDER-HISTORY-016: Xác thực cấu trúc thẻ tiêu đề trang - Đầy đủ tiêu chuẩn (BVA - H1 tag count = 1)

## Requirement ID

FR-21

## Module / Test type / Technique

order-history / GUI Validation / Boundary Value Analysis (H1 count = 1)

## Preconditions

- Người dùng đã đăng nhập và đang ở trang Lịch sử đơn hàng.

## Test data

| Parameter | Value |
| --- | --- |
| pageUrl | http://localhost:5173/orders |

## Test steps

1. Đi tới trang Lịch sử đơn hàng.
2. Nhấp chuột phải chọn "Kiểm tra phần tử" (Inspect) hoặc nhấn F12 để mở DevTools.
3. Tại tab Console hoặc tab Elements, đếm số lượng thẻ `<h1>` xuất hiện trên trang bằng lệnh: `document.querySelectorAll('h1').length`.
4. Kiểm tra nội dung chữ bên trong thẻ `<h1>` này.

## Expected result

- Hệ thống trả về chính xác số lượng thẻ `<h1>` trên trang bằng **đúng 1**.
- Thẻ `<h1>` này chứa tiêu đề mô tả nội dung trang (ví dụ: "Lịch sử đơn hàng của tôi").
- Không có bất kỳ thẻ `<h1>` phụ nào khác ở logo, banner hoặc footer.

## Status / Related bugs

Not Run / None
