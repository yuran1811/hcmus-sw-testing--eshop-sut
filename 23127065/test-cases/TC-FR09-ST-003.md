# TC-FR09-ST-003: Chan coupon SAVE10 khi het luot dung

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
- Coupon `SAVE10` ton tai, active, chua het han.
- User da su dung coupon `SAVE10` 1 lan.
- `SAVE10` co `max_uses_per_user = 1`.
- Tong tien checkout hop le la 300000 VND.

## Test data

| Field | Value |
| ----- | ----- |
| Authorization | `Bearer <valid_user_jwt>` |
| coupon_code | `SAVE10` |
| total_amount | `300000` |
| existing_usage_count | `1` |
| max_uses_per_user | `1` |

## Test steps

1. Gui request `POST /api/apply-coupon` voi coupon `SAVE10`.
2. Truyen `total_amount = 300000`.
3. Kiem tra response tra ve.
4. Kiem tra usage cua user voi coupon `SAVE10` sau request.

## Expected result

- Request bi tu choi vi user da dat gioi han su dung.
- Khong tra ve `discount_amount` hop le cho checkout.
- Tong tien khong bi giam.
- Usage khong tang them.
- Trang thai chuyen tu S6 sang S7.

## Postconditions

- User van o trang thai da dung `SAVE10` 1/1.

## Status / Related bugs

Not Run / None
