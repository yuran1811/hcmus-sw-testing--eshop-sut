# BUG-API-001: Backend không chấp nhận kịp kết nối khi tải tăng đột biến — 15,7 % request chạm trần connect timeout 5 giây ở mức 500 VU

> **GitHub Issue:** [#286](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/286) — đã tạo ngày 2026-08-15, label: `type:bug`, `status:new`, `priority:P2`, `severity:major`, `module:api`, `found-by:perf-testing`, `hw05-perf-testing`

## Found by Test Case

Không phát hiện qua test case chức năng. Phát hiện khi **chạy Spike test HW05** (`23127211_Spike_20260814.jmx`: 50 VU nền + đột biến lên 500 VU trong 5 giây, think time = 0), phân tích từ raw log `23127211_Spike_20260814.jtl`.

## Requirement liên quan

Không có FR cụ thể — đây là **yêu cầu phi chức năng** về khả năng chịu tải đột biến (mô phỏng tình huống flash sale). Đối chiếu với Performance Goal đã đặt trong `performance-testing/23127211_Workload_Model.md` §1: error rate < 1 % ở tải thiết kế.

## Severity / Priority

Major / P2

## Environment

- Backend: Node.js v20.20.2 + Express + SQLite, chạy đơn tiến trình
- OS: Ubuntu 22.04.5 LTS (WSL2), máy `VN1-5CG1041RBP`, Intel i5-10310U 8 nhân, 7,6 GiB RAM
- URL: `http://localhost:3000`
- Build: nhánh `hw05/23127211`, commit `7f0d46c`
- Công cụ đo: Apache JMeter 5.6.3 (`connect_timeout = 5000 ms`, `response_timeout = 10000 ms`)
- Mã nguồn liên quan: `backend/server.js:570` — `app.listen(PORT, callback)`, **không truyền tham số `backlog`**

## Steps to reproduce

1. Khởi động backend: `cd backend && node server.js`
2. Chạy Spike test bằng CLI:

   ```bash
   jmeter -n -t performance-testing/jmeter/23127211_Spike_20260814.jmx \
          -l results/spike.jtl -e -o results/spike_report/
   ```

3. Phân tích cột `Connect` trong raw log (dùng `performance-testing/tools/ground_truth.py`, đã lọc row Transaction Controller):

   ```bash
   python3 performance-testing/tools/ground_truth.py results/spike.jtl 30
   ```

## Expected result

Ở mức tải đỉnh, hệ thống vẫn **chấp nhận được kết nối TCP** trong thời gian hợp lý (trên localhost lẽ ra gần bằng 0). Các request có thể chậm đi hoặc bị từ chối bằng một mã lỗi HTTP rõ ràng (ví dụ 503), nhưng **không nên treo cho tới khi client bỏ cuộc**.

## Actual result

Ở mức 500 VU, phần lớn thời gian của request bị tiêu tốn **chỉ để thiết lập kết nối**, chứ không phải để xử lý nghiệp vụ:

| Kịch bản | VU đỉnh | `Connect` p50 | `Connect` p95 | `Connect` max | Số request có `Connect ≥ 5 s` |
|---|---|---|---|---|---|
| Load | 50 | 0 ms | **0 ms** | 26 ms | 0 (0,0 %) |
| Stress | 400 | 0 ms | **0 ms** | 264 ms | 0 (0,0 %) |
| **Spike** | **500** | 0 ms | **5 005 ms** | 5 095 ms | **2 585 / 16 427 (15,7 %)** |

Giá trị 5 005 ms **trùng khít với `connect_timeout = 5000 ms`** do test plan cấu hình ⇒ đây là các kết nối bị **treo cho tới khi hết thời gian chờ**, không phải kết nối chậm.

Phân rã lỗi của bài Spike (3 644 lỗi / 16 427 request = 22,18 %):

| Loại lỗi | Số lượng | Tỷ lệ |
|---|---|---|
| Lỗi phía client — `ConnectTimeoutException`, `SocketException`, `SocketTimeoutException` | **3 466** | **95,1 %** |
| Phản hồi HTTP thật từ backend (171 × `403`, 7 × `404`) | 178 | 4,9 % |

Diễn biến theo cửa sổ 30 giây:

| Cửa sổ | Threads TB | RPS | p50 | p95 | Error % |
|---|---|---|---|---|---|
| 0–30 s | 39 | 103,5 | 225 ms | 626 ms | 0,00 |
| 30–60 s | **500** | 156,2 | 1 229 ms | 10 011 ms | **33,26** |
| 60–90 s | 481 | 180,2 | 1 197 ms | 10 008 ms | **36,95** |
| 90–120 s | 95 | 107,6 | 269 ms | 717 ms | 2,69 |

Hệ thống **phục hồi hoàn toàn** khi tải rút xuống (cửa sổ cuối: p95 về 717 ms, lỗi về 2,69 %) — cho thấy đây là hiện tượng bão hoà tạm thời ở tầng kết nối chứ không phải hỏng vĩnh viễn.

Nguyên nhân nghi ngờ nằm ở `backend/server.js:570`:

```js
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

Không truyền tham số `backlog` ⇒ dùng giá trị mặc định của Node.js (511). Với 500 VU đồng thời mỗi VU giữ một kết nối riêng, hàng đợi accept gần như chạm trần.

## Impact

- Ở tình huống tải đột biến kiểu flash sale, **khoảng 1/6 người dùng không kết nối được** và phải chờ 5 giây trước khi nhận lỗi — trải nghiệm tệ hơn nhiều so với việc được phục vụ chậm.
- Lỗi xảy ra ở tầng kết nối nên **không được ghi nhận trong log ứng dụng** của backend: nhìn từ phía server, các request này chưa từng tồn tại. Nếu chỉ giám sát bằng log ứng dụng sẽ hoàn toàn không thấy sự cố.
- So sánh giữa ba kịch bản cho thấy hiện tượng **chỉ xuất hiện khi tải tăng đột ngột**, không xuất hiện ở Stress test dù đã lên tới 400 VU theo bậc thang ⇒ vấn đề nằm ở **tốc độ tăng tải**, không chỉ ở mức tải tuyệt đối.

## Giới hạn của kết luận (cần nêu rõ khi triage)

Báo cáo này mô tả **hiện tượng quan sát được**, chưa khẳng định được nguyên nhân nằm hoàn toàn ở phía backend, vì:

1. **Công cụ đo và SUT chạy chung một máy.** JMeter (JVM, 500 thread) và Node.js tranh chấp CPU/RAM/socket trên cùng máy, nên không loại trừ được khả năng chính generator mới là bên cạn tài nguyên trước.
2. **Dữ liệu CPU/RAM của lần chạy này không dùng được** do lỗi script giám sát bắt nhầm PID (xem `performance-testing/23127211_Review_Notes.md` #9), nên không đối chiếu được mức tiêu thụ tài nguyên của hai tiến trình.
3. Đối chứng bằng k6 (nhẹ hơn JMeter đáng kể) trên cùng cấu hình 500 VU chỉ ghi nhận **2,22 %** lỗi so với 22,18 % của JMeter — chênh lệch này ủng hộ giả thuyết một phần lỗi đến từ chính generator.

**Cách kiểm chứng dứt điểm:** tách generator sang máy khác; hoặc chạy lại Spike test sau khi (a) sửa script giám sát để đo CPU từng nhân của cả hai tiến trình, và (b) đặt `app.listen(PORT, 4096)` — nếu tỷ lệ `Connect ≥ 5 s` giảm rõ rệt thì xác nhận nguyên nhân nằm ở hàng đợi accept của backend. Theo dõi hàng đợi bằng `ss -lnt` (cột `Recv-Q` trên cổng 3000) trong lúc chạy.

## Evidence

- Bảng thống kê cột `Connect` cho cả 3 kịch bản (tính từ raw `.jtl`, đã lọc row Transaction Controller).
- Bảng phân rã lỗi client-side vs HTTP thật.
- Bảng diễn biến theo cửa sổ 30 giây.
- Raw log đầy đủ: `performance-testing/jmeter/results/23127211_Spike_20260814.jtl` (16 427 request).
- Phân tích chi tiết: `performance-testing/23127211_Analysis_Report.md` §1.4 và §2.2 (Nút thắt 2).
- Ảnh chụp GitHub Issue #286: `tests/bug-reports/screenshots/issue-286.png` ✅
- Ảnh chụp danh sách 5 issue HW05 (lọc theo `label:hw05-perf-testing`): `tests/bug-reports/screenshots/issues-list-hw05.png` ✅
- Screenshot bổ sung cần sinh viên tự chụp: màn hình JMeter **cùng khung hình** với resource monitor trong lúc chạy Spike test 👤

## Notes

- Đề xuất tối ưu tương ứng đã được phân loại **"Khả thi"** trong `23127211_Analysis_Report.md` §4 mục #7 — và là đề xuất **duy nhất nhắm đúng nút thắt của bài Spike** trong số 10 đề xuất được đánh giá.
- Không nên nhầm lỗi này với nút thắt ở tầng ghi SQLite (chi phối ở tải trung bình, xem `23127211_Analysis_Report.md` §2.2 Nút thắt 1) — hai vấn đề xuất hiện ở hai chế độ tải khác nhau và cần hai cách khắc phục khác nhau.
