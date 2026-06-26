# TC-ORDER-HISTORY-019: Nhất quán ngôn ngữ tiếng Việt trên toàn bộ giao diện (GUI - Language)

## Requirement ID

FR-21

## Module / Test type / Technique

order-history / GUI Validation / Equivalence Partitioning (Language Consistency)

## Preconditions

- Người dùng đã đăng nhập và đang ở trang Lịch sử đơn hàng.

## Test data

| Parameter | Value |
| --- | --- |
| pageUrl | http://localhost:5173/orders |

## Test steps

1. Đi tới trang Lịch sử đơn hàng.
2. Quan sát toàn bộ các văn bản tĩnh và động trên màn hình, bao gồm: tiêu đề trang, tiêu đề bảng, thông tin chi tiết đơn hàng, nhãn trạng thái đơn hàng, các liên kết, và khu vực footer.

## Expected result

- 100% giao diện trang Lịch sử đơn hàng hiển thị hoàn toàn bằng tiếng Việt chuẩn.
- Không chứa các từ tiếng Anh chưa được dịch (ví dụ: hiển thị "Order Date" thay vì "Ngày đặt", "Total Amount" thay vì "Tổng tiền", "Status" thay vì "Trạng thái", "Action" thay vì "Thao tác").
- Chỉ chấp nhận các mã đơn hàng dạng kỹ thuật chuẩn (ví dụ: ORD001).

## Status / Related bugs

Not Run / None
