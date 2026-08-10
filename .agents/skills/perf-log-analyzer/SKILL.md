---
name: perf-log-analyzer
description: Phân tích log kết quả kiểm thử hiệu năng (file .jtl của JMeter, JSON/summary của k6) để tính đúng p50/p90/p95/p99, throughput, error rate, xác định giai đoạn steady-state và điểm gãy, sau đó đối chiếu với bản phân tích do AI đưa ra để truy tìm chỗ AI đọc sai chỉ số, và phân loại từng đề xuất tối ưu là khả thi hay ảo tưởng (feasible/hallucinated). LUÔN dùng skill này khi người dùng nhắc tới "file .jtl", "phân tích kết quả load test", "đọc log JMeter", "p95", "percentile", "throughput", "error rate", "endurance threshold", "memory leak", "điểm gãy", "AI phân tích sai", "misinterpretation hunt", hoặc đưa vào một file log/summary hiệu năng và muốn hiểu số liệu — kể cả khi họ chỉ hỏi "kết quả này tốt hay xấu".
---

# Vai trò

Bạn là người phân tích kết quả kiểm thử hiệu năng và đồng thời là người **kiểm tra lại chính bản phân tích của AI**.

Nguyên tắc chi phối toàn bộ skill này: **mọi con số phải truy về được một phép tính cụ thể trên log gốc**. Một bản phân tích nghe hợp lý nhưng số liệu lấy từ trí nhớ hoặc ước lượng còn nguy hiểm hơn không phân tích gì, vì nó tạo cảm giác an toàn giả. Vì vậy bước đầu tiên luôn là tính lại từ raw log, không phải đọc summary có sẵn.

---

# Quy trình 4 giai đoạn

| Giai đoạn | Việc cần làm | Đầu ra |
|---|---|---|
| 1 | Tính **ground truth** từ raw log bằng script | Bảng số liệu chuẩn |
| 2 | Diễn giải kết quả và đề xuất threshold | Nhận định có căn cứ |
| 3 | **Truy tìm chỗ AI đọc sai** — đối chiếu từng khẳng định với ground truth | Bảng misinterpretation |
| 4 | Phân loại đề xuất tối ưu: khả thi / ảo tưởng | Bảng verdict kèm lý do |

---

## Giai đoạn 1 — Tính ground truth từ raw log

**Luôn chạy script trước khi phát biểu bất kỳ con số nào.** Đừng đọc file .jtl bằng mắt rồi ước lượng percentile — percentile không thể ước lượng bằng cách nhìn.

```bash
python3 scripts/analyze_jtl.py results/25127001_Load_20260810.jtl
```

Script xuất ra: tổng số sample, error rate, throughput, p50/p90/p95/p99, min/max/mean, tách theo từng label, phát hiện giai đoạn steady-state, và xu hướng theo thời gian (để bắt memory-leak-style degradation). Xem `scripts/analyze_jtl.py --help` cho các tuỳ chọn (lọc theo label, chỉ tính steady-state, xuất JSON).

Nếu môi trường không chạy được Python, các phép tính tương đương bằng `awk` nằm trong `references/jtl-format.md`.

### Đọc đúng cột trong .jtl

Nhầm cột là nguồn gốc của phần lớn phân tích sai:

| Cột | Ý nghĩa | Nhầm phổ biến |
|---|---|---|
| `elapsed` | **Response time** — toàn bộ thời gian tới khi nhận xong response | Gọi nhầm là latency |
| `Latency` | Time To First Byte | Gọi nhầm là response time |
| `Connect` | Thời gian thiết lập kết nối (nằm *trong* Latency) | Cộng thêm vào response time |
| `success` | `true`/`false` — **dùng cột này để tính error rate** | Dùng `responseCode` thay thế |
| `allThreads` | Số thread active tại thời điểm đó | Nhầm là số VU cấu hình |
| `timeStamp` | Epoch **millis** lúc bắt đầu request | Nhầm là giây, ra throughput sai 1000 lần |

`success=false` có thể xảy ra ngay cả khi `responseCode=200` (assertion fail), và `responseCode=302` có thể là `success=true`. Đây là lý do phải dùng cột `success`.

### Xác định steady-state trước khi tính SLA

Số liệu trong giai đoạn ramp-up và ramp-down bị nhiễu — tính p95 trên toàn bộ file sẽ trộn lẫn ba giai đoạn khác nhau và cho ra con số không đại diện cho gì cả.

Cách xác định: tìm khoảng thời gian mà `allThreads` giữ ở mức tối đa ổn định. Tính SLA trên khoảng đó, đồng thời vẫn báo cáo số liệu toàn file để so sánh, và ghi rõ đang dùng khoảng nào.

---

## Giai đoạn 2 — Diễn giải

### Bảng số liệu tối thiểu cần có

| Chỉ số | Toàn file | Chỉ steady-state | Ngưỡng mục tiêu | Đạt? |
|---|---|---|---|---|
| Tổng sample | | | — | |
| Error rate (%) | | | | |
| Throughput (RPS) | | | | |
| p50 (ms) | | | | |
| p90 (ms) | | | | |
| p95 (ms) | | | | |
| p99 (ms) | | | | |
| Max (ms) | | | — | |

Lặp lại bảng này **theo từng label/transaction**, không chỉ tổng thể. Một checkout chậm 5 giây sẽ bị che khuất hoàn toàn nếu 85% traffic là request đọc nhanh.

### Nguyên tắc diễn giải

- **Đừng dùng mean để kết luận** — mean bị kéo lệch bởi outlier. p95 mới là ngưỡng dùng trong SLA; p99 cho biết nhóm 1% khách hàng chịu trải nghiệm tệ nhất.
- **Khoảng cách p50 → p99 nói lên nhiều hơn giá trị tuyệt đối.** p50=100ms, p99=8000ms nghĩa là có nguồn biến thiên lớn (GC pause, lock contention, cold cache), quan trọng hơn việc p95 có đạt hay không.
- **Throughput ngừng tăng khi VU tiếp tục tăng = đã chạm bão hoà.** Từ điểm đó trở đi, thêm tải chỉ làm response time tăng chứ không tăng năng lực xử lý. Đây chính là định nghĩa vận hành của "điểm gãy".
- **Error rate tăng vọt thường đến sau response time tăng**, không đồng thời. Thứ tự này giúp phân biệt timeout do quá tải với lỗi ứng dụng.
- **So sánh với baseline**: một con số đơn lẻ hầu như không nói lên điều gì nếu không có mốc so sánh.

### Đề xuất threshold

Threshold nên bắt nguồn từ số liệu quan sát được, không phải từ con số tròn nghe hay. Cách làm hợp lý: lấy p95 đo được ở tải baseline, cộng biên an toàn (thường 20–50%), rồi đối chiếu với yêu cầu nghiệp vụ nếu có. Ghi rõ threshold là kết quả suy ra từ đo đạc hay là yêu cầu áp từ ngoài vào.

### Endurance threshold

Đầu ra phải là số cụ thể, không phải mô tả định tính:

- **Maximum stable RPS**: mức throughput cao nhất duy trì được trong suốt thời gian soak mà error rate vẫn dưới ngưỡng và p95 không tăng dần.
- **Memory ceiling**: RAM cao nhất quan sát được, kèm nhận định về xu hướng. RAM tăng đơn điệu không giảm suốt 15 phút ở tải không đổi là dấu hiệu memory leak — nhưng cần loại trừ khả năng đó chỉ là JVM/GC chưa tới ngưỡng thu hồi.
- **Xu hướng p95 theo cửa sổ thời gian**: chia thời gian soak thành các cửa sổ 1–2 phút, so p95 cửa sổ đầu với cửa sổ cuối. Tăng đáng kể ở tải không đổi = có degradation tích tụ.

---

## Giai đoạn 3 — Truy tìm chỗ AI đọc sai

Đây là phần cốt lõi. Đọc bản phân tích do AI tạo ra, tách thành từng **khẳng định rời**, rồi đối chiếu từng khẳng định với ground truth ở giai đoạn 1.

Mẫu ghi nhận:

| # | AI phát biểu | Ground truth từ log | Sai ở đâu | Vì sao AI sai |
|---|---|---|---|---|
| 1 | | (kèm dòng/phép tính cụ thể) | | |

Yêu cầu bắt buộc: mỗi ô "ground truth" phải dẫn được về một phép tính hoặc một dòng cụ thể trong file `.jtl`. Không chấp nhận "theo tính toán của tôi".

Danh sách các kiểu đọc sai thường gặp nằm trong `references/misinterpretation-patterns.md` — đọc file đó khi bắt đầu giai đoạn này. Vài kiểu nổi bật:

- Trộn số liệu ramp-up vào tính p95 rồi kết luận hệ thống chậm
- Đọc `Latency` như response time (hoặc ngược lại)
- Tính error rate bằng `responseCode` thay vì cột `success`
- Suy ra throughput bằng cách chia tổng sample cho tổng thời lượng, bỏ qua phần ramp-down khi tải đã giảm
- Kết luận "không có memory leak" từ dữ liệu 2 phút — quá ngắn để kết luận
- Gán nhân quả cho tương quan: "CPU cao nên response time cao" trong khi cả hai đều là hệ quả của một nguyên nhân thứ ba
- Nhận định về database khi log không hề chứa thông tin tầng database

Nếu sau khi rà soát mà **không** tìm thấy chỗ sai nào, hãy nói thẳng như vậy thay vì bịa ra lỗi cho đủ số lượng. Nhưng trước khi kết luận thế, hãy kiểm tra kỹ hai chỗ mà AI gần như luôn trượt: ranh giới steady-state, và việc phân tách theo từng label.

---

## Giai đoạn 4 — Phân loại đề xuất tối ưu

Với mỗi đề xuất tối ưu mà AI đưa ra, phân loại thành:

| Nhãn | Nghĩa |
|---|---|
| **Khả thi (feasible)** | Có bằng chứng trong log ủng hộ, và áp dụng được với kiến trúc hiện tại |
| **Khả thi nhưng chưa có căn cứ** | Bản thân đề xuất hợp lý về kỹ thuật, nhưng log hiện có không chứng minh được đó là nút thắt |
| **Ảo tưởng (hallucinated)** | Không áp dụng được với stack hiện tại, hoặc dựa trên thông tin không tồn tại trong log |

Mỗi verdict cần: **bằng chứng ủng hộ hoặc bác bỏ**, và **cách kiểm chứng** nếu muốn xác nhận.

Bảng verdict cho các đề xuất phổ biến (thêm database index, connection pool, bật SQLite WAL, thêm cache, tăng worker…) nằm trong `references/optimization-verdicts.md`. Đọc file đó trước khi phán một đề xuất là ảo tưởng — nhiều đề xuất *nghe* sai nhưng thực ra đúng trong ngữ cảnh cụ thể, và ngược lại.

Lưu ý về mặt lập luận: một đề xuất bị xếp "ảo tưởng" không phải vì nó là kỹ thuật tồi, mà vì nó **không giải quyết nút thắt được quan sát**. Ví dụ thêm index cho một hệ thống mà log cho thấy nghẽn ở tầng kết nối HTTP là đề xuất lạc chỗ, dù index tự nó là kỹ thuật hoàn toàn hợp lệ.

---

# Định dạng báo cáo đầu ra

Trừ khi người dùng yêu cầu khác, xuất theo cấu trúc:

```markdown
## 1. Số liệu ground truth
   1.1 Tổng thể (toàn file / chỉ steady-state)
   1.2 Theo từng transaction
   1.3 Xu hướng theo thời gian

## 2. Diễn giải
   2.1 Hệ thống có đạt mục tiêu không
   2.2 Nút thắt quan sát được (kèm bằng chứng)
   2.3 Threshold đề xuất + cơ sở

## 3. Truy tìm chỗ AI đọc sai
   Bảng: AI phát biểu | Giá trị đúng từ log | Sai ở đâu | Vì sao

## 4. Phân loại đề xuất tối ưu
   Bảng: Đề xuất | Verdict | Bằng chứng | Cách kiểm chứng

## 5. Giới hạn của kết luận
   Những gì log này KHÔNG cho phép kết luận
```

Mục 5 không phải phần phụ. Log hiệu năng ở tầng client không chứa thông tin về truy vấn database, GC, hay I/O ổ đĩa — nêu rõ điều đó ngăn người đọc suy diễn quá xa từ dữ liệu có hạn.

---

# Tài liệu tham chiếu

| File | Khi nào đọc |
|---|---|
| `scripts/analyze_jtl.py` | Luôn chạy đầu tiên, trước mọi nhận định |
| `references/jtl-format.md` | Khi cần chi tiết về cột dữ liệu, hoặc cần công thức awk thay cho Python |
| `references/misinterpretation-patterns.md` | Bắt đầu giai đoạn 3 |
| `references/optimization-verdicts.md` | Bắt đầu giai đoạn 4 |
