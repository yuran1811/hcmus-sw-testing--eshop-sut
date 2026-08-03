# FR-02: Đăng nhập & Khóa tài khoản — Boundary Value Analysis

## 1. Xác định giá trị biên (Boundary Identification)

### Biên 1: `login_attempts` — Ngưỡng khóa tài khoản

**Spec:** Khóa khi đăng nhập sai **từ 3 lần trở lên**.

| Điểm biên | Giá trị | Ý nghĩa |
|-----------|---------|---------|
| min | 0 | Chưa sai lần nào |
| boundary - 1 | 2 | Vẫn chưa bị khóa |
| boundary | 3 | Đúng ngưỡng khóa |
| boundary + 1 | 4 | Quá ngưỡng khóa |

### Biên 2: `locked_until` — Thời gian khóa (30 giây theo spec)

| Điểm biên | Giá trị | Ý nghĩa |
|-----------|---------|---------|
| before lock | locked_until - 1s | Vẫn đang bị khóa |
| at boundary | locked_until (đúng thời điểm) | Ranh giới unlock |
| after lock | locked_until + 1s | Đã hết khóa, có thể login |

### Biên 3: Độ dài mật khẩu (UI validation nếu có)

| Điểm biên | Giá trị | Ý nghĩa |
|-----------|---------|---------|
| min - 1 | 0 ký tự | Rỗng |
| min | 1 ký tự | Mật khẩu 1 ký tự |
| typical | 8+ ký tự | Mật khẩu bình thường |

---

## 2. Test Cases — BVA

### Nhóm BVA-1: Ngưỡng khóa tài khoản (login_attempts boundary)

| TC-ID | Pre-condition (attempts) | Action | Expected | Actual | Status | Bug? |
|-------|--------------------------|--------|----------|--------|--------|------|
| BVA-FR02-01 | attempts = 0 | Nhập sai password lần 1 | HTTP 401, attempts trở thành 1 (spec), KHÔNG lock | HTTP 401, attempts = 2 (bug +2) | FAIL | BUG-01 |
| BVA-FR02-02 | attempts = 1 (spec) / 2 (actual) | Nhập sai password lần 2 | HTTP 401, attempts = 2 (spec), KHÔNG lock | Tài khoản bị lock sớm (attempts=4 ≥ 3) | FAIL | BUG-01 |
| BVA-FR02-03 | attempts = 2 (boundary - 1) | Nhập sai password lần 3 | HTTP 401 + LOCK kích hoạt (attempts = 3) | Lock kích hoạt sớm hơn | FAIL | BUG-01 |
| BVA-FR02-04 | attempts = 3 (at boundary) | Cố đăng nhập (bất kỳ) | HTTP 403, `"Tài khoản đã bị khóa"` | PASS (tài khoản đã lock) | PASS | — |
| BVA-FR02-05 | attempts = 4 (over boundary) | Cố đăng nhập | HTTP 403, vẫn bị khóa | PASS | PASS | — |

**Ghi chú BVA-01→03:** Do BUG-01 (`+= 2` thay vì `+= 1`), hành vi thực tế:
- Lần sai 1: attempts = 2 (expected: 1)
- Lần sai 2: attempts = 4 ≥ 3 → LOCK (expected: lock ở lần 3)

### Nhóm BVA-2: Thời gian khóa (30 giây theo spec)

| TC-ID | Scenario | Steps | Expected | Actual | Status | Bug? |
|-------|----------|-------|----------|--------|--------|------|
| BVA-FR02-06 | 1 giây TRƯỚC khi hết lock | Kích hoạt lock, chờ 29s, thử login | HTTP 403, vẫn bị khóa | HTTP 403 (nhưng lock kéo dài 180s) | FAIL | BUG-02 |
| BVA-FR02-07 | Đúng lúc hết lock (t = 30s) | Chờ đúng 30s sau khi lock | Login thành công | Vẫn bị khóa (lock còn 150s nữa) | FAIL | BUG-02 |
| BVA-FR02-08 | 1 giây SAU khi hết lock (t = 31s) | Chờ 31s sau lock | Login thành công | Vẫn bị khóa (lock còn 149s nữa) | FAIL | BUG-02 |
| BVA-FR02-09 | Sau 180 giây (thời gian thực tế của impl) | Chờ 180s | Thực tế unlock | Unlock | PASS | — (nhưng sai spec) |

**Ghi chú BVA-06→08:** Spec yêu cầu 30 giây, nhưng impl dùng `180000ms` (3 phút). Test với 30s đều fail.

### Nhóm BVA-3: Giá trị biên của email

| TC-ID | Email | Password | Expected | Actual | Status |
|-------|-------|----------|----------|--------|--------|
| BVA-FR02-10 | `a@b.co` (email tối thiểu hợp lệ, không tồn tại) | AnyPass | HTTP 401 (không tìm thấy user) | HTTP 401 | PASS |
| BVA-FR02-11 | `""` (rỗng) | Test1234! | Validation error | HTTP 401 (backend không validate) | FAIL (minor) |
| BVA-FR02-12 | Chuỗi rất dài (255+ ký tự) | Test1234! | HTTP 401 hoặc validation | HTTP 401 | PASS |

### Nhóm BVA-4: Giá trị biên của password

| TC-ID | Email | Password | Expected | Actual | Status |
|-------|-------|----------|----------|--------|--------|
| BVA-FR02-13 | test@eshop.com | `""` (rỗng) | Validation error hoặc HTTP 401 | HTTP 401 (so sánh "" với stored pass) | Minor |
| BVA-FR02-14 | test@eshop.com | `" "` (1 space) | HTTP 401 | HTTP 401 | PASS |
| BVA-FR02-15 | test@eshop.com | Đúng password cắt bớt 1 ký tự | HTTP 401, không match | HTTP 401 | PASS |

---

## 3. Tổng kết BVA

| Nhóm | TC Count | PASS | FAIL | Bug |
|------|----------|------|------|-----|
| Ngưỡng khóa (attempts) | 5 | 2 | 3 | BUG-01 |
| Thời gian khóa (30s vs 180s) | 4 | 1 | 3 | BUG-02 |
| Email boundary | 3 | 2 | 1 | Minor |
| Password boundary | 3 | 2 | 1 | Minor |
| **Tổng** | **15** | **7** | **8** | **2 bugs** |

---

## 4. Screenshots từ Playwright

**BVA-FR02-01 → 03 — Lockout behavior (BUG-01 — attempts tăng +2):**

Lần sai 1 (attempts lên 2, phải là 1):
![Lockout Attempt 1](../playwright-tests/screenshots/FR02/DT-FR02-lockout-attempt-1.png)

Lần sai 2 (tài khoản bị lock, phải đợi đến lần 3):
![Lockout Attempt 2](../playwright-tests/screenshots/FR02/DT-FR02-lockout-attempt-2.png)

**BVA-FR02-06 → 08 — Lockout time 180s thay vì 30s (BUG-02):**

Tài khoản bị lock, login với đúng password nhận HTTP 403:
![Locked Response](../playwright-tests/screenshots/FR02/DT-FR02-10-locked-response.png)

*Ngày thực thi: 2026-06-27 | Playwright script: `playwright-tests/fr02-login.spec.js`*

---

## 4. AI Gap Analysis — BVA

**AI phát hiện được:**
- Biên 3 lần sai → lockout
- Thời gian lockout là biên cần test

**AI bỏ sót:**
- Không đề xuất test **email rỗng ("")** và **password rỗng** riêng biệt
- Không đề xuất kiểm tra behavior khi **cố login sau lock nhưng với sai password** (BVA-FR02-05 behavior)
- Không xác định được biên **chính xác thời điểm unlock** (locked_until - 1s, at, + 1s)

**Lý do:** AI thường không biết chính xác thời gian lockout là bao nhiêu mà không được cung cấp spec — dẫn đến không thiết kế được test case tại boundary thời gian chính xác.
