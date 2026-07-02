# QA Test Design: Mã Giảm Giá (Coupon)

**Ngày:** 2026-06-29 · **Phương pháp:** DTT & Pairwise (độc lập, có so sánh) · **Spec nguồn:** `docs/anh-khoa/feature-specs/FR-09 Mã Giảm Giá.md`

> ⛔ Test design này lấy **spec FR-09 làm oracle duy nhất**. Không đọc source code để đoán bug hay suy ra expected outcome. Mọi outcome đều trích từ "Business Rules" và "Expected Outcomes" của spec.

## TÓM TẮT KẾT QUẢ

| Hạng mục               | Kết quả                                                              |
| ---------------------- | -------------------------------------------------------------------- |
| Số conditions          | 5 (C1–C5) + 1 factor `type` (percent/fixed)                          |
| Tổ hợp lý thuyết       | 2⁵ = 32 (chưa tính `type`)                                           |
| Tổ hợp khả thi         | 10 rule (sau khi áp dependency C4→C1→{C2,C3,C5})                     |
| DTT: rule sau rút gọn  | 6 rule (oracle xác định) → 7 test case (split `type` ở rule success) |
| Pairwise: số test case | 8 (6 core + 2 gate)                                                  |
| **Bộ được chọn ship**  | **DTT**                                                              |
| **Số test case cuối**  | **7** (`TC-COUPON-DTT-001` … `TC-COUPON-DTT-007`)                    |

---

## [STEP 0] Phân tích Spec

### Conditions:

| #   | Condition                                          | Giá trị có thể      |
| --- | -------------------------------------------------- | ------------------- |
| C1  | Mã tồn tại & đang active (`is_active = 1`)         | Y / N               |
| C2  | Còn hạn sử dụng (today < `expired_at`)             | Y / N               |
| C3  | Đủ ngưỡng (`total >= min_order_amount`)            | Y / N               |
| C4  | Đã đăng nhập (JWT Token hợp lệ)                    | Y / N               |
| C5  | Chưa dùng hết lượt (`usage_count < max`)           | Y / N               |
| —   | `type` (factor công thức, chỉ ý nghĩa khi success) | `percent` / `fixed` |

### Actions / Outcomes:

| #   | Action/Outcome                                                                                                 |
| --- | -------------------------------------------------------------------------------------------------------------- |
| A1  | **Áp mã thành công**: tính `discount_amount`, trả `final_amount = total − discount_amount`, cập nhật tổng tiền |
| A2  | Từ chối — C1 sai → "mã không hợp lệ / không tồn tại"                                                           |
| A3  | Từ chối — C2 sai → "mã đã hết hạn"                                                                             |
| A4  | Từ chối — C3 sai → "chưa đạt giá trị đơn hàng tối thiểu"                                                       |
| A5  | Từ chối — C4 sai → "yêu cầu đăng nhập" (HTTP 401)                                                              |
| A6  | Từ chối — C5 sai → "đã dùng hết lượt cho phép"                                                                 |

### Ghi chú (rule ẩn / dependency):

- **AND nghiêm ngặt:** success chỉ khi C1 ∧ C2 ∧ C3 ∧ C4 ∧ C5 đều Y (spec "Business Rules").
- **Dependency gating (suy ra từ ngữ nghĩa spec):**
  - **C4 là cổng auth ngoài cùng:** không có/sai JWT → request trả **HTTP 401** ngay (lỗi ở tầng auth, khác hẳn lỗi nghiệp vụ coupon). Khi C4=N, các điều kiện coupon C1,C2,C3,C5 **chưa được đánh giá** → `N/A`.
  - **C1 là cổng tồn-tại:** nếu mã không tồn tại / inactive thì không có dòng coupon để đọc `expired_at`, `min_order_amount`, `max_uses_per_user` → C2,C3,C5 `N/A` khi C1=N.
- **Ambiguity ẩn — thứ tự thông báo lỗi khi NHIỀU điều kiện cùng sai:** spec gán mỗi điều kiện một message riêng nhưng **không quy định ưu tiên** khi ≥2 điều kiện đồng thời sai (vd C2=N và C3=N). ⇒ Với các tổ hợp đa-lỗi, **oracle (message nào) không xác định theo spec**. Vì vậy test design chỉ chốt expected outcome cho các rule **đơn-lỗi** (mỗi reject quy về đúng 1 điều kiện) — xem [A2] rút gọn.
- **Boundary (BVA) đáng chú ý theo spec:** C3 dùng `>=` ⇒ `total = min_order_amount` phải **được chấp nhận**; C5 dùng `<` ⇒ `usage_count = max` phải **bị từ chối**. Các giá trị biên này được nhúng vào Test Data của rule tương ứng.

---

## [STEP 1] Phân loại điều kiện + đếm tổ hợp khả thi

| Condition | Loại        | Số giá trị | Dependency                                          |
| --------- | ----------- | ---------- | --------------------------------------------------- |
| C1        | Binary      | 2          | Gating: khi C1=N ⇒ C2,C3,C5 = N/A                   |
| C2        | Binary/Dep. | 2          | Áp dụng khi C4=Y **và** C1=Y                        |
| C3        | Binary/Dep. | 2          | Áp dụng khi C4=Y **và** C1=Y                        |
| C4        | Binary      | 2          | Gating ngoài cùng: khi C4=N ⇒ C1,C2,C3,C5 = N/A     |
| C5        | Binary/Dep. | 2          | Áp dụng khi C4=Y **và** C1=Y                        |
| `type`    | Multi-value | 2          | Chỉ ảnh hưởng giá trị `discount_amount` khi success |

**Tổ hợp lý thuyết:** 2 × 2 × 2 × 2 × 2 = **32** (chưa tính `type`).

**Tổ hợp khả thi** (áp hierarchy `C4 → C1 → {C2,C3,C5}`, BỎ chiều của condition đang N/A):

- Nhánh **C4=N**: C1,C2,C3,C5 = N/A → bỏ hết các chiều đó → **1 rule**.
- Nhánh **C4=Y, C1=N**: C2,C3,C5 = N/A → bỏ 3 chiều đó → **1 rule**.
- Nhánh **C4=Y, C1=Y**: C2,C3,C5 tự do → 2 × 2 × 2 = **8 rule**.

→ **Khả thi = 1 + 1 + 8 = 10 rule** (KHÔNG phải 32). `type` chỉ nhân đôi **rule success** (1 rule) ở mức test case, không làm phình bảng quyết định reject.

---

## TRACK A — Decision Table Testing

### [A1] Full Decision Table (10 rule khả thi)

| Cond/Action            | R1  | R2  | R3  | R4  | R5  | R6  | R7  | R8  | R9  | R10 |
| ---------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| C4 (đăng nhập)         | Y   | Y   | Y   | Y   | Y   | Y   | Y   | Y   | Y   | N   |
| C1 (tồn tại & active)  | Y   | Y   | Y   | Y   | Y   | Y   | Y   | Y   | N   | N/A |
| C2 (còn hạn)           | Y   | Y   | Y   | Y   | N   | N   | N   | N   | N/A | N/A |
| C3 (đủ ngưỡng)         | Y   | Y   | N   | N   | Y   | Y   | N   | N   | N/A | N/A |
| C5 (còn lượt)          | Y   | N   | Y   | N   | Y   | N   | Y   | N   | N/A | N/A |
| **A1** Thành công      | ✓   | ✗   | ✗   | ✗   | ✗   | ✗   | ✗   | ✗   | ✗   | ✗   |
| **A2** C1→không hợp lệ | ✗   | ✗   | ✗   | ✗   | ✗   | ✗   | ✗   | ✗   | ✓   | ✗   |
| **A3** C2→hết hạn      | ✗   | ✗   | ✗   | ✗   | ✓   | ⚠   | ⚠   | ⚠   | ✗   | ✗   |
| **A4** C3→chưa đủ min  | ✗   | ✗   | ✓   | ⚠   | ✗   | ✗   | ⚠   | ⚠   | ✗   | ✗   |
| **A5** C4→401          | ✗   | ✗   | ✗   | ✗   | ✗   | ✗   | ✗   | ✗   | ✗   | ✓   |
| **A6** C5→hết lượt     | ✗   | ✓   | ✗   | ⚠   | ✗   | ⚠   | ✗   | ⚠   | ✗   | ✗   |

**Giải thích outcome:**

- **R1**: cả 5 điều kiện Y → **Thành công** (A1). (Sẽ split theo `type` ở [A3].)
- **R2** (chỉ C5=N): single-lỗi → A6 "hết lượt".
- **R3** (chỉ C3=N): single-lỗi → A4 "chưa đủ min".
- **R5** (chỉ C2=N): single-lỗi → A3 "hết hạn".
- **R9** (C1=N): A2 "không hợp lệ"; C2,C3,C5 N/A (chưa có dòng coupon để đọc).
- **R10** (C4=N): A5 "401"; toàn bộ điều kiện coupon N/A (chưa qua auth).
- **R4, R6, R7, R8** (≥2 điều kiện cùng N): vẫn là **Từ chối**, nhưng spec **không quy định message nào** được trả khi nhiều lỗi đồng thời → đánh dấu `⚠` = outcome reject chắc chắn nhưng **message không xác định theo spec**.

**Số rule khả thi: 10** — nhánh C4=N chỉ sinh 1 rule (R10), nhánh C1=N chỉ sinh 1 rule (R9); không enumerate giá trị của các condition đang N/A.

### [A2] DTT Rút gọn (merge + traceability)

**Nguyên tắc rút gọn ở đây không phải "gộp Don't-Care" thông thường**, mà là **chọn tập rule có oracle xác định**: với feature AND-nhiều-lỗi, chỉ rule **đơn-lỗi** mới có expected message duy nhất theo spec. Các rule đa-lỗi (R4,R6,R7,R8) đều cho outcome "reject" nhưng message không xác định ⇒ **không tạo test case riêng**, vì:

1. Outcome boolean (reject) của chúng đã được **chứng minh** bởi rule đơn-lỗi tương ứng (mỗi điều kiện sai một mình đã đủ gây reject — đúng bản chất AND).
2. Thêm chúng vào bộ ship sẽ tạo test case có **expected result không trace được về spec** (vi phạm "spec là oracle").

#### Reasoning từng bước:

- **R1** giữ nguyên → rule **Success**. Vì `type` quyết định công thức `discount_amount` (percent vs fixed) và spec yêu cầu "tính `discount_amount` đúng theo `type`", ta **split R1 thành 2 test case** (percent / fixed) ở bước [A3] để phủ cả 2 nhánh công thức.
- **R2 → giữ** (đại diện lỗi C5, đơn-lỗi). Outcome A6.
- **R3 → giữ** (đại diện lỗi C3, đơn-lỗi). Outcome A4.
- **R5 → giữ** (đại diện lỗi C2, đơn-lỗi). Outcome A3.
- **R9 → giữ** (lỗi C1). Outcome A2.
- **R10 → giữ** (lỗi C4). Outcome A5.
- **R4, R6, R7, R8 → loại khỏi bộ ship** (đa-lỗi, message N/A theo spec). Traceability: outcome reject của chúng được phủ logic bởi {R2 ∨ R3 ∨ R5}.

#### Bảng sau rút gọn (6 rule oracle-xác-định):

| Cond/Action | R1 (success)  | R5         | R3             | R2          | R9              | R10    |
| ----------- | ------------- | ---------- | -------------- | ----------- | --------------- | ------ |
| C4          | Y             | Y          | Y              | Y           | Y               | N      |
| C1          | Y             | Y          | Y              | Y           | N               | N/A    |
| C2          | Y             | N          | Y              | Y           | N/A             | N/A    |
| C3          | Y             | Y          | N              | Y           | N/A             | N/A    |
| C5          | Y             | Y          | Y              | N           | N/A             | N/A    |
| **Outcome** | A1 Thành công | A3 hết hạn | A4 chưa đủ min | A6 hết lượt | A2 không hợp lệ | A5 401 |

**Kết quả: 10 rule khả thi → 6 rule oracle-xác-định.** Traceability: 6 rule giữ nguyên từ {R1,R5,R3,R2,R9,R10}; loại {R4,R6,R7,R8} (đa-lỗi, message không xác định theo spec). Bộ này thỏa **mỗi điều kiện C1–C5 được kiểm sai độc lập đúng một lần** + rule success.

### [A3] DTT Test Cases (7 — split rule success theo `type`)

> Bảng thiết kế trung gian (ID `TC-D0x` để map về rule). Giá trị biên (BVA) được chọn cho ô có ý nghĩa ranh giới.

| TC ID  | Mô tả                                   | C4  | C1  | C2  | C3  | C5  | type    | Expected Outcome                         | Rule |
| ------ | --------------------------------------- | --- | --- | --- | --- | --- | ------- | ---------------------------------------- | ---- |
| TC-D01 | Success — `percent`, total = min (biên) | Y   | Y   | Y   | Y   | Y   | percent | Áp mã OK, discount = total×v/100         | R1   |
| TC-D02 | Success — `fixed`, total = min (biên)   | Y   | Y   | Y   | Y   | Y   | fixed   | Áp mã OK, discount = discount_value      | R1   |
| TC-D03 | C1 sai — mã không tồn tại               | Y   | N   | -   | -   | -   | -       | A2 "mã không hợp lệ / không tồn tại"     | R9   |
| TC-D04 | C2 sai — mã hết hạn (chỉ C2 sai)        | Y   | Y   | N   | Y   | Y   | -       | A3 "mã đã hết hạn"                       | R5   |
| TC-D05 | C3 sai — total = min − 1 (biên dưới)    | Y   | Y   | Y   | N   | Y   | -       | A4 "chưa đạt giá trị đơn hàng tối thiểu" | R3   |
| TC-D06 | C4 sai — không gửi JWT                  | N   | -   | -   | -   | -   | -       | A5 "yêu cầu đăng nhập" (HTTP 401)        | R10  |
| TC-D07 | C5 sai — usage_count = max (biên)       | Y   | Y   | Y   | Y   | N   | -       | A6 "đã dùng hết lượt cho phép"           | R2   |

---

## TRACK B — Pairwise (All-Pairs)

> Chạy **độc lập** TRACK A. Mục tiêu: phủ mọi **cặp giá trị** của 2 tham số bất kỳ với chi phí thấp — KHÔNG nhắm "mọi rule logic".

### [B1] Dựng tổ hợp (+ constraint)

**Tham số (6):** C4, C1, C2, C3, C5 (binary) + `type` {percent, fixed}.

**Cận dưới lý thuyết:** `max(V) × max(V) = 2 × 2 = 4`. Đây chỉ là cận dưới; ràng buộc dependency làm bộ thực tế lớn hơn.

**Constraints (bắt buộc, do dependency):**

- `C4 = N ⇒ C1 = C2 = C3 = C5 = N/A` (chưa qua auth).
- `C1 = N ⇒ C2 = C3 = C5 = N/A` (không có dòng coupon).
- ⇒ Mọi cặp dính C1/C2/C3/C5 ở nhánh C4=N là **infeasible**; mọi cặp dính C2/C3/C5 ở nhánh C1=N là **infeasible** → không cần (và không thể) phủ.

**Chiến lược:** phủ all-pairs cho khối "đánh giá đầy đủ" {C2, C3, C5, type} trong nhánh C4=Y ∧ C1=Y (6 dòng), cộng 2 dòng cổng để phủ cặp dính C1=N và C4=N.

```
Core (C4=Y, C1=Y) — all-pairs {C2,C3,C5,type}:
| TC | C2 | C3 | C5 | type    |
| 1  | Y  | Y  | Y  | percent |
| 2  | Y  | N  | N  | fixed   |
| 3  | N  | Y  | N  | percent |
| 4  | N  | N  | Y  | fixed   |
| 5  | N  | N  | Y  | percent |
| 6  | Y  | Y  | N  | fixed   |

Gate rows:
| 7  | C1=N (C2,C3,C5=N/A), C4=Y, type=fixed   |
| 8  | C4=N (C1,C2,C3,C5=N/A), type=percent    |
```

| TC  | C4  | C1  | C2  | C3  | C5  | type    |
| --- | --- | --- | --- | --- | --- | ------- |
| 1   | Y   | Y   | Y   | Y   | Y   | percent |
| 2   | Y   | Y   | Y   | N   | N   | fixed   |
| 3   | Y   | Y   | N   | Y   | N   | percent |
| 4   | Y   | Y   | N   | N   | Y   | fixed   |
| 5   | Y   | Y   | N   | N   | Y   | percent |
| 6   | Y   | Y   | Y   | Y   | N   | fixed   |
| 7   | Y   | N   | N/A | N/A | N/A | fixed   |
| 8   | N   | N/A | N/A | N/A | N/A | percent |

### [B2] Điền Expected Outcome (mượn DTT làm oracle)

Pairwise **không tự sinh outcome** → tra ngược về [A1]/[A2].

| TC  | C4  | C1  | C2  | C3  | C5  | type    | Expected                | Tra theo rule  | Ghi chú oracle           |
| --- | --- | --- | --- | --- | --- | ------- | ----------------------- | -------------- | ------------------------ |
| 1   | Y   | Y   | Y   | Y   | Y   | percent | Thành công (percent)    | R1             | duy nhất rõ ràng         |
| 2   | Y   | Y   | Y   | N   | N   | fixed   | Từ chối — **message ⚠** | R4 (C3,C5 sai) | **đa-lỗi → message N/A** |
| 3   | Y   | Y   | N   | Y   | N   | percent | Từ chối — **message ⚠** | R6 (C2,C5 sai) | **đa-lỗi → message N/A** |
| 4   | Y   | Y   | N   | N   | Y   | fixed   | Từ chối — **message ⚠** | R7 (C2,C3 sai) | **đa-lỗi → message N/A** |
| 5   | Y   | Y   | N   | N   | Y   | percent | Từ chối — **message ⚠** | R7 (C2,C3 sai) | **đa-lỗi → message N/A** |
| 6   | Y   | Y   | Y   | Y   | N   | fixed   | Từ chối "hết lượt"      | R2             | đơn-lỗi C5 → rõ ràng     |
| 7   | Y   | N   | —   | —   | —   | fixed   | Từ chối "không hợp lệ"  | R9             | đơn-lỗi C1 → rõ ràng     |
| 8   | N   | —   | —   | —   | —   | percent | Từ chối 401             | R10            | đơn-lỗi C4 → rõ ràng     |

> ⚠️ **Phát hiện then chốt:** 4/8 dòng pairwise (2,3,4,5) rơi vào **tổ hợp đa-lỗi** → outcome boolean là "reject" nhưng **message cụ thể không xác định được theo spec**. Pairwise tối ưu phủ-cặp nên cố tình nhồi nhiều biến = N trên cùng dòng — điều này **phá vỡ tính xác định của oracle** với feature AND-có-message-riêng.

### [B3] Verify pair coverage

Chỉ xét **cặp khả thi** (loại cặp bị constraint).

- **(C2,C3):** YY#1, YN#2, NY#3, NN#4 → ✅ 4/4
- **(C2,C5):** YY#1, YN#6, NY#4, NN#3 → ✅ 4/4
- **(C2,type):** Yp#1, Yf#2, Np#3, Nf#4 → ✅ 4/4
- **(C3,C5):** YY#1, YN#6, NY#4, NN#2 → ✅ 4/4
- **(C3,type):** Yp#1, Yf#6, Np#5, Nf#2 → ✅ 4/4
- **(C5,type):** Yp#1, Yf#4, Np#3, Nf#2 → ✅ 4/4
- **(C1,_) & (C4,_):** nhánh C4=Y∧C1=Y phủ (C1=Y,_) và (C4=Y,_); dòng #7 phủ (C1=N); dòng #8 phủ (C4=N). Các cặp (C1=N, C2/C3/C5) và (C4=N, \*) là **infeasible** theo constraint → bỏ qua hợp lệ.

→ ✅ Mọi cặp **khả thi** đã được phủ bằng 8 dòng.

### [B4] Pairwise Test Cases (8)

| TC ID  | C4  | C1  | C2  | C3  | C5  | type    | Expected               |
| ------ | --- | --- | --- | --- | --- | ------- | ---------------------- |
| TC-P01 | Y   | Y   | Y   | Y   | Y   | percent | Thành công             |
| TC-P02 | Y   | Y   | Y   | N   | N   | fixed   | Từ chối (message ⚠)    |
| TC-P03 | Y   | Y   | N   | Y   | N   | percent | Từ chối (message ⚠)    |
| TC-P04 | Y   | Y   | N   | N   | Y   | fixed   | Từ chối (message ⚠)    |
| TC-P05 | Y   | Y   | N   | N   | Y   | percent | Từ chối (message ⚠)    |
| TC-P06 | Y   | Y   | Y   | Y   | N   | fixed   | Từ chối "hết lượt"     |
| TC-P07 | Y   | N   | —   | —   | —   | fixed   | Từ chối "không hợp lệ" |
| TC-P08 | N   | —   | —   | —   | —   | percent | Từ chối 401            |

---

## [STEP 2] So sánh DTT vs Pairwise & Quyết định

| Tiêu chí                                         | DTT (rút gọn)                                   | Pairwise                                                           |
| ------------------------------------------------ | ----------------------------------------------- | ------------------------------------------------------------------ |
| Số test case                                     | **7**                                           | 8                                                                  |
| Phủ mọi business rule (single-lỗi → message)?    | ✅ Đủ 5 lỗi + success, mỗi message kiểm độc lập | ⚠️ Chỉ 3/5 message kiểm độc lập (C5,C1,C4); C2,C3 lẫn trong đa-lỗi |
| Oracle xác định cho mọi dòng?                    | ✅ Có (mọi dòng trace 1 rule)                   | ❌ 4/8 dòng đa-lỗi → message N/A theo spec                         |
| Xử lý dependency C4→C1→{C2,C3,C5}                | ✅ Native (`N/A`)                               | ⚠️ Phải vá bằng constraint thủ công                                |
| Phủ công thức `type` (percent/fixed) khi success | ✅ 2 case success rõ ràng                       | ⚠️ Chỉ TC-P01 là success-percent; success-fixed **không có**       |
| % so với 10 rule khả thi                         | 6 rule oracle / 7 TC                            | 8 TC nhưng 4 dòng oracle mờ                                        |

**Quyết định: SHIP bộ DTT (7 test case).**

**Lý do (theo Khung quyết định nhanh — ưu tiên từ trên xuống):**

1. **Có dependency chặt** giữa conditions (C4 gate, C1 gate) → tiêu chí #2 của khung ⇒ **ưu tiên DTT** (Pairwise phải vá constraint thủ công).
2. **Logic-driven, AND nghiêm ngặt + mỗi lỗi có message riêng** → tiêu chí #3 ⇒ ưu tiên DTT. Đây là điểm quyết định mạnh nhất: oracle của feature này là **message-theo-từng-điều-kiện**, chỉ phơi bày được khi **cô lập đúng 1 điều kiện sai/dòng**. Pairwise cố tình nhồi nhiều `N`/dòng nên 4/8 dòng cho message **không xác định theo spec** → không thể viết expected result trace được về spec.
3. **Pairwise không tiết kiệm hơn ở quy mô này:** dù cận dưới là 4, ràng buộc + nhu cầu phủ gate đẩy lên 8 dòng — **nhiều hơn** DTT (7) mà vẫn **bỏ sót** nhánh success-`fixed` và 2 message (C2, C3) độc lập.

→ Pairwise chỉ thắng khi **nhiều tham số gần độc lập** và **nhiều tổ hợp cùng outcome**; ở đây các tham số bị siết bởi AND + gating và outcome lỗi lại **phụ thuộc từng điều kiện riêng**, nên DTT vừa ít test hơn vừa cho oracle sạch.

---

## Vì sao là 2 phương pháp riêng biệt

- **Khác bài toán:** DTT hỏi "mỗi tổ hợp điều kiện có ra đúng business outcome (và đúng message) không"; Pairwise hỏi "có bắt lỗi tương tác 2-tham-số với chi phí thấp không". FR-09 cần cái đầu tiên.
- **Khác oracle:** DTT tự sinh expected outcome **kèm message** từ spec. Pairwise không có oracle riêng — phải mượn DTT; và ở feature này việc mượn **thất bại một phần** vì các dòng đa-lỗi không map về message duy nhất → minh hoạ sống động rằng "Pairwise không thay được DTT".
- **Khác xử lý dependency:** DTT coi `N/A` là công dân hạng nhất (C4=N, C1=N gọn 1 dòng mỗi nhánh); Pairwise giả định độc lập, phải gắn constraint từ ngoài cho cả 2 cổng.
- **Khác điểm hoà vốn:** Ít–vừa điều kiện + ràng buộc chặt ⇒ DTT cho ít test **và** phủ đủ logic; Pairwise chỉ vượt lên khi tham số nhiều & gần độc lập (lúc `max×max` ≪ tích đầy đủ) — không phải tình huống của FR-09.

---

## FINAL TEST CASES (bộ DTT đã chọn ship)

> ID theo convention `TC-COUPON-DTT-[NNN]`. Mỗi case được render thành 1 file riêng theo template project tại `docs/anh-khoa/test-cases/coupon/`. Expected Outcome lấy **từ spec FR-09**, không từ source code. Dữ liệu coupon dùng bộ mẫu trong spec (SAVE10/BIGBUY/EXPIRED...).

| TC ID             | Mô tả                             | C4  | C1  | C2  | C3  | C5  | type    | Expected Outcome                                         | Nguồn (Rule) |
| ----------------- | --------------------------------- | --- | --- | --- | --- | --- | ------- | -------------------------------------------------------- | ------------ |
| TC-COUPON-DTT-001 | Success `percent`, total = min    | Y   | Y   | Y   | Y   | Y   | percent | Áp mã OK, discount = total×v/100, final = total−discount | R1           |
| TC-COUPON-DTT-002 | Success `fixed`, total = min      | Y   | Y   | Y   | Y   | Y   | fixed   | Áp mã OK, discount = discount_value                      | R1           |
| TC-COUPON-DTT-003 | C1 sai — mã không tồn tại         | Y   | N   | —   | —   | —   | —       | Từ chối "mã không hợp lệ / không tồn tại"                | R9           |
| TC-COUPON-DTT-004 | C2 sai — mã hết hạn               | Y   | Y   | N   | Y   | Y   | —       | Từ chối "mã đã hết hạn"                                  | R5           |
| TC-COUPON-DTT-005 | C3 sai — total = min − 1 (biên)   | Y   | Y   | Y   | N   | Y   | —       | Từ chối "chưa đạt giá trị đơn hàng tối thiểu"            | R3           |
| TC-COUPON-DTT-006 | C4 sai — không gửi JWT            | N   | —   | —   | —   | —   | —       | Từ chối "yêu cầu đăng nhập" (HTTP 401)                   | R10          |
| TC-COUPON-DTT-007 | C5 sai — usage_count = max (biên) | Y   | Y   | Y   | Y   | N   | —       | Từ chối "đã dùng hết lượt cho phép"                      | R2           |

---

## PHỤ LỤC: Các quyết định quan trọng

- **Dependency hierarchy `C4 → C1 → {C2,C3,C5}`** được suy ra từ ngữ nghĩa spec (C4 sai → 401 ở tầng auth; C1 sai → không có dòng coupon để đọc C2/C3/C5). Đây là giả định thiết kế đã ghi rõ ở STEP 0; nếu team xác nhận thứ tự đánh giá khác, cần cập nhật bảng N/A.
- **Loại 4 rule đa-lỗi (R4,R6,R7,R8)** khỏi bộ ship vì spec **không quy định message** khi nhiều điều kiện cùng sai → không có expected result trace được về spec. Outcome boolean "reject" của chúng đã được phủ bởi các rule đơn-lỗi.
- **Split rule success theo `type`** (TC-001 percent, TC-002 fixed) để phủ cả 2 công thức `discount_amount` mà spec yêu cầu.
- **BVA nhúng vào test data:** C3 chọn `total = min` (chấp nhận) ở TC-001/002 và `total = min − 1` (từ chối) ở TC-005; C5 chọn `usage_count = max` (từ chối, biên `<`) ở TC-007.
- **Lý do chọn DTT over Pairwise:** dependency + oracle-theo-message (xem STEP 2). Pairwise giữ lại trong tài liệu làm bằng chứng so sánh, không ship.
