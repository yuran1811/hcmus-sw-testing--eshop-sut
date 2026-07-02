---
name: qa-dtt-pw
description: >
  QA test design agent. Từ một feature spec (text / PDF / Word), sinh ra test design
  bằng HAI phương pháp ĐỘC LẬP — Decision Table Testing (DTT) và Pairwise (PW) — rồi
  SO SÁNH để chọn bộ test case nên ship. Trigger skill này bất cứ khi nào người dùng đưa
  spec và muốn: thiết kế test case, phân tích điều kiện, dựng bảng quyết định, rút gọn
  rule, sinh tổ hợp pairwise, hoặc cần quyết định "dùng DTT hay Pairwise". Cũng trigger khi
  người dùng nhắc tới "test design", "DTT", "decision table", "pairwise", "all-pairs",
  "test combination", "rút gọn bảng quyết định", hay upload spec PDF/Word để thiết kế test.
  Output là file Markdown gồm test design đầy đủ + danh sách test case + so sánh 2 phương pháp.
---

# QA Test Design — DTT & Pairwise

## ⛔ Ràng buộc nghiêm ngặt (STRICT — đọc trước khi làm)

1. **CHỈ sinh test case từ spec.** Nhiệm vụ của skill là thiết kế test (DTT + Pairwise) dựa **hoàn toàn** vào feature spec được cung cấp. **KHÔNG đọc source code** (backend/frontend/DB) để "đoán bug", suy luận triển khai thực tế, hay chỉnh expected outcome theo code. **Spec là oracle duy nhất** — expected outcome chỉ lấy từ spec.
2. **Không phán đoán lỗi triển khai.** Skill này KHÔNG phải bug-hunting. Nếu nghi ngờ hệ thống sai lệch spec, đó là việc của giai đoạn execute / `bug-reporting`, **không** ghi vào test design ở đây.
3. **Dùng đúng template đang có của project.** Test case và test-design phải tuân theo template & convention sẵn có trong repo (xem mục [Template chuẩn của project](#template-chuẩn-của-project-bắt-buộc-dùng)) — không tự chế format ID hay cấu trúc file mới.

---

## Nguyên tắc cốt lõi: DTT và Pairwise là HAI phương pháp riêng biệt

Đây là thay đổi quan trọng nhất so với cách làm cũ. **Không** coi Pairwise là "bước rút gọn tiếp theo của DTT". Hai kỹ thuật này giải hai bài toán khác nhau:

|                         | **Decision Table Testing (DTT)**                              | **Pairwise (All-Pairs)**                                             |
| ----------------------- | ------------------------------------------------------------- | -------------------------------------------------------------------- |
| Trả lời câu hỏi         | "Mỗi tổ hợp điều kiện có cho ra đúng business outcome không?" | "Có bắt được lỗi tương tác giữa các tham số với chi phí thấp không?" |
| Mục tiêu phủ            | Phủ **mọi rule logic** (combination → outcome)                | Phủ **mọi cặp giá trị** của 2 tham số bất kỳ                         |
| Giả định nền            | Outcome **phụ thuộc tổ hợp** theo logic nghiệp vụ             | Phần lớn defect bị kích bởi **1 hoặc 2 tham số**                     |
| Oracle (nguồn expected) | Tự thân spec sinh ra outcome cho từng rule                    | **Không tự có** — phải mượn DTT/spec để điền outcome                 |
| Xử lý dependency        | Native (đánh dấu `N/A`)                                       | Giả định độc lập → phải gắn thêm **constraint**                      |
| Khi nào tỏa sáng        | Ít điều kiện, logic-driven, có ràng buộc                      | **Nhiều** tham số, **gần độc lập**, nhiều tổ hợp cùng outcome        |

→ Vì hai cái tối ưu hai thứ khác nhau (DTT tối ưu **đầy đủ logic**, PW tối ưu **tiết kiệm tổ hợp**), ta **chạy cả hai một cách độc lập** trên cùng spec, **so sánh kết quả**, rồi chọn bộ test phù hợp. Đôi khi câu trả lời là "kết hợp": dùng PW để sinh tổ hợp + dùng DTT làm oracle điền expected outcome. Nhưng quyết định đó phải đến _sau khi đã thấy cả hai_, không phải mặc định.

---

## Quy trình tổng quan

```
INPUT: Feature Spec (text / PDF / Word)
  │
  ├─ STEP 0 — Phân tích spec: trích conditions & actions        (DÙNG CHUNG)
  ├─ STEP 1 — Phân loại điều kiện + đếm tổ hợp khả thi           (DÙNG CHUNG)
  │
  ├─ TRACK A — DTT ──────────────┐     ├─ TRACK B — PAIRWISE ──────────┐
  │   A1. Full Decision Table     │     │   B1. Dựng bảng pairwise       │
  │   A2. Rút gọn (merge rule)    │     │       (kèm constraint nếu có   │
  │   A3. Test case từ DTT        │     │        dependency)             │
  │                               │     │   B2. Điền expected outcome    │
  │                               │     │       (dùng DTT làm oracle)    │
  │                               │     │   B3. Verify pair coverage     │
  │                               │     │   B4. Test case từ Pairwise    │
  │                               ▼     ▼                                │
  └──────────────► STEP 2 — SO SÁNH DTT vs Pairwise ◄────────────────────┘
                     (số test case, coverage, chọn bộ ship + lý do)
  │
OUTPUT: File .md — test design 2 nhánh + bảng so sánh + FINAL test cases
```

Hai TRACK độc lập nhau: kết quả của TRACK A **không** được dùng để "rút gọn tiếp" trong TRACK B. Chúng chỉ gặp nhau ở STEP 2 (so sánh) và ở B2 (mượn outcome — vì PW không có oracle riêng).

---

## Ký hiệu chuẩn

| Ký hiệu   | Ý nghĩa                                      |
| --------- | -------------------------------------------- |
| `Y` / `T` | Điều kiện = True / Yes                       |
| `N` / `F` | Điều kiện = False / No                       |
| `-`       | Don't Care — giá trị không ảnh hưởng outcome |
| `N/A`     | Not Applicable — không tồn tại do dependency |
| `✓`       | Action được thực hiện                        |
| `✗`       | Action không được thực hiện                  |

---

## STEP 0 — Phân tích Spec (dùng chung)

1. Đọc toàn bộ spec. Nếu là file: extract text trước (xem mục "Xử lý file upload").
2. Trích **Conditions** (yếu tố đầu vào ảnh hưởng hành vi) và **Actions/Outcomes** (kết quả hệ thống).
3. Ghi chú **business rule ẩn** và **dependency ngầm**.

### Output STEP 0

```markdown
## [STEP 0] Phân tích Spec

### Conditions:

| #   | Condition       | Giá trị có thể |
| --- | --------------- | -------------- |
| C1  | <tên điều kiện> | <v1>, <v2>...  |

### Actions / Outcomes:

| #   | Action/Outcome |
| --- | -------------- |
| A1  | <mô tả>        |

### Ghi chú (rule ẩn / dependency):

- <...>
```

---

## STEP 1 — Phân loại điều kiện + đếm tổ hợp khả thi (dùng chung)

| Loại            | Định nghĩa                       | Ví dụ                     |
| --------------- | -------------------------------- | ------------------------- |
| **Binary**      | Đúng 2 giá trị                   | User đã login?            |
| **Multi-value** | ≥ 3 giá trị rời rạc              | Role: Admin/User/Guest    |
| **Dependent**   | Giá trị phụ thuộc condition khác | C3 chỉ áp dụng khi C1=Yes |

### ⚠️ Đếm tổ hợp ĐÚNG cách (điểm dễ sai nhất)

Khi một condition là **N/A theo dependency, KHÔNG enumerate giá trị của nó** — bỏ luôn chiều đó đi trong nhánh tương ứng. Nếu vẫn liệt kê cả 2 giá trị của một condition đang N/A, bạn sẽ tạo ra các rule **trùng lặp y hệt** rồi đếm sai.

```
Tổ hợp lý thuyết = V(C1) × V(C2) × ... × V(Cn)   (chưa trừ dependency)

Tổ hợp KHẢ THI = tổng số tổ hợp hợp lệ sau khi, ở mỗi nhánh,
                 LOẠI chiều của condition đang N/A (không nhân thêm V của nó).
```

### Ví dụ chạy xuyên suốt skill — Feature "Đăng nhập"

- **C1** — Thông tin đăng nhập hợp lệ? (Y/N) — binary
- **C2** — Tick "Ghi nhớ đăng nhập"? (Y/N) — binary, **độc lập, KHÔNG ảnh hưởng** việc cho/không cho vào (chỉ ảnh hưởng độ dài session — ngoài scope outcome)
- **C3** — Mã 2FA đúng? (Y/N) — binary, **chỉ áp dụng khi C1=Y** (nếu sai user/pass thì không tới bước nhập 2FA)

Outcome: **A1** = Đăng nhập thành công · **A2** = Từ chối đăng nhập

```markdown
## [STEP 1] Phân loại điều kiện

| Condition | Loại   | Số giá trị | Dependency             |
| --------- | ------ | ---------- | ---------------------- |
| C1        | Binary | 2          | Không                  |
| C2        | Binary | 2          | Không (độc lập)        |
| C3        | Binary | 2          | Chỉ áp dụng khi C1 = Y |

**Tổ hợp lý thuyết:** 2 × 2 × 2 = 8
**Tổ hợp khả thi:**

- Nhánh C1=Y: C3 áp dụng → 1 × V(C2) × V(C3) = 1 × 2 × 2 = 4
- Nhánh C1=N: C3 = N/A (BỎ chiều C3) → 1 × V(C2) = 1 × 2 = 2
  → **Khả thi = 4 + 2 = 6 rules** (KHÔNG phải 4, cũng KHÔNG phải 8)
```

---

# TRACK A — Decision Table Testing

## A1 — Full Decision Table

Liệt kê **tất cả tổ hợp khả thi**. Với condition N/A trong một nhánh: ghi `N/A` ở ô đó và **không** tách nhánh đó thành 2 rule theo giá trị của nó.

```markdown
## [A1] Full Decision Table

| Cond/Action       | R1  | R2  | R3  | R4  | R5  | R6  |
| ----------------- | --- | --- | --- | --- | --- | --- |
| C1                | Y   | Y   | Y   | Y   | N   | N   |
| C2                | Y   | Y   | N   | N   | Y   | N   |
| C3                | Y   | N   | Y   | N   | N/A | N/A |
| **A1** Thành công | ✓   | ✗   | ✓   | ✗   | ✗   | ✗   |
| **A2** Từ chối    | ✗   | ✓   | ✗   | ✓   | ✓   | ✓   |

**Giải thích outcome:**

- R1,R3 (C1=Y, C3=Y): pass cả credential lẫn 2FA → Thành công
- R2,R4 (C1=Y, C3=N): credential đúng nhưng 2FA sai → Từ chối
- R5,R6 (C1=N): sai credential → Từ chối (C3 N/A: chưa tới bước 2FA)

**Số rule khả thi: 6** — nhánh C1=N chỉ sinh 2 rule (R5,R6), không sinh 4.
```

## A2 — Rút gọn DTT (merge rule)

Hai rule **được merge** khi và chỉ khi: (1) **outcome giống hệt**, (2) **chỉ khác đúng 1 điều kiện**, (3) điều kiện khác đó **chứng minh được là không ảnh hưởng** outcome. Sau merge, điều kiện đó thành `-` (Don't Care). **Luôn ghi traceability** "merged from ...".

### ⚠️ Lỗi thường gặp khi rút gọn

| Lỗi                                                                 | Cách tránh                                             |
| ------------------------------------------------------------------- | ------------------------------------------------------ |
| Merge 2 rule khác outcome                                           | Kiểm tra toàn bộ action trước khi merge                |
| Don't-Care giả (đánh `-` cho condition thực ra có ảnh hưởng)        | Verify lại bằng spec                                   |
| Merge xuyên dependency (gộp rule có `N/A` với rule có giá trị thật) | Không merge nếu condition đang `N/A` mang ý nghĩa khác |
| Mất traceability                                                    | Luôn note rule gốc                                     |

```markdown
## [A2] DTT Rút gọn

### Reasoning từng bước:

- R1 & R3: cùng outcome (Thành công), chỉ khác C2 (Y/N). C2 là "ghi nhớ đăng nhập"
  → không ảnh hưởng việc cho vào → C2 = Don't Care.
  → Merge **R1' = {C1=Y, C2=-, C3=Y}**, outcome Thành công. (R1' ← R1, R3)
- R2 & R4: cùng outcome (Từ chối), chỉ khác C2 → C2 Don't Care.
  → Merge **R2' = {C1=Y, C2=-, C3=N}**, outcome Từ chối. (R2' ← R2, R4)
- R5 & R6: cùng outcome (Từ chối), chỉ khác C2, C3 đều N/A → C2 Don't Care.
  → Merge **R5' = {C1=N, C2=-, C3=N/A}**, outcome Từ chối. (R5' ← R5, R6)
- Kiểm tra chéo R1'/R2'/R5': outcome khác nhau → KHÔNG merge thêm.

### Bảng sau rút gọn:

| Cond/Action       | R1' | R2' | R5' |
| ----------------- | --- | --- | --- |
| C1                | Y   | Y   | N   |
| C2                | -   | -   | -   |
| C3                | Y   | N   | N/A |
| **A1** Thành công | ✓   | ✗   | ✗   |
| **A2** Từ chối    | ✗   | ✓   | ✓   |

**Kết quả: 6 rule khả thi → 3 rule.** Traceability: R1'←{R1,R3}, R2'←{R2,R4}, R5'←{R5,R6}.
```

> ⚠️ **Safety-critical / compliance:** nếu spec yêu cầu mức phủ cao (vd kiểm thử theo
> chuẩn), cân nhắc **không** rút gọn, hoặc bổ sung tiêu chí mỗi điều kiện độc lập tác động
> outcome ít nhất một lần (MC/DC). Rút gọn đúng cách là loss-less về logic, nhưng số dòng
> ít hơn đồng nghĩa ít cấu hình được test thực tế hơn — đánh đổi cần ghi rõ.

## A3 — Test case từ DTT

Mỗi rule rút gọn = 1 test case. Với ô `-`, chọn **một** giá trị hợp lệ bất kỳ và ghi rõ.

> Bảng dưới là **bảng thiết kế trung gian** (ID `TC-D0x` chỉ để map về rule). Khi xuất ra test case chính thức, đổi sang ID `TC-[MODULE]-DTT-[NNN]` và render theo [Template chuẩn của project](#template-chuẩn-của-project-bắt-buộc-dùng).

```markdown
## [A3] DTT Test Cases (3)

| TC ID  | Mô tả                      | C1  | C2   | C3  | Expected Outcome | Rule |
| ------ | -------------------------- | --- | ---- | --- | ---------------- | ---- |
| TC-D01 | Credential đúng + 2FA đúng | Y   | Y(-) | Y   | Thành công       | R1'  |
| TC-D02 | Credential đúng + 2FA sai  | Y   | N(-) | N   | Từ chối          | R2'  |
| TC-D03 | Credential sai             | N   | Y(-) | N/A | Từ chối          | R5'  |
```

---

# TRACK B — Pairwise (All-Pairs)

> TRACK này chạy **độc lập** với TRACK A. Mục tiêu khác hẳn: phủ mọi **cặp giá trị**, không phải mọi rule logic.

## B1 — Dựng bảng Pairwise (kèm constraint nếu có dependency)

**Công thức cận dưới (KHÔNG phải con số chính xác):**

```
Số test case PW ≥ max(V(Ci)) × max(V(Cj))   với Ci, Cj là 2 condition nhiều giá trị nhất
```

Đây là **cận dưới lý thuyết**; bộ thực tế thường lớn hơn, đặc biệt khi có constraint.

**Quy trình:**

1. Sắp xếp condition theo số giá trị **giảm dần**.
2. Liệt kê tập **cặp khả thi** cần phủ. Với dependency, thêm **constraint**: khi C1=N thì C3=N/A → các cặp dính C3 ở nhánh C1=N là **infeasible**, không cần (và không thể) phủ.
3. Sinh dòng để phủ hết các cặp khả thi; ô tự do điền giá trị hợp lệ.
4. Sang B3 verify.

> ⚠️ **Cảnh báo cho LLM agent:** dựng pairwise thủ công cho spec lớn rất dễ sót cặp. Nếu
> có công cụ (PICT, ACTS/Microsoft, allpairs) thì ưu tiên dùng và chỉ verify lại. Bắt buộc
> chạy B3 để chứng minh coverage.

```markdown
## [B1] Pairwise — dựng tổ hợp

Conditions (đều 2 giá trị): C1, C3, C2.
Constraint: C3 ∈ {Y,N} chỉ khi C1=Y; nếu C1=N → C3 = N/A.

Cặp khả thi cần phủ:

- (C1,C2): (Y,Y) (Y,N) (N,Y) (N,N)
- (C1,C3): (Y,Y) (Y,N) ← C1=N ⇒ C3=N/A nên không có cặp thật
- (C2,C3): (Y,Y) (Y,N) (N,Y) (N,N) ← chỉ tồn tại trong nhánh C1=Y

| TC  | C1  | C3  | C2  |
| --- | --- | --- | --- |
| 1   | Y   | Y   | Y   |
| 2   | Y   | N   | N   |
| 3   | Y   | Y   | N   |
| 4   | Y   | N   | Y   |
| 5   | N   | N/A | Y   |
| 6   | N   | N/A | N   |
```

## B2 — Điền Expected Outcome (mượn DTT làm oracle)

**Pairwise không tự sinh expected outcome.** Mỗi dòng pairwise phải được tra ngược vào logic nghiệp vụ (chính là decision table ở TRACK A) để điền outcome — tuyệt đối không để trống hay đoán.

```markdown
## [B2] Pairwise + Expected Outcome

| TC  | C1  | C3  | C2  | Expected   | Tra theo rule |
| --- | --- | --- | --- | ---------- | ------------- |
| 1   | Y   | Y   | Y   | Thành công | R1'           |
| 2   | Y   | N   | N   | Từ chối    | R2'           |
| 3   | Y   | Y   | N   | Thành công | R1'           |
| 4   | Y   | N   | Y   | Từ chối    | R2'           |
| 5   | N   | N/A | Y   | Từ chối    | R5'           |
| 6   | N   | N/A | N   | Từ chối    | R5'           |
```

## B3 — Verify pair coverage

```markdown
## [B3] Kiểm tra phủ cặp

- (C1,C2): (Y,Y)#1 (Y,N)#2 (N,Y)#5 (N,N)#6 → ✅ đủ 4/4
- (C1,C3): (Y,Y)#1 (Y,N)#2 → ✅ đủ 2/2 cặp khả thi (C1=N⇒N/A: bỏ qua hợp lệ)
- (C2,C3): (Y,Y)#1 (N,N)#2 (N,Y)#3 (Y,N)#4 → ✅ đủ 4/4
  → Mọi cặp khả thi đã được phủ.
```

## B4 — Test case từ Pairwise

> Bảng dưới là **bảng thiết kế trung gian** (ID `TC-P0x` chỉ để map về pair). Khi xuất ra test case chính thức, đổi sang ID `TC-[MODULE]-PW-[NNN]` và render theo [Template chuẩn của project](#template-chuẩn-của-project-bắt-buộc-dùng).

```markdown
## [B4] Pairwise Test Cases (6)

| TC ID  | C1  | C2  | C3  | Expected   |
| ------ | --- | --- | --- | ---------- |
| TC-P01 | Y   | Y   | Y   | Thành công |
| TC-P02 | Y   | N   | N   | Từ chối    |
| TC-P03 | Y   | N   | Y   | Thành công |
| TC-P04 | Y   | Y   | N   | Từ chối    |
| TC-P05 | N   | Y   | N/A | Từ chối    |
| TC-P06 | N   | N   | N/A | Từ chối    |
```

---

## STEP 2 — SO SÁNH DTT vs Pairwise & chọn bộ ship

Đặt hai kết quả cạnh nhau, đánh giá trên cùng spec, rồi quyết định **bộ nào ship** (hoặc kết hợp).

```markdown
## [STEP 2] So sánh & Quyết định

| Tiêu chí                       | DTT (rút gọn)         | Pairwise                                  |
| ------------------------------ | --------------------- | ----------------------------------------- |
| Số test case                   | **3**                 | 6                                         |
| Phủ mọi business rule?         | ✅ Có (theo thiết kế) | ⚠️ Không đảm bảo — chỉ phủ cặp            |
| Nhận ra C2 là Don't Care?      | ✅ Có → bỏ bớt        | ❌ Không → vẫn ghép C2 vào, phình số dòng |
| Có oracle riêng?               | ✅ Tự sinh outcome    | ❌ Phải mượn DTT để điền                  |
| Xử lý dependency C1→C3         | ✅ Native (N/A)       | ⚠️ Phải gắn constraint thủ công           |
| % giảm so với full khả thi (6) | 50% (6→3)             | 0% (6→6)                                  |

**Quyết định: SHIP bộ DTT (3 test case).**

**Lý do:**

- Feature ít điều kiện và **logic-driven** → đúng địa hạt DTT.
- Có **dependency C1→C3** → Pairwise phải vá bằng constraint, và vì C2 là don't-care
  thực sự, pairwise vẫn ghép C2 với C3 nên block C1=Y phình lại đủ 4 dòng ⇒ **không giảm**.
- DTT nhận ra C2 không ảnh hưởng outcome nên rút còn 3, vẫn phủ đủ logic.
- Pairwise chỉ thắng khi **nhiều tham số gần độc lập** (lúc đó max×max ≪ tích đầy đủ);
  ở quy mô này nó vừa không tiết kiệm vừa thiếu oracle.
```

### Khung quyết định nhanh (ưu tiên từ trên xuống)

```
1. Safety-critical / compliance?           → Giữ Full DTT (cân nhắc MC/DC). DỪNG.
2. Có dependency chặt giữa conditions?      → Ưu tiên DTT (PW phải vá constraint).
3. Mỗi tổ hợp ra outcome riêng (logic-driven)? → Ưu tiên DTT.
4. Nhiều tham số (≥5) VÀ gần độc lập VÀ nhiều tổ hợp cùng outcome? → Pairwise tiết kiệm rõ.
5. Vừa nhiều tham số vừa có ràng buộc?      → KẾT HỢP: PW sinh tổ hợp + DTT làm oracle.
```

Nếu các tiêu chí xung đột, áp dụng theo **thứ tự ưu tiên trên** (1 cao nhất). Luôn ghi rõ tiêu chí nào quyết định.

---

## Vì sao là 2 phương pháp riêng biệt (phần lý luận bắt buộc trình bày)

Trong output, viết vài dòng giải thích — không chỉ ra kết quả mà phải nói **tại sao tách**:

- **Khác bài toán:** DTT hỏi "mọi rule logic có đúng không"; Pairwise hỏi "có bắt lỗi tương tác rẻ không". Một cái về **đầy đủ logic**, một cái về **kinh tế tổ hợp**.
- **Khác oracle:** DTT tự sinh expected outcome từ spec; Pairwise **không có oracle** — nó chỉ chọn tổ hợp, vẫn phải mượn bảng quyết định/spec để biết kết quả mong đợi. Nên không thể nói "Pairwise thay thế DTT".
- **Khác cách xử lý dependency:** DTT coi `N/A` là công dân hạng nhất; Pairwise giả định độc lập, gặp ràng buộc phải gắn constraint từ ngoài.
- **Khác điểm hòa vốn:** Khi ít điều kiện/nhiều ràng buộc, rút gọn DTT thường cho ít test hơn _và_ phủ đủ logic; Pairwise chỉ vượt lên khi số tham số lớn và gần độc lập, lúc `max×max` nhỏ hơn hẳn tích đầy đủ.

→ Vì những khác biệt **bản chất** này, ta không xếp chúng thành một pipeline tuần tự "DTT rồi mới PW". Ta chạy **song song, độc lập**, rồi để bằng chứng (số test case + coverage trên _spec cụ thể này_) quyết định bộ nào ship — hoặc khi nào kết hợp.

---

## Template chuẩn của project (BẮT BUỘC dùng)

Skill này **KHÔNG tự định nghĩa** format test case riêng. Khi xuất test case, dùng đúng template & convention đang có trong repo:

| Loại artifact             | Template / convention chuẩn                                                                                                              | Vị trí                                  |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| **Test case (file)**      | Template test case chung của project                                                                                                     | `./templates/output-format-template.md` |
| **Test case ID**          | `TC-[MODULE]-DTT-[NNN]` (case sinh từ DTT) / `TC-[MODULE]-PW-[NNN]` (case sinh từ Pairwise) — vd `TC-COUPON-DTT-001`, `TC-COUPON-PW-001` | cùng template trên                      |
| **Vị trí file test case** | Mỗi test case là 1 file Markdown tại `tests/test-cases/[module]/TC-[MODULE]-DTT-[NNN].md` (hoặc `...-PW-[NNN].md`)                       | —                                       |
| **Test case mẫu**         | Ví dụ tham chiếu                                                                                                                         | `./references/TC-REGISTER-001.md`       |
| **Requirement spec**      | Format phân tích yêu cầu (Module / Requirement ID / Input Fields...)                                                                     | `./templates/output-format-template.md` |

- Các bảng tổ hợp trong **A3 / B4** (cột `C1, C2, ...` + ID `TC-D0x` / `TC-P0x`) chỉ là **bảng thiết kế trung gian** để theo dõi mapping rule/pair → đừng nhầm với test case cuối.
- Khi xuất **FINAL TEST CASES**, mỗi case phải render thành đúng template file ở trên (đủ `Preconditions / Test Data / Test Steps / Expected Result`) và đặt ID theo `TC-[MODULE]-[NNN]`.
- Phần "test design" (Decision Table, bảng pairwise, so sánh STEP 2) giữ theo OUTPUT FORMAT của skill này — đó là tài liệu thiết kế, không phải test case.

---

## OUTPUT FORMAT — File Markdown cuối cùng

ALWAYS dùng đúng cấu trúc này:

```markdown
# QA Test Design: [Tên Feature]

**Ngày:** <ngày> · **Phương pháp:** DTT & Pairwise (độc lập, có so sánh) · **Spec nguồn:** <file / "Text input">

## TÓM TẮT KẾT QUẢ

| Hạng mục               | Kết quả                  |
| ---------------------- | ------------------------ |
| Số conditions          | N                        |
| Tổ hợp lý thuyết       | X                        |
| Tổ hợp khả thi         | F                        |
| DTT: rule sau rút gọn  | a                        |
| Pairwise: số test case | b                        |
| **Bộ được chọn ship**  | DTT / Pairwise / Kết hợp |
| **Số test case cuối**  | T                        |

[STEP 0] Phân tích Spec
[STEP 1] Phân loại điều kiện + đếm tổ hợp khả thi

## TRACK A — DTT

[A1] Full Decision Table
[A2] DTT Rút gọn (reasoning từng bước merge + traceability)
[A3] DTT Test Cases

## TRACK B — Pairwise

[B1] Dựng tổ hợp (+ constraint)
[B2] Expected Outcome (mượn DTT làm oracle)
[B3] Verify pair coverage
[B4] Pairwise Test Cases

[STEP 2] So sánh DTT vs Pairwise & Quyết định

## Vì sao là 2 phương pháp riêng biệt

## FINAL TEST CASES (bộ đã chọn ship)

> ID theo convention `TC-[MODULE]-DTT-[NNN]` (case từ DTT) / `TC-[MODULE]-PW-[NNN]` (case từ Pairwise). Bảng tổng hợp dưới đây để tra cứu nhanh; sau bảng,
> render **mỗi** test case thành 1 file riêng theo [Template chuẩn của project](#template-chuẩn-của-project-bắt-buộc-dùng)
> tại `tests/test-cases/[module]/TC-[MODULE]-DTT-[NNN].md` (hoặc `...-PW-[NNN].md`) (đủ Preconditions / Test Data / Test Steps / Expected Result).
> Expected Outcome lấy **từ spec**, không từ source code.

| TC ID | Mô tả | C1  | C2  | ... | Expected Outcome | Nguồn (Rule/Pair) |
| ----- | ----- | --- | --- | --- | ---------------- | ----------------- |

## PHỤ LỤC: Các quyết định quan trọng

- Ghi lại mọi điểm cần suy luận (mỗi lần đánh `-`, mỗi merge, mỗi constraint,
  lý do chọn bộ ship) để người review trace lại được logic.
```

---

## Xử lý file upload

**PDF:** extract text (dùng `pdf` skill nếu cần) → bỏ header/footer/số trang → vào STEP 0.
**Word (.docx):** extract text (dùng `docx` skill nếu cần) → chú ý heading, conditions thường ẩn trong từng mục/điều khoản → vào STEP 0.

---

## Lưu ý cho Agent

1. **Hai TRACK độc lập.** Không dùng kết quả rút gọn của DTT để "rút gọn tiếp" Pairwise. Chúng chỉ gặp ở STEP 2 (so sánh) và B2 (mượn oracle).
2. **Luôn show reasoning bằng tiếng Việt:** mỗi merge, mỗi `-`, mỗi constraint, mỗi lựa chọn ship đều phải có lý do.
3. **Đếm rule đúng:** condition đang `N/A` thì BỎ chiều của nó, không enumerate → tránh rule trùng và đếm sai.
4. **Pairwise luôn có oracle:** không để trống Expected Outcome; tra ngược về bảng quyết định/spec.
5. **Pairwise luôn verify (B3):** phải chứng minh đã phủ hết cặp khả thi.
6. **Luôn so sánh trước khi kết luận:** không mặc định "PW tốt hơn vì ít test" hay "DTT tốt hơn vì đầy đủ" — để số liệu trên spec cụ thể quyết định.
7. **Output cuối là file .md**, sinh xong thì present cho user tải về.
8. **STRICT — chỉ thiết kế test từ spec:** KHÔNG đọc source code để đoán bug hay suy ra expected outcome. Spec là oracle duy nhất (xem mục "⛔ Ràng buộc nghiêm ngặt" đầu file).
9. **Dùng đúng template project:** test case xuất ra phải theo template & convention `TC-[MODULE]-DTT-[NNN]` / `TC-[MODULE]-PW-[NNN]` tại `tests/test-cases/[module]/...` (xem mục "Template chuẩn của project"), không tự chế format mới.
