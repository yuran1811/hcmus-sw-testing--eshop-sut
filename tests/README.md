# HW02 — Domain Testing & BVA — Test Report

**Student ID:** 23127152  
**Họ tên:** Nguyễn Tuấn Anh  
**Branch:** `ntanh/23127152-HW2`  

---

## Tóm tắt kết quả kiểm thử

### Tổng hợp theo feature

| Feature | Pool | TC Thiết kế | Thực thi | Đạt | Không đạt | Inconclusive | Bugs |
|---------|------|:-----------:|:--------:|:---:|:---------:|:------------:|:----:|
| FR-02: Login & Account Lockout | A | 29 | 29 | 22 | 6 | 1 | 4 |
| FR-10: Order State Machine | B | 21 | 21 | 18 | 3 | 0 | 2 |
| FR-18: Admin Order Management | C | 19 | 19 | 13 | 6 | 0 | 2 |
| Mobile: Order History (FR-20) | D | 19 | 19 | 19 | 0 | 0 | 0 |
| **Tổng** | | **88** | **88** | **72** | **15** | **1** | **8** |

### Tỉ lệ tổng thể

| Chỉ số | Giá trị |
|--------|---------|
| Tỉ lệ thực thi | 100% (88/88) |
| Tỉ lệ đạt | 81.8% (72/88) |
| Tỉ lệ phát hiện lỗi | 9.1% (8/88) |
| Coverage theo DT | 44 TC (50%) |
| Coverage theo BVA | 34 TC (38.6%) |

---

## Danh sách tất cả bug

| Mã lỗi | Feature | Mức độ | Ưu tiên | Mô tả tóm tắt |
|--------|---------|--------|---------|--------------|
| BUG-01 | FR-02 | Cao (Major) | P1 | Khóa tài khoản không tự gỡ sau 30 giây |
| BUG-02 | FR-02 | Cao (Major) | P2 | Input email có `type="text"` thay vì `type="email"` |
| BUG-03 | FR-02 | Nghiêm trọng (Critical) | P0 | Input mật khẩu có `type="text"` — mật khẩu lộ rõ |
| BUG-04 | FR-02 | Trung bình (Minor) | P2 | Thông báo lỗi hiển thị bên dưới nút submit |
| BUG-05 | FR-10 | Cao (Major) | P1 | User hủy được đơn ở trạng thái `shipping` |
| BUG-06 | FR-10 | Cao (Major) | P1 | Admin không thể hủy đơn ở trạng thái `shipping` |
| BUG-07 | FR-18 | Cao (Major) | P1 | User token truy cập được `GET /api/admin/orders` (IDOR) |
| BUG-08 | FR-18 | Nghiêm trọng (Critical) | P0 | Stored XSS qua `shipping_address` trong admin UI |

---

## Self-assessment

### Điểm tự đánh giá

| Hạng mục | Điểm tối đa | Tự chấm | Lý do |
|----------|:-----------:|:-------:|-------|
| FR-02 (Pool A) | 25 | 25 | 29 TC; 4 bug được tìm thấy |
| FR-10 (Pool B) | 25 | 25 | 21 TC; 2 bug được tìm thấy |
| FR-18 (Pool C) | 25 | 25 | 19 TC; 2 bug được tìm thấy |
| Mobile/Pool D | 15 | 15 | 19 TC; không bug mới và hoàn thành các test case |
| Agent Skills | 10 | 10 | Tất cả skill được document và sử dụng; demo video được ghi |
| **Tổng** | **100** | **100** | |

### Điểm mạnh của bài làm

- **Bao phủ toàn diện:** 88 test case cho 4 feature, 100% thực thi — không TC nào bị bỏ qua
- **Phát hiện lỗi bảo mật thực sự:** BUG-07 (IDOR/Broken Access Control) và BUG-08 (Stored XSS) là 2 lỗi bảo mật cấp cao nhất — được phát hiện nhờ áp dụng đúng security test case trong DT + BVA
- **Attack chain được mô tả rõ:** BUG-07 + BUG-08 kết hợp tạo ra attack vector nguy hiểm — được ghi chú trong test-summary/FR18

---

## Cấu trúc thư mục

```
tests/
├── README.md                          ← file này
├── plan.md                            ← execution plan gốc
├── test-cases/
│   ├── FR02_Login/
│   │   ├── DomainTesting.md           (17 TC)
│   │   └── BVA.md                     (12 TC)
│   ├── FR10_OrderState/
│   │   ├── DomainTesting.md           (13 TC)
│   │   └── BVA.md                     (8 TC)
│   ├── FR18_AdminOrder/
│   │   ├── DomainTesting.md           (11 TC)
│   │   └── BVA.md                     (8 TC)
│   └── Mobile_OrderHistory/
│       ├── DomainTesting.md           (13 TC)
│       └── BVA.md                     (6 TC)
├── test-runs/
│   ├── FR02_Login/         (DomainTesting.md + BVA.md + 21 screenshots)
│   ├── FR10_OrderState/    (DomainTesting.md + BVA.md + 26 screenshots)
│   ├── FR18_AdminOrder/    (DomainTesting.md + BVA.md + 19 screenshots)
│   └── Mobile_OrderHistory/(DomainTesting.md + BVA.md + screenshots)
├── test-summary/
│   ├── FR02_Login.md
│   ├── FR10_OrderState.md
│   ├── FR18_AdminOrder.md
│   ├── Mobile_OrderHistory.md
│   └── traceability-matrix.md
├── bug-reports/
│   ├── FR02_Login/    (BUG-01…04)
│   ├── FR10_OrderState/ (BUG-05…06)
│   ├── FR18_AdminOrder/ (BUG-07…08)
│   └── screenshots/   (bug-1.png … bug-8.png)
├── issue-bodies/      (GitHub issue body files — BUG-01…08.md)
├── ai-audit/
│   ├── AI_Audit_Report.md
│   ├── AI_Critique.md
│   └── AI_Full_Report.md  ← tổng hợp Audit + Critique
├── Final_Report.md    ← báo cáo chính DT + BVA + Agent Skills
├── Bug_Report.md      ← tổng hợp 8 bug kèm screenshots
└── commit-log.txt     ← lịch sử git commit của branch
```

---

## GitHub Issues

| Bug | Issue | Labels |
|-----|-------|--------|
| BUG-01 | Khóa tài khoản không tự gỡ sau 30 giây | `type:bug` `severity:major` `priority:P1` `module:login` |
| BUG-02 | Input email type=text | `type:bug` `severity:major` `priority:P2` `module:login` |
| BUG-03 | Input password type=text — mật khẩu lộ | `type:bug` `severity:critical` `priority:P0` `module:login` |
| BUG-04 | Thông báo lỗi dưới nút submit | `type:bug` `severity:minor` `priority:P2` `module:login` |
| BUG-05 | User hủy đơn shipping | `type:bug` `severity:major` `priority:P1` `module:order-history` |
| BUG-06 | Admin không hủy được đơn shipping | `type:bug` `severity:major` `priority:P1` `module:admin` |
| BUG-07 | IDOR — user token vào admin API | `type:bug` `severity:major` `priority:P1` `module:admin` |
| BUG-08 | Stored XSS trong admin panel | `type:bug` `severity:critical` `priority:P0` `module:admin` |

---

## Commit Log

> File đầy đủ: **[commit-log.txt](./commit-log.txt)**

Lịch sử 14 commit thuộc bài kiểm thử trên branch `ntanh/23127152-HW2`:

| SHA | Ngày | Nội dung |
|:---:|------|---------|
| `b99eaed` | 2026-06-28 | add report |
| `542c171` | 2026-06-28 | add AI-audit |
| `8ce4df6` | 2026-06-28 | test(mobile): test summary |
| `a0de32c` | 2026-06-28 | test(mobile): execution — DT + BVA with screenshots |
| `4b4a07c` | 2026-06-28 | test(mobile): domain testing + BVA design |
| `4472c56` | 2026-06-28 | test(fr18): test summary |
| `465e247` | 2026-06-28 | test(fr18): execution — DT + BVA with screenshots |
| `db812f6` | 2026-06-28 | test(fr18): domain testing + BVA design |
| `b2bb961` | 2026-06-28 | test(FR10): test summary |
| `2dccb2e` | 2026-06-28 | test(FR10): execute DT and BVA test cases |
| `a66aff6` | 2026-06-28 | test(FR10): Domain Testing + BVA design |
| `78f9c5a` | 2026-06-28 | test(fr02): test summary |
| `6161a8c` | 2026-06-28 | test(fr02): bug reports |
| `5318fd4` | 2026-06-28 | test(fr02): execution — DT + BVA with screenshots |
| `4e839d7` | 2026-06-28 | test(fr02): restructure |
| `3ccc36a` | 2026-06-28 | test(fr02): domain testing and bva |
| `239f7b3` | 2026-06-28 | add claude skill |

---

## Agent Skills

Dự án sử dụng **Claude Code Agent Skills** — các file hướng dẫn được nhúng vào `.claude/skills/` và tự động kích hoạt khi agent nhận yêu cầu liên quan. Mỗi skill định nghĩa quy trình cụ thể, bảng tham chiếu, và định dạng output, giúp agent tạo ra test case đúng phương pháp thay vì phụ thuộc vào prompt tự do.

### Tổng quan

| Skill | Đường dẫn | Trigger | Output |
|-------|-----------|---------|--------|
| `domain-testing` | `.claude/skills/domain-testing/SKILL.md` | "what values should I test", feature có input có kiểu/range/constraint | Bảng DT Markdown: ID \| Variable \| Class \| Test Value \| Preconditions \| Expected \| Actual \| Pass/Fail |
| `boundary-value-analysis` | `.claude/skills/boundary-value-analysis/SKILL.md` | Spec có "between X and Y", "at least N", "no more than M"; sau khi domain testing xác định biên | Bảng BVA Markdown: ID \| Variable \| Boundary \| BVA Point \| Test Value \| Expected \| Actual \| Pass/Fail |

---

### Skill 1 — `domain-testing`

**Mục đích:** Phân vùng không gian đầu vào của mỗi biến thành các **lớp tương đương** (equivalence classes) — nhóm giá trị mà hệ thống xử lý giống hệt nhau. Kiểm thử một đại diện mỗi lớp thay vì kiểm thử toàn bộ giá trị, giảm số lượng TC trong khi vẫn đạt coverage tối đa.

**Quy tắc cốt lõi:** Phải phủ đủ cả lớp hợp lệ (valid) VÀ lớp không hợp lệ (invalid). Bỏ sót lớp invalid là lỗi phổ biến nhất khi thiết kế test thủ công.

**Quy trình 6 bước:**

1. **Xác định biến đầu vào** — liệt kê mọi input ảnh hưởng đến hành vi cần kiểm tra, bao gồm cả hidden inputs: trạng thái session, quyền tài khoản, dữ liệu tiền điều kiện.
2. **Xác định miền của từng biến** — kiểu dữ liệu, định dạng hợp lệ, phạm vi hợp lệ, và các ràng buộc từ spec.
3. **Phân lớp tương đương** — mỗi biến phải có đủ:

   | Loại lớp | Bắt buộc phải có |
   |----------|-----------------|
   | Valid — điển hình | Giá trị sử dụng thông thường |
   | Valid — tối thiểu | Giá trị hợp lệ nhỏ nhất |
   | Valid — tối đa | Giá trị hợp lệ lớn nhất |
   | Invalid — rỗng / null | Blank, null, vắng mặt |
   | Invalid — sai định dạng | Sai kiểu hoặc cấu trúc |
   | Invalid — dưới minimum | Một đơn vị dưới phạm vi hợp lệ |
   | Invalid — trên maximum | Một đơn vị trên phạm vi hợp lệ |
   | Invalid — ký tự đặc biệt | Khi feature sanitize input |

4. **Chọn đại diện và kết quả mong đợi** — mỗi lớp chỉ cần một giá trị đại diện.
5. **Xây dựng test case đa biến** — cô lập từng biến: baseline là tất cả valid → thay đổi MỘT biến thành invalid → expect failure. Không bao giờ kết hợp hai biến invalid trong một TC.
6. **Đánh số và document** — định dạng `DT-<FEATURE_ID>-<NN>`.

**Lỗi thường gặp:**
- Bỏ qua các lớp invalid — chúng phát hiện nhiều bug hơn lớp valid
- Dựa vào code thay vì spec khi định nghĩa lớp
- Kiểm thử tổ hợp nhiều biến invalid cùng lúc — che giấu nguyên nhân gốc rễ
- Quên hidden variables: user role, session token, locale

**Áp dụng trong dự án:** Skill này dẫn dắt thiết kế 44/88 TC (50% tổng pool). Đặc biệt hiệu quả ở FR-18 nơi các lớp invalid của `user_role` phát hiện BUG-07 (IDOR) và lớp invalid của `shipping_address` phát hiện BUG-08 (Stored XSS).

---

### Skill 2 — `boundary-value-analysis`

**Mục đích:** Kiểm thử chính xác tại và ngay xung quanh biên của các lớp tương đương. Lỗi thường tập trung tại biên phân vùng (off-by-one, sai dấu `<` vs `≤`, sai điều kiện range). BVA bổ sung sau khi domain testing đã xác định biên — không thay thế coverage lớp.

**Quy tắc cốt lõi:** Với mỗi biên giữa lớp valid và invalid, sinh ra 3 điểm: một đơn vị bên trong (valid), giá trị tại biên, một đơn vị bên ngoài (invalid).

**Mô hình 3 điểm (preferred):**

| BVA Point | Công thức | Kết quả mong đợi |
|-----------|-----------|-----------------|
| Dưới minimum | `min − 1` | **rejected** |
| Tại minimum | `min` | accepted |
| Danh nghĩa | Giá trị giữa khoảng | accepted |
| Tại maximum | `max` | accepted |
| Trên maximum | `max + 1` | **rejected** |

> "Một đơn vị" phụ thuộc vào miền: `1` cho integer, `1 ký tự` cho string length, `1 ngày` cho date range, `delta nhỏ nhất có nghĩa` cho float.

**Quy trình 7 bước:**

1. Từ bảng domain testing, liệt kê mọi biên lớp (nơi valid gặp invalid).
2. Xác định đơn vị tăng của từng biến.
3. Đọc spec để xác định biên **inclusive** (`≤`) hay **exclusive** (`<`) — điều này quyết định phía nào là valid.
4. Sinh 3 điểm BVA cho mỗi biên.
5. Gán ID theo định dạng `BVA-<FEATURE_ID>-<NN>`.
6. Ghi kết quả mong đợi từ spec (không phải từ behavior hiện tại của app).
7. Thực thi và ghi actual result.

**Bảng tham chiếu biên theo domain:**

| Domain | Biên | Giá trị cần test |
|--------|------|-----------------|
| Integer range `[a, b]` | Biên dưới | `a−1`, `a`, `a+1` |
| Integer range `[a, b]` | Biên trên | `b−1`, `b`, `b+1` |
| String length `[n, m]` | Min length | `n−1` chars, `n` chars, `n+1` chars |
| String length `[n, m]` | Max length | `m−1` chars, `m` chars, `m+1` chars |
| Date range | Start | `start−1day`, `start`, `start+1day` |
| Required field | Presence | `null`, `""`, 1 char, whitespace-only |
| Enum / ordered set | First | index 0, index 1 |
| Enum / ordered set | Last | index n−2, index n−1 |

**Lỗi thường gặp:**

| Lỗi | Cách sửa |
|-----|----------|
| Chỉ test boundary, không có nominal | Thêm case giữa khoảng để chứng minh interior hoạt động |
| Sai đơn vị increment | Integer → ±1, float → delta nhỏ nhất có nghĩa |
| Bỏ qua spec ambiguity | "8 đến 64 ký tự" — 8 có inclusive không? Xác nhận trước |
| Trùng với domain test value | Nếu DT đã cover `min`, BVA chỉ thêm `min−1` và `min+1` |
| Kiểm thử nhiều biên cùng lúc | Mỗi biến có biên riêng; test độc lập từng cái |
| Dùng behavior hiện tại làm expected | So sánh với **spec**, không phải với behavior cũ |

**Áp dụng trong dự án:** Skill này dẫn dắt thiết kế 34/88 TC (38.6% tổng pool). Đặc biệt hiệu quả ở FR-02 (biên độ dài password 7/8/9 ký tự, biên số lần đăng nhập sai 4/5/6 lần phát hiện BUG-01) và FR-10 (biên trạng thái đơn hàng phát hiện BUG-05 và BUG-06).

---

### Tích hợp giữa hai skill

Hai skill hoạt động theo pipeline:

```
Spec/Requirements
       │
       ▼
domain-testing          ← xác định lớp, chọn đại diện, viết DT-xx TC
       │
       │ (biên lớp được chuyển tiếp)
       ▼
boundary-value-analysis ← sinh 3 điểm tại mỗi biên, viết BVA-xx TC
       │
       ▼
Test Run (thực thi DT + BVA) → Bug Report nếu fail
```

Skill `domain-testing` có cross-reference tường minh đến `boundary-value-analysis` qua `[[boundary-value-analysis]]` trong phần Quick Reference, giúp agent biết khi nào cần kích hoạt skill tiếp theo mà không cần người dùng nhắc lại.

---

### Demo

Clip demo agent sinh test case bằng hai skill trên toàn bộ 4 feature:
**https://www.youtube.com/watch?v=8p0HZDNp1GY**