# [BUG][Spike Test] Suy giảm hiệu năng nghiêm trọng (P95 Latency > 1.8s) do tranh chấp Single-Writer Lock của SQLite dưới tải đột biến 250 VUs

## Found by Test Case

- PERF-SPIKE-001 (Kịch bản Spike Test Flash Sale — File: `HW5/test-plans/23127148_Spike_20260815.jmx`)

## Requirement liên quan

- NFR-01 (Thời gian phản hồi SLA < 500ms dưới tải đột biến)
- Scope: Admin Workflow (`POST /api/categories`, `PUT /api/categories/:id`, `POST /api/admin/import-products`)

## Severity / Priority

- **Severity**: Major
- **Priority**: P1

## Environment

- Tool: Apache JMeter 5.6.3 (Non-GUI CLI)
- OS: Windows 11 Home (64-bit)
- Backend: Node.js v20.x, Express.js 4.x
- Database: SQLite 3 (`backend/database.sqlite`)
- Hardware: Intel Core i5-12450HX, 24GB DDR5 RAM, NVMe PCIe 4.0 SSD

## Steps to reproduce

1. Khởi động server backend Node.js: `npm start` tại cổng 3000.
2. Thực thi kịch bản kiểm thử Spike Test với 250 Virtual Users đồng thời và Think Time = 0s:
   ```powershell
   jmeter -n -t HW5/test-plans/23127148_Spike_20260815.jmx `
          -l HW5/results/spike/spike_results.jtl `
          -e -o HW5/results/spike/html-report
   ```
3. Mở file `HW5/results/spike/html-report/index.html` và kiểm tra bảng Statistics và biểu đồ Response Time Over Time.

## Expected result

- Thời gian phản hồi duy trì ổn định dưới ngưỡng SLA cam kết ($P95 < 500\text{ ms}$, $P99 < 1000\text{ ms}$).
- Không bị nghẽn hàng đợi ghi I/O.

## Actual result

- P95 Response Time tăng vọt từ **16.00 ms** (Load Test) lên đến **1,897.95 ms (~1.9 giây)** — **tăng gấp ~118 lần**, vi phạm nghiêm trọng SLA 500ms.
- P99 Response Time chạm mốc **2,478.99 ms (~2.5 giây)** và Max Latency đạt **3,278.00 ms (3.28 giây)**.
- Nguyên nhân: Cơ chế Single-Writer Lock của SQLite khóa file độc quyền khi hàng trăm request ghi dồn dập, gây tắc nghẽn hàng đợi I/O trên Node.js Event Loop.

## Evidence

- Screenshot: ![Spike Response Time](../results/spike/evidences/spike_response_time_over_time.png)
- Screenshot: ![Spike Statistics Table](../results/spike/evidences/spike_statistics_table.png)
