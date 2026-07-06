# FR-09 Coupon Test Design

## Purpose

Thiet ke bo test cho FR-09 - Ma giam gia tai buoc Checkout. Tai lieu nay gom test basis, state model, use case flow, coverage mapping va danh sach test case chi tiet trong thu muc `tests/test-cases/coupon`.

## Test basis

- Source: `tests/test-summary/state-transition-and-usecase-testing-specs.md`, section 4.
- Requirement: FR-09 - User co the ap dung coupon hop le khi checkout.
- Main APIs:
  - `POST /api/apply-coupon`: kiem tra coupon, tinh `discount_amount` va `final_amount`.
  - `POST /api/coupon-usage`: ghi nhan luot dung sau checkout thanh cong.
  - `GET /api/coupons`: lay danh sach coupon khi can verify du lieu.
  - `POST /api/admin/coupons`: chuan bi coupon data khi can.

## Business rules

| ID  | Rule                                |
| --- | ----------------------------------- |
| C1  | Coupon ton tai va `is_active = 1`.  |
| C2  | Ngay hien tai truoc `expired_at`.   |
| C3  | `total_amount >= min_order_amount`. |
| C4  | User da dang nhap bang JWT hop le.  |
| C5  | `usage_count < max_uses_per_user`.  |

## Coupon data

| Code      | Type      | Discount | Min order | Max uses per user | Expected purpose                                    |
| --------- | --------- | -------- | --------- | ----------------- | --------------------------------------------------- |
| `SAVE10`  | `percent` | 10%      | 300000    | 1                 | Boundary min order, percent formula, usage limit 1. |
| `BIGBUY`  | `fixed`   | 50000    | 500000    | 1                 | Fixed formula, below/equal min order boundary.      |
| `VIP100`  | `fixed`   | 100000   | 300000    | 2                 | Multi-use coupon and exhausted usage state.         |
| `EXPIRED` | `percent` | 20%      | 100000    | 1                 | Expired coupon validation.                          |

## State model

| State ID | State name          | Description                                                         |
| -------- | ------------------- | ------------------------------------------------------------------- |
| S0       | `not_authenticated` | User khong co JWT hop le.                                           |
| S1       | `coupon_unknown`    | Coupon khong ton tai hoac khong active.                             |
| S2       | `coupon_expired`    | Coupon ton tai/active nhung da het han.                             |
| S3       | `below_min_order`   | Coupon hop le ve ton tai/han dung nhung total duoi nguong.          |
| S4       | `eligible_unused`   | User dang nhap, coupon hop le, total du nguong, user con luot dung. |
| S5       | `discount_applied`  | He thong da tinh discount dung, chua ghi nhan checkout xong.        |
| S6       | `usage_recorded`    | Checkout thanh cong va usage cua user/coupon da tang.               |
| S7       | `usage_exhausted`   | User da dung du so luot toi da, lan tiep theo bi tu choi.           |

## State transition design

| Transition ID | From | Event/Input                             | Guard                    | To  | Covered by                                                                          |
| ------------- | ---- | --------------------------------------- | ------------------------ | --- | ----------------------------------------------------------------------------------- |
| ST-FR09-01    | S0   | Apply `SAVE10`, total 300000, khong JWT | C4 false                 | S0  | `TC-FR09-UC-002`                                                                    |
| ST-FR09-02    | S4   | Apply `SAVE10`, total 300000            | C1-C5 true               | S5  | `TC-FR09-ST-001`                                                                    |
| ST-FR09-03    | S5   | Checkout thanh cong voi coupon da apply | Order created            | S6  | `TC-FR09-ST-002`, `TC-FR09-UC-001`                                                  |
| ST-FR09-04    | S6   | Apply lai `SAVE10`, total 300000        | usage_count = 1, max = 1 | S7  | `TC-FR09-ST-003`                                                                    |
| ST-FR09-05    | S4   | Apply `VIP100`, total 300000 lan 1      | usage_count = 0, max = 2 | S5  | `TC-FR09-UC-006` indirectly for fixed formula, `TC-FR09-ST-004` for remaining usage |
| ST-FR09-06    | S6   | Apply `VIP100`, total 300000 lan 2      | usage_count = 1, max = 2 | S5  | `TC-FR09-ST-004`                                                                    |
| ST-FR09-07    | S6   | Apply `VIP100`, total 300000 lan 3      | usage_count = 2, max = 2 | S7  | `TC-FR09-ST-005`                                                                    |
| ST-FR09-08    | S4   | Apply `BIGBUY`, total 499999            | total < 500000           | S3  | `TC-FR09-ST-007`                                                                    |
| ST-FR09-09    | S4   | Apply `BIGBUY`, total 500000            | total = min_order_amount | S5  | `TC-FR09-ST-008`                                                                    |
| ST-FR09-10    | S2   | Apply `EXPIRED`, total 100000           | expired_at < today       | S2  | `TC-FR09-ST-006`                                                                    |
| ST-FR09-11    | S1   | Apply ma khong ton tai hoac inactive    | C1 false                 | S1  | `TC-FR09-UC-003`                                                                    |

## Use case design

### UC-FR09: Apply coupon during checkout

- Primary actor: User da dang nhap.
- Goal: User nhap coupon tai checkout va nhan tong tien sau giam dung theo FR-09.
- Trigger: User bam Apply sau khi nhap coupon code.

### Main success flow

1. User dang nhap va mo trang checkout.
2. He thong hien thi gio hang va tong tien do backend tinh.
3. User nhap coupon code hop le.
4. He thong kiem C1-C5.
5. He thong tinh `discount_amount`.
6. He thong tra ve va hien thi `final_amount`.
7. User dat hang thanh cong.
8. He thong tao order va ghi nhan usage cua coupon.

### Alternative/error flows

| Flow ID | Scenario                       | Covered by                         |
| ------- | ------------------------------ | ---------------------------------- |
| A1      | Coupon dung tai bien min order | `TC-FR09-ST-001`, `TC-FR09-ST-008` |
| A2      | Tong tien duoi nguong          | `TC-FR09-ST-007`                   |
| A3      | Coupon het han                 | `TC-FR09-ST-006`                   |
| A4      | User chua dang nhap            | `TC-FR09-UC-002`                   |
| A5      | Het luot dung coupon 1 lan     | `TC-FR09-ST-003`                   |
| A6      | Coupon con nhieu luot          | `TC-FR09-ST-004`                   |
| A7      | Het luot dung coupon nhieu lan | `TC-FR09-ST-005`                   |
| A8      | Ma khong ton tai hoac inactive | `TC-FR09-UC-003`                   |
| A9      | Client sua total gui len       | `TC-FR09-UC-004`                   |
| A10     | Percent formula                | `TC-FR09-UC-005`                   |
| A11     | Fixed formula                  | `TC-FR09-UC-006`                   |

## Test case index

| Test case ID   | Technique        | Objective                                    | File                |
| -------------- | ---------------- | -------------------------------------------- | ------------------- |
| TC-FR09-ST-001 | State Transition | Apply coupon hop le tai bien min order.      | `TC-FR09-ST-001.md` |
| TC-FR09-ST-002 | State Transition | Ghi nhan usage sau checkout thanh cong.      | `TC-FR09-ST-002.md` |
| TC-FR09-ST-003 | State Transition | Chan `SAVE10` khi da dung 1/1.               | `TC-FR09-ST-003.md` |
| TC-FR09-ST-004 | State Transition | Apply `VIP100` khi user da dung 1/2.         | `TC-FR09-ST-004.md` |
| TC-FR09-ST-005 | State Transition | Chan lan thu 3 cua `VIP100`.                 | `TC-FR09-ST-005.md` |
| TC-FR09-ST-006 | State Transition | Tu choi coupon het han.                      | `TC-FR09-ST-006.md` |
| TC-FR09-ST-007 | State Transition | Tu choi khi total duoi min order.            | `TC-FR09-ST-007.md` |
| TC-FR09-ST-008 | State Transition | Apply fixed coupon tai bien min order.       | `TC-FR09-ST-008.md` |
| TC-FR09-UC-001 | Use Case         | Apply coupon va checkout thanh cong.         | `TC-FR09-UC-001.md` |
| TC-FR09-UC-002 | Use Case         | Khach chua dang nhap khong duoc dung coupon. | `TC-FR09-UC-002.md` |
| TC-FR09-UC-003 | Use Case         | Ma coupon khong ton tai hoac inactive.       | `TC-FR09-UC-003.md` |
| TC-FR09-UC-004 | Use Case         | Backend khong tin total client gui len.      | `TC-FR09-UC-004.md` |
| TC-FR09-UC-005 | Use Case         | Percent discount dung cong thuc.             | `TC-FR09-UC-005.md` |
| TC-FR09-UC-006 | Use Case         | Fixed discount dung cong thuc.               | `TC-FR09-UC-006.md` |

## Coverage summary

| Coverage item              | Status  | Test cases                         |
| -------------------------- | ------- | ---------------------------------- |
| Auth required              | Covered | `TC-FR09-UC-002`                   |
| Coupon exists and active   | Covered | `TC-FR09-UC-003`                   |
| Expiration validation      | Covered | `TC-FR09-ST-006`                   |
| Min order below boundary   | Covered | `TC-FR09-ST-007`                   |
| Min order equal boundary   | Covered | `TC-FR09-ST-001`, `TC-FR09-ST-008` |
| Percent calculation        | Covered | `TC-FR09-ST-001`, `TC-FR09-UC-005` |
| Fixed calculation          | Covered | `TC-FR09-ST-008`, `TC-FR09-UC-006` |
| Usage count after checkout | Covered | `TC-FR09-ST-002`, `TC-FR09-UC-001` |
| Usage limit exhausted      | Covered | `TC-FR09-ST-003`, `TC-FR09-ST-005` |
| Client total tampering     | Covered | `TC-FR09-UC-004`                   |

## Test data setup notes

- Moi test nen dung user rieng hoac reset `coupon_usage` truoc khi chay de tranh phu thuoc thu tu.
- Cac test usage limit can seed dung `usage_count` theo precondition.
- Cac test expired coupon can dam bao `EXPIRED.expired_at` luon truoc ngay test hien tai.
- Cac test checkout thanh cong can co gio hang hop le va stock du.

## Defect risks targeted

- Dung sai dieu kien bien `>` thay vi `>=` cho `min_order_amount`.
- Khong bat buoc JWT khi apply coupon.
- Tinh sai cong thuc percent hoac fixed discount.
- Tang usage ngay khi apply thay vi sau checkout thanh cong.
- Khong chan apply coupon khi user da het luot.
- Tin `total_amount` client gui len thay vi tong tien backend tinh lai.

## Out of scope

- Admin CRUD coupon chi duoc dung de chuan bi data, khong phai muc tieu chinh cua FR-09.
- UI visual regression cua checkout khong nam trong bo test nay.
- Boundary value day du cho moi truong so tien am, decimal, rounding nen tach thanh bo domain/boundary testing rieng neu can.
