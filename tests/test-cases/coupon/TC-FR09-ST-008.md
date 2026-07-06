# TC-FR09-ST-008: Fixed coupon hop le tai bien min order

## Requirement ID

FR-09

## Module / Test type / Technique

Coupon / Functional / State Transition Testing

## Source

`tests/test-summary/state-transition-and-usecase-testing-specs.md` - Section 4.4.

## Related API

- `POST /api/apply-coupon`

## State transition

S4 `eligible_unused` -> S5 `discount_applied`

## Preconditions

- User da dang nhap bang JWT hop le.
- Coupon `BIGBUY` ton tai, active, chua het han.
- Coupon `BIGBUY` co `type = fixed`, `discount_value = 50000`, `min_order_amount = 500000`, `max_uses_per_user = 1`.
- User chua tung su dung coupon `BIGBUY`.
- Tong tien checkout la 500000 VND.

## Test data

| Field | Value |
| ----- | ----- |
| Authorization | `Bearer <valid_user_jwt>` |
| coupon_code | `BIGBUY` |
| total_amount | `500000` |

## Test steps

1. Gui request `POST /api/apply-coupon` voi coupon `BIGBUY`.
2. Truyen `total_amount = 500000`.
3. Kiem tra response tra ve.
4. Kiem tra usage cua user voi coupon `BIGBUY` sau khi apply.

## Expected result

- Request thanh cong vi `total_amount = min_order_amount`.
- `discount_amount = 50000`.
- `final_amount = 450000`.
- Trang thai chuyen tu S4 sang S5.
- Usage chua tang tai buoc apply neu checkout chua thanh cong.

## Postconditions

- Coupon `BIGBUY` duoc apply cho phien checkout hien tai.

## Status / Related bugs

Not Run / None
