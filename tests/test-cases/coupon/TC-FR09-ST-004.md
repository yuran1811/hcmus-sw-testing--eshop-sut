# TC-FR09-ST-004: Apply coupon VIP100 khi con luot dung

## Requirement ID

FR-09

## Module / Test type / Technique

Coupon / Functional / State Transition Testing

## Source

`tests/test-summary/state-transition-and-usecase-testing-specs.md` - Section 4.4.

## Related API

- `POST /api/apply-coupon`

## State transition

S6 `usage_recorded` -> S5 `discount_applied`

## Preconditions

- User da dang nhap bang JWT hop le.
- Coupon `VIP100` ton tai, active, chua het han.
- Coupon `VIP100` co `type = fixed`, `discount_value = 100000`, `min_order_amount = 300000`, `max_uses_per_user = 2`.
- User da su dung coupon `VIP100` 1 lan.
- Tong tien checkout hop le la 300000 VND.

## Test data

| Field | Value |
| ----- | ----- |
| Authorization | `Bearer <valid_user_jwt>` |
| coupon_code | `VIP100` |
| total_amount | `300000` |
| existing_usage_count | `1` |
| max_uses_per_user | `2` |

## Test steps

1. Gui request `POST /api/apply-coupon` voi coupon `VIP100`.
2. Truyen `total_amount = 300000`.
3. Kiem tra response tra ve.
4. Kiem tra usage cua user voi coupon `VIP100` sau khi apply.

## Expected result

- Request thanh cong vi user van con 1 luot dung.
- `discount_amount = 100000`.
- `final_amount = 200000`.
- Trang thai chuyen tu S6 sang S5.
- Usage chua tang tai buoc apply neu checkout chua thanh cong.

## Postconditions

- Coupon `VIP100` duoc apply cho phien checkout hien tai.

## Status / Related bugs

Not Run / None
