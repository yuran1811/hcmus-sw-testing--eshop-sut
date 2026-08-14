# Workload Model — EShop Backend API

> Kịch bản đã chọn trong `requirements/api.md`: **"Khách mới — mua rồi đổi ý"**.
> Điền theo `.agents/skills/perf-test-designer/assets/workload-model-template.md`.

## 0. Thông tin chung

| Mục | Giá trị |
|---|---|
| SUT | EShop Backend API (Node.js + Express + SQLite) |
| Base URL / Port | `http://localhost:3000` |
| Môi trường | Local (máy sinh viên chạy backend + JMeter/k6) |
| Ngày đo | 2026-08-14 (điền lại ngày thực chạy khi thực thi) |
| Người thực hiện | 23127211 |

## 1. Performance Goal

Chưa có SLA chính thức từ đề bài → toàn bộ ngưỡng dưới đây là **giả định khởi điểm**, phải điều chỉnh lại sau khi có số đo thật trên phần cứng của bạn (xem `references/review-checklist.md` mục A3).

| Chỉ số | Ngưỡng mục tiêu | Nguồn |
|---|---|---|
| p95 response time (toàn workflow) | < 2000 ms | ☐ SLA thật ☑ Giả định |
| p95 riêng bước Checkout | < 3000 ms | ☐ SLA thật ☑ Giả định |
| p99 response time | < 4000 ms | ☐ SLA thật ☑ Giả định |
| Throughput tối thiểu ở Load baseline | ≥ 15 RPS ổn định | ☐ SLA thật ☑ Giả định |
| Error rate tối đa (Load) | < 1% | ☐ SLA thật ☑ Giả định |
| Error rate chấp nhận trước điểm gãy (Stress) | < 5% | ☐ SLA thật ☑ Giả định |
| CPU tối đa (process backend) | < 80% | Ngưỡng an toàn chung |
| RAM tối đa | Không tăng liên tục không giảm trong soak | Dấu hiệu memory leak |

## 2. Workload Model

### 2.1 "Transaction Distribution"

Khác với mẫu tổng quát (nhiều luồng browse ngẫu nhiên), kịch bản **"Khách mới — mua rồi đổi ý"** mà đề bài yêu cầu là **một luồng tuyến tính duy nhất, cố định**: mọi Virtual User đều thực hiện đủ 6 bước theo đúng thứ tự, không rẽ nhánh xác suất. Do đó bảng phân bố giao dịch không áp dụng theo % — thay vào đó, 100% VU chạy trọn vẹn luồng dưới đây mỗi vòng lặp:

| Bước | Endpoint | Method | Nhóm endpoint |
|---|---|---|---|
| 1. Đăng nhập | `/api/login` | POST | auth-heavy |
| 2. Xem danh mục | `/api/categories` | GET | read-heavy |
| 3. Xem chi tiết sản phẩm | `/api/products/:id` | GET | read-heavy |
| 4. Thêm vào giỏ | `/api/cart` | POST | transactional |
| 5. Thanh toán | `/api/checkout` | POST | transactional |
| 6. Đổi ý, huỷ đơn | `/api/orders/:id/cancel` | PUT | transactional |
| **Tổng** | | | **100% VU chạy đủ 6 bước** |

### 2.2 Think Time

| Transaction | Min (s) | Max (s) | Loại Timer |
|---|---|---|---|
| Sau Login → trước Categories | 1 | 2 | Uniform Random |
| Sau Categories → trước Product Detail | 1 | 3 | Uniform Random |
| Sau Product Detail → trước Add to Cart | 2 | 5 | Uniform Random |
| Sau Add to Cart → trước Checkout | 1 | 2 | Uniform Random |
| Sau Checkout → trước Cancel | 2 | 4 | Uniform Random |

Spike test: think time = **0 giây** ở mọi bước (mục đích là dồn tải tức thời, xem `references/jmeter-blueprint.md` §4 và `references/k6-blueprint.md` §4).

### 2.3 Load Profile

| Kịch bản | VU | Ramp-up | Steady | Ramp-down | Tổng thời lượng |
|---|---|---|---|---|---|
| Load (baseline) | 50 | 60 s | 180 s | 60 s | 300 s (5 phút) |
| Stress — bậc 1 | 50 | 60 s | 120 s | — | 180 s |
| Stress — bậc 2 | 100 (+50) | 60 s | 120 s | — | 180 s |
| Stress — bậc 3 | 200 (+100) | 60 s | 120 s | — | 180 s |
| Stress — bậc 4 | 400 (+200) | 60 s | 60 s | — (xem ghi chú) | 120 s |
| Spike | 50 → 500 | 30 s | 60 s | 30 s (xấp xỉ, xem ghi chú) | 120 s |
| Endurance / Soak | 50 (lấy mức Load baseline) | 60 s | 12–13 phút | 60 s | ~15 phút |

**Cơ sở chọn số VU:**
- Load 50 VU: baseline vừa phải cho một API demo chạy trên máy cá nhân (8 core, ~8 GB RAM theo môi trường phát triển hiện tại — số VU thật sự phải được hiệu chỉnh lại theo phần cứng của máy chạy test thực tế).
- Stress dùng bậc thang 50→100→200→400 thay vì một mức cố định, để xác định **điểm gãy nằm ở bậc nào**, không chỉ biết "có gãy".
- Spike nhảy thẳng 50→500 trong 30s để mô phỏng flash-sale, không có bậc trung gian.
- Stress/Spike **triển khai bằng nhiều Thread Group xếp chồng có Scheduler** (không dùng plugin `Concurrency Thread Group` để tránh phụ thuộc cài thêm plugin ngoài JMeter chuẩn):
  - **Stress** — 4 Thread Group độc lập, mỗi group có `Startup Delay` cộng dồn (0s / 180s / 360s / 540s) và `Duration` được tính để cả 4 group **cùng kết thúc tại t=660s** (11 phút), tạo hiệu ứng tải tích luỹ 50→100→200→400 VU đồng thời. **Giới hạn kỹ thuật cần nêu rõ:** Thread Group chuẩn của JMeter không có tính năng "ramp-down" mượt (giảm dần số thread) — khi hết `Duration`, JMeter dừng các thread ngay khi chúng hoàn tất iteration hiện tại chứ không giảm tải từ từ. Ramp-down ở Stress test được **quan sát gián tiếp** qua tốc độ giảm của cột `allThreads` trong file `.jtl` sau t=660s, không phải một tham số cấu hình cứng.
  - **Spike** — 2 Thread Group: nhóm nền (50 VU, ramp-up 30s, chạy suốt 120s) + nhóm đột biến (450 VU, `Startup Delay=30s`, ramp gần như tức thời trong 1s, giữ 60s rồi kết thúc ở t=90s). Tổng 500 VU đạt được trong khoảng t=31s–90s; sau t=90s nhóm đột biến kết thúc, chỉ còn 50 VU nền chạy tới t=120s — đây là cách xấp xỉ ramp-down 30s cuối bằng chính cơ chế kết thúc tự nhiên của Thread Group, không phải một slope cấu hình được.

## 3. Test Data

| File CSV | Cột | Số dòng | Nguồn dữ liệu | Ghi chú |
|---|---|---|---|---|
| `users.csv` | `email,password` | 1 (lặp lại) | Tài khoản seed thật trong `backend/database.js`: `test@eshop.com` / `Test1234!` | Quyết định có chủ đích dùng 1 tài khoản duy nhất — xem giải trình bên dưới |
| `products.csv` | `product_id,keyword,price` | 5 | 5 sản phẩm seed thật (id 1–5, giá thật trong DB) | ID đã verify tồn tại; giá lấy trực tiếp từ seed để tính `total_amount` khi checkout |
| `checkout.csv` | `shipping_address,phone` | 5 | Địa chỉ/số điện thoại hợp lệ tự tạo | Payload đủ 2 trường mà `/api/checkout` đọc (`shipping_address`); `phone` giữ lại cho tính data-driven dù backend hiện chưa dùng |

**Xử lý account lockout:** Backend khoá tài khoản khi `login_attempts >= 3`, nhưng đọc mã nguồn (`backend/server.js` dòng 32–66) phát hiện **2 sai lệch so với mô tả trong `README.md`**:
1. Mỗi lần login sai tăng bộ đếm **+2** (không phải +1 như README ghi).
2. Thời gian khoá thực tế là **180000 ms = 3 phút** (không phải 30 giây như README ghi).

→ Vì `users.csv` chỉ chứa mật khẩu **đúng**, các VU sẽ không bao giờ tăng `login_attempts` trong luồng happy-path này, nên lockout không bị kích hoạt trong Load/Stress/Spike theo thiết kế. Vẫn thêm Response Assertion phân biệt HTTP 401 (sai mật khẩu) với HTTP 403 kèm nội dung "khóa" (tài khoản bị khoá) ở bước Login, phòng trường hợp dữ liệu CSV bị sai hoặc có phiên chạy trước để lại trạng thái bẩn. Sai lệch README ↔ code này được ghi lại như một bug thật trong `performance-testing/23127211_Review_Notes.md` và sẽ được báo lên GitHub Issues.

**Quy trình reset giữa các lần chạy** (áp dụng nếu vô tình kích hoạt lockout, ví dụ khi test thủ công sai mật khẩu trước đó):
```sql
-- backend/database.js dùng SQLite, mở bằng sqlite3 CLI hoặc DB Browser for SQLite
UPDATE users SET login_attempts = 0, locked_until = NULL WHERE email = 'test@eshop.com';
```
Chạy lệnh trên (hoặc restart lại backend để nạp seed sạch — nhưng restart sẽ xoá luôn dữ liệu orders/cart đã tạo trong lần chạy trước) trước mỗi lần đo, và chụp lại màn hình thao tác này làm bằng chứng theo yêu cầu §6 của đề bài.

**Kế hoạch dọn dữ liệu rác sau test:** Mỗi VU tạo 1 order/iteration rồi tự huỷ ngay ở bước 6 (`status = 'canceled'`), nên không tích luỹ đơn hàng "pending" treo lại — nhưng bảng `orders` vẫn phình to theo số iteration đã chạy (mỗi row không bị xoá, chỉ đổi status). Với Stress/Spike/Soak chạy nhiều nghìn iteration, cân nhắc xoá các order test (`DELETE FROM orders WHERE shipping_address LIKE '%[test-marker]%'`) trước khi đo endurance để tránh bảng `orders` phình to làm chậm dần các lần đo sau (nhiễu kết quả theo đúng cảnh báo ở mục E5 của checklist).

**Giải trình dùng 1 tài khoản duy nhất:** DB chỉ seed sẵn 2 tài khoản (`admin@eshop.com`, `test@eshop.com`). Dùng chung 1 tài khoản `test@eshop.com` cho toàn bộ VU là quyết định có chủ đích để tránh phải tạo thêm dữ liệu ngoài phạm vi bài (đăng ký hàng loạt user mới). Hệ quả: **không đo được contention ở tầng user-session** (mọi VU dùng session độc lập theo token JWT riêng dù cùng 1 tài khoản, nên vẫn tạo được nhiều order/cart song song — `userCarts` trong `server.js` là in-memory map theo `userId`, và vì tất cả VU login cùng 1 `userId`, các thao tác `POST /api/cart` của các VU khác nhau **ghi đè/cộng dồn vào cùng một mảng giỏ hàng** — đây là điểm cần lưu ý khi đọc log Stress/Spike: giỏ hàng dùng chung không phản ánh đúng hành vi nhiều người dùng thật độc lập, chỉ đo được tải trên tầng HTTP/DB, không đo được cô lập dữ liệu giữa các người dùng).

## 4. Kịch bản end-to-end

```
[1] POST /api/login {email, password}                         [auth-heavy]
   ↓ think time 1–2 s (0s ở Spike)
[2] GET /api/categories                                        [read-heavy]
   ↓ think time 1–3 s (0s ở Spike)
[3] GET /api/products/${product_id}                             [read-heavy]
   ↓ think time 2–5 s (0s ở Spike)
[4] POST /api/cart {productId, quantity}                        [transactional]
   ↓ think time 1–2 s (0s ở Spike)
[5] POST /api/checkout {total_amount, shipping_address}         [transactional]
     → trích ${orderId} động từ response (JSON Extractor / res.json('orderId'))
   ↓ think time 2–4 s (0s ở Spike)
[6] PUT /api/orders/${orderId}/cancel                            [transactional]
```

Giải trình phủ nhóm endpoint:
- **auth-heavy** được phủ bởi: bước 1 (Login) — đồng thời là nơi test account-lockout behaviour.
- **read-heavy** được phủ bởi: bước 2 (Categories) và bước 3 (Product Detail).
- **transactional** được phủ bởi: bước 4 (Add to Cart), 5 (Checkout — ghi DB, sinh `orderId` mới), 6 (Cancel — đọc + ghi DB, đòi hỏi `orderId` đúng của order vừa tạo).

Bước 6 phụ thuộc dữ liệu động từ bước 5 (`orderId` lấy từ response checkout) — đây là điểm correlation quan trọng nhất của kịch bản, không thể hard-code.

## 5. Môi trường thực thi

| Mục | Giá trị |
|---|---|
| Hostname | `VN1-5CG1041RBP` |
| CPU | Intel(R) Core(TM) i5-10310U @ 1.70GHz, 8 logical cores |
| RAM | 7.6 GiB |
| Disk | 1007 GB (948 GB trống) |
| OS | Ubuntu 22.04.5 LTS, WSL2 (kernel 6.6.87.2-microsoft-standard-WSL2) |
| Công cụ test + version | JMeter 5.6.3 / k6 v2.2.0 |
| JVM heap (nếu JMeter) | Mặc định `-Xms1g -Xmx1g -XX:MaxMetaspaceSize=256m` |
| Máy chạy test và SUT có cùng máy không? | ☑ Có |

**Đã chạy thật** trên môi trường trên — số liệu đầy đủ (throughput, error rate, percentile, endurance threshold, memory ceiling) xem `23127211_Execution_Report.md`.

Ghi chú bắt buộc: chạy chung một máy nghĩa là công cụ test (JMeter/k6) và backend Node.js tranh chấp CPU/RAM lẫn nhau — số liệu throughput đo được là **giới hạn kết hợp của cả 2 tiến trình**, không chỉ riêng SUT. Đây là hạn chế phải nêu rõ trong phần kết luận báo cáo, và là lý do phải quan sát CPU riêng của tiến trình JMeter/k6 (không chỉ CPU tổng máy) để biết generator có tự nghẽn trước SUT hay không (checklist mục A3).

## 6. Danh sách file đầu ra

| File | Tên đầy đủ | Trạng thái |
|---|---|---|
| Test plan Load | `23127211_Load_20260814.jmx` | ☑ Đã sinh |
| Test plan Stress | `23127211_Stress_20260814.jmx` | ☑ Đã sinh |
| Test plan Spike | `23127211_Spike_20260814.jmx` | ☑ Đã sinh |
| Script k6 Load (bonus) | `23127211_Load_20260814.js` | ☑ Đã sinh |
| Script k6 Stress (bonus) | `23127211_Stress_20260814.js` | ☑ Đã sinh |
| Script k6 Spike (bonus) | `23127211_Spike_20260814.js` | ☑ Đã sinh |
| Raw log ×3 (`.jtl`) | `jmeter/results/23127211_{Load,Stress,Spike}_20260814.jtl` | ☑ Đã chạy thật |
| HTML report ×3 | `jmeter/results/23127211_{Load,Stress,Spike}_20260814_report/` | ☑ Đã sinh |
| k6 report ×3 (bonus) | `k6/results/` (`_summary.json` / `_raw.json` / `_report.txt`+`_console.log`) | ☑ Đã chạy thật |
| Endurance/soak (bonus, k6) | `k6/23127211_Soak_20260814.js` + `k6/results/23127211_Soak_20260814_*` | ☑ Đã chạy thật (15 phút) |
| Screenshot tool + monitor cùng khung ×3 | | ☐ **Cần bạn tự chụp** — AI không quay/chụp màn hình được |
| Hardware report | dxdiag / screenfetch | ☐ **Cần bạn tự chụp** — số liệu tương đương đã ghi ở bảng trên |
| Demo video ≥6 phút, giọng nói tiếng Việt | | ☐ **Cần bạn tự quay** |
| Kết quả endurance (RPS ổn định tối đa, memory ceiling) | 23.7 req/s ổn định, RSS ~92MB (không leak) | ☑ Đã đo — xem `23127211_Execution_Report.md` §4 |

> Đã chạy smoke test 1 VU/1 loop rồi mới chạy tải thật (checklist mục G5) — toàn bộ 6 kịch bản (3 JMeter bắt buộc + 3 k6 bonus) và 1 soak test đã chạy thành công trên WSL2 thật (`VN1-5CG1041RBP`), số liệu chi tiết ở `23127211_Execution_Report.md`. Phần còn lại (screenshot cùng khung, video, dxdiag) đòi hỏi thao tác trực tiếp của người dùng, AI không thể tự thực hiện.
