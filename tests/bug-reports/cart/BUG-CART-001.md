# BUG-CART-001: Nút "Thêm vào giỏ hàng" ở trang chi tiết nuốt mất lượt bấm đầu tiên

## Found by Test Case

TC-CART-001

## Requirement liên quan

FR-06 / FR-07 (Nút "Thêm vào giỏ hàng" phải thêm sản phẩm vào giỏ ngay khi bấm)

## Severity / Priority

Critical / P1

## Environment

- Browser: Chromium, Firefox, WebKit — tái hiện trên cả 3
- OS: Windows 11
- URL: http://localhost:5173/product/:id
- Build: nhánh `hw04/23127211`, commit `3d2a86d`

## Steps to reproduce

1. Mở trang chủ, bấm "Xem chi tiết" một sản phẩm bất kỳ (ví dụ iPhone 15 Pro Max).
2. Để Số lượng mặc định = 1.
3. Bấm nút "Thêm vào giỏ hàng" đúng **1 lần**.
4. Mở trang Giỏ hàng.

## Expected result

Giỏ hàng có đúng 1 dòng mới cho sản phẩm vừa thêm, Số lượng = 1.

## Actual result

Giỏ hàng **trống** — không có dòng nào được thêm. Xác nhận qua source `frontend-web/src/pages/ProductDetail.jsx:21-31`:

```js
const handleAddToCart = () => {
  if (clickCount === 0) {
    setClickCount(1);
    return; // Không làm gì cả ở lần đầu tiên
  }
  addToCart(product, parseInt(quantity));
  ...
};
```

Lần bấm đầu tiên chỉ set `clickCount = 1` rồi `return` ngay, **không gọi `addToCart`**. Phải bấm lần **thứ 2** mới thực sự thêm được vào giỏ. Đây là bug nghiêm trọng nhất của toàn bộ feature Giỏ hàng vì ảnh hưởng trực tiếp trải nghiệm mua hàng cơ bản nhất.

## Evidence

![BUG-CART-001](../screenshots/BUG-CART-001.png)

- HTML report: `tests/e2e/reports/html/cart-chromium/index.html` (và firefox/webkit) — test `TC-CART-001` (Failed): `expect(cartRows(page)).toHaveCount(1)` nhận count = 0; toàn bộ 5 cột bảng giỏ hàng cũng không tìm thấy vì bảng không render ở trạng thái giỏ rỗng.

## Notes

Do bug này, các test case khác cần seed dữ liệu giỏ hàng ổn định (TC-CART-002 → 010, 012, 013) đều phải bấm nút 2 lần (`clicks: 2`) hoặc thêm qua nút "Thêm vào giỏ" ở trang chủ (không dính bug clickCount) để tránh false-pass/false-fail dây chuyền.
