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

> **Tài liệu chỉ dành cho thiết kế.** Cột `Kết quả thực tế` và `Đạt/Không đạt` thuộc về `test-runs/FR02_Login/DomainTesting.md`.  
> Nguyên tắc cô lập: mỗi test case chỉ thay đổi một biến; các biến còn lại giữ giá trị ở phân vùng hợp lệ.

### Test case gốc (Baseline)

| Mã TC | Biến | Phân vùng | Giá trị đầu vào | Điều kiện tiên quyết | Kết quả mong đợi |
|-------|------|-----------|----------------|---------------------|-----------------|
| DT-FR02-01 | email + password | EP-E1 + EP-P1 (tất cả hợp lệ) | `test@eshop.com` / `Test1234!` | Trạng thái tài khoản = bình thường (0 lần sai) | Đăng nhập thành công; JWT token được trả về; chuyển hướng về trang chủ |

### Thay đổi biến: `email`

| Mã TC | Biến | Phân vùng | Giá trị đầu vào | Điều kiện tiên quyết | Kết quả mong đợi |
|-------|------|-----------|----------------|---------------------|-----------------|
| DT-FR02-02 | email | EP-E2 (tài khoản admin) | `admin@eshop.com` / `Admin123!` | Trạng thái bình thường | Đăng nhập thành công; JWT với role=admin được trả về |
| DT-FR02-03 | email | EP-E3 (không tồn tại) | `nobody@test.com` / `Test1234!` | — | Đăng nhập thất bại; hiển thị thông báo lỗi chung; không lộ thông tin tài khoản |
| DT-FR02-04 | email | EP-E4 (thiếu @) | `testeshop.com` / `Test1234!` | — | Đăng nhập thất bại; thông báo sai định dạng email |
| DT-FR02-05 | email | EP-E5 (thiếu domain) | `test@` / `Test1234!` | — | Đăng nhập thất bại; thông báo sai định dạng email |
| DT-FR02-06 | email | EP-E6 (rỗng) | `""` / `Test1234!` | — | Đăng nhập thất bại; thông báo trường bắt buộc |
| DT-FR02-07 | email | EP-E7 (khoảng trắng) | `"   "` / `Test1234!` | — | Đăng nhập thất bại; thông báo sai định dạng email |

### Thay đổi biến: `password`

| Mã TC | Biến | Phân vùng | Giá trị đầu vào | Điều kiện tiên quyết | Kết quả mong đợi |
|-------|------|-----------|----------------|---------------------|-----------------|
| DT-FR02-08 | password | EP-P2 (sai mật khẩu) | `test@eshop.com` / `WrongPass999!` | Trạng thái bình thường (0 lần sai) | Đăng nhập thất bại; thông báo lỗi chung; bộ đếm tăng thêm 1 |
| DT-FR02-09 | password | EP-P3 (rỗng) | `test@eshop.com` / `""` | Trạng thái bình thường | Đăng nhập thất bại; thông báo trường bắt buộc |
| DT-FR02-10 | password | EP-P4 (sai hoa/thường) | `test@eshop.com` / `test1234!` | Trạng thái bình thường | Đăng nhập thất bại; mật khẩu phân biệt hoa/thường |

### Thay đổi biến: `trạng_thái_tài_khoản`

| Mã TC | Biến | Phân vùng | Giá trị đầu vào | Điều kiện tiên quyết | Kết quả mong đợi |
|-------|------|-----------|----------------|---------------------|-----------------|
| DT-FR02-11 | trạng_thái_tài_khoản | EP-A2 (đã có 1 lần sai, nay đăng nhập đúng) | `test@eshop.com` / `Test1234!` | Tài khoản đã có 1 lần sai trước đó | Đăng nhập thành công; JWT trả về; bộ đếm reset về 0 |
| DT-FR02-12 | trạng_thái_tài_khoản | EP-A3 (đã có 2 lần sai, nhập sai lần 3 → kích hoạt khóa) | `test@eshop.com` / `WrongPass999!` | Tài khoản đã có 2 lần sai | Đăng nhập thất bại; lần sai thứ 3 kích hoạt khóa; tài khoản bị khóa 30 giây |
| DT-FR02-13 | trạng_thái_tài_khoản | EP-A4 (đang bị khóa, nhập đúng mật khẩu) | `test@eshop.com` / `Test1234!` | ≥3 lần sai liên tiếp trong vòng 30 giây | Đăng nhập thất bại; hiển thị thông báo "tài khoản bị khóa"; không cấp JWT |
| DT-FR02-14 | trạng_thái_tài_khoản | EP-A5 (hết khóa, nhập đúng mật khẩu) | `test@eshop.com` / `Test1234!` | Tài khoản đã bị khóa nhưng đã qua 30 giây | Đăng nhập thành công; khóa được gỡ; JWT trả về; bộ đếm reset |

### Thay đổi biến: Thuộc tính UI

| Mã TC | Biến | Phân vùng | Nội dung kiểm tra | Điều kiện tiên quyết | Kết quả mong đợi |
|-------|------|-----------|------------------|---------------------|-----------------|
| DT-FR02-15 | kiểu_input_email | EP-U1 | Kiểm tra thuộc tính `type` của thẻ `<input>` email | Mở trang đăng nhập | `type="email"` — trình duyệt tự validate định dạng email |
| DT-FR02-16 | kiểu_input_password | EP-U2 | Kiểm tra thuộc tính `type` của thẻ `<input>` mật khẩu | Mở trang đăng nhập | `type="password"` — ký tự mật khẩu được che |
| DT-FR02-17 | vị_trí_thông_báo_lỗi | EP-U3 | Nhập sai thông tin → quan sát vị trí thông báo lỗi trên DOM | — | Thông báo lỗi hiển thị **phía trên** nút submit, không phải bên dưới |

---

## Bước 5 — Phân tích khoảng cách AI (AI Gap Analysis)

> _Điền sau khi thực thi test tại `test-runs/`. Ghi lại các test case hoặc lỗi mà AI bỏ sót, và giải thích nguyên nhân._

| Khoảng cách | AI bỏ sót? | Nguyên nhân (chất lượng prompt / giới hạn AI / độ phức tạp tính năng) |
|------------|-----------|----------------------------------------------------------------------|
| _(điền sau khi thực thi)_ | | |
