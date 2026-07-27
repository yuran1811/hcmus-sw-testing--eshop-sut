# TC-COUPON-009: Admin xóa mã giảm giá — Chọn Hủy trong Dialog

## Requirement ID

FR-17, FR-24

## Module / Test type / Technique

Coupon Management / Functional / Equivalence Partitioning

## Preconditions

- Bảng danh sách đang có mã `SUMMER10`

## Test data

| Target | SUMMER10 |
| Action | Click Xóa -> Click Hủy |

## Test steps

1. Bấm nút **Xóa** tại dòng mã `SUMMER10`
2. Bấm nút **Hủy** trong Dialog xác nhận

## Expected result

- Dialog đóng lại.
- Mã `SUMMER10` vẫn giữ nguyên trong bảng danh sách.

## Status / Related bugs

Not Run / None
