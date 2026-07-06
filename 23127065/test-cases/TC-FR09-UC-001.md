# TC-FR09-UC-001: Apply coupon va checkout thanh cong

## Requirement ID

FR-09

## Module / Test type / Technique

Coupon / Functional / Use Case Testing

## Source

`tests/test-summary/state-transition-and-usecase-testing-specs.md` - Section 4.4.

## Related API

- `POST /api/apply-coupon`
- `POST /api/checkout`
- `POST /api/coupon-usage`

## Actor

User da dang nhap.

## Preconditions

- User co JWT hop le.
- Gio hang co tong tien backend tinh la 300000 VND.
- Coupon `SAVE10` ton tai, active, chua het han.
- User chua tung su dung coupon `SAVE10`.

## Test data

| Field | Value |
| ----- | ----- |
| Authorization | `Bearer <valid_user_jwt>` |
| coupon_code | `SAVE10` |
| cart_total | `300000` |

## Test steps

1. User mo trang checkout.
2. He thong hien thi gio hang va tong tien 300000 VND.
3. User nhap coupon `SAVE10`.
4. User bam Apply.
5. He thong apply coupon va hien thi tong tien sau giam.
6. User xac nhan dat hang.
7. He thong tao order.
8. He thong ghi nhan usage cua coupon cho user.

## Expected result

- Coupon apply thanh cong.
- `discount_amount = 30000`.
- `final_amount = 270000`.
- Order duoc tao thanh cong voi thong tin coupon/discount.
- Usage cua user voi `SAVE10` tang tu 0 len 1.

## Postconditions

- User da dung `SAVE10` 1/1.
- Gio hang duoc xu ly theo luong checkout thanh cong cua he thong.

## Status / Related bugs

Not Run / None
