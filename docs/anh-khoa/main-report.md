# HW05 – Performance Testing on EShop

**Mã số sinh viên:** 23127211.
**Họ và tên:** Nguyễn Lê Hồ Anh Khoa.
**Mã bài tập:** HW05-AI.
**Ngày nộp:** 17/08/2026.
**Điểm tự đánh giá:** 100.
**GitHub repo (public, test plan + data file):** [`performance-testing/` @ nhánh `hw05/23127211`](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/tree/hw05/23127211/performance-testing)

---

## Phương pháp tiếp cận kiểm thử (AI-First Methodology)

Với mỗi task, AI **không** được giao một prompt hộp đen kiểu "hãy chạy load test rồi cho biết hiệu năng có tốt không". Quy trình thực tế là một pipeline nhiều bước, mỗi bước dùng output đã được con người duyệt của bước trước làm input cho bước sau (toàn bộ log nguyên văn nằm tại `./Appendix_A/ai audit report.md`):

1. **Chọn workflow** — sinh viên tự chọn kịch bản `requirements/api.md`: "Khách mới — mua rồi đổi ý" (login → categories → product detail → cart → checkout → cancel), phủ đủ 3 nhóm endpoint auth-heavy/read-heavy/transactional theo đúng yêu cầu đề bài.
2. **Thiết kế test plan (skill `perf-test-designer`)** — đi tuần tự 6 bước: Performance Goal → Workload Model → Thiết kế kịch bản → Data-driven CSV → Sinh test plan & thực thi → Bàn giao phân tích. Không nhảy thẳng tới file `.jmx`.
3. **Human review** — đối chiếu từng con số AI sinh ra với mã nguồn thật (`backend/server.js`, `backend/database.js`), không tin theo mẫu tổng quát. Kết quả: 7 điểm sai được sửa trước khi chạy (§1.2).
4. **Thực thi thật** trên WSL2 (`VN1-5CG1041RBP`), tự cài JMeter/k6, chạy đầy đủ Load/Stress/Spike + soak test.
5. **Phân tích (skill `perf-log-analyzer`)** — tính lại ground truth từ raw `.jtl`, đối chiếu ngược với bản phân tích ban đầu để săn lỗi AI đọc sai số liệu (§2).
6. **Đề xuất Continuous Performance Testing (Task 3)** — tự đưa ra mô hình, sau đó bị chính người dùng review độc lập bắt được 3 lỗ hổng thiết kế (§3.3).
7. **Báo bug (skill `bug-reporting`)** — mọi bug đều tra trùng lặp với 280+ issue đã có trước khi tạo mới (§1.4).

Mỗi bước đều chạy kèm `ai-audit-logger` để ghi lại nguyên văn prompt + output — đây là lý do toàn bộ mục "AI Gap Analysis" trong báo cáo này viết được, không phải suy diễn hồi tưởng.

---

# 1. Task 1 — Load / Stress / Spike Testing

## 1.1 Thiết kế Workload Model (skill `perf-test-designer`)

**Bước 1 — Performance Goal.** Đề bài không có SLA chính thức, nên toàn bộ ngưỡng dưới đây được đánh dấu rõ là **giả định khởi điểm**: p95 toàn workflow < 2000ms, p95 riêng Checkout < 3000ms, error rate < 1% (Load), throughput ≥ 15 RPS. (Sau khi có số liệu thật ở Task 2, các ngưỡng này được hiệu chỉnh lại chặt hơn nhiều — xem §2.2.)

**Bước 2 — Workload Model.** Vì đề bài yêu cầu 3 kịch bản chạy **cùng một workflow tuyến tính**, không phải nhiều luồng browse xác suất, nên "Transaction Distribution" kiểu phần trăm không áp dụng — 100% VU chạy trọn 6 bước mỗi vòng lặp:

| Bước                     | Endpoint                 | Method | Nhóm          | Think time (Load/Stress) |
| ------------------------ | ------------------------ | ------ | ------------- | ------------------------ |
| 1. Đăng nhập             | `/api/login`             | POST   | auth-heavy    | —                        |
| 2. Xem danh mục          | `/api/categories`        | GET    | read-heavy    | 1–2s                     |
| 3. Xem chi tiết sản phẩm | `/api/products/:id`      | GET    | read-heavy    | 1–3s                     |
| 4. Thêm vào giỏ          | `/api/cart`              | POST   | transactional | 2–5s                     |
| 5. Thanh toán            | `/api/checkout`          | POST   | transactional | 1–2s                     |
| 6. Đổi ý, huỷ đơn        | `/api/orders/:id/cancel` | PUT    | transactional | 2–4s                     |

Bước 6 phụ thuộc dữ liệu động từ bước 5 (`orderId` trích từ response checkout) — điểm correlation quan trọng nhất, không thể hard-code. Spike test: think time = 0 ở mọi bước.

**Bước 3 — Tham số 3 kịch bản:**

| Tham số         | Load         | Stress                     | Spike             |
| --------------- | ------------ | -------------------------- | ----------------- |
| VU              | 50 (cố định) | 50→100→200→400 (bậc thang) | 50→500 (đột biến) |
| Ramp-up         | 60s          | 60s/bậc                    | 30s               |
| Steady          | 180s         | 120s/bậc                   | 60s               |
| Ramp-down       | 60s          | — (xem giới hạn kỹ thuật)  | 30s (xấp xỉ)      |
| Tổng thời lượng | 300s         | 660s                       | 120s              |

Stress dùng bậc thang thay vì 1 mức cố định để xác định **điểm gãy nằm ở đâu**, không chỉ biết "có gãy". Cả Stress lẫn Spike triển khai bằng nhiều Thread Group xếp chồng có Scheduler (không dùng plugin ngoài) — chi tiết công thức Startup Delay/Duration trong `performance-testing/23127211_Workload_Model.md` §2.3.

**Bước 4 — Data-driven bằng CSV.** `users.csv` (1 tài khoản `test@eshop.com`, quyết định có chủ đích — chỉ có 2 tài khoản seed sẵn trong DB), `products.csv` (5 sản phẩm, khớp seed thật, kèm cột `price` để tính `total_amount` **không** trích từ response — lý do ở §1.2 phát hiện #5), `checkout.csv` (5 địa chỉ giao hàng).

**Bước 5 — Sinh test plan & report view.** Đặt tên đúng `{StudentID}_{ScenarioType}_{YYYYMMDD}`. Ba report view khác nhau, không lặp: Load = **Summary Report**, Stress = **Aggregate Report**, Spike = **View Results Tree**. Sinh bằng script Python tự viết (`performance-testing/jmeter/generate_jmx.py`) thay vì soạn XML tay, để tránh lỗi nesting `hashTree` — kiểm chứng bằng `xml.dom.minidom.parse` trước khi chạy thật.

## 1.2 AI Gap Analysis — Giai đoạn Thiết kế (Design Phase)

AI dựng test plan ban đầu theo **mẫu tổng quát** (endpoint minh hoạ chung như `/api/auth/login`, field `order_id`). Trước khi sinh file cuối, chủ động đọc trực tiếp `backend/server.js`/`database.js` để đối chiếu — phát hiện **7 điểm sai** phải sửa trước khi chạy:

| #   | Hạng mục                  | AI sinh ra (mẫu tổng quát)               | Vấn đề thật                                                                                                           | Nguyên nhân gốc         |
| --- | ------------------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| 1   | Endpoint Login            | `POST /api/auth/login`                   | Route thật là `POST /api/login`, dùng `email` không phải `username`                                                   | Đặc thù endpoint        |
| 2   | Endpoint Checkout + field | `POST /api/orders`, trích `$.order_id`   | Route thật `POST /api/checkout`, field trả về là `orderId` (camelCase)                                                | Đặc thù endpoint        |
| 3   | Account lockout           | Theo README: +1/khoá 30s                 | Code thật: `login_attempts += 2`, khoá **180s** — README sai so với implementation (bug thật, xem §1.4)               | Prompt chưa đủ ngữ cảnh |
| 4   | Product không tồn tại     | Giả định trả `404`                       | Backend trả `200 OK` + body `{}` rỗng (bug thật, xem §1.4)                                                            | Đặc thù endpoint        |
| 5   | Kiểu dữ liệu `price`      | Giả định luôn là số                      | `id` chẵn trả string, `id` lẻ trả number (bug thật, xem §1.4)                                                         | Đặc thù endpoint        |
| 6   | Stress ramp-down          | Ghi "Ramp-down 60s" như tham số cấu hình | JMeter Thread Group không có cơ chế ramp-down mượt — phải quan sát gián tiếp qua `allThreads`                         | Giới hạn mô hình        |
| 7   | Cô lập dữ liệu VU         | Ngầm giả định mỗi VU độc lập             | `userCarts` in-memory dùng chung theo `userId`; toàn bộ VU cùng 1 tài khoản → giỏ hàng bị cộng dồn (dẫn tới bug §1.4) | Prompt chưa đủ ngữ cảnh |

**Tổng kết nguyên nhân gốc (giai đoạn thiết kế):** Đặc thù endpoint 4 · Prompt chưa đủ ngữ cảnh 2 · Giới hạn mô hình 1. Chi tiết đầy đủ + đoạn giải trình văn xuôi: `performance-testing/23127211_Review_Notes.md`.

## 1.3 Thực thi thật — Kết quả Load / Stress / Spike

Chạy CLI thật trên `VN1-5CG1041RBP` (Ubuntu 22.04.5 WSL2, i5-10310U 8 nhân, 7.6GB RAM), JMeter 5.6.3 + k6 v2.2.0, backend Node.js v20.20.2 cùng máy.

**JMeter (công cụ bắt buộc):**

| Kịch bản           | Samples | Errors | Error % | Throughput | p95 (toàn file) | p95 (steady-state) |
| ------------------ | ------- | ------ | ------- | ---------- | --------------- | ------------------ |
| Load (50 VU)       | 6 966   | 0      | 0,00%   | 23,24 RPS  | 129 ms          | **112 ms**         |
| Stress (50→400 VU) | 39 658  | 106    | 0,27%   | 59,85 RPS  | 3 603 ms        | **6 244 ms**       |
| Spike (50→500 VU)  | 16 427  | 3 644  | 22,18%  | 136,67 RPS | 10 008 ms       | **10 011 ms**      |

**k6 (bonus, cùng workflow):**

| Kịch bản | Requests | http_req_failed | p95      |
| -------- | -------- | --------------- | -------- |
| Load     | 6 198    | 0,01%           | 101,3 ms |
| Stress   | 38 664   | 0,03%           | 3,62 s   |
| Spike    | 12 469   | 2,22%           | 3,15 s   |

**Endurance/Soak (15 phút, 50 VU, k6):** 21 571 request, 0,12% lỗi, **23,7 RPS ổn định** (đề xuất làm maximum stable RPS), p95 = 50,87ms không tăng dần. RSS backend: 68,6 → ổn định ~92 MB → giảm về 70,1 MB sau khi ngừng tải.

Toàn bộ số liệu ở bảng trên đã được **sửa lại một lần** so với báo cáo gốc ngay sau khi chạy — xem §1.4 (AI Gap Analysis Execution) để biết vì sao.

## 1.4 Bug Report & AI Gap Analysis — Giai đoạn Thực thi (Execution Phase)

**Tổng số bug tìm được: 5 bugs**, chia rõ theo nguồn phát hiện — đây là điểm khác biệt quan trọng với HW02 (nơi mọi bug đều `found-by:test-case`/`automation`): với một bài về performance testing, bug tìm được **nhờ chạy tải** mới thật sự chứng minh giá trị của kỹ thuật, không phải bug tìm được bằng đọc code thuần tuý.

| Bug ID              | Tiêu đề                                                                        | Found by                            | Nguồn          | Severity | Priority | GitHub Issue #                                                              |
| ------------------- | ------------------------------------------------------------------------------ | ----------------------------------- | -------------- | -------- | -------- | --------------------------------------------------------------------------- |
| **BUG-CART-001**    | Giỏ hàng in-memory phình vô hạn — 24 692 phần tử, response 700KB sau load test | Soak test 15 phút + `GET /api/cart` | `perf-testing` | Major    | P1       | [#285](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/285) |
| **BUG-API-001**     | Backend không chấp nhận kịp kết nối ở 500 VU — 15,7% chạm connect timeout 5s   | Spike test                          | `perf-testing` | Major    | P2       | [#286](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/286) |
| **BUG-LOGIN-005**   | Lockout sai đặc tả: `+2`/khoá 180s thay vì `+1`/30s                            | Đọc mã nguồn khi thiết kế           | `code-review`  | Critical | P1       | [#284](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/284) |
| **BUG-PRODUCT-003** | `products/:id` trả `200 {}` thay vì `404` cho ID không tồn tại                 | Đọc mã nguồn khi thiết kế           | `code-review`  | Major    | P2       | [#282](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/282) |
| **BUG-PRODUCT-004** | `price` trả kiểu chuỗi khi `id` chẵn, số khi `id` lẻ                           | Đọc mã nguồn khi thiết kế           | `code-review`  | Minor    | P3       | [#283](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/283) |

**Ảnh chụp GitHub Issue (bằng chứng đã tạo issue thật):**

- BUG-CART-001 (#285): `tests/bug-reports/screenshots/issue-285.png`
- BUG-API-001 (#286): `tests/bug-reports/screenshots/issue-286.png`
- BUG-LOGIN-005 (#284): `tests/bug-reports/screenshots/issue-284.png`
- BUG-PRODUCT-003 (#282): `tests/bug-reports/screenshots/issue-282.png`
- BUG-PRODUCT-004 (#283): `tests/bug-reports/screenshots/issue-283.png`
- Danh sách gộp 5 issue (lọc `label:hw05-perf-testing`): `tests/bug-reports/screenshots/issues-list-hw05.png`

**Tra trùng lặp trước khi tạo (quy tắc bắt buộc áp dụng, không phải tuỳ chọn):** `BUG-LOGIN-005` trùng nội dung kỹ thuật với issue #88/#89 đã có sẵn (từ HW04, `found-by:test-case`, `module:mobile`). Không đóng làm duplicate mà báo cáo riêng, vì (a) nguồn phát hiện khác (`code-review` vs `test-case`), (b) phạm vi ảnh hưởng rộng hơn nhãn gốc (`module:mobile` trong khi endpoint dùng chung cho cả web/admin/mobile), (c) bổ sung phân tích ảnh hưởng tới performance test mà 2 issue gốc không có. `BUG-CART-001` cũng khác về chất so với 3 issue chức năng đã có (#76/#201/#252 "giỏ hàng vẫn còn sau thanh toán") — 3 issue đó mô tả hệ quả ở quy mô vài sản phẩm, còn đây là hệ quả tài nguyên ở quy mô 24 692 phần tử, chỉ đo được bằng cách chạy tải thật.

**AI Gap Analysis (Execution Phase) — 2 lỗi kỹ thuật của chính bộ script AI sinh ra, chỉ lộ ra khi chạy CLI thật, không phải bug của SUT:**

1. **Listener filename trùng `-l` CLI (Review Notes #8).** `generate_jmx.py` ban đầu đặt `filename` của Listener trùng đường dẫn `-l` → 2 writer cùng ghi 1 file `.jtl` → dòng dữ liệu bị nhân đôi/lệch cột, JMeter không sinh được HTML report ở lần chạy Load đầu tiên (dù bản thân test chạy đúng, 0% lỗi). Nguyên nhân gốc: generator không tuân theo đúng khuyến nghị đã tự ghi trong tài liệu thiết kế của chính nó. File `.jtl` hỏng vẫn giữ lại làm bằng chứng: `performance-testing/jmeter/results/23127211_Load_20260814_run1_corrupted.jtl`.
2. **Script giám sát bắt nhầm PID (Review Notes #9).** `monitor_resources.sh` dùng `pgrep -f "node server.js"` khớp nhầm cả tiến trình bash wrapper của chính nó, khiến toàn bộ log CPU/RAM của 6 lần chạy đầu tiên vô nghĩa (flat 3200KB/0%). Sửa thành `pgrep -x node`, chạy lại 1 mẫu đối chứng ngắn để lấy số liệu memory ceiling hợp lệ, không tốn ~50 phút chạy lại toàn bộ 6 bài test.

**Đính chính quan trọng nhất phát hiện SAU khi viết Task 1 (khi làm Task 2):** báo cáo Task 1 bản đầu kết luận _"không phát hiện dấu hiệu memory leak"_ dựa trên đồ thị RSS phẳng suốt soak test. Kết luận này **sai** — xem §1.4 bug `BUG-CART-001`: giỏ hàng in-memory rò rỉ thật, chỉ không lộ ra vì tốc độ rò rỉ trong 15 phút (~0,4MB) chìm trong biên độ dao động tự nhiên ~24MB của V8 heap. Bảng số liệu ở §1.3 đã cập nhật lại đúng kết luận này; chi tiết đầy đủ ở `performance-testing/23127211_Execution_Report.md` §4 (khối "ĐÍNH CHÍNH").

---

# 2. Task 2 — AI Analysis & Misinterpretation Hunt (skill `perf-log-analyzer`)

## 2.1 Phát hiện nền tảng trước khi tính bất kỳ số liệu nào

Mỗi bước nghiệp vụ được bọc bởi Transaction Controller, nên JMeter ghi **2 row cho mỗi request thật** (1 HTTP sampler + 1 TC). Load có 13 982 row nhưng chỉ **6 966 request thật**. Không lọc TC row, throughput tính sai gấp đôi (46,62 vs 23,24 RPS). Nhãn bước Cancel còn bị nổ cardinality (`PUT /api/orders/${order_id}/cancel` → 6 508 label riêng ở bài Stress, mỗi label 1 sample) khiến thống kê theo endpoint trên dashboard vô nghĩa nếu không gom lại.

## 2.2 Diễn giải

Đối chiếu số liệu **steady-state** (đúng cách, không phải toàn file) với Performance Goal ở §1.1: Load đạt toàn bộ mục tiêu với biên rất rộng (p95 = 112ms, bằng 5,6% ngưỡng 2000ms ban đầu). Threshold vì vậy được siết lại theo số đo thật thay vì giữ ngưỡng ban đầu quá lỏng, ví dụ toàn workflow: **p95 < 170ms** (= 112 × 1,5).

**Hai nút thắt khác nhau, xuất hiện ở hai chế độ tải khác nhau:**

- **Tầng ghi SQLite** (chi phối ở tải trung bình): `POST /api/cart` (thuần RAM, không chạm DB) p95 = 12ms, so với `checkout` 149ms và `cancel` 203ms — chênh 12–17 lần. Xác minh mã nguồn: `PRAGMA journal_mode` = `delete` (rollback journal — writer khoá toàn DB, chặn cả reader).
- **Tầng thiết lập kết nối** (chi phối ở tải đột biến): `Connect` p95 = 5 005ms ở Spike (= 0ms ở Load), 15,7% request chạm trần `connect_timeout`. Dẫn tới `BUG-API-001` (§1.4).

**Điểm bão hoà thật ở 200–300 VU**, không phải 400 VU như suy đoán ban đầu từ error rate — throughput 200→313 VU chỉ +12% dù tải +56%, và 313→387 VU throughput **giảm** 7%.

## 2.3 Truy tìm chỗ AI đọc sai

Đối tượng rà soát: bản Execution Report §2–§4 (viết dựa trên dashboard + console summary, chưa tính lại từ raw log). **8 lỗi (M1–M8)**, mỗi lỗi dẫn về một phép đếm cụ thể tái lập được bằng `performance-testing/tools/ground_truth.py`:

| #   | AI phát biểu                                            | Giá trị đúng                                                                         | Mức độ                                                |
| --- | ------------------------------------------------------- | ------------------------------------------------------------------------------------ | ----------------------------------------------------- |
| M1  | Đọc thô `.jtl` cho throughput 46,62 RPS                 | 23,24 RPS (lọc TC row)                                                               | Sai số lượng lớn (2×)                                 |
| M2  | Dashboard Stress p95 = 4699ms                           | Raw log = 3603ms (`statistic_window=20000` chỉ tính 20K sample cuối, Stress có ~40K) | Sai số lượng lớn, **im lặng**                         |
| M3  | Dùng số toàn file làm SLA                               | Steady-state Stress p95 = 6244ms (cao hơn 73%)                                       | Đảo ngược kết luận                                    |
| M4  | "Spike lỗi 22,18% → backend không chịu nổi"             | 95,1% lỗi là client-side (ConnectTimeout/SocketException)                            | Đảo ngược kết luận                                    |
| M5  | "p95 = 10008ms" trình bày như thời gian phản hồi server | Dữ liệu bị censored bởi chính timeout của test plan (10s/5s)                         | Sai bản chất phép đo                                  |
| M6  | "Điểm gãy ở bậc 400 VU"                                 | Bão hoà thật ở 200–300 VU                                                            | Đảo ngược kết luận, lệch khuyến nghị vận hành gấp đôi |
| M7  | Throughput Spike = 136,67 RPS                           | Chỉ 106,9 RPS thành công (tính cả lỗi vào throughput)                                | Sai số lượng (+29%)                                   |
| M8  | Dùng dashboard làm report theo endpoint                 | Bước Cancel bị nổ 6 508 label, mỗi label 1 sample                                    | Che khuất thông tin                                   |

**M2 đáng chú ý nhất về phương pháp luận:** khi kiểm tra chéo độc lập (dùng `awk` thay vì Python), lần đầu ra kết quả sai hoàn toàn khác — hoá ra do `awk -F,` bị vỡ bởi dấu phẩy trong tên nhãn (`"06 - Doi y, huy don..."`) và ký tự xuống dòng trong message lỗi (Spike: 54 718 dòng vật lý cho 32 854 row logic, lệch 66%). Kết luận: **không dùng được `wc -l`/`awk`/`grep` trên bộ log này**, kể cả công thức mà chính skill gợi ý trong `references/jtl-format.md`.

## 2.4 Phân loại đề xuất tối ưu

10 đề xuất, chấm dựa trên kiểm tra mã nguồn thật (`journal_mode=delete`, không có index tự tạo, `products` chỉ 5 dòng, `orders` 24 692 dòng, `app.listen(PORT)` không truyền `backlog`):

| Đề xuất                | Verdict                    | Bằng chứng chính                                                                 |
| ---------------------- | -------------------------- | -------------------------------------------------------------------------------- |
| Bật SQLite WAL         | ✅ Khả thi                 | `journal_mode=delete` xác nhận; chênh 12–17× giữa endpoint ghi/không ghi         |
| Tăng `listen` backlog  | ✅ Khả thi (ưu tiên #1)    | Nhắm đúng nút thắt Spike (95% lỗi client-side do connect timeout)                |
| Index `orders.user_id` | ⚠️ Chưa có căn cứ          | Workflow không gọi endpoint cần index đó                                         |
| Cluster mode           | ⚠️ Chưa có căn cứ + rủi ro | Dữ liệu CPU hỏng (Review Notes #9); `userCarts` in-memory sẽ vỡ với nhiều worker |
| Redis cache            | ⚠️ Chưa có căn cứ          | Chỉ 5 sản phẩm → cache hit giả tạo                                               |
| Index `products.name`  | ❌ Ảo tưởng                | Bảng chỉ 5 dòng                                                                  |
| Connection pool        | ❌ Ảo tưởng                | SQLite file cục bộ, không phải client-server                                     |
| Gzip compression       | ❌ Ảo tưởng                | `elapsed ≈ Latency` → transfer time ≈ 0                                          |
| HTTP keep-alive        | ⚪ Đã bật sẵn              | `Connect` = 0ms ở Load xác nhận                                                  |
| Scale hardware         | ⚠️ Chưa có căn cứ          | Kiến trúc hiện tại (SQLite + in-memory cart) không scale ngang được dù thêm máy  |

## 2.5 Giới hạn của kết luận

Không có dữ liệu tầng database/GC/disk I/O (chỉ log client-side); dữ liệu CPU/RAM 6 lần chạy đầu không dùng được; SUT và generator chạy chung máy nên throughput là giới hạn kết hợp; p95/p99 Spike bị censored bởi timeout; bảng `orders` phình dần qua các lần chạy (confound); chỉ 1 tài khoản + 5 sản phẩm (độ phân tán dữ liệu quá hẹp); JMeter và k6 không so trực tiếp được (thang đo error khác nhau). Chi tiết đầy đủ: `performance-testing/23127211_Analysis_Report.md` §5.

---

# 3. Task 3 — Continuous Performance Testing Proposal (G9.6 — Disrupt)

Mô hình 3 tầng đáp ứng đúng 3 yêu cầu: **(1)** trigger theo path filter + loại sự kiện quyết định tầng nào chạy; **(2)** baseline riêng theo từng tầng (median 7 lần chạy gần nhất), ngưỡng regression `×1,25` suy từ chính biên độ nhiễu thật đo được (p95 Load dao động 68–163ms dù tải không đổi); **(3)** tầng PR (3 phút) chạy song song với unit/lint, tầng baseline/nightly chạy sau khi đã merge — không chặn feedback loop.

**Bắt buộc tính p95 từ raw `.jtl`, cấm đọc dashboard** — áp dụng trực tiếp bài học M2 ở §2.3 vào chính thiết kế pipeline, không phải nhắc lại suông.

Flow chart Mermaid đầy đủ + bảng trade-off (chi phí ~50–60 giờ máy/tháng, 5 nguồn false alarm, 4 loại false negative): `performance-testing/23127211_Continuous_Perf_Testing.md`.

**Bản đầu bị chính người dùng review độc lập bắt được 3 lỗ hổng thiết kế**, đã sửa:

1. Ngưỡng 1,25 suy từ dữ liệu 50 VU nhưng áp chung cho cả tầng PR chạy 10 VU — tách baseline riêng theo từng tầng, ghi rõ ngưỡng ở 10 VU là giả định ngoại suy chưa kiểm chứng.
2. Cơ chế commit lại `baselines/*.json` thiếu phần cấp quyền ghi (`GITHUB_TOKEN` mặc định không push được) — bổ sung `permissions: contents: write` + bot token cụ thể.
3. Bảng chi phí chưa tính công bảo trì self-hosted runner dù chính đề xuất khuyến nghị dùng — bổ sung dòng ~3–4 giờ/tháng.

---

# 4. Agent Skills & Settings

## 4.1 Chi tiết 4 Skill (`.agents/skills/`)

### 4.1.1 `perf-test-designer` — Performance Test Engineer

- **Vai trò:** Dẫn dắt qua đúng 6 bước quy trình kiểm thử hiệu năng, sinh test plan chạy được ngay thay vì cấu hình chung chung. **Không bao giờ nhảy thẳng tới file `.jmx`/script k6** — mỗi con số phải truy vết được về một giả định nghiệp vụ cụ thể.
- **Nguyên tắc cốt lõi:** Performance Goal trước, sau đó Workload Model (transaction distribution/think time/load profile), rồi mới thiết kế kịch bản; bắt buộc dùng CSV data-driven và cảnh báo account lockout; 3 report view khác nhau, không lặp; đặt tên file đúng convention.
- **Ví dụ thực tế:** phát hiện 7 điểm sai ở §1.2 chính là sản phẩm của bước "Human review — bắt buộc trước khi coi test plan là xong" mà skill này quy định.

### 4.1.2 `perf-log-analyzer` — Log Analyst kiêm người kiểm tra lại AI

- **Vai trò:** Tính ground truth từ raw log bằng script trước, diễn giải sau, rồi mới đối chiếu bản phân tích ban đầu để săn lỗi. "Một bản phân tích nghe hợp lý nhưng số liệu lấy từ ước lượng còn nguy hiểm hơn không phân tích gì."
- **Nguyên tắc cốt lõi:** 4 giai đoạn cứng — ground truth / diễn giải / truy tìm chỗ sai / phân loại đề xuất tối ưu; luôn tách steady-state khỏi ramp-up/ramp-down; luôn dùng cột `success` không dùng `responseCode` để tính error rate.
- **Ví dụ thực tế:** phát hiện `statistic_window=20000` (M2, §2.3) — bài học đắt giá nhất của toàn bộ bài, đến từ đúng nguyên tắc "luôn trích raw log, không tin dashboard" mà skill quy định.

### 4.1.3 `bug-reporting` — Bug Reporting Specialist

- **Vai trò:** Chuẩn hoá defect quan sát được thành bug report đúng format dự án, gán `Bug ID` theo convention `BUG-[MODULE]-[NNN]`.
- **Nguyên tắc cốt lõi:** Field khớp chính xác `.github/ISSUE_TEMPLATE/bug_report.md`; luôn sinh 2 output (GitHub Issue body + file `.md`); nhắc cập nhật cột Bug Issue trong traceability matrix.
- **Ví dụ thực tế:** khác với HW02 (nơi mọi bug độc lập theo Single Fault Assumption), ở HW05 skill này được dùng để tạo **thêm nhãn `found-by`** phân biệt nguồn phát hiện (`code-review` vs `perf-testing`) — một mở rộng convention phù hợp với domain performance testing, không có trong bug report chức năng thuần tuý.

### 4.1.4 `ai-audit-logger` — Audit Compliance Assistant

- **Vai trò:** Không phải 1 bước trong chuỗi — chạy kèm bất kỳ skill nào ở trên, chỉ ghi log khi được yêu cầu rõ ràng (quy tắc riêng của phiên làm việc này, khác với chạy tự động sau mọi bước).
- **Nguyên tắc cốt lõi:** Copy-paste nguyên văn, đầy đủ output gốc — cấm tóm tắt; format cố định `Công cụ AI/Thời gian/Nội dung prompt/AI output`, có thêm 3 trường `Đánh giá/Suy luận/Sửa` do người dùng tuỳ biến để ghi lại kết quả kiểm chứng độc lập.
- **Ví dụ thực tế:** entry ghi mô hình Continuous Performance Testing (§3) là ví dụ đầy đủ nhất — có cả toàn văn output gốc lẫn phần đánh giá độc lập tìm ra 3 lỗ hổng, cùng phần "Sửa" ghi lại chính xác đã sửa gì.

## 4.2 Workflow liên kết các Skill

```
requirements/api.md (chọn workflow)
        ↓
perf-test-designer (6 bước) ──→ human review (§1.2) ──→ .jmx/.js
        ↓ (sau khi chạy thật)
perf-log-analyzer (4 giai đoạn) ──→ misinterpretation hunt (§2.3) ──→ optimization verdict (§2.4)
        ↓
bug-reporting (mỗi bug đều tra trùng lặp trước khi tạo, §1.4)
        ↓
Task 3 (tự đề xuất) ──→ review độc lập (§3, người dùng bắt 3 gap)

ai-audit-logger chạy kèm mọi bước khi được yêu cầu, không nằm trong chuỗi chính.
```

## 4.3 Con người Verify ở đâu

Không nằm ở 1 bước cuối — là lớp giám sát xuyên suốt, mỗi lần AI lệch khỏi đúng vai trò đều bị bắt bằng cách đối chiếu **output thật** với bằng chứng độc lập, không tin AI tự báo cáo đúng:

- **Ở `perf-test-designer`:** con người phát hiện 7 điểm sai bằng cách đọc trực tiếp `server.js`/`database.js` thay vì tin mẫu tổng quát (§1.2) — 3/7 điểm sau này lộ ra là bug thật của SUT (`BUG-LOGIN-005`, `BUG-PRODUCT-003`, `BUG-PRODUCT-004`).
- **Ở lúc thực thi (ngoài phạm vi 1 skill cụ thể):** 2 lỗi kỹ thuật của chính script AI sinh ra chỉ lộ ra khi chạy CLI thật — listener filename trùng `-l` (làm hỏng report generation lần đầu) và script giám sát bắt nhầm PID (làm hỏng 6/7 log resource).
- **Ở `perf-log-analyzer`:** con người tự kiểm tra chéo bằng phương pháp độc lập (dùng `awk` thay Python) — lần đầu bắt được kết quả sai của chính `awk` (do dấu phẩy trong nhãn), sau đó truy tiếp tìm ra nguyên nhân gốc thật của M2 (`statistic_window=20000`) mà bản phân tích ban đầu bỏ cuộc, chỉ ghi "chưa xác định được nguyên nhân".
- **Ở kết luận memory leak (§1.4):** bản Execution Report đầu tiên kết luận sai "không có leak" từ đồ thị RSS phẳng; chỉ sau khi rà lại mã nguồn ở Task 2 mới phát hiện `BUG-CART-001` thật — một ví dụ trực tiếp cho nguyên tắc "không thấy bằng chứng ≠ có bằng chứng cho thấy không có" (xem `./Appendix_A/ai-critique.md`).
- **Ở Task 3:** người dùng tự đánh giá độc lập bản đề xuất đầu tiên, bắt được 3 lỗ hổng thiết kế thật (baseline lẫn giữa 2 mức tải, thiếu quyền ghi CI, thiếu chi phí bảo trì runner) — ghi đầy đủ vào `./Appendix_A/ai audit report.md` với 3 trường Đánh giá/Suy luận/Sửa.
- **Ở tra trùng lặp bug:** trước khi tạo `BUG-LOGIN-005` và `BUG-CART-001`, chủ động search 280+ issue có sẵn — tìm thấy đúng nội dung kỹ thuật đã được báo (từ HW04) nhưng khác nguồn phát hiện, nên báo riêng có giải trình thay vì tạo trùng vô căn cứ hoặc bỏ qua.

---

# 5. AI Critique

Xem `./Appendix_A/ai-critique.md` — tóm tắt 2 sai lầm nặng nhất (M2 và kết luận memory leak sai) và nguyên tắc rút ra: AI tính đúng trên dữ liệu được cung cấp nhưng không tự nghi ngờ độ tin cậy của chính dữ liệu đó.

---

# 6. Phụ lục — Danh sách file deliverable

| Loại                         | File                                                                   |
| ---------------------------- | ---------------------------------------------------------------------- |
| Test plan JMeter (bắt buộc)  | `performance-testing/jmeter/23127211_{Load,Stress,Spike}_20260814.jmx` |
| Script k6 (bonus)            | `performance-testing/k6/23127211_{Load,Stress,Spike,Soak}_20260814.js` |
| Thiết kế                     | `performance-testing/23127211_Workload_Model.md`                       |
| Human review (design phase)  | `performance-testing/23127211_Review_Notes.md`                         |
| Kết quả thực thi             | `performance-testing/23127211_Execution_Report.md`                     |
| Phân tích Task 2             | `performance-testing/23127211_Analysis_Report.md`                      |
| Đề xuất Task 3               | `performance-testing/23127211_Continuous_Perf_Testing.md`              |
| AI Critique                  | `./Appendix_A/ai-critique.md`                                          |
| AI Audit Report              | `./Appendix_A/ai audit report.md`                                      |
| Bug report (5 file)          | `tests/bug-reports/{product,login,cart,api}/BUG-*.md`                  |
| Kịch bản quay video          | `performance-testing/23127211_Demo_Script.md`                          |
| Hướng dẫn chụp ảnh còn thiếu | `performance-testing/23127211_Screenshot_Guide.md`                     |
| Checklist nộp bài            | `performance-testing/23127211_Submission_Checklist.md`                 |
