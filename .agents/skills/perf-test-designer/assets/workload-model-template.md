# Workload Model — [Tên hệ thống]

> Điền đầy đủ 3 phần trước khi sinh test plan. Mọi ô để trống sẽ trở thành một giả định ngầm không kiểm chứng được.

## 0. Thông tin chung

| Mục | Giá trị |
|---|---|
| SUT | |
| Base URL / Port | |
| Môi trường (local / staging) | |
| Ngày đo | |
| Người thực hiện | |

## 1. Performance Goal

| Chỉ số | Ngưỡng mục tiêu | Nguồn |
|---|---|---|
| p95 response time | | ☐ SLA thật ☐ Giả định |
| p99 response time | | ☐ SLA thật ☐ Giả định |
| Throughput tối thiểu | ___ RPS | ☐ SLA thật ☐ Giả định |
| Error rate tối đa | ___ % | ☐ SLA thật ☐ Giả định |
| CPU tối đa | ___ % | |
| RAM tối đa | ___ MB | |

## 2. Workload Model

### 2.1 Transaction Distribution

| Transaction | Endpoint | Method | Nhóm endpoint | Tỷ lệ |
|---|---|---|---|---|
| | | | auth-heavy / read-heavy / transactional | % |
| | | | | % |
| | | | | % |
| | | | | % |
| **Tổng** | | | | **100%** |

Giải trình phân bố: _______________

### 2.2 Think Time

| Transaction | Min (s) | Max (s) | Loại Timer |
|---|---|---|---|
| | | | Uniform Random |

Spike test: think time = **0 giây**.

### 2.3 Load Profile

| Kịch bản | VU | Ramp-up | Steady | Ramp-down | Tổng thời lượng |
|---|---|---|---|---|---|
| Load (baseline) | | | | | |
| Stress (bậc 1) | | | | | |
| Stress (bậc 2) | | | | | |
| Stress (bậc 3) | | | | | |
| Spike | | | | | |
| Endurance / Soak | | | | | |

Cơ sở chọn số VU: _______________

## 3. Test Data

| File CSV | Cột | Số dòng | Nguồn dữ liệu | Ghi chú |
|---|---|---|---|---|
| users.csv | username,password | | | Đủ số lượng để tránh account lockout? ☐ |
| products.csv | product_id,keyword | | | ID đã verify tồn tại trong DB? ☐ |
| checkout.csv | address,phone,payment | | | Payload đã qua validation? ☐ |

Xử lý account lockout: _______________
Quy trình reset giữa các lần chạy: _______________
Kế hoạch dọn dữ liệu rác sau test: _______________

## 4. Kịch bản end-to-end

```
[Bước 1] ................................ [nhóm endpoint]
   ↓ think time __–__ s
[Bước 2] ................................ [nhóm endpoint]
   ↓ think time __–__ s
[Bước 3] ................................ [nhóm endpoint]
   ↓ think time __–__ s
[Bước 4] ................................ [nhóm endpoint]
   ↓ think time __–__ s
[Bước 5] ................................ [nhóm endpoint]
```

Giải trình phủ nhóm endpoint:
- **auth-heavy** được phủ bởi: _______________
- **read-heavy** được phủ bởi: _______________
- **transactional** được phủ bởi: _______________

## 5. Môi trường thực thi

| Mục | Giá trị |
|---|---|
| Hostname | |
| CPU | |
| RAM | |
| Disk | |
| OS | |
| Công cụ test + version | |
| JVM heap (nếu JMeter) | |
| Máy chạy test và SUT có cùng máy không? | ☐ Có ☐ Không |

Nếu chạy chung một máy, ghi rõ: số liệu sẽ bị ảnh hưởng vì công cụ test và SUT tranh chấp tài nguyên. Đây là hạn chế cần nêu trong phần kết luận.

## 6. Danh sách file đầu ra

| File | Tên đầy đủ | ☐ |
|---|---|---|
| Test plan Load | `{StudentID}_Load_{YYYYMMDD}.jmx` | |
| Test plan Stress | `{StudentID}_Stress_{YYYYMMDD}.jmx` | |
| Test plan Spike | `{StudentID}_Spike_{YYYYMMDD}.jmx` | |
| Raw log ×3 | `.jtl` đầy đủ, không cắt | |
| HTML report ×3 | thư mục riêng | |
| Screenshot tool + monitor cùng khung ×3 | | |
| Hardware report | dxdiag / screenfetch | |
| Kết quả endurance (RPS ổn định tối đa, memory ceiling) | | |
