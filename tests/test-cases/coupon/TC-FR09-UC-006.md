# TC-FR09-UC-006: Fixed discount dung cong thuc

## Requirement ID

FR-09

## Module / Test type / Technique

Coupon / Functional / Use Case Testing

## Source

`tests/test-summary/state-transition-and-usecase-testing-specs.md` - Section 4.4.

## Related API

- `POST /api/apply-coupon`

## Actor

User da dang nhap.

## Preconditions

- User co JWT hop le.
- Coupon `BIGBUY` ton tai, active, chua het han.
- Coupon `BIGBUY` co `type = fixed`, `discount_value = 50000`, `min_order_amount = 500000`.
- User chua tung su dung coupon `BIGBUY`.
- Tong tien checkout la 600000 VND.

## Test data

| Field | Value |
| ----- | ----- |
| Authorization | `Bearer <valid_user_jwt>` |
| coupon_code | `BIGBUY` |
| total_amount | `600000` |
| discount_value | `50000` |

## Test steps

1. Gui request `POST /api/apply-coupon` voi coupon `BIGBUY`.
2. Truyen tong tien 600000 VND.
3. Kiem tra response tra ve.
4. Doi chieu cong thuc fixed discount.

## Expected result

- Coupon apply thanh cong.
- `discount_amount = 50000`.
- `final_amount = 550000`.
- Ket qua khong bi tinh theo ty le 50000%.

## Postconditions

- Usage chua tang neu chua checkout thanh cong.

## Status / Related bugs

Not Run / None
