# TC-FR09-UC-002: Khach chua dang nhap khong duoc dung coupon

## Requirement ID

FR-09

## Module / Test type / Technique

Coupon / Functional / Use Case Testing

## Source

`tests/test-summary/state-transition-and-usecase-testing-specs.md` - Section 4.4.

## Related API

- `POST /api/apply-coupon`

## Actor

Khach chua dang nhap.

## Preconditions

- Khong co JWT hop le trong request.
- Coupon `SAVE10` ton tai, active, chua het han.
- Tong tien checkout la 300000 VND.

## Test data

| Field | Value |
| ----- | ----- |
| Authorization | None or invalid token |
| coupon_code | `SAVE10` |
| total_amount | `300000` |

## Test steps

1. Mo trang checkout hoac goi API apply coupon khi chua dang nhap.
2. Nhap coupon `SAVE10`.
3. Gui request apply coupon khong kem JWT hop le.
4. Kiem tra response va hien thi tren UI.
5. Kiem tra usage cua coupon neu co quyen truy van du lieu test.

## Expected result

- Request bi tu choi theo dieu kien C4.
- He thong thong bao user can dang nhap.
- Khong hien thi final amount da giam.
- Khong ghi nhan usage coupon.

## Postconditions

- Coupon `SAVE10` van chua duoc dung boi khach chua dang nhap.

## Status / Related bugs

Not Run / None
