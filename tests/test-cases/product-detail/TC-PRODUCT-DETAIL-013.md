# TC-PRODUCT-DETAIL-013: Trang /products/:id hiển thị breadcrumb (ví dụ: Trang chủ > Chi tiết sản phẩm)

## Requirement ID

FR-23 (GUI / Navigation Requirements)

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
2. Quan sát phần đầu trang, phía dưới thanh điều hướng (navbar).
3. Kiểm tra xem có hiển thị breadcrumb dẫn đường và các liên kết hoạt động như thế nào.

## Expected Result

- Trang chi tiết sản phẩm hiển thị breadcrumb đúng cấu trúc (ví dụ: `Trang chủ > Chi tiết sản phẩm` hoặc `Trang chủ > Danh mục sản phẩm > Tên sản phẩm`).
- Thành phần "Trang chủ" trong breadcrumb là một link hoạt động được, khi click vào sẽ chuyển hướng người dùng quay trở lại trang chủ `/`.

## Status / Related Bugs

Not Run / None
