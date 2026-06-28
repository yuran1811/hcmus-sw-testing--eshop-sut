# BUG-CART-003: Nhãn tổng tiền giỏ hàng sai — hiển thị "Tổng tạm tính" thay vì "Tổng cộng"

## Found by Test Case

TC-CART-006

## Requirement liên quan

FR-07 (Giỏ hàng — "Tổng cộng = tổng Thành tiền của tất cả các dòng; nhãn hiển thị phải chính xác là 'Tổng cộng', không phải 'Tổng tạm tính'")

## Severity / Priority

Minor / P3

## Environment

- Browser: Chromium (Desktop Chrome)
- OS: Windows 11
- URL: http://localhost:5173 (frontend-web)
- Build: nhánh `anh-khoa`, commit `fdf93ff`

## Steps to reproduce

1. Thêm "Sản phẩm A" (Số lượng 1, 100,000 ₫... trong môi trường thật quan sát được là "iPhone 15 Pro Max", 30,000,000 ₫) vào giỏ
2. Thêm thêm 1 sản phẩm nữa vào giỏ (để giỏ có ≥1 dòng)
3. Vào trang Giỏ hàng

## Expected result

Nhãn tổng tiền hiển thị đúng là **"Tổng cộng"** (theo FR-07).

## Actual result

Nhãn hiển thị là **"Tổng tạm tính"** — sai theo đặc tả. Giá trị số tiền (60,000,000 ₫ trong ảnh chụp) tính đúng, chỉ sai nhãn chữ.

## Evidence

- Screenshot: ![BUG-CART-003-incorrect-label](../screenshots/BUG-CART-003-incorrect-in-label.png)

## Notes

Ảnh chụp đính kèm thực chất minh họa đồng thời 2 bug khác nhau trên cùng 1 màn hình: (1) BUG-CART-002 — 2 dòng trùng "iPhone 15 Pro Max" thay vì merge số lượng; (2) BUG-CART-003 — nhãn "Tổng tạm tính" sai. Hai bug độc lập nhau (khác root cause, khác file/dòng code), nên tách thành 2 báo cáo riêng để dễ track fix.
