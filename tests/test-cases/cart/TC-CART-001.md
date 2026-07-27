# TC-CART-001: Thêm sản phẩm vào giỏ hàng lần đầu

## Requirement ID

FR-06, FR-07

## Module / Test type / Technique

Cart / Functional / Equivalence Partitioning

## Preconditions

- Backend API (`http://localhost:3000`) và Frontend Web (`http://localhost:5173`) đang hoạt động
- Giỏ hàng hiện tại đang trống

## Test data

| Product | Laptop Gaming |
| Quantity | 1 |

## Test steps

1. Mở trang Chi tiết sản phẩm Laptop Gaming (`/products/1`)
2. Chọn số lượng = 1
3. Bấm nút **Thêm vào giỏ hàng**
4. Điều hướng tới trang Giỏ hàng (`/cart`)

## Expected result

- Sản phẩm Laptop Gaming xuất hiện trong giỏ hàng với đúng Đơn giá và Số lượng = 1.
- Badge số lượng trên Navbar cập nhật = 1.
- Thành tiền của dòng và Tổng cộng hiển thị đúng giá trị.

## Status / Related bugs

Not Run / None
