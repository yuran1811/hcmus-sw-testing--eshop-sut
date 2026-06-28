# FR-02: Đăng nhập & Khóa tài khoản — Tóm tắt kiểm thử

**Tính năng:** FR-02 — Đăng nhập & Khóa tài khoản  
**Nhóm tính năng:** Pool A — Xác thực (Authentication)  

---

## Kết quả tổng hợp

### Kiểm thử Miền (Domain Testing)

| Tổng thiết kế | Đã thực thi | Đạt | Không đạt | Tỉ lệ đạt |
|:---:|:---:|:---:|:---:|:---:|
| 17 | 17 | 13 | 4 | 76.5% |

### Phân tích Giá trị Biên (BVA)

| Tổng thiết kế | Đã thực thi | Đạt | Không đạt | Không xác định | Tỉ lệ đạt |
|:---:|:---:|:---:|:---:|:---:|:---:|
| 12 | 12 | 9 | 2 | 1 | 75.0% |

### Tổng hợp toàn bộ FR-02

| Tổng thiết kế | Đã thực thi | Đạt | Không đạt | Không xác định | Lỗi phát hiện |
|:---:|:---:|:---:|:---:|:---:|:---:|
| 29 | 29 | 22 | 6 | 1 | **4** |

---

## Danh sách lỗi phát hiện

| Mã lỗi | Mức độ | Mô tả | Test case liên quan | Trạng thái |
|--------|--------|-------|---------------------|-----------|
| BUG-01 | Cao | Khóa tài khoản không tự gỡ sau 30 giây theo đặc tả | DT-FR02-14, BVA-FR02-06, BVA-FR02-12 | Mở |
| BUG-02 | Cao | Input email có `type="text"` thay vì `type="email"` (vi phạm FR-22) | DT-FR02-15 | Mở |
| BUG-03 | Nghiêm trọng | Input mật khẩu có `type="text"` — mật khẩu hiển thị rõ (vi phạm FR-22 + bảo mật) | DT-FR02-16 | Mở |
| BUG-04 | Trung bình | Thông báo lỗi hiển thị bên **dưới** nút submit thay vì phía trên (vi phạm FR-22) | DT-FR02-17 | Mở |

---

## Chi tiết kết quả theo từng test case

### Domain Testing — Chi tiết

| Mã TC | Mô tả ngắn | Đạt/Không đạt | Ghi chú |
|-------|-----------|:---:|---------|
| DT-FR02-01 | Đăng nhập hợp lệ (user) | Đạt | |
| DT-FR02-02 | Đăng nhập hợp lệ (admin) | Đạt | |
| DT-FR02-03 | Email không tồn tại | Đạt | Thông báo chung, không lộ thông tin |
| DT-FR02-04 | Email thiếu `@` | Đạt | Thông báo chung (không phân biệt định dạng) |
| DT-FR02-05 | Email thiếu domain | Đạt | Thông báo chung |
| DT-FR02-06 | Email rỗng | Đạt | Block bởi `required`, không có thông báo UI |
| DT-FR02-07 | Email chỉ khoảng trắng | Đạt | Thông báo chung |
| DT-FR02-08 | Sai mật khẩu | Đạt | Bộ đếm tăng được xác nhận gián tiếp |
| DT-FR02-09 | Mật khẩu rỗng | Đạt | Block bởi `required`, không có thông báo UI |
| DT-FR02-10 | Mật khẩu sai hoa/thường | Đạt | Backend phân biệt hoa/thường |
| DT-FR02-11 | 1 lần sai → đăng nhập đúng (reset counter) | Đạt | |
| DT-FR02-12 | Lần sai thứ 3 → kích hoạt khóa | Đạt | Khóa xác nhận gián tiếp qua DT-13 |
| DT-FR02-13 | Đang bị khóa → nhập đúng vẫn fail | Đạt | Thông báo không phân biệt "locked" vs "wrong pass" |
| DT-FR02-14 | Sau 30s → khóa tự gỡ | Không đạt | **BUG-01**: khóa không gỡ sau 38s |
| DT-FR02-15 | Input email có `type="email"` | Không đạt | **BUG-02**: type="text" |
| DT-FR02-16 | Input password có `type="password"` | Không đạt | **BUG-03**: type="text", mật khẩu lộ rõ |
| DT-FR02-17 | Thông báo lỗi trên nút submit | Không đạt | **BUG-04**: thông báo bên dưới |

### BVA — Chi tiết

| Mã TC | Ranh giới | Điểm BVA | Đạt/Không đạt | Ghi chú |
|-------|-----------|---------|:---:|---------|
| BVA-FR02-01 | B1: login_attempts=3 | Dưới biên (2 lần sai) | Đạt | Chưa bị khóa |
| BVA-FR02-02 | B1: login_attempts=3 | Tại biên (3 lần sai) | Đạt | Khóa kích hoạt |
| BVA-FR02-03 | B1: locked | Trên biên (trong khóa) | Đạt | Từ chối dù nhập đúng |
| BVA-FR02-04 | B2: lock_duration=30s | Dưới biên (t≈25-28s) | Đạt | Vẫn bị khóa đúng |
| BVA-FR02-05 | B2: lock_duration=30s | Tại biên (t≈30s) | Không xác định | Timing không chính xác, không kết luận được |
| BVA-FR02-06 | B2: lock_duration=30s | Trên biên (t≈35s) | Không đạt | **BUG-01**: vẫn bị khóa sau 35s |
| BVA-FR02-07 | B3: email.length=254 | Dưới tối đa (253 ký tự) | Đạt | Chấp nhận định dạng |
| BVA-FR02-08 | B3: email.length=254 | Tại tối đa (254 ký tự) | Đạt | Chấp nhận định dạng |
| BVA-FR02-09 | B3: email.length=254 | Trên tối đa (255 ký tự) | Đạt | Từ chối (thông báo chung) |
| BVA-FR02-10 | B4: password ≥ 1 ký tự | Dưới tối thiểu (0 ký tự) | Đạt | Block bởi `required` |
| BVA-FR02-11 | B4: password ≥ 1 ký tự | Tại tối thiểu (1 ký tự) | Đạt | Định dạng hợp lệ, sai giá trị |
| BVA-FR02-12 | B5: reset counter khi đăng nhập thành công | Reset | Không đạt | Không kết luận được do **BUG-01** ảnh hưởng |

---

## Quan sát chung về chất lượng FR-02

**Điểm tốt:**
- Hệ thống từ chối đúng mọi trường hợp sai thông tin đăng nhập
- Backend phân biệt hoa/thường trong mật khẩu
- Không lộ thông tin về sự tồn tại của tài khoản (thông báo chung cho mọi thất bại)
- Cơ chế khóa được kích hoạt đúng sau 3 lần sai liên tiếp

**Điểm cần sửa (bugs):**
- Cơ chế mở khóa sau 30 giây không hoạt động → tài khoản bị khóa vĩnh viễn
- Các input form không đúng HTML type theo FR-22 → ảnh hưởng accessibility và bảo mật
- Vị trí thông báo lỗi sai theo FR-22
- Thiếu thông báo cụ thể khi tài khoản đang bị khóa (không phân biệt với sai mật khẩu)
