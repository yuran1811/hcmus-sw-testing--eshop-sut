# Test Taxonomy — bảng phân miền & mẫu thiết kế

Mục lục:
1. Domain partition theo kiểu dữ liệu
2. Mẫu bảng state transition
3. Mẫu case theo từng FR của EShop
4. Quy ước đặt tên assertion

---

## 1. Domain partition theo kiểu dữ liệu

Với mỗi tham số, lấy đủ 3 nhóm: **valid class**, **invalid class**, **boundary**.

### string (tên, mô tả, địa chỉ)

| Lớp | Giá trị | Kỳ vọng |
|---|---|---|
| valid | độ dài giữa min–max, ký tự thường | 2xx |
| boundary | đúng min | 2xx |
| boundary | đúng max | 2xx |
| boundary | min − 1 ký tự | 400 |
| boundary | max + 1 ký tự | 400 |
| invalid | chuỗi rỗng `""` | 400 |
| invalid | chỉ khoảng trắng `"   "` | 400 (kiểm tra có trim không) |
| invalid | ký tự unicode/emoji `"Nguyễn 🎉"` | 2xx nếu spec cho phép UTF-8 — case này hay lộ bug encoding |
| invalid | null | 400 |
| invalid | gửi number thay vì string | 400 |

### number (price, quantity, page, limit)

| Lớp | Giá trị | Kỳ vọng |
|---|---|---|
| valid | giá trị giữa miền | 2xx |
| boundary | 0 | tuỳ spec — price=0 thường 400, quantity=0 nghĩa là xoá item? |
| boundary | giá trị hợp lệ nhỏ nhất (vd 1) | 2xx |
| boundary | giá trị hợp lệ lớn nhất | 2xx |
| invalid | số âm `-1` | 400 |
| invalid | số thực cho field integer `1.5` | 400 |
| invalid | vượt max int / `999999999999` | 400, không 500 |
| invalid | chuỗi `"abc"` | 400 |
| invalid | notation lạ `1e5`, `0x10` | 400 |

### email

valid: `a@b.com` · boundary: local-part 1 ký tự, domain nhiều cấp `a@b.co.uk`
invalid: thiếu `@`, thiếu domain, hai `@`, khoảng trắng giữa, `a@b`, chuỗi > 255 ký tự, unicode domain
Đặc biệt: email đã tồn tại (unique constraint) → 409 chứ không 400.

### password

valid: đủ độ dài + đủ loại ký tự theo spec
invalid: ngắn hơn min, chỉ chữ thường, chỉ số, chứa khoảng trắng, giống hệt email/username, chuỗi rất dài (kiểm tra bcrypt truncation ở 72 byte — case này AI gần như luôn bỏ sót)

### enum (status, role, sortBy)

valid: từng giá trị hợp lệ (mỗi giá trị 1 case)
invalid: giá trị không thuộc enum, sai hoa/thường `"PENDING"` vs `"pending"`, chuỗi rỗng, giá trị của enum khác

### id / resource identifier

valid: id tồn tại thuộc về mình
invalid: id không tồn tại → 404 · id sai định dạng (chữ thay số, uuid hỏng) → 400 · id của user khác → 403/404 (**IDOR**) · id đã bị xoá mềm → 404 · id âm hoặc 0

### date / datetime

valid: ISO 8601 hợp lệ · boundary: đúng thời điểm hết hạn (coupon expiry) — test cả trước 1 giây và sau 1 giây
invalid: `"2026-02-30"`, `"31/12/2026"` (sai format), timezone thiếu, ngày quá khứ cho field yêu cầu tương lai

### array (danh sách item trong cart, CSV import)

valid: 1 phần tử, nhiều phần tử
boundary: mảng rỗng `[]`, số phần tử tối đa cho phép, vượt tối đa 1
invalid: phần tử trùng lặp, phần tử null, gửi object thay vì array

---

## 2. Mẫu bảng state transition

Điền **mọi ô**, không chỉ đường đi hạnh phúc. Mỗi ô = 1 test case.

| Từ \ Hành động | confirm | ship | deliver | cancel | Ghi chú |
|---|---|---|---|---|---|
| pending | 200 | 400/409 | 400/409 | 200 | |
| confirmed | 400/409 | 200 | 400/409 | ? | spec có cho huỷ sau confirm không? |
| shipping | 400/409 | 400/409 | 200 | 400/409 | |
| delivered | 400/409 | 400/409 | 400/409 | 400/409 | trạng thái cuối |
| cancelled | 400/409 | 400/409 | 400/409 | 400/409 | trạng thái cuối |

Các case bổ sung quanh state machine mà AI hay bỏ sót:

- **Nhảy cóc**: pending → delivered trực tiếp
- **Lặp lại**: gọi confirm hai lần liên tiếp trên cùng đơn (idempotency)
- **Race condition**: hai request đổi trạng thái gửi gần như đồng thời — kiểm tra không tạo trạng thái không hợp lệ
- **Cross-actor**: user tự đổi trạng thái đơn của mình sang `delivered` (chỉ admin được phép)
- **Trạng thái vs dữ liệu liên quan**: huỷ đơn đã trừ kho — kho có được hoàn lại không? coupon đã dùng có được trả lại lượt không?
- **Order đã cancel rồi thanh toán**, hoặc thêm item vào cart đã checkout

Cho account lockout (FR-02): trạng thái `active → (N lần sai) → locked → (reset/hết thời gian) → active`. Test cả case đăng nhập **đúng mật khẩu khi đang locked** — phải vẫn bị chặn.

Cho reset password 2 bước (FR-03): token dùng lại lần 2, token của user khác, token hết hạn, đặt lại mật khẩu trùng mật khẩu cũ, gọi bước 2 mà chưa qua bước 1.

---

## 3. Gợi ý điểm nóng theo FR

| FR | Điểm dễ có bug, nên tập trung |
|---|---|
| FR-02 Login/lockout | đếm số lần sai reset khi nào; lockout theo account hay theo IP; timing attack lộ email tồn tại |
| FR-03 Reset password | token reuse, token không hết hạn, enumeration qua thông báo lỗi |
| FR-05 Search | SQLi qua query param, sort field tuỳ ý, pagination limit vượt trần, ký tự đặc biệt `%`, `_` trong LIKE |
| FR-07 Cart | thêm quantity âm, thêm sản phẩm đã bị xoá, cart của user khác, tổng tiền tính lại server-side hay tin client |
| FR-08 Checkout | giá gửi từ client, tồn kho không đủ, checkout cart rỗng, double submit tạo 2 đơn |
| FR-09 Coupon | coupon hết hạn đúng biên, dùng lại coupon một-lần, cộng dồn nhiều coupon, coupon làm tổng tiền âm |
| FR-15 Product admin | mass assignment `id`, giá âm, xoá sản phẩm đang nằm trong đơn |
| FR-18 Order admin | invalid transition, đổi trạng thái đơn không tồn tại, user thường gọi được endpoint admin |
| FR-19 User admin | admin tự hạ quyền chính mình, xoá admin cuối cùng, đổi role qua endpoint profile thường |

---

## 4. Quy ước đặt tên assertion

Dùng tiền tố để phân loại, giúp đọc Newman report và map ngược về test case:

```
Functional: <hành vi nghiệp vụ>       — vd "Functional: Returns 403 when user lacks admin role"
Contract:   <ràng buộc schema>        — vd "Contract: Response matches OrderDetail schema"
Security:   <ràng buộc bảo mật>       — vd "Security: Does not expose passwordHash in response"
Performance:<ràng buộc thời gian>     — vd "Performance: Response time under 1000ms"
```

Không gộp kiểm tra schema và kiểm tra giá trị nghiệp vụ vào cùng một `pm.test` — khi fail sẽ không biết hỏng ở đâu.
