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

```
submission/tests/1-test-plans/checkout-with-coupon/
├── 23127115_Load_20260813.jmx      # Load test (50 VUs · 10 phút)
├── 23127115_Stress_20260813.jmx    # Stress test staged load (50 → 100 → 150 → 200 VUs)
├── 23127115_Spike_20260813.jmx     # Spike test (100 VUs · burst 10s)
├── seed_perf_users.js              # Script seed dữ liệu (bước 3)
├── test-data/
│   ├── users.csv                   # 300 tài khoản test (7 cột)
│   ├── coupons.csv                 # Định nghĩa coupon PERFTEST
│   └── keywords.csv                # Từ khóa tìm kiếm sản phẩm
└── results/                        # JMeter ghi file .jtl vào đây
    ├── load.jtl
    ├── stress.jtl
    └── spike.jtl
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
  -l submission/tests/1-test-plans/checkout-with-coupon/results/load.jtl \
  -e -o submission/tests/1-test-plans/checkout-with-coupon/results/load-report/

# ── STRESS TEST ────────────────────────────────────────────────────
jmeter -n \
  -t submission/tests/1-test-plans/checkout-with-coupon/23127115_Stress_20260813.jmx \
  -l submission/tests/1-test-plans/checkout-with-coupon/results/stress.jtl \
  -e -o submission/tests/1-test-plans/checkout-with-coupon/results/stress-report/

# ── SPIKE TEST ─────────────────────────────────────────────────────
jmeter -n \
  -t submission/tests/1-test-plans/checkout-with-coupon/23127115_Spike_20260813.jmx \
  -l submission/tests/1-test-plans/checkout-with-coupon/results/spike.jtl \
  -e -o submission/tests/1-test-plans/checkout-with-coupon/results/spike-report/
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
- [ ] Thư mục `results/` tồn tại và JMeter có quyền ghi vào
- [ ] Không có file `.jtl` cũ cùng tên (xóa hoặc đổi tên trước nếu muốn giữ lại)
- [ ] Verify response shape bằng Postman trước lần chạy đầu tiên (xem phần Lưu ý bên dưới)

---

## Lưu ý quan trọng — Cần verify thủ công

> Các điểm sau cần kiểm tra bằng **Postman hoặc curl** trước khi chạy, vì JMX đã giả định một số response shape:

| Vấn đề                    | Giả định trong JMX            | Cách verify                                    |
| ------------------------- | ----------------------------- | ---------------------------------------------- |
| Login response field name | `$.token` và `$.user.id`        | `POST /api/login` → inspect response JSON            |
| Checkout response field   | `$.orderId`                     | `POST /api/checkout` → inspect response JSON         |
| Checkout status code      | 200 hoặc 201 (OR assertion)     | `POST /api/checkout` → xem status code thực tế       |
| Cart payload fields       | `{id, name, price, quantity}`   | Xem backend source hoặc test Postman                 |
| Products search response  | Mảng JSON, `$[0].id`            | `GET /api/products?search=iPhone` → inspect          |
| Coupon total input        | `cart_total = product × quantity` | So sánh request body với dữ liệu CSV và backend    |

---

## Giám sát tài nguyên trong khi test

Chạy song song với JMeter để capture resource usage:

```powershell
# Windows — Task Manager (GUI)
# Hoặc PowerShell để log theo thời gian:
while ($true) {
  $cpu = (Get-Counter '\Processor(_Total)\% Processor Time').CounterSamples[0].CookedValue
  $mem = (Get-Counter '\Memory\Available MBytes').CounterSamples[0].CookedValue
  "$(Get-Date -Format 'HH:mm:ss') CPU: $([math]::Round($cpu,1))%  RAM avail: ${mem}MB" | Tee-Object -Append perf_resource.log
  Start-Sleep 5
}
```

```bash
# Linux/macOS
htop
# Hoặc
vmstat 5 > resource.log &
```
