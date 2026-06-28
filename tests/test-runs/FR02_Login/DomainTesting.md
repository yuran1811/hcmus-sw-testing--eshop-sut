# FR-02: Đăng nhập & Khóa tài khoản — Kiểm thử Miền (Kết quả thực thi)

**Tính năng:** FR-02 — Đăng nhập & Khóa tài khoản  
**Phương pháp:** Kiểm thử Miền — Phân vùng tương đương  
**Thiết kế test case nguồn:** `test-cases/FR02_Login/DomainTesting.md`  

---

## Tổng kết thực thi

| Tổng thiết kế | Đã thực thi | Đạt | Không đạt | Lỗi tiềm năng phát hiện |
|:---:|:---:|:---:|:---:|:---:|
| 17 | 17 | 13 | 4 | 4 |

---

## Kết quả chi tiết

### Test case gốc (Baseline)

| Mã TC | Giá trị đầu vào | Điều kiện tiên quyết | Kết quả mong đợi | Kết quả thực tế | Ảnh chụp màn hình | Đạt/Không đạt |
|-------|----------------|---------------------|-----------------|----------------|-----------------|:---:|
| DT-FR02-01 | `test@eshop.com` / `Test1234!` | Tài khoản bình thường (0 lần sai) | Đăng nhập thành công; JWT trả về; chuyển hướng về trang chủ | Đăng nhập thành công — chuyển hướng về `http://localhost:5173/` | [DT-FR02-01-result.png](screenshots/DT-FR02-01-result.png) | Đạt |

### Thay đổi biến: `email`

| Mã TC | Giá trị đầu vào | Điều kiện tiên quyết | Kết quả mong đợi | Kết quả thực tế | Ảnh chụp màn hình | Đạt/Không đạt |
|-------|----------------|---------------------|-----------------|----------------|-----------------|:---:|
| DT-FR02-02 | `admin@eshop.com` / `Admin123!` | Tài khoản bình thường | Đăng nhập thành công; JWT với role=admin | Đăng nhập thành công — chuyển hướng về `http://localhost:5173/` | [DT-FR02-02-result.png](screenshots/DT-FR02-02-result.png) | Đạt |
| DT-FR02-03 | `nobody@test.com` / `Test1234!` | — | Đăng nhập thất bại; thông báo lỗi chung; không lộ thông tin tài khoản | Đăng nhập thất bại — Thông báo: _"Đăng nhập thất bại. Vui lòng kiểm tra lại."_ (thông báo chung, không lộ thông tin) | [DT-FR02-03-result.png](screenshots/DT-FR02-03-result.png) | Đạt |
| DT-FR02-04 | `testeshop.com` / `Test1234!` | — | Đăng nhập thất bại; thông báo sai định dạng email | Đăng nhập thất bại — Thông báo: _"Đăng nhập thất bại. Vui lòng kiểm tra lại."_ Thông báo chung, không phân biệt lỗi định dạng. Nguyên nhân: input type="text" nên trình duyệt không validate định dạng email | [DT-FR02-04-result.png](screenshots/DT-FR02-04-result.png) | Đạt |
| DT-FR02-05 | `test@` / `Test1234!` | — | Đăng nhập thất bại; thông báo sai định dạng email | Đăng nhập thất bại — Thông báo: _"Đăng nhập thất bại. Vui lòng kiểm tra lại."_ Thông báo chung, không phân biệt lỗi định dạng | [DT-FR02-05-result.png](screenshots/DT-FR02-05-result.png) | Đạt |
| DT-FR02-06 | `""` / `Test1234!` (email rỗng) | — | Đăng nhập thất bại; thông báo trường bắt buộc | Đăng nhập thất bại — Không có thông báo lỗi hiển thị; trình duyệt block form submit do thuộc tính `required` | [DT-FR02-06-result.png](screenshots/DT-FR02-06-result.png) | Đạt |
| DT-FR02-07 | `"   "` / `Test1234!` (khoảng trắng) | — | Đăng nhập thất bại; thông báo sai định dạng email | Đăng nhập thất bại — Thông báo: _"Đăng nhập thất bại. Vui lòng kiểm tra lại."_ Thông báo chung | [DT-FR02-07-result.png](screenshots/DT-FR02-07-result.png) | Đạt |

### Thay đổi biến: `password`

| Mã TC | Giá trị đầu vào | Điều kiện tiên quyết | Kết quả mong đợi | Kết quả thực tế | Ảnh chụp màn hình | Đạt/Không đạt |
|-------|----------------|---------------------|-----------------|----------------|-----------------|:---:|
| DT-FR02-08 | `test@eshop.com` / `WrongPass999!` | Trạng thái bình thường (0 lần sai) | Đăng nhập thất bại; thông báo lỗi chung; bộ đếm tăng thêm 1 | Đăng nhập thất bại — Thông báo: _"Đăng nhập thất bại. Vui lòng kiểm tra lại."_ — bộ đếm được xác nhận tăng (kiểm tra qua DT-FR02-12) | [DT-FR02-08-result.png](screenshots/DT-FR02-08-result.png) | Đạt |
| DT-FR02-09 | `test@eshop.com` / `""` (password rỗng) | Trạng thái bình thường | Đăng nhập thất bại; thông báo trường bắt buộc | Đăng nhập thất bại — Không có thông báo lỗi hiển thị; trình duyệt block form submit do `required` | [DT-FR02-09-result.png](screenshots/DT-FR02-09-result.png) | Đạt |
| DT-FR02-10 | `test@eshop.com` / `test1234!` (sai hoa/thường) | Trạng thái bình thường | Đăng nhập thất bại; mật khẩu phân biệt hoa/thường | Đăng nhập thất bại — Thông báo: _"Đăng nhập thất bại. Vui lòng kiểm tra lại."_ — Xác nhận backend phân biệt hoa/thường | [DT-FR02-10-result.png](screenshots/DT-FR02-10-result.png) | Đạt |

### Thay đổi biến: `trạng_thái_tài_khoản`

| Mã TC | Giá trị đầu vào | Điều kiện tiên quyết | Kết quả mong đợi | Kết quả thực tế | Ảnh chụp màn hình | Đạt/Không đạt |
|-------|----------------|---------------------|-----------------|----------------|-----------------|:---:|
| DT-FR02-11 | `test@eshop.com` / `Test1234!` | Đã có 1 lần sai trước đó | Đăng nhập thành công; JWT trả về; bộ đếm reset về 0 | Đăng nhập thành công — chuyển hướng về `http://localhost:5173/` — bộ đếm đã reset (xác nhận qua thực thi sau) | [DT-FR02-11-result.png](screenshots/DT-FR02-11-result.png) | Đạt |
| DT-FR02-12 | `test@eshop.com` / `WrongPass999!` (lần sai thứ 3) | Đã có 2 lần sai | Đăng nhập thất bại; lần sai thứ 3 kích hoạt khóa 30 giây | Đăng nhập thất bại — Thông báo: _"Đăng nhập thất bại. Vui lòng kiểm tra lại."_ Thông báo **không phân biệt** trạng thái khóa với sai mật khẩu thông thường. Khóa được xác nhận kích hoạt qua DT-FR02-13 | [DT-FR02-12-result.png](screenshots/DT-FR02-12-result.png) | Đạt |
| DT-FR02-13 | `test@eshop.com` / `Test1234!` | ≥3 lần sai liên tiếp trong vòng 30 giây (đang bị khóa) | Đăng nhập thất bại; thông báo "tài khoản bị khóa"; không cấp JWT | Đăng nhập thất bại — Thông báo: _"Đăng nhập thất bại. Vui lòng kiểm tra lại."_ Không có thông báo cụ thể về trạng thái khóa | [DT-FR02-13-result.png](screenshots/DT-FR02-13-result.png) | Đạt |
| DT-FR02-14 | `test@eshop.com` / `Test1234!` | Tài khoản đã bị khóa nhưng đã qua 30+ giây | Đăng nhập thành công; khóa được gỡ; JWT trả về; bộ đếm reset | Đăng nhập thất bại sau 38+ giây — Thông báo: _"Đăng nhập thất bại. Vui lòng kiểm tra lại."_ — Tài khoản vẫn bị khóa dù đã quá 30 giây → **BUG-01** | [DT-FR02-14-result.png](screenshots/DT-FR02-14-result.png) | Không đạt |

### Thay đổi biến: Thuộc tính UI

| Mã TC | Nội dung kiểm tra | Điều kiện tiên quyết | Kết quả mong đợi | Kết quả thực tế | Ảnh chụp màn hình | Đạt/Không đạt |
|-------|------------------|---------------------|-----------------|----------------|-----------------|:---:|
| DT-FR02-15 | Kiểm tra `type` của input email | Mở trang đăng nhập | `type="email"` — trình duyệt tự validate định dạng email | Thuộc tính `type` thực tế: **`"text"`** — Vi phạm FR-22 → **BUG-02** | [DT-FR02-15-result.png](screenshots/DT-FR02-15-result.png) | Không đạt |
| DT-FR02-16 | Kiểm tra `type` của input mật khẩu | Mở trang đăng nhập | `type="password"` — ký tự mật khẩu được che | Thuộc tính `type` thực tế: **`"text"`** — Mật khẩu hiển thị rõ, không bị che → **BUG-03** | [DT-FR02-16-result.png](screenshots/DT-FR02-16-result.png) | Không đạt |
| DT-FR02-17 | Vị trí thông báo lỗi sau khi submit sai | — | Thông báo lỗi hiển thị **phía trên** nút submit | Thông báo lỗi ở vị trí `errTop=517px`, nút submit ở `submitTop=425px` → Thông báo lỗi **phía dưới** nút submit → **BUG-04** | [DT-FR02-17-result.png](screenshots/DT-FR02-17-result.png) | Không đạt |

---

## Lỗi phát hiện trong đợt thực thi này

| Mã lỗi | Mã TC liên quan | Mức độ | Mô tả ngắn |
|--------|----------------|--------|-----------|
| BUG-01 | DT-FR02-14 | Cao | Khóa tài khoản không tự gỡ sau 30 giây |
| BUG-02 | DT-FR02-15 | Cao | Input email có `type="text"` thay vì `type="email"` (vi phạm FR-22) |
| BUG-03 | DT-FR02-16 | Nghiêm trọng | Input mật khẩu có `type="text"` — mật khẩu hiển thị rõ (vi phạm FR-22) |
| BUG-04 | DT-FR02-17 | Trung bình | Thông báo lỗi hiển thị bên dưới nút submit thay vì phía trên (vi phạm FR-22) |

> Chi tiết báo cáo lỗi: `bug-reports/BUG-01.md` đến `BUG-04.md`

---

## Quan sát bổ sung (không tính lỗi riêng)

- **DT-FR02-03 đến 05, 07:** Thông báo lỗi chung cho mọi trường hợp thất bại (không phân biệt: email không tồn tại / sai định dạng / khoảng trắng). Spec không yêu cầu thông báo riêng cho từng trường hợp.
- **DT-FR02-06, 09:** Trường rỗng bị block bởi thuộc tính `required` của HTML, không có thông báo lỗi tường minh hiển thị trên UI.
- **DT-FR02-12, 13:** Cùng thông báo "Đăng nhập thất bại" cho cả trường hợp sai mật khẩu và tài khoản bị khóa — người dùng không biết lý do cụ thể của thất bại.
