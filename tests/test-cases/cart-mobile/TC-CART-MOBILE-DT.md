# TC-CART-MOBILE-DT: Domain Testing — Mobile Cart

## Requirement ID

FR-20 (Tính năng Mobile), FR-07 (Giỏ hàng)

## How Domain Testing Was Applied

- Xác định các biến đầu vào cốt lõi: `add_quantity` (số lượng thêm vào giỏ từ chi tiết sản phẩm), `edit_quantity` (số lượng sửa đổi trực tiếp trên ô nhập của giỏ hàng) và `auth_state` (trạng thái đăng nhập khi tiến hành thanh toán).
- Định nghĩa quy tắc miền trị (domain rules) cho từng biến đầu vào.
- Phân chia các phân vùng tương đương (equivalence partitions):
  - `add_quantity`: 1 phân vùng hợp lệ, 5 phân vùng không hợp lệ.
  - `edit_quantity`: 1 phân vùng hợp lệ, 5 phân vùng không hợp lệ.
  - `auth_state`: 1 phân vùng hợp lệ, 1 phân vùng không hợp lệ.
- Lựa chọn các giá trị đại diện cho từng phân vùng.
- Thiết kế 17 test case sử dụng Giả định Đơn lỗi (Single Fault Assumption) để cô lập nguyên nhân gây lỗi khi thực thi.

## Input Domain Analysis

### Variable: add_quantity (số lượng thêm từ chi tiết sản phẩm)

| Partition | Type    | Description               | Representative Value |
| --------- | ------- | ------------------------- | -------------------- |
| EP-AQ-1   | Valid   | Số nguyên dương >= 1      | `2`                  |
| EP-AQ-2   | Invalid | Bằng 0                    | `0`                  |
| EP-AQ-3   | Invalid | Số âm                     | `-1`                 |
| EP-AQ-4   | Invalid | Số thập phân              | `1.5`                |
| EP-AQ-5   | Invalid | Ô nhập bỏ trống           | `""`                 |
| EP-AQ-6   | Invalid | Chuỗi ký tự không phải số | `"abc"`              |

### Variable: edit_quantity (số lượng sửa đổi trực tiếp trong giỏ hàng)

| Partition | Type    | Description               | Representative Value |
| --------- | ------- | ------------------------- | -------------------- |
| EP-EQ-1   | Valid   | Số nguyên dương >= 1      | `2`                  |
| EP-EQ-2   | Invalid | Bằng 0                    | `0`                  |
| EP-EQ-3   | Invalid | Số âm                     | `-1`                 |
| EP-EQ-4   | Invalid | Số thập phân              | `1.5`                |
| EP-EQ-5   | Invalid | Ô nhập bỏ trống           | `""`                 |
| EP-EQ-6   | Invalid | Chuỗi ký tự không phải số | `"abc"`              |

### Variable: auth_state (trạng thái xác thực khi thanh toán)

| Partition | Type    | Description                               | Representative Value     |
| --------- | ------- | ----------------------------------------- | ------------------------ |
| EP-AUTH-1 | Valid   | Người dùng đã đăng nhập (có token JWT)    | Đăng nhập tài khoản test |
| EP-AUTH-2 | Invalid | Khách chưa đăng nhập (không có token JWT) | Không đăng nhập (Guest)  |

## Test Cases Summary

| TC ID              | Description                                                        | Partition Exercised        | Expected                                                    |
| ------------------ | ------------------------------------------------------------------ | -------------------------- | ----------------------------------------------------------- |
| TC-CART-MOBILE-001 | Thêm sản phẩm từ Home screen (mặc định = 1)                        | EP-AQ-1 (mặc định)         | Thêm thành công số lượng 1                                  |
| TC-CART-MOBILE-002 | Thêm sản phẩm từ trang chi tiết với số lượng hợp lệ (2)            | EP-AQ-1                    | Thêm thành công số lượng 2                                  |
| TC-CART-MOBILE-003 | Thêm sản phẩm từ trang chi tiết với số lượng = 0                   | EP-AQ-2                    | Tự chuẩn hóa về số lượng 1                                  |
| TC-CART-MOBILE-004 | Thêm sản phẩm từ trang chi tiết với số lượng âm (-1)               | EP-AQ-3                    | Tự chuẩn hóa về số lượng 1                                  |
| TC-CART-MOBILE-005 | Thêm sản phẩm từ trang chi tiết với số lượng thập phân (1.5)       | EP-AQ-4                    | Tự chuẩn hóa về số lượng 1                                  |
| TC-CART-MOBILE-006 | Thêm sản phẩm từ trang chi tiết với số lượng rỗng ("")             | EP-AQ-5                    | Tự chuẩn hóa về số lượng 1                                  |
| TC-CART-MOBILE-007 | Thêm sản phẩm từ trang chi tiết với số lượng không phải số ("abc") | EP-AQ-6                    | Tự chuẩn hóa về số lượng 1                                  |
| TC-CART-MOBILE-008 | Sửa số lượng trong giỏ thành số hợp lệ (2)                         | EP-EQ-1                    | Tăng lên thành 3 (Do bug `parsed + 1`)                      |
| TC-CART-MOBILE-009 | Sửa số lượng trong giỏ thành 0                                     | EP-EQ-2                    | Tự chuẩn hóa về số lượng 1                                  |
| TC-CART-MOBILE-010 | Sửa số lượng trong giỏ thành số âm (-1)                            | EP-EQ-3                    | Tự chuẩn hóa về số lượng 1                                  |
| TC-CART-MOBILE-011 | Sửa số lượng trong giỏ thành số thập phân (1.5)                    | EP-EQ-4                    | Tự chuẩn hóa về số lượng 2 (parsed = 1 + 1 = 2)             |
| TC-CART-MOBILE-012 | Sửa số lượng trong giỏ thành rỗng ("")                             | EP-EQ-5                    | Tự chuẩn hóa về số lượng 1                                  |
| TC-CART-MOBILE-013 | Sửa số lượng trong giỏ thành không phải số ("abc")                 | EP-EQ-6                    | Tự chuẩn hóa về số lượng 1                                  |
| TC-CART-MOBILE-014 | Xóa sản phẩm khỏi giỏ hàng                                         | Thao tác click "Xóa"       | Bị xóa ngay lập tức mà không hiển thị Dialog xác nhận (Bug) |
| TC-CART-MOBILE-015 | Bấm "Tiếp tục mua sắm" hoặc "← Mua tiếp"                           | Thao tác click link/button | Quay về màn hình Home                                       |
| TC-CART-MOBILE-016 | Chưa đăng nhập bấm "Tiến hành thanh toán"                          | EP-AUTH-2                  | Hiển thị Alert thông báo, chuyển sang trang Đăng nhập       |
| TC-CART-MOBILE-017 | Đã đăng nhập bấm "Tiến hành thanh toán"                            | EP-AUTH-1                  | Chuyển sang trang Xác Nhận Đơn Hàng (Checkout)              |
