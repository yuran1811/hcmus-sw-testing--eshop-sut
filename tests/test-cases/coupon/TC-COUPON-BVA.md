# TC-COUPON-BVA: Boundary Value Analysis — Mã Giảm Giá / Apply Coupon

## Requirement ID

FR-09

## How BVA Was Applied

- Identified bounded variables: `total_amount` (tổng đơn hàng) có ngưỡng tối thiểu phụ thuộc vào từng mã giảm giá (`min_order_amount`), và `usage_count` (số lần người dùng đã sử dụng mã) có giới hạn trên là `max_uses_per_user`.
- Applied 3-value BVA around the boundaries.
- Generated test points for:
  - Ngưỡng tối thiểu của SAVE10 (min = 300,000 ₫): OFF (299,999 ₫), ON (300,000 ₫), IN (300,001 ₫).
  - Ngưỡng tối thiểu của BIGBUY (min = 500,000 ₫): OFF (499,999 ₫), ON (500,000 ₫), IN (500,001 ₫).
  - Giới hạn sử dụng của SAVE10 (max = 1): ON/Valid (0 lần), OFF/Invalid (1 lần).
  - Giới hạn sử dụng của VIP100 (max = 2): ON/Valid (1 lần), OFF/Invalid (2 lần).
- Mapped test points to a combination of existing DT cases and new BVA cases to optimize coverage.

## Boundary Analysis

### Boundary B1: total_amount — Ngưỡng tối thiểu của SAVE10 (min = 300,000)

| Attribute      | Value          |
| -------------- | -------------- |
| Variable       | total_amount   |
| Boundary type  | closed minimum |
| Boundary value | 300,000        |
| Step size      | 1              |

| Test Point  | Test Value | Expected | Related Test Case |
| ----------- | ---------- | -------- | ----------------- |
| OFF (min−1) | 299,999    | Rejected | TC-COUPON-006     |
| ON (min)    | 300,000    | Accepted | TC-COUPON-012     |
| IN (min+1)  | 300,001    | Accepted | TC-COUPON-013     |

---

### Boundary B2: total_amount — Ngưỡng tối thiểu của BIGBUY (min = 500,000)

| Attribute      | Value          |
| -------------- | -------------- |
| Variable       | total_amount   |
| Boundary type  | closed minimum |
| Boundary value | 500,000        |
| Step size      | 1              |

| Test Point  | Test Value | Expected | Related Test Case |
| ----------- | ---------- | -------- | ----------------- |
| OFF (min−1) | 499,999    | Rejected | TC-COUPON-014     |
| ON (min)    | 500,000    | Accepted | TC-COUPON-002     |
| IN (min+1)  | 500,001    | Accepted | TC-COUPON-015     |

---

### Boundary B3: usage_count — Giới hạn sử dụng của SAVE10 (max_uses_per_user = 1)

| Attribute      | Value             |
| -------------- | ----------------- |
| Variable       | usage_count       |
| Boundary type  | open maximum (<1) |
| Boundary value | 1                 |
| Step size      | 1                 |

| Test Point | Test Value | Expected | Related Test Case |
| ---------- | ---------- | -------- | ----------------- |
| ON (max-1) | 0          | Accepted | TC-COUPON-001     |
| OFF (max)  | 1          | Rejected | TC-COUPON-009     |

---

### Boundary B4: usage_count — Giới hạn sử dụng của VIP100 (max_uses_per_user = 2)

| Attribute      | Value             |
| -------------- | ----------------- |
| Variable       | usage_count       |
| Boundary type  | open maximum (<2) |
| Boundary value | 2                 |
| Step size      | 1                 |

| Test Point | Test Value | Expected | Related Test Case |
| ---------- | ---------- | -------- | ----------------- |
| ON (max-1) | 1          | Accepted | TC-COUPON-010     |
| OFF (max)  | 2          | Rejected | TC-COUPON-011     |

---

## Test Cases Summary

| TC ID         | Description                                                        | Boundary | Point | Expected |
| ------------- | ------------------------------------------------------------------ | -------- | ----- | -------- |
| TC-COUPON-006 | SAVE10, total = 299,999 ₫ (OFF, dưới min=300k) → bị từ chối        | B1       | OFF   | Fail     |
| TC-COUPON-012 | SAVE10, total = 300,000 ₫ (ON, đúng min=300k) → được chấp nhận     | B1       | ON    | Pass     |
| TC-COUPON-013 | SAVE10, total = 300,001 ₫ (IN, vừa trên min=300k) → được chấp nhận | B1       | IN    | Pass     |
| TC-COUPON-014 | BIGBUY, total = 499,999 ₫ (OFF, dưới min=500k) → bị từ chối        | B2       | OFF   | Fail     |
| TC-COUPON-002 | BIGBUY, total = 500,000 ₫ (ON, đúng min=500k) → được chấp nhận     | B2       | ON    | Pass     |
| TC-COUPON-015 | BIGBUY, total = 500,001 ₫ (IN, vừa trên min=500k) → được chấp nhận | B2       | IN    | Pass     |
| TC-COUPON-001 | SAVE10, usage_count = 0 (dưới max=1) → được chấp nhận              | B3       | ON    | Pass     |
| TC-COUPON-009 | SAVE10, usage_count = 1 (đã đạt max=1) → bị từ chối                | B3       | OFF   | Fail     |
| TC-COUPON-010 | VIP100, usage_count = 1 (dưới max=2) → được chấp nhận              | B4       | ON    | Pass     |
| TC-COUPON-011 | VIP100, usage_count = 2 (đã đạt max=2) → bị từ chối                | B4       | OFF   | Fail     |
