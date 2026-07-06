# TC-FR09-ST-006: Coupon expired la invalid state

## Requirement ID

FR-09

## Module / Test type / Technique

Coupon / Functional / State Transition Testing

## Source

`tests/test-summary/state-transition-and-usecase-testing-specs.md` - Section 4.4.

## Related API

- `POST /api/apply-coupon`

## State transition

Stay in S2 `coupon_expired`

## Preconditions

- User da dang nhap bang JWT hop le.
- Coupon `EXPIRED` ton tai va active.
- Coupon `EXPIRED` co `expired_at = 2020-01-01`.
- Ngay hien tai sau `2020-01-01`.
- Tong tien checkout hop le la 100000 VND.

## Test data

| Field | Value |
| ----- | ----- |
| Authorization | `Bearer <valid_user_jwt>` |
| coupon_code | `EXPIRED` |
| total_amount | `100000` |
| expired_at | `2020-01-01` |

## Test steps

1. Gui request `POST /api/apply-coupon` voi coupon `EXPIRED`.
2. Truyen `total_amount = 100000`.
3. Kiem tra response tra ve.
4. Kiem tra usage cua user voi coupon `EXPIRED` sau request.

## Expected result

- Request bi tu choi vi coupon da het han.
- Khong tinh `discount_amount`.
- Khong tra ve `final_amount` da giam.
- Usage khong tang.
- Trang thai o S2.

## Postconditions

- Coupon `EXPIRED` van khong the su dung.

## Status / Related bugs

Not Run / None
