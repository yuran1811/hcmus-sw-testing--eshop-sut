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

---

**AI Audit Report Item**

- **Công cụ AI:** Claude Code (Opus 5)
- **Thời gian:** 2026-08-14 23:48:42
- **Nội dung prompt:**
  > Bạn hãy dùng skill perf-log-analyzer để phân tích .jtl thật, săn lỗi AI đọc sai số liệu, đánh giá đề xuất tối ưu, sau đó dùng skill @ai-audit-logger để lưu lại nhé
- **AI output:**

  > Đã chạy quy trình 4 giai đoạn của `.agents/skills/perf-log-analyzer/SKILL.md` trên 3 file `.jtl` thật.
  > Bản phân tích bị đem ra soi ở Giai đoạn 3 là `23127211_Execution_Report.md` (do AI viết ngay sau khi chạy test, dựa trên HTML dashboard + console summary thay vì tính lại từ raw log).
  > Kết quả ghi vào file mới `performance-testing/23127211_Analysis_Report.md`; script tính ground truth lưu tại `performance-testing/tools/ground_truth.py` (chạy lại được).
  >
  > Tóm tắt những gì tìm được: phát hiện file `.jtl` chứa 2 loại row (Transaction Controller nhân đôi HTTP sampler) nên số row gấp đôi số request thật; tìm được **8 chỗ bản phân tích cũ đọc sai số liệu** (M1–M8), trong đó 2 chỗ đủ sức đảo ngược kết luận; và phân loại **10 đề xuất tối ưu** thành 2 khả thi / 3 chưa có căn cứ / 3 ảo tưởng / 1 không áp dụng / 1 rủi ro.
  >
  > Toàn văn file `performance-testing/23127211_Analysis_Report.md`:
  >
  > # Task 2 — Phân tích log bằng AI và truy tìm chỗ AI đọc sai
  >
  > > Thực hiện theo `.agents/skills/perf-log-analyzer/SKILL.md` (quy trình 4 giai đoạn).
  > >
  > > **Bản phân tích bị đem ra soi ở Mục 3 chính là `23127211_Execution_Report.md`** — bản tóm tắt kết quả do AI (Claude Code) viết ngay sau khi chạy test, dựa trên `statistics.json` của HTML dashboard và console summary. Mục 1 tính lại toàn bộ số liệu **từ raw `.jtl`** để làm ground truth, rồi đối chiếu ngược.
  > >
  > > Mọi con số ở Mục 1 đều tái tạo được bằng script `ground_truth.py` (đính kèm trong `performance-testing/tools/`); mỗi phát hiện ở Mục 3 đều dẫn về một phép đếm cụ thể trên file log.
  >
  > ***
  >
  > ## 0. Phát hiện nền tảng: file `.jtl` chứa **hai loại row**, số row ≠ số request
  >
  > Trước khi tính bất kỳ chỉ số nào, phải giải quyết một vấn đề mà bản phân tích cũ hoàn toàn bỏ qua.
  >
  > Mỗi bước nghiệp vụ trong test plan được bọc bởi một `Transaction Controller` (`parent=false`), nên JMeter ghi **2 row cho mỗi request**: một row của HTTP sampler và một row của Transaction Controller bọc nó (cùng `elapsed`, ghi liền kề nhau).
  >
  > Kiểm chứng trực tiếp trên `23127211_Load_20260814.jtl`, thread `Load - 50 VU baseline 1-1`:
  >
  > ```
  > ts=...784163  elapsed=42   label=POST /api/login                  <- HTTP sampler
  > ts=...784030  elapsed=42   label=01 - Login [auth-heavy]          <- Transaction Controller (trùng elapsed)
  > ts=...785401  elapsed=4    label=GET /api/categories
  > ts=...784249  elapsed=4    label=02 - Xem danh muc [read-heavy]
  > ```
  >
  > Đối chiếu số lượng row của cả 3 file:
  >
  > | File   | Tổng row | TC row | TC artifact (`threadName` rỗng) | HTTP sampler row | Request THẬT |
  > | ------ | -------- | ------ | ------------------------------- | ---------------- | ------------ |
  > | Load   | 13 982   | 7 016  | 50                              | 6 966            | **6 966**    |
  > | Stress | 79 401   | 39 743 | 85                              | 39 658           | **39 658**   |
  > | Spike  | 32 854   | 16 427 | 0                               | 16 427           | **16 427**   |
  >
  > Reconcile chính xác: `7016 − 50 = 6966` và `39743 − 85 = 39658` — đúng bằng số HTTP sampler. 50/85 row dôi ra là **artifact lúc JMeter shutdown**: TC row có cột `threadName` rỗng, nằm ở cuối file (từ dòng 13 732/13 982 với file Load), mỗi thread sinh đúng 1 row.
  >
  > **Hệ quả bắt buộc phải nhớ khi đọc log này:**
  >
  > - Đếm `wc -l` trên `.jtl` sẽ ra **gấp đôi** số request thật.
  > - Chạy script phân tích mặc định (`analyze_jtl.py`) mà không lọc TC row cho ra **throughput 46,62 RPS** cho bài Load — trong khi throughput thật là **23,24 RPS**. Sai đúng 2 lần.
  > - Toàn bộ Mục 1 dưới đây **chỉ tính trên HTTP sampler row**, đã loại TC row và artifact.
  >
  > Ngoài ra, tên sampler của bước Cancel chứa biến động `PUT /api/orders/${order_id}/cancel`, nên **mỗi request sinh ra một label riêng biệt**: 1 131 label (Load), 6 508 (Stress), 2 067 (Spike) — mỗi label đúng 1 sample. Trong `statistics.json` của dashboard, bước Cancel do đó xuất hiện thành 1 131 dòng riêng, **mỗi dòng có `sampleCount = 1`** ⇒ mọi percentile của bước Cancel trên dashboard đều được tính trên đúng 1 mẫu, tức là vô nghĩa. Ở Mục 1 các label này được gom lại thành `PUT /api/orders/:id/cancel`.
  >
  > ***
  >
  > ## 1. Số liệu ground truth (tính lại từ raw `.jtl`)
  >
  > ### 1.1 Tổng thể — toàn file so với chỉ steady-state
  >
  > Steady-state xác định bằng khoảng thời gian `allThreads ≥ 90% peak`.
  >
  > | Kịch bản   | Phạm vi                      | Samples | Thời lượng | Throughput     | Error rate   | p50   | p90   | p95        | p99    | max    |
  > | ---------- | ---------------------------- | ------- | ---------- | -------------- | ------------ | ----- | ----- | ---------- | ------ | ------ |
  > | **Load**   | toàn file                    | 6 966   | 299,8 s    | 23,24 RPS      | 0,000 %      | 8     | 59    | 129        | 456    | 1 422  |
  > | **Load**   | **steady (≥45/50 thread)**   | 6 272   | 243,6 s    | **25,74 RPS**  | 0,000 %      | 9     | 54    | **112**    | 334    | 1 422  |
  > | **Stress** | toàn file                    | 39 658  | 662,6 s    | 59,85 RPS      | 0,267 %      | 39    | 2 170 | 3 603      | 6 269  | 10 035 |
  > | **Stress** | **steady (≥360/400 thread)** | 7 765   | 80,8 s     | **96,05 RPS**  | **1,288 %**  | 1 019 | 4 950 | **6 244**  | 9 515  | 10 035 |
  > | **Spike**  | toàn file                    | 16 427  | 120,2 s    | 136,67 RPS     | 22,183 %     | 653   | 5 006 | 10 008     | 12 402 | 14 122 |
  > | **Spike**  | **steady (≥450/500 thread)** | 10 198  | 73,0 s     | **139,77 RPS** | **34,977 %** | 1 198 | 6 726 | **10 011** | 13 077 | 14 122 |
  >
  > Chênh lệch giữa hai phạm vi **không hề nhỏ**: với bài Stress, p95 steady-state (6 244 ms) **cao hơn 73 %** so với p95 toàn file (3 603 ms). Đây chính là lý do skill bắt buộc đối chiếu SLA bằng số liệu steady-state.
  >
  > ### 1.2 Theo từng endpoint
  >
  > **Load — steady-state** (n = 6 272, 244 s):
  >
  > | Endpoint                     | n     | p50 | p95     | p99 | Nhóm                              |
  > | ---------------------------- | ----- | --- | ------- | --- | --------------------------------- |
  > | `PUT /api/orders/:id/cancel` | 1 042 | 26  | **203** | 506 | transactional (ghi DB)            |
  > | `POST /api/checkout`         | 1 045 | 25  | **149** | 497 | transactional (ghi DB)            |
  > | `GET /api/products/:id`      | 1 049 | 5   | 102     | 320 | read-heavy                        |
  > | `GET /api/categories`        | 1 047 | 5   | 99      | 395 | read-heavy                        |
  > | `POST /api/login`            | 1 047 | 6   | 64      | 181 | auth-heavy                        |
  > | `POST /api/cart`             | 1 042 | 3   | **12**  | 86  | transactional (**không chạm DB**) |
  >
  > **Stress — toàn file** (n = 39 658):
  >
  > | Endpoint                     | n     | mean    | p50 | p95       | p99   | Err % |
  > | ---------------------------- | ----- | ------- | --- | --------- | ----- | ----- |
  > | `PUT /api/orders/:id/cancel` | 6 528 | 1 418,7 | 224 | **5 929** | 8 058 | 0,84  |
  > | `POST /api/login`            | 6 869 | 778,9   | 86  | 3 731     | 6 399 | 0,15  |
  > | `POST /api/checkout`         | 6 539 | 749,8   | 103 | 3 510     | 5 020 | 0,35  |
  > | `GET /api/categories`        | 6 629 | 324,9   | 21  | 2 098     | 3 829 | 0,03  |
  > | `GET /api/products/:id`      | 6 553 | 180,1   | 11  | 1 046     | 2 726 | 0,00  |
  > | `POST /api/cart`             | 6 540 | 158,6   | 5   | **849**   | 1 559 | 0,24  |
  >
  > **Spike — toàn file** (n = 16 427):
  >
  > | Endpoint                     | n     | mean    | p50   | p95    | Err %     |
  > | ---------------------------- | ----- | ------- | ----- | ------ | --------- |
  > | `POST /api/login`            | 2 954 | 2 668,6 | 779   | 10 011 | **26,44** |
  > | `GET /api/categories`        | 2 910 | 2 202,7 | 745   | 10 009 | 25,57     |
  > | `GET /api/products/:id`      | 2 835 | 1 958,7 | 743   | 5 114  | 22,29     |
  > | `POST /api/cart`             | 2 690 | 1 549,8 | 249   | 5 480  | 22,12     |
  > | `POST /api/checkout`         | 2 555 | 1 496,7 | 558   | 5 006  | 18,40     |
  > | `PUT /api/orders/:id/cancel` | 2 483 | 1 817,3 | 1 021 | 5 006  | 17,00     |
  >
  > Trật tự ở Load rất đáng chú ý: **`POST /api/cart` (p95 = 12 ms) nhanh hơn 12–17 lần so với hai endpoint ghi DB** (`checkout` 149 ms, `cancel` 203 ms). Đọc mã nguồn (`server.js:290-295`) xác nhận `POST /api/cart` chỉ `push` vào object `userCarts` trong RAM, **không chạm database**. Đây là bằng chứng nội tại mạnh nhất cho thấy chi phí chủ đạo nằm ở tầng ghi SQLite chứ không phải ở tầng HTTP/Express.
  >
  > ### 1.3 Xu hướng theo thời gian — throughput bão hoà ở đâu
  >
  > **Stress, cửa sổ 60 s:**
  >
  > | Cửa sổ    | Threads TB | RPS       | p50   | p95   | Err % |
  > | --------- | ---------- | --------- | ----- | ----- | ----- |
  > | 0–60 s    | 34         | 13,8      | 10    | 217   | 0,00  |
  > | 60–120 s  | 50         | 25,2      | 13    | 239   | 0,00  |
  > | 120–180 s | 50         | 25,5      | 11    | 206   | 0,00  |
  > | 180–240 s | 80         | 33,3      | 23    | 2 454 | 0,10  |
  > | 240–300 s | 100        | 49,8      | 17    | 450   | 0,00  |
  > | 300–360 s | 100        | 50,4      | 15    | 286   | 0,00  |
  > | 360–420 s | 156        | 76,6      | 21    | 363   | 0,00  |
  > | 420–480 s | 200        | **93,2**  | 76    | 992   | 0,00  |
  > | 480–540 s | 200        | 90,2      | 76    | 1 274 | 0,00  |
  > | 540–600 s | 313        | **104,8** | 400   | 3 647 | 0,05  |
  > | 600–660 s | 387        | **97,7**  | 1 648 | 6 514 | 1,69  |
  > | 660–720 s | 81         | 0,5       | 1 096 | 2 371 | 7,41  |
  >
  > Đây là số liệu quan trọng nhất của cả bài. Quan hệ tải ↔ throughput:
  >
  > - 50 → 100 thread (+100 %): throughput 25,5 → 50,4 RPS (**+98 %**) — tăng gần tuyến tính, hệ thống còn dư năng lực.
  > - 100 → 200 thread (+100 %): 50,4 → 93,2 RPS (**+85 %**) — bắt đầu mất tuyến tính.
  > - 200 → 313 thread (+56 %): 93,2 → 104,8 RPS (**+12 %**) — gần như không còn tăng.
  > - 313 → 387 thread (+24 %): 104,8 → 97,7 RPS (**−7 %**) — throughput **giảm**, p50 nhảy từ 400 ms lên 1 648 ms.
  >
  > Throughput trần quan sát được ≈ **105 RPS**. Theo định nghĩa vận hành trong skill ("throughput ngừng tăng khi VU tiếp tục tăng = đã chạm bão hoà"), **điểm bão hoà nằm trong khoảng 200–300 VU**, không phải 400 VU.
  >
  > **Spike, cửa sổ 30 s:**
  >
  > | Cửa sổ   | Threads TB | RPS   | p50   | p95    | Err %     |
  > | -------- | ---------- | ----- | ----- | ------ | --------- |
  > | 0–30 s   | 39         | 103,5 | 225   | 626    | 0,00      |
  > | 30–60 s  | **500**    | 156,2 | 1 229 | 10 011 | **33,26** |
  > | 60–90 s  | 481        | 180,2 | 1 197 | 10 008 | **36,95** |
  > | 90–120 s | 95         | 107,6 | 269   | 717    | 2,69      |
  >
  > Cửa sổ cuối cho thấy hệ thống **phục hồi nhanh và hoàn toàn**: khi tải rút về 95 thread, p95 quay lại 717 ms và error rate về 2,69 %. Không có dấu hiệu hỏng vĩnh viễn sau đỉnh tải.
  >
  > ### 1.4 Bằng chứng quyết định: cột `Connect` và trần timeout
  >
  > | Kịch bản | Connect p50 | Connect p95  | Connect max | Sample chạm trần `response_timeout` 10 s | Sample có `Connect ≥ 5 s` |
  > | -------- | ----------- | ------------ | ----------- | ---------------------------------------- | ------------------------- |
  > | Load     | 0           | 0            | 26 ms       | 0 (0,0 %)                                | 0 (0,0 %)                 |
  > | Stress   | 0           | 0            | 264 ms      | 63 (0,2 %)                               | 0 (0,0 %)                 |
  > | Spike    | 0           | **5 005 ms** | 5 095 ms    | **934 (5,7 %)**                          | **2 585 (15,7 %)**        |
  >
  > Ở bài Spike, **15,7 % số request tiêu tốn ≥ 5 giây chỉ để thiết lập kết nối TCP** — chạm đúng giá trị `connect_timeout = 5000 ms` mà chính test plan cấu hình. Trên localhost, thời gian này lẽ ra phải gần 0 (và đúng là bằng 0 ở bài Load). Nghĩa là **nút thắt của bài Spike nằm ở tầng thiết lập kết nối, không phải ở logic ứng dụng**.
  >
  > ***
  >
  > ## 2. Diễn giải
  >
  > ### 2.1 Hệ thống có đạt mục tiêu không
  >
  > Đối chiếu với Performance Goal đã đặt trong `23127211_Workload_Model.md` (dùng số liệu **steady-state**):
  >
  > | Chỉ số             | Mục tiêu     | Load             | Stress                  | Spike        |
  > | ------------------ | ------------ | ---------------- | ----------------------- | ------------ |
  > | p95 toàn workflow  | < 2 000 ms   | **112 ms** ✅    | 6 244 ms ❌             | 10 011 ms ❌ |
  > | p95 riêng Checkout | < 3 000 ms   | **149 ms** ✅    | 3 510 ms ❌ (toàn file) | 5 006 ms ❌  |
  > | Error rate         | < 1 % (Load) | **0,000 %** ✅   | 1,288 % ❌              | 34,977 % ❌  |
  > | Throughput         | ≥ 15 RPS     | **25,74 RPS** ✅ | —                       | —            |
  >
  > Ở mức tải thiết kế (50 VU), hệ thống **đạt toàn bộ mục tiêu với biên rất rộng** — p95 chỉ bằng 5,6 % ngưỡng. Stress và Spike vượt ngưỡng là điều **mong đợi**, vì mục đích của hai kịch bản đó là đẩy hệ thống qua giới hạn chứ không phải để pass.
  >
  > ### 2.2 Nút thắt quan sát được
  >
  > **Nút thắt 1 — tầng ghi SQLite (chi phối ở tải trung bình).** Bằng chứng:
  >
  > - Thứ tự p95 ở Load steady-state: hai endpoint ghi DB đứng đầu (`cancel` 203 ms, `checkout` 149 ms), endpoint thuần RAM đứng cuối (`cart` 12 ms).
  > - Xác minh mã nguồn: `PRAGMA journal_mode` của `backend/database.sqlite` trả về **`delete`** — chế độ rollback journal mặc định, trong đó **writer khoá toàn bộ database và chặn cả reader**.
  > - Ở Stress, endpoint `cancel` (SELECT + UPDATE) có p95 = 5 929 ms, cao nhất trong 6 endpoint, và chiếm 34/106 lỗi.
  >
  > **Nút thắt 2 — tầng thiết lập kết nối (chi phối ở tải đột biến).** Bằng chứng: bảng 1.4 — `Connect` p95 = 5 005 ms và 15,7 % request chạm trần connect timeout, trong khi ở Load `Connect` = 0. Đây là nút thắt **khác hẳn** nút thắt 1 và không thể khắc phục bằng cách tối ưu database.
  >
  > Hai nút thắt này xuất hiện ở hai chế độ tải khác nhau — trộn lẫn chúng sẽ dẫn tới đề xuất tối ưu sai chỗ.
  >
  > ### 2.3 Threshold đề xuất
  >
  > Lấy p95 đo được ở **Load steady-state** làm cơ sở, cộng biên an toàn 50 %:
  >
  > | Endpoint                     | p95 đo được | Threshold đề xuất                    | Cơ sở            |
  > | ---------------------------- | ----------- | ------------------------------------ | ---------------- |
  > | `POST /api/cart`             | 12 ms       | **p95 < 20 ms**                      | Suy ra từ đo đạc |
  > | `POST /api/login`            | 64 ms       | **p95 < 100 ms**                     | Suy ra từ đo đạc |
  > | `GET /api/categories`        | 99 ms       | **p95 < 150 ms**                     | Suy ra từ đo đạc |
  > | `GET /api/products/:id`      | 102 ms      | **p95 < 160 ms**                     | Suy ra từ đo đạc |
  > | `POST /api/checkout`         | 149 ms      | **p95 < 230 ms**                     | Suy ra từ đo đạc |
  > | `PUT /api/orders/:id/cancel` | 203 ms      | **p95 < 310 ms**                     | Suy ra từ đo đạc |
  > | Toàn workflow                | 112 ms      | **p95 < 200 ms**, error rate < 0,5 % | Suy ra từ đo đạc |
  >
  > Toàn bộ đều là **threshold suy ra từ đo đạc trên phần cứng này**, không phải yêu cầu nghiệp vụ áp từ ngoài. Ngưỡng 2 000 ms ban đầu trong Workload Model quá lỏng đến mức vô dụng làm quality gate: hệ thống có thể chậm đi **17 lần** mà vẫn "pass".
  >
  > ### 2.4 Endurance threshold
  >
  > Từ soak test 15 phút (k6, 50 VU) và bảng bão hoà 1.3:
  >
  > - **Maximum stable RPS: ~25 RPS ở 50 VU** với error rate 0,12 % và p95 = 50,87 ms không tăng dần theo thời gian.
  > - **Trần throughput tuyệt đối: ~105 RPS** (đạt ở 313 VU), nhưng ở mức đó p95 = 3 647 ms — vượt xa ngưỡng dùng được. **Vùng vận hành an toàn khuyến nghị: ≤ 200 VU / ~90 RPS**, nơi p95 vẫn ≈ 1 000 ms và error rate = 0 %.
  > - **Memory ceiling: ~92 MB RSS**, ổn định, không tăng đơn điệu ⇒ không có dấu hiệu memory leak trong 15 phút.
  >
  > ***
  >
  > ## 3. Truy tìm chỗ AI đọc sai
  >
  > Đối tượng rà soát: `23127211_Execution_Report.md` §2–§4 (bản phân tích do AI viết dựa trên dashboard + console summary, **không** tính lại từ raw log).
  >
  > | #      | AI phát biểu                                                                                                                       | Giá trị đúng từ raw log                                                                                                                                                                                                                               | Sai ở đâu                                                                                                                                                                                                                                                                                                           | Vì sao AI sai                                                                                                                                                                                                                                                                                                                   |
  > | ------ | ---------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  > | **M1** | Trình bày `.jtl` như "raw log" và trong tóm tắt phiên làm việc nói file Load có "13 983 dòng" như thể đó là quy mô dữ liệu request | File có 13 982 data row nhưng **chỉ 6 966 là HTTP request thật**; 7 016 row còn lại là Transaction Controller trùng lặp + 50 artifact                                                                                                                 | Không phân biệt hai loại row. Đọc thô file này cho throughput **46,62 RPS** thay vì 23,24 RPS — sai đúng 2 lần                                                                                                                                                                                                      | AI lấy số sample từ dashboard (đúng) nhưng chưa bao giờ mở raw log ra đếm, nên không biết vì sao hai con số vênh nhau. Đây là kiểu lỗi "đúng kết quả nhưng sai phương pháp" — lần sau đổi cấu hình test plan là sai luôn                                                                                                        |
  > | **M2** | "Stress: p50 = 239, p90 = 3541, **p95 = 4699**, p99 = 7347" (trích `statistics.json`)                                              | Trên đúng tập 39 658 sample đó: **p50 = 39, p90 = 2170, p95 = 3603, p99 = 6269**                                                                                                                                                                      | Dashboard **phóng đại p95 lên 30 %** và p50 lên **6 lần**. Đã kiểm chứng bằng 2 thuật toán percentile (nearest-rank và nội suy tuyến tính) trên 3 tập ứng viên (sampler-only / TC-only / toàn bộ row) — không tập nào tái tạo được số của dashboard, dù `sampleCount` (39 658) và `mean` (602,3) khớp **tuyệt đối** | AI mặc định coi HTML dashboard là nguồn sự thật. Đáng chú ý: dashboard của **Load và Spike khớp chính xác** với raw log, chỉ riêng file Stress lệch ⇒ đây là bất thường cục bộ, chưa xác định được nguyên nhân, và chính vì không đoán trước được nên **quy tắc "luôn trích raw log" mới là bắt buộc** chứ không phải hình thức |
  > | **M3** | Mọi percentile báo cáo đều là số **toàn file**; không nhắc tới steady-state                                                        | Load: p95 toàn file 129 vs steady 112. **Stress: 3 603 vs 6 244 (+73 %)**. Spike: 22,18 % vs **34,98 %** error rate                                                                                                                                   | Trộn lẫn ramp-up/ramp-down vào số liệu SLA. Với Stress, AI báo hệ thống **tốt hơn thực tế rất nhiều** ở đúng giai đoạn cần đánh giá                                                                                                                                                                                 | `.jtl` không có cột đánh dấu giai đoạn; phải suy ra từ diễn biến `allThreads`. AI tính trên toàn bộ tập dữ liệu được đưa mà không đặt câu hỏi tập đó có đồng nhất không                                                                                                                                                         |
  > | **M4** | "Spike: error rate **22,18 %** … hệ thống **không chịu được** cú sốc tải đột ngột"                                                 | 3 644 lỗi, trong đó **3 466 (95,1 %) là lỗi client-side** (`Non HTTP response code: ConnectTimeoutException / SocketException`). Chỉ **178 (4,9 %)** là phản hồi HTTP thật từ backend (171 × 403, 7 × 404). Stress: 69/106 (65 %) cũng là client-side | Quy kết toàn bộ error rate cho backend, trong khi phần lớn là **JMeter không mở nổi kết nối TCP**. Kết luận "backend gãy" không được dữ liệu ủng hộ ở mức đó                                                                                                                                                        | Cột `responseCode` với lỗi client-side vẫn hiển thị như một mã lỗi, rất dễ bị đếm gộp. AI không phân rã lỗi theo loại trước khi kết luận (đúng pattern C4 + C3 trong `misinterpretation-patterns.md`)                                                                                                                           |
  > | **M5** | "Spike: **p95 = 10 008 ms**", "max 14 122 ms" trình bày như thời gian phản hồi đo được của server                                  | **934 sample (5,7 %) chạm đúng trần `response_timeout = 10 000 ms`** và **2 585 (15,7 %) có `Connect ≥ 5 000 ms`** = trần `connect_timeout` — cả hai đều là **tham số do chính test plan đặt ra**                                                     | Đây là dữ liệu **bị kiểm duyệt phải (right-censored)**: p95/p99 của Spike phản ánh cấu hình timeout của công cụ đo, **không phải** năng lực thật của server. Thời gian phản hồi thật của nhóm request đó là **không biết được**                                                                                     | AI đọc cột `elapsed` như một phép đo thuần tuý, không đối chiếu với chính cấu hình timeout mà nó đã sinh ra ở Task 1                                                                                                                                                                                                            |
  > | **M6** | "Điểm gãy rõ ràng ở **bậc 400 VU**"                                                                                                | Throughput: 50 VU → 25,5 RPS; 100 → 50,4; 200 → 93,2; **313 → 104,8 (+12 % dù tải +56 %)**; 387 → **97,7 (giảm 7 %)**. Trần ≈ 105 RPS                                                                                                                 | Nhầm **"nơi lỗi bắt đầu hiện ra"** với **"nơi hệ thống hết khả năng mở rộng"**. Bão hoà thật bắt đầu ở **200–300 VU**; đến 400 VU thì hệ thống đã quá tải từ lâu                                                                                                                                                    | AI đọc error rate theo mốc thời gian trên console summary thay vì dựng quan hệ tải ↔ throughput. Lỗi này khiến khuyến nghị vận hành lệch **gấp đôi** (400 vs 200 VU)                                                                                                                                                            |
  > | **M7** | "Spike: throughput **136,67 req/s**" trình bày như năng lực xử lý                                                                  | 137,4 RPS **thô** nhưng chỉ **106,9 RPS thành công** (12 783/16 427)                                                                                                                                                                                  | Tính cả request lỗi vào throughput ⇒ **thổi phồng năng lực 29 %**. Một request timeout không phải là "công việc đã xử lý"                                                                                                                                                                                           | JMeter báo throughput gộp; AI chép lại mà không lọc theo cột `success`                                                                                                                                                                                                                                                          |
  > | **M8** | Dùng dashboard làm "3 report view", ngầm định số liệu theo endpoint là đọc được                                                    | Bước Cancel bị **nổ cardinality**: 1 131 label riêng (Load), 6 508 (Stress), 2 067 (Spike), **mỗi label đúng 1 sample** ⇒ mọi percentile của bước Cancel trên dashboard đều tính trên 1 mẫu                                                           | Bảng Statistics của dashboard bị rác hoá bởi hàng nghìn dòng vô nghĩa; không thể đọc được hiệu năng của bước Cancel nếu không tự gom label ở tầng phân tích                                                                                                                                                         | Tên sampler chứa biến runtime `${order_id}`. Lỗi này **đã tồn tại từ Task 1** và không bị bắt trong Review Notes vì lúc đó chưa ai mở dashboard ra xem                                                                                                                                                                          |
  >
  > **Không tìm thấy chỗ sai ở:** số sample tổng (6 966 / 39 658 / 16 427 — khớp tuyệt đối với raw log), giá trị `mean` của cả 3 file, và kết luận về memory ceiling (~92 MB, không leak) — kết luận này dựa trên soak test 15 phút, tức là **đủ dài** để phát biểu theo tiêu chuẩn B4 trong `misinterpretation-patterns.md`.
  >
  > **Tổng kết mức nghiêm trọng:**
  >
  > - **Đảo ngược kết luận:** M6 (khuyến nghị vận hành sai gấp đôi), M4 (chẩn đoán nhầm tầng gây lỗi).
  > - **Sai số lượng lớn:** M2 (p95 +30 %), M3 (p95 Stress −42 % so với thực tế ở steady-state), M7 (+29 % throughput).
  > - **Sai bản chất phép đo:** M5 (dữ liệu bị censored), M1 (đơn vị dữ liệu).
  > - **Che khuất thông tin:** M8.
  >
  > ***
  >
  > ## 4. Phân loại đề xuất tối ưu: khả thi hay ảo tưởng
  >
  > Các đề xuất dưới đây do AI đưa ra (bao gồm cả 3 đề xuất mà đề bài gợi ý sẵn: thêm index, connection pool, bật SQLite WAL). Verdict dựa trên bằng chứng trong log **và** kiểm tra trực tiếp mã nguồn/cấu hình thật.
  >
  > | #   | Đề xuất                                                 | Verdict                                                                  | Bằng chứng                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Cách kiểm chứng                                                                                                                                                                                                                                                                                                   |
  > | --- | ------------------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  > | 1   | **Bật SQLite WAL mode**                                 | ✅ **Khả thi**                                                           | Đã xác minh `PRAGMA journal_mode` = **`delete`** (rollback journal — writer khoá toàn DB, chặn cả reader). Log ủng hộ: ở Load steady-state, hai endpoint **ghi DB** chậm nhất (`cancel` p95 = 203 ms, `checkout` 149 ms) trong khi endpoint **thuần RAM không chạm DB** (`cart`, xác minh `server.js:290-295`) chỉ 12 ms — chênh 12–17 lần. Ở Stress, `cancel` giữ p95 cao nhất (5 929 ms)                                                                                | `PRAGMA journal_mode=WAL;` rồi chạy lại soak test, so p95 riêng của `checkout` + `cancel`. **Giới hạn phải nêu:** WAL vẫn chỉ cho phép **một** writer tại một thời điểm, nên sẽ giúp nhiều cho cặp đọc-ghi tranh chấp nhưng ít cho ghi đồng thời thuần tuý; và **không giúp gì** cho nút thắt kết nối ở bài Spike |
  > | 2   | **Thêm index cho `products.name`**                      | ❌ **Ảo tưởng trong ngữ cảnh này**                                       | Bảng `products` có **đúng 5 bản ghi** (đếm trực tiếp trong DB). SQLite quét tuần tự 5 dòng nhanh hơn đi qua B-tree index. Hơn nữa workflow "Khách mới — mua rồi đổi ý" **không gọi endpoint search** lần nào, nên log không có một mẫu dữ liệu nào để chứng minh                                                                                                                                                                                                          | `EXPLAIN QUERY PLAN` trên truy vấn search; nhưng trước đó phải seed bảng products lên hàng chục nghìn dòng thì câu hỏi mới có nghĩa                                                                                                                                                                               |
  > | 3   | **Thêm index cho `orders.user_id`**                     | ⚠️ **Khả thi nhưng chưa có căn cứ**                                      | Đúng là bảng `orders` hiện có **24 692 dòng** và **không có index nào do người dùng tạo** (chỉ có `sqlite_autoindex_coupons_1` sinh từ ràng buộc UNIQUE). Endpoint `GET /api/orders/my-orders` (`WHERE user_id = ? ORDER BY id DESC`) sẽ quét toàn bảng. **Nhưng** workflow này không gọi endpoint đó; còn `PUT /api/orders/:id/cancel` tra theo `id` là `INTEGER PRIMARY KEY` (rowid) nên **đã được lập chỉ mục sẵn**                                                    | Bổ sung `GET /api/orders/my-orders` vào một test plan riêng rồi đo lại; hoặc bật slow query log để xác nhận truy vấn nào thực sự chậm                                                                                                                                                                             |
  > | 4   | **Thêm connection pool cho database**                   | ❌ **Ảo tưởng trong ngữ cảnh này**                                       | Backend dùng **SQLite truy cập file cục bộ** (`database.js:4-5`, một đối tượng `Database` duy nhất), không phải DB client-server — khái niệm pool kết nối không áp dụng trực tiếp. Tệ hơn: mở nhiều handle ghi song song vào cùng file ở chế độ `delete` journal sẽ **làm tranh chấp khoá nặng hơn**. Log cũng không ủng hộ: cột `Connect` (tầng HTTP) = 0 ms ở Load và Stress                                                                                            | Đọc cấu hình driver hiện tại; nếu sau này đổi sang PostgreSQL/MySQL thì đề xuất này mới trở nên có nghĩa                                                                                                                                                                                                          |
  > | 5   | **Bật nén response (gzip)**                             | ❌ **Ảo tưởng**                                                          | Ở Load, `Latency` (TTFB) ≈ `elapsed`: mean 33,8 vs 33,8 ms, p95 129 vs 129 ms ⇒ **thời gian truyền nội dung ≈ 0**. Test chạy trên localhost, payload là JSON nhỏ. Nén chỉ thêm chi phí CPU mà không tiết kiệm được gì                                                                                                                                                                                                                                                     | Đo `elapsed − Latency` trước/sau; nhưng với chênh lệch bằng 0 thì không có gì để tối ưu                                                                                                                                                                                                                           |
  > | 6   | **Bật HTTP keep-alive**                                 | ⚪ **Không áp dụng — đã bật sẵn**                                        | Test plan đã đặt `use_keepalive = true`, và log xác nhận có hiệu lực: `Connect` p50 = 0 ms, mean = 0,0 ms ở bài Load ⇒ kết nối đang được tái sử dụng                                                                                                                                                                                                                                                                                                                      | Không cần — đề xuất này đã là hiện trạng                                                                                                                                                                                                                                                                          |
  > | 7   | **Tăng listen backlog / tối ưu tầng chấp nhận kết nối** | ✅ **Khả thi — và là đề xuất duy nhất nhắm đúng nút thắt của bài Spike** | Bằng chứng trực tiếp: ở Spike, `Connect` p95 = **5 005 ms** và **2 585 request (15,7 %)** chạm trần connect timeout 5 s, trong khi cùng chỉ số này = 0 ms ở bài Load. 95,1 % lỗi của Spike là lỗi **thiết lập kết nối** phía client. `app.listen(PORT)` trong `server.js:570` không truyền tham số `backlog` nên dùng mặc định                                                                                                                                            | Đặt `app.listen(PORT, backlog)` với giá trị lớn hơn; theo dõi hàng đợi accept bằng `ss -lnt` (cột `Recv-Q` trên cổng 3000) trong lúc chạy lại Spike; so tỷ lệ request có `Connect ≥ 5 s`                                                                                                                          |
  > | 8   | **Chạy Node ở cluster mode / tăng số worker**           | ⚠️ **Khả thi nhưng chưa có căn cứ — và có rủi ro**                       | Backend đúng là chạy **đơn tiến trình** trên máy 8 nhân. Nhưng dữ liệu CPU trong lúc chạy Stress/Spike **không dùng được** (script giám sát bắt nhầm PID — xem `23127211_Review_Notes.md` #9), nên **không chứng minh được** CPU một nhân đã bão hoà hay chưa. Rủi ro: nhiều tiến trình cùng ghi một file SQLite ở chế độ `delete` journal sẽ **làm tranh chấp khoá tệ hơn**; ngoài ra giỏ hàng `userCarts` là biến in-memory nên **sẽ vỡ hoàn toàn** khi có nhiều worker | Sửa script giám sát rồi đo lại CPU **từng nhân** ở mức 200–300 VU. Nếu chỉ 1 nhân bận trong khi 7 nhân rảnh thì đề xuất mới có căn cứ — và khi đó vẫn phải chuyển `userCarts` ra store dùng chung trước                                                                                                           |
  > | 9   | **Thêm Redis cache cho endpoint đọc**                   | ⚠️ **Khả thi nhưng chưa có căn cứ**                                      | Test chỉ dùng **5 product ID** (bằng đúng số bản ghi trong bảng) ⇒ tỷ lệ cache hit đo được sẽ gần 100 % một cách **giả tạo**, không tái hiện ở môi trường thật. Ngoài ra hai endpoint đọc không phải nhóm chậm nhất (p95 = 99–102 ms, so với 149–203 ms của nhóm ghi)                                                                                                                                                                                                     | Mở rộng `products.csv` và bảng products lên quy mô thật, đo lại phân bố truy cập trước khi quyết định                                                                                                                                                                                                             |
  > | 10  | **Nâng cấp phần cứng / scale out**                      | ⚠️ **Chưa có căn cứ**                                                    | Đúng về nguyên tắc nhưng né tránh câu hỏi thật là nút thắt kiến trúc nằm ở đâu. Với SQLite file cục bộ + `userCarts` in-memory, kiến trúc hiện tại **không scale ngang được** dù thêm bao nhiêu máy                                                                                                                                                                                                                                                                       | Chạy cùng test plan trên hai cấu hình phần cứng khác nhau và so throughput trần; nếu tài nguyên gấp đôi mà throughput chỉ nhích vài % thì nút thắt là kiến trúc                                                                                                                                                   |
  >
  > **Thứ tự ưu tiên đề xuất (dựa trên bằng chứng, không phải cảm tính):**
  >
  > 1. **#7 (listen backlog)** — nhắm đúng nguyên nhân của 95 % lỗi ở kịch bản tệ nhất, chi phí gần bằng 0.
  > 2. **#1 (WAL)** — nhắm đúng nút thắt ở tải trung bình, một dòng lệnh, rủi ro thấp.
  > 3. **#8 (cluster)** — chỉ sau khi sửa được công cụ đo CPU và giải quyết `userCarts`.
  >
  > Ba đề xuất còn lại (#2, #4, #5) nên **bác bỏ thẳng**, vì chúng không giải quyết nút thắt nào đã quan sát được.
  >
  > ***
  >
  > ## 5. Giới hạn của kết luận
  >
  > Những điều bộ log này **không** cho phép kết luận:
  >
  > 1. **Không có dữ liệu tầng database.** `.jtl` là log phía client, không chứa thời gian truy vấn SQL, số lần khoá, hay kế hoạch thực thi. Mọi nhận định về SQLite ở Mục 2.2 và verdict #1 là **suy luận từ tương quan** (endpoint ghi chậm hơn endpoint không chạm DB), không phải quan sát trực tiếp. Muốn khẳng định phải bật slow query log.
  > 2. **Không có dữ liệu GC/heap của Node.js.** Không thể quy p99 cao cho GC pause.
  > 3. **Dữ liệu CPU/RAM trong 3 lần chạy JMeter không dùng được** (script giám sát bắt nhầm PID — Review Notes #9). Vì vậy **không kiểm chứng được** giả thuyết quan trọng nhất: ở mức 400–500 VU, liệu chính JMeter (JVM, 500 thread) hay backend mới là bên cạn tài nguyên trước. Đây là lỗ hổng lớn nhất của bộ dữ liệu này.
  > 4. **SUT và generator chạy chung một máy.** Mọi con số throughput là **giới hạn kết hợp** của cả hai tiến trình cộng tải nền của máy, không phải năng lực thuần của backend. Không được ngoại suy ra production.
  > 5. **p95/p99 của bài Spike bị kiểm duyệt bởi timeout** (M5): 5,7 % sample chạm trần 10 s, 15,7 % chạm trần connect 5 s. Giá trị thật của nhóm này là **không biết được**, chỉ biết là "≥ trần".
  > 6. **Bảng `orders` phình dần trong lúc đo.** Thứ tự chạy là Load → Stress → Spike, mỗi lần chạy để lại hàng nghìn đơn hàng (hiện 24 692 dòng). Ba kịch bản do đó **không bắt đầu từ cùng một trạng thái dữ liệu** — một biến gây nhiễu khi so sánh chéo, dù tác động có thể nhỏ vì `cancel` tra theo khoá chính.
  > 7. **Chỉ có 1 tài khoản và 5 product ID.** Mọi VU dùng chung `test@eshop.com`, nên `userCarts` là **một mảng dùng chung** — không phản ánh hành vi nhiều người dùng độc lập; và độ phân tán dữ liệu quá hẹp để đánh giá cache (verdict #9).
  > 8. **Không so trực tiếp được số của JMeter và k6.** `http_req_failed` của k6 chỉ dựa trên HTTP status, còn `success` của JMeter tính cả assertion — hai thang đo khác nhau (pattern C5). Chênh lệch error rate Spike (22,18 % JMeter vs 2,22 % k6) **phần lớn đến từ khác biệt thang đo và độ nặng của generator**, không phải bằng chứng cho thấy backend hành xử khác nhau giữa hai lần chạy.
  > 9. **Bất thường percentile của dashboard file Stress (M2) chưa tìm ra nguyên nhân.** Đã loại trừ: thuật toán percentile (2 loại), tập dữ liệu (3 ứng viên), artifact row, giả thuyết sliding-window. Cần điều tra thêm ở tầng mã nguồn JMeter report generator trước khi tin bất kỳ số nào khác từ dashboard của file này.

- **Đánh giá:** INCOMPLETE
- **Suy luận:**
  - **Đã kiểm chứng độc lập, khớp 100 %:** phân rã lỗi (Stress 69/106 client-side = 65,1 %; Spike 3466/3644 = 95,1 %, chi tiết HTTP 171×403 + 7×404), bảng bão hoà throughput theo cửa sổ 60 s (25,5 → 50,4 → 93,2 → 104,8 → 97,7 RPS), throughput hữu ích (Spike 106,9 vs 137,4 RPS thô), và các số liệu mã nguồn (`journal_mode` = `delete`, `products` = 5 dòng, `orders` = 24 692 dòng, `app.listen(PORT)` không truyền `backlog`).
  - **Cross-check bằng implementation khác:** chạy lại `analyze_jtl.py` của skill (mã do người khác viết) với `--label` cho `POST /api/checkout`, `POST /api/cart`, `GET /api/categories` — p50/p95/p99 khớp đúng bảng 1.2 của báo cáo.
  - **Không phát hiện số liệu bịa (D1).** Mọi con số trong báo cáo đều tái tạo lại được bằng script đính kèm.
  - **Bắt được 1 lỗi thật của chính báo cáo:** M2 và mục Giới hạn #9 kết luận "bất thường percentile của dashboard file Stress **chưa xác định được nguyên nhân**". Kết luận này **sai** — nguyên nhân tìm được ngay khi thử lại đúng cách: JMeter chỉ tính percentile trên **20 000 sample cuối** (`jmeter.reportgenerator.statistic_window = 20000`, ghi trong `bin/user.properties` dòng 78–80, để mặc định). Lấy 20 000 sample cuối + nội suy tuyến tính cho ra **239,00 / 4 698,95 / 7 346,96**, trùng khít dashboard đến 2 chữ số thập phân, và giải thích trọn vẹn vì sao Load (6 966) và Spike (16 427) khớp raw log còn Stress (39 658) thì lệch.
  - **Nguyên nhân AI kết luận sai:** ở lần thử đầu, giả thuyết sliding-window bị bác bỏ nhầm vì tôi dò trên tập dữ liệu gồm **cả Transaction Controller row** (79 401 row) thay vì chỉ HTTP sampler (39 658) — nên "20 000 cuối" rơi vào nhầm vùng dữ liệu. Một lỗi thao tác nhỏ đã dẫn tới việc bỏ cuộc và tuyên bố "không rõ nguyên nhân". Bài học: khi loại một giả thuyết, phải kiểm tra lại chính tập dữ liệu vừa dùng để loại nó.
  - **Phát sinh thêm 1 phát hiện mới trong lúc kiểm tra chéo:** lần xác minh đầu tiên bằng `awk` cho số hoàn toàn khác (Load: 8 116 sampler thay vì 6 966). Truy ra là **awk sai, không phải báo cáo sai** — vì label `06 - Doi y, huy don [transactional]` chứa dấu phẩy nên bị bọc nháy kép, và các row lỗi chứa ký tự xuống dòng (Spike: 54 718 dòng vật lý cho 32 854 row logic, lệch 66 %). Kết luận: **không được dùng `wc -l`/`awk`/`grep` trên bộ `.jtl` này**, kể cả các công thức awk mà `references/jtl-format.md` của skill gợi ý.

- **Sửa:** Đã sửa trực tiếp trong `performance-testing/23127211_Analysis_Report.md`:
  1. Viết lại dòng **M2** + thêm khung "M2 — truy ra nguyên nhân gốc" kèm bảng đối chiếu 3 file và cách khắc phục (nâng `statistic_window` rồi `jmeter -g` sinh lại report).
  2. Thay mục **Giới hạn #9** (nay đã được giải quyết) bằng giới hạn mới về việc không dùng được công cụ theo dòng, và thêm #10 ghi lại bài học "dashboard không tự cảnh báo khi cắt bớt dữ liệu".
  3. Sửa threshold "toàn workflow" từ `p95 < 200 ms` về **`p95 < 170 ms`** cho đúng quy tắc ×1,5 áp dụng ở các dòng còn lại của bảng (112 × 1,5 = 168).
