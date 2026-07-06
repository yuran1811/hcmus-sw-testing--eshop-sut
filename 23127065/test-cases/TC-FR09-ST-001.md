# TC-FR09-ST-001: Apply coupon hop le tai bien min order

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
- Coupon `SAVE10` ton tai, `is_active = 1`, chua het han.
- Coupon `SAVE10` co `type = percent`, `discount_value = 10`, `min_order_amount = 300000`, `max_uses_per_user = 1`.
- User chua tung su dung coupon `SAVE10`.
- Gio hang hoac tong tien checkout hop le la 300000 VND.

## Test data

| Field | Value |
| ----- | ----- |
| Authorization | `Bearer <valid_user_jwt>` |
| coupon_code | `SAVE10` |
| total_amount | `300000` |

## Test steps

1. Gui request `POST /api/apply-coupon` voi JWT hop le.
2. Truyen `coupon_code = SAVE10` va `total_amount = 300000`.
3. Kiem tra response tra ve.
4. Kiem tra usage cua user voi coupon `SAVE10` sau khi apply.

## Expected result

- Request thanh cong.
- He thong chap nhan coupon vi `total_amount = min_order_amount`.
- `discount_amount = 30000`.
- `final_amount = 270000`.
- Trang thai chuyen tu S4 sang S5.
- Usage chua tang tai buoc apply neu checkout chua thanh cong.

## Postconditions

- Coupon da duoc apply cho phien checkout hien tai.
- Chua ghi nhan usage neu chua dat hang thanh cong.

## Status / Related bugs

Not Run / None
