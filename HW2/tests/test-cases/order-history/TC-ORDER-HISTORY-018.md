# TC-ORDER-HISTORY-018: Biên thẻ tiêu đề trang - Nhiều hơn một thẻ H1 (BVA - 3-Point BVA: H1 tag count = 2 - Invalid)

## Requirement ID

FR-21

## Module / Test type / Technique

order-history / GUI Validation / Boundary Value Analysis (H1 count = 2 - Invalid)

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

- Số lượng thẻ `<h1>` trên trang phải bằng đúng 1. Nếu kết quả lớn hơn hoặc bằng 2 (ví dụ: Logo cũng đặt trong thẻ H1 và tiêu đề trang cũng là H1), trang được coi là không tuân thủ đặc tả SEO/giao diện FR-21.

## Status / Related bugs

Not Run / None
