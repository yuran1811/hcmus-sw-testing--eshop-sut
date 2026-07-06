# De xuat dac ta ap dung State Transition Testing va Use Case Testing

Nguon tham chieu:

- `README.md` - System Requirements Specification, phien ban 2.0.
- `api_specification.md` - API Specification cho Backend.

## 0. Quy uoc dau ra theo skill

De tai nay phu hop de tach thanh 2 bo tai lieu theo convention cua skill:

- State Transition Testing:
  - `tests/test-cases/[module]/STT-[MODULE]-table.md`
  - `tests/test-cases/[module]/TC-[MODULE]-STT-[NN].md`
  - `tests/test-cases/[module]/STT-[MODULE]-coverage-matrix.md`
- Use Case Testing:
  - `tests/test-cases/[module]/TC-[MODULE]-[NN].md`
  - `tests/test-cases/[module]/UC-[NN]-[MODULE]-coverage-matrix.md`

Luu y:

- Thu tuc State Transition va Use Case nen duoc bao toan thanh 2 tap file rieng, khong tron dinh danh.
- Neu bung ra file thuc thi cho FR-09, module nen dat la `coupon` de de theo doi va dung convention trong skill.
- Cac gia tri so cu the trong phan FR-09 duoc giu voi muc dich phan tich; neu can bo test case cu the, co the tach them domain testing / boundary value analysis rieng.

## 1. Tom tat khuyen nghi

| Ky thuat                 | Dac ta phu hop nhat                            | Ly do uu tien                                                                                            |
| ------------------------ | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| State Transition Testing | FR-10, FR-18, FR-20                            | Co state machine ro rang cho don hang, gom trang thai hop le, trang thai ket thuc va transition bi cam.  |
| State Transition Testing | FR-02                                          | Co bo dem dang nhap sai, nguong khoa tai khoan va thoi gian khoa 30 giay.                                |
| State Transition Testing | FR-03, SEC-07                                  | Quy trinh quen mat khau co 2 buoc, OTP gan voi email, co trang thai hop le/khong hop le/da dung/het han. |
| State Transition Testing | FR-07, FR-08                                   | Gio hang chuyen tu trong sang co san pham, tang/giam/xoa item, checkout thanh cong thi xoa gio hang.     |
| State Transition Testing | FR-09                                          | Ma giam gia co dieu kien active/expired/usage limit va anh huong den ket qua ap dung.                    |
| Use Case Testing         | FR-01 den FR-09, FR-11, FR-14 den FR-19, FR-20 | Cac yeu cau mo ta muc tieu nguoi dung/admin tu dau den cuoi, phu hop thiet ke luong nghiep vu.           |

## 2. Dac ta nen ap dung State Transition Testing

### ST-01: Dang nhap va khoa tai khoan

- Requirement: FR-02.
- API lien quan: `POST /api/login`.
- Trang thai de kiem thu:
  - `normal`: tai khoan chua bi khoa, so lan sai = 0.
  - `failed_1`: sai mat khau lan 1.
  - `failed_2`: sai mat khau lan 2.
  - `locked`: sai tu lan 3 tro len, bi khoa 30 giay.
  - `authenticated`: dang nhap dung va nhan JWT.
- Transition can kiem:
  - Sai mat khau lam tang bo dem dung 1 don vi.
  - Sai lan 3 chuyen sang `locked`.
  - Dang nhap trong luc `locked` bi tu choi.
  - Het 30 giay thi co the dang nhap lai.
  - Dang nhap thanh cong reset chuoi sai lien tiep.
- Gia tri cua ky thuat: phat hien loi o nguong 3 lan, reset counter, va hanh vi trong/ngoai thoi gian khoa.

### ST-02: Quen mat khau va OTP

- Requirement: FR-03, SEC-07.
- API lien quan: `POST /api/forgot-password`, `POST /api/reset-password`.
- Trang thai de kiem thu:
  - `no_otp`: chua yeu cau OTP.
  - `otp_issued`: OTP da duoc tao cho dung email.
  - `otp_invalid`: OTP sai hoac dung cho email khac.
  - `otp_used`: OTP da duoc dung thanh cong.
  - `otp_expired`: OTP het han neu he thong co cai dat thoi han theo SEC-07.
  - `password_reset`: mat khau moi da duoc cap nhat.
- Transition can kiem:
  - Email da dang ky -> sinh OTP 6 chu so.
  - OTP dung + mat khau hop le + confirm khop -> reset thanh cong.
  - OTP dung nhung email khac -> tu choi.
  - OTP da dung -> khong dung lai duoc.
  - Mat khau moi khong dat chuan -> khong doi trang thai mat khau.
- Gia tri cua ky thuat: kiem soat vong doi OTP va ngan reuse/cross-email.

### ST-03: Gio hang va checkout

- Requirement: FR-07, FR-08.
- API lien quan: `GET /api/cart`, `POST /api/cart`, `POST /api/checkout`.
- Trang thai de kiem thu:
  - `empty_cart`: gio hang rong.
  - `cart_with_item`: da co it nhat mot san pham.
  - `quantity_updated`: tang/giam so luong.
  - `item_removed`: xoa san pham sau confirm.
  - `checkout_ready`: user da dang nhap va gio hang hop le.
  - `order_created`: checkout thanh cong.
  - `cart_cleared`: gio hang bi xoa sau checkout.
- Transition can kiem:
  - Them san pham moi vao gio hang.
  - Them lai cung san pham thi tang quantity, khong tao dong moi.
  - Giam quantity toi bien toi thieu.
  - Xoa item can dialog xac nhan.
  - Checkout thanh cong tao don hang va xoa gio hang.
  - User chua dang nhap khong duoc checkout.
- Gia tri cua ky thuat: phat hien loi duplicate item, quantity invalid, va loi khong clear cart sau dat hang.

### ST-04: Ap dung ma giam gia

- Requirement: FR-09, FR-17.
- API lien quan: `POST /api/apply-coupon`, `GET /api/coupons`, `POST /api/admin/coupons`, `DELETE /api/admin/coupons/:id`.
- Trang thai/dieu kien de kiem thu:
  - `active_valid`: ma ton tai, active, con han.
  - `inactive_or_missing`: ma khong ton tai hoac khong active.
  - `expired`: qua `expired_at`.
  - `below_min_order`: tong tien duoi nguong.
  - `unauthenticated`: khong co JWT hop le.
  - `usage_available`: user con luot dung.
  - `usage_exhausted`: user da dung toi `max_uses_per_user`.
- Transition can kiem:
  - Ap dung thanh cong lam tang so lan dung cua user.
  - Dat toi gioi han su dung thi lan sau bi tu choi.
  - Ma het han hoac tong tien duoi nguong khong thay doi usage.
  - Cong thuc `percent` va `fixed` tao dung `discount_amount` va `final_amount`.
- Gia tri cua ky thuat: phu hop voi transition theo usage count va decision state cua coupon.

### ST-05: State machine don hang

- Requirement: FR-10, FR-18, FR-20.
- API lien quan:
  - User: `PUT /api/orders/:id/cancel`, `GET /api/orders/my-orders`, `GET /api/orders/:id`.
  - Admin: `GET /api/admin/orders`, `PUT /api/admin/orders/:id/status`.
- Trang thai chinh:
  - `pending`
  - `confirmed`
  - `shipping`
  - `delivered`
  - `canceled`
- Transition hop le:
  - `pending` -> `confirmed`
  - `confirmed` -> `shipping`
  - `shipping` -> `delivered`
  - `pending` -> `canceled`
  - `confirmed` -> `canceled`
- Transition can bi tu choi:
  - Tu `delivered` sang bat ky trang thai nao.
  - Tu `canceled` sang bat ky trang thai nao.
  - User huy don khi don da `shipping`.
  - Nhay coc, vi du `pending` -> `shipping`, `pending` -> `delivered`, `confirmed` -> `delivered`.
  - Quay lui, vi du `shipping` -> `confirmed`.
- Gia tri cua ky thuat: day la ung vien manh nhat vi dac ta da co state machine day du, final states, role-based transition va invalid transition.

## 3. Dac ta nen ap dung Use Case Testing

### UC-01: Dang ky tai khoan moi

- Requirement: FR-01, FR-22.
- API lien quan: `POST /api/register`.
- Actor: Khach hang moi.
- Muc tieu: Tao tai khoan hop le va duoc chuyen den trang Dang nhap.
- Luong chinh:
  1. Nhap ho ten, email, mat khau, xac nhan mat khau.
  2. He thong validate email, unique email va password strength.
  3. Tao tai khoan thanh cong.
  4. Chuyen ve trang Dang nhap.
- Luong thay the nen kiem:
  - Email sai dinh dang.
  - Email da ton tai.
  - Mat khau yeu.
  - Xac nhan mat khau khong khop.

### UC-02: Dang nhap va su dung token

- Requirement: FR-02, FR-12, SEC-02.
- API lien quan: `POST /api/login`, cac API can `Authorization: Bearer <token>`.
- Actor: User/Admin.
- Muc tieu: Dang nhap thanh cong va truy cap duoc chuc nang phu hop vai tro.
- Luong thay the nen kiem:
  - Sai thong tin dang nhap.
  - Tai khoan bi khoa sau 3 lan sai.
  - Token thieu/sai khi goi API bao mat.
  - User thu truy cap API admin.

### UC-03: Quen mat khau 2 buoc

- Requirement: FR-03, FR-22, SEC-07.
- API lien quan: `POST /api/forgot-password`, `POST /api/reset-password`.
- Actor: User da co tai khoan.
- Muc tieu: Lay OTP va dat lai mat khau moi.
- Luong chinh:
  1. Nhap email da dang ky.
  2. Nhan OTP 6 chu so.
  3. Nhap OTP, mat khau moi va xac nhan mat khau.
  4. He thong cap nhat mat khau.
- Luong thay the nen kiem:
  - Email khong ton tai.
  - OTP sai/email khac.
  - Mat khau moi yeu.
  - Confirm password khong khop.

### UC-04: Cap nhat ho so ca nhan

- Requirement: FR-04, SEC-06.
- API lien quan: `GET /api/users/me`, `PUT /api/users/me`.
- Actor: User da dang nhap.
- Muc tieu: Cap nhat ten, so dien thoai va dia chi giao hang.
- Luong thay the nen kiem:
  - So dien thoai khong bat dau bang `0`.
  - So dien thoai khong du 10-11 chu so.
  - Client gui kem `email` hoac `role` de thu thay doi.
  - User thu cap nhat ho so cua nguoi khac.

### UC-05: Tim kiem va xem chi tiet san pham

- Requirement: FR-05, FR-06, FR-21, FR-23, FR-24, SEC-04.
- API lien quan: `GET /api/products`, `GET /api/products/:id`.
- Actor: Khach truy cap hoac user.
- Muc tieu: Tim san pham, xem chi tiet va chon so luong.
- Luong thay the nen kiem:
  - Tu khoa khong co ket qua.
  - Tu khoa chua HTML/script phai hien thi an toan.
  - Product detail voi quantity khong hop le.
  - Anh san pham thieu `alt`.

### UC-06: Mua hang tu gio hang den checkout

- Requirement: FR-07, FR-08, FR-23, FR-24.
- API lien quan: `GET /api/cart`, `POST /api/cart`, `POST /api/checkout`.
- Actor: User da dang nhap.
- Muc tieu: Them san pham vao gio, dieu chinh so luong, dat hang thanh cong.
- Luong chinh:
  1. Them san pham vao gio.
  2. Xem gio hang va cap nhat so luong.
  3. Xac nhan thong tin thanh toan.
  4. Dat hang.
  5. He thong tao order va xoa gio hang.
- Luong thay the nen kiem:
  - Khach chua dang nhap thu checkout.
  - Client sua truc tiep `total_amount`.
  - Xoa item nhung khong xac nhan dialog.
  - Gio hang rong.

### UC-07: Ap dung ma giam gia khi checkout

- Requirement: FR-09.
- API lien quan: `POST /api/apply-coupon`.
- Actor: User da dang nhap.
- Muc tieu: Nhap coupon hop le va nhan tong tien sau giam.
- Luong thay the nen kiem:
  - `SAVE10` voi tong tien bang dung nguong 300,000 VND.
  - `BIGBUY` voi tong tien duoi/tren nguong.
  - `VIP100` dung du 2 lan va lan thu 3 bi tu choi.
  - `EXPIRED` bi tu choi.
  - Khong co JWT hop le.

### UC-08: User xem va huy don hang

- Requirement: FR-10, FR-11, FR-20.
- API lien quan: `GET /api/orders/my-orders`, `GET /api/orders/:id`, `PUT /api/orders/:id/cancel`.
- Actor: User da dang nhap.
- Muc tieu: Xem lich su don hang cua minh va huy don neu con duoc phep.
- Luong thay the nen kiem:
  - User xem don cua nguoi khac.
  - Huy don o `pending`.
  - Huy don o `confirmed`.
  - Huy don o `shipping` bi tu choi.
  - Trang thai hien thi bang tieng Viet va co mau phan biet.

### UC-09: Admin quan ly danh muc, san pham va import CSV

- Requirement: FR-12, FR-14, FR-15, FR-16.
- API lien quan:
  - Categories: `GET/POST/PUT/DELETE /api/categories`.
  - Products: `GET/POST/PUT/DELETE /api/products`.
  - Import: `POST /api/admin/import-products`.
- Actor: Admin.
- Muc tieu: Quan ly du lieu catalog va import nhieu san pham.
- Luong thay the nen kiem:
  - User thu goi API them/sua/xoa.
  - Ten danh muc rong.
  - Gia san pham <= 0.
  - Sua mot san pham khong lam thay doi san pham khac.
  - File/import data co mot dong loi thi rollback toan bo.
  - Truong CSV co dau phay trong dau nhay kep.

### UC-10: Admin quan ly coupon

- Requirement: FR-17.
- API lien quan: `GET /api/coupons`, `POST /api/admin/coupons`, `DELETE /api/admin/coupons/:id`.
- Actor: Admin.
- Muc tieu: Tao, xem va xoa ma giam gia.
- Luong thay the nen kiem:
  - `code` trung.
  - `type` khong phai `percent` hoac `fixed`.
  - `discount_value` khong duong.
  - `min_order_amount` am.
  - `max_uses_per_user` < 1.

### UC-11: Admin quan ly don hang va dashboard

- Requirement: FR-13, FR-18.
- API lien quan: `GET /api/admin/orders`, `PUT /api/admin/orders/:id/status`.
- Actor: Admin.
- Muc tieu: Xem tat ca don hang, cap nhat trang thai dung state machine, xem doanh thu.
- Luong thay the nen kiem:
  - Doanh thu chi tinh order `delivered`.
  - Dia chi giao hang chua HTML/script phai hien thi an toan.
  - Cap nhat trang thai hop le va khong hop le theo FR-10.

### UC-12: Admin quan ly nguoi dung

- Requirement: FR-19, FR-12.
- API lien quan: `GET /api/admin/users`, `DELETE /api/admin/users/:id`.
- Actor: Admin.
- Muc tieu: Xem danh sach user va xoa user khi hop le.
- Luong thay the nen kiem:
  - Danh sach khong lo mat khau.
  - Admin khong xoa duoc chinh tai khoan dang dang nhap.
  - User thu goi API admin bi tu choi.

## 4. Phan tich thiet ke test case cho FR-09 Coupon

### 4.1 Pham vi va test basis

- Requirement: FR-09 - Ma giam gia tai buoc Checkout.
- API lien quan:
  - `POST /api/apply-coupon`: tinh `discount_amount` va `final_amount`.
  - `POST /api/coupon-usage`: ghi nhan luot dung sau checkout thanh cong.
  - `GET /api/coupons`, `POST /api/admin/coupons`: dung de chuan bi/kiem tra du lieu coupon khi can.
- Dieu kien bat buoc cua FR-09:
  - C1: coupon ton tai va `is_active = 1`.
  - C2: ngay hien tai truoc `expired_at`.
  - C3: `total_amount >= min_order_amount`.
  - C4: user da dang nhap bang JWT hop le.
  - C5: `usage_count < max_uses_per_user`.
- Coupon mau:
  - `SAVE10`: percent 10%, min 300,000, max 1.
  - `BIGBUY`: fixed 50,000, min 500,000, max 1.
  - `VIP100`: fixed 100,000, min 300,000, max 2.
  - `EXPIRED`: percent 20%, min 100,000, max 1, expired 2020-01-01.

### 4.2 State Transition Testing design

#### State model

| State ID | State name          | Mo ta                                                                |
| -------- | ------------------- | -------------------------------------------------------------------- |
| S0       | `not_authenticated` | User khong co JWT hop le, khong du dieu kien C4.                     |
| S1       | `coupon_unknown`    | Ma khong ton tai hoac khong active, khong du dieu kien C1.           |
| S2       | `coupon_expired`    | Ma ton tai/active nhung da qua `expired_at`, khong du dieu kien C2.  |
| S3       | `below_min_order`   | Ma hop le ve ton tai/han dung nhung total duoi nguong C3.            |
| S4       | `eligible_unused`   | User dang nhap, coupon hop le, total du nguong, user con luot dung.  |
| S5       | `discount_applied`  | He thong da tra ve discount dung, nhung chua ghi nhan checkout xong. |
| S6       | `usage_recorded`    | Checkout thanh cong va usage cua user voi coupon da tang them 1.     |
| S7       | `usage_exhausted`   | User da dung du `max_uses_per_user`, lan tiep theo phai bi tu choi.  |

#### Transition table

| Transition ID | From | Event/Input                              | Guard                    | To  | Expected result                                                    |
| ------------- | ---- | ---------------------------------------- | ------------------------ | --- | ------------------------------------------------------------------ |
| ST-FR09-01    | S0   | Apply `SAVE10`, total 300,000, khong JWT | C4 false                 | S0  | Tu choi, khong tinh giam gia, khong tang usage.                    |
| ST-FR09-02    | S4   | Apply `SAVE10`, total 300,000            | C1-C5 true               | S5  | Thanh cong, `discount_amount = 30,000`, `final_amount = 270,000`.  |
| ST-FR09-03    | S5   | Checkout thanh cong voi coupon da apply  | Order created            | S6  | Ghi nhan 1 usage cho user/coupon.                                  |
| ST-FR09-04    | S6   | Apply lai `SAVE10`, total 300,000        | usage_count = 1, max = 1 | S7  | Tu choi vi het luot, khong doi total.                              |
| ST-FR09-05    | S4   | Apply `VIP100`, total 300,000 lan 1      | usage_count = 0, max = 2 | S5  | Thanh cong, `discount_amount = 100,000`, `final_amount = 200,000`. |
| ST-FR09-06    | S6   | Apply `VIP100`, total 300,000 lan 2      | usage_count = 1, max = 2 | S5  | Van thanh cong va co the ghi nhan usage lan 2 sau checkout.        |
| ST-FR09-07    | S6   | Apply `VIP100`, total 300,000 lan 3      | usage_count = 2, max = 2 | S7  | Tu choi vi het luot.                                               |
| ST-FR09-08    | S4   | Apply `BIGBUY`, total 499,999            | total < 500,000          | S3  | Tu choi vi chua du nguong, khong tang usage.                       |
| ST-FR09-09    | S4   | Apply `BIGBUY`, total 500,000            | total = min_order_amount | S5  | Thanh cong, `discount_amount = 50,000`, `final_amount = 450,000`.  |
| ST-FR09-10    | S2   | Apply `EXPIRED`, total 100,000           | expired_at < today       | S2  | Tu choi vi het han, khong tang usage.                              |
| ST-FR09-11    | S1   | Apply ma khong ton tai hoac inactive     | C1 false                 | S1  | Tu choi voi loi coupon khong hop le/khong active.                  |

#### State transition coverage

- Cover tat ca valid transition: S4 -> S5 -> S6, S6 -> S5 voi `VIP100` khi con luot.
- Cover invalid/final transition: S7 khong duoc quay lai S5 neu chua reset usage; S2/S3/S1 khong duoc ghi nhan usage.
- Cover boundary quan trong:
  - `total_amount = min_order_amount` phai duoc chap nhan theo FR-09.
  - `usage_count = max_uses_per_user - 1` phai duoc chap nhan.
  - `usage_count = max_uses_per_user` phai bi tu choi.
- Ghi chu phat hien loi tiem an:
  - Neu he thong dung `total_amount > min_order_amount` thay vi `>=`, test `SAVE10` 300,000 va `BIGBUY` 500,000 se fail.
  - Neu cong thuc percent khong dung `total * discount_value / 100`, test `SAVE10` se phat hien sai `discount_amount`.
  - Neu `POST /api/apply-coupon` khong yeu cau JWT hop le, test unauthenticated se phat hien sai C4.

### 4.3 Use Case Testing design

#### UC-FR09: Ap dung coupon trong checkout

- Primary actor: User da dang nhap.
- Goal: User nhap coupon tai checkout va nhan tong tien sau giam dung theo FR-09.
- Preconditions:
  - User co JWT hop le.
  - Gio hang co tong tien do backend tinh lai.
  - Coupon ton tai trong database.
  - Neu kiem C5, can co du lieu `coupon_usage` theo tung user/coupon.
- Trigger: User nhap coupon code va bam apply tai man hinh checkout.
- Main success scenario:
  1. User dang nhap va mo trang checkout.
  2. He thong hien thi danh sach san pham va tong tien backend tinh.
  3. User nhap `SAVE10`.
  4. He thong kiem C1-C5.
  5. He thong tinh `discount_amount = total * 10 / 100`.
  6. He thong hien thi `final_amount = total - discount_amount`.
  7. User dat hang thanh cong.
  8. He thong tao order va ghi nhan usage cua coupon cho user.
- Postconditions:
  - Neu checkout thanh cong: order luu dung coupon/discount va usage count tang 1.
  - Neu apply coupon fail: khong tao discount, khong tang usage, user van o checkout.

Neu trien khai thanh file test case theo skill, phan nay nen xem la Use Case goc; cac scenario con se duoc map thanh cac file `TC-[MODULE]-[NN].md`, con file tong hop coverage matrix se chong lai toan bo scenario.

#### Alternative/error flows

| Flow ID | Scenario                           | Test data                          | Expected result                                                                        |
| ------- | ---------------------------------- | ---------------------------------- | -------------------------------------------------------------------------------------- |
| A1      | Coupon dung tai bien min order     | `SAVE10`, total 300,000            | Chap nhan coupon, giam 30,000, final 270,000.                                          |
| A2      | Tong tien duoi nguong              | `BIGBUY`, total 499,999            | Tu choi, thong bao chua du gia tri toi thieu.                                          |
| A3      | Tong tien bang nguong fixed coupon | `BIGBUY`, total 500,000            | Chap nhan, giam 50,000, final 450,000.                                                 |
| A4      | Coupon het han                     | `EXPIRED`, total 100,000           | Tu choi vi het han.                                                                    |
| A5      | User chua dang nhap                | `SAVE10`, total 300,000, khong JWT | Tu choi vi can dang nhap.                                                              |
| A6      | Het luot dung                      | `SAVE10`, user da dung 1/1         | Tu choi vi dat gioi han.                                                               |
| A7      | Coupon con nhieu luot              | `VIP100`, user da dung 1/2         | Chap nhan lan tiep theo.                                                               |
| A8      | Lan sau khi het nhieu luot         | `VIP100`, user da dung 2/2         | Tu choi lan tiep theo.                                                                 |
| A9      | Ma khong ton tai                   | `NOPE999`, total 500,000           | Tu choi vi coupon khong ton tai/khong active.                                          |
| A10     | Client gui total bi sua            | Client gui total khac voi gio hang | Backend phai dung tong tien tinh lai tu gio hang khi checkout, khong tin total client. |

### 4.4 De xuat danh sach test case FR-09

| Test case ID   | Technique        | Muc tieu                                        | Preconditions                                  | Test data                                      | Expected result                                              |
| -------------- | ---------------- | ----------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- | ------------------------------------------------------------ |
| TC-FR09-ST-001 | State transition | Kiem apply coupon hop le tai bien min order     | User dang nhap, chua dung `SAVE10`             | `SAVE10`, total 300,000                        | S4 -> S5, giam 30,000, final 270,000.                        |
| TC-FR09-ST-002 | State transition | Kiem ghi nhan usage sau checkout                | TC-FR09-ST-001 da apply thanh cong             | Checkout thanh cong voi coupon_id cua `SAVE10` | S5 -> S6, usage tang 1.                                      |
| TC-FR09-ST-003 | State transition | Kiem het luot dung `SAVE10`                     | User da dung `SAVE10` 1/1                      | `SAVE10`, total 300,000                        | S6 -> S7, bi tu choi, usage khong tang.                      |
| TC-FR09-ST-004 | State transition | Kiem coupon nhieu luot `VIP100`                 | User da dung `VIP100` 1/2                      | `VIP100`, total 300,000                        | S6 -> S5, giam 100,000, final 200,000.                       |
| TC-FR09-ST-005 | State transition | Kiem chan lan thu 3 cua `VIP100`                | User da dung `VIP100` 2/2                      | `VIP100`, total 300,000                        | S6 -> S7, bi tu choi.                                        |
| TC-FR09-ST-006 | State transition | Kiem coupon expired la invalid state            | User dang nhap                                 | `EXPIRED`, total 100,000                       | O S2, bi tu choi vi het han, usage khong tang.               |
| TC-FR09-ST-007 | State transition | Kiem below min order khong duoc apply           | User dang nhap                                 | `BIGBUY`, total 499,999                        | S4 -> S3, bi tu choi.                                        |
| TC-FR09-ST-008 | State transition | Kiem fixed coupon tai bien min order            | User dang nhap, chua dung `BIGBUY`             | `BIGBUY`, total 500,000                        | S4 -> S5, giam 50,000, final 450,000.                        |
| TC-FR09-UC-001 | Use case         | Luong chinh apply coupon va checkout thanh cong | User dang nhap, gio hang total 300,000         | `SAVE10`                                       | Coupon apply thanh cong, order tao thanh cong, usage tang 1. |
| TC-FR09-UC-002 | Use case         | Khach chua dang nhap khong duoc dung coupon     | Khong JWT                                      | `SAVE10`, total 300,000                        | Bi tu choi theo C4, khong hien final discounted amount.      |
| TC-FR09-UC-003 | Use case         | Ma khong ton tai/khong active                   | User dang nhap                                 | `NOPE999`, total 500,000                       | Bi tu choi theo C1.                                          |
| TC-FR09-UC-004 | Use case         | Backend khong tin total client gui len          | User dang nhap, gio hang backend total 300,000 | Client sua total thanh 3,000,000               | Discount/final phai dua tren 300,000 khi checkout.           |
| TC-FR09-UC-005 | Use case         | Percent discount dung cong thuc                 | User dang nhap, chua dung `SAVE10`             | `SAVE10`, total 500,000                        | `discount_amount = 50,000`, `final_amount = 450,000`.        |
| TC-FR09-UC-006 | Use case         | Fixed discount dung cong thuc                   | User dang nhap, chua dung `BIGBUY`             | `BIGBUY`, total 600,000                        | `discount_amount = 50,000`, `final_amount = 550,000`.        |

### 4.5 Ket luan thiet ke cho FR-09

- State Transition Testing nen tap trung vao vong doi tu `eligible_unused` -> `discount_applied` -> `usage_recorded` -> `usage_exhausted`, cong them cac state loi `not_authenticated`, `coupon_unknown`, `coupon_expired`, `below_min_order`.
- Use Case Testing nen tap trung vao luong checkout that su cua user: apply coupon, thay doi tong tien hien thi, dat hang, va ghi nhan usage sau khi order thanh cong.
- Cac test co kha nang bat loi cao nhat la boundary `total_amount = min_order_amount`, usage limit cua `VIP100`, JWT bat buoc, va cong thuc percent discount.

## 5. Ma tran anh xa nhanh

| Requirement               | State Transition Testing | Use Case Testing | Ghi chu                                                                            |
| ------------------------- | ------------------------ | ---------------- | ---------------------------------------------------------------------------------- |
| FR-01 Dang ky             | Khong uu tien            | Co               | Nen dung equivalence/boundary cho email/password, ket hop use case.                |
| FR-02 Dang nhap/khoa      | Co                       | Co               | Ung vien state transition tot do co counter va locked state.                       |
| FR-03 Quen mat khau       | Co                       | Co               | Co vong doi OTP va luong 2 buoc.                                                   |
| FR-04 Ho so               | Khong uu tien            | Co               | Phu hop use case va negative/security testing.                                     |
| FR-05 Danh sach/tim kiem  | Khong uu tien            | Co               | Phu hop luong khach hang va UI/security checks.                                    |
| FR-06 Chi tiet san pham   | Khong uu tien            | Co               | Phu hop use case them vao gio.                                                     |
| FR-07 Gio hang            | Co                       | Co               | Co state gio hang va quantity transitions.                                         |
| FR-08 Checkout            | Co                       | Co               | Co transition checkout -> order created -> cart cleared.                           |
| FR-09 Coupon              | Co                       | Co               | Co usage count va decision states.                                                 |
| FR-10 Trang thai don hang | Co                       | Co               | Ung vien manh nhat cho state transition.                                           |
| FR-11 Lich su don hang    | Khong uu tien            | Co               | Tap trung ownership va hien thi trang thai.                                        |
| FR-12 Access control      | Khong uu tien            | Co               | Phu hop use case theo role va security testing.                                    |
| FR-13 Dashboard           | Khong uu tien            | Co               | Luong admin xem doanh thu, can kiem cong thuc.                                     |
| FR-14 Category CRUD       | Khong uu tien            | Co               | CRUD use case.                                                                     |
| FR-15 Product CRUD        | Khong uu tien            | Co               | CRUD use case va validation.                                                       |
| FR-16 Import CSV          | Co mot phan              | Co               | Co rollback state, nhung chinh yeu la use case import.                             |
| FR-17 Coupon CRUD         | Co mot phan              | Co               | State cua coupon ho tro FR-09.                                                     |
| FR-18 Admin orders        | Co                       | Co               | Dung lai state machine FR-10 voi actor admin.                                      |
| FR-19 Admin users         | Khong uu tien            | Co               | Ownership/self-delete rule.                                                        |
| FR-20 Mobile              | Co                       | Co               | Dac biet la huy don theo FR-10.                                                    |
| FR-21-FR-24 GUI           | Khong uu tien            | Co               | Nen gan vao cac use case UI tuong ung.                                             |
| SEC-01-SEC-07             | Co mot phan              | Co mot phan      | SEC-07 phu hop state transition OTP; cac muc khac phu hop security/negative tests. |

## 6. Thu tu uu tien de viet test case

1. FR-10/FR-18/FR-20 - State transition cho don hang.
2. FR-02 - State transition cho dang nhap sai va khoa tai khoan.
3. FR-08/FR-09 - Use case checkout kem coupon va tinh lai tong tien o backend.
4. FR-03/SEC-07 - Use case va state transition cho OTP reset password.
5. FR-12/FR-14/FR-15/FR-16/FR-17/FR-19 - Use case admin va access control.
6. FR-05/FR-06/FR-07/FR-11/FR-21-FR-24 - Use case UI nguoi dung, gio hang va lich su don.
