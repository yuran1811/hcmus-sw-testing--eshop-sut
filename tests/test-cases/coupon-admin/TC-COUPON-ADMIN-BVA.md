# TC-COUPON-ADMIN-BVA: Boundary Value Analysis — Quản lý Mã Giảm Giá Admin / Coupon Admin CRUD

## Requirement ID

FR-17

## How BVA Was Applied

- Xác định các biến số/đếm có biên giới hạn rõ rệt trong đặc tả FR-17:
  - Giá trị giảm giá `discount_value` phải dương (> 0). Biên mở dưới: min = 0 (không chấp nhận), lớn hơn 0 được chấp nhận. Bước nhảy là 1.
  - Ngưỡng đơn hàng tối thiểu `min_order_amount` phải không âm (>= 0). Biên đóng dưới: min = 0 (chấp nhận). Bước nhảy là 1.
  - Lượt dùng tối đa mỗi người `max_uses_per_user` phải từ 1 trở lên (>= 1). Biên đóng dưới: min = 1 (chấp nhận). Bước nhảy là 1.
- Áp dụng kiểm thử biên 3 giá trị (3-value BVA): OFF, ON, IN cho mỗi biên để bao phủ toàn bộ các trường hợp rủi ro ở biên.
- Liên kết các điểm kiểm thử biên với các test case tương ứng để tối ưu hóa phạm vi kiểm thử (tận dụng một số điểm biên OFF đã được khai báo ở Domain Testing).

## Boundary Analysis

### Boundary B1: discount_value — Giá trị giảm tối thiểu (min > 0)

| Attribute      | Value                        |
| -------------- | ---------------------------- |
| Variable       | discount_value               |
| Boundary type  | open minimum (khoảng mở, >0) |
| Boundary value | 0                            |
| Step size      | 1                            |

| Test Point     | Test Value | Expected | Related Test Case   |
| -------------- | ---------- | -------- | ------------------- |
| OFF (boundary) | 0          | Rejected | TC-COUPON-ADMIN-006 |
| ON (min + 1)   | 1          | Accepted | TC-COUPON-ADMIN-018 |
| IN (min + 2)   | 2          | Accepted | TC-COUPON-ADMIN-019 |

---

### Boundary B2: min_order_amount — Ngưỡng đơn tối thiểu (min >= 0)

| Attribute      | Value                             |
| -------------- | --------------------------------- |
| Variable       | min_order_amount                  |
| Boundary type  | closed minimum (khoảng đóng, >=0) |
| Boundary value | 0                                 |
| Step size      | 1                                 |

| Test Point    | Test Value | Expected | Related Test Case   |
| ------------- | ---------- | -------- | ------------------- |
| OFF (min - 1) | -1         | Rejected | TC-COUPON-ADMIN-010 |
| ON (min)      | 0          | Accepted | TC-COUPON-ADMIN-020 |
| IN (min + 1)  | 1          | Accepted | TC-COUPON-ADMIN-021 |

---

### Boundary B3: max_uses_per_user — Số lần dùng tối đa mỗi người (min >= 1)

| Attribute      | Value                             |
| -------------- | --------------------------------- |
| Variable       | max_uses_per_user                 |
| Boundary type  | closed minimum (khoảng đóng, >=1) |
| Boundary value | 1                                 |
| Step size      | 1                                 |

| Test Point    | Test Value | Expected | Related Test Case   |
| ------------- | ---------- | -------- | ------------------- |
| OFF (min - 1) | 0          | Rejected | TC-COUPON-ADMIN-011 |
| ON (min)      | 1          | Accepted | TC-COUPON-ADMIN-022 |
| IN (min + 1)  | 2          | Accepted | TC-COUPON-ADMIN-023 |

---

## Test Cases Summary

| TC ID               | Description                                                         | Boundary | Point | Expected |
| ------------------- | ------------------------------------------------------------------- | -------- | ----- | -------- |
| TC-COUPON-ADMIN-006 | discount_value = 0 (Biên mở OFF) → bị từ chối                       | B1       | OFF   | Fail     |
| TC-COUPON-ADMIN-018 | discount_value = 1 (ON, giá trị dương nhỏ nhất) → tạo thành công    | B1       | ON    | Pass     |
| TC-COUPON-ADMIN-019 | discount_value = 2 (IN, vừa trên biên) → tạo thành công             | B1       | IN    | Pass     |
| TC-COUPON-ADMIN-010 | min_order_amount = -1 (Biên đóng OFF) → bị từ chối                  | B2       | OFF   | Fail     |
| TC-COUPON-ADMIN-020 | min_order_amount = 0 (ON, giá trị tối thiểu đóng) → tạo thành công  | B2       | ON    | Pass     |
| TC-COUPON-ADMIN-021 | min_order_amount = 1 (IN, vừa trên biên) → tạo thành công           | B2       | IN    | Pass     |
| TC-COUPON-ADMIN-011 | max_uses_per_user = 0 (Biên đóng OFF) → bị từ chối                  | B3       | OFF   | Fail     |
| TC-COUPON-ADMIN-022 | max_uses_per_user = 1 (ON, giá trị tối thiểu đóng) → tạo thành công | B3       | ON    | Pass     |
| TC-COUPON-ADMIN-023 | max_uses_per_user = 2 (IN, vừa trên biên) → tạo thành công          | B3       | IN    | Pass     |
