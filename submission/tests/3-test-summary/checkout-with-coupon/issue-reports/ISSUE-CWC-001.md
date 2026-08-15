---
name: Bug report
about: Create a report to help us improve
title: '[PERF][Checkout with Coupon][Stress] Xuất hiện khoảng suy giảm hiệu năng ngắn gần phút 12 dưới tải cộng dồn'
labels: 'type: performance, module: checkout, severity: medium, priority: P2, status: new, found-by: jmeter'
assignees: ''
---

- **Test Scenario:** Stress Test — Checkout with Coupon
- **Test Plan File:** [23127115_Stress_20260813.jmx](../../../1-test-plans/checkout-with-coupon/23127115_Stress_20260813.jmx)
- **Raw Result File:** [20260813-stress-official.jtl](../../../2-test-runs/checkout-with-coupon/stress/20260813-stress-official.jtl)

## Requirement liên quan

- FR-02: Đăng nhập và khóa tài khoản
- FR-05: Danh sách và tìm kiếm sản phẩm
- FR-07: Giỏ hàng
- FR-08: Thanh toán
- FR-09: Mã giảm giá
- FR-11: Xem lịch sử đơn hàng

## Environment

- Tool: Apache JMeter 5.6.3
- OS: Windows 11 Pro 64-bit (10.0, Build 26200)
- Hostname: `QUOCTAN`
- CPU: `12th Gen Intel(R) Core(TM) i7-1260P` (`16 logical CPUs`)
- RAM: `16 GB`
- URL: `http://localhost:3000`
- Test date: `2026-08-13`

## Steps to reproduce

1. Khởi động backend EShop tại `http://localhost:3000`.
2. Chạy script seed:
   ```bash
   node submission/tests/1-test-plans/checkout-with-coupon/seed_perf_users.js
   ```
3. Chạy stress test:
   ```bash
   jmeter -n \
     -t submission/tests/1-test-plans/checkout-with-coupon/23127115_Stress_20260813.jmx \
     -l submission/tests/2-test-runs/checkout-with-coupon/stress/20260813-stress-official.jtl \
     -e -o submission/tests/2-test-runs/checkout-with-coupon/stress/html-report/
   ```
4. Mở JTL hoặc HTML report và quan sát phân bố lỗi / latency theo từng cửa sổ thời gian.

## Expected result

- Hệ thống có thể chậm dần khi tải tăng, nhưng không nên xuất hiện một khoảng suy giảm ngắn với tail latency tăng mạnh và lỗi request bị dồn cụm.
- Các endpoint trong workflow nên giữ mức đáp ứng tương đối ổn định khi tổng tải tăng theo từng stage.

## Actual result

- Stress test hoàn thành toàn bộ workflow, nhưng xuất hiện một khoảng suy giảm ngắn gần `phút 12`.
- Tại khoảng này:
  - tỷ lệ lỗi theo cửa sổ phút đạt `0.585%`
  - `p95` theo cửa sổ phút tăng lên `1247 ms`
- Các request lỗi tập trung nhiều nhất ở:
  - `Step 3 GET /api/products?search=`: `17` lỗi
  - `Step 7 GET /api/orders/my-orders`: `18` lỗi
  - `Step 2 GET /api/categories`: `6` lỗi

## Evidence

### 1. Tóm tắt kết quả chính thức

- Total samples: `138,180`
- Failures: `41`
- Overall error rate: `0.03%`
- Throughput: `115.276 req/s`
- Overall `p95`: `259 ms`
- Overall `p99`: `925 ms`
- Max response time: `3486 ms`
- First clear degradation point: khoảng `phút 12`

### 2. Artifact liên quan

- Test plan:
  - `submission/tests/1-test-plans/checkout-with-coupon/23127115_Stress_20260813.jmx`
- Raw JTL:
  - `submission/tests/2-test-runs/checkout-with-coupon/stress/20260813-stress-official.jtl`
- HTML report:
  - `submission/tests/2-test-runs/checkout-with-coupon/stress/html-report/`
- Resource screenshot:
  - `submission/tests/2-test-runs/checkout-with-coupon/stress/stress-resource.png`
- Summary:
  - `submission/tests/3-test-summary/checkout-with-coupon/test-summary.md`

### 3. Diễn giải kỹ thuật

Hiện tượng này hiện được ghi nhận như một **quan sát hiệu năng**, chưa phải lỗi đã xác nhận, vì:

- khoảng suy giảm chỉ xuất hiện trong một giai đoạn ngắn
- hệ thống không crash và tỷ lệ lỗi tổng vẫn thấp
- bài test được chạy trên localhost nên tài nguyên host có thể ảnh hưởng kết quả

Tuy vậy, đây vẫn là tín hiệu đáng theo dõi vì sự tăng đột ngột của tail latency không đồng đều theo stage thường là dấu hiệu của bottleneck ngắn hạn ở tầng query, I/O, hoặc tranh chấp tài nguyên backend.

## Hướng theo dõi tiếp theo

1. Chạy lại stress scenario thêm ít nhất một lần để xem khoảng suy giảm có lặp lại gần cùng stage hay không.
2. Đối chiếu log backend quanh phút `12`.
3. Kiểm tra riêng 2 nhóm endpoint có nhiều lỗi nhất:
   - `GET /api/products?search=`
   - `GET /api/orders/my-orders`
4. So sánh minute-window latency giữa các stage `50 → 100 → 150 → 200 VUs`.

## GitHub Issue

- Not yet.
