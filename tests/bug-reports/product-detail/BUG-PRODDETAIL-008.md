# BUG-PRODDETAIL-008: Định dạng giá phụ thuộc locale trình duyệt thay vì cố định chuẩn tiền tệ Việt Nam

## Found by Test Case

PRODDETAIL-VIS-02, PRODDETAIL-COM-04 (GUI Checklist — Product Detail)

## Requirement liên quan

FR-05 (Sản phẩm — "Giá (đơn vị: ₫, định dạng phân cách hàng nghìn)"), FR-06 (Xem chi tiết sản phẩm)

## Severity / Priority

Major / P2

## Environment

- Browser: Chromium (Playwright MCP), viewport 1440×900, hai browser context với `locale` khác nhau
- OS: Windows 11
- URL: http://localhost:5173/product/1
- Build: nhánh `hw3/23127211`, commit `ff96609`

## Steps to reproduce

1. Mở `http://localhost:5173/product/1` với ngôn ngữ ưu tiên của trình duyệt là `en-US`
2. Ghi lại chuỗi giá hiển thị
3. Đổi ngôn ngữ ưu tiên của trình duyệt sang `vi-VN`, tải lại trang
4. So sánh chuỗi giá giữa hai lần

## Expected result

- VIS-02: Giá hiển thị theo chuẩn tiền tệ Việt Nam `30.000.000` (dấu chấm), không phải `30,000,000`
- COM-04: Chuỗi giá giữ nguyên một định dạng thống nhất theo chuẩn Việt Nam, không đổi theo ngôn ngữ trình duyệt

## Actual result

Chuỗi giá **đổi theo locale của trình duyệt**:

| Locale trình duyệt | Chuỗi giá hiển thị | Đúng chuẩn vi-VN? |
| ------------------ | ------------------ | ----------------- |
| `en-US`            | `30,000,000 ₫`     | ❌ (dấu phẩy)     |
| `vi-VN`            | `30.000.000 ₫`     | ✅                |

Vì `<html lang="en">` (xem `BUG-PRODDETAIL-007`) và phần lớn người dùng để trình duyệt ở mặc định, giá hiển thị trong thực tế là `30,000,000 ₫` — sai chuẩn tiền tệ Việt Nam.

Nguyên nhân trong `frontend-web/src/pages/ProductDetail.jsx`:

```js
{Number(product.price).toLocaleString()} ₫
```

`toLocaleString()` gọi không truyền locale nên bám theo locale của trình duyệt thay vì cố định `vi-VN`.

Lỗi này lặp lại ở trang Giỏ hàng (cột "Giá", "Thành tiền", "Tổng tạm tính") vì cùng dùng một cách format.

## Evidence

- Screenshot (giá hiển thị `30,000,000 ₫` với dấu phẩy): ![BUG-PRODDETAIL-008-comma](../screenshots/BUG-PRODDETAIL-008-price-comma-format.png)

## Notes

Cách sửa: thay bằng `Number(product.price).toLocaleString('vi-VN')`, hoặc tốt hơn là `new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)` để chuẩn hoá cả ký hiệu tiền tệ. Nên tách thành một helper dùng chung cho cả Home, Product Detail, Cart và Checkout.
