# TC-PRODUCT-DETAIL-014: Ảnh sản phẩm trên trang chi tiết có thuộc tính alt không rỗng

## Requirement ID

FR-24 (GUI / Feedback & State Requirements)

## Module / Test type / Technique

Product Detail / GUI / GUI Testing

## Preconditions

- Backend running at `http://localhost:3000`
- Frontend Web running at `http://localhost:5173`
- Default user `test@eshop.com` / `Test1234!` is logged in.
- A product with ID = 1 exists in the database.

## Test Data

| Field                      | Value |
| -------------------------- | ----- |
| product_id (URL parameter) | `1`   |

## Test Steps

1. Truy cập trang chi tiết sản phẩm qua URL: `http://localhost:5173/products/1`
2. Click chuột phải vào ảnh sản phẩm lớn và chọn "Inspect" (Kiểm tra) để xem mã nguồn HTML của thẻ `<img>`.
3. Kiểm tra sự tồn tại và giá trị của thuộc tính `alt` trong thẻ `<img>`.

## Expected Result

- Thẻ `<img>` của ảnh sản phẩm có thuộc tính `alt`.
- Thuộc tính `alt` không được để trống (ví dụ: `alt="Tên sản phẩm A"` hoặc `alt="Sản phẩm A"`), nhằm hỗ trợ trình đọc màn hình và SEO.

## Status / Related Bugs

Not Run / None
