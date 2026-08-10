# Các kiểu AI đọc sai chỉ số hiệu năng

Dùng file này ở giai đoạn 3. Với mỗi kiểu, phần "cách phát hiện" là thao tác cụ thể để kiểm chứng chứ không phải cảm nhận.

---

## Nhóm A — Đọc sai cột dữ liệu

### A1. Nhầm `Latency` với response time
**Biểu hiện:** AI báo response time thấp hơn thực tế, hoặc nói "TTFB" khi đang trích cột `elapsed`.
**Vì sao xảy ra:** Cả hai cột đều là đơn vị ms và tên gọi trong tài liệu không thống nhất giữa các công cụ.
**Cách phát hiện:** So `p95` của cột `elapsed` với cột `Latency` trong output script. Nếu con số AI đưa ra khớp với `Latency` mà nó gọi là response time thì đã bắt được lỗi.
**Giá trị đúng:** `elapsed` là response time; `Latency` là TTFB.

### A2. Tính error rate bằng `responseCode` thay vì `success`
**Biểu hiện:** Error rate AI báo lệch so với script, thường **thấp hơn** vì bỏ sót assertion fail.
**Cách phát hiện:** Đếm hai cách rồi so:
```bash
awk -F, 'NR>1 && $8=="false"' f.jtl | wc -l      # đúng
awk -F, 'NR>1 && $4!="200"' f.jtl | wc -l        # cách AI hay dùng
```
**Vì sao quan trọng:** Một endpoint trả HTTP 200 kèm body báo lỗi vẫn tính là thành công theo cách sai — che giấu đúng loại lỗi nguy hiểm nhất.

### A3. Nhầm đơn vị `timeStamp`
**Biểu hiện:** Throughput sai lệch 1000 lần, hoặc thời lượng test báo là vài trăm giờ.
**Cách phát hiện:** Kiểm tra `duration_seconds` trong output script có khớp với thời lượng test thật không.

### A4. Nhầm `allThreads` với số VU cấu hình
**Biểu hiện:** AI nói "test chạy với 50 VU" trong khi peak thực tế chỉ đạt 34 vì máy generator không kịp tạo thread.
**Cách phát hiện:** Script in ra `peak_threads`. Nếu peak thấp hơn cấu hình đáng kể, chính công cụ test mới là nút thắt — và toàn bộ kết luận về SUT cần xem lại.

---

## Nhóm B — Sai phạm vi tính toán

### B1. Tính SLA trên toàn file, gộp cả ramp-up và ramp-down
**Biểu hiện:** p95 toàn file thường **thấp hơn** p95 steady-state (vì giai đoạn tải thấp kéo phân bố xuống), dẫn tới kết luận lạc quan giả.
**Cách phát hiện:** So hai khối trong output script. Trong ví dụ điển hình, p95 toàn file 1317ms còn steady-state 1348ms — chênh lệch đủ để đảo ngược một kết luận pass/fail sát ngưỡng.
**Nói cách khác:** Con số đúng phụ thuộc vào câu hỏi. Nếu hỏi "hệ thống có đạt SLA ở tải mục tiêu không" thì phải dùng steady-state.

### B2. Chỉ báo số liệu tổng, không tách theo transaction
**Biểu hiện:** "p95 = 1348ms, đạt ngưỡng 2000ms" — trong khi riêng Checkout có p95 = 1527ms và đang là nút thắt thật.
**Cách phát hiện:** Bảng "theo từng transaction" trong output script. Luôn nhìn transaction chậm nhất, không chỉ nhìn tổng.
**Vì sao quan trọng:** Một luồng có 85% request đọc nhanh sẽ luôn cho tổng thể đẹp, bất kể checkout tệ thế nào.

### B3. Tính throughput trên toàn thời lượng kể cả lúc tải đã giảm
**Biểu hiện:** RPS báo thấp hơn năng lực thật.
**Cách phát hiện:** So `throughput_rps` của toàn file với của steady-state (ví dụ 12.87 vs 16.03 — chênh 25%).

### B4. Kết luận về xu hướng từ dữ liệu quá ngắn
**Biểu hiện:** "Không phát hiện memory leak" sau khi chạy 2 phút.
**Vì sao sai:** Lỗi tích tụ theo thời gian, theo định nghĩa, cần thời gian dài mới lộ. Soak test tối thiểu 10–15 phút mới có cơ sở phát biểu.
**Cách phát hiện:** Kiểm tra `duration_seconds`. Nếu dưới ngưỡng, kết luận đúng phải là "chưa đủ dữ liệu để kết luận", không phải "không có".

---

## Nhóm C — Sai lầm suy luận

### C1. Gán nhân quả cho tương quan
**Biểu hiện:** "CPU cao khiến response time tăng."
**Vì sao đáng ngờ:** Cả hai có thể là hệ quả của cùng một nguyên nhân (tải tăng). CPU cao cũng có thể là *kết quả* của việc thread chờ nhiều rồi busy-wait, chứ không phải nguyên nhân.
**Cách phát hiện:** Hỏi ngược: nếu giảm CPU usage mà không đổi gì khác thì response time có giảm không? Nếu không kiểm chứng được thì phát biểu phải ở dạng tương quan.

### C2. Kết luận về tầng mà log không quan sát được
**Biểu hiện:** "Truy vấn database là nút thắt", "GC pause gây p99 cao" — từ một file `.jtl` thuần client-side.
**Vì sao sai:** File `.jtl` chỉ ghi nhận thời gian nhìn từ phía client. Nó không chứa thông tin về truy vấn SQL, GC, hay disk I/O.
**Phát biểu đúng:** "p99 cao gấp 5 lần p50 gợi ý có nguồn biến thiên ở phía server — cần bật slow query log hoặc GC log để xác định." Có giả thuyết là tốt; trình bày giả thuyết như kết luận mới là vấn đề.

### C3. Bỏ qua khả năng chính công cụ test là nút thắt
**Biểu hiện:** Kết luận SUT gãy ở 200 VU, trong khi thực tế JMeter trên cùng máy đã cạn heap.
**Cách phát hiện:** Kiểm tra `peak_threads` có đạt cấu hình không; đối chiếu screenshot resource monitor — nếu tiến trình JMeter/k6 chiếm CPU cao hơn tiến trình backend thì đang đo chính mình.
**Đặc biệt liên quan** khi SUT và công cụ test chạy chung một máy — trường hợp rất phổ biến trong môi trường lab.

### C4. Diễn giải error rate mà không nhìn loại lỗi
**Biểu hiện:** "Error rate 2% chấp nhận được."
**Vì sao chưa đủ:** 2% lỗi ở endpoint đọc rất khác 2% lỗi ở checkout. Và lỗi do account lockout là lỗi *thiết kế test*, không phải lỗi hiệu năng — gộp chung sẽ chẩn đoán sai.
**Cách phát hiện:** Bảng phân rã lỗi theo label + responseCode trong output script.

### C5. So sánh số liệu giữa JMeter và k6 như thể cùng thang đo
**Vì sao sai:** `http_req_failed` của k6 dựa trên HTTP status; `success` của JMeter tính cả assertion. Cùng một hệ thống sẽ cho hai con số error rate khác nhau.

### C6. Suy ra sức chịu tải production từ đo đạc trên máy cá nhân
**Biểu hiện:** "Hệ thống chịu được 500 người dùng đồng thời."
**Phát biểu đúng:** "Trên phần cứng [spec cụ thể], với SUT và generator chạy cùng máy, throughput ổn định tối đa đạt X RPS." Con số này gắn chặt với môi trường đo và không ngoại suy được.

---

## Nhóm D — Sai số bịa ra

### D1. Trích dẫn con số không có trong log
**Biểu hiện:** Số liệu nghe hợp lý nhưng không khớp với bất kỳ phép tính nào trên file.
**Cách phát hiện:** Với mỗi con số AI đưa ra, yêu cầu chỉ ra phép tính tạo ra nó. Không tái tạo được thì loại.
**Đây là kiểu lỗi nguy hiểm nhất** vì bản phân tích trông chỉn chu, có bảng biểu đầy đủ và không có dấu hiệu bất thường nào.

### D2. Làm tròn khiến kết luận đổi chiều
**Biểu hiện:** p95 = 2013ms báo thành "khoảng 2 giây, đạt SLA 2000ms".
**Cách phát hiện:** So số thô với số AI trích. Ở sát ngưỡng, làm tròn không phải chuyện thẩm mỹ.

### D3. Tự tin quá mức với mẫu nhỏ
**Biểu hiện:** Kết luận chắc chắn về p99 từ 200 sample. p99 của 200 sample chỉ dựa trên 2 điểm dữ liệu.
**Nguyên tắc thô:** Muốn p99 có ý nghĩa cần ít nhất vài nghìn sample cho label đó.

---

## Mẫu ghi nhận hoàn chỉnh

> **Misinterpretation #2 — Tính p95 trên toàn bộ file**
>
> **AI phát biểu:** "p95 response time đạt 1317ms, nằm dưới ngưỡng SLA 2000ms nên hệ thống đáp ứng tốt ở mức tải 50 VU."
>
> **Giá trị đúng từ raw log:** p95 tính riêng cho giai đoạn steady-state (3096/3849 sample, khoảng thời gian thread giữ ở mức ≥45) là **1348ms**. Con số 1317ms là kết quả tính trên toàn file, có gộp cả 60s ramp-up và 60s ramp-down khi tải chỉ bằng một phần mức mục tiêu.
>
> **Sai ở đâu:** Phạm vi tính toán. Số liệu ramp-up/ramp-down kéo phân bố xuống, tạo ra p95 lạc quan hơn thực tế.
>
> **Vì sao AI sai:** File `.jtl` không có cột đánh dấu giai đoạn; phải suy ra từ diễn biến cột `allThreads`. Mô hình mặc định tính trên toàn tập dữ liệu được cung cấp mà không đặt câu hỏi về tính đồng nhất của tập đó.
>
> **Hệ quả:** Ở ví dụ này kết luận cuối vẫn không đổi (cả hai đều dưới 2000ms), nhưng phương pháp thì sai — với một hệ thống có p95 quanh 1900–2100ms, cùng lỗi này sẽ đảo ngược kết luận pass/fail.
