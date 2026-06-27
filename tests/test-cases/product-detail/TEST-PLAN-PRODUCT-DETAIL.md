# Test Plan — Product Detail (FR-06)

## Scope

**In scope:** FR-06 (Xem chi tiết sản phẩm)
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

| Technique           | Applicable FRs | Rationale                                                              |
| ------------------- | -------------- | ---------------------------------------------------------------------- |
| Domain Testing (EP) | FR-06          | `product_id` (URL param) và `quantity` (form input) có nhiều partition |
| BVA                 | FR-06          | `quantity` có ngưỡng tối thiểu xác định (min = 1)                      |

## Input Variables

### V1 — product_id (URL parameter)

| Domain  | Partition | Representative Value | Mô tả                        |
| ------- | --------- | -------------------- | ---------------------------- |
| Valid   | EP-ID-1   | `1`                  | ID sản phẩm tồn tại trong DB |
| Invalid | EP-ID-2   | `9999`               | ID không tồn tại trong DB    |
| Invalid | EP-ID-3   | `abc`                | ID không phải số nguyên      |

### V2 — quantity (form field, số lượng thêm vào giỏ)

| Domain  | Partition | Representative Value | Mô tả                          |
| ------- | --------- | -------------------- | ------------------------------ |
| Valid   | EP-Q-1    | `2`                  | Số nguyên dương > 1            |
| Invalid | EP-Q-2    | `0`                  | Bằng 0 (dưới ngưỡng tối thiểu) |
| Invalid | EP-Q-3    | `-1`                 | Số âm                          |
| Invalid | EP-Q-4    | `1.5`                | Số thập phân                   |
| Invalid | EP-Q-5    | `""` (rỗng)          | Ô nhập bỏ trống                |
| Invalid | EP-Q-6    | `"abc"`              | Chuỗi ký tự không phải số      |

## Test Case Inventory

> NNN là chuỗi số dùng chung cho DT và BVA (DT trước, BVA theo sau).

| ID                    | Technique      | Mô tả                                                         | Status  |
| --------------------- | -------------- | ------------------------------------------------------------- | ------- |
| TC-PRODUCT-DETAIL-001 | Domain Testing | Product ID hợp lệ → hiển thị đầy đủ: ảnh, tên, giá, mô tả, DM | Not Run |
| TC-PRODUCT-DETAIL-002 | Domain Testing | Product ID không tồn tại → hiển thị thông báo lỗi             | Not Run |
| TC-PRODUCT-DETAIL-003 | Domain Testing | Product ID không phải số (chuỗi ký tự) → hiển thị lỗi         | Not Run |
| TC-PRODUCT-DETAIL-004 | Domain Testing | Quantity hợp lệ (>1) → thêm vào giỏ, có phản hồi trực quan    | Not Run |
| TC-PRODUCT-DETAIL-005 | Domain Testing | Quantity = 0 → bị từ chối (không thêm được vào giỏ)           | Not Run |
| TC-PRODUCT-DETAIL-006 | Domain Testing | Quantity = số âm → bị từ chối                                 | Not Run |
| TC-PRODUCT-DETAIL-007 | Domain Testing | Quantity = số thập phân (1.5) → bị từ chối hoặc bị làm tròn   | Not Run |
| TC-PRODUCT-DETAIL-008 | Domain Testing | Quantity = rỗng → bị từ chối khi bấm "Thêm vào giỏ hàng"      | Not Run |
| TC-PRODUCT-DETAIL-009 | BVA            | Quantity = 0 (OFF, dưới min=1) → bị từ chối                   | Not Run |
| TC-PRODUCT-DETAIL-010 | BVA            | Quantity = 1 (ON, đúng min) → được chấp nhận                  | Not Run |
| TC-PRODUCT-DETAIL-011 | BVA            | Quantity = 2 (IN, vừa trên min) → được chấp nhận              | Not Run |

## Entry / Exit Criteria

**Entry:** Backend chạy tại localhost:3000; ít nhất 1 sản phẩm đã được seed vào DB; người dùng đã đăng nhập với tài khoản mặc định.
**Exit:** Tất cả 11 test case đã được thực thi; defect (nếu có) đã được ghi nhận trong issue tracker.
