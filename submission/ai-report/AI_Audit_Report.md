# AI Audit Report — HW5 Performance Testing

> **Declaration:** I use AI tools for the following tasks.

---

### Entry 1

- **Tool:** Antigravity (Gemini / Claude Sonnet)
- **Date/time:** 2026-08-13 14:20
- **Task context:** Perf Scope Planning — phân tích API EShop và thiết kế luồng E2E kiểm thử hiệu năng
- **Prompt used (verbatim):**
  > tôi muốn test POST /api/login, GET /api/categories → GET /api/products?search= , POST /api/cart → POST /api/apply-coupon → POST /api/checkout → GET /api/orders/my-orders, bạn hãy sử dụng @perf-scope-planner phân tích xem các api này thuộc về phạm vi gì và luồng test như thế nào, chi tiết về các api nào trong @api_specification.md, lên kế hoạch để tôi có thể test được hiệu năng một cách phù hợp và chuẩn nhất, các api trên thành luồng E2E chi tiết cho việc test hiệu năng hệ thống.
- **AI output (faithful summary):**
  > AI đọc `api_specification.md` và SKILL `perf-scope-planner`, phân loại 7 endpoints vào 3 nhóm (auth-heavy / read-heavy / transactional), thiết kế luồng 7 bước E2E tuần tự với dependency tracking đầy đủ (biến truyền qua các bước), ghi chú edge cases gồm: account lockout, rate limiting, JWT expiry, stateful side effects từ checkout, coupon usage limit. Xuất ra file `submission/docs/performance_test_scope.md`.
- **What the student changed/kept from this output:** Giữ nguyên toàn bộ cấu trúc và nội dung scope document. Cần tự xác nhận lại response code thực tế của `POST /api/checkout` (spec ghi không rõ 200 hay 201) bằng Postman trước khi viết assertion trong JMeter.

---

### Entry 2

- **Tool:** Antigravity (Claude Sonnet)
- **Date/time:** 2026-08-13 14:45
- **Task context:** Perf Data Generation — Thiết kế và sinh dữ liệu test CSV theo skill `perf-data-generator`
- **Prompt used (verbatim):**
  > Sử dụng skill perf-data-generator để thiết kế và sinh dữ liệu test gồm các file users.csv và keywords.csv phục vụ cho luồng E2E tại performance_test_scope.md. Hãy lưu các file CSV này vào thư mục test-data. Đọc kĩ README.md để gen data sao cho phù hợp, các data này sẽ được sử dụng để insert vào db để sử dụng test hiệu năng.
- **AI output (faithful summary):**
  > AI phân tích README (lockout threshold = 3 lần sai, password policy, coupon constraints), tính toán sizing: 200 VU × 1.5x safety = 300 rows. Thiết kế `users.csv` với 7 cột (email, password, product_id, keyword, quantity, coupon_code, shipping_address) và phân phối coupon theo nhóm (SAVE10: rows 1-100, VIP100: 101-200, BIGBUY: 201-300). Sinh `keywords.csv` với 5 keywords khớp sản phẩm thực trong DB. Viết script `backend/seed_perf_users.js` insert thẳng vào SQLite, xuất lockout reset command.
- **What the student changed/kept from this output:** Quyết định tạo thêm một coupon kiểm thử chuyên dụng tên `PERFTEST` có thuộc tính `max_uses_per_user = 9999` (không giới hạn lượt sử dụng) và chèn thẳng vào database. Cập nhật script `seed_perf_users.js` để toàn bộ 300 tài khoản trong file `users.csv` sử dụng coupon này nhằm đảm bảo tính ổn định của luồng giao dịch khi test hiệu năng nhiều iterations. Sau đó, thay vì để script tự sinh file coupon, em đã điều chỉnh để tạo sẵn file `coupons.csv` thủ công trong thư mục `test-data/`, rồi di chuyển và cập nhật script thành `submission/tests/1-test-plans/checkout-with-coupon/seed_perf_users.js` để thực hiện việc đọc dữ liệu coupon từ file CSV có sẵn này và đồng bộ vào SQLite DB.

---

### Entry 3

- **Tool:** Antigravity (Gemini 2.5 Pro)
- **Date/time:** 2026-08-13 15:30
- **Task context:** JMeter Test Plan Generation — Thiết kế và sinh 3 file JMX (Load, Stress, Spike) cho luồng E2E Checkout with Coupon theo skill `perf-testplan-generator`
- **Prompt used (verbatim):**
  > Sử dụng skill perf-testplan-generator để thiết kế test plan sử dụng Jmeter, sử dụng data tại submission/tests/1-test-plans/checkout-with-coupon/test-data để thực hiện cho luồng performance_test_scope.md, viết vào trong submission/tests/1-test-plans/checkout-with-coupon và log lại trong submission/docs/ai-report/AI_Audit_Report.md
- **AI output (faithful summary):**
  > AI đọc JMeter XML reference, HW05 requirements, và perf-scope.md để thiết kế 3 JMX file:
  >
  > - **Load** (`23127115_Load_20260813.jmx`): 50 VUs, 120s ramp, 600s steady, think-time mean=2000ms±300ms, listener: View Results Tree → `results/load.jtl`.
  > - **Stress** (`23127115_Stress_20260813.jmx`): 200 VUs, 600s ramp, 1200s total, think-time mean=1000ms±200ms, listener: Aggregate Report → `results/stress.jtl`.
  > - **Spike** (`23127115_Spike_20260813.jmx`): 100 VUs, 10s ramp, 60s delay, 480s total, think-time mean=500ms±100ms, listener: Summary Report → `results/spike.jtl`.
  >   Mỗi JMX thực hiện đủ 7 bước: Login (auth-heavy) → Categories (read) → Products?search= (read) → Cart (transactional) → Apply-Coupon (transactional) → Checkout (transactional) → My-Orders (read). CSV `test-data/users.csv` được bind qua CSVDataSet với 7 biến. JSONPath extractors truyền `access_token`, `user_id`, `product_id_resp`, `product_price`, `product_name`, `final_amount`, `order_id` xuyên suốt workflow. Mỗi bước có ResponseAssertion (status code) và DurationAssertion riêng.
- **What the student changed/kept from this output:**
  - **Giữ lại:** Toàn bộ workflow 7 bước, CSVDataSet binding với 7 biến, chain extractor giữa các bước, 3 listener khác nhau cho Load / Stress / Spike, naming convention của 3 file JMX, và các ngưỡng duration assertion cơ bản theo nhóm endpoint.
  - **Sinh viên đã sửa trực tiếp từ output AI:**
    1. Đổi `POST /api/apply-coupon` từ `total_amount = ${product_price}` sang `total_amount = ${cart_total}` với `cart_total = product_price × quantity`, vì output AI chưa tính đúng tổng giỏ hàng.
    2. Đổi extractor của checkout từ `$.id` sang `$.orderId` để khớp backend thực tế tại `backend/server.js`.
    3. Bỏ các default fallback nguy hiểm của `access_token`, `user_id`, `product_id_resp`, `product_name`, `product_price`, `final_amount`, `order_id`, rồi thêm `JSR223 Assertion` để fail rõ khi extractor không lấy được giá trị thật.
    4. Chuyển stress plan từ một linear thread group 200 VU sang staged load độc lập hoàn toàn gồm 4 thread group: 50 VU từ phút 0, cộng thêm 50 VU ở phút 5, phút 10, và phút 15, để tạo tải cộng dồn 50 → 100 → 150 → 200 mà không phụ thuộc plugin hay module reuse.
  - **Các điểm vẫn cần xác minh thủ công trước khi chạy chính thức:** response shape của login (`$.token`, `$.user.id`), status code thực tế của checkout (200 hay 201), và payload cart `{id, name, price, quantity}` bằng Postman/curl hoặc đọc source backend.

---

### Entry 4

- **Tool:** Codex (GPT-5)
- **Date/time:** 2026-08-15 14:25
- **Task context:** Endurance / Soak Test Design — chuẩn bị bài kiểm thử soak ngắn để tìm ngưỡng chịu tải ổn định của phần cứng local
- **Prompt used (verbatim):**
  > ok vậy hãy thực hiện các file xây dựng đầy đủ và chi tiết một bài kiểm thử endurance/soak ngắn (khoảng 10–15 phút ở mức tải ổn định) để tìm ra bằng thực nghiệm ngưỡng chịu tải của phần cứng
- **AI output (faithful summary):**
  > AI đọc skill `perf-testplan-generator`, kế thừa workflow ổn định từ `23127115_Load_20260813.jmx`, rồi tạo mới file `submission/tests/1-test-plans/checkout-with-coupon/23127115_Soak_20260815.jmx` cho bài soak test parameterized. Plan mới giữ nguyên 7 bước E2E `login -> categories -> products -> cart -> apply-coupon -> checkout -> my-orders`, nhưng đổi profile sang soak ổn định: mặc định `100 VUs`, `180s ramp-up`, `720s (12 phút)` duration, `1500ms ± 200ms` think time, listener `Summary Report`, và cho phép override bằng `-Jusers`, `-Jrampup`, `-Jduration`, `-Jthink_mean`, `-Jthink_range`. AI đồng thời cập nhật `submission/tests/1-test-plans/checkout-with-coupon/README.md` để thêm kịch bản Soak, thêm các lệnh chạy threshold runs `100 / 130 / 150 VUs`, và mô tả cách xác định ngưỡng chịu tải ổn định từ error rate, p95, và late-run degradation trend. Ngoài ra, AI cập nhật `submission/tests/3-test-summary/checkout-with-coupon/test-summary.md` và `submission/tests/3-test-summary/checkout-with-coupon/traceability-matrix.md` để phản ánh rằng soak plan đã được chuẩn bị nhưng chưa chạy, đồng thời chuyển trạng thái resource screenshots từ missing sang present dựa trên các ảnh hiện được lưu theo từng thư mục scenario như `load/load-resource.png`, `stress/stress-resource.png`, và `spike/spike-resource.png`.
- **What the student changed/kept from this output:** Giữ nguyên soak plan parameterized, workflow 7 bước, cách dùng `-Jusers/-Jrampup/-Jduration`, và tiêu chí đánh giá ngưỡng ổn định theo `error rate`, `p95`, và late-run degradation trend. Từ output ban đầu, em đã đổi bộ threshold runs từ `100 / 130 / 150 VUs` sang `130 / 180 / 230 VUs` để tạo tải rõ hơn trên môi trường localhost, rồi chạy thật đủ cả 3 mức tải, chụp ảnh resource ở giữa/cuối mỗi run, sinh HTML report từ từng `.jtl`, dời ảnh minh chứng vào đúng thư mục `load/`, `stress/`, `spike/`, `soak/`, `hardware/`, và cập nhật lại README / setup / summary / traceability theo kết quả cuối. Kết luận thực nghiệm được chốt là `180 VUs` là ngưỡng ổn định bảo thủ, còn `230 VUs` vẫn `0%` lỗi nhưng là mức đầu tiên cho thấy tail latency tăng rõ rệt.

---

### Entry 5

- **Tool:** Codex (GPT-5)
- **Date/time:** 2026-08-15 23:34
- **Task context:** Task 2 — phân tích raw JTL, đề xuất ngưỡng hiệu năng, và phản biện diễn giải AI/dashboard
- **Prompt used (verbatim):**
  > sử dụng skills 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW5/hcmus-sw-testing--eshop-sut/.agents/skills/perf-jtl-analyzer', phân tích các log `.jtl` trong 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW5/hcmus-sw-testing--eshop-sut/submission/tests/2-test-runs/checkout-with-coupon' và đề xuất các ngưỡng hiệu năng, sử dụng 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW5/hcmus-sw-testing--eshop-sut/.agents/skills/ai-audit-report' để ghi lại trong 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW5/hcmus-sw-testing--eshop-sut/submission/docs/ai-report/AI_Audit_Report.md', xem xét thật kĩ và toàn diện, có sự phản biện
- **AI output (faithful summary):**
  > AI đọc skill `perf-jtl-analyzer` và `ai-audit-report`, phân tích 6 file JTL chính thức gồm Load, Stress, Spike, và Soak `130/180/230 VUs`. AI tính metric ground-truth từ raw `.jtl` theo cột `elapsed`, `success`, và `timeStamp`, tạo file `submission/docs/test-report/task2-jtl-analysis.md` với bảng metric, đề xuất ngưỡng hiệu năng, misinterpretation hunt, và bảng phân loại optimization recommendation theo stack Node.js/Express/SQLite.
- **What the student changed/kept from this output:** Giữ lại cách tính metric từ raw `.jtl` thay vì chỉ dựa vào HTML dashboard. Cần tự review lại các threshold đề xuất trước khi đưa vào báo cáo chính, đặc biệt là quyết định dùng `180 VUs` làm ngưỡng ổn định bảo thủ và xem `230 VUs` là upper-bound/cảnh báo thay vì failure point.

### Entry 6

- **Tool:** Codex (GPT-5)
- **Date/time:** 2026-08-16 18:34
- **Task context:** Task 2 - phản biện phân tích AI bằng raw JTL
- **Prompt used (verbatim):**
  > hãy đọc báo cáo này 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW5/hcmus-sw-testing--eshop-sut/submission/docs/test-report/task2-jtl-analysis.md' dựa trên 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW5/hcmus-sw-testing--eshop-sut/submission/tests', xem xét một cách phê phán phân tích của AI và xác định những chỗ AI hiểu sai hoặc đọc sai các chỉ số. Với mỗi lỗi hiểu sai, hãy trích dẫn giá trị đúng từ log `.jtl` thô của bạn và giải thích lỗi đó. Viết cái đó vào trong 1 file md để ở 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW5/hcmus-sw-testing--eshop-sut/submission/docs/ai-report'
- **AI output (faithful summary):** Đọc báo cáo Task 2, tính lại percentile/error/throughput từ sáu raw JTL, kiểm tra failure row và minute-window, sau đó tạo `submission/docs/ai-report/ai-critique.md` với các lỗi diễn giải và giá trị raw đúng.
- **What the student changed/kept from this output:** Giữ các metric tổng thể đã khớp raw; sửa cách diễn giải Spike, Stress degradation, loại failure và throughput Soak sau khi đối chiếu trực tiếp với JTL.

### Entry 7

- **Tool:** Codex (GPT-5)
- **Date/time:** 2026-08-16 19:10
- **Task context:** Task 2 - viết lại báo cáo JTL theo human review
- **Prompt used (verbatim):**
  > vậy với những nhận xét thì hãy viết lại 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW5/hcmus-sw-testing--eshop-sut/submission/docs/test-report/task2-jtl-analysis.md' dựa trên những đánh giá 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW5/hcmus-sw-testing--eshop-sut/submission/docs/test-report/task2-human-review.md', viết lại thật chi tiết và toàn diện, đầy đủ
- **AI output (faithful summary):** Viết lại toàn bộ `task2-jtl-analysis.md` với mục lục, phương pháp, metric tổng thể, metric theo sampler, phân loại failure, minute-window Stress/Spike/Soak, ngưỡng regression và đánh giá tối ưu hóa đã hiệu chỉnh.
- **What the student changed/kept from this output:** Giữ các số liệu raw đã kiểm chứng, sửa kết luận Spike/Stress/Soak theo human review và hạ mức chắc chắn của các nguyên nhân tối ưu hóa chưa được JTL chứng minh.

### Entry 8

- **Tool:** Codex (GPT-5)
- **Date/time:** 2026-08-16 19:13
- **Task context:** Task 2 - đề xuất phương án tối ưu hóa dựa trên raw JTL và code backend
- **Prompt used (verbatim):**
  > viết một file trong 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW5/hcmus-sw-testing--eshop-sut/submission/docs/test-report' đề xuất các phương án tối ưu hóa (ví dụ: thêm chỉ mục cơ sở dữ liệu, connection pool, hoặc bật SQLite WAL)
- **AI output (faithful summary):** Tạo `submission/docs/test-report/optimization-recommendations.md`. Báo cáo đối chiếu các hotspot trong raw JTL với schema/query hiện tại của backend, sau đó đề xuất index cho `users.email`, `orders(user_id, id DESC)`, `coupon_usage(coupon_id, user_id)`, và `coupons(code, is_active)`; thử nghiệm SQLite WAL cùng `busyTimeout`; dùng prepared statement/FTS5 cho tìm kiếm; transaction cho checkout/coupon usage; cache có kiểm soát; và migration sang PostgreSQL/MySQL nếu cần connection pool/horizontal scaling.
- **What the student changed/kept from this output:** Giữ các đề xuất có liên hệ trực tiếp với code và số liệu, nhưng ghi rõ đây là giả thuyết cần A/B benchmark. Không khẳng định index, WAL hoặc connection pool chắc chắn là nguyên nhân của failure; giữ các caveat về `database.js` đang drop/recreate table, về khả năng index duy nhất của `coupons.code`, và việc connection pool không phải giải pháp trực tiếp cho SQLite singleton hiện tại.

---

### Entry 9

- **Tool:** Codex (GPT-5)
- **Date/time:** 2026-08-16 19:45
- **Task context:** Task 2 - cập nhật đề xuất tối ưu hóa sau review và loại bỏ đề xuất ảo giác
- **Prompt used (verbatim):**
  > 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW5/hcmus-sw-testing--eshop-sut/submission/docs/test-report/optimization-recommendations.md' cập nhật lại nội dung dựa trên 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW5/hcmus-sw-testing--eshop-sut/submission/docs/ai-report/task2/optimization-recommendations-review.md', những cái ảo giác hãy loại bỏ đi, giữ lại những cái khả thi
- **AI output (faithful summary):** Đối chiếu review Task 2 với báo cáo đề xuất tối ưu hóa, giữ lại các đề xuất khả thi hoặc khả thi có điều kiện (index, WAL/busy timeout, parameterized query, transaction, projection/pagination, cache có kiểm soát, migration và connection pool sau migration). Loại khỏi phạm vi đề xuất trực tiếp các phương án không phù hợp với SUT hiện tại: nhiều connection/connection pool cho SQLite và horizontal scaling trực tiếp khi cart còn in-memory; JVM heap tuning không xuất hiện trong báo cáo gốc nên không được thêm vào.
- **What the student changed/kept from this output:** Cập nhật `submission/docs/test-report/optimization-recommendations.md` từ phiên bản 1.0 lên 1.1; xóa mục thí nghiệm nhiều connection/pool cho SQLite, xóa đề xuất horizontal scaling trực tiếp, giữ connection pool chỉ như lựa chọn sau migration sang PostgreSQL/MySQL, đồng thời chỉnh mục lục, lộ trình và kết luận cho nhất quán với review.

---

### Entry 10

- **Tool:** Codex (GPT-5)
- **Date/time:** 2026-08-16 21:07
- **Task context:** Task 3 - đề xuất mô hình kiểm thử hiệu năng liên tục và regression gate p95
- **Prompt used (verbatim):**
  > hãy đề xuất một mô hình kiểm thử hiệu năng liên tục theo dõi các commit của SUT, quyết định khi nào nên chạy kiểm thử hiệu năng, và gắn cờ các trường hợp hồi quy (regression) p95. Bao gồm một sơ đồ luồng (flow chart) và phần thảo luận về các đánh đổi (trade-offs) (chi phí, cảnh báo giả), viết các đề xuất và sơ đồ vào các file md để trong 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW5/hcmus-sw-testing--eshop-sut/submission/docs/test-report', log lại trong 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW5/hcmus-sw-testing--eshop-sut/submission/docs/ai-report/AI_Audit_Report.md'
- **AI output (faithful summary):**
  > AI tạo `submission/docs/test-report/continuous-performance-testing.md` và `continuous-performance-flowchart.md`. Đề xuất pipeline theo dõi commit/PR/merge/schedule/release, phân loại thay đổi bằng path và rủi ro, chạy PR smoke, Load gate, weekly Soak 180 VU hoặc full release suite. Regression p95 được so với rolling median của 5 run PASS cùng môi trường và ngưỡng tuyệt đối đã kiểm chứng; tín hiệu warning được chạy lại hai lần và chỉ fail khi lặp lại ít nhất 2/3. Tài liệu bao gồm artifact/metadata cần lưu, cách xử lý run invalid, Mermaid flow chart, biện pháp giảm cảnh báo giả, phân tích chi phí và lộ trình bật gate theo giai đoạn.
- **What the student changed/kept from this output:** Giữ mô hình phân tầng theo rủi ro, baseline median 5 run PASS, điều kiện kép phần trăm + millisecond và cơ chế xác nhận 2/3. Sau self-review, em cập nhật bản Task 3 lên v1.3: bổ sung rolling + golden baseline, baseline key gồm scenario/sampler/JMX hash/dataset hash/backend config/runtime/runner, minimum sample rule, cancel stale job, serialized runner, hard/advisory gate mode, trusted-source guard cho self-hosted runner, và chuyển Stress/Spike sang advisory cho đến khi có đủ lịch sử clean run. Em cũng thêm kết luận Task 3 vào `submission/tests/3-test-summary/checkout-with-coupon/test-summary.md` để nối trực tiếp yêu cầu "trong phần kết luận" với các file đề xuất/flow chart/blueprint. Các con số được giữ như ngưỡng đề xuất cho môi trường kiểm thử hiện tại, không mô tả như pipeline đã triển khai thực tế.

---

### Entry 11

- **Tool:** Codex (GPT-5)
- **Date/time:** 2026-08-16 21:43
- **Task context:** Task 3 - bổ sung blueprint GitHub Actions, script và JMeter CLI
- **Prompt used (verbatim):**
  > trong task 3 có đề xuất sử dụng github action và các test script để chạy, chạy bằng cli jmeter các thứ, cập nhật thêm nếu chưa có trong nhiệm vụ 3 của 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW5/hcmus-sw-testing--eshop-sut/submission/docs/\_requirement/HW05_Performance_Testing_VI.md'
- **AI output (faithful summary):**
  > AI đối chiếu Task 3 với tài liệu hiện tại và xác định yêu cầu chỉ bắt buộc một mô hình đề xuất, nhưng bản 1.1 chưa nêu cách triển khai cụ thể. AI cập nhật `continuous-performance-testing.md` lên bản 1.2, tạo `continuous-performance-ci-blueprint.md`, và mở rộng flow chart với GitHub Actions, concurrency, script chuẩn bị SUT, JMeter CLI non-GUI, phân tích JTL, baseline gate và artifact. Blueprint có workflow YAML minh họa, lệnh `jmeter -n -t -l -j -e -o`, lựa chọn self-hosted runner và lưu ý PR smoke chưa thể dùng `-Jusers` với Load JMX đang hard-code.
- **What the student changed/kept from this output:** Giữ GitHub Actions làm orchestrator, các script dùng chung giữa local/CI và raw JTL từ `-l` làm nguồn canonical. Em mở rộng blueprint thành tài liệu triển khai đề xuất gồm workflow YAML minh họa, mapping event-to-profile, runner isolation, artifact retention, baseline persistence qua golden file và rolling artifact, wrapper rerun 2/3, lệnh JMeter CLI chuẩn `jmeter -n -t -l -j -e -o`, cùng bộ script Bash dự kiến (`classify-change.sh`, `prepare-sut.sh`, `run-jmeter.sh`, `analyze-jtl.sh`, `compare-baseline.sh`, `publish-summary.sh`, `stop-sut.sh`). Sau khi rà soát tính nhất quán, toàn bộ ví dụ thực thi dành cho sinh viên được chuẩn hóa sang Bash. Blueprint vẫn được ghi rõ là đề xuất chưa chạy thật; cần tạo Smoke JMX riêng hoặc parameterize Load JMX trước khi bật PR smoke để không mô tả sai khả năng của test plan hiện tại.
