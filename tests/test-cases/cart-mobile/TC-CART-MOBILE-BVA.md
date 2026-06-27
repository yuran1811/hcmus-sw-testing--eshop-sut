# TC-CART-MOBILE-BVA: Boundary Value Analysis — Mobile Cart

## Requirement ID

FR-20 (Tính năng Mobile), FR-07 (Giỏ hàng)

## How BVA Was Applied

- Xác định các biến biên:
  - `add_quantity` (số lượng thêm vào giỏ từ chi tiết sản phẩm) có ràng buộc tối thiểu (quantity >= 1).
  - `edit_quantity` (số lượng sửa đổi trực tiếp trên giỏ hàng) có ràng buộc tối thiểu (quantity >= 1).
- Áp dụng phân tích giá trị biên 3 giá trị (3-value BVA) quanh giới hạn tối thiểu (min = 1, step size = 1).
- Tạo các điểm kiểm thử: OFF (0), ON (1), và IN (2).
- Khớp các điểm này vào danh sách test case (OFF được kiểm thử đồng thời tại các case DT tương ứng là TC-CART-MOBILE-003 và TC-CART-MOBILE-009).

## Boundary Analysis

### Boundary B1: add_quantity — Ràng buộc số lượng thêm tối thiểu (>= 1)

| Attribute      | Value          |
| -------------- | -------------- |
| Variable       | add_quantity   |
| Boundary type  | closed minimum |
| Boundary value | 1              |
| Step size      | 1              |

| Test Point  | Test Value | Expected                       |
| ----------- | ---------- | ------------------------------ |
| OFF (min−1) | 0          | Bị từ chối / Tự chuẩn hóa về 1 |
| ON (min)    | 1          | Chấp nhận (số lượng thêm = 1)  |
| IN (min+1)  | 2          | Chấp nhận (số lượng thêm = 2)  |

### Boundary B2: edit_quantity — Ràng buộc số lượng sửa đổi tối thiểu (>= 1)

| Attribute      | Value          |
| -------------- | -------------- |
| Variable       | edit_quantity  |
| Boundary type  | closed minimum |
| Boundary value | 1              |
| Step size      | 1              |

| Test Point  | Test Value | Expected                                                  |
| ----------- | ---------- | --------------------------------------------------------- |
| OFF (min−1) | 0          | Bị từ chối / Tự chuẩn hóa về 1                            |
| ON (min)    | 1          | Chấp nhận (cập nhật thành số lượng 2 do bug `parsed + 1`) |
| IN (min+1)  | 2          | Chấp nhận (cập nhật thành số lượng 3 do bug `parsed + 1`) |

## Test Cases Summary

| TC ID              | Description                                      | Boundary | Point | Expected                            |
| ------------------ | ------------------------------------------------ | -------- | ----- | ----------------------------------- |
| TC-CART-MOBILE-003 | Thêm sản phẩm từ trang chi tiết với số lượng = 0 | B1       | OFF   | Tự chuẩn hóa về 1                   |
| TC-CART-MOBILE-018 | Thêm sản phẩm từ trang chi tiết với số lượng = 1 | B1       | ON    | Thêm thành công số lượng 1          |
| TC-CART-MOBILE-019 | Thêm sản phẩm từ trang chi tiết với số lượng = 2 | B1       | IN    | Thêm thành công số lượng 2          |
| TC-CART-MOBILE-009 | Sửa số lượng trong giỏ thành 0                   | B2       | OFF   | Tự chuẩn hóa về 1                   |
| TC-CART-MOBILE-020 | Sửa số lượng trong giỏ thành 1                   | B2       | ON    | Cập nhật thành 2 (Bug `parsed + 1`) |
| TC-CART-MOBILE-021 | Sửa số lượng trong giỏ thành 2                   | B2       | IN    | Cập nhật thành 3 (Bug `parsed + 1`) |
