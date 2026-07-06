# TC-FR09-ST-007: Below min order khong duoc apply

## Requirement ID

FR-09

## Module / Test type / Technique

Coupon / Functional / State Transition Testing

## Source

`tests/test-summary/state-transition-and-usecase-testing-specs.md` - Section 4.4.

## Related API

- `POST /api/apply-coupon`

## State transition

S4 `eligible_unused` -> S3 `below_min_order`

## Preconditions

- User da dang nhap bang JWT hop le.
- Coupon `BIGBUY` ton tai, active, chua het han.
- Coupon `BIGBUY` co `type = fixed`, `discount_value = 50000`, `min_order_amount = 500000`, `max_uses_per_user = 1`.
- User chua tung su dung coupon `BIGBUY`.
- Tong tien checkout la 499999 VND.

## Test data

| Field | Value |
| ----- | ----- |
| Authorization | `Bearer <valid_user_jwt>` |
| coupon_code | `BIGBUY` |
| total_amount | `499999` |
| min_order_amount | `500000` |

## Test steps

1. Gui request `POST /api/apply-coupon` voi coupon `BIGBUY`.
2. Truyen `total_amount = 499999`.
3. Kiem tra response tra ve.
4. Kiem tra usage cua user voi coupon `BIGBUY` sau request.

## Expected result

- Request bi tu choi vi tong tien duoi nguong toi thieu.
- Khong tinh giam gia 50000 VND.
- Usage khong tang.
- Trang thai chuyen tu S4 sang S3.

## Postconditions

- User van chua su dung coupon `BIGBUY`.

## Status / Related bugs

Not Run / None
