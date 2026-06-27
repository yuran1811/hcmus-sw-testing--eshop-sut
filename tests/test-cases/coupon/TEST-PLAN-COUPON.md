# Test Plan — Mã Giảm Giá / Apply Coupon (FR-09)

## Scope

**In scope:** FR-09 (Áp dụng mã giảm giá tại bước Checkout)
**Out of scope:** FR-17 (Admin CRUD mã giảm giá), FR-08 (luồng Checkout đầy đủ)

## Test Environment

| Item          | Value                       |
| ------------- | --------------------------- |
| Backend URL   | http://localhost:3000       |
| Frontend URL  | http://localhost:5173       |
| Admin URL     | http://localhost:5174       |
| Default user  | test@eshop.com / Test1234!  |
| Default admin | admin@eshop.com / Admin123! |

## Mã giảm giá mẫu (seed data)

| Mã         | Loại    | Giá trị   | Ngưỡng tối thiểu | Hạn dùng   | Số lần/người |
| ---------- | ------- | --------- | ---------------- | ---------- | ------------ |
| `SAVE10`   | percent | 10%       | 300,000 ₫        | 2099-12-31 | 1            |
| `BIGBUY`   | fixed   | 50,000 ₫  | 500,000 ₫        | 2099-12-31 | 1            |
| `VIP100`   | fixed   | 100,000 ₫ | 300,000 ₫        | 2099-12-31 | 2            |
| `EXPIRED`  | percent | 20%       | 100,000 ₫        | 2020-01-01 | 1            |
| `INACTIVE` | percent | 5%        | 100,000 ₫        | 2099-12-31 | 1            |

> **Ghi chú seed `INACTIVE`:** Tạo bằng `POST /api/admin/coupons` (code="INACTIVE", type="percent", discount_value=5, min_order_amount=100000, expired_at="2099-12-31", max_uses_per_user=1) rồi cập nhật `is_active = 0` trực tiếp trong DB hoặc qua admin panel nếu có.

## Lưu ý về xác thực (Authentication Note)

Endpoint `POST /api/apply-coupon` theo api_specification.md (5.1) truyền `user_id` trong body JSON thay vì `Authorization: Bearer` header (khác với các endpoint có bảo mật khác). TC-COUPON-008 kiểm tra bằng cách bỏ qua `user_id` hoặc truyền giá trị không hợp lệ. Cần đối chiếu lại cơ chế xác thực thực tế khi thực thi test.

## Techniques

| Technique           | Applicable FRs | Rationale                                                                                             |
| ------------------- | -------------- | ----------------------------------------------------------------------------------------------------- |
| Domain Testing (EP) | FR-09          | 5 điều kiện độc lập (C1–C5) × 2 loại coupon (percent/fixed) → nhiều partition                         |
| BVA                 | FR-09          | `total_amount` vs `min_order_amount` có ngưỡng rõ ràng; `usage_count` có giới hạn `max_uses_per_user` |

## Input Variables

### V1 — code (mã giảm giá nhập vào)

| Domain  | Partition | Representative Value | Điều kiện liên quan                      |
| ------- | --------- | -------------------- | ---------------------------------------- |
| Valid   | EP-CODE-1 | `SAVE10`             | C1: tồn tại, is_active=1                 |
| Invalid | EP-CODE-2 | `NOTEXIST`           | C1: không tồn tại trong DB               |
| Invalid | EP-CODE-3 | `INACTIVE`           | C1: is_active=0 (xem ghi chú seed data)  |
| Invalid | EP-CODE-4 | `EXPIRED`            | C2: đã hết hạn (expired_at = 2020-01-01) |

### V2 — total_amount (tổng đơn hàng)

| Domain  | Partition  | Representative Value | Điều kiện liên quan                                                 |
| ------- | ---------- | -------------------- | ------------------------------------------------------------------- |
| Valid   | EP-TOTAL-1 | `400,000`            | C3: trên ngưỡng SAVE10 (IN point, không phải ranh giới)             |
| Valid   | EP-TOTAL-2 | `500,000`            | C3: đúng ngưỡng BIGBUY — cũng là BVA ON BIGBUY (xem TC-COUPON-002)  |
| Invalid | EP-TOTAL-3 | `299,999`            | C3: dưới ngưỡng SAVE10 — cũng là BVA OFF SAVE10 (xem TC-COUPON-006) |
| Invalid | EP-TOTAL-4 | `0`                  | C3: bằng 0                                                          |

### V3 — trạng thái xác thực (C4)

| Domain  | Partition | Mô tả                              |
| ------- | --------- | ---------------------------------- |
| Valid   | EP-AUTH-1 | Có JWT Token hợp lệ (đã đăng nhập) |
| Invalid | EP-AUTH-2 | Không có token (chưa đăng nhập)    |

### V4 — số lần đã dùng mã (C5)

| Domain  | Partition  | Representative Value  | Mô tả                                                                      |
| ------- | ---------- | --------------------- | -------------------------------------------------------------------------- |
| Valid   | EP-USAGE-1 | 0 (chưa dùng lần nào) | C5: dưới giới hạn max_uses_per_user=1                                      |
| Invalid | EP-USAGE-2 | 1 (đã dùng đủ lượt)   | C5: đã đạt max_uses_per_user=1 — cũng là BVA OFF usage (xem TC-COUPON-009) |

### V5 — loại mã giảm giá (discount_type)

| Domain | Partition | Representative Value | Công thức                        |
| ------ | --------- | -------------------- | -------------------------------- |
| Valid  | EP-TYPE-1 | `percent`            | discount = total × value / 100   |
| Valid  | EP-TYPE-2 | `fixed`              | discount = discount_value (flat) |

## Test Case Inventory

> NNN là chuỗi số dùng chung cho DT và BVA (DT trước, BVA theo sau).
> TC đánh dấu ★ phục vụ đồng thời như điểm BVA OFF; không tạo TC BVA riêng cho điểm đó.

| ID            | Technique      | Mô tả                                                                                                  | Status  |
| ------------- | -------------- | ------------------------------------------------------------------------------------------------------ | ------- |
| TC-COUPON-001 | Domain Testing | Tất cả điều kiện hợp lệ, SAVE10 (percent), total=400,000 → discount=40,000, final=360,000              | Not Run |
| TC-COUPON-002 | Domain Testing | Tất cả điều kiện hợp lệ, BIGBUY (fixed), total=500,000 → discount=50,000, final=450,000 ★BVA ON BIGBUY | Not Run |
| TC-COUPON-003 | Domain Testing | Mã không tồn tại trong DB → trả về lỗi phù hợp                                                         | Not Run |
| TC-COUPON-004 | Domain Testing | Mã bị vô hiệu hóa (INACTIVE, is_active=0) → trả về lỗi                                                 | Not Run |
| TC-COUPON-005 | Domain Testing | Mã đã hết hạn (EXPIRED, expired_at=2020-01-01) → trả về lỗi                                            | Not Run |
| TC-COUPON-006 | Domain Testing | SAVE10, total_amount=299,999 < min_order_amount (300,000) → bị từ chối ★BVA OFF SAVE10                 | Not Run |
| TC-COUPON-007 | Domain Testing | SAVE10, total_amount=0 → bị từ chối                                                                    | Not Run |
| TC-COUPON-008 | Domain Testing | Chưa đăng nhập (không truyền user_id / JWT không hợp lệ) → trả về lỗi xác thực                         | Not Run |
| TC-COUPON-009 | Domain Testing | SAVE10 dùng lần thứ 2 (usage=1=max_uses_per_user) → bị từ chối ★BVA OFF usage                          | Not Run |
| TC-COUPON-010 | Domain Testing | VIP100 lần dùng thứ 2 (max_uses=2, usage=1) → vẫn được chấp nhận                                       | Not Run |
| TC-COUPON-011 | Domain Testing | VIP100 lần dùng thứ 3 (đã đạt max_uses=2) → bị từ chối                                                 | Not Run |
| TC-COUPON-012 | BVA            | SAVE10, total=300,000 (ON, đúng ngưỡng min=300,000) → được chấp nhận                                   | Not Run |
| TC-COUPON-013 | BVA            | SAVE10, total=300,001 (IN, vừa trên ngưỡng SAVE10) → được chấp nhận                                    | Not Run |
| TC-COUPON-014 | BVA            | BIGBUY, total=499,999 (OFF, dưới ngưỡng BIGBUY min=500,000) → bị từ chối                               | Not Run |
| TC-COUPON-015 | BVA            | BIGBUY, total=500,001 (IN, vừa trên ngưỡng BIGBUY) → được chấp nhận                                    | Not Run |
| TC-COUPON-016 | GUI            | Nhất quán đơn vị tiền: hiển thị số tiền giảm và tổng tiền có ký hiệu ₫ và phân cách hàng nghìn (FR-21) | Not Run |
| TC-COUPON-017 | GUI            | Nhất quán ngôn ngữ: thông báo thành công/lỗi hiển thị bằng tiếng Việt rõ ràng (FR-21)                  | Not Run |
| TC-COUPON-018 | Security / GUI | Bảo mật hiển thị: mã giảm giá nhập vào được hiển thị an toàn, không render HTML (SEC-04 / FR-21)       | Not Run |

## Entry / Exit Criteria

**Entry:** Backend chạy tại localhost:3000; DB đã seed các mã giảm giá mẫu (SAVE10, BIGBUY, VIP100, EXPIRED); mã `INACTIVE` đã được tạo và cập nhật `is_active=0` theo hướng dẫn seed data; tài khoản test đã tồn tại và chưa dùng bất kỳ mã nào.
**Exit:** Tất cả 15 test case đã được thực thi; defect (nếu có) đã được ghi nhận trong issue tracker.
