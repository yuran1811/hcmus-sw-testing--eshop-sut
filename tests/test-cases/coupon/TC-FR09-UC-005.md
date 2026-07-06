# TC-FR09-UC-005: Percent discount dung cong thuc

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
- Coupon `SAVE10` ton tai, active, chua het han.
- Coupon `SAVE10` co `type = percent`, `discount_value = 10`, `min_order_amount = 300000`.
- User chua tung su dung coupon `SAVE10`.
- Tong tien checkout la 500000 VND.

## Test data

| Field | Value |
| ----- | ----- |
| Authorization | `Bearer <valid_user_jwt>` |
| coupon_code | `SAVE10` |
| total_amount | `500000` |
| discount_value | `10%` |

## Test steps

1. Gui request `POST /api/apply-coupon` voi coupon `SAVE10`.
2. Truyen tong tien 500000 VND.
3. Kiem tra response tra ve.
4. Doi chieu cong thuc `discount_amount = total_amount * discount_value / 100`.

## Expected result

- Coupon apply thanh cong.
- `discount_amount = 50000`.
- `final_amount = 450000`.
- Ket qua khong bi tinh nhu fixed discount 10 VND hoac 10000 VND.

## Postconditions

- Usage chua tang neu chua checkout thanh cong.

## Status / Related bugs

Not Run / None
