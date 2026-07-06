# TC-FR09-UC-004: Backend khong tin total client gui len

## Requirement ID

FR-09

## Module / Test type / Technique

Coupon / Functional / Use Case Testing

## Source

`tests/test-summary/state-transition-and-usecase-testing-specs.md` - Section 4.4.

## Related API

- `POST /api/apply-coupon`
- `POST /api/checkout`

## Actor

User da dang nhap.

## Preconditions

- User co JWT hop le.
- Gio hang backend tinh duoc tong tien that la 300000 VND.
- Coupon `SAVE10` ton tai, active, chua het han.
- User chua tung su dung coupon `SAVE10`.
- Tester co the sua payload request tu client.

## Test data

| Field | Value |
| ----- | ----- |
| Authorization | `Bearer <valid_user_jwt>` |
| coupon_code | `SAVE10` |
| backend_cart_total | `300000` |
| tampered_client_total | `3000000` |

## Test steps

1. User mo checkout voi gio hang co tong tien that 300000 VND.
2. Sua request tu client de gui `total_amount = 3000000`.
3. Gui request apply coupon hoac checkout voi payload da bi sua.
4. Kiem tra response va order duoc tao neu checkout thanh cong.
5. Kiem tra discount/final amount duoc luu.

## Expected result

- Backend khong tin tong tien client tu y gui len.
- Discount va final amount phai dua tren 300000 VND.
- Neu `SAVE10` duoc chap nhan, `discount_amount = 30000` va `final_amount = 270000`.
- Khong tao discount 300000 VND dua tren total 3000000 VND.

## Postconditions

- Order va coupon usage, neu duoc tao, phai dung tong tien backend tinh lai.

## Status / Related bugs

Not Run / None
