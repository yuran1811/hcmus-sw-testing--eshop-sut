# BUG-12: Mobile không có filter/sort/pagination cho lịch sử đơn hàng

## Thông tin

| Trường | Giá trị |
|--------|---------|
| Bug ID | BUG-12 |
| Feature | FR-20 (Mobile) — Lịch sử đơn hàng |
| Severity | Minor |
| Priority | Low |
| Status | Open |
| File:Line | `frontend-mobile/App.js:893-976` |

## Mô tả

Màn hình Order History trên mobile hiển thị tất cả đơn hàng của user nhưng không có:
- Tìm kiếm theo order ID hoặc trạng thái
- Lọc theo trạng thái (pending, delivered, v.v.)
- Sắp xếp (mặc định DESC theo ID từ API)
- Phân trang (có thể chậm khi nhiều đơn)

## Expected

Theo FR-11 spec cần có: Mã đơn, Ngày đặt, Tổng tiền, Trạng thái — các trường này đã có. Tuy nhiên với UX tốt cần có filter.

## Actual

Hiển thị toàn bộ orders dạng flat list, không có controls.

## Ghi chú

Đây là thiếu sót tính năng (UX improvement), không phải lỗi nghiêm trọng.
