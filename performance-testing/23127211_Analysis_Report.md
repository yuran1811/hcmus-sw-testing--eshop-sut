# Task 2 — Phân tích log bằng AI và truy tìm chỗ AI đọc sai

> Thực hiện theo `.agents/skills/perf-log-analyzer/SKILL.md` (quy trình 4 giai đoạn).
>
> **Bản phân tích bị đem ra soi ở Mục 3 chính là `23127211_Execution_Report.md`** — bản tóm tắt kết quả do AI (Claude Code) viết ngay sau khi chạy test, dựa trên `statistics.json` của HTML dashboard và console summary. Mục 1 tính lại toàn bộ số liệu **từ raw `.jtl`** để làm ground truth, rồi đối chiếu ngược.
>
> Mọi con số ở Mục 1 đều tái tạo được bằng script `ground_truth.py` (đính kèm trong `performance-testing/tools/`); mỗi phát hiện ở Mục 3 đều dẫn về một phép đếm cụ thể trên file log.

---

## 0. Phát hiện nền tảng: file `.jtl` chứa **hai loại row**, số row ≠ số request

Trước khi tính bất kỳ chỉ số nào, phải giải quyết một vấn đề mà bản phân tích cũ hoàn toàn bỏ qua.

Mỗi bước nghiệp vụ trong test plan được bọc bởi một `Transaction Controller` (`parent=false`), nên JMeter ghi **2 row cho mỗi request**: một row của HTTP sampler và một row của Transaction Controller bọc nó (cùng `elapsed`, ghi liền kề nhau).

Kiểm chứng trực tiếp trên `23127211_Load_20260814.jtl`, thread `Load - 50 VU baseline 1-1`:

```
ts=...784163  elapsed=42   label=POST /api/login                  <- HTTP sampler
ts=...784030  elapsed=42   label=01 - Login [auth-heavy]          <- Transaction Controller (trùng elapsed)
ts=...785401  elapsed=4    label=GET /api/categories
ts=...784249  elapsed=4    label=02 - Xem danh muc [read-heavy]
```

Đối chiếu số lượng row của cả 3 file:

| File   | Tổng row | TC row | TC artifact (`threadName` rỗng) | HTTP sampler row | Request THẬT |
| ------ | -------- | ------ | ------------------------------- | ---------------- | ------------ |
| Load   | 13 982   | 7 016  | 50                              | 6 966            | **6 966**    |
| Stress | 79 401   | 39 743 | 85                              | 39 658           | **39 658**   |
| Spike  | 32 854   | 16 427 | 0                               | 16 427           | **16 427**   |

Reconcile chính xác: `7016 − 50 = 6966` và `39743 − 85 = 39658` — đúng bằng số HTTP sampler. 50/85 row dôi ra là **artifact lúc JMeter shutdown**: TC row có cột `threadName` rỗng, nằm ở cuối file (từ dòng 13 732/13 982 với file Load), mỗi thread sinh đúng 1 row.

**Hệ quả bắt buộc phải nhớ khi đọc log này:**

- Đếm `wc -l` trên `.jtl` sẽ ra **gấp đôi** số request thật.
- Chạy script phân tích mặc định (`analyze_jtl.py`) mà không lọc TC row cho ra **throughput 46,62 RPS** cho bài Load — trong khi throughput thật là **23,24 RPS**. Sai đúng 2 lần.
- Toàn bộ Mục 1 dưới đây **chỉ tính trên HTTP sampler row**, đã loại TC row và artifact.

Ngoài ra, tên sampler của bước Cancel chứa biến động `PUT /api/orders/${order_id}/cancel`, nên **mỗi request sinh ra một label riêng biệt**: 1 131 label (Load), 6 508 (Stress), 2 067 (Spike) — mỗi label đúng 1 sample. Trong `statistics.json` của dashboard, bước Cancel do đó xuất hiện thành 1 131 dòng riêng, **mỗi dòng có `sampleCount = 1`** ⇒ mọi percentile của bước Cancel trên dashboard đều được tính trên đúng 1 mẫu, tức là vô nghĩa. Ở Mục 1 các label này được gom lại thành `PUT /api/orders/:id/cancel`.

---

## 1. Số liệu ground truth (tính lại từ raw `.jtl`)

### 1.1 Tổng thể — toàn file so với chỉ steady-state

Steady-state xác định bằng khoảng thời gian `allThreads ≥ 90% peak`.

| Kịch bản   | Phạm vi                      | Samples | Thời lượng | Throughput     | Error rate   | p50   | p90   | p95        | p99    | max    |
| ---------- | ---------------------------- | ------- | ---------- | -------------- | ------------ | ----- | ----- | ---------- | ------ | ------ |
| **Load**   | toàn file                    | 6 966   | 299,8 s    | 23,24 RPS      | 0,000 %      | 8     | 59    | 129        | 456    | 1 422  |
| **Load**   | **steady (≥45/50 thread)**   | 6 272   | 243,6 s    | **25,74 RPS**  | 0,000 %      | 9     | 54    | **112**    | 334    | 1 422  |
| **Stress** | toàn file                    | 39 658  | 662,6 s    | 59,85 RPS      | 0,267 %      | 39    | 2 170 | 3 603      | 6 269  | 10 035 |
| **Stress** | **steady (≥360/400 thread)** | 7 765   | 80,8 s     | **96,05 RPS**  | **1,288 %**  | 1 019 | 4 950 | **6 244**  | 9 515  | 10 035 |
| **Spike**  | toàn file                    | 16 427  | 120,2 s    | 136,67 RPS     | 22,183 %     | 653   | 5 006 | 10 008     | 12 402 | 14 122 |
| **Spike**  | **steady (≥450/500 thread)** | 10 198  | 73,0 s     | **139,77 RPS** | **34,977 %** | 1 198 | 6 726 | **10 011** | 13 077 | 14 122 |

Chênh lệch giữa hai phạm vi **không hề nhỏ**: với bài Stress, p95 steady-state (6 244 ms) **cao hơn 73 %** so với p95 toàn file (3 603 ms). Đây chính là lý do skill bắt buộc đối chiếu SLA bằng số liệu steady-state.

### 1.2 Theo từng endpoint

**Load — steady-state** (n = 6 272, 244 s):

| Endpoint                     | n     | p50 | p95     | p99 | Nhóm                              |
| ---------------------------- | ----- | --- | ------- | --- | --------------------------------- |
| `PUT /api/orders/:id/cancel` | 1 042 | 26  | **203** | 506 | transactional (ghi DB)            |
| `POST /api/checkout`         | 1 045 | 25  | **149** | 497 | transactional (ghi DB)            |
| `GET /api/products/:id`      | 1 049 | 5   | 102     | 320 | read-heavy                        |
| `GET /api/categories`        | 1 047 | 5   | 99      | 395 | read-heavy                        |
| `POST /api/login`            | 1 047 | 6   | 64      | 181 | auth-heavy                        |
| `POST /api/cart`             | 1 042 | 3   | **12**  | 86  | transactional (**không chạm DB**) |

**Stress — toàn file** (n = 39 658):

| Endpoint                     | n     | mean    | p50 | p95       | p99   | Err % |
| ---------------------------- | ----- | ------- | --- | --------- | ----- | ----- |
| `PUT /api/orders/:id/cancel` | 6 528 | 1 418,7 | 224 | **5 929** | 8 058 | 0,84  |
| `POST /api/login`            | 6 869 | 778,9   | 86  | 3 731     | 6 399 | 0,15  |
| `POST /api/checkout`         | 6 539 | 749,8   | 103 | 3 510     | 5 020 | 0,35  |
| `GET /api/categories`        | 6 629 | 324,9   | 21  | 2 098     | 3 829 | 0,03  |
| `GET /api/products/:id`      | 6 553 | 180,1   | 11  | 1 046     | 2 726 | 0,00  |
| `POST /api/cart`             | 6 540 | 158,6   | 5   | **849**   | 1 559 | 0,24  |

**Spike — toàn file** (n = 16 427):

| Endpoint                     | n     | mean    | p50   | p95    | Err %     |
| ---------------------------- | ----- | ------- | ----- | ------ | --------- |
| `POST /api/login`            | 2 954 | 2 668,6 | 779   | 10 011 | **26,44** |
| `GET /api/categories`        | 2 910 | 2 202,7 | 745   | 10 009 | 25,57     |
| `GET /api/products/:id`      | 2 835 | 1 958,7 | 743   | 5 114  | 22,29     |
| `POST /api/cart`             | 2 690 | 1 549,8 | 249   | 5 480  | 22,12     |
| `POST /api/checkout`         | 2 555 | 1 496,7 | 558   | 5 006  | 18,40     |
| `PUT /api/orders/:id/cancel` | 2 483 | 1 817,3 | 1 021 | 5 006  | 17,00     |

Trật tự ở Load rất đáng chú ý: **`POST /api/cart` (p95 = 12 ms) nhanh hơn 12–17 lần so với hai endpoint ghi DB** (`checkout` 149 ms, `cancel` 203 ms). Đọc mã nguồn (`server.js:290-295`) xác nhận `POST /api/cart` chỉ `push` vào object `userCarts` trong RAM, **không chạm database**. Đây là bằng chứng nội tại mạnh nhất cho thấy chi phí chủ đạo nằm ở tầng ghi SQLite chứ không phải ở tầng HTTP/Express.

### 1.3 Xu hướng theo thời gian — throughput bão hoà ở đâu

**Stress, cửa sổ 60 s:**

| Cửa sổ    | Threads TB | RPS       | p50   | p95   | Err % |
| --------- | ---------- | --------- | ----- | ----- | ----- |
| 0–60 s    | 34         | 13,8      | 10    | 217   | 0,00  |
| 60–120 s  | 50         | 25,2      | 13    | 239   | 0,00  |
| 120–180 s | 50         | 25,5      | 11    | 206   | 0,00  |
| 180–240 s | 80         | 33,3      | 23    | 2 454 | 0,10  |
| 240–300 s | 100        | 49,8      | 17    | 450   | 0,00  |
| 300–360 s | 100        | 50,4      | 15    | 286   | 0,00  |
| 360–420 s | 156        | 76,6      | 21    | 363   | 0,00  |
| 420–480 s | 200        | **93,2**  | 76    | 992   | 0,00  |
| 480–540 s | 200        | 90,2      | 76    | 1 274 | 0,00  |
| 540–600 s | 313        | **104,8** | 400   | 3 647 | 0,05  |
| 600–660 s | 387        | **97,7**  | 1 648 | 6 514 | 1,69  |
| 660–720 s | 81         | 0,5       | 1 096 | 2 371 | 7,41  |

Đây là số liệu quan trọng nhất của cả bài. Quan hệ tải ↔ throughput:

- 50 → 100 thread (+100 %): throughput 25,5 → 50,4 RPS (**+98 %**) — tăng gần tuyến tính, hệ thống còn dư năng lực.
- 100 → 200 thread (+100 %): 50,4 → 93,2 RPS (**+85 %**) — bắt đầu mất tuyến tính.
- 200 → 313 thread (+56 %): 93,2 → 104,8 RPS (**+12 %**) — gần như không còn tăng.
- 313 → 387 thread (+24 %): 104,8 → 97,7 RPS (**−7 %**) — throughput **giảm**, p50 nhảy từ 400 ms lên 1 648 ms.

Throughput trần quan sát được ≈ **105 RPS**. Theo định nghĩa vận hành trong skill ("throughput ngừng tăng khi VU tiếp tục tăng = đã chạm bão hoà"), **điểm bão hoà nằm trong khoảng 200–300 VU**, không phải 400 VU.

**Spike, cửa sổ 30 s:**

| Cửa sổ   | Threads TB | RPS   | p50   | p95    | Err %     |
| -------- | ---------- | ----- | ----- | ------ | --------- |
| 0–30 s   | 39         | 103,5 | 225   | 626    | 0,00      |
| 30–60 s  | **500**    | 156,2 | 1 229 | 10 011 | **33,26** |
| 60–90 s  | 481        | 180,2 | 1 197 | 10 008 | **36,95** |
| 90–120 s | 95         | 107,6 | 269   | 717    | 2,69      |

Cửa sổ cuối cho thấy hệ thống **phục hồi nhanh và hoàn toàn**: khi tải rút về 95 thread, p95 quay lại 717 ms và error rate về 2,69 %. Không có dấu hiệu hỏng vĩnh viễn sau đỉnh tải.

### 1.4 Bằng chứng quyết định: cột `Connect` và trần timeout

| Kịch bản | Connect p50 | Connect p95  | Connect max | Sample chạm trần `response_timeout` 10 s | Sample có `Connect ≥ 5 s` |
| -------- | ----------- | ------------ | ----------- | ---------------------------------------- | ------------------------- |
| Load     | 0           | 0            | 26 ms       | 0 (0,0 %)                                | 0 (0,0 %)                 |
| Stress   | 0           | 0            | 264 ms      | 63 (0,2 %)                               | 0 (0,0 %)                 |
| Spike    | 0           | **5 005 ms** | 5 095 ms    | **934 (5,7 %)**                          | **2 585 (15,7 %)**        |

Ở bài Spike, **15,7 % số request tiêu tốn ≥ 5 giây chỉ để thiết lập kết nối TCP** — chạm đúng giá trị `connect_timeout = 5000 ms` mà chính test plan cấu hình. Trên localhost, thời gian này lẽ ra phải gần 0 (và đúng là bằng 0 ở bài Load). Nghĩa là **nút thắt của bài Spike nằm ở tầng thiết lập kết nối, không phải ở logic ứng dụng**.

---

## 2. Diễn giải

### 2.1 Hệ thống có đạt mục tiêu không

Đối chiếu với Performance Goal đã đặt trong `23127211_Workload_Model.md` (dùng số liệu **steady-state**):

| Chỉ số             | Mục tiêu     | Load             | Stress                  | Spike        |
| ------------------ | ------------ | ---------------- | ----------------------- | ------------ |
| p95 toàn workflow  | < 2 000 ms   | **112 ms** ✅    | 6 244 ms ❌             | 10 011 ms ❌ |
| p95 riêng Checkout | < 3 000 ms   | **149 ms** ✅    | 3 510 ms ❌ (toàn file) | 5 006 ms ❌  |
| Error rate         | < 1 % (Load) | **0,000 %** ✅   | 1,288 % ❌              | 34,977 % ❌  |
| Throughput         | ≥ 15 RPS     | **25,74 RPS** ✅ | —                       | —            |

Ở mức tải thiết kế (50 VU), hệ thống **đạt toàn bộ mục tiêu với biên rất rộng** — p95 chỉ bằng 5,6 % ngưỡng. Stress và Spike vượt ngưỡng là điều **mong đợi**, vì mục đích của hai kịch bản đó là đẩy hệ thống qua giới hạn chứ không phải để pass.

### 2.2 Nút thắt quan sát được

**Nút thắt 1 — tầng ghi SQLite (chi phối ở tải trung bình).** Bằng chứng:

- Thứ tự p95 ở Load steady-state: hai endpoint ghi DB đứng đầu (`cancel` 203 ms, `checkout` 149 ms), endpoint thuần RAM đứng cuối (`cart` 12 ms).
- Xác minh mã nguồn: `PRAGMA journal_mode` của `backend/database.sqlite` trả về **`delete`** — chế độ rollback journal mặc định, trong đó **writer khoá toàn bộ database và chặn cả reader**.
- Ở Stress, endpoint `cancel` (SELECT + UPDATE) có p95 = 5 929 ms, cao nhất trong 6 endpoint, và chiếm 34/106 lỗi.

**Nút thắt 2 — tầng thiết lập kết nối (chi phối ở tải đột biến).** Bằng chứng: bảng 1.4 — `Connect` p95 = 5 005 ms và 15,7 % request chạm trần connect timeout, trong khi ở Load `Connect` = 0. Đây là nút thắt **khác hẳn** nút thắt 1 và không thể khắc phục bằng cách tối ưu database.

Hai nút thắt này xuất hiện ở hai chế độ tải khác nhau — trộn lẫn chúng sẽ dẫn tới đề xuất tối ưu sai chỗ.

### 2.3 Threshold đề xuất

Lấy p95 đo được ở **Load steady-state** làm cơ sở, cộng biên an toàn 50 %:

| Endpoint                     | p95 đo được | Threshold đề xuất                    | Cơ sở            |
| ---------------------------- | ----------- | ------------------------------------ | ---------------- |
| `POST /api/cart`             | 12 ms       | **p95 < 20 ms**                      | Suy ra từ đo đạc |
| `POST /api/login`            | 64 ms       | **p95 < 100 ms**                     | Suy ra từ đo đạc |
| `GET /api/categories`        | 99 ms       | **p95 < 150 ms**                     | Suy ra từ đo đạc |
| `GET /api/products/:id`      | 102 ms      | **p95 < 160 ms**                     | Suy ra từ đo đạc |
| `POST /api/checkout`         | 149 ms      | **p95 < 230 ms**                     | Suy ra từ đo đạc |
| `PUT /api/orders/:id/cancel` | 203 ms      | **p95 < 310 ms**                     | Suy ra từ đo đạc |
| Toàn workflow                | 112 ms      | **p95 < 170 ms**, error rate < 0,5 % | Suy ra từ đo đạc |

Toàn bộ đều là **threshold suy ra từ đo đạc trên phần cứng này**, không phải yêu cầu nghiệp vụ áp từ ngoài. Ngưỡng 2 000 ms ban đầu trong Workload Model quá lỏng đến mức vô dụng làm quality gate: hệ thống có thể chậm đi **17 lần** mà vẫn "pass".

### 2.4 Endurance threshold

Từ soak test 15 phút (k6, 50 VU) và bảng bão hoà 1.3:

- **Maximum stable RPS: ~25 RPS ở 50 VU** với error rate 0,12 % và p95 = 50,87 ms không tăng dần theo thời gian.
- **Trần throughput tuyệt đối: ~105 RPS** (đạt ở 313 VU), nhưng ở mức đó p95 = 3 647 ms — vượt xa ngưỡng dùng được. **Vùng vận hành an toàn khuyến nghị: ≤ 200 VU / ~90 RPS**, nơi p95 vẫn ≈ 1 000 ms và error rate = 0 %.
- **Memory ceiling: ~92 MB RSS**, ổn định, không tăng đơn điệu ⇒ không có dấu hiệu memory leak trong 15 phút.

---

## 3. Truy tìm chỗ AI đọc sai

Đối tượng rà soát: `23127211_Execution_Report.md` §2–§4 (bản phân tích do AI viết dựa trên dashboard + console summary, **không** tính lại từ raw log).

| #      | AI phát biểu                                                                                                                       | Giá trị đúng từ raw log                                                                                                                                                                                                                               | Sai ở đâu                                                                                                                                                                                                                        | Vì sao AI sai                                                                                                                                                                                                                                                                                                                                                                       |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **M1** | Trình bày `.jtl` như "raw log" và trong tóm tắt phiên làm việc nói file Load có "13 983 dòng" như thể đó là quy mô dữ liệu request | File có 13 982 data row nhưng **chỉ 6 966 là HTTP request thật**; 7 016 row còn lại là Transaction Controller trùng lặp + 50 artifact                                                                                                                 | Không phân biệt hai loại row. Đọc thô file này cho throughput **46,62 RPS** thay vì 23,24 RPS — sai đúng 2 lần                                                                                                                   | AI lấy số sample từ dashboard (đúng) nhưng chưa bao giờ mở raw log ra đếm, nên không biết vì sao hai con số vênh nhau. Đây là kiểu lỗi "đúng kết quả nhưng sai phương pháp" — lần sau đổi cấu hình test plan là sai luôn                                                                                                                                                            |
| **M2** | "Stress: p50 = 239, p90 = 3541, **p95 = 4699**, p99 = 7347" (trích `statistics.json`)                                              | Trên đúng tập 39 658 sample đó: **p50 = 39, p90 = 2170, p95 = 3603, p99 = 6269**                                                                                                                                                                      | Dashboard **phóng đại p95 lên 30 %** và p50 lên **6 lần**. **Nguyên nhân đã truy ra chính xác** (xem khung bên dưới bảng): HTML dashboard chỉ tính percentile trên **20 000 sample cuối cùng**, không phải toàn bộ 39 658 sample | AI mặc định coi HTML dashboard là nguồn sự thật, trong khi dashboard và raw log **không trả lời cùng một câu hỏi**. Nguy hiểm ở chỗ sai lệch này **im lặng và không đều**: dashboard của Load (6 966 sample) và Spike (16 427 sample) khớp chính xác với raw log, chỉ file Stress vượt ngưỡng 20 000 mới lệch — nên nếu chỉ đối chiếu một file thì sẽ kết luận "dashboard đáng tin" |
| **M3** | Mọi percentile báo cáo đều là số **toàn file**; không nhắc tới steady-state                                                        | Load: p95 toàn file 129 vs steady 112. **Stress: 3 603 vs 6 244 (+73 %)**. Spike: 22,18 % vs **34,98 %** error rate                                                                                                                                   | Trộn lẫn ramp-up/ramp-down vào số liệu SLA. Với Stress, AI báo hệ thống **tốt hơn thực tế rất nhiều** ở đúng giai đoạn cần đánh giá                                                                                              | `.jtl` không có cột đánh dấu giai đoạn; phải suy ra từ diễn biến `allThreads`. AI tính trên toàn bộ tập dữ liệu được đưa mà không đặt câu hỏi tập đó có đồng nhất không                                                                                                                                                                                                             |
| **M4** | "Spike: error rate **22,18 %** … hệ thống **không chịu được** cú sốc tải đột ngột"                                                 | 3 644 lỗi, trong đó **3 466 (95,1 %) là lỗi client-side** (`Non HTTP response code: ConnectTimeoutException / SocketException`). Chỉ **178 (4,9 %)** là phản hồi HTTP thật từ backend (171 × 403, 7 × 404). Stress: 69/106 (65 %) cũng là client-side | Quy kết toàn bộ error rate cho backend, trong khi phần lớn là **JMeter không mở nổi kết nối TCP**. Kết luận "backend gãy" không được dữ liệu ủng hộ ở mức đó                                                                     | Cột `responseCode` với lỗi client-side vẫn hiển thị như một mã lỗi, rất dễ bị đếm gộp. AI không phân rã lỗi theo loại trước khi kết luận (đúng pattern C4 + C3 trong `misinterpretation-patterns.md`)                                                                                                                                                                               |
| **M5** | "Spike: **p95 = 10 008 ms**", "max 14 122 ms" trình bày như thời gian phản hồi đo được của server                                  | **934 sample (5,7 %) chạm đúng trần `response_timeout = 10 000 ms`** và **2 585 (15,7 %) có `Connect ≥ 5 000 ms`** = trần `connect_timeout` — cả hai đều là **tham số do chính test plan đặt ra**                                                     | Đây là dữ liệu **bị kiểm duyệt phải (right-censored)**: p95/p99 của Spike phản ánh cấu hình timeout của công cụ đo, **không phải** năng lực thật của server. Thời gian phản hồi thật của nhóm request đó là **không biết được**  | AI đọc cột `elapsed` như một phép đo thuần tuý, không đối chiếu với chính cấu hình timeout mà nó đã sinh ra ở Task 1                                                                                                                                                                                                                                                                |
| **M6** | "Điểm gãy rõ ràng ở **bậc 400 VU**"                                                                                                | Throughput: 50 VU → 25,5 RPS; 100 → 50,4; 200 → 93,2; **313 → 104,8 (+12 % dù tải +56 %)**; 387 → **97,7 (giảm 7 %)**. Trần ≈ 105 RPS                                                                                                                 | Nhầm **"nơi lỗi bắt đầu hiện ra"** với **"nơi hệ thống hết khả năng mở rộng"**. Bão hoà thật bắt đầu ở **200–300 VU**; đến 400 VU thì hệ thống đã quá tải từ lâu                                                                 | AI đọc error rate theo mốc thời gian trên console summary thay vì dựng quan hệ tải ↔ throughput. Lỗi này khiến khuyến nghị vận hành lệch **gấp đôi** (400 vs 200 VU)                                                                                                                                                                                                                |
| **M7** | "Spike: throughput **136,67 req/s**" trình bày như năng lực xử lý                                                                  | 137,4 RPS **thô** nhưng chỉ **106,9 RPS thành công** (12 783/16 427)                                                                                                                                                                                  | Tính cả request lỗi vào throughput ⇒ **thổi phồng năng lực 29 %**. Một request timeout không phải là "công việc đã xử lý"                                                                                                        | JMeter báo throughput gộp; AI chép lại mà không lọc theo cột `success`                                                                                                                                                                                                                                                                                                              |
| **M8** | Dùng dashboard làm "3 report view", ngầm định số liệu theo endpoint là đọc được                                                    | Bước Cancel bị **nổ cardinality**: 1 131 label riêng (Load), 6 508 (Stress), 2 067 (Spike), **mỗi label đúng 1 sample** ⇒ mọi percentile của bước Cancel trên dashboard đều tính trên 1 mẫu                                                           | Bảng Statistics của dashboard bị rác hoá bởi hàng nghìn dòng vô nghĩa; không thể đọc được hiệu năng của bước Cancel nếu không tự gom label ở tầng phân tích                                                                      | Tên sampler chứa biến runtime `${order_id}`. Lỗi này **đã tồn tại từ Task 1** và không bị bắt trong Review Notes vì lúc đó chưa ai mở dashboard ra xem                                                                                                                                                                                                                              |

### M2 — truy ra nguyên nhân gốc: `jmeter.reportgenerator.statistic_window = 20000`

Bản đầu của báo cáo này ghi "chưa xác định được nguyên nhân". Khi kiểm tra lại độc lập đã tìm ra, và kết luận sai đó đã được sửa.

JMeter tự ghi tham số này trong `bin/user.properties` (dòng 78–80, để mặc định vì bị comment):

```properties
# Sets the size of the sliding window used by percentile evaluation.
# Caution : higher value provides a better accuracy but needs more memory.
#jmeter.reportgenerator.statistic_window = 20000
```

Nghĩa là **HTML dashboard chỉ tính percentile trên 20 000 sample gần nhất**. Kiểm chứng: lấy đúng 20 000 sample cuối của file Stress rồi tính nội suy tuyến tính (thuật toán của Commons Math mà JMeter dùng):

|                                 | p50    | p95          | p99      |
| ------------------------------- | ------ | ------------ | -------- |
| `statistics.json` của dashboard | 239,00 | **4 698,95** | 7 346,96 |
| 20 000 sample cuối + nội suy    | 239,00 | **4 698,95** | 7 346,96 |

Khớp **tuyệt đối đến 2 chữ số thập phân**. Quy luật giải thích trọn vẹn cả 3 file:

| File   | Số sample | So với 20 000   | Dashboard vs raw log |
| ------ | --------- | --------------- | -------------------- |
| Load   | 6 966     | dưới ngưỡng     | **khớp chính xác**   |
| Spike  | 16 427    | dưới ngưỡng     | **khớp chính xác**   |
| Stress | 39 658    | **vượt ngưỡng** | **lệch** (p95 +30 %) |

**Hệ quả rất quan trọng với kiểm thử hiệu năng nói chung:** với một bài Stress test tăng tải theo bậc thang, 20 000 sample cuối rơi đúng vào **giai đoạn tải cao nhất**. Dashboard vì thế cho ra percentile **bi quan có hệ thống** và không đại diện cho toàn bài đo — nhưng lại **không** cảnh báo gì trên giao diện. Bài test nào càng dài, càng nhiều sample thì sai lệch càng lớn.

**Cách xử lý đúng:** hoặc tính percentile từ raw `.jtl` (như báo cáo này làm), hoặc nâng `jmeter.reportgenerator.statistic_window` lên lớn hơn tổng số sample rồi sinh lại report bằng `jmeter -g <file>.jtl -o <thư mục>`.

**Không tìm thấy chỗ sai ở:** số sample tổng (6 966 / 39 658 / 16 427 — khớp tuyệt đối với raw log), giá trị `mean` của cả 3 file, và kết luận về memory ceiling (~92 MB, không leak) — kết luận này dựa trên soak test 15 phút, tức là **đủ dài** để phát biểu theo tiêu chuẩn B4 trong `misinterpretation-patterns.md`.

**Tổng kết mức nghiêm trọng:**

- **Đảo ngược kết luận:** M6 (khuyến nghị vận hành sai gấp đôi), M4 (chẩn đoán nhầm tầng gây lỗi).
- **Sai số lượng lớn:** M2 (p95 +30 %), M3 (p95 Stress −42 % so với thực tế ở steady-state), M7 (+29 % throughput).
- **Sai bản chất phép đo:** M5 (dữ liệu bị censored), M1 (đơn vị dữ liệu).
- **Che khuất thông tin:** M8.

---

## 4. Phân loại đề xuất tối ưu: khả thi hay ảo tưởng

Các đề xuất dưới đây do AI đưa ra (bao gồm cả 3 đề xuất mà đề bài gợi ý sẵn: thêm index, connection pool, bật SQLite WAL). Verdict dựa trên bằng chứng trong log **và** kiểm tra trực tiếp mã nguồn/cấu hình thật.

| #   | Đề xuất                                                 | Verdict                                                                  | Bằng chứng                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Cách kiểm chứng                                                                                                                                                                                                                                                                                                   |
| --- | ------------------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Bật SQLite WAL mode**                                 | ✅ **Khả thi**                                                           | Đã xác minh `PRAGMA journal_mode` = **`delete`** (rollback journal — writer khoá toàn DB, chặn cả reader). Log ủng hộ: ở Load steady-state, hai endpoint **ghi DB** chậm nhất (`cancel` p95 = 203 ms, `checkout` 149 ms) trong khi endpoint **thuần RAM không chạm DB** (`cart`, xác minh `server.js:290-295`) chỉ 12 ms — chênh 12–17 lần. Ở Stress, `cancel` giữ p95 cao nhất (5 929 ms)                                                                                | `PRAGMA journal_mode=WAL;` rồi chạy lại soak test, so p95 riêng của `checkout` + `cancel`. **Giới hạn phải nêu:** WAL vẫn chỉ cho phép **một** writer tại một thời điểm, nên sẽ giúp nhiều cho cặp đọc-ghi tranh chấp nhưng ít cho ghi đồng thời thuần tuý; và **không giúp gì** cho nút thắt kết nối ở bài Spike |
| 2   | **Thêm index cho `products.name`**                      | ❌ **Ảo tưởng trong ngữ cảnh này**                                       | Bảng `products` có **đúng 5 bản ghi** (đếm trực tiếp trong DB). SQLite quét tuần tự 5 dòng nhanh hơn đi qua B-tree index. Hơn nữa workflow "Khách mới — mua rồi đổi ý" **không gọi endpoint search** lần nào, nên log không có một mẫu dữ liệu nào để chứng minh                                                                                                                                                                                                          | `EXPLAIN QUERY PLAN` trên truy vấn search; nhưng trước đó phải seed bảng products lên hàng chục nghìn dòng thì câu hỏi mới có nghĩa                                                                                                                                                                               |
| 3   | **Thêm index cho `orders.user_id`**                     | ⚠️ **Khả thi nhưng chưa có căn cứ**                                      | Đúng là bảng `orders` hiện có **24 692 dòng** và **không có index nào do người dùng tạo** (chỉ có `sqlite_autoindex_coupons_1` sinh từ ràng buộc UNIQUE). Endpoint `GET /api/orders/my-orders` (`WHERE user_id = ? ORDER BY id DESC`) sẽ quét toàn bảng. **Nhưng** workflow này không gọi endpoint đó; còn `PUT /api/orders/:id/cancel` tra theo `id` là `INTEGER PRIMARY KEY` (rowid) nên **đã được lập chỉ mục sẵn**                                                    | Bổ sung `GET /api/orders/my-orders` vào một test plan riêng rồi đo lại; hoặc bật slow query log để xác nhận truy vấn nào thực sự chậm                                                                                                                                                                             |
| 4   | **Thêm connection pool cho database**                   | ❌ **Ảo tưởng trong ngữ cảnh này**                                       | Backend dùng **SQLite truy cập file cục bộ** (`database.js:4-5`, một đối tượng `Database` duy nhất), không phải DB client-server — khái niệm pool kết nối không áp dụng trực tiếp. Tệ hơn: mở nhiều handle ghi song song vào cùng file ở chế độ `delete` journal sẽ **làm tranh chấp khoá nặng hơn**. Log cũng không ủng hộ: cột `Connect` (tầng HTTP) = 0 ms ở Load và Stress                                                                                            | Đọc cấu hình driver hiện tại; nếu sau này đổi sang PostgreSQL/MySQL thì đề xuất này mới trở nên có nghĩa                                                                                                                                                                                                          |
| 5   | **Bật nén response (gzip)**                             | ❌ **Ảo tưởng**                                                          | Ở Load, `Latency` (TTFB) ≈ `elapsed`: mean 33,8 vs 33,8 ms, p95 129 vs 129 ms ⇒ **thời gian truyền nội dung ≈ 0**. Test chạy trên localhost, payload là JSON nhỏ. Nén chỉ thêm chi phí CPU mà không tiết kiệm được gì                                                                                                                                                                                                                                                     | Đo `elapsed − Latency` trước/sau; nhưng với chênh lệch bằng 0 thì không có gì để tối ưu                                                                                                                                                                                                                           |
| 6   | **Bật HTTP keep-alive**                                 | ⚪ **Không áp dụng — đã bật sẵn**                                        | Test plan đã đặt `use_keepalive = true`, và log xác nhận có hiệu lực: `Connect` p50 = 0 ms, mean = 0,0 ms ở bài Load ⇒ kết nối đang được tái sử dụng                                                                                                                                                                                                                                                                                                                      | Không cần — đề xuất này đã là hiện trạng                                                                                                                                                                                                                                                                          |
| 7   | **Tăng listen backlog / tối ưu tầng chấp nhận kết nối** | ✅ **Khả thi — và là đề xuất duy nhất nhắm đúng nút thắt của bài Spike** | Bằng chứng trực tiếp: ở Spike, `Connect` p95 = **5 005 ms** và **2 585 request (15,7 %)** chạm trần connect timeout 5 s, trong khi cùng chỉ số này = 0 ms ở bài Load. 95,1 % lỗi của Spike là lỗi **thiết lập kết nối** phía client. `app.listen(PORT)` trong `server.js:570` không truyền tham số `backlog` nên dùng mặc định                                                                                                                                            | Đặt `app.listen(PORT, backlog)` với giá trị lớn hơn; theo dõi hàng đợi accept bằng `ss -lnt` (cột `Recv-Q` trên cổng 3000) trong lúc chạy lại Spike; so tỷ lệ request có `Connect ≥ 5 s`                                                                                                                          |
| 8   | **Chạy Node ở cluster mode / tăng số worker**           | ⚠️ **Khả thi nhưng chưa có căn cứ — và có rủi ro**                       | Backend đúng là chạy **đơn tiến trình** trên máy 8 nhân. Nhưng dữ liệu CPU trong lúc chạy Stress/Spike **không dùng được** (script giám sát bắt nhầm PID — xem `23127211_Review_Notes.md` #9), nên **không chứng minh được** CPU một nhân đã bão hoà hay chưa. Rủi ro: nhiều tiến trình cùng ghi một file SQLite ở chế độ `delete` journal sẽ **làm tranh chấp khoá tệ hơn**; ngoài ra giỏ hàng `userCarts` là biến in-memory nên **sẽ vỡ hoàn toàn** khi có nhiều worker | Sửa script giám sát rồi đo lại CPU **từng nhân** ở mức 200–300 VU. Nếu chỉ 1 nhân bận trong khi 7 nhân rảnh thì đề xuất mới có căn cứ — và khi đó vẫn phải chuyển `userCarts` ra store dùng chung trước                                                                                                           |
| 9   | **Thêm Redis cache cho endpoint đọc**                   | ⚠️ **Khả thi nhưng chưa có căn cứ**                                      | Test chỉ dùng **5 product ID** (bằng đúng số bản ghi trong bảng) ⇒ tỷ lệ cache hit đo được sẽ gần 100 % một cách **giả tạo**, không tái hiện ở môi trường thật. Ngoài ra hai endpoint đọc không phải nhóm chậm nhất (p95 = 99–102 ms, so với 149–203 ms của nhóm ghi)                                                                                                                                                                                                     | Mở rộng `products.csv` và bảng products lên quy mô thật, đo lại phân bố truy cập trước khi quyết định                                                                                                                                                                                                             |
| 10  | **Nâng cấp phần cứng / scale out**                      | ⚠️ **Chưa có căn cứ**                                                    | Đúng về nguyên tắc nhưng né tránh câu hỏi thật là nút thắt kiến trúc nằm ở đâu. Với SQLite file cục bộ + `userCarts` in-memory, kiến trúc hiện tại **không scale ngang được** dù thêm bao nhiêu máy                                                                                                                                                                                                                                                                       | Chạy cùng test plan trên hai cấu hình phần cứng khác nhau và so throughput trần; nếu tài nguyên gấp đôi mà throughput chỉ nhích vài % thì nút thắt là kiến trúc                                                                                                                                                   |

**Thứ tự ưu tiên đề xuất (dựa trên bằng chứng, không phải cảm tính):**

1. **#7 (listen backlog)** — nhắm đúng nguyên nhân của 95 % lỗi ở kịch bản tệ nhất, chi phí gần bằng 0.
2. **#1 (WAL)** — nhắm đúng nút thắt ở tải trung bình, một dòng lệnh, rủi ro thấp.
3. **#8 (cluster)** — chỉ sau khi sửa được công cụ đo CPU và giải quyết `userCarts`.

Ba đề xuất còn lại (#2, #4, #5) nên **bác bỏ thẳng**, vì chúng không giải quyết nút thắt nào đã quan sát được.

---

## 5. Giới hạn của kết luận

Những điều bộ log này **không** cho phép kết luận:

1. **Không có dữ liệu tầng database.** `.jtl` là log phía client, không chứa thời gian truy vấn SQL, số lần khoá, hay kế hoạch thực thi. Mọi nhận định về SQLite ở Mục 2.2 và verdict #1 là **suy luận từ tương quan** (endpoint ghi chậm hơn endpoint không chạm DB), không phải quan sát trực tiếp. Muốn khẳng định phải bật slow query log.
2. **Không có dữ liệu GC/heap của Node.js.** Không thể quy p99 cao cho GC pause.
3. **Dữ liệu CPU/RAM trong 3 lần chạy JMeter không dùng được** (script giám sát bắt nhầm PID — Review Notes #9). Vì vậy **không kiểm chứng được** giả thuyết quan trọng nhất: ở mức 400–500 VU, liệu chính JMeter (JVM, 500 thread) hay backend mới là bên cạn tài nguyên trước. Đây là lỗ hổng lớn nhất của bộ dữ liệu này.
4. **SUT và generator chạy chung một máy.** Mọi con số throughput là **giới hạn kết hợp** của cả hai tiến trình cộng tải nền của máy, không phải năng lực thuần của backend. Không được ngoại suy ra production.
5. **p95/p99 của bài Spike bị kiểm duyệt bởi timeout** (M5): 5,7 % sample chạm trần 10 s, 15,7 % chạm trần connect 5 s. Giá trị thật của nhóm này là **không biết được**, chỉ biết là "≥ trần".
6. **Bảng `orders` phình dần trong lúc đo.** Thứ tự chạy là Load → Stress → Spike, mỗi lần chạy để lại hàng nghìn đơn hàng (hiện 24 692 dòng). Ba kịch bản do đó **không bắt đầu từ cùng một trạng thái dữ liệu** — một biến gây nhiễu khi so sánh chéo, dù tác động có thể nhỏ vì `cancel` tra theo khoá chính.
7. **Chỉ có 1 tài khoản và 5 product ID.** Mọi VU dùng chung `test@eshop.com`, nên `userCarts` là **một mảng dùng chung** — không phản ánh hành vi nhiều người dùng độc lập; và độ phân tán dữ liệu quá hẹp để đánh giá cache (verdict #9).
8. **Không so trực tiếp được số của JMeter và k6.** `http_req_failed` của k6 chỉ dựa trên HTTP status, còn `success` của JMeter tính cả assertion — hai thang đo khác nhau (pattern C5). Chênh lệch error rate Spike (22,18 % JMeter vs 2,22 % k6) **phần lớn đến từ khác biệt thang đo và độ nặng của generator**, không phải bằng chứng cho thấy backend hành xử khác nhau giữa hai lần chạy.
9. **Không phân tích được file `.jtl` này bằng công cụ theo dòng** (`wc -l`, `awk`, `grep`, `cut`). Hai lý do độc lập nhau, phát hiện khi kiểm tra chéo lại chính báo cáo này:
   - Label `06 - Doi y, huy don [transactional]` **chứa dấu phẩy** ⇒ 1 150 row bị JMeter bọc trong dấu nháy kép, khiến `awk -F,` tách cột lệch và **xếp nhầm toàn bộ 1 150 row TC06 thành HTTP sampler**.
   - Các row lỗi chứa **ký tự xuống dòng** trong message ⇒ số dòng vật lý ≠ số row logic: Spike có **54 718 dòng vật lý nhưng chỉ 32 854 row** (lệch 66 %), Stress lệch 636 dòng, Load không lệch (vì 0 lỗi).

   Đây là lý do mọi số liệu trong báo cáo này đều tính bằng trình đọc CSV đúng chuẩn (module `csv` của Python). Lưu ý các công thức `awk` gợi ý trong `references/jtl-format.md` của skill **sẽ cho kết quả sai** trên bộ log này.

10. **Bất thường percentile dashboard (M2) đã truy ra nguyên nhân** (`statistic_window = 20000`) nên không còn là giới hạn — nhưng nó để lại một bài học cần nhớ: dashboard **không tự cảnh báo** khi đang cắt bớt dữ liệu, và sai lệch chỉ xuất hiện ở file vượt ngưỡng, nên **không thể tin tưởng dashboard chỉ vì đã đối chiếu đúng ở một file khác**.
