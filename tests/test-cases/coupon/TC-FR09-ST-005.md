# TC-FR09-ST-005: Chan lan thu 3 cua coupon VIP100

## Requirement ID

FR-09

## Module / Test type / Technique

Coupon / Functional / State Transition Testing

## Source

`tests/test-summary/state-transition-and-usecase-testing-specs.md` - Section 4.4.

## Related API

- `POST /api/apply-coupon`

## State transition

S6 `usage_recorded` -> S7 `usage_exhausted`

## Preconditions

- User da dang nhap bang JWT hop le.
- Coupon `VIP100` ton tai, active, chua het han.
- Coupon `VIP100` co `max_uses_per_user = 2`.
- User da su dung coupon `VIP100` 2 lan.
- Tong tien checkout hop le la 300000 VND.

## Test data

| Field | Value |
| ----- | ----- |
| Authorization | `Bearer <valid_user_jwt>` |
| coupon_code | `VIP100` |
| total_amount | `300000` |
| existing_usage_count | `2` |
| max_uses_per_user | `2` |

## Test steps

1. Gui request `POST /api/apply-coupon` voi coupon `VIP100`.
2. Truyen `total_amount = 300000`.
3. Kiem tra response tra ve.
4. Kiem tra usage cua user voi coupon `VIP100` sau request.

## Expected result

- Request bi tu choi vi user da het luot dung `VIP100`.
- Khong tao discount moi.
- Usage khong tang them.
- Trang thai chuyen tu S6 sang S7.

## Postconditions

- User van o trang thai da dung `VIP100` 2/2.

## Status / Related bugs

Not Run / None
