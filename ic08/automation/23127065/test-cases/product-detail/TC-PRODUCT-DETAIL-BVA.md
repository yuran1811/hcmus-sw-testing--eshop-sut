# TC-PRODUCT-DETAIL-BVA: Boundary Value Analysis — Product Detail

## Requirement ID

FR-06

## How BVA Was Applied

- Identified bounded variables: `quantity` (form input field for quantity added to cart) has a minimum boundary constraint (quantity >= 1).
- Applied 3-value BVA around the minimum boundary (min = 1, step size = 1).
- Generated test points: OFF (0), ON (1), and IN (2).
- Mapped OFF (0) to TC-PRODUCT-DETAIL-005, ON (1) to TC-PRODUCT-DETAIL-010, and IN (2) to TC-PRODUCT-DETAIL-011.

## Boundary Analysis

### Boundary B1: quantity — Minimum count constraint (>= 1)

| Attribute      | Value          |
| -------------- | -------------- |
| Variable       | quantity       |
| Boundary type  | closed minimum |
| Boundary value | 1              |
| Step size      | 1              |

| Test Point  | Test Value | Expected |
| ----------- | ---------- | -------- |
| OFF (min−1) | 0          | Rejected |
| ON (min)    | 1          | Accepted |
| IN (min+1)  | 2          | Accepted |

## Test Cases Summary

| TC ID                 | Description                                                             | Boundary | Point | Expected |
| --------------------- | ----------------------------------------------------------------------- | -------- | ----- | -------- |
| TC-PRODUCT-DETAIL-005 | Quantity = 0 → bị từ chối (không thêm được vào giỏ)                     | B1       | OFF   | Fail     |
| TC-PRODUCT-DETAIL-010 | Quantity = 1 (ON, đúng min=1) → được chấp nhận; thêm vào giỏ thành công | B1       | ON    | Pass     |
| TC-PRODUCT-DETAIL-011 | Quantity = 2 (IN, vừa trên min) → được chấp nhận                        | B1       | IN    | Pass     |
