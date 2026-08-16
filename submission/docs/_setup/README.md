# Hướng dẫn thiết lập môi trường — Kiểm thử Hiệu năng EShop

> **Áp dụng cho:** HW05 · Workflow: Checkout with Coupon  
> **Cập nhật:** 2026-08-13

---

## Yêu cầu phần mềm (Prerequisites)

| Phần mềm           | Phiên bản tối thiểu | Mục đích                         |
| ------------------ | ------------------- | -------------------------------- |
| **Node.js**        | 18 LTS              | Chạy backend EShop SUT           |
| **npm**            | 9+                  | Cài đặt dependencies của backend |
| **Apache JMeter**  | 5.6+                | Chạy test plan (`.jmx`)          |
| **Java (JDK/JRE)** | 11+                 | JMeter yêu cầu Java              |
| **Git**            | bất kỳ              | Clone repository                 |

---

## Bước 1 — Clone & cài đặt backend

```bash
# Clone repository
git clone https://github.com/ttbhanh/eshop-sut.git
cd eshop-sut

# Cài đặt dependencies backend
cd backend
npm install
```

---

## Bước 2 — Khởi động backend EShop (SUT)

```bash
# Từ thư mục gốc repo
cd backend
node server.js
```

Mặc định, backend chạy tại **`http://localhost:3000`**.  
Kiểm tra bằng: `curl http://localhost:3000/api/categories`

Lưu ý: Database SQLite (`backend/database.sqlite`) được tạo tự động khi backend khởi động lần đầu. File này không được commit vào git (đã có trong `.gitignore`).

---

## Bước 3 — Seed dữ liệu test hiệu năng

Đây là bước **bắt buộc** trước khi chạy JMeter. Script sẽ:

- Tạo 300 tài khoản `perf_user001@eshop.com` → `perf_user300@eshop.com`
- Đồng bộ coupon `PERFTEST` (giảm 10%, không giới hạn lần dùng) vào DB
- Sinh lại `test-data/users.csv` để khớp với DB thực tế

```bash
# Từ thư mục gốc repo
node submission/tests/1-test-plans/checkout-with-coupon/seed_perf_users.js
```

Kết quả mong đợi gần đúng:

```text
✓ Connected to SQLite database at: ...
✓ Coupon PERFTEST seeded into DB from CSV
✓ Removed ... old perf test users
✓ Inserted 300 performance test users into DB
✓ users.csv written → ...
✓ keywords.csv written → ...
--- LOCKOUT RESET COMMAND (run before each test run) ---
...
✓ Done. DB connection closed.
```

> **Chỉ cần chạy 1 lần**, trừ khi bạn reset database.

---

## Bước 4 — Cài đặt Apache JMeter

### 4.1 — Tải và giải nén

Tải JMeter từ: https://jmeter.apache.org/download_jmeter.cgi  
Chọn phiên bản **5.6.x** (Binary `.zip` hoặc `.tgz`)

```bash
# Ví dụ trên Linux/macOS
tar -xzf apache-jmeter-5.6.3.tgz
export PATH=$PATH:$(pwd)/apache-jmeter-5.6.3/bin

# Trên Windows: giải nén và thêm thư mục bin vào PATH
```

### 4.2 — Verify cài đặt

```bash
jmeter --version
# Output: Apache JMeter 5.6.3 (Phiên bản có thể khác)
```

---

## Bước 5 — Cài đặt JMeter Plugins (Tùy chọn)

Nếu muốn dùng **Ultimate Thread Group** cho stepped ramp-up trong Stress test, cài thêm [JMeter Plugins Manager](https://jmeter-plugins.org/wiki/PluginsManager/).

Các file `.jmx` trong repo **không yêu cầu plugin** — dùng `ThreadGroup` chuẩn.

---

## Bước 6 — Cấu trúc thư mục test

```text
submission/tests/1-test-plans/checkout-with-coupon/
├── 23127115_Load_20260813.jmx      # Load test (50 VUs · 10 phút)
├── 23127115_Stress_20260813.jmx    # Stress test staged load (50 → 100 → 150 → 200 VUs)
├── 23127115_Spike_20260813.jmx     # Spike test (100 VUs · burst 10s)
├── 23127115_Soak_20260815.jmx      # Soak test (130 / 180 / 230 VUs)
├── seed_perf_users.js              # Script seed dữ liệu (bước 3)
├── test-data/
│   ├── users.csv                   # 300 tài khoản test (7 cột)
│   ├── coupons.csv                 # Định nghĩa coupon PERFTEST
│   └── keywords.csv                # Từ khóa tìm kiếm sản phẩm
└── (artifact chính thức)           # Ghi vào submission/tests/2-test-runs/checkout-with-coupon/
```

---

## Bước 7 — Chạy test bằng JMeter GUI

```bash
# Mở JMeter GUI (để debug/verify trước khi chạy headless)
jmeter -t submission/tests/1-test-plans/checkout-with-coupon/23127115_Load_20260813.jmx
```

> **Không dùng GUI để chạy test thực tế** — GUI ngốn nhiều tài nguyên, ảnh hưởng kết quả đo.

---

## Bước 8 — Chạy test headless (CLI) — Cách khuyến nghị

Đặt thư mục làm việc là gốc repo để đường dẫn CSV tương đối (`test-data/users.csv`) hoạt động đúng:

```bash
# ── LOAD TEST ──────────────────────────────────────────────────────
jmeter -n \
  -t submission/tests/1-test-plans/checkout-with-coupon/23127115_Load_20260813.jmx \
  -l submission/tests/2-test-runs/checkout-with-coupon/load/20260813-load-official.jtl \
  -e -o submission/tests/2-test-runs/checkout-with-coupon/load/html-report/

# ── STRESS TEST ────────────────────────────────────────────────────
jmeter -n \
  -t submission/tests/1-test-plans/checkout-with-coupon/23127115_Stress_20260813.jmx \
  -l submission/tests/2-test-runs/checkout-with-coupon/stress/20260813-stress-official.jtl \
  -e -o submission/tests/2-test-runs/checkout-with-coupon/stress/html-report/

# ── SPIKE TEST ─────────────────────────────────────────────────────
jmeter -n \
  -t submission/tests/1-test-plans/checkout-with-coupon/23127115_Spike_20260813.jmx \
  -l submission/tests/2-test-runs/checkout-with-coupon/spike/20260813-spike-official.jtl \
  -e -o submission/tests/2-test-runs/checkout-with-coupon/spike/html-report/

# ── SOAK TEST ──────────────────────────────────────────────────────
jmeter -n \
  -Jusers=130 -Jrampup=180 -Jduration=720 -Jthink_mean=1500 -Jthink_range=200.0 \
  -t submission/tests/1-test-plans/checkout-with-coupon/23127115_Soak_20260815.jmx \
  -l submission/tests/2-test-runs/checkout-with-coupon/soak/20260815-soak-130vu.jtl \
  -e -o submission/tests/2-test-runs/checkout-with-coupon/soak/html-report-130vu/
```

Cờ `-e -o <dir>` tự động sinh **HTML Dashboard Report** vào thư mục chỉ định.

---

## Reset tài khoản sau Stress/Spike test

Nếu nhiều lần đăng nhập sai dẫn đến **account lockout**, chạy lệnh SQL sau trực tiếp trên SQLite:

```bash
# Sử dụng sqlite3 CLI
sqlite3 backend/database.sqlite \
  "UPDATE users SET login_attempts = 0, locked_until = NULL WHERE email LIKE 'perf_user%@eshop.com';"
```

Hoặc dùng Node.js:

```bash
node -e "
const Database = require('./backend/node_modules/sqlite3').verbose().Database;
const db = new Database('./backend/database.sqlite');
db.run(\"UPDATE users SET login_attempts = 0, locked_until = NULL WHERE email LIKE 'perf_user%@eshop.com'\",
  (err) => { console.log(err || 'Reset OK'); db.close(); });
"
```

---

## Kiểm tra trước khi chạy (Pre-run Checklist)

- [ ] Backend đang chạy tại `http://localhost:3000` và trả về 200 cho `/api/categories`
- [ ] `seed_perf_users.js` đã chạy thành công (300 users, coupon PERFTEST tồn tại trong DB)
- [ ] Thư mục `submission/tests/2-test-runs/checkout-with-coupon/` tồn tại và JMeter có quyền ghi vào
- [ ] Không có file `.jtl` cũ cùng tên (xóa hoặc đổi tên trước nếu muốn giữ lại)
- [ ] Verify response shape bằng Postman trước lần chạy đầu tiên (xem phần Lưu ý bên dưới)

---

## Lưu ý quan trọng — Cần verify thủ công

> Các điểm sau cần kiểm tra bằng **Postman hoặc curl** trước khi chạy, vì JMX đã giả định một số response shape:

| Vấn đề                    | Giả định trong JMX                | Cách verify                                     |
| ------------------------- | --------------------------------- | ----------------------------------------------- |
| Login response field name | `$.token` và `$.user.id`          | `POST /api/login` → inspect response JSON       |
| Checkout response field   | `$.orderId`                       | `POST /api/checkout` → inspect response JSON    |
| Checkout status code      | 200 hoặc 201 (OR assertion)       | `POST /api/checkout` → xem status code thực tế  |
| Cart payload fields       | `{id, name, price, quantity}`     | Xem backend source hoặc test Postman            |
| Products search response  | Mảng JSON, `$[0].id`              | `GET /api/products?search=iPhone` → inspect     |
| Coupon total input        | `cart_total = product × quantity` | So sánh request body với dữ liệu CSV và backend |

---

## Kết quả soak đã xác nhận

- `130 VUs`: ổn định, `0%` lỗi, `p95 21 ms`
- `180 VUs`: ổn định, `0%` lỗi, `p95 20 ms`
- `230 VUs`: vẫn `0%` lỗi, raw `p95 35 ms`, raw `p99 84 ms`; late-run p95 tăng đến `94 ms`, cho thấy tail latency bắt đầu suy giảm

Kết luận thực nghiệm hiện tại:

- Ngưỡng ổn định bảo thủ: `180 VUs`
- Vùng bắt đầu suy giảm sớm: `230 VUs`

---

## Giám sát tài nguyên trong khi test

Chạy song song với JMeter để capture resource usage. Các lệnh dưới đây dùng Bash trên Linux/macOS hoặc môi trường có `procps`/`sysstat`:

```bash
# Quan sát tương tác toàn hệ thống
htop

# Hoặc ghi CPU/RAM toàn hệ thống mỗi 5 giây
vmstat 5 | tee resource.log

# Theo dõi riêng tiến trình backend Node.js nếu đã cài pidstat
backend_pid=$(pgrep -n -f 'node backend/server.js')
pidstat -p "$backend_pid" -r -u 5 | tee backend-resource.log
```

Nếu lần chạy chính thức thực hiện trên Windows, vẫn có thể dùng Task Manager để chụp bằng chứng GUI; các lệnh tự động hóa và ví dụ CLI trong hồ sơ được chuẩn hóa theo Bash.
