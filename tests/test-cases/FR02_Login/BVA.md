# FR-02: Đăng nhập & Khóa tài khoản — Phân tích Giá trị Biên (Thiết kế Test Case)

**Tính năng:** FR-02 — Đăng nhập & Khóa tài khoản  
**Nhóm tính năng:** Pool A — Xác thực (Authentication)  
**Nguồn đặc tả:** `README.md` §FR-02, §FR-22  
**Phương pháp:** Phân tích Giá trị Biên (Boundary Value Analysis) — 3 điểm mỗi biên  
**Điều kiện tiên quyết:** Các phân vùng tương đương đã được xác định trong `test-cases/FR02_Login/DomainTesting.md`  
**Hướng dẫn kỹ thuật:** `.claude/skills/boundary-value-analysis`

---

## Bước 1 — Xác định các giá trị biên

Từ các phân vùng tương đương trong DomainTesting.md, xác định mọi ranh giới giữa phân vùng hợp lệ và không hợp lệ:

| # | Biến | Mô tả ranh giới | Giá trị biên (B) | Đơn vị | Tham chiếu đặc tả |
|---|------|----------------|-----------------|--------|-------------------|
| B1 | `login_attempts` | Khóa kích hoạt khi ≥3 lần sai liên tiếp | 3 lần sai | 1 lần | FR-02: "từ 3 lần trở lên" |
| B2 | `lock_duration` | Tài khoản được mở khóa sau 30 giây | 30 giây | 1 giây | FR-02: "tạm khóa 30 giây" |
| B3 | Độ dài `email` | Độ dài tối đa theo RFC 5321 | 254 ký tự | 1 ký tự | Chuẩn RFC 5321 |
| B4 | Sự hiện diện của `password` | Trường mật khẩu không được để trống | 1 ký tự (tối thiểu) | 1 ký tự | Trường bắt buộc (implicit) |
| B5 | Bộ đếm liên tiếp | Đăng nhập thành công reset bộ đếm về 0 | 0 (đã reset) | 1 lần | FR-02: "liên tiếp" |

### Xác nhận tính bao gồm/loại trừ của biên (từ đặc tả)

| Ranh giới | Nguyên văn đặc tả | Bao gồm biên? |
|-----------|------------------|--------------|
| B1: khóa tại 3 lần sai | "từ 3 lần **trở lên**" | Có — 3 lần = bị khóa (≥3) |
| B2: mở khóa tại 30 giây | "tạm khóa **30 giây**" | Biên tại t=30s; tại t=30s khóa hết hạn |
| B3: email 254 ký tự | RFC 5321 | 254 ký tự hợp lệ; 255 ký tự không hợp lệ |
| B4: password ≥1 ký tự | Trường bắt buộc | 1 ký tự là tối thiểu chấp nhận được |

---

## Bước 2 — Danh sách Test Case BVA

> **Tài liệu chỉ dành cho thiết kế.** Kết quả thực tế thuộc về `test-runs/FR02_Login/BVA.md`.  
> Áp dụng 3-điểm BVA: một trường hợp dưới biên, một tại biên, một trên biên.

---

# BVA-FR02-01: Lần sai thứ 2 — tài khoản chưa bị khóa (dưới biên B1)

## Requirement ID
FR-02

## Module / Test type / Technique
FR02 Login / Functional / BVA

## Preconditions
- Tài khoản đã có 1 lần sai (tổng sẽ là 2 sau TC này)
- Ranh giới B1: ngưỡng khóa = 3 lần sai

## Test data
| Email | test@eshop.com |
| Password | WrongPass999! |
| Điểm BVA | Dưới biên — lần sai thứ 2 |

## Test steps
1. (Setup) Đăng nhập sai 1 lần
2. Nhập email `test@eshop.com`, password sai `WrongPass999!` lần thứ 2
3. Bấm Login

## Expected result
Đăng nhập thất bại; tổng = 2 lần sai; tài khoản **chưa bị khóa**; có thể thử lại.

## Status / Related bugs
Not Run / None

---

# BVA-FR02-02: Lần sai thứ 3 — kích hoạt khóa tài khoản (tại biên B1)

## Requirement ID
FR-02

## Module / Test type / Technique
FR02 Login / Functional / BVA

## Preconditions
- Tài khoản đã có 2 lần sai (tổng sẽ là 3 sau TC này)
- Ranh giới B1: ngưỡng khóa = 3 lần sai

## Test data
| Email | test@eshop.com |
| Password | WrongPass999! |
| Điểm BVA | Tại biên — lần sai thứ 3 |

## Test steps
1. (Setup) Đăng nhập sai 2 lần
2. Nhập email `test@eshop.com`, password sai `WrongPass999!` lần thứ 3
3. Bấm Login

## Expected result
Đăng nhập thất bại; tổng = 3 lần sai; tài khoản **bị khóa** 30 giây.

## Status / Related bugs
Not Run / None

---

# BVA-FR02-03: Tài khoản đang bị khóa — từ chối dù mật khẩu đúng (trên biên B1)

## Requirement ID
FR-02

## Module / Test type / Technique
FR02 Login / Functional / BVA

## Preconditions
- Tài khoản có ≥3 lần sai; trong vòng 30 giây
- Ranh giới B1: tài khoản đang bị khóa

## Test data
| Email | test@eshop.com |
| Password | Test1234! (đúng) |
| Điểm BVA | Trên biên — đang bị khóa |

## Test steps
1. (Setup) Kích hoạt khóa (3 lần đăng nhập sai)
2. Trong vòng 30 giây, nhập email và password đúng `Test1234!`
3. Bấm Login

## Expected result
Đăng nhập thất bại; hiển thị thông báo "tài khoản bị khóa"; không cấp JWT.

## Status / Related bugs
Not Run / None

---

# BVA-FR02-04: Đăng nhập tại t=29 giây — khóa vẫn còn hiệu lực (dưới biên B2)

## Requirement ID
FR-02

## Module / Test type / Technique
FR02 Login / Functional / BVA

## Preconditions
- Tài khoản vừa bị khóa (t=0)
- Ranh giới B2: mở khóa tại t=30 giây

## Test data
| Email | test@eshop.com |
| Password | Test1234! |
| Thời điểm | t = 29 giây sau khi bị khóa |
| Điểm BVA | Dưới biên — t=29s |

## Test steps
1. Kích hoạt khóa tài khoản
2. Chờ đúng 29 giây
3. Nhập email và password đúng `Test1234!`
4. Bấm Login

## Expected result
Đăng nhập thất bại; khóa vẫn còn hiệu lực; thông báo "tài khoản bị khóa".

## Status / Related bugs
Not Run / None

---

# BVA-FR02-05: Đăng nhập tại t=30 giây — khóa được gỡ (tại biên B2)

## Requirement ID
FR-02

## Module / Test type / Technique
FR02 Login / Functional / BVA

## Preconditions
- Tài khoản bị khóa đúng 30 giây trước
- Ranh giới B2: mở khóa tại t=30 giây

## Test data
| Email | test@eshop.com |
| Password | Test1234! |
| Thời điểm | t = 30 giây sau khi bị khóa |
| Điểm BVA | Tại biên — t=30s |

## Test steps
1. Kích hoạt khóa tài khoản
2. Chờ đúng 30 giây
3. Nhập email và password đúng `Test1234!`
4. Bấm Login

## Expected result
Đăng nhập thành công; khóa đã được gỡ; JWT trả về.

## Status / Related bugs
Not Run / None

---

# BVA-FR02-06: Đăng nhập tại t=31 giây — khóa đã được gỡ (trên biên B2)

## Requirement ID
FR-02

## Module / Test type / Technique
FR02 Login / Functional / BVA

## Preconditions
- Tài khoản bị khóa 31 giây trước
- Ranh giới B2: mở khóa tại t=30 giây

## Test data
| Email | test@eshop.com |
| Password | Test1234! |
| Thời điểm | t = 31 giây sau khi bị khóa |
| Điểm BVA | Trên biên — t=31s |

## Test steps
1. Kích hoạt khóa tài khoản
2. Chờ 31 giây
3. Nhập email và password đúng `Test1234!`
4. Bấm Login

## Expected result
Đăng nhập thành công; khóa đã được gỡ; JWT trả về.

## Status / Related bugs
Not Run / None

---

# BVA-FR02-07: Email 253 ký tự — dưới tối đa RFC 5321, định dạng chấp nhận

## Requirement ID
FR-02

## Module / Test type / Technique
FR02 Login / Functional / BVA

## Preconditions
- User đang ở trang Login
- Ranh giới B3: độ dài email tối đa = 254 ký tự

## Test data
| Email | `a`×244 + `@test.com` (tổng 253 ký tự) |
| Password | Test1234! |
| Điểm BVA | Dưới tối đa — 253 ký tự |

## Test steps
1. Mở trang Login
2. Nhập email 253 ký tự (244 ký tự `a` + `@test.com`)
3. Nhập password tùy ý
4. Bấm Login

## Expected result
Định dạng được chấp nhận; đăng nhập thất bại vì "sai thông tin" (không phải lỗi định dạng).

## Status / Related bugs
Not Run / None

---

# BVA-FR02-08: Email 254 ký tự — tại tối đa RFC 5321, định dạng chấp nhận

## Requirement ID
FR-02

## Module / Test type / Technique
FR02 Login / Functional / BVA

## Preconditions
- User đang ở trang Login
- Ranh giới B3: độ dài email tối đa = 254 ký tự

## Test data
| Email | `a`×245 + `@test.com` (tổng 254 ký tự) |
| Password | Test1234! |
| Điểm BVA | Tại tối đa — 254 ký tự |

## Test steps
1. Mở trang Login
2. Nhập email 254 ký tự (245 ký tự `a` + `@test.com`)
3. Nhập password tùy ý
4. Bấm Login

## Expected result
Định dạng được chấp nhận; đăng nhập thất bại vì "sai thông tin" (không phải lỗi định dạng).

## Status / Related bugs
Not Run / None

---

# BVA-FR02-09: Email 255 ký tự — vượt tối đa RFC 5321, từ chối định dạng

## Requirement ID
FR-02

## Module / Test type / Technique
FR02 Login / Functional / BVA

## Preconditions
- User đang ở trang Login
- Ranh giới B3: độ dài email tối đa = 254 ký tự

## Test data
| Email | `a`×246 + `@test.com` (tổng 255 ký tự) |
| Password | Test1234! |
| Điểm BVA | Vượt tối đa — 255 ký tự |

## Test steps
1. Mở trang Login
2. Nhập email 255 ký tự (246 ký tự `a` + `@test.com`)
3. Nhập password tùy ý
4. Bấm Login

## Expected result
Đăng nhập thất bại; email vượt quá độ dài tối đa; thông báo lỗi định dạng.

## Status / Related bugs
Not Run / None

---

# BVA-FR02-10: Password rỗng — dưới tối thiểu, trường bắt buộc (dưới biên B4)

## Requirement ID
FR-02

## Module / Test type / Technique
FR02 Login / Functional / BVA

## Preconditions
- Trạng thái tài khoản = bình thường
- Ranh giới B4: password tối thiểu = 1 ký tự

## Test data
| Email | test@eshop.com |
| Password | (rỗng — 0 ký tự) |
| Điểm BVA | Dưới tối thiểu — 0 ký tự |

## Test steps
1. Mở trang Login
2. Nhập email hợp lệ `test@eshop.com`
3. Để trống trường password (0 ký tự)
4. Bấm Login

## Expected result
Đăng nhập thất bại; thông báo trường bắt buộc; không được tính là lần sai.

## Status / Related bugs
Not Run / None

---

# BVA-FR02-11: Password 1 ký tự — tại tối thiểu, sai thông tin đăng nhập (tại biên B4)

## Requirement ID
FR-02

## Module / Test type / Technique
FR02 Login / Functional / BVA

## Preconditions
- Trạng thái tài khoản = bình thường
- Ranh giới B4: password tối thiểu = 1 ký tự

## Test data
| Email | test@eshop.com |
| Password | X (1 ký tự) |
| Điểm BVA | Tại tối thiểu — 1 ký tự |

## Test steps
1. Mở trang Login
2. Nhập email hợp lệ `test@eshop.com`
3. Nhập password 1 ký tự `X`
4. Bấm Login

## Expected result
Đăng nhập thất bại; sai thông tin đăng nhập; 1 ký tự là định dạng hợp lệ (chỉ sai giá trị).

## Status / Related bugs
Not Run / None

---

# BVA-FR02-12: Đăng nhập thành công reset bộ đếm — lần sai sau không tích lũy (tại điểm reset B5)

## Requirement ID
FR-02

## Module / Test type / Technique
FR02 Login / Functional / BVA

## Preconditions
- 2 lần sai trước đó
- Ranh giới B5: reset bộ đếm khi đăng nhập thành công

## Test data
| Email | test@eshop.com |
| Password Bước 1 | Test1234! (đúng) |
| Password Bước 2 | WrongPass999! (sai) |
| Điểm BVA | Tại điểm reset |

## Test steps
1. (Setup) Đăng nhập sai 2 lần
2. Đăng nhập đúng với `Test1234!` (bộ đếm reset về 0)
3. Đăng nhập sai 1 lần nữa với `WrongPass999!`
4. Kiểm tra trạng thái tài khoản

## Expected result
Bước 2 thành công — bộ đếm reset về 0. Bước 3 — 1 lần sai mới (bộ đếm = 1, không phải 3 — tài khoản **chưa bị khóa**).

## Status / Related bugs
Not Run / None

---

## Bước 3 — Danh sách kiểm tra độ phủ ranh giới

- [x] B1: Ngưỡng khóa login_attempts — đủ 3 điểm (BVA-FR02-01, 02, 03)
- [x] B2: Cửa sổ khóa 30 giây — đủ 3 điểm (BVA-FR02-04, 05, 06)
- [x] B3: Độ dài email tối đa RFC — đủ 3 điểm (BVA-FR02-07, 08, 09)
- [x] B4: Sự hiện diện của password — 2 điểm (BVA-FR02-10, 11) — đặc tả không quy định độ dài tối đa khi đăng nhập
- [x] B5: Reset bộ đếm liên tiếp — đã kiểm tra (BVA-FR02-12)
- [x] Đã xác nhận tính bao gồm/loại trừ cho tất cả các biên
- [x] Giá trị danh nghĩa (nominal) đã được kiểm tra trong DomainTesting.md (DT-FR02-01)
- [x] Không có hai biến biên nào được kiểm thử đồng thời

---

## Bước 4 — Phân tích khoảng cách AI (AI Gap Analysis)

> _Sau khi thực thi test tại `test-runs/`. Ghi lại các test case biên mà AI bỏ sót, và giải thích nguyên nhân._

| Khoảng cách | AI bỏ sót? | Nguyên nhân |
|------------|-----------|------------|
| _(điền sau khi thực thi)_ | | |
