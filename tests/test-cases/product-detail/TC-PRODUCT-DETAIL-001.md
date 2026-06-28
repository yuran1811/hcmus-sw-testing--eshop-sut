# TC-PRODUCT-DETAIL-001: Product ID hợp lệ -> hiển thị đầy đủ

## Requirement ID

FR-06

## Module / Test type / Technique

Product Detail / Functional / Domain Testing

## Preconditions

- Backend running at `http://localhost:3000`
- Frontend Web running at `http://localhost:5173`
- Default user `test@eshop.com` / `Test1234!` exists and is logged in.
- A product with ID = 1 exists in the database (e.g., Name: "Sản phẩm A", Price: 100000, Category: "Thời trang").

## Test Data

| Field                      | Value |
| -------------------------- | ----- |
| product_id (URL parameter) | `1`   |

## Test Steps

1. Mở trình duyệt và truy cập trang chi tiết sản phẩm qua URL: `http://localhost:5173/products/1` (hoặc nhấn vào sản phẩm có ID 1 từ trang chủ).
2. Quan sát giao diện hiển thị của trang chi tiết sản phẩm.

## Expected Result

- Hệ thống hiển thị đầy đủ các thông tin của sản phẩm bao gồm:
  - Ảnh lớn sản phẩm.
  - Tên sản phẩm.
  - Giá sản phẩm được hiển thị đúng định dạng tiền tệ của hệ thống, có ký hiệu ₫; dấu phẩy hoặc dấu chấm đều được chấp nhận làm phân cách hàng nghìn nếu hiển thị nhất quán.
  - Mô tả chi tiết sản phẩm.
  - Tên danh mục của sản phẩm.
- Không hiển thị bất kỳ thông báo lỗi nào.

## Status / Related Bugs

Not Run / None
