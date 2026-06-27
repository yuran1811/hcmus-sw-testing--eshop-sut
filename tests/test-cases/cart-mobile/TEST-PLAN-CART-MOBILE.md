# Test Plan — Mobile Cart (FR-20)

## Scope

**In scope:** FR-20 (Tính năng Mobile — Giỏ hàng), FR-07 (Giỏ hàng — logic thêm/xóa/sửa), FR-21 (Giao diện chung), FR-23 (Badge số lượng/Navbar), FR-24 (GUI feedback/Empty State).
**Out of scope:** FR-05 (Danh sách & Tìm kiếm sản phẩm), FR-08 (Thanh toán & Đặt hàng đầy đủ), FR-06 (Xem chi tiết sản phẩm — kiểm tra phía Product Detail page).

## Test Environment

| Item          | Value                       |
| ------------- | --------------------------- |
| Backend URL   | http://localhost:3000       |
| Mobile App    | LAN IP (Expo Client)        |
| Default user  | test@eshop.com / Test1234!  |
| Default admin | admin@eshop.com / Admin123! |

## Techniques

| Technique           | Applicable FRs      | Rationale                                                                      |
| ------------------- | ------------------- | ------------------------------------------------------------------------------ |
| Domain Testing (EP) | FR-20, FR-07        | `quantity` (thêm vào giỏ & chỉnh sửa trong giỏ), `auth_state` có các partition |
| BVA                 | FR-20, FR-07        | `quantity` có giới hạn tối thiểu (min = 1)                                     |
| GUI / Navigation    | FR-21, FR-23, FR-24 | Các yêu cầu giao diện (tiền tệ, màu sắc, badge, empty state) áp dụng cho Cart  |

## Input Variables

### V1 — add_quantity (số lượng thêm vào giỏ từ chi tiết sản phẩm)

| Domain  | Partition | Representative Value | Mô tả                                                          |
| ------- | --------- | -------------------- | -------------------------------------------------------------- |
| Valid   | EP-AQ-1   | `2`                  | Số nguyên dương >= 1 (IN point, không phải ranh giới)          |
| Invalid | EP-AQ-2   | `0`                  | Bằng 0 — cũng là BVA OFF add_quantity (xem TC-CART-MOBILE-003) |
| Invalid | EP-AQ-3   | `-1`                 | Số âm                                                          |
| Invalid | EP-AQ-4   | `1.5`                | Số thập phân                                                   |
| Invalid | EP-AQ-5   | `""` (rỗng)          | Ô nhập bỏ trống                                                |
| Invalid | EP-AQ-6   | `"abc"`              | Chuỗi ký tự không phải số                                      |

### V2 — edit_quantity (số lượng sửa đổi trực tiếp trong giỏ hàng)

| Domain  | Partition | Representative Value | Mô tả                                                           |
| ------- | --------- | -------------------- | --------------------------------------------------------------- |
| Valid   | EP-EQ-1   | `2`                  | Số nguyên dương >= 1 (IN point, không phải ranh giới)           |
| Invalid | EP-EQ-2   | `0`                  | Bằng 0 — cũng là BVA OFF edit_quantity (xem TC-CART-MOBILE-009) |
| Invalid | EP-EQ-3   | `-1`                 | Số âm                                                           |
| Invalid | EP-EQ-4   | `1.5`                | Số thập phân                                                    |
| Invalid | EP-EQ-5   | `""` (rỗng)          | Ô nhập bỏ trống                                                 |
| Invalid | EP-EQ-6   | `"abc"`              | Chuỗi ký tự không phải số                                       |

### V3 — auth_state (trạng thái đăng nhập khi tiến hành thanh toán)

| Domain  | Partition | Mô tả                                         |
| ------- | --------- | --------------------------------------------- |
| Valid   | EP-AUTH-1 | Người dùng đã đăng nhập (có token JWT hợp lệ) |
| Invalid | EP-AUTH-2 | Khách chưa đăng nhập (không có token JWT)     |

## Test Case Inventory

> NNN là chuỗi số dùng chung cho DT và BVA (DT trước, BVA theo sau).
> TC đánh dấu ★ phục vụ đồng thời như điểm BVA OFF; không tạo TC BVA riêng cho điểm đó.

| ID                 | Technique      | Mô tả                                                                                                   | Status  |
| ------------------ | -------------- | ------------------------------------------------------------------------------------------------------- | ------- |
| TC-CART-MOBILE-001 | Domain Testing | Thêm sản phẩm từ Home screen (số lượng mặc định = 1) -> giỏ hàng tăng 1, Alert thông báo thành công     | Not Run |
| TC-CART-MOBILE-002 | Domain Testing | Thêm sản phẩm từ trang chi tiết với số lượng hợp lệ (2) -> giỏ hàng tăng 2                              | Not Run |
| TC-CART-MOBILE-003 | Domain Testing | Thêm sản phẩm từ trang chi tiết với số lượng = 0 ★BVA OFF add_quantity -> tự chuẩn hóa về 1             | Not Run |
| TC-CART-MOBILE-004 | Domain Testing | Thêm sản phẩm từ trang chi tiết với số lượng âm (-1) -> tự chuẩn hóa về 1                               | Not Run |
| TC-CART-MOBILE-005 | Domain Testing | Thêm sản phẩm từ trang chi tiết với số lượng thập phân (1.5) -> tự chuẩn hóa về 1                       | Not Run |
| TC-CART-MOBILE-006 | Domain Testing | Thêm sản phẩm từ trang chi tiết với số lượng rỗng ("") -> tự chuẩn hóa về 1                             | Not Run |
| TC-CART-MOBILE-007 | Domain Testing | Thêm sản phẩm từ trang chi tiết với số lượng không phải số ("abc") -> tự chuẩn hóa về 1                 | Not Run |
| TC-CART-MOBILE-008 | Domain Testing | Sửa số lượng trong giỏ thành số hợp lệ (2) -> tăng lên 3 (Do bug `parsed + 1`)                          | Not Run |
| TC-CART-MOBILE-009 | Domain Testing | Sửa số lượng trong giỏ thành 0 ★BVA OFF edit_quantity -> tự chuẩn hóa về 1                              | Not Run |
| TC-CART-MOBILE-010 | Domain Testing | Sửa số lượng trong giỏ thành số âm (-1) -> tự chuẩn hóa về 1                                            | Not Run |
| TC-CART-MOBILE-011 | Domain Testing | Sửa số lượng trong giỏ thành số thập phân (1.5) -> tự chuẩn hóa về 2 (parsed = 1 + 1 = 2)               | Not Run |
| TC-CART-MOBILE-012 | Domain Testing | Sửa số lượng trong giỏ thành rỗng ("") -> tự chuẩn hóa về 1                                             | Not Run |
| TC-CART-MOBILE-013 | Domain Testing | Sửa số lượng trong giỏ thành không phải số ("abc") -> tự chuẩn hóa về 1                                 | Not Run |
| TC-CART-MOBILE-014 | Domain Testing | Xóa sản phẩm khỏi giỏ hàng -> bị xóa ngay lập tức không có Dialog xác nhận (Bug)                        | Not Run |
| TC-CART-MOBILE-015 | Domain Testing | Bấm "Tiếp tục mua sắm" hoặc "← Mua tiếp" -> quay lại màn hình Home                                      | Not Run |
| TC-CART-MOBILE-016 | Domain Testing | Chưa đăng nhập bấm "Tiến hành thanh toán" -> hiển thị thông báo yêu cầu đăng nhập, chuyển tới Đăng nhập | Not Run |
| TC-CART-MOBILE-017 | Domain Testing | Đã đăng nhập bấm "Tiến hành thanh toán" -> chuyển hướng đến Checkout page thành công                    | Not Run |
| TC-CART-MOBILE-018 | BVA            | Thêm sản phẩm từ trang chi tiết với số lượng = 1 (ON của B1) -> thêm thành công số lượng 1              | Not Run |
| TC-CART-MOBILE-019 | BVA            | Thêm sản phẩm từ trang chi tiết với số lượng = 2 (IN của B1) -> thêm thành công số lượng 2              | Not Run |
| TC-CART-MOBILE-020 | BVA            | Sửa số lượng trong giỏ thành 1 (ON của B2) -> cập nhật thành 2 (Bug `parsed + 1`)                       | Not Run |
| TC-CART-MOBILE-021 | BVA            | Sửa số lượng trong giỏ thành 2 (IN của B2) -> cập nhật thành 3 (Bug `parsed + 1`)                       | Not Run |
| TC-CART-MOBILE-022 | GUI            | Kiểm tra định dạng hiển thị tiền tệ, nhãn "Tổng tạm tính" thay vì "Tổng cộng" (Vi phạm FR-07)           | Not Run |
| TC-CART-MOBILE-023 | GUI            | Kiểm tra badge số lượng sản phẩm hiển thị trên Navbar (Hiển thị `cart.length` - vi phạm FR-23)          | Not Run |
| TC-CART-MOBILE-024 | GUI            | Kiểm tra empty state giỏ hàng trống (Không có icon/hình minh họa - vi phạm FR-07/FR-24)                 | Not Run |

## Entry / Exit Criteria

**Entry:** Backend chạy tại localhost:3000; ít nhất 1 sản phẩm đã được seed vào DB; Expo Client kết nối thành công với Expo Metro Bundler.
**Exit:** Tất cả 24 test case đã được thực thi; các lỗi phát hiện (nhất là các lỗi do logic `parsed + 1`, thiếu Dialog xác nhận xóa, sai nhãn hiển thị, sai badge navbar, thiếu icon empty state) đã được báo cáo.
