# Workload Model — EShop SUT

## SUT Overview

- **Application:** EShop — Vietnamese e-commerce demo
- **Backend:** Node.js + Express, port 3000
- **Database:** SQLite (single-file, single-writer)
- **Authentication:** JWT Bearer token

## API Endpoints by Role

### User Flow

| Nhóm | Method | Endpoint | Auth | Ghi chú |
|:---|:---|:---|:---|:---|
| Auth | POST | /api/register | ✗ | Đăng ký tài khoản mới |
| Auth | POST | /api/login | ✗ | Đăng nhập, trả JWT. Bug: login_attempts += 2 mỗi lần sai → 2 lần sai = khoá 3 phút |
| Auth | POST | /api/forgot-password | ✗ | Tạo reset token (4 chữ số) |
| Auth | POST | /api/reset-password | ✗ | Đặt lại mật khẩu bằng reset token |
| Read | GET | /api/products | ✗ | Liệt kê sản phẩm |
| Read | GET | /api/products?search=keyword | ✗ | Tìm kiếm (SQL injection vuln) |
| Read | GET | /api/products/:id | ✗ | Chi tiết sản phẩm |
| Read | GET | /api/categories | ✗ | Liệt kê danh mục |
| Cart | GET | /api/cart | ✓ | Xem giỏ hàng (in-memory) |
| Cart | POST | /api/cart | ✓ | Thêm vào giỏ |
| Order | POST | /api/checkout | ✓ | Tạo đơn hàng |
| Order | GET | /api/orders/my-orders | ✓ | Lịch sử đơn hàng |
| Order | PUT | /api/orders/:id/cancel | ✓ | Huỷ đơn hàng |
| Order | GET | /api/orders/:id | ✗ | Chi tiết đơn hàng |
| Profile | GET | /api/users/me | ✓ | Thông tin cá nhân |
| Profile | PUT | /api/users/me | ✓ | Cập nhật profile |

### Admin Flow

| Nhóm | Method | Endpoint | Auth | Ghi chú |
|:---|:---|:---|:---|:---|
| Auth | POST | /api/login | ✗ | Đăng nhập admin |
| Read | GET | /api/products | ✗ | Liệt kê sản phẩm |
| Read | GET | /api/coupons | ✓ | Liệt kê mã giảm giá |
| Read | GET | /api/admin/users | ✓ | Danh sách users |
| Read | GET | /api/admin/orders | ✓ | Danh sách đơn hàng |
| CRUD | POST | /api/categories | ✓ | Tạo danh mục |
| CRUD | PUT | /api/categories/:id | ✓ | Sửa danh mục |
| CRUD | DELETE | /api/categories/:id | ✓ | Xoá danh mục |
| CRUD | POST | /api/products | ✓ | Tạo sản phẩm |
| CRUD | PUT | /api/products/:id | ✓ | Sửa sản phẩm |
| CRUD | DELETE | /api/products/:id | ✓ | Xoá sản phẩm |
| Import | POST | /api/admin/import-products | ✓ | Import sản phẩm từ CSV (JSON array) |
| Coupon | POST | /api/admin/coupons | ✓ | Tạo mã giảm giá |
| Coupon | DELETE | /api/admin/coupons/:id | ✓ | Xoá mã giảm giá |
| Order | PUT | /api/admin/orders/:id/status | ✓ | Cập nhật trạng thái đơn hàng |

## Seed Data

| Loại | Dữ liệu |
|:---|:---|
| Admin | admin@eshop.com / Admin123! (role: admin) |
| User | test@eshop.com / Test1234! (role: user) |
| Products | 5 sản phẩm (id 1–5): iPhone, Samsung, MacBook, AirPods, Keychron |
| Categories | 3 danh mục: Điện thoại, Laptop, Phụ kiện |
| Coupons | 4 mã: SAVE10 (10%), BIGBUY (50k), VIP100 (100k), EXPIRED (hết hạn) |

## Transaction Distribution (Workload Model)

Dựa trên mô hình thực tế e-commerce (tham khảo nhóm seminar Nhóm 7):

| Transaction | Tỷ lệ | Mô tả |
|:---|:---:|:---|
| Browse / Search Products | 60% | Hành vi phổ biến nhất |
| View Product Details | 25% | Xem chi tiết sau khi browse |
| Add to Cart | 10% | Chỉ một phần nhỏ thêm giỏ |
| Checkout | 5% | Tỷ lệ conversion thấp nhất |

> Với workflow Admin, phân bổ có thể điều chỉnh:
> - Read (products + coupons/orders/users): 60%
> - CRUD operations: 25%
> - Import / Bulk operations: 15%

## Think Time

| Transaction | Think Time | Ghi chú |
|:---|:---|:---|
| Browse / Search | 1–3 giây | Lướt nhanh |
| View Detail | 2–5 giây | Đọc thông tin |
| Add to Cart | 1–2 giây | Quyết định nhanh |
| Checkout | 2–4 giây | Điền thông tin |
| **Spike Test** | **0 giây** | Mô phỏng Flash Sale |

Cấu hình JMeter: `Uniform Random Timer` với `delay` = giá trị min, `range` = (max - min) × 1000 ms.

## Test Profiles

### Load Test (Baseline)
- 50 VUs, ramp-up 60s, hold 180s, ramp-down 60s
- Mục tiêu: Đo hiệu năng ở tải kỳ vọng

### Stress Test (Breaking Point)
- Bậc thang: 50 → 100 → 150 → 200 VUs
- Mỗi bậc: ramp 30s, hold 60s
- Mục tiêu: Tìm điểm gãy (Error Rate > 5% hoặc p95 > 5s)

### Spike Test (Flash Sale)
- Tải nền 20 VUs → đột biến 250 VUs (ramp 10s) → giảm về 20 VUs
- Think Time = 0
- Mục tiêu: Đánh giá khả năng chịu đỉnh tải và phục hồi

### Endurance / Soak Test
- 50 VUs, hold 600–900s (10–15 phút)
- Mục tiêu: Phát hiện memory leak, xác định Max stable RPS

## Performance Metrics

| Chỉ số | Mô tả | Cách đo |
|:---|:---|:---|
| Response Time (Avg, p50, p90, p95, p99) | Thời gian phản hồi | Cột `elapsed` trong .jtl |
| Throughput (RPS) | Số request/giây | Total samples / duration |
| Error Rate (%) | Tỷ lệ lỗi | success=false / total × 100 |
| Latency | TTFB | Cột `Latency` trong .jtl |
| Resource Utilization | CPU, RAM, Disk, Network | Task Manager → node.exe |
