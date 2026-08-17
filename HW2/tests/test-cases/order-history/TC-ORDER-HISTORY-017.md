# TC-ORDER-HISTORY-017: Biên thẻ tiêu đề trang - Không tồn tại thẻ H1 (BVA - 3-Point BVA: H1 tag count = 0 - Invalid)

## Requirement ID

FR-21

## Module / Test type / Technique

order-history / GUI Validation / Boundary Value Analysis (H1 count = 0 - Invalid)

## Preconditions

- Người dùng đã đăng nhập và đang ở trang Lịch sử đơn hàng.

## Test data

| Parameter | Value |
| --- | --- |
| pageUrl | http://localhost:5173/orders |

## Test steps

1. Đi tới trang Lịch sử đơn hàng.
2. Mở DevTools và đếm số lượng thẻ `<h1>` trên trang: `document.querySelectorAll('h1').length`.

## Expected result

- Số lượng thẻ `<h1>` tìm thấy trên trang phải bằng đúng 1. Nếu kết quả trả về bằng 0 (thiếu thẻ H1 chính), trang được coi là vi phạm nghiêm trọng tiêu chuẩn cấu trúc giao diện FR-21.

## Status / Related bugs

Not Run / None
