# Đề xuất mô hình kiểm thử hiệu năng liên tục

| Thuộc tính           | Giá trị                                               |
| -------------------- | ----------------------------------------------------- |
| Phiên bản            | 1.3 — hoàn thiện blueprint và liên kết báo cáo tổng   |
| Trạng thái           | Đề xuất thiết kế; chưa phải pipeline CI đã triển khai |
| SUT                  | EShop backend API — Node.js/Express/SQLite            |
| Nguồn ngưỡng ban đầu | Raw JTL và `jtl-analysis.md` của Task 2               |

### Đối chiếu nhanh với yêu cầu Task 3

| Tiêu chí bắt buộc                        | Vị trí đáp ứng                                      |
| ---------------------------------------- | --------------------------------------------------- |
| Theo dõi commit của SUT                  | Mục 2, 3 và 5                                       |
| Quyết định khi nào chạy performance test | Ma trận trigger ở Mục 3                             |
| Gắn cờ regression p95                    | Baseline và thuật toán ở Mục 4                      |
| Có flow chart                            | `continuous-performance-flowchart.md`               |
| Thảo luận chi phí và cảnh báo giả        | Mục 6 và 7                                          |
| Cách triển khai bằng GitHub Actions/CLI  | Mục 2.1 và `continuous-performance-ci-blueprint.md` |
| Đặt đề xuất trong phần kết luận          | Mục 9                                               |

## 1. Mục tiêu và phạm vi

Mô hình này theo dõi các commit của EShop SUT, chọn mức kiểm thử tương ứng với rủi ro của thay đổi và gắn cờ hồi quy p95 trước khi thay đổi được phát hành. Phạm vi đo là luồng API E2E `login -> categories -> product search -> cart -> apply-coupon -> checkout -> my-orders`, dùng lại các JMeter plan và dữ liệu kiểm thử hiện có.

Các ngưỡng trong tài liệu là **regression reference cho môi trường kiểm thử cố định**, không phải SLO production. Kết quả chỉ được so sánh khi cùng JMeter plan, dữ liệu, cấu hình tải, phiên bản runtime và nhóm runner/phần cứng.

Sơ đồ quyết định đầy đủ được trình bày tại [continuous-performance-flowchart.md](./continuous-performance-flowchart.md).

## 2. Kiến trúc đề xuất

Pipeline đề xuất dùng **GitHub Actions** làm commit observer và orchestrator; các bước có trạng thái được đặt trong script Bash riêng để cùng một lệnh có thể chạy trên CI hoặc máy local. Pipeline gồm năm khối:

1. **Commit observer:** nhận sự kiện từ pull request, merge vào nhánh chính, lịch chạy định kỳ, release candidate hoặc yêu cầu chạy thủ công.
2. **Change classifier:** dùng `git diff` để phân loại commit theo đường dẫn và loại thay đổi.
3. **Test orchestrator:** chuẩn bị backend, seed dữ liệu, reset lockout/database state, warm-up và chạy đúng profile JMeter.
4. **JTL analyzer:** đọc trực tiếp `elapsed`, `success`, `timeStamp` và `label` từ raw JTL; tính error rate, throughput, p95/p99 tổng và p95 theo sampler.
5. **Regression gate:** so sánh candidate với baseline hợp lệ, áp dụng ngưỡng tuyệt đối, tự động chạy lại khi nghi ngờ nhiễu và công bố `PASS`, `WARNING`, `FAIL` hoặc `INVALID`.

Mỗi kết quả phải gắn với commit SHA và lưu raw JTL, báo cáo HTML, bảng metric máy đọc được, log backend, phiên bản Node/JMeter, cấu hình tải và định danh runner. Thiếu metadata hoặc setup thất bại phải trả về `INVALID`, không được kết luận là regression.

Nếu pull request có commit mới trong khi job cũ đang chờ hoặc đang chạy, pipeline hủy job của SHA cũ và chỉ đánh giá SHA mới nhất. Performance job không chạy song song trên cùng runner vì cạnh tranh CPU/I/O sẽ làm sai p95.

### 2.1. GitHub Actions, script và JMeter CLI

Blueprint triển khai cụ thể nằm tại [continuous-performance-ci-blueprint.md](./continuous-performance-ci-blueprint.md). Cấu trúc đề xuất gồm:

- `.github/workflows/performance.yml`: nhận `pull_request`, `push` vào `main`, `schedule` và `workflow_dispatch`; áp dụng path/risk classifier, `concurrency` và upload artifact kể cả khi gate thất bại.
- `scripts/perf/classify-change.sh`: đọc `git diff` và trả về `skip`, `smoke`, `load`, `soak` hoặc `release`.
- `scripts/perf/prepare-sut.sh`: cài dependency, seed/reset dữ liệu, khởi động backend và kiểm tra health/readiness ở cổng `3000`.
- `scripts/perf/restore-baseline.sh`: đọc golden baseline đã version hóa và tải rolling baseline từ lần chạy `main` PASS gần nhất có cùng baseline key.
- `scripts/perf/invoke-performance-gate.sh`: điều phối reset → run → analyze → compare; chỉ chạy attempt 2 và 3 khi attempt đầu là `WARNING`.
- `scripts/perf/run-jmeter.sh`: ánh xạ profile sang đúng JMX, chạy JMeter **non-GUI** bằng `jmeter -n -t ... -l ... -j ... -e -o ...`, và ghi metadata của run.
- `scripts/perf/analyze-jtl.sh`: đọc raw JTL để sinh `metrics.json` theo toàn run/sampler, gồm p95, p99, error rate, throughput và sample count.
- `scripts/perf/compare-baseline.sh`: áp dụng rolling/golden baseline và quy tắc ở Mục 4; exit code `0/2/3/4` lần lượt biểu diễn `PASS/WARNING/FAIL/INVALID`.
- `scripts/perf/publish-summary.sh`: ghi bảng kết quả vào GitHub Step Summary và tạo dữ liệu cho status check/PR comment.
- `scripts/perf/stop-sut.sh`: dừng backend trong bước cleanup chạy với `if: always()`.

JMeter CLI phải chạy từ repo root vì các JMX hiện dùng đường dẫn tương đối `test-data/users.csv`. Raw JTL chỉ do cờ `-l` sở hữu; listener trong JMX không được ghi thêm một raw file cạnh tranh. Mỗi run dùng thư mục duy nhất theo `${commit SHA}/${profile}/${attempt}` để `-o` luôn trỏ đến thư mục HTML chưa tồn tại.

PR smoke hiện **chưa có JMX tương ứng**: Load/Stress/Spike đang cố định thread và duration, còn chỉ Soak nhận `-Jusers`, `-Jrampup`, `-Jduration`. Trước khi bật workflow phải chọn một trong hai cách: tạo `23127115_Smoke_<date>.jmx` riêng từ cùng workflow E2E, hoặc parameterize Load JMX bằng `${__P(...)}`. Không được truyền `-Jusers=10` cho Load JMX hiện tại rồi giả định tải đã giảm.

Runner khuyến nghị là self-hosted cố định cho Load/Soak/Stress/Spike. GitHub-hosted runner chỉ phù hợp bootstrap/functional validation hoặc smoke ở chế độ quan sát vì phần cứng dùng chung có thể làm p95 dao động. Phiên bản Java, JMeter `5.6.3`, Node và dependency phải được pin; nếu tải JMeter trong job thì phải kiểm SHA-512, còn runner cố định nên dùng image đã chuẩn hóa.

Không chạy code từ fork pull request không tin cậy trên self-hosted runner. Các PR này chỉ được validate trên GitHub-hosted runner hoặc ghi `SKIPPED_SECURITY`; performance profile chỉ chạy sau khi maintainer đưa commit vào nhánh tin cậy hoặc kích hoạt thủ công. Không dùng `pull_request_target` để checkout rồi thực thi code từ PR.

## 3. Quyết định khi nào chạy

| Sự kiện hoặc loại thay đổi                           | Ví dụ trong SUT                                                                                                    | Hành động đề xuất                                                 | Mục đích                                                            |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- | ------------------------------------------------------------------- |
| Chỉ sửa tài liệu, ảnh hoặc test report               | `submission/docs/**`, `*.md`                                                                                       | Không chạy; ghi trạng thái `SKIPPED` và lý do                     | Tránh chi phí không tạo thêm tín hiệu                               |
| Chỉ sửa giao diện, không đổi API/backend             | `frontend-web/**`, `frontend-admin/**`                                                                             | Không chạy bộ API performance; vẫn chạy functional CI             | Nằm ngoài phạm vi đo backend API hiện tại                           |
| Thay đổi test harness hoặc dữ liệu performance       | JMX, CSV, seed script, parser hoặc threshold config                                                                | Validate plan; tạo phiên bản baseline mới trước khi so sánh       | Không so metric của hai phép đo khác định nghĩa                     |
| Thay đổi backend rủi ro thông thường                 | route/validation trong `backend/server.js`                                                                         | Chạy **PR smoke**                                                 | Phản hồi nhanh cho từng pull request                                |
| Thay đổi rủi ro cao                                  | `backend/database.js`, query, transaction, auth, cart, coupon, checkout, dependency/lockfile hoặc cấu hình runtime | PR smoke tăng cường; sau merge chạy **Load gate**                 | Các thay đổi này có thể ảnh hưởng trực tiếp latency hoặc contention |
| Merge vào nhánh chính có ảnh hưởng backend           | Bất kỳ thay đổi backend nào                                                                                        | Load gate trên runner chuẩn                                       | Bảo vệ baseline của nhánh chính                                     |
| Lịch chạy hằng đêm                                   | HEAD mới nhất của nhánh chính                                                                                      | Load gate, kể cả khi path filter bỏ qua                           | Phát hiện ảnh hưởng tích lũy và thay đổi môi trường                 |
| Lịch chạy hằng tuần                                  | Nhánh chính ổn định                                                                                                | Soak 180 VU trong 10–15 phút                                      | Kiểm tra stable baseline và late-run degradation                    |
| Release candidate hoặc chạy thủ công trước phát hành | Tag/nhánh release                                                                                                  | Load + Stress + Spike + Soak 180; Soak 230 là exploratory warning | Đánh giá toàn diện trước phát hành                                  |

### 3.1. Các profile theo tầng

- **PR smoke:** 10–20 VU, warm-up ngắn, đo 2–5 phút. Đây là một profile riêng và chỉ so với lịch sử PR smoke cùng cấu hình; không được lấy baseline Load/Soak để so trực tiếp. Trong giai đoạn chưa đủ 5 run PASS, smoke chỉ áp dụng error/absolute gate và phát cảnh báo p95 ở chế độ quan sát.
- **Load gate:** dùng profile Load 50 VU, ramp-up 120 giây, duration 600 giây đã chạy trong Task 1. Ngưỡng tổng ban đầu: error rate `<= 0.5%`, p95 `<= 100 ms`, p99 `<= 250 ms`, throughput `>= 4 rps`.
- **Weekly soak:** 180 VU, ramp-up 180 giây, tổng thời gian khoảng 12 phút. Ngưỡng tổng: error rate `<= 0.5%`, p95 `<= 50 ms`, p99 `<= 100 ms`, whole-run throughput `>= 100 rps`; đồng thời không được có xu hướng p95 tăng liên tục ở các cửa sổ cuối run.
- **Release suite:** chạy thêm Stress và Spike với reference p95 lần lượt `<= 500 ms` và `<= 100 ms`. Vì kết quả Task 2 hiện có Stress warning và Spike investigation failure, hai scenario này ban đầu là **advisory investigation**, chưa phải hard gate. Chỉ nâng thành hard gate sau khi xử lý known issue và thu được ít nhất 5 lần chạy sạch cùng profile.

| Profile      | Tần suất                   | Chế độ ban đầu                   | Điều kiện nâng thành hard gate            |
| ------------ | -------------------------- | -------------------------------- | ----------------------------------------- |
| PR smoke     | Backend pull request       | Soft gate/quan sát p95           | Có baseline riêng và đủ sample            |
| Load 50 VU   | Sau merge, nightly         | Hard gate sau giai đoạn quan sát | Tối thiểu 5 run PASS cùng runner          |
| Soak 180 VU  | Hằng tuần, trước release   | Hard release gate sau hiệu chỉnh | Late-run ổn định qua tối thiểu 5 run      |
| Stress/Spike | Release candidate/thủ công | Advisory investigation           | Known issue được đóng và có 5 run sạch    |
| Soak 230 VU  | Thủ công/exploratory       | Warning only                     | Không đề xuất dùng làm hard gate hiện tại |

## 4. Baseline và thuật toán gắn cờ regression p95

### 4.1. Baseline hợp lệ

Baseline phải có khóa định danh gồm `scenario + sampler + JMX hash + dataset hash + backend config + runtime version + runner class`. Khi bất kỳ thành phần nào đổi, pipeline mở baseline version mới thay vì so sánh hai phép đo không tương đương.

Pipeline giữ hai mốc:

- **Rolling baseline `B_roll(s)`:** trung vị p95 của 5 lần chạy PASS gần nhất trên nhánh chính, dùng để phát hiện regression mới.
- **Golden baseline `B_gold(s)`:** baseline của release được người phụ trách phê duyệt, dùng để phát hiện suy giảm tích lũy mà rolling baseline có thể che khuất.

```text
B_roll(s) = median(p95 của 5 lần PASS gần nhất cho sampler s)
delta_roll_ms(s) = C(s) - B_roll(s)
delta_roll_pct(s) = 100 * delta_roll_ms(s) / B_roll(s)
delta_gold_ms(s) = C(s) - B_gold(s)
delta_gold_pct(s) = 100 * delta_gold_ms(s) / B_gold(s)
```

Trong đó `C(s)` là p95 của candidate tính từ cột `elapsed` trên **tất cả sample**, không lọc bỏ sample thất bại. Failure được đánh giá thêm bằng gate riêng vì một failure episode nhỏ hơn 5% có thể không làm p95 tăng. Nếu chưa đủ 5 lần chạy, dùng golden baseline đã được chấp thuận, gắn độ tin cậy thấp và không bật hard relative gate. Baseline không được cập nhật từ commit `WARNING`, `FAIL`, run thủ công exploratory hoặc runner khác loại. Golden baseline chỉ thay đổi bằng quyết định có lý do và lịch sử review.

### 4.2. Quy tắc phân loại

| Trạng thái | Quy tắc                                                                                                                                                                                                                                                                                                     |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `PASS`     | Không vi phạm ngưỡng tuyệt đối; không có failure bất thường; p95 không đạt điều kiện cảnh báo với cả rolling và golden baseline                                                                                                                                                                             |
| `WARNING`  | Lần đo đầu vượt p95 tuyệt đối; hoặc `delta_roll_pct > 20%` **và** `delta_roll_ms >= 10 ms`; hoặc `delta_gold_pct > 25%` **và** `delta_gold_ms >= 15 ms`; hoặc late-run p95 tăng ít nhất 3 cửa sổ liên tiếp và cửa sổ cuối cao hơn cửa sổ đầu `>= 20%` và `>= 10 ms`. Pipeline tự chạy lại candidate hai lần |
| `FAIL`     | Một điều kiện sau lặp lại ít nhất 2/3 lần: vượt p95 tuyệt đối; `delta_roll_pct > 30%` và `delta_roll_ms >= 15 ms`; hoặc `delta_gold_pct > 35%` và `delta_gold_ms >= 20 ms`. Error/failure gate bị vi phạm thì fail ngay trong profile hard-gate                                                             |
| `INVALID`  | Backend không sẵn sàng, seed/reset lỗi, thiếu samples, runner quá tải trước khi test, JTL hỏng hoặc metadata không khớp                                                                                                                                                                                     |

Điều kiện kép phần trăm + số millisecond tránh việc tăng từ một baseline rất nhỏ bị phóng đại về tỷ lệ. Cơ chế chạy lại chỉ kích hoạt sau `WARNING`, do đó đường chạy bình thường vẫn rẻ; kết quả đầu tiên cộng hai lần chạy lại tạo thành bộ 3 phép đo để quyết định `FAIL` hay cảnh báo nhiễu.

Trong profile advisory, cùng một vi phạm được công bố là `WARNING/INVESTIGATE` và tạo artifact hoặc issue, không chặn merge/release. Không được dùng allowlist chung để bỏ mọi failure của Stress/Spike; nếu cần chấp nhận known issue thì phải khớp fingerprint cụ thể, có chủ sở hữu và ngày hết hạn.

### 4.3. Điều kiện dữ liệu đủ để tin p95

- Mỗi sampler cần tối thiểu **200 sample** trong cửa sổ đo; mục tiêu là `>= 500`. Nếu smoke chưa đủ 200, pipeline kéo dài tối đa đến 5 phút; vẫn thiếu thì p95 chỉ mang tính quan sát và run không được dùng cập nhật baseline.
- Cửa sổ warm-up/ramp-up được báo cáo riêng. Soak phải đánh giá thêm các cửa sổ một phút sau ramp-up và late-run.
- Parser phải nhóm theo `label`, dùng `elapsed`, đếm failure bằng `success != true`, đồng thời lưu số sample để người review thấy độ tin cậy.
- Nếu runner đã có CPU/RAM/disk bất thường trước test hoặc có performance job khác cùng chạy, kết quả là `INVALID` thay vì `FAIL`.

### 4.4. Ngưỡng p95 tuyệt đối theo sampler

Pipeline tái sử dụng các ngưỡng **tham chiếu ban đầu** được đề xuất sau khi đối chiếu raw JTL ở Task 2. Đây chưa phải threshold production và phải được hiệu chỉnh sau nhiều run lặp:

| Sampler             | Load gate | Soak 180 stable gate |
| ------------------- | --------: | -------------------: |
| POST login          |     50 ms |                50 ms |
| GET categories      |     30 ms |                50 ms |
| GET products search |     40 ms |                60 ms |
| POST cart           |     20 ms |                30 ms |
| POST apply-coupon   |     50 ms |                80 ms |
| POST checkout       |     75 ms |                80 ms |
| GET my-orders       |     50 ms |                70 ms |

Một regression tổng có thể che giấu regression riêng của endpoint, vì vậy gate phải đánh giá cả p95 toàn luồng và từng sampler. Ngược lại, `max elapsed` đơn lẻ không đủ để kết luận regression p95; nó được lưu làm tín hiệu điều tra riêng.

## 5. Cách pipeline phản hồi trên commit

Trên pull request, bot đăng bảng so sánh gồm baseline p95, candidate p95, chênh lệch với rolling/golden baseline, error rate, throughput, sample count và liên kết artifact. Các status check nên tách thành `perf/smoke`, `perf/load`, `perf/soak` và `perf/release-suite` để branch protection chỉ chặn bởi profile hard-gate. `WARNING`, kể cả lần đầu vượt p95 tuyệt đối, kích hoạt hai lần chạy xác nhận. Regression p95 chỉ thành `FAIL` khi lặp lại ít nhất 2/3; error/failure hợp lệ có thể fail ngay. `INVALID` yêu cầu chạy lại sau khi sửa môi trường, không quy lỗi cho commit.

Sau khi merge, chỉ kết quả `PASS` trên runner chuẩn và đúng baseline key mới được đưa vào rolling window. Khi cố ý chấp nhận một thay đổi làm tăng latency, nhóm phải phê duyệt golden baseline mới cùng lý do; pipeline không tự động “học” từ kết quả xấu. Báo cáo hằng tuần phải hiển thị thêm chênh lệch rolling so với golden để phát hiện baseline drift.

## 6. Giảm cảnh báo giả và kết luận sai

- Dùng runner cố định hoặc runner có cùng CPU/RAM/OS; giới hạn tiến trình nền và chạy một performance job tại một thời điểm.
- Pin phiên bản Node.js, dependency, JMeter và JMX; lưu cấu hình cùng artifact.
- Seed cùng tập dữ liệu và reset account lockout/cart/order state trước từng run.
- Warm-up trước cửa sổ đo; không trộn ramp-up với steady-state khi đánh giá late-run.
- So sánh theo cùng scenario và sampler; không so PR smoke trực tiếp với Soak 180.
- Chỉ chạy lại khi có `WARNING`; dùng quy tắc 2/3 để loại nhiễu tạm thời.
- Tách failure chức năng/network khỏi percentile: p95 đẹp không được phép che Duration Assertion hoặc SocketException.
- Theo dõi cả rolling median và golden baseline; không dùng duy nhất lần chạy trước đó làm baseline.
- Yêu cầu đủ sample cho từng sampler; không cho một p95 từ tập quá nhỏ trở thành hard gate.
- Hủy job của commit cũ khi có SHA mới và không chạy hai performance job trên cùng máy.

## 7. Đánh đổi

| Đánh đổi                       | Lợi ích                                         | Chi phí/rủi ro                                         | Cách cân bằng đề xuất                                                               |
| ------------------------------ | ----------------------------------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| Chạy trên mọi commit           | Phát hiện sớm nhất                              | Tốn runner, kéo dài CI, tạo nhiều dữ liệu nhiễu        | Path filter và PR smoke; test đầy đủ sau merge/lịch định kỳ                         |
| Runner dùng chung              | Rẻ và dễ triển khai                             | Tải nền gây biến động p95, cảnh báo giả                | Runner chuẩn, giới hạn concurrency, kiểm tra pre-test health                        |
| Ngưỡng tương đối nhạy          | Bắt được thay đổi nhỏ                           | Baseline 20 ms tăng vài ms đã tạo tỷ lệ lớn            | Yêu cầu đồng thời `%` và `delta_ms`; xác nhận 2/3 lần                               |
| Ngưỡng tuyệt đối rộng          | Ít cảnh báo giả                                 | Có thể bỏ sót regression nhỏ nhưng có xu hướng xấu     | Kết hợp absolute gate, rolling baseline và late-run trend                           |
| Ba lần chạy cho mọi commit     | Tăng độ tin cậy                                 | Chi phí gần gấp ba                                     | Chạy một lần mặc định; chỉ thêm hai lần khi `WARNING`                               |
| Baseline tự cập nhật           | Ít công sức vận hành                            | Baseline drift có thể hợp thức hóa suy giảm            | Chỉ nhận run PASS trên main; thay baseline có phê duyệt                             |
| Rolling + golden baseline      | Bắt được cả regression mới và suy giảm tích lũy | Thêm trạng thái và công sức quản trị                   | Version hóa baseline key; review golden baseline theo release                       |
| Soak/Stress/Spike thường xuyên | Bao phủ tốt contention và tail event            | Tốn 10–20 phút/run, dễ xung đột tài nguyên             | Soak hằng tuần; full suite ở release candidate hoặc thủ công                        |
| Path filter                    | Giảm chi phí đáng kể                            | Có thể bỏ sót ảnh hưởng gián tiếp từ dependency/config | Luôn chạy nightly trên HEAD và coi lockfile/config là high risk                     |
| Bỏ qua frontend-only change    | Phù hợp phạm vi backend API và tiết kiệm runner | Không phát hiện browser/render regression              | Ghi rõ out-of-scope; bổ sung browser performance pipeline riêng nếu phạm vi mở rộng |
| Stress/Spike ở advisory mode   | Tránh chặn vĩnh viễn bởi failure lịch sử        | Có thể trì hoãn xử lý lỗi thật                         | Issue có owner/hạn; chỉ nâng hard gate sau 5 run sạch                               |

### 7.1. Cảnh báo giả dự kiến

Nguồn cảnh báo giả lớn nhất là máy local/shared runner, tiến trình nền, cache lạnh, SQLite state khác nhau và số sample quá ít trong PR smoke. Vì vậy PR smoke chỉ nên là gate mềm cho đến khi có baseline riêng và đủ sample. Load/Soak trên runner chuẩn mới là bằng chứng mạnh để chặn release. Nhóm nên theo dõi tỷ lệ warning bị bác bỏ sau rerun; nếu vượt `10%` số job trong một tháng thì cần xem lại runner hoặc noise budget trước khi nới threshold.

### 7.2. Chi phí dự kiến

Một commit chỉ sửa tài liệu gần như không phát sinh chi phí performance. Backend pull request thường tốn một smoke run 2–5 phút; candidate đáng ngờ có thể tốn thêm tối đa hai run. Load hiện tại có duration 10 phút, Soak 12 phút, còn full release suite xấp xỉ 50 phút nếu chạy tuần tự. Không nên chạy song song các scenario trên cùng host để rút ngắn thời gian vì kết quả sẽ cạnh tranh tài nguyên và mất khả năng so sánh. Cách phân tầng này ưu tiên phản hồi nhanh nhưng vẫn giữ kiểm tra sâu ở các mốc rủi ro cao.

## 8. Lộ trình triển khai

1. **Chuẩn hóa phép đo:** pin runner/runtime/JMeter, version hóa JMX + dataset + config, và xác định baseline key.
2. **Chuẩn bị khả năng chạy tự động:** tạo Smoke JMX hoặc parameterize Load JMX; hiện thực các script `classify/prepare/restore/invoke/run/analyze/compare/publish/stop`; xác minh cùng script chạy được từ local và GitHub Actions.
3. **Giai đoạn quan sát:** bật workflow nhưng chỉ comment metric trong 1–2 tuần; thu ít nhất 5 run PASS và đủ sample cho từng profile.
4. **Giai đoạn gate mềm:** bật `WARNING`, rerun 2 lần và yêu cầu người review xác nhận; Stress/Spike vẫn advisory vì kết quả lịch sử chưa sạch.
5. **Giai đoạn gate cứng:** chặn bằng Load/Soak khi regression lặp lại 2/3 hoặc error gate hợp lệ bị vi phạm. Chỉ bật hard gate cho Stress/Spike sau khi known issue được xử lý và có 5 run sạch.
6. **Giai đoạn hiệu chỉnh:** hàng tháng xem lại độ biến động, tỷ lệ cảnh báo giả, thời gian runner, rolling-vs-golden drift và threshold theo sampler; mọi thay đổi threshold phải có lịch sử phê duyệt.

## 9. Kết luận

Mô hình đề xuất theo dõi mọi commit qua GitHub Actions nhưng không chạy toàn bộ performance suite cho mọi thay đổi: commit ngoài phạm vi được ghi `SKIPPED`, backend pull request chạy smoke, main chạy Load, lịch tuần chạy Soak 180 và release candidate chạy full suite. Các script dùng chung chuẩn bị SUT, chạy JMeter CLI non-GUI, phân tích raw JTL và áp dụng regression gate nên có thể tái hiện cả trên local lẫn CI. Regression p95 được đánh giá trên raw `elapsed` theo cùng baseline key, đối chiếu cả rolling và golden baseline, kiểm tra đủ sample và xác nhận 2/3 khi có tín hiệu đáng ngờ. Load/Soak có thể trở thành hard gate sau giai đoạn hiệu chỉnh; Stress/Spike hiện phải ở advisory mode vì raw JTL lịch sử chưa clean. Thiết kế này đáp ứng yêu cầu Task 3 ở mức đề xuất có thể triển khai, cân bằng chi phí với cảnh báo giả và tránh tuyên bố rằng workflow/script đã chạy khi mới chỉ được thiết kế.
