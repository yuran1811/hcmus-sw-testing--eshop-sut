# Test Plan — Quản lý Mã Giảm Giá Admin (FR-17)

## Scope

**In scope:** FR-17 (Admin Thêm / Xem / Xóa mã giảm giá), FR-12 (kiểm soát truy cập — áp dụng cho các endpoint `/api/admin/coupons`)
**Out of scope:** FR-09 (người dùng áp dụng mã giảm giá tại Checkout)

## Test Environment

| Item          | Value                       |
| ------------- | --------------------------- |
| Backend URL   | http://localhost:3000       |
| Frontend URL  | http://localhost:5173       |
| Admin URL     | http://localhost:5174       |
| Default user  | test@eshop.com / Test1234!  |
| Default admin | admin@eshop.com / Admin123! |

## Techniques

| Technique           | Applicable FRs | Rationale                                                                                   |
| ------------------- | -------------- | ------------------------------------------------------------------------------------------- |
| Domain Testing (EP) | FR-17, FR-12   | Mỗi field nhập liệu đều có quy tắc hợp lệ/không hợp lệ; role và auth là partition bắt buộc  |
| BVA                 | FR-17          | `discount_value` (>0), `min_order_amount` (≥0) và `max_uses_per_user` (≥1) có ngưỡng số học |

## Input Variables

### V1 — code (mã giảm giá)

| Domain  | Partition | Representative Value | Mô tả                        |
| ------- | --------- | -------------------- | ---------------------------- |
| Valid   | EP-CODE-1 | `"SUMMER25"`         | Chuỗi duy nhất, không rỗng   |
| Invalid | EP-CODE-2 | `""`                 | Rỗng                         |
| Invalid | EP-CODE-3 | `"SAVE10"` (đã có)   | Trùng mã đã tồn tại trong DB |

### V2 — type (loại giảm giá)

| Domain  | Partition | Representative Value | Mô tả                              |
| ------- | --------- | -------------------- | ---------------------------------- |
| Valid   | EP-TYPE-1 | `"percent"`          | Giảm theo phần trăm                |
| Valid   | EP-TYPE-2 | `"fixed"`            | Giảm theo số tiền cố định          |
| Invalid | EP-TYPE-3 | `"voucher"`          | Giá trị ngoài tập {percent, fixed} |

### V3 — discount_value (giá trị giảm)

| Domain  | Partition | Representative Value | Mô tả                                                             |
| ------- | --------- | -------------------- | ----------------------------------------------------------------- |
| Valid   | EP-DV-1   | `15`                 | Số dương                                                          |
| Invalid | EP-DV-2   | `0`                  | Bằng 0 — cũng là BVA OFF discount_value (xem TC-COUPON-ADMIN-006) |
| Invalid | EP-DV-3   | `-10`                | Số âm                                                             |

### V4 — expired_at (ngày hết hạn)

| Domain  | Partition | Representative Value | Mô tả                       |
| ------- | --------- | -------------------- | --------------------------- |
| Valid   | EP-EXP-1  | `"2099-12-31"`       | Ngày tương lai hợp lệ       |
| Invalid | EP-EXP-2  | `""` (rỗng)          | Thiếu trường bắt buộc       |
| Invalid | EP-EXP-3  | `"31-12-2099"`       | Định dạng ngày không hợp lệ |

### V5 — min_order_amount (ngưỡng đơn hàng tối thiểu)

| Domain  | Partition | Representative Value | Mô tả                                                              |
| ------- | --------- | -------------------- | ------------------------------------------------------------------ |
| Valid   | EP-MOA-1  | `0`                  | Bằng 0 (hợp lệ) — cũng là BVA ON min_order_amount                  |
| Valid   | EP-MOA-2  | `200000`             | Số dương                                                           |
| Invalid | EP-MOA-3  | `-1`                 | Số âm — cũng là BVA OFF min_order_amount (xem TC-COUPON-ADMIN-010) |

### V6 — max_uses_per_user (số lần dùng tối đa mỗi người)

| Domain  | Partition | Representative Value | Mô tả                                                                |
| ------- | --------- | -------------------- | -------------------------------------------------------------------- |
| Valid   | EP-MPU-1  | `1`                  | Đúng ngưỡng tối thiểu (min=1) — cũng là BVA ON max_uses_per_user     |
| Valid   | EP-MPU-2  | `5`                  | Số nguyên dương > 1                                                  |
| Invalid | EP-MPU-3  | `0`                  | Bằng 0 — cũng là BVA OFF max_uses_per_user (xem TC-COUPON-ADMIN-011) |
| Invalid | EP-MPU-4  | `-1`                 | Số âm                                                                |

### V7 — trạng thái xác thực / phân quyền

| Domain  | Partition | Mô tả                                    |
| ------- | --------- | ---------------------------------------- |
| Valid   | EP-ROLE-1 | JWT hợp lệ, role = admin                 |
| Invalid | EP-ROLE-2 | Không có JWT (chưa đăng nhập)            |
| Invalid | EP-ROLE-3 | JWT hợp lệ nhưng role = user (non-admin) |

## Test Case Inventory

> NNN là chuỗi số dùng chung cho DT và BVA (DT trước, BVA theo sau).
> TC đánh dấu ★ phục vụ đồng thời như điểm BVA OFF; không tạo TC BVA riêng cho điểm đó.

| ID                  | Technique      | Mô tả                                                                                                       | Status  |
| ------------------- | -------------- | ----------------------------------------------------------------------------------------------------------- | ------- |
| TC-COUPON-ADMIN-001 | Domain Testing | Tất cả trường hợp lệ (percent type) → coupon được tạo thành công                                            | Not Run |
| TC-COUPON-ADMIN-002 | Domain Testing | Tất cả trường hợp lệ (fixed type) → coupon được tạo thành công                                              | Not Run |
| TC-COUPON-ADMIN-003 | Domain Testing | code = rỗng → bị từ chối, thông báo lỗi rõ ràng                                                             | Not Run |
| TC-COUPON-ADMIN-004 | Domain Testing | code trùng với mã đã tồn tại → bị từ chối (unique constraint)                                               | Not Run |
| TC-COUPON-ADMIN-005 | Domain Testing | type = giá trị không hợp lệ ("voucher") → bị từ chối                                                        | Not Run |
| TC-COUPON-ADMIN-006 | Domain Testing | discount_value = 0 → bị từ chối ★BVA OFF discount_value                                                     | Not Run |
| TC-COUPON-ADMIN-007 | Domain Testing | discount_value = số âm → bị từ chối                                                                         | Not Run |
| TC-COUPON-ADMIN-008 | Domain Testing | expired_at = rỗng → bị từ chối                                                                              | Not Run |
| TC-COUPON-ADMIN-009 | Domain Testing | expired_at = định dạng ngày không hợp lệ ("31-12-2099") → bị từ chối                                        | Not Run |
| TC-COUPON-ADMIN-010 | Domain Testing | min_order_amount = số âm (-1) → bị từ chối ★BVA OFF min_order_amount                                        | Not Run |
| TC-COUPON-ADMIN-011 | Domain Testing | max_uses_per_user = 0 → bị từ chối ★BVA OFF max_uses_per_user                                               | Not Run |
| TC-COUPON-ADMIN-012 | Domain Testing | max_uses_per_user = số âm → bị từ chối                                                                      | Not Run |
| TC-COUPON-ADMIN-013 | Domain Testing | Xóa coupon theo ID hợp lệ → xóa thành công                                                                  | Not Run |
| TC-COUPON-ADMIN-014 | Domain Testing | Xóa coupon theo ID không tồn tại → trả về lỗi (status 4xx)                                                  | Not Run |
| TC-COUPON-ADMIN-015 | Domain Testing | Admin lấy danh sách coupon (`GET /api/coupons`) → trả về đầy đủ các trường (kể cả mã mẫu)                   | Not Run |
| TC-COUPON-ADMIN-016 | Domain Testing | Chưa đăng nhập (không có JWT) → 401 Unauthorized                                                            | Not Run |
| TC-COUPON-ADMIN-017 | Domain Testing | Đăng nhập với role = user (non-admin) → 403 Forbidden                                                       | Not Run |
| TC-COUPON-ADMIN-018 | BVA            | discount_value = 1 (ON, đúng min > 0) → được chấp nhận                                                      | Not Run |
| TC-COUPON-ADMIN-019 | BVA            | discount_value = 2 (IN, vừa trên min) → được chấp nhận                                                      | Not Run |
| TC-COUPON-ADMIN-020 | BVA            | min_order_amount = 0 (ON, đúng min ≥ 0) → được chấp nhận                                                    | Not Run |
| TC-COUPON-ADMIN-021 | BVA            | min_order_amount = 1 (IN, vừa trên min) → được chấp nhận                                                    | Not Run |
| TC-COUPON-ADMIN-022 | BVA            | max_uses_per_user = 1 (ON, đúng min ≥ 1) → được chấp nhận                                                   | Not Run |
| TC-COUPON-ADMIN-023 | BVA            | max_uses_per_user = 2 (IN, vừa trên min) → được chấp nhận                                                   | Not Run |
| TC-COUPON-ADMIN-024 | Domain Testing | expired_at = ngày trong quá khứ (vd: "2020-01-01") → hành vi cần xác minh (thăm dò: chấp nhận hay từ chối?) | Not Run |
| TC-COUPON-ADMIN-025 | Domain Testing | Thiếu hoàn toàn trường bắt buộc trong body (field key không có mặt, không phải rỗng) → bị từ chối           | Not Run |
| TC-COUPON-ADMIN-026 | Domain Testing | Xử lý an toàn chuỗi nhập vào khi hiển thị mã coupon (chống XSS)                                             | Not Run |

## Entry / Exit Criteria

**Entry:** Backend chạy tại localhost:3000; tài khoản admin đã sẵn sàng; ít nhất 1 mã giảm giá mẫu (SAVE10) đã được seed.
**Exit:** Tất cả 26 test case đã được thực thi; defect (nếu có) đã được ghi nhận trong issue tracker.
