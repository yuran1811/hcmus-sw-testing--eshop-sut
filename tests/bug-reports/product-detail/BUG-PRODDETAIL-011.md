# BUG-PRODDETAIL-011: Trang chi tiết thiếu thông tin tồn kho, lối đi thẳng tới thanh toán và khối sản phẩm liên quan

## Found by Test Case

PRODDETAIL-USB-02, PRODDETAIL-USB-03, PRODDETAIL-USB-05 (GUI Checklist — Product Detail)

## Requirement liên quan

FR-06 (Xem chi tiết sản phẩm — "Hiển thị đầy đủ: Ảnh lớn, Tên, Giá, Mô tả, **Danh mục**")

## Severity / Priority

Minor / P3

## Environment

- Browser: Chromium (Playwright MCP), viewport 1440×900
- OS: Windows 11
- URL: http://localhost:5173/product/1
- Build: nhánh `hw3/23127211`, commit `ff96609`

## Steps to reproduce

1. Mở `http://localhost:5173/product/1`
2. Tìm thông tin tình trạng còn hàng / hết hàng trên trang (USB-02)
3. Tìm lối đi thẳng tới bước thanh toán mà không phải mở trang Giỏ hàng (USB-03)
4. Tìm khối sản phẩm liên quan hoặc cùng danh mục (USB-05)

## Expected result

- USB-02: Trang cho biết sản phẩm còn hàng hay không trước khi người dùng bấm thêm vào giỏ
- USB-03: Có lối đi tới bước thanh toán mà không bắt buộc phải mở trang Giỏ hàng làm trung gian
- USB-05: Người dùng có thể tiếp tục khám phá sản phẩm khác mà không phải quay ngược về trang Home

## Actual result

Toàn bộ nội dung của `main` trên trang chi tiết chỉ gồm:

```
iPhone 15 Pro Max

30,000,000 ₫

Điện thoại cao cấp của Apple

Số lượng:
Thêm vào giỏ hàng
```

Cụ thể:

- **USB-02:** Không có bất kỳ thông tin nào về tồn kho / còn hàng / hết hàng. Người dùng chỉ biết sản phẩm có bán được hay không sau khi đã thêm vào giỏ và đi tới bước thanh toán.
- **USB-03:** `main` chỉ có đúng **1** nút ("Thêm vào giỏ hàng") và **0** link. Không có nút "Mua ngay" — bắt buộc phải qua trang Giỏ hàng mới tới được thanh toán.
- **USB-05:** Không có khối sản phẩm liên quan hay cùng danh mục, dù API đã trả về sẵn trường `category_id` cho mỗi sản phẩm (`GET /api/products` trả 5 sản phẩm thuộc 3 danh mục).

Ngoài ra, đối chiếu với FR-06 (yêu cầu hiển thị cả **Danh mục**): trang hiện **không hiển thị danh mục** của sản phẩm dù dữ liệu đã có `category_id`.

## Evidence

- Screenshot (toàn bộ nội dung trang chi tiết): ![BUG-PRODDETAIL-011-missing](../screenshots/BUG-PRODDETAIL-010-whitespace-and-upscaled-image.png)

## Notes

Đây là nhóm thiếu sót về mức độ hoàn chỉnh của màn hình chứ không phải lỗi chức năng, nên xếp P3. Tuy nhiên riêng việc **không hiển thị Danh mục** là vi phạm trực tiếp câu chữ của FR-06 và nên được ưu tiên sửa trước hai mục còn lại.
