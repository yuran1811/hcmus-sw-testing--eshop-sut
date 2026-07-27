# TC-COUPON-010: Admin xóa mã giảm giá — Chọn Xác nhận trong Dialog

## Requirement ID

FR-17, FR-24

## Module / Test type / Technique

Coupon Management / Functional / Equivalence Partitioning

## Preconditions

- Bảng danh sách đang có mã `SUMMER10`

## Test data

| Target | SUMMER10 |
| Action | Click Xóa -> Click Xác nhận |

## Test steps

1. Bấm nút **Xóa** tại dòng mã `SUMMER10`
2. Bấm nút **Xác nhận** (OK) trong Dialog

## Expected result

- Đúng dòng mã `SUMMER10` bị xóa khỏi bảng.
- Danh sách được refetch/cập nhật lại tự động không còn mã `SUMMER10`.

## Status / Related bugs

Not Run / None
