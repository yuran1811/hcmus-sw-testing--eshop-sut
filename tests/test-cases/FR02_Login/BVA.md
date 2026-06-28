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

> **Tài liệu chỉ dành cho thiết kế.** Cột `Kết quả thực tế` và `Đạt/Không đạt` thuộc về `test-runs/FR02_Login/BVA.md`.  
> Áp dụng 3-điểm BVA: một trường hợp dưới biên, một tại biên, một trên biên.

### Ranh giới B1 — Ngưỡng khóa `login_attempts` (ngưỡng = 3)

| Mã TC | Biến | Ranh giới | Điểm BVA | Thao tác / Giá trị kiểm thử | Điều kiện tiên quyết | Kết quả mong đợi |
|-------|------|-----------|---------|---------------------------|---------------------|-----------------|
| BVA-FR02-01 | login_attempts | ngưỡng = 3 | **Dưới biên** (lần sai thứ 2) | Nhập sai mật khẩu | Tài khoản đã có 1 lần sai (tổng sẽ là 2) | Đăng nhập thất bại; tổng = 2 lần sai; tài khoản **chưa bị khóa**; có thể thử lại |
| BVA-FR02-02 | login_attempts | ngưỡng = 3 | **Tại biên** (lần sai thứ 3) | Nhập sai mật khẩu | Tài khoản đã có 2 lần sai (tổng sẽ là 3) | Đăng nhập thất bại; tổng = 3 lần sai; tài khoản **bị khóa** 30 giây |
| BVA-FR02-03 | login_attempts | ngưỡng = 3 | **Trên biên** (đang bị khóa) | Nhập đúng mật khẩu | Tài khoản có ≥3 lần sai; trong vòng 30 giây | Đăng nhập thất bại; hiển thị thông báo "tài khoản bị khóa"; không cấp JWT |

### Ranh giới B2 — Thời gian khóa `lock_duration` (30 giây)

| Mã TC | Biến | Ranh giới | Điểm BVA | Thao tác / Giá trị kiểm thử | Điều kiện tiên quyết | Kết quả mong đợi |
|-------|------|-----------|---------|---------------------------|---------------------|-----------------|
| BVA-FR02-04 | lock_duration | mở khóa tại 30 giây | **Dưới biên** (t = 29 giây) | Nhập đúng mật khẩu tại t=29 giây sau khi bị khóa | Tài khoản vừa bị khóa (t=0) | Đăng nhập thất bại; khóa vẫn còn hiệu lực; thông báo "tài khoản bị khóa" |
| BVA-FR02-05 | lock_duration | mở khóa tại 30 giây | **Tại biên** (t = 30 giây) | Nhập đúng mật khẩu tại t=30 giây sau khi bị khóa | Tài khoản bị khóa đúng 30 giây trước | Đăng nhập thành công; khóa đã được gỡ; JWT trả về |
| BVA-FR02-06 | lock_duration | mở khóa tại 30 giây | **Trên biên** (t = 31 giây) | Nhập đúng mật khẩu tại t=31 giây sau khi bị khóa | Tài khoản bị khóa 31 giây trước | Đăng nhập thành công; khóa đã được gỡ; JWT trả về |

### Ranh giới B3 — Độ dài `email` (RFC 5321 tối đa = 254 ký tự)

> Định dạng dùng để kiểm thử: `a×N + @test.com` trong đó `@test.com` = 9 ký tự  
> 253 ký tự = `a`×244 + `@test.com`  
> 254 ký tự = `a`×245 + `@test.com`  
> 255 ký tự = `a`×246 + `@test.com`

| Mã TC | Biến | Ranh giới | Điểm BVA | Giá trị kiểm thử | Điều kiện tiên quyết | Kết quả mong đợi |
|-------|------|-----------|---------|----------------|---------------------|-----------------|
| BVA-FR02-07 | độ dài email | tối đa = 254 ký tự | **Dưới tối đa** (253 ký tự) | `aaa…a@test.com` (tổng 253 ký tự) | — | Định dạng được chấp nhận; đăng nhập thất bại vì "sai thông tin" (không phải lỗi định dạng) |
| BVA-FR02-08 | độ dài email | tối đa = 254 ký tự | **Tại tối đa** (254 ký tự) | `aaa…a@test.com` (tổng 254 ký tự) | — | Định dạng được chấp nhận; đăng nhập thất bại vì "sai thông tin" (không phải lỗi định dạng) |
| BVA-FR02-09 | độ dài email | tối đa = 254 ký tự | **Vượt tối đa** (255 ký tự) | `aaa…a@test.com` (tổng 255 ký tự) | — | Đăng nhập thất bại; email vượt quá độ dài tối đa; thông báo lỗi định dạng |

### Ranh giới B4 — Sự hiện diện của `password` (tối thiểu = 1 ký tự)

| Mã TC | Biến | Ranh giới | Điểm BVA | Giá trị kiểm thử | Điều kiện tiên quyết | Kết quả mong đợi |
|-------|------|-----------|---------|----------------|---------------------|-----------------|
| BVA-FR02-10 | độ dài password | tối thiểu = 1 ký tự (không rỗng) | **Dưới tối thiểu** (0 ký tự — rỗng) | `test@eshop.com` / `""` | Trạng thái bình thường | Đăng nhập thất bại; thông báo trường bắt buộc; không được tính là lần sai |
| BVA-FR02-11 | độ dài password | tối thiểu = 1 ký tự (không rỗng) | **Tại tối thiểu** (1 ký tự) | `test@eshop.com` / `X` | Trạng thái bình thường | Đăng nhập thất bại; sai thông tin đăng nhập; 1 ký tự là định dạng hợp lệ (chỉ sai giá trị) |

### Ranh giới B5 — Reset bộ đếm liên tiếp

| Mã TC | Biến | Ranh giới | Điểm BVA | Thao tác | Điều kiện tiên quyết | Kết quả mong đợi |
|-------|------|-----------|---------|---------|---------------------|-----------------|
| BVA-FR02-12 | bộ đếm liên tiếp | reset khi đăng nhập thành công | **Tại điểm reset** | Bước 1: đăng nhập đúng sau 2 lần sai. Bước 2: nhập sai 1 lần nữa | 2 lần sai trước đó | Bước 1: thành công, bộ đếm reset về 0. Bước 2: 1 lần sai mới (bộ đếm = 1, không phải 3 — tài khoản **chưa bị khóa**) |

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
