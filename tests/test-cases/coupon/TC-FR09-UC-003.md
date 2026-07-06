# TC-FR09-UC-003: Ma coupon khong ton tai hoac khong active

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
- Coupon `NOPE999` khong ton tai hoac coupon co cung code dang inactive.
- Tong tien checkout la 500000 VND.

## Test data

| Field | Value |
| ----- | ----- |
| Authorization | `Bearer <valid_user_jwt>` |
| coupon_code | `NOPE999` |
| total_amount | `500000` |

## Test steps

1. User mo trang checkout.
2. User nhap coupon `NOPE999`.
3. User bam Apply.
4. Kiem tra response tra ve.
5. Kiem tra usage coupon sau request.

## Expected result

- Request bi tu choi theo dieu kien C1.
- He thong thong bao coupon khong hop le, khong ton tai, hoac khong active.
- Khong tinh discount.
- Khong ghi nhan usage.

## Postconditions

- Tong tien checkout khong thay doi.

## Status / Related bugs

Not Run / None
