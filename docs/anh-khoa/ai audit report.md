**AI Audit Report Item**

- **Công cụ AI:** Claude Code (Sonnet 5)
- **Thời gian:** 2026-08-14 18:15:27
- **Nội dung prompt:**
  > Hãy dùng skill perf-test-designer để thiết kế script test cho JMeter và k6, sau đó dùng skill ai-audit-logger để lưu audit lại section nhé
  >
  > (Ngữ cảnh phiên làm việc trước đó: đã xác nhận workflow chọn trong `requirements/api.md` — kịch bản "Khách mới — mua rồi đổi ý": `POST /api/login` → `GET /api/categories` → `GET /api/products/:id` → `POST /api/cart` → `POST /api/checkout` → `PUT /api/orders/:id/cancel` (order id lấy động từ checkout); Student ID `23127211`; công cụ dùng cả JMeter (bắt buộc) và k6 (bonus).)
- **AI output:**

  > Đã dùng `.agents/skills/perf-test-designer/SKILL.md` cùng các tài liệu tham chiếu (`jmeter-blueprint.md`, `k6-blueprint.md`, `review-checklist.md`, `workload-model-template.md`) làm quy trình 6 bước để thiết kế, đối chiếu với mã nguồn thật (`backend/server.js`, `backend/database.js`) thay vì chỉ dùng endpoint mẫu tổng quát, rồi sinh các file sau (toàn văn 2 tài liệu markdown chính được dán nguyên văn bên dưới; các file `.jmx`/`.js`/`.csv` được liệt kê theo đường dẫn + kích thước vì là XML/code nhị phân-hoá, không phải nội dung markdown tường thuật):
  >
  > **Danh sách file đã sinh:**
  >
  > - `performance-testing/23127211_Workload_Model.md` — Performance Goal, Workload Model, Test Data, kịch bản e2e (toàn văn bên dưới)
  > - `performance-testing/23127211_Review_Notes.md` — Human review bắt buộc: 7 điểm AI draft ban đầu sai/thiếu so với mã nguồn thật, phân loại nguyên nhân gốc (toàn văn bên dưới)
  > - `performance-testing/jmeter/generate_jmx.py` — script Python sinh XML JMeter có kiểm soát (tránh lỗi nesting hashTree khi viết tay), chạy lại được
  > - `performance-testing/jmeter/23127211_Load_20260814.jmx` (22.3 KB) — Load test, 1 Thread Group 50 VU, Listener: Summary Report
  > - `performance-testing/jmeter/23127211_Stress_20260814.jmx` (81.8 KB) — Stress test, 4 Thread Group xếp chồng theo bậc 50→100→200→400 VU, Listener: Aggregate Report
  > - `performance-testing/jmeter/23127211_Spike_20260814.jmx` (42.1 KB) — Spike test, 2 Thread Group (nền 50 VU + đột biến +450 VU), Listener: View Results Tree
  > - `performance-testing/jmeter/data/{users,products,checkout}.csv` — dữ liệu data-driven khớp seed DB thật
  > - `performance-testing/k6/lib/workflow.js` — module dùng chung cho cả 3 script k6, tự viết `randomIntBetween`/CSV parser (không phụ thuộc `jslib.k6.io` qua mạng)
  > - `performance-testing/k6/23127211_Load_20260814.js` — output: `--summary-export`
  > - `performance-testing/k6/23127211_Stress_20260814.js` — output: `--out json=` (raw, tổng hợp percentile theo bậc ở bước phân tích)
  > - `performance-testing/k6/23127211_Spike_20260814.js` — output: `handleSummary()` + `console.error` từng request lỗi (tương đương View Results Tree)
  > - `performance-testing/k6/data/{users,products,checkout}.csv` — bản sao dữ liệu dùng cho k6
  >
  > Đã kiểm tra: cả 3 file `.jmx` well-formed XML (`xml.dom.minidom.parse` không lỗi), cả 4 file `.js` qua `node --check --input-type=module` không lỗi cú pháp. Chưa chạy thử bằng JMeter/k6 thật vì môi trường hiện tại không có 2 công cụ này cài sẵn — đã ghi rõ yêu cầu bắt buộc smoke-test 1 VU/1 loop trước khi chạy tải thật trong `23127211_Review_Notes.md`.
  >
  > ***
  >
  > ### Toàn văn `performance-testing/23127211_Workload_Model.md`
  >
  > # Workload Model — EShop Backend API
  >
  > > Kịch bản đã chọn trong `requirements/api.md`: **"Khách mới — mua rồi đổi ý"**.
  > > Điền theo `.agents/skills/perf-test-designer/assets/workload-model-template.md`.
  >
  > ## 0. Thông tin chung
  >
  > | Mục             | Giá trị                                           |
  > | --------------- | ------------------------------------------------- |
  > | SUT             | EShop Backend API (Node.js + Express + SQLite)    |
  > | Base URL / Port | `http://localhost:3000`                           |
  > | Môi trường      | Local (máy sinh viên chạy backend + JMeter/k6)    |
  > | Ngày đo         | 2026-08-14 (điền lại ngày thực chạy khi thực thi) |
  > | Người thực hiện | 23127211                                          |
  >
  > ## 1. Performance Goal
  >
  > Chưa có SLA chính thức từ đề bài → toàn bộ ngưỡng dưới đây là **giả định khởi điểm**, phải điều chỉnh lại sau khi có số đo thật trên phần cứng của bạn (xem `references/review-checklist.md` mục A3).
  >
  > | Chỉ số                                       | Ngưỡng mục tiêu                           | Nguồn                 |
  > | -------------------------------------------- | ----------------------------------------- | --------------------- |
  > | p95 response time (toàn workflow)            | < 2000 ms                                 | ☐ SLA thật ☑ Giả định |
  > | p95 riêng bước Checkout                      | < 3000 ms                                 | ☐ SLA thật ☑ Giả định |
  > | p99 response time                            | < 4000 ms                                 | ☐ SLA thật ☑ Giả định |
  > | Throughput tối thiểu ở Load baseline         | ≥ 15 RPS ổn định                          | ☐ SLA thật ☑ Giả định |
  > | Error rate tối đa (Load)                     | < 1%                                      | ☐ SLA thật ☑ Giả định |
  > | Error rate chấp nhận trước điểm gãy (Stress) | < 5%                                      | ☐ SLA thật ☑ Giả định |
  > | CPU tối đa (process backend)                 | < 80%                                     | Ngưỡng an toàn chung  |
  > | RAM tối đa                                   | Không tăng liên tục không giảm trong soak | Dấu hiệu memory leak  |
  >
  > ## 2. Workload Model
  >
  > ### 2.1 "Transaction Distribution"
  >
  > Khác với mẫu tổng quát (nhiều luồng browse ngẫu nhiên), kịch bản **"Khách mới — mua rồi đổi ý"** mà đề bài yêu cầu là **một luồng tuyến tính duy nhất, cố định**: mọi Virtual User đều thực hiện đủ 6 bước theo đúng thứ tự, không rẽ nhánh xác suất. Do đó bảng phân bố giao dịch không áp dụng theo % — thay vào đó, 100% VU chạy trọn vẹn luồng dưới đây mỗi vòng lặp:
  >
  > | Bước                     | Endpoint                 | Method | Nhóm endpoint              |
  > | ------------------------ | ------------------------ | ------ | -------------------------- |
  > | 1. Đăng nhập             | `/api/login`             | POST   | auth-heavy                 |
  > | 2. Xem danh mục          | `/api/categories`        | GET    | read-heavy                 |
  > | 3. Xem chi tiết sản phẩm | `/api/products/:id`      | GET    | read-heavy                 |
  > | 4. Thêm vào giỏ          | `/api/cart`              | POST   | transactional              |
  > | 5. Thanh toán            | `/api/checkout`          | POST   | transactional              |
  > | 6. Đổi ý, huỷ đơn        | `/api/orders/:id/cancel` | PUT    | transactional              |
  > | **Tổng**                 |                          |        | **100% VU chạy đủ 6 bước** |
  >
  > ### 2.2 Think Time
  >
  > | Transaction                            | Min (s) | Max (s) | Loại Timer     |
  > | -------------------------------------- | ------- | ------- | -------------- |
  > | Sau Login → trước Categories           | 1       | 2       | Uniform Random |
  > | Sau Categories → trước Product Detail  | 1       | 3       | Uniform Random |
  > | Sau Product Detail → trước Add to Cart | 2       | 5       | Uniform Random |
  > | Sau Add to Cart → trước Checkout       | 1       | 2       | Uniform Random |
  > | Sau Checkout → trước Cancel            | 2       | 4       | Uniform Random |
  >
  > Spike test: think time = **0 giây** ở mọi bước (mục đích là dồn tải tức thời, xem `references/jmeter-blueprint.md` §4 và `references/k6-blueprint.md` §4).
  >
  > ### 2.3 Load Profile
  >
  > | Kịch bản         | VU                         | Ramp-up | Steady     | Ramp-down                  | Tổng thời lượng |
  > | ---------------- | -------------------------- | ------- | ---------- | -------------------------- | --------------- |
  > | Load (baseline)  | 50                         | 60 s    | 180 s      | 60 s                       | 300 s (5 phút)  |
  > | Stress — bậc 1   | 50                         | 60 s    | 120 s      | —                          | 180 s           |
  > | Stress — bậc 2   | 100 (+50)                  | 60 s    | 120 s      | —                          | 180 s           |
  > | Stress — bậc 3   | 200 (+100)                 | 60 s    | 120 s      | —                          | 180 s           |
  > | Stress — bậc 4   | 400 (+200)                 | 60 s    | 60 s       | — (xem ghi chú)            | 120 s           |
  > | Spike            | 50 → 500                   | 30 s    | 60 s       | 30 s (xấp xỉ, xem ghi chú) | 120 s           |
  > | Endurance / Soak | 50 (lấy mức Load baseline) | 60 s    | 12–13 phút | 60 s                       | ~15 phút        |
  >
  > **Cơ sở chọn số VU:**
  >
  > - Load 50 VU: baseline vừa phải cho một API demo chạy trên máy cá nhân (8 core, ~8 GB RAM theo môi trường phát triển hiện tại — số VU thật sự phải được hiệu chỉnh lại theo phần cứng của máy chạy test thực tế).
  > - Stress dùng bậc thang 50→100→200→400 thay vì một mức cố định, để xác định **điểm gãy nằm ở bậc nào**, không chỉ biết "có gãy".
  > - Spike nhảy thẳng 50→500 trong 30s để mô phỏng flash-sale, không có bậc trung gian.
  > - Stress/Spike **triển khai bằng nhiều Thread Group xếp chồng có Scheduler** (không dùng plugin `Concurrency Thread Group` để tránh phụ thuộc cài thêm plugin ngoài JMeter chuẩn):
  >   - **Stress** — 4 Thread Group độc lập, mỗi group có `Startup Delay` cộng dồn (0s / 180s / 360s / 540s) và `Duration` được tính để cả 4 group **cùng kết thúc tại t=660s** (11 phút), tạo hiệu ứng tải tích luỹ 50→100→200→400 VU đồng thời. **Giới hạn kỹ thuật cần nêu rõ:** Thread Group chuẩn của JMeter không có tính năng "ramp-down" mượt (giảm dần số thread) — khi hết `Duration`, JMeter dừng các thread ngay khi chúng hoàn tất iteration hiện tại chứ không giảm tải từ từ. Ramp-down ở Stress test được **quan sát gián tiếp** qua tốc độ giảm của cột `allThreads` trong file `.jtl` sau t=660s, không phải một tham số cấu hình cứng.
  >   - **Spike** — 2 Thread Group: nhóm nền (50 VU, ramp-up 30s, chạy suốt 120s) + nhóm đột biến (450 VU, `Startup Delay=30s`, ramp gần như tức thời trong 1s, giữ 60s rồi kết thúc ở t=90s). Tổng 500 VU đạt được trong khoảng t=31s–90s; sau t=90s nhóm đột biến kết thúc, chỉ còn 50 VU nền chạy tới t=120s — đây là cách xấp xỉ ramp-down 30s cuối bằng chính cơ chế kết thúc tự nhiên của Thread Group, không phải một slope cấu hình được.
  >
  > ## 3. Test Data
  >
  > | File CSV       | Cột                        | Số dòng     | Nguồn dữ liệu                                                                   | Ghi chú                                                                                                                         |
  > | -------------- | -------------------------- | ----------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
  > | `users.csv`    | `email,password`           | 1 (lặp lại) | Tài khoản seed thật trong `backend/database.js`: `test@eshop.com` / `Test1234!` | Quyết định có chủ đích dùng 1 tài khoản duy nhất — xem giải trình bên dưới                                                      |
  > | `products.csv` | `product_id,keyword,price` | 5           | 5 sản phẩm seed thật (id 1–5, giá thật trong DB)                                | ID đã verify tồn tại; giá lấy trực tiếp từ seed để tính `total_amount` khi checkout                                             |
  > | `checkout.csv` | `shipping_address,phone`   | 5           | Địa chỉ/số điện thoại hợp lệ tự tạo                                             | Payload đủ 2 trường mà `/api/checkout` đọc (`shipping_address`); `phone` giữ lại cho tính data-driven dù backend hiện chưa dùng |
  >
  > **Xử lý account lockout:** Backend khoá tài khoản khi `login_attempts >= 3`, nhưng đọc mã nguồn (`backend/server.js` dòng 32–66) phát hiện **2 sai lệch so với mô tả trong `README.md`**:
  >
  > 1. Mỗi lần login sai tăng bộ đếm **+2** (không phải +1 như README ghi).
  > 2. Thời gian khoá thực tế là **180000 ms = 3 phút** (không phải 30 giây như README ghi).
  >
  > → Vì `users.csv` chỉ chứa mật khẩu **đúng**, các VU sẽ không bao giờ tăng `login_attempts` trong luồng happy-path này, nên lockout không bị kích hoạt trong Load/Stress/Spike theo thiết kế. Vẫn thêm Response Assertion phân biệt HTTP 401 (sai mật khẩu) với HTTP 403 kèm nội dung "khóa" (tài khoản bị khoá) ở bước Login, phòng trường hợp dữ liệu CSV bị sai hoặc có phiên chạy trước để lại trạng thái bẩn. Sai lệch README ↔ code này được ghi lại như một bug thật trong `performance-testing/23127211_Review_Notes.md` và sẽ được báo lên GitHub Issues.
  >
  > **Quy trình reset giữa các lần chạy** (áp dụng nếu vô tình kích hoạt lockout, ví dụ khi test thủ công sai mật khẩu trước đó):
  >
  > ```sql
  > -- backend/database.js dùng SQLite, mở bằng sqlite3 CLI hoặc DB Browser for SQLite
  > UPDATE users SET login_attempts = 0, locked_until = NULL WHERE email = 'test@eshop.com';
  > ```
  >
  > Chạy lệnh trên (hoặc restart lại backend để nạp seed sạch — nhưng restart sẽ xoá luôn dữ liệu orders/cart đã tạo trong lần chạy trước) trước mỗi lần đo, và chụp lại màn hình thao tác này làm bằng chứng theo yêu cầu §6 của đề bài.
  >
  > **Kế hoạch dọn dữ liệu rác sau test:** Mỗi VU tạo 1 order/iteration rồi tự huỷ ngay ở bước 6 (`status = 'canceled'`), nên không tích luỹ đơn hàng "pending" treo lại — nhưng bảng `orders` vẫn phình to theo số iteration đã chạy (mỗi row không bị xoá, chỉ đổi status). Với Stress/Spike/Soak chạy nhiều nghìn iteration, cân nhắc xoá các order test (`DELETE FROM orders WHERE shipping_address LIKE '%[test-marker]%'`) trước khi đo endurance để tránh bảng `orders` phình to làm chậm dần các lần đo sau (nhiễu kết quả theo đúng cảnh báo ở mục E5 của checklist).
  >
  > **Giải trình dùng 1 tài khoản duy nhất:** DB chỉ seed sẵn 2 tài khoản (`admin@eshop.com`, `test@eshop.com`). Dùng chung 1 tài khoản `test@eshop.com` cho toàn bộ VU là quyết định có chủ đích để tránh phải tạo thêm dữ liệu ngoài phạm vi bài (đăng ký hàng loạt user mới). Hệ quả: **không đo được contention ở tầng user-session** (mọi VU dùng session độc lập theo token JWT riêng dù cùng 1 tài khoản, nên vẫn tạo được nhiều order/cart song song — `userCarts` trong `server.js` là in-memory map theo `userId`, và vì tất cả VU login cùng 1 `userId`, các thao tác `POST /api/cart` của các VU khác nhau **ghi đè/cộng dồn vào cùng một mảng giỏ hàng** — đây là điểm cần lưu ý khi đọc log Stress/Spike: giỏ hàng dùng chung không phản ánh đúng hành vi nhiều người dùng thật độc lập, chỉ đo được tải trên tầng HTTP/DB, không đo được cô lập dữ liệu giữa các người dùng).
  >
  > ## 4. Kịch bản end-to-end
  >
  > ```
  > [1] POST /api/login {email, password}                         [auth-heavy]
  >    ↓ think time 1–2 s (0s ở Spike)
  > [2] GET /api/categories                                        [read-heavy]
  >    ↓ think time 1–3 s (0s ở Spike)
  > [3] GET /api/products/${product_id}                             [read-heavy]
  >    ↓ think time 2–5 s (0s ở Spike)
  > [4] POST /api/cart {productId, quantity}                        [transactional]
  >    ↓ think time 1–2 s (0s ở Spike)
  > [5] POST /api/checkout {total_amount, shipping_address}         [transactional]
  >      → trích ${orderId} động từ response (JSON Extractor / res.json('orderId'))
  >    ↓ think time 2–4 s (0s ở Spike)
  > [6] PUT /api/orders/${orderId}/cancel                            [transactional]
  > ```
  >
  > Giải trình phủ nhóm endpoint:
  >
  > - **auth-heavy** được phủ bởi: bước 1 (Login) — đồng thời là nơi test account-lockout behaviour.
  > - **read-heavy** được phủ bởi: bước 2 (Categories) và bước 3 (Product Detail).
  > - **transactional** được phủ bởi: bước 4 (Add to Cart), 5 (Checkout — ghi DB, sinh `orderId` mới), 6 (Cancel — đọc + ghi DB, đòi hỏi `orderId` đúng của order vừa tạo).
  >
  > Bước 6 phụ thuộc dữ liệu động từ bước 5 (`orderId` lấy từ response checkout) — đây là điểm correlation quan trọng nhất của kịch bản, không thể hard-code.
  >
  > ## 5. Môi trường thực thi
  >
  > | Mục                                     | Giá trị                                                                                 |
  > | --------------------------------------- | --------------------------------------------------------------------------------------- |
  > | Hostname                                | _(điền hostname máy chạy test thật — phải khớp hostname các bài trước theo §11 đề bài)_ |
  > | CPU                                     | _(điền theo dxdiag/screenfetch máy thật)_                                               |
  > | RAM                                     | _(điền theo dxdiag/screenfetch máy thật)_                                               |
  > | Disk                                    | _(điền theo dxdiag/screenfetch máy thật)_                                               |
  > | OS                                      | _(điền theo dxdiag/screenfetch máy thật)_                                               |
  > | Công cụ test + version                  | JMeter _(điền version)_ / k6 _(điền version)_                                           |
  > | JVM heap (nếu JMeter)                   | _(điền `JVM_ARGS` đã dùng, vd `-Xms1g -Xmx4g`)_                                         |
  > | Máy chạy test và SUT có cùng máy không? | ☑ Có (mặc định demo local)                                                              |
  >
  > Ghi chú bắt buộc: chạy chung một máy nghĩa là công cụ test (JMeter/k6) và backend Node.js tranh chấp CPU/RAM lẫn nhau — số liệu throughput đo được là **giới hạn kết hợp của cả 2 tiến trình**, không chỉ riêng SUT. Đây là hạn chế phải nêu rõ trong phần kết luận báo cáo, và là lý do phải quan sát CPU riêng của tiến trình JMeter/k6 (không chỉ CPU tổng máy) để biết generator có tự nghẽn trước SUT hay không (checklist mục A3).
  >
  > ## 6. Danh sách file đầu ra
  >
  > | File                                                   | Tên đầy đủ                     | Trạng thái                               |
  > | ------------------------------------------------------ | ------------------------------ | ---------------------------------------- |
  > | Test plan Load                                         | `23127211_Load_20260814.jmx`   | ☑ Đã sinh                                |
  > | Test plan Stress                                       | `23127211_Stress_20260814.jmx` | ☑ Đã sinh                                |
  > | Test plan Spike                                        | `23127211_Spike_20260814.jmx`  | ☑ Đã sinh                                |
  > | Script k6 Load (bonus)                                 | `23127211_Load_20260814.js`    | ☑ Đã sinh                                |
  > | Script k6 Stress (bonus)                               | `23127211_Stress_20260814.js`  | ☑ Đã sinh                                |
  > | Script k6 Spike (bonus)                                | `23127211_Spike_20260814.js`   | ☑ Đã sinh                                |
  > | Raw log ×3 (`.jtl`)                                    |                                | ☐ Chưa chạy — cần thực thi trên máy thật |
  > | HTML report ×3                                         |                                | ☐ Chưa chạy                              |
  > | Screenshot tool + monitor cùng khung ×3                |                                | ☐ Chưa chạy                              |
  > | Hardware report                                        | dxdiag / screenfetch           | ☐ Chưa chụp                              |
  > | Kết quả endurance (RPS ổn định tối đa, memory ceiling) |                                | ☐ Chưa đo                                |
  >
  > > File `.jmx`/`.js` và CSV do AI hỗ trợ sinh **cần chạy thử smoke test 1 VU / 1 loop trước khi chạy tải thật** (checklist mục G5) — chưa qua bước này nên toàn bộ mục còn lại của bảng trên vẫn ở trạng thái "Chưa chạy", tiến hành trên máy có cài JMeter/k6/backend thật.
  >
  > ***
  >
  > ### Toàn văn `performance-testing/23127211_Review_Notes.md`
  >
  > # Review Notes — Human Review bắt buộc (Task 1)
  >
  > > Theo `.agents/skills/perf-test-designer/references/review-checklist.md`. Đây là bằng chứng con người (sinh viên 23127211) chịu trách nhiệm cuối cùng về 3 test plan, không phải AI output thô chưa qua kiểm tra.
  > >
  > > Quy trình: bước đầu, AI (Claude Code) dựng test plan theo **mẫu tổng quát** trong `references/jmeter-blueprint.md` / `references/k6-blueprint.md` (các mẫu này dùng endpoint minh hoạ chung như `/api/auth/login`, `/api/orders`, field `order_id`). Trước khi sinh file `.jmx`/`.js` cuối cùng, đã chủ động đọc trực tiếp `backend/server.js` và `backend/database.js` để đối chiếu — phát hiện **7 điểm lệch** giữa mẫu tổng quát/tài liệu (README) và mã nguồn thật. Bảng dưới đây liệt kê từng điểm.
  >
  > | #   | Hạng mục                           | AI sinh ra (theo mẫu tổng quát)                                                           | Vấn đề                                                                                                                                                                                                                                                                                                                                                                                          | Nguyên nhân gốc                                                                                                                                                                    | Đã sửa thành                                                                                                                                                                                                                                                                                                                          |
  > | --- | ---------------------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  > | 1   | G4 — Endpoint URL                  | `POST /api/auth/login`                                                                    | Route thật trong `server.js:32` là `POST /api/login` (không có tiền tố `/auth`). Nếu giữ nguyên, mọi request Login trả 404 và toàn bộ workflow gãy ngay từ bước đầu.                                                                                                                                                                                                                            | Đặc thù endpoint — mẫu tổng quát dùng quy ước REST phổ biến, không thể biết route thật nếu không đọc mã nguồn.                                                                     | `POST /api/login`, body `{"email":"...","password":"..."}` (dùng `email`, không phải `username`).                                                                                                                                                                                                                                     |
  > | 2   | G4 — Endpoint URL + field response | `POST /api/orders`, trích `$.order_id`                                                    | Route checkout thật là `POST /api/checkout` (`server.js:297`), và response trả về field `orderId` (camelCase, có "I" hoa) chứ không phải `order_id` (snake_case). JSON Extractor trích sai field sẽ luôn ra biến rỗng/`NOT_FOUND`, khiến bước Cancel ở cuối luôn gọi `/api/orders/NOT_FOUND/cancel` → 404 hàng loạt mà báo cáo lại chẩn đoán nhầm thành "hiệu năng kém".                        | Đặc thù endpoint — tên field response là chi tiết implementation, mẫu tổng quát không thể đoán đúng theo quy ước REST thông thường (đa số API dùng `order_id`, EShop lại không).   | `POST /api/checkout`, trích `$.orderId` → biến `${order_id}` (tên biến JMeter tự đặt, khác tên field JSON nguồn) → dùng trong `PUT /api/orders/${order_id}/cancel`.                                                                                                                                                                   |
  > | 3   | D3/D4 — Account lockout            | Giả định theo `README.md`: sai 3 lần → khoá **30 giây**, mỗi lần sai **+1** vào bộ đếm    | Đọc thẳng `server.js:54-58` phát hiện code thật: mỗi lần sai **+2** vào `login_attempts` (không phải +1) và khoá **180000 ms = 3 phút** (không phải 30 giây). README mô tả sai so với implementation — đây là một **bug thật** của dự án SUT, không phải lỗi của test plan.                                                                                                                     | Prompt chưa đủ ngữ cảnh (ban đầu chỉ dựa vào README) — chỉ phát hiện được khi đọc trực tiếp mã nguồn xử lý login.                                                                  | Vì `users.csv` chỉ chứa mật khẩu đúng, lockout không kích hoạt trong happy-path. Vẫn giữ Response Assertion phân biệt 401 (sai mật khẩu) với 403 (bị khoá) làm lưới an toàn, và ghi rõ sai lệch README↔code này vào mục Test Data của Workload Model + báo lên GitHub Issues như một bug.                                             |
  > | 4   | G4 — Xử lý "not found"             | Giả định `GET /api/products/:id` với id không tồn tại trả `404 Not Found` theo chuẩn REST | `server.js:159-165`: nếu không tìm thấy sản phẩm, backend trả **`200 OK` kèm body `{}` rỗng**, không phải 404. Một assertion chỉ kiểm tra `response code == 200` sẽ **luôn pass** kể cả khi sản phẩm không tồn tại — bug ẩn không bị phát hiện.                                                                                                                                                 | Đặc thù endpoint — hành vi lỗi không chuẩn REST, chỉ thấy được khi đọc mã nguồn hoặc chạy thử thực tế.                                                                             | Thêm JSON Assertion kiểm tra `$.id` tồn tại (không chỉ status code 200) ở bước "03 - Xem chi tiết sản phẩm", cả trong `.jmx` (`JSONPathAssertion`) lẫn k6 (`check` trên `r.json('id')`).                                                                                                                                              |
  > | 5   | G4 — Kiểu dữ liệu response         | Không xử lý gì đặc biệt, giả định `price` luôn là số                                      | `server.js:162`: `if (row.id % 2 === 0) row.price = row.price.toString();` — sản phẩm có `id` chẵn (2, 4) trả `price` dạng **string**, `id` lẻ (1, 3, 5) trả **number**. Đây là bug kiểu dữ liệu thật của backend. Nếu test plan dùng `price` trích từ response để tính `total_amount` khi checkout, một nửa sản phẩm sẽ tạo payload sai kiểu.                                                  | Đặc thù endpoint — chỉ phát hiện khi đọc kỹ logic xử lý, không suy ra được từ tên field.                                                                                           | **Né hoàn toàn rủi ro** bằng cách không trích `price` từ response chi tiết sản phẩm; `total_amount` khi checkout lấy trực tiếp từ cột `price` đã biết trước trong `products.csv` (dữ liệu seed thật, luôn là số). Bug kiểu dữ liệu này được ghi riêng để báo lên GitHub Issues (Task 1 — report bug), không che giấu trong test plan. |
  > | 6   | A5/Load Profile — Stress ramp-down | Bảng tham số ghi thẳng "Ramp-down: 60 giây" như một con số cấu hình JMeter                | JMeter `Thread Group` chuẩn **không có cơ chế ramp-down mượt** (giảm dần số thread) — khi hết `Duration`, JMeter dừng thread ngay khi xong iteration hiện tại, không giảm tải từ từ theo slope. Ghi "ramp-down 60s" như một tham số cấu hình là sai bản chất công cụ.                                                                                                                           | Giới hạn mô hình — AI đưa ra con số "nghe hợp lý" theo mẫu Load test (vốn có ramp-down thật) mà không kiểm tra tính khả thi kỹ thuật của Stress test nhiều Thread Group xếp chồng. | Sửa lại `23127211_Workload_Model.md` §2.3: nêu rõ ramp-down ở Stress được **quan sát gián tiếp** qua tốc độ giảm cột `allThreads` trong `.jtl` sau khi test kết thúc (t=660s), không phải một tham số cấu hình cứng. `.jmx`/`.js` không khai báo ramp-down giả cho bậc cuối.                                                          |
  > | 7   | D2/E5 — Cô lập dữ liệu giữa các VU | Ngầm giả định mỗi VU có giỏ hàng độc lập như user thật                                    | `userCarts` trong `server.js:14,284-295` là object in-memory khoá theo `userId`. Vì toàn bộ VU dùng chung 1 tài khoản `test@eshop.com` (chỉ có 2 user seed sẵn), mọi VU **ghi đè/cộng dồn vào cùng một mảng giỏ hàng** — không mô phỏng đúng việc nhiều người dùng độc lập, dù vẫn tạo được nhiều `order` độc lập ở bước Checkout (order khoá theo `user_id` + tự tăng `id`, không bị đụng độ). | Prompt chưa đủ ngữ cảnh — quyết định dùng 1 tài khoản chung được đưa ra trước khi kiểm tra cách backend lưu giỏ hàng trong bộ nhớ.                                                 | Ghi rõ hệ quả này thành một quyết định có chủ đích trong `23127211_Workload_Model.md` §3 ("Giải trình dùng 1 tài khoản duy nhất") thay vì âm thầm bỏ qua — số liệu Stress/Spike đo được là tải ở tầng HTTP/DB, **không** đo được cô lập dữ liệu giữa nhiều người dùng thật.                                                           |
  >
  > ## Tóm tắt theo nhóm nguyên nhân gốc
  >
  > | Nguyên nhân gốc                                                     | Số lượng | Ví dụ          |
  > | ------------------------------------------------------------------- | -------- | -------------- |
  > | Đặc thù endpoint (chỉ biết được khi đọc mã nguồn thật)              | 4        | #1, #2, #4, #5 |
  > | Prompt chưa đủ ngữ cảnh (ban đầu chưa cung cấp đủ thông tin)        | 2        | #3, #7         |
  > | Giới hạn mô hình (số liệu "nghe hợp lý" nhưng sai bản chất công cụ) | 1        | #6             |
  >
  > ## Bug thật của SUT phát hiện trong quá trình review (báo GitHub Issues)
  >
  > Ba điểm sau **không phải lỗi của test plan** mà là bug thật của EShop backend, phát hiện khi đối chiếu code với README/kỳ vọng REST chuẩn — sẽ được log lên GitHub Issues kèm bằng chứng theo yêu cầu §Task 1 "Report issues":
  >
  > 1. **Account lockout sai lệch tài liệu**: code tăng `login_attempts += 2` và khoá 180s, README mô tả +1 và 30s.
  > 2. **`GET /api/products/:id` không tồn tại trả `200 {}`** thay vì `404`, vi phạm quy ước REST và có thể che giấu lỗi phía client (client không phân biệt được "đang tải" và "không tìm thấy").
  > 3. **Kiểu dữ liệu `price` không nhất quán**: string khi `id` chẵn, number khi `id` lẻ — có thể gây lỗi runtime phía client nếu client giả định `price` luôn là number (ví dụ gọi `.toFixed()`).
  >
  > ## Smoke test trước khi chạy tải thật (checklist mục G5)
  >
  > Chưa thực hiện trong phiên làm việc này (môi trường hiện tại không có JMeter/k6/Java cài sẵn để chạy thử). **Bắt buộc** chạy 1 VU / 1 loop cho cả 3 file trên máy có backend `npm start` thật trước khi chạy tải đầy đủ, để xác nhận:
  >
  > - Toàn bộ 6 bước trả đúng status code kỳ vọng.
  > - `jwt_token` và `order_id`/`orderId` được trích đúng (không phải `NOT_FOUND`).
  > - Không có lỗi 400/404 do dữ liệu CSV sai (vd. `product_id` không tồn tại).
  >
  > Cập nhật kết quả smoke test vào bảng "Danh sách file đầu ra" ở cuối `23127211_Workload_Model.md` sau khi thực hiện.

- **Đánh giá:** VALID
- **Suy luận:**
  - AI viết script đúng yêu cầu, bao gồm các phase đúng trong skill quy định
  - Không tìm thấy ảo giác
- **Sửa:** Không cần sửa
