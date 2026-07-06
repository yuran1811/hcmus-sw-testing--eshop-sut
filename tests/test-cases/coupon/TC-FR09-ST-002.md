# TC-FR09-ST-002: Ghi nhan usage sau checkout thanh cong

## Requirement ID

FR-09

## Module / Test type / Technique

Coupon / Functional / State Transition Testing

## Source

`tests/test-summary/state-transition-and-usecase-testing-specs.md` - Section 4.4.

## Related API

- `POST /api/apply-coupon`
- `POST /api/checkout`
- `POST /api/coupon-usage`

## State transition

S5 `discount_applied` -> S6 `usage_recorded`

## Preconditions

- TC-FR09-ST-001 da apply coupon `SAVE10` thanh cong.
- User da dang nhap bang JWT hop le.
- Gio hang van hop le de checkout.
- He thong da xac dinh `coupon_id` cua `SAVE10`.

## Test data

| Field | Value |
| ----- | ----- |
| Authorization | `Bearer <valid_user_jwt>` |
| coupon_code | `SAVE10` |
| coupon_id | `<SAVE10_coupon_id>` |
| discount_amount | `30000` |
| final_amount | `270000` |

## Test steps

1. Thuc hien checkout voi coupon `SAVE10` da apply.
2. Dam bao order duoc tao thanh cong.
3. Goi hoac kiem tra tac vu ghi nhan coupon usage cho user va `SAVE10`.
4. Truy van usage cua user voi coupon `SAVE10`.

## Expected result

- Checkout thanh cong va order duoc tao.
- Usage cua user voi coupon `SAVE10` tang them 1.
- Trang thai chuyen tu S5 sang S6.
- Order luu dung thong tin coupon va discount.

## Postconditions

- User da dung `SAVE10` 1/1.
- Lan apply `SAVE10` tiep theo cua cung user phai bi tu choi vi het luot.

## Status / Related bugs

Not Run / None
