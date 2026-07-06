# FR-01: Đăng ký tài khoản — Test Design (Decision Table Testing)

**Kỹ thuật:** Decision Table Testing (DTT)  
**Feature:** FR-01 — Account Register  
**Mô tả:** Hệ thống quyết định cho/không cho đăng ký dựa trên 4 điều kiện kết hợp.

---

## Bước 1 — Xác định Conditions & Effects

### Conditions (Điều kiện đầu vào)

| ID | Điều kiện | Giá trị | Ghi chú |
|----|-----------|---------|---------|
| C1 | Email có đúng định dạng không? | T / F | Kiểm tra regex/HTML5 email format |
| C2 | Email chưa tồn tại trong hệ thống? | T / F | Kiểm tra tính duy nhất trong DB |
| C3 | Mật khẩu đủ mạnh không? | T / F | ≥8 ký tự, có chữ hoa, chữ thường, số, ký tự đặc biệt (`@$!%*?&`) |
| C4 | Xác nhận mật khẩu khớp với mật khẩu? | T / F | Hai trường password phải bằng nhau |

**Ví dụ giá trị đại diện:**

| Điều kiện | Giá trị T (hợp lệ) | Giá trị F (không hợp lệ) |
|-----------|-------------------|--------------------------|
| C1 | `user@example.com` | `notanemail`, `user@`, `@domain.com` |
| C2 | Email chưa có trong DB | Email đã đăng ký trước đó |
| C3 | `Abc@123456` | `abc123`, `abcdefgh`, `Abc 12345` |
| C4 | Nhập lại đúng password | Nhập khác với password gốc |

### Effects (Hiệu ứng quan sát được)

| ID | Hiệu ứng | Loại | Điều kiện kích hoạt |
|----|----------|------|---------------------|
| E1 | Đăng ký thành công — tạo tài khoản, redirect sang trang Login | Allow | C1=T ∧ C2=T ∧ C3=T ∧ C4=T |
| E2 | Hiển thị lỗi: "Email không đúng định dạng" | Deny | C1=F |
| E3 | Hiển thị lỗi: "Email đã được sử dụng" | Deny | C1=T ∧ C2=F |
| E4 | Hiển thị lỗi: "Mật khẩu quá yếu" | Deny | C3=F |
| E5 | Hiển thị lỗi: "Xác nhận mật khẩu không khớp" | Deny | C4=F |

> **Ghi chú:** Hệ thống có thể hiển thị nhiều lỗi cùng lúc (E2+E4, E3+E5, v.v.) khi nhiều điều kiện cùng sai. Mỗi effect được kiểm tra **độc lập** — không short-circuit.  
> **Ngoại lệ:** Khi C1=F, hệ thống không query DB kiểm tra C2 → E3 không được raise ngay cả khi email đã tồn tại.

**Tóm tắt:**
- Số điều kiện (N): 4 (tất cả binary)
- Tổng số tổ hợp đầy đủ: 2⁴ = **16 cột**
- Sau rút gọn: **12 test cases**
- Số effects: 5 (1 Allow + 4 Deny)

---

## Bước 2 — Bảng Chân Trị Đầy Đủ (Ground Truth)

**Quy ước:** T = điều kiện đúng | F = điều kiện sai | Y = effect xảy ra | N = effect không xảy ra | — = không áp dụng

|  | TC01 | TC02 | TC03 | TC04 | TC05 | TC06 | TC07 | TC08 | TC09 | TC10 | TC11 | TC12 | TC13 | TC14 | TC15 | TC16 |
|--|:----:|:----:|:----:|:----:|:----:|:----:|:----:|:----:|:----:|:----:|:----:|:----:|:----:|:----:|:----:|:----:|
| **C1** Email hợp lệ? | T | T | T | T | T | T | T | T | F | F | F | F | F | F | F | F |
| **C2** Email duy nhất? | T | T | T | T | F | F | F | F | T | T | T | T | F | F | F | F |
| **C3** Mật khẩu mạnh? | T | T | F | F | T | T | F | F | T | T | F | F | T | T | F | F |
| **C4** Xác nhận khớp? | T | F | T | F | T | F | T | F | T | F | T | F | T | F | T | F |
| | | | | | | | | | | | | | | | | |
| **E1** Đăng ký thành công | Y | N | N | N | N | N | N | N | N | N | N | N | N | N | N | N |
| **E2** Lỗi email không hợp lệ | N | N | N | N | N | N | N | N | Y | Y | Y | Y | Y | Y | Y | Y |
| **E3** Lỗi email đã tồn tại | N | N | N | N | Y | Y | Y | Y | N | N | N | N | — | — | — | — |
| **E4** Lỗi mật khẩu yếu | N | N | Y | Y | N | N | Y | Y | N | N | Y | Y | N | N | Y | Y |
| **E5** Lỗi xác nhận không khớp | N | Y | N | Y | N | Y | N | Y | N | Y | N | Y | N | Y | N | Y |

> **Ghi chú TC13–TC16 (E3=—):** Khi C1=F, hệ thống không kiểm tra tính duy nhất trong DB → E3 không được kích hoạt dù C2=F. Đây là cơ sở để gộp ở bước 3a.

---

## Bước 3 — Rút Gọn Bảng (Reduced Table)

### Bước 3a — Loại bỏ tổ hợp không thể xảy ra

Khi C1=F, giá trị C2 không ảnh hưởng đến kết quả (hệ thống không query DB) → C2 trở thành **don't care (–)**. Các cặp sau có hiệu ứng giống hệt nhau:

| Cặp gộp | Hiệu ứng |
|---------|----------|
| TC09 (F,T,T,T) + TC13 (F,F,T,T) | E2 |
| TC10 (F,T,T,F) + TC14 (F,F,T,F) | E2 + E5 |
| TC11 (F,T,F,T) + TC15 (F,F,F,T) | E2 + E4 |
| TC12 (F,T,F,F) + TC16 (F,F,F,F) | E2 + E4 + E5 |

**16 cột → 12 cột** sau khi gộp.

### Bước 3b — Gộp cột hiệu ứng giống nhau

Trong 8 cột C1=T còn lại, không có cặp nào khác nhau đúng 1 điều kiện mà cho cùng tập hiệu ứng → **không gộp thêm**.

### Bảng rút gọn cuối cùng — 12 test cases

| | **TC01** | **TC02** | **TC03** | **TC04** | **TC05** | **TC06** | **TC07** | **TC08** | **TC09** | **TC10** | **TC11** | **TC12** |
|--|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| **C1** Email hợp lệ? | T | T | T | T | T | T | T | T | F | F | F | F |
| **C2** Email duy nhất? | T | T | T | T | F | F | F | F | – | – | – | – |
| **C3** Mật khẩu mạnh? | T | T | F | F | T | T | F | F | T | T | F | F |
| **C4** Xác nhận khớp? | T | F | T | F | T | F | T | F | T | F | T | F |
| | | | | | | | | | | | | |
| **E1** Đăng ký thành công | **Y** | N | N | N | N | N | N | N | N | N | N | N |
| **E2** Lỗi email không hợp lệ | N | N | N | N | N | N | N | N | **Y** | **Y** | **Y** | **Y** |
| **E3** Lỗi email đã tồn tại | N | N | N | N | **Y** | **Y** | **Y** | **Y** | N | N | N | N |
| **E4** Lỗi mật khẩu yếu | N | N | **Y** | **Y** | N | N | **Y** | **Y** | N | N | **Y** | **Y** |
| **E5** Lỗi xác nhận không khớp | N | **Y** | N | **Y** | N | **Y** | N | **Y** | N | **Y** | N | **Y** |

### Ánh xạ sang Test Case

| Test case | C1 | C2 | C3 | C4 | Kết quả mong đợi |
|-----------|:--:|:--:|:--:|:--:|-------------------|
| TC01 | T | T | T | T | E1: Đăng ký thành công |
| TC02 | T | T | T | F | E5: Xác nhận không khớp |
| TC03 | T | T | F | T | E4: Mật khẩu yếu |
| TC04 | T | T | F | F | E4 + E5 |
| TC05 | T | F | T | T | E3: Email đã tồn tại |
| TC06 | T | F | T | F | E3 + E5 |
| TC07 | T | F | F | T | E3 + E4 |
| TC08 | T | F | F | F | E3 + E4 + E5 |
| TC09 | F | – | T | T | E2: Email không hợp lệ |
| TC10 | F | – | T | F | E2 + E5 |
| TC11 | F | – | F | T | E2 + E4 |
| TC12 | F | – | F | F | E2 + E4 + E5 |

---

*Xem file test cases: [../test-cases/register/TC-REGISTER-DTT.md](../test-cases/register/TC-REGISTER-DTT.md)*

---

## Pairwise Coverage Verification

**Mục đích:** Kiểm tra xem 12 TC từ DTT có bỏ sót tổ hợp cặp (2-way pair) nào không, và xác định có cần bổ sung TC theo pairwise testing không.

### Tại sao áp dụng pairwise ở đây

Pairwise phù hợp khi full factorial quá lớn. Với FR-01 có 4 tham số binary (2 giá trị mỗi tham số), full factorial = 2⁴ = 16 — nằm trong vùng DTT xử lý tốt. Tuy nhiên, pairwise được dùng để **kiểm chứng** rằng DTT không bỏ sót tổ hợp cặp nào.

### Bước 1 — Tham số & giá trị

| Tham số | Giá trị |
|---------|---------|
| P1 (C1): Email hợp lệ | T, F |
| P2 (C2): Email duy nhất | T, F |
| P3 (C3): Mật khẩu mạnh | T, F |
| P4 (C4): Xác nhận khớp | T, F |

**Full factorial:** 2 × 2 × 2 × 2 = 16  
**Pairwise target:** ~8–9 TC (phủ hết 6 cặp × 4 combo = 24 unique pairs)  
**DTT hiện có:** 12 TC → lớn hơn pairwise target, khả năng phủ đầy đủ.

### Bước 2 — Kiểm tra 24 pairs trên 12 TC của DTT

Các cặp cần cover (mỗi cặp 4 combo: TT, TF, FT, FF):

**P1 × P2** *(ghi chú: TC09–TC12 có C2=–, tức don't care — bao hàm cả T lẫn F)*

| Pair | TC bao phủ | Trạng thái |
|------|-----------|-----------|
| (T, T) | TC01, TC02, TC03, TC04 | ✓ |
| (T, F) | TC05, TC06, TC07, TC08 | ✓ |
| (F, T) | TC09–TC12 (C2=–, bao hàm T) | ✓ |
| (F, F) | TC09–TC12 (C2=–, bao hàm F) | ✓ |

**P1 × P3**

| Pair | TC bao phủ | Trạng thái |
|------|-----------|-----------|
| (T, T) | TC01, TC02, TC05, TC06 | ✓ |
| (T, F) | TC03, TC04, TC07, TC08 | ✓ |
| (F, T) | TC09, TC10 | ✓ |
| (F, F) | TC11, TC12 | ✓ |

**P1 × P4**

| Pair | TC bao phủ | Trạng thái |
|------|-----------|-----------|
| (T, T) | TC01, TC03, TC05, TC07 | ✓ |
| (T, F) | TC02, TC04, TC06, TC08 | ✓ |
| (F, T) | TC09, TC11 | ✓ |
| (F, F) | TC10, TC12 | ✓ |

**P2 × P3** *(chỉ xét khi C1=T, vì C2=– khi C1=F)*

| Pair | TC bao phủ | Trạng thái |
|------|-----------|-----------|
| (T, T) | TC01, TC02 | ✓ |
| (T, F) | TC03, TC04 | ✓ |
| (F, T) | TC05, TC06 | ✓ |
| (F, F) | TC07, TC08 | ✓ |

**P2 × P4** *(chỉ xét khi C1=T)*

| Pair | TC bao phủ | Trạng thái |
|------|-----------|-----------|
| (T, T) | TC01, TC03 | ✓ |
| (T, F) | TC02, TC04 | ✓ |
| (F, T) | TC05, TC07 | ✓ |
| (F, F) | TC06, TC08 | ✓ |

**P3 × P4**

| Pair | TC bao phủ | Trạng thái |
|------|-----------|-----------|
| (T, T) | TC01, TC05, TC09 | ✓ |
| (T, F) | TC02, TC06, TC10 | ✓ |
| (F, T) | TC03, TC07, TC11 | ✓ |
| (F, F) | TC04, TC08, TC12 | ✓ |

### Kết luận

| Hạng mục | Kết quả |
|----------|---------|
| Tổng số unique pairs cần cover | 24 |
| Số pairs đã được cover bởi 12 TC DTT | 24 |
| Pairs bị bỏ sót | **0** |
| Test cases cần bổ sung | **Không có** |

> **DTT đã bao phủ toàn bộ 24 pairwise combinations.** Điều này hợp lý vì FR-01 chỉ có 4 điều kiện binary — full DTT (12 TC) là superset của pairwise (~8–9 TC). Pairwise không bổ sung test case mới mà thay vào đó xác nhận bộ 12 TC là đầy đủ theo tiêu chí 2-way coverage.
>
> **Lưu ý quan trọng:** Pairwise sẽ có ích hơn nếu FR-01 mở rộng thêm tham số không phải binary (ví dụ: loại thiết bị, trình duyệt, locale) — lúc đó kết hợp DTT cho business rules + pairwise cho configuration parameters.
