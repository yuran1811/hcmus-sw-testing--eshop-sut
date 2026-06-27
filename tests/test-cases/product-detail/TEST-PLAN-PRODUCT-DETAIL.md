# Test Plan — Product Detail (FR-06)

## Scope

**In scope:** FR-06 (Xem chi tiết sản phẩm), FR-23 (Breadcrumb), FR-24 (Image alt text), FR-21/SEC-04 (Safe display)
**Out of scope:** FR-05 (Danh sách sản phẩm), FR-07 (Giỏ hàng — kiểm tra phía Cart page)

## Test Environment

| Item          | Value                       |
| ------------- | --------------------------- |
| Backend URL   | http://localhost:3000       |
| Frontend URL  | http://localhost:5173       |
| Admin URL     | http://localhost:5174       |
| Default user  | test@eshop.com / Test1234!  |
| Default admin | admin@eshop.com / Admin123! |

## Techniques

| Technique           | Applicable FRs      | Rationale                                                              |
| ------------------- | ------------------- | ---------------------------------------------------------------------- |
| Domain Testing (EP) | FR-06               | `product_id` (URL param) và `quantity` (form input) có nhiều partition |
| BVA                 | FR-06               | `quantity` có ngưỡng tối thiểu xác định (min = 1)                      |
| GUI / Security      | FR-23, FR-24, FR-21 | Yêu cầu giao diện và bảo mật áp dụng trực tiếp trên trang này          |

## Input Variables

### V1 — product_id (URL parameter)

| Domain  | Partition | Representative Value | Mô tả                        |
| ------- | --------- | -------------------- | ---------------------------- |
| Valid   | EP-ID-1   | `1`                  | ID sản phẩm tồn tại trong DB |
| Invalid | EP-ID-2   | `9999`               | ID không tồn tại trong DB    |
| Invalid | EP-ID-3   | `abc`                | ID không phải số nguyên      |

### V2 — quantity (form field, số lượng thêm vào giỏ)

| Domain  | Partition | Representative Value | Mô tả                                                         |
| ------- | --------- | -------------------- | ------------------------------------------------------------- |
| Valid   | EP-Q-1    | `2`                  | Số nguyên dương >= 1 (IN point — không phải ranh giới)        |
| Invalid | EP-Q-2    | `0`                  | Bằng 0 — cũng là BVA OFF quantity (xem TC-PRODUCT-DETAIL-005) |
| Invalid | EP-Q-3    | `-1`                 | Số âm                                                         |
| Invalid | EP-Q-4    | `1.5`                | Số thập phân                                                  |
| Invalid | EP-Q-5    | `""` (rỗng)          | Ô nhập bỏ trống                                               |
| Invalid | EP-Q-6    | `"abc"`              | Chuỗi ký tự không phải số                                     |

## Test Case Inventory

> NNN là chuỗi số dùng chung cho DT và BVA (DT trước, BVA theo sau).
> TC đánh dấu ★ phục vụ đồng thời như điểm BVA OFF; không tạo TC BVA riêng cho điểm đó.

| ID                    | Technique        | Mô tả                                                                                                            | Status  |
| --------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------- | ------- |
| TC-PRODUCT-DETAIL-001 | Domain Testing   | Product ID hợp lệ → hiển thị đầy đủ: ảnh, tên, giá, mô tả, danh mục                                              | Not Run |
| TC-PRODUCT-DETAIL-002 | Domain Testing   | Product ID không tồn tại (9999) → hiển thị thông báo lỗi phù hợp                                                 | Not Run |
| TC-PRODUCT-DETAIL-003 | Domain Testing   | Product ID không phải số ("abc") → hiển thị lỗi phù hợp                                                          | Not Run |
| TC-PRODUCT-DETAIL-004 | Domain Testing   | Quantity hợp lệ (2) → thêm vào giỏ thành công; hiển thị toast notification và/hoặc badge giỏ hàng cập nhật       | Not Run |
| TC-PRODUCT-DETAIL-005 | Domain Testing   | Quantity = 0 → bị từ chối (không thêm được vào giỏ) ★BVA OFF quantity                                            | Not Run |
| TC-PRODUCT-DETAIL-006 | Domain Testing   | Quantity = số âm (-1) → bị từ chối                                                                               | Not Run |
| TC-PRODUCT-DETAIL-007 | Domain Testing   | Quantity = số thập phân (1.5) → bị từ chối (hệ thống chỉ nhận số nguyên dương theo FR-06)                        | Not Run |
| TC-PRODUCT-DETAIL-008 | Domain Testing   | Quantity = rỗng → bị từ chối khi bấm "Thêm vào giỏ hàng"                                                         | Not Run |
| TC-PRODUCT-DETAIL-009 | Domain Testing   | Quantity = "abc" (chuỗi ký tự không phải số) → bị từ chối                                                        | Not Run |
| TC-PRODUCT-DETAIL-010 | BVA              | Quantity = 1 (ON, đúng min=1) → được chấp nhận; thêm vào giỏ thành công                                          | Not Run |
| TC-PRODUCT-DETAIL-011 | BVA              | Quantity = 2 (IN, vừa trên min) → được chấp nhận                                                                 | Not Run |
| TC-PRODUCT-DETAIL-012 | FR-08 / api spec | Chưa đăng nhập, bấm "Thêm vào giỏ hàng" → bị từ chối (yêu cầu đăng nhập, API trả về 401)                         | Not Run |
| TC-PRODUCT-DETAIL-013 | FR-23 / GUI      | Trang `/products/:id` hiển thị breadcrumb (ví dụ: Trang chủ > Chi tiết sản phẩm)                                 | Not Run |
| TC-PRODUCT-DETAIL-014 | FR-24 / GUI      | Ảnh sản phẩm trên trang chi tiết có thuộc tính `alt` không rỗng                                                  | Not Run |
| TC-PRODUCT-DETAIL-015 | FR-21 / SEC-04   | Tên/mô tả sản phẩm chứa ký tự HTML đặc biệt (<script>, <img>) được hiển thị an toàn (escaped), không render HTML | Not Run |

## Entry / Exit Criteria

**Entry:** Backend chạy tại localhost:3000; ít nhất 1 sản phẩm đã được seed vào DB; người dùng đã đăng nhập với tài khoản mặc định (trừ TC-PRODUCT-DETAIL-012 dùng session chưa đăng nhập).
**Exit:** Tất cả 15 test case đã được thực thi; defect (nếu có) đã được ghi nhận trong issue tracker.
