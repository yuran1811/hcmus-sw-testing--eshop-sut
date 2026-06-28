# FR-02: Đăng nhập & Khóa tài khoản — Phân tích Giá trị Biên (Kết quả thực thi)

**Tính năng:** FR-02 — Đăng nhập & Khóa tài khoản  
**Phương pháp:** Phân tích Giá trị Biên (BVA) — 3 điểm mỗi biên  
**Thiết kế test case nguồn:** `test-cases/FR02_Login/BVA.md`  

---

## Tổng kết thực thi

| Tổng thiết kế | Đã thực thi | Đạt | Không đạt | Không xác định | Lỗi tiềm năng phát hiện |
|:---:|:---:|:---:|:---:|:---:|:---:|
| 12 | 12 | 9 | 2 | 1 | 1 |

---

## Kết quả chi tiết

### Ranh giới B1 — Ngưỡng khóa `login_attempts` (ngưỡng = 3)

| Mã TC | Giá trị / Thao tác kiểm thử | Điều kiện tiên quyết | Kết quả mong đợi | Kết quả thực tế | Ảnh chụp màn hình | Đạt/Không đạt |
|-------|---------------------------|---------------------|-----------------|----------------|-----------------|:---:|
| BVA-FR02-01 | Nhập sai mật khẩu (tổng = 2 lần sai — dưới biên) | Tài khoản đã có 1 lần sai | Thất bại; tổng = 2; chưa bị khóa; có thể thử lại | Đăng nhập thất bại — Thông báo: _"Đăng nhập thất bại. Vui lòng kiểm tra lại."_ — Tài khoản chưa bị khóa (xác nhận qua lần thử tiếp theo vẫn nhận được cùng thông báo chứ không phải thông báo khóa) | [BVA-FR02-01-result.png](screenshots/BVA-FR02-01-result.png) | Đạt |
| BVA-FR02-02 | Nhập sai mật khẩu (tổng = 3 lần sai — tại biên) | Tài khoản đã có 2 lần sai | Thất bại; tổng = 3; tài khoản BỊ KHÓA 30 giây | Đăng nhập thất bại — Thông báo: _"Đăng nhập thất bại. Vui lòng kiểm tra lại."_ Không có thông báo riêng biệt về việc kích hoạt khóa. Khóa được xác nhận gián tiếp qua BVA-FR02-03 | [BVA-FR02-02-result.png](screenshots/BVA-FR02-02-result.png) | Đạt |
| BVA-FR02-03 | Nhập đúng mật khẩu trong khi bị khóa (trên biên) | Tài khoản có ≥3 lần sai; trong vòng 30 giây | Thất bại; thông báo "tài khoản bị khóa"; không cấp JWT | Đăng nhập thất bại — Thông báo: _"Đăng nhập thất bại. Vui lòng kiểm tra lại."_ Không phân biệt khóa vs sai mật khẩu | [BVA-FR02-03-result.png](screenshots/BVA-FR02-03-result.png) | Đạt |

### Ranh giới B2 — Thời gian khóa `lock_duration` (30 giây)

| Mã TC | Giá trị / Thao tác kiểm thử | Điều kiện tiên quyết | Kết quả mong đợi | Kết quả thực tế | Ảnh chụp màn hình | Đạt/Không đạt |
|-------|---------------------------|---------------------|-----------------|----------------|-----------------|:---:|
| BVA-FR02-04 | Nhập đúng mật khẩu tại t ≈ 25–28 giây sau khi bị khóa (dưới biên) | Tài khoản vừa bị khóa | Thất bại; khóa vẫn hiệu lực | Đăng nhập thất bại (thực hiện tại t ≈ 25–28s từ khi bị khóa) — Thông báo: _"Đăng nhập thất bại. Vui lòng kiểm tra lại."_ — Khóa còn hiệu lực | [BVA-FR02-04-result.png](screenshots/BVA-FR02-04-result.png) | Đạt |
| BVA-FR02-05 | Nhập đúng mật khẩu tại t ≈ 30 giây (tại biên) | Tài khoản bị khóa | Thành công; khóa đã hết hạn | Không xác định — Thời gian thực thi trong lần này đo được t ≈ 25–28s kể từ khi khóa được kích hoạt (do tính toán timing trong script bị sai lệch). Chưa thể xác nhận hành vi chính xác tại t=30s. Tuy nhiên, BVA-FR02-06 xác nhận lỗi không mở khóa sau 35s → **BUG-01** vẫn áp dụng | [BVA-FR02-05-result.png](screenshots/BVA-FR02-05-result.png) | Không xác định |
| BVA-FR02-06 | Nhập đúng mật khẩu tại t ≈ 35 giây (trên biên) | Tài khoản bị khóa 31+ giây trước | Thành công; khóa đã hết hạn; JWT trả về | Đăng nhập thất bại sau t ≈ 35 giây từ khi bị khóa — Thông báo: _"Đăng nhập thất bại. Vui lòng kiểm tra lại."_ — Tài khoản vẫn bị khóa dù đã vượt 30 giây → **BUG-01** | [BVA-FR02-06-result.png](screenshots/BVA-FR02-06-result.png) | Không đạt |

> **Ghi chú BVA-05:** Do hạn chế timing trong kịch bản thực thi (các login setup làm tăng thời gian đo), thời điểm t=30s chính xác chưa được kiểm thử. Cần thực thi lại với timing chính xác hơn. Kết quả BVA-06 (t≈35s vẫn fail) đã đủ xác nhận Bug-01.

### Ranh giới B3 — Độ dài `email` (RFC 5321 tối đa = 254 ký tự)

| Mã TC | Giá trị / Thao tác kiểm thử | Điều kiện tiên quyết | Kết quả mong đợi | Kết quả thực tế | Ảnh chụp màn hình | Đạt/Không đạt |
|-------|---------------------------|---------------------|-----------------|----------------|-----------------|:---:|
| BVA-FR02-07 | Email 253 ký tự: `a×244 + @test.com` (dưới tối đa) | — | Định dạng chấp nhận; thất bại do "sai thông tin" (không phải lỗi định dạng) | Đăng nhập thất bại — Thông báo: _"Đăng nhập thất bại. Vui lòng kiểm tra lại."_ — Thông báo chung xác nhận email được chấp nhận về mặt định dạng, thất bại vì không tồn tại trong hệ thống | [BVA-FR02-07-result.png](screenshots/BVA-FR02-07-result.png) | Đạt |
| BVA-FR02-08 | Email 254 ký tự: `a×245 + @test.com` (tại tối đa) | — | Định dạng chấp nhận; thất bại do "sai thông tin" | Đăng nhập thất bại — Thông báo: _"Đăng nhập thất bại. Vui lòng kiểm tra lại."_ — Tương tự BVA-07, email 254 ký tự được chấp nhận | [BVA-FR02-08-result.png](screenshots/BVA-FR02-08-result.png) | Đạt |
| BVA-FR02-09 | Email 255 ký tự: `a×246 + @test.com` (vượt tối đa) | — | Thất bại; thông báo lỗi định dạng/độ dài | Đăng nhập thất bại — Thông báo: _"Đăng nhập thất bại. Vui lòng kiểm tra lại."_ Thông báo chung, không phân biệt lỗi độ dài. Server từ chối nhưng không có thông báo cụ thể | [BVA-FR02-09-result.png](screenshots/BVA-FR02-09-result.png) | Đạt |

> **Ghi chú B3:** Cả 3 trường hợp đều trả về cùng một thông báo lỗi chung. Hệ thống không phân biệt "sai thông tin đăng nhập" với "email quá dài". Đây là điểm cần cải thiện về UX nhưng không vi phạm trực tiếp đặc tả FR-02.

### Ranh giới B4 — Sự hiện diện của `password` (tối thiểu = 1 ký tự)

| Mã TC | Giá trị / Thao tác kiểm thử | Điều kiện tiên quyết | Kết quả mong đợi | Kết quả thực tế | Ảnh chụp màn hình | Đạt/Không đạt |
|-------|---------------------------|---------------------|-----------------|----------------|-----------------|:---:|
| BVA-FR02-10 | `test@eshop.com` / `""` (0 ký tự — dưới tối thiểu) | Trạng thái bình thường | Thất bại; thông báo trường bắt buộc; không tính là lần sai | Đăng nhập thất bại — Không có thông báo lỗi hiển thị; trình duyệt block submit qua `required` — không có thông báo lỗi tường minh | [BVA-FR02-10-result.png](screenshots/BVA-FR02-10-result.png) | Đạt |
| BVA-FR02-11 | `test@eshop.com` / `X` (1 ký tự — tại tối thiểu) | Trạng thái bình thường | Thất bại; sai thông tin; 1 ký tự là định dạng hợp lệ | Đăng nhập thất bại — Thông báo: _"Đăng nhập thất bại. Vui lòng kiểm tra lại."_ — Xác nhận 1 ký tự được chấp nhận về định dạng, thất bại vì sai thông tin | [BVA-FR02-11-result.png](screenshots/BVA-FR02-11-result.png) | Đạt |

### Ranh giới B5 — Reset bộ đếm liên tiếp

| Mã TC | Giá trị / Thao tác kiểm thử | Điều kiện tiên quyết | Kết quả mong đợi | Kết quả thực tế | Ảnh chụp màn hình | Đạt/Không đạt |
|-------|---------------------------|---------------------|-----------------|----------------|-----------------|:---:|
| BVA-FR02-12 | Bước 1: đăng nhập đúng sau 2 lần sai → Bước 2: 1 lần sai mới | 2 lần sai trước đó | Bước 1: thành công, counter=0. Bước 2: 1 lần sai mới, counter=1, chưa bị khóa | Kết quả bị ảnh hưởng bởi **BUG-01**: tài khoản `test@eshop.com` vẫn đang bị khóa từ BVA-FR02-06. `resetState()` thất bại (không login được), dẫn đến bước 1 (đăng nhập đúng) cũng thất bại. Không thể kết luận độc lập về B5 | [BVA-FR02-12-result.png](screenshots/BVA-FR02-12-result.png) | Không đạt (do BUG-01) |

---

## Lỗi phát hiện trong đợt thực thi này

| Mã lỗi | Mã TC liên quan | Mức độ | Mô tả ngắn |
|--------|----------------|--------|-----------|
| BUG-01 | BVA-FR02-06, BVA-FR02-12, DT-FR02-14 | Cao | Khóa tài khoản không tự gỡ sau 30 giây theo đặc tả (đã chờ 35+ giây vẫn locked) |

> Lỗi BUG-02, BUG-03, BUG-04 (input types, vị trí thông báo lỗi) đã phát hiện tại DomainTesting và không lặp lại ở BVA.

---

## Quan sát bổ sung

- **BVA-FR02-01 vs 02:** Không có sự khác biệt về thông báo lỗi giữa "2 lần sai (chưa khóa)" và "3 lần sai (đã khóa)" — người dùng không được thông báo khi tài khoản bị khóa.
- **BVA-FR02-09:** Server không phân biệt email 254 ký tự (hợp lệ) và 255 ký tự (vượt giới hạn) qua thông báo.
- **BVA-FR02-12:** Cần thực thi lại sau khi BUG-01 được sửa để xác nhận hành vi reset bộ đếm.
