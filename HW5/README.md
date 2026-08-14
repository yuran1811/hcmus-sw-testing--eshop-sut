# HW05 — Performance Testing for EShop SUT

## 1. Thông Tin Sinh Viên
- **Họ và tên:** Ân Tiến Nguyên An
- **MSSV:** 23127148
- **Môn học:** Kiểm thử phần mềm (Software Testing) — FIT @ HCMUS
- **Lớp:** CQ2023/x
- **Branch:** `hw05/23127148-nguyenan`

---

## 2. Mục Tiêu Kiểm Thử Hiệu Năng (HW05 Objectives)

Kiểm thử hiệu năng hệ thống EShop SUT (Backend Node.js/Express + SQLite) bằng công cụ **Apache JMeter** nhằm:
1. **Thiết kế Workload Model thực tế:** Mô phỏng luồng nghiệp vụ Quản trị viên (Admin Flow) bao gồm xác thực (Authentication), quản lý danh mục (Categories CRUD), quản lý sản phẩm (Products & Bulk Import), và truy vấn hệ thống (Read-heavy operations).
2. **Xây dựng kịch bản kiểm thử Data-Driven:** Áp dụng `CSV Data Set Config` để cấp phát dữ liệu tự động cho các Sampler HTTP Request.
3. **Thực thi 4 kịch bản kiểm thử hiệu năng chính:**
   - **Load Test (Baseline):** Đánh giá thời gian phản hồi, thông lượng (RPS) và tỷ lệ lỗi ở mức tải kỳ vọng chuẩn (50 VUs).
   - **Stress Test (Breaking Point):** Kiểm thử tăng tải theo mô hình bậc thang (50 → 100 → 150 → 200 VUs) để tìm giới hạn chịu tải tối đa và điểm gãy của hệ thống.
   - **Spike Test (Flash Sale / Event):** Đánh giá khả năng chịu đột biến tải tức thời (tăng vọt lên 250 VUs trong 10s với Think Time = 0) và tốc độ phục hồi.
   - **Endurance / Soak Test:** Đánh giá độ ổn định lâu dài (10–15 phút), phát hiện rò rỉ bộ nhớ (Memory Leak) và xác định Max Stable RPS.
4. **Thu thập Evidence & Phân tích chuyên sâu:** Thu thập log phần cứng (Task Manager, systeminfo), phân tích file log `.jtl` (p50, p90, p95, p99, Throughput, Error Rate) và lập báo cáo kỹ thuật.

---

## 3. Cấu Trúc Thư Mục HW5

```text
HW5/
├── test-plans/              # Chứa các file kịch bản Apache JMeter (.jmx)
│   ├── 23127148_Load_*.jmx
│   ├── 23127148_Stress_*.jmx
│   └── 23127148_Spike_*.jmx
├── test-data/               # File dữ liệu kiểm thử Data-Driven CSV
│   ├── users.csv            # Tài khoản quản trị viên (admin@eshop.com)
│   ├── categories.csv       # Danh mục sản phẩm (tạo mới & cập nhật)
│   └── products.csv         # Danh sách sản phẩm thực tế cho bulk import
├── results/                 # Kết quả kiểm thử (.jtl và dashboard HTML report)
│   ├── load/
│   ├── stress/
│   ├── spike/
│   └── endurance/
├── evidence/                # Bằng chứng thực thi (Task Manager screenshots, systeminfo)
├── AI Submission/           # Báo cáo kiểm toán AI (AI_Audit_Report.md)
├── Bug Report/              # Báo cáo các lỗi phát hiện trong quá trình test
└── README.md                # Tài liệu tổng quan HW05
```

---

## 4. Dữ Liệu Kiểm Thử (Test Data Overview)

Các tập dữ liệu kiểm thử đã được chuẩn bị tại `HW5/test-data/`:

| File | Số lượng bản ghi | Mục đích sử dụng | Cột dữ liệu |
|:---|:---:|:---|:---|
| [`users.csv`](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW5/test-data/users.csv) | 1 | Đăng nhập Admin lấy JWT Bearer Token | `email,password` |
| [`categories.csv`](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW5/test-data/categories.csv) | 20 | Tạo và cập nhật danh mục sản phẩm | `category_name,updated_name` |
| [`products.csv`](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW5/test-data/products.csv) | 25 | Import sản phẩm qua API `/api/admin/import-products` | `name,price,description,imageUrl,category_id` |

---

## 5. Workload Model & Phân Bổ Tải (Admin Flow)

- **Authentication:** `POST /api/login` (Trích xuất token động bằng JSON Extractor).
- **Read-Heavy (60% Throughput):**
  - `GET /api/products` (Tra cứu sản phẩm)
  - `GET /api/categories` (Tra cứu danh mục)
  - `GET /api/coupons` (Tra cứu mã giảm giá)
  - `GET /api/admin/orders` (Tra cứu đơn hàng toàn hệ thống)
- **Transactional CRUD (25% Throughput):**
  - `POST /api/categories` (Tạo danh mục mới từ `categories.csv`)
  - `PUT /api/categories/:id` (Cập nhật tên danh mục theo `id` động)
- **Bulk Operations (15% Throughput):**
  - `POST /api/admin/import-products` (Import danh sách sản phẩm từ `products.csv`)
