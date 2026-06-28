# FR-02: Đăng nhập & Khóa tài khoản — Kiểm thử Miền (Thiết kế Test Case)

**Tính năng:** FR-02 — Đăng nhập & Khóa tài khoản  
**Nhóm tính năng:** Pool A — Xác thực (Authentication)  
**Nguồn đặc tả:** `README.md` §FR-02, §FR-22  
**Phương pháp:** Kiểm thử Miền — Phân vùng tương đương (Equivalence Partitioning)  
**Hướng dẫn kỹ thuật:** `.claude/skills/domain-testing`

---

## Bước 1 — Xác định biến đầu vào

Liệt kê tất cả đầu vào ảnh hưởng đến hành vi của FR-02, bao gồm cả biến trạng thái ẩn:

| # | Biến | Nguồn | Kiểu dữ liệu | Ghi chú |
|---|------|--------|--------------|---------|
| 1 | `email` | Body request / trường form UI | Chuỗi ký tự | Xác định tài khoản |
| 2 | `password` | Body request / trường form UI | Chuỗi ký tự | Xác thực người dùng |
| 3 | `trạng_thái_tài_khoản` | DB: `login_attempts`, `locked_until` | Biến ẩn (derived) | Quyết định có cho phép đăng nhập hay không |
| 4 | `kiểu_input_email` | Thuộc tính HTML | Thuộc tính UI | Đặc tả FR-22: bắt buộc dùng `type="email"` |
| 5 | `kiểu_input_password` | Thuộc tính HTML | Thuộc tính UI | Đặc tả FR-22: bắt buộc dùng `type="password"` |
| 6 | `vị_trí_thông_báo_lỗi` | Giao diện render | Hành vi UI | Đặc tả FR-22: thông báo lỗi phải hiển thị phía trên nút submit |

---

## Bước 2 — Định nghĩa miền

| Biến | Kiểu dữ liệu | Định dạng / Phạm vi hợp lệ | Ràng buộc từ đặc tả |
|------|-------------|---------------------------|---------------------|
| `email` | Chuỗi | Định dạng RFC 5321 | Phải chứa `@` và phần domain; tối đa 254 ký tự; phải tồn tại trong hệ thống để đăng nhập thành công |
| `password` | Chuỗi | Bất kỳ ký tự nào có thể in | Phải khớp chính xác với mật khẩu đã lưu (phân biệt hoa/thường) |
| `trạng_thái_tài_khoản` | Biến phái sinh | login_attempts ∈ [0, ∞); locked_until = NULL hoặc datetime | ≥3 lần sai liên tiếp → khóa 30 giây; đăng nhập thành công → reset bộ đếm về 0 |
| `kiểu_input_email` | Thuộc tính HTML | `type="email"` | FR-22: bắt buộc là `type="email"` |
| `kiểu_input_password` | Thuộc tính HTML | `type="password"` | FR-22: bắt buộc là `type="password"` |
| `vị_trí_thông_báo_lỗi` | Bố cục UI | Phía trên nút submit | FR-22: thông báo lỗi phải ở trên nút submit, không phải bên dưới |

---

## Bước 3 — Phân vùng tương đương

### 3.1 Biến: `email`

| Mã phân vùng | Tên phân vùng | Mô tả | Giá trị đại diện | Loại |
|-------------|--------------|-------|-----------------|------|
| EP-E1 | Hợp lệ — tài khoản người dùng | Đúng định dạng, tồn tại trong hệ thống với vai trò user | `test@eshop.com` | Hợp lệ |
| EP-E2 | Hợp lệ — tài khoản admin | Đúng định dạng, tồn tại trong hệ thống với vai trò admin | `admin@eshop.com` | Hợp lệ |
| EP-E3 | Không hợp lệ — không tồn tại | Đúng định dạng nhưng không có trong hệ thống | `nobody@test.com` | Không hợp lệ |
| EP-E4 | Không hợp lệ — thiếu @ | Không có ký tự `@` | `testeshop.com` | Không hợp lệ |
| EP-E5 | Không hợp lệ — thiếu domain | Có `@` nhưng không có phần domain | `test@` | Không hợp lệ |
| EP-E6 | Không hợp lệ — chuỗi rỗng | Chuỗi trống | `""` | Không hợp lệ |
| EP-E7 | Không hợp lệ — chỉ có khoảng trắng | Chỉ chứa dấu cách | `"   "` | Không hợp lệ |

### 3.2 Biến: `password`

| Mã phân vùng | Tên phân vùng | Mô tả | Giá trị đại diện | Loại |
|-------------|--------------|-------|-----------------|------|
| EP-P1 | Hợp lệ — đúng mật khẩu | Khớp chính xác với mật khẩu đã lưu | `Test1234!` | Hợp lệ |
| EP-P2 | Không hợp lệ — sai mật khẩu | Chuỗi khác, không phải mật khẩu đúng | `WrongPass999!` | Không hợp lệ |
| EP-P3 | Không hợp lệ — chuỗi rỗng | Chuỗi trống | `""` | Không hợp lệ |
| EP-P4 | Không hợp lệ — sai hoa/thường | Đúng ký tự nhưng khác kiểu chữ | `test1234!` | Không hợp lệ |

### 3.3 Biến: `trạng_thái_tài_khoản`

| Mã phân vùng | Tên phân vùng | Mô tả | Điều kiện tiên quyết | Loại |
|-------------|--------------|-------|---------------------|------|
| EP-A1 | Bình thường | 0 lần sai liên tiếp; không bị khóa | Tài khoản mới hoặc đã được reset | Hợp lệ |
| EP-A2 | 1 lần sai trước đó | Đã có 1 lần sai; chưa bị khóa | Thực hiện 1 lần đăng nhập sai | Hợp lệ (vẫn được thử) |
| EP-A3 | 2 lần sai trước đó | Đã có 2 lần sai; thêm 1 lần nữa sẽ khóa | Thực hiện 2 lần đăng nhập sai | Hợp lệ (vẫn được thử) |
| EP-A4 | Đang bị khóa | ≥3 lần sai liên tiếp trong vòng 30 giây | Thực hiện 3 lần đăng nhập sai, chưa quá 30 giây | Không hợp lệ — mọi thao tác đều bị chặn |
| EP-A5 | Hết thời gian khóa | Đã bị khóa nhưng đã qua 30 giây | Thực hiện 3 lần sai, chờ đủ 30 giây | Hợp lệ (khóa đã được gỡ) |

### 3.4 Thuộc tính UI

| Mã phân vùng | Tên phân vùng | Mô tả | Loại |
|-------------|--------------|-------|------|
| EP-U1 | Đúng kiểu input email | `<input type="email">` trên trường email | Hợp lệ |
| EP-U2 | Đúng kiểu input password | `<input type="password">` trên trường mật khẩu | Hợp lệ |
| EP-U3 | Vị trí thông báo lỗi đúng | Thông báo lỗi hiển thị phía trên nút submit | Hợp lệ |

---

## Bước 4 — Danh sách Test Case

> **Tài liệu chỉ dành cho thiết kế.** Kết quả thực tế thuộc về `test-runs/FR02_Login/DomainTesting.md`.  
> Nguyên tắc cô lập: mỗi test case chỉ thay đổi một biến; các biến còn lại giữ giá trị ở phân vùng hợp lệ.

---

# DT-FR02-01: Đăng nhập thành công — tài khoản user hợp lệ

## Requirement ID
FR-02

## Module / Test type / Technique
FR02 Login / Functional / Equivalence Partitioning

## Preconditions
- Trạng thái tài khoản = bình thường (0 lần sai)
- User đang ở trang Login

## Test data
| Email | test@eshop.com |
| Password | Test1234! |
| Phân vùng | EP-E1 + EP-P1 (tất cả hợp lệ) |

## Test steps
1. Mở trang Login
2. Nhập email `test@eshop.com`
3. Nhập password `Test1234!`
4. Bấm Login

## Expected result
Đăng nhập thành công; JWT token được trả về; chuyển hướng về trang chủ.

## Status / Related bugs
Not Run / None

---

# DT-FR02-02: Đăng nhập thành công — tài khoản admin

## Requirement ID
FR-02

## Module / Test type / Technique
FR02 Login / Functional / Equivalence Partitioning

## Preconditions
- Trạng thái tài khoản admin = bình thường
- User đang ở trang Login

## Test data
| Email | admin@eshop.com |
| Password | Admin123! |
| Phân vùng | EP-E2 (tài khoản admin) |

## Test steps
1. Mở trang Login
2. Nhập email `admin@eshop.com`
3. Nhập password `Admin123!`
4. Bấm Login

## Expected result
Đăng nhập thành công; JWT với role=admin được trả về.

## Status / Related bugs
Not Run / None

---

# DT-FR02-03: Đăng nhập thất bại — email không tồn tại trong hệ thống

## Requirement ID
FR-02

## Module / Test type / Technique
FR02 Login / Functional / Equivalence Partitioning

## Preconditions
- User đang ở trang Login

## Test data
| Email | nobody@test.com |
| Password | Test1234! |
| Phân vùng | EP-E3 (email không tồn tại) |

## Test steps
1. Mở trang Login
2. Nhập email `nobody@test.com` (không tồn tại trong hệ thống)
3. Nhập password `Test1234!`
4. Bấm Login

## Expected result
Đăng nhập thất bại; hiển thị thông báo lỗi chung; không lộ thông tin tài khoản.

## Status / Related bugs
Not Run / None

---

# DT-FR02-04: Đăng nhập thất bại — email thiếu ký tự @

## Requirement ID
FR-02

## Module / Test type / Technique
FR02 Login / Functional / Equivalence Partitioning

## Preconditions
- User đang ở trang Login

## Test data
| Email | testeshop.com |
| Password | Test1234! |
| Phân vùng | EP-E4 (thiếu @) |

## Test steps
1. Mở trang Login
2. Nhập email `testeshop.com` (thiếu ký tự @)
3. Nhập password `Test1234!`
4. Bấm Login

## Expected result
Đăng nhập thất bại; thông báo sai định dạng email.

## Status / Related bugs
Not Run / None

---

# DT-FR02-05: Đăng nhập thất bại — email thiếu phần domain

## Requirement ID
FR-02

## Module / Test type / Technique
FR02 Login / Functional / Equivalence Partitioning

## Preconditions
- User đang ở trang Login

## Test data
| Email | test@ |
| Password | Test1234! |
| Phân vùng | EP-E5 (thiếu domain) |

## Test steps
1. Mở trang Login
2. Nhập email `test@` (thiếu phần domain)
3. Nhập password `Test1234!`
4. Bấm Login

## Expected result
Đăng nhập thất bại; thông báo sai định dạng email.

## Status / Related bugs
Not Run / None

---

# DT-FR02-06: Đăng nhập thất bại — email để trống

## Requirement ID
FR-02

## Module / Test type / Technique
FR02 Login / Functional / Equivalence Partitioning

## Preconditions
- User đang ở trang Login

## Test data
| Email | (rỗng) |
| Password | Test1234! |
| Phân vùng | EP-E6 (chuỗi rỗng) |

## Test steps
1. Mở trang Login
2. Để trống trường email
3. Nhập password `Test1234!`
4. Bấm Login

## Expected result
Đăng nhập thất bại; thông báo trường bắt buộc.

## Status / Related bugs
Not Run / None

---

# DT-FR02-07: Đăng nhập thất bại — email chỉ chứa khoảng trắng

## Requirement ID
FR-02

## Module / Test type / Technique
FR02 Login / Functional / Equivalence Partitioning

## Preconditions
- User đang ở trang Login

## Test data
| Email | "   " (3 dấu cách) |
| Password | Test1234! |
| Phân vùng | EP-E7 (chỉ khoảng trắng) |

## Test steps
1. Mở trang Login
2. Nhập 3 dấu cách vào trường email
3. Nhập password `Test1234!`
4. Bấm Login

## Expected result
Đăng nhập thất bại; thông báo sai định dạng email.

## Status / Related bugs
Not Run / None

---

# DT-FR02-08: Đăng nhập thất bại — sai mật khẩu, bộ đếm tăng

## Requirement ID
FR-02

## Module / Test type / Technique
FR02 Login / Functional / Equivalence Partitioning

## Preconditions
- Trạng thái tài khoản = bình thường (0 lần sai)
- User đang ở trang Login

## Test data
| Email | test@eshop.com |
| Password | WrongPass999! |
| Phân vùng | EP-P2 (sai mật khẩu) |

## Test steps
1. Mở trang Login
2. Nhập email `test@eshop.com`
3. Nhập password sai `WrongPass999!`
4. Bấm Login

## Expected result
Đăng nhập thất bại; thông báo lỗi chung; bộ đếm tăng thêm 1.

## Status / Related bugs
Not Run / None

---

# DT-FR02-09: Đăng nhập thất bại — password để trống

## Requirement ID
FR-02

## Module / Test type / Technique
FR02 Login / Functional / Equivalence Partitioning

## Preconditions
- Trạng thái tài khoản = bình thường
- User đang ở trang Login

## Test data
| Email | test@eshop.com |
| Password | (rỗng) |
| Phân vùng | EP-P3 (password rỗng) |

## Test steps
1. Mở trang Login
2. Nhập email `test@eshop.com`
3. Để trống trường password
4. Bấm Login

## Expected result
Đăng nhập thất bại; thông báo trường bắt buộc.

## Status / Related bugs
Not Run / None

---

# DT-FR02-10: Đăng nhập thất bại — password sai hoa/thường

## Requirement ID
FR-02

## Module / Test type / Technique
FR02 Login / Functional / Equivalence Partitioning

## Preconditions
- Trạng thái tài khoản = bình thường
- User đang ở trang Login

## Test data
| Email | test@eshop.com |
| Password | test1234! (chữ thường — sai hoa/thường) |
| Phân vùng | EP-P4 (sai hoa/thường) |

## Test steps
1. Mở trang Login
2. Nhập email `test@eshop.com`
3. Nhập password `test1234!` (sai hoa/thường so với `Test1234!`)
4. Bấm Login

## Expected result
Đăng nhập thất bại; mật khẩu phân biệt hoa/thường.

## Status / Related bugs
Not Run / None

---

# DT-FR02-11: Đăng nhập thành công sau 1 lần sai — bộ đếm reset

## Requirement ID
FR-02

## Module / Test type / Technique
FR02 Login / Functional / Equivalence Partitioning

## Preconditions
- Tài khoản đã có 1 lần sai trước đó
- User đang ở trang Login

## Test data
| Email | test@eshop.com |
| Password | Test1234! |
| Phân vùng | EP-A2 (1 lần sai trước đó, đăng nhập đúng) |

## Test steps
1. (Setup) Đăng nhập sai 1 lần để có 1 lần sai trong bộ đếm
2. Nhập email `test@eshop.com` và password đúng `Test1234!`
3. Bấm Login

## Expected result
Đăng nhập thành công; JWT trả về; bộ đếm reset về 0.

## Status / Related bugs
Not Run / None

---

# DT-FR02-12: Lần sai thứ 3 kích hoạt khóa tài khoản 30 giây

## Requirement ID
FR-02

## Module / Test type / Technique
FR02 Login / Functional / Equivalence Partitioning

## Preconditions
- Tài khoản đã có 2 lần sai
- User đang ở trang Login

## Test data
| Email | test@eshop.com |
| Password | WrongPass999! |
| Phân vùng | EP-A3 (2 lần sai, nhập sai lần 3 → kích hoạt khóa) |

## Test steps
1. (Setup) Đăng nhập sai 2 lần
2. Nhập email đúng `test@eshop.com`, password sai `WrongPass999!` lần thứ 3
3. Bấm Login

## Expected result
Đăng nhập thất bại; lần sai thứ 3 kích hoạt khóa; tài khoản bị khóa 30 giây.

## Status / Related bugs
Not Run / None

---

# DT-FR02-13: Đăng nhập thất bại khi tài khoản đang bị khóa

## Requirement ID
FR-02

## Module / Test type / Technique
FR02 Login / Functional / Equivalence Partitioning

## Preconditions
- ≥3 lần sai liên tiếp trong vòng 30 giây
- Tài khoản đang bị khóa

## Test data
| Email | test@eshop.com |
| Password | Test1234! (đúng) |
| Phân vùng | EP-A4 (đang bị khóa) |

## Test steps
1. (Setup) Kích hoạt khóa bằng cách đăng nhập sai 3 lần
2. Trong vòng 30 giây, nhập email `test@eshop.com` và password đúng `Test1234!`
3. Bấm Login

## Expected result
Đăng nhập thất bại; hiển thị thông báo "tài khoản bị khóa"; không cấp JWT.

## Status / Related bugs
Not Run / None

---

# DT-FR02-14: Đăng nhập thành công sau khi hết thời gian khóa 30 giây

## Requirement ID
FR-02

## Module / Test type / Technique
FR02 Login / Functional / Equivalence Partitioning

## Preconditions
- Tài khoản đã bị khóa nhưng đã qua 30 giây
- User đang ở trang Login

## Test data
| Email | test@eshop.com |
| Password | Test1234! |
| Phân vùng | EP-A5 (hết thời gian khóa) |

## Test steps
1. (Setup) Kích hoạt khóa tài khoản
2. Chờ hơn 30 giây
3. Nhập email `test@eshop.com` và password đúng `Test1234!`
4. Bấm Login

## Expected result
Đăng nhập thành công; khóa được gỡ; JWT trả về; bộ đếm reset.

## Status / Related bugs
Not Run / None

---

# DT-FR02-15: Kiểm tra thuộc tính type="email" của trường email

## Requirement ID
FR-22

## Module / Test type / Technique
FR02 Login / UI Attribute / Equivalence Partitioning

## Preconditions
- Mở trang đăng nhập

## Test data
| URL | /login |
| Phân vùng | EP-U1 (đúng kiểu input email) |

## Test steps
1. Mở trang Login
2. Inspect element trường email
3. Kiểm tra thuộc tính `type` của thẻ `<input>` email

## Expected result
`type="email"` — trình duyệt tự validate định dạng email.

## Status / Related bugs
Not Run / None

---

# DT-FR02-16: Kiểm tra thuộc tính type="password" của trường mật khẩu

## Requirement ID
FR-22

## Module / Test type / Technique
FR02 Login / UI Attribute / Equivalence Partitioning

## Preconditions
- Mở trang đăng nhập

## Test data
| URL | /login |
| Phân vùng | EP-U2 (đúng kiểu input password) |

## Test steps
1. Mở trang Login
2. Inspect element trường mật khẩu
3. Kiểm tra thuộc tính `type` của thẻ `<input>` mật khẩu

## Expected result
`type="password"` — ký tự mật khẩu được che.

## Status / Related bugs
Not Run / None

---

# DT-FR02-17: Thông báo lỗi hiển thị phía trên nút submit

## Requirement ID
FR-22

## Module / Test type / Technique
FR02 Login / UI Layout / Equivalence Partitioning

## Preconditions
- Mở trang đăng nhập

## Test data
| Email | nobody@test.com |
| Password | wrong |
| Phân vùng | EP-U3 (vị trí thông báo lỗi) |

## Test steps
1. Mở trang Login
2. Nhập thông tin đăng nhập sai
3. Bấm Login
4. Quan sát vị trí thông báo lỗi trên DOM

## Expected result
Thông báo lỗi hiển thị **phía trên** nút submit, không phải bên dưới.

## Status / Related bugs
Not Run / None

---

## Bước 5 — Phân tích khoảng cách AI (AI Gap Analysis)

> _Điền sau khi thực thi test tại `test-runs/`. Ghi lại các test case hoặc lỗi mà AI bỏ sót, và giải thích nguyên nhân._

| Khoảng cách | AI bỏ sót? | Nguyên nhân (chất lượng prompt / giới hạn AI / độ phức tạp tính năng) |
|------------|-----------|----------------------------------------------------------------------|
| _(điền sau khi thực thi)_ | | |
