# k6 Blueprint

Đọc file này khi sinh script k6 hoặc khi cần ánh xạ khái niệm JMeter sang k6.

## 1. Ánh xạ khái niệm

| JMeter | k6 | Ghi chú |
|---|---|---|
| Thread Group | `options.stages` hoặc `scenarios` | k6 mô tả load profile bằng code |
| Number of Threads | VUs | |
| Ramp-up Period | `stages` với `target` tăng dần | |
| Sampler (HTTP Request) | `http.get()` / `http.post()` | |
| Timer | `sleep()` | |
| Assertion | `check()` | check **không** làm fail test, chỉ ghi nhận tỷ lệ |
| — (không có tương đương trực tiếp) | `thresholds` | Đây mới là thứ quyết định pass/fail của cả test |
| CSV Data Set Config | `SharedArray` + `papaparse` / `open()` | |
| Transaction Controller | `group()` | |
| Listener / Report | `--summary-export`, `--out json=`, handleSummary() | |

Điểm khác biệt cần nắm: trong JMeter, assertion fail làm sample bị đánh dấu fail. Trong k6, `check()` fail **không** làm test fail — muốn test trả exit code khác 0 phải khai báo `thresholds`. Đây là lý do nhiều script k6 do AI sinh ra luôn "pass" dù hệ thống hỏng.

## 2. Ba report view khác nhau (yêu cầu 3 loại output không trùng)

| Test plan | Output k6 | Tương đương JMeter |
|---|---|---|
| Load | `--summary-export=summary.json` (end-of-test summary) | Summary Report |
| Stress | `--out json=raw.json` rồi tổng hợp percentile theo bậc tải | Aggregate Report |
| Spike | `handleSummary()` xuất HTML + log từng request lỗi qua `--http-debug` hoặc console.error trong check fail | View Results Tree |

## 3. Khung script mẫu

```javascript
import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';

// SharedArray: nạp file 1 lần, chia sẻ cho mọi VU — tránh mỗi VU ngốn 1 bản copy
const users = new SharedArray('users', function () {
  return JSON.parse(open('./data/users.json'));
});
const products = new SharedArray('products', function () {
  return JSON.parse(open('./data/products.json'));
});

const BASE = __ENV.BASE_URL || 'http://localhost:3000';

export const options = {
  // ---- LOAD (baseline) ----
  stages: [
    { duration: '1m', target: 50 },   // ramp-up
    { duration: '3m', target: 50 },   // steady-state
    { duration: '1m', target: 0 },    // ramp-down
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000', 'p(99)<4000'],
    http_req_failed: ['rate<0.01'],
    'group_duration{group:::05 - Checkout}': ['p(95)<3000'],
  },
};

export default function () {
  const user = users[__VU % users.length];
  const product = products[randomIntBetween(0, products.length - 1)];
  let token;

  group('01 - Login', function () {                      // auth-heavy
    const res = http.post(`${BASE}/api/auth/login`,
      JSON.stringify({ username: user.username, password: user.password }),
      { headers: { 'Content-Type': 'application/json' } });

    check(res, {
      'login status 200': (r) => r.status === 200,
      'nhan duoc token': (r) => r.json('token') !== undefined,
      // phân biệt sai mật khẩu với tài khoản bị khoá
      'khong bi account lockout': (r) => r.status !== 423 &&
        !String(r.body).toLowerCase().includes('locked'),
    });
    token = res.json('token');
  });

  const authHeaders = {
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  };

  sleep(randomIntBetween(1, 3));

  group('02 - Browse/Search', function () {              // read-heavy
    const res = http.get(`${BASE}/api/products?search=${product.keyword}`, authHeaders);
    check(res, { 'search status 200': (r) => r.status === 200 });
  });

  sleep(randomIntBetween(2, 5));

  group('03 - Product Detail', function () {             // read-heavy
    const res = http.get(`${BASE}/api/products/${product.id}`, authHeaders);
    check(res, { 'detail status 200': (r) => r.status === 200 });
  });

  sleep(randomIntBetween(1, 2));

  group('04 - Add to Cart', function () {                // transactional
    const res = http.post(`${BASE}/api/cart`,
      JSON.stringify({ productId: product.id, quantity: 1 }), authHeaders);
    check(res, { 'add to cart ok': (r) => r.status === 200 || r.status === 201 });
  });

  sleep(randomIntBetween(2, 4));

  group('05 - Checkout', function () {                   // transactional
    const res = http.post(`${BASE}/api/orders`,
      JSON.stringify({ address: user.address, payment: 'COD' }), authHeaders);
    check(res, {
      'checkout ok': (r) => r.status === 200 || r.status === 201,
      'co order_id': (r) => r.json('order_id') !== undefined,
    });
  });
}
```

## 4. Biến thể theo kịch bản

Chỉ thay khối `options`, giữ nguyên hàm `default`:

```javascript
// ---- STRESS: bậc thang tới điểm gãy ----
stages: [
  { duration: '1m', target: 50 },
  { duration: '2m', target: 50 },
  { duration: '1m', target: 100 },
  { duration: '2m', target: 100 },
  { duration: '1m', target: 200 },
  { duration: '2m', target: 200 },
  { duration: '1m', target: 400 },
  { duration: '2m', target: 400 },
  { duration: '1m', target: 0 },
],

// ---- SPIKE: dồn tải tức thời, think time = 0 ----
stages: [
  { duration: '30s', target: 50 },
  { duration: '30s', target: 500 },   // spike
  { duration: '1m',  target: 500 },
  { duration: '30s', target: 50 },
  { duration: '30s', target: 0 },
],

// ---- SOAK / ENDURANCE: tải ổn định kéo dài ----
stages: [
  { duration: '1m',  target: 50 },
  { duration: '15m', target: 50 },
  { duration: '1m',  target: 0 },
],
```

Với Spike, thay toàn bộ `sleep(randomIntBetween(a,b))` bằng `sleep(0)` hoặc bỏ hẳn. Nên đưa think time vào một hằng số ở đầu file để chuyển đổi giữa các kịch bản không phải sửa rải rác.

Với Stress, đặt threshold **lỏng hơn** hoặc bỏ threshold — mục đích là tìm điểm gãy, không phải pass/fail. Nếu để threshold chặt như Load test, k6 sẽ abort trước khi kịp chạm điểm gãy (nhất là khi có `abortOnFail`).

## 5. Lệnh chạy

```bash
# Load
k6 run --summary-export=results/load_summary.json \
       -e BASE_URL=http://localhost:3000 \
       25127001_Load_20260810.js

# Stress, xuất raw JSON để tự tính percentile theo bậc
k6 run --out json=results/stress_raw.json 25127001_Stress_20260810.js

# Chạy nền và ghi log console
k6 run script.js 2>&1 | tee results/spike_console.log
```

k6 **không tự theo dõi tài nguyên hệ thống** — đây là hạn chế cố hữu. Phải chạy song song htop/Task Manager và ghi hình cùng khung với terminal k6.

## 6. Chuyển .jtl ↔ k6

k6 không sinh file `.jtl`. Nếu yêu cầu bắt buộc nộp `.jtl`, chạy JMeter làm công cụ chính và dùng k6 như phần bonus/đối chứng — đừng thay thế hoàn toàn. Khi so sánh kết quả giữa hai công cụ, nhớ rằng cùng một cấu hình VU sẽ tạo ra throughput khác nhau vì k6 nhẹ hơn đáng kể trên cùng phần cứng.
