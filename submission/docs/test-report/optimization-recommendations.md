# Đề Xuất Phương Án Tối Ưu Hóa Hiệu Năng

> **Phiên bản:** 1.1 - 2026-08-16  
> **SUT:** Node.js/Express với SQLite (`sqlite3`)  
> **Workflow:** `checkout-with-coupon`  
> **Mục đích:** Đề xuất các thay đổi có thể giảm latency, giảm contention và cải thiện throughput dựa trên raw JTL cùng mã nguồn hiện tại.

## Mục lục

- [1. Tóm tắt điều hành](#1-tóm-tắt-điều-hành)
- [2. Bằng chứng và giới hạn](#2-bằng-chứng-và-giới-hạn)
- [3. Nguyên tắc ưu tiên](#3-nguyên-tắc-ưu-tiên)
- [4. Đề xuất tối ưu hóa](#4-đề-xuất-tối-ưu-hóa)
- [5. Connection pool sau migration](#5-connection-pool-sau-migration)
- [6. Lộ trình triển khai](#6-lộ-trình-triển-khai)
- [7. Kế hoạch benchmark và tiêu chí chấp nhận](#7-kế-hoạch-benchmark-và-tiêu-chí-chấp-nhận)
- [8. Kết luận](#8-kết-luận)

## 1. Tóm tắt điều hành

Kết quả raw JTL cho thấy hệ thống có latency rất thấp ở Load và Soak 130/180, nhưng xuất hiện dấu hiệu contention hoặc queueing khi tải cao:

| Bằng chứng                        |                                                                Giá trị raw | Ý nghĩa tối ưu hóa                                                                                          |
| --------------------------------- | -------------------------------------------------------------------------: | ----------------------------------------------------------------------------------------------------------- |
| Stress `Step 5 POST apply-coupon` |                                 p95 `427 ms`, p99 `1288 ms`, max `3486 ms` | Ưu tiên kiểm tra lookup coupon và `coupon_usage`, SQLite lock contention và event-loop queue.               |
| Stress failures                   |       `41/41` là `success=false`, HTTP `200`, Duration Assertion `2000 ms` | Đây là request vượt ngưỡng thời gian, không phải HTTP error; cần giảm latency và xác minh lock/query plan.  |
| Stress failure labels             |                              Products `17`, My Orders `18`, Categories `6` | Các read endpoint cũng bị ảnh hưởng khi tải cộng dồn; không nên chỉ tối ưu `apply-coupon`.                  |
| Spike                             | `34` failures; `7` samples `elapsed > 5000 ms`, gồm cụm `480762-481450 ms` | Cần điều tra request bị treo, SQLite contention và behavior khi shutdown; không chỉ bỏ qua max như outlier. |
| Soak 230 late-run                 |               p95 theo minute 8/9/10/11: `25/44/58/94 ms`, error rate `0%` | Có tail-latency trend; cần theo dõi queueing và tài nguyên trước khi scale tải cao hơn.                     |

Thứ tự ưu tiên đề xuất:

1. Thêm index có bằng chứng trực tiếp từ query và kiểm tra bằng `EXPLAIN QUERY PLAN`.
2. Bật SQLite WAL và busy timeout trong môi trường benchmark, sau đó đo lại lock contention.
3. Dùng prepared statement/parameterized query và tối ưu truy vấn search.
4. Giảm round trip và tăng tính nguyên tử của checkout/coupon usage bằng transaction.
5. Chỉ dùng connection pool nếu chuyển sang PostgreSQL/MySQL; không thêm pool kiểu server database một cách máy móc cho SQLite hiện tại.
6. Cân nhắc cache hoặc đổi database khi workload vượt giới hạn phù hợp của SQLite.

## 2. Bằng chứng và giới hạn

### 2.1. Query hiện tại liên quan đến workflow

Backend hiện có các query chính:

```sql
SELECT * FROM users WHERE email = ?;
SELECT * FROM products WHERE name LIKE '%<search>%';
SELECT * FROM categories;
INSERT INTO orders (user_id, total_amount, status, shipping_address)
VALUES (?, ?, ?, ?);
SELECT * FROM orders WHERE user_id = ? ORDER BY id DESC;
SELECT * FROM coupons WHERE code = ? AND is_active = 1;
SELECT COUNT(*) AS usage_count
FROM coupon_usage
WHERE coupon_id = ? AND user_id = ?;
```

Các bảng được tạo trong `backend/database.js` hiện chưa có index phụ cho `users.email`, `orders.user_id`, `coupon_usage(coupon_id,user_id)` hoặc `coupons(code,is_active)`. Khóa chính `id` đã được SQLite index tự động.

### 2.2. Giới hạn của bằng chứng

Raw JTL cho biết latency, failure và timestamp nhưng không cho biết trực tiếp:

- query plan hoặc số row được scan;
- thời gian chờ lock SQLite;
- CPU, memory RSS, event-loop delay;
- thời gian nằm trong database so với thời gian nằm trong Node.js;
- cache hit/miss.

Vì vậy p95 cao là symptom để ưu tiên điều tra, không đủ để khẳng định một index hoặc WAL chắc chắn là nguyên nhân. Mỗi thay đổi phải được benchmark A/B trên cùng dữ liệu, cùng profile JMeter và cùng hardware.

## 3. Nguyên tắc ưu tiên

| Mức | Ý nghĩa                                                     | Cách xử lý                                                   |
| --- | ----------------------------------------------------------- | ------------------------------------------------------------ |
| P0  | Ảnh hưởng correctness, security hoặc request bị treo        | Sửa trước các benchmark tiếp theo.                           |
| P1  | Có liên hệ trực tiếp với hotspot hoặc failure trong raw JTL | Benchmark riêng, sau đó chạy lại Stress/Spike.               |
| P2  | Có thể cải thiện ở tải lớn nhưng cần thay đổi kiến trúc     | Chỉ triển khai sau khi P1 không đủ hoặc workload đã mở rộng. |

Không nên gộp nhiều thay đổi trong một lần đo. Nếu bật WAL, thêm index và thêm cache cùng lúc thì không thể biết thay đổi nào tạo ra kết quả.

## 4. Đề xuất tối ưu hóa

### 4.1. Thêm index cho các lookup chính

**Mức ưu tiên:** P1  
**Phân loại:** Applicable candidate, cần xác minh bằng query plan.

Các index đề xuất:

```sql
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email
ON users(email);

CREATE INDEX IF NOT EXISTS idx_orders_user_id_id_desc
ON orders(user_id, id DESC);

CREATE INDEX IF NOT EXISTS idx_coupon_usage_coupon_user
ON coupon_usage(coupon_id, user_id);

CREATE INDEX IF NOT EXISTS idx_coupons_code_active
ON coupons(code, is_active);
```

**Lý do:**

- Login thực hiện lookup chính xác theo `email` ở mọi iteration.
- `GET /api/orders/my-orders` lọc theo `user_id` và sắp xếp `id DESC`; composite index có thể giảm scan và sort.
- `apply-coupon` lookup coupon theo `code`/`is_active` rồi đếm usage theo cặp `coupon_id,user_id`.
- Stress cho thấy `apply-coupon` p95 `427 ms` và p99 `1288 ms`; My Orders có `18` Duration Assertion failures.

**Điều kiện và rủi ro:**

- `users.email` phải thật sự unique về mặt nghiệp vụ; nếu dữ liệu cũ có duplicate thì unique index sẽ fail.
- Index tăng chi phí insert/update và dung lượng database.
- `idx_coupons_code_active` có thể không cần thiết nếu `code` đã được tạo unique index tự động bởi SQLite. Cần kiểm tra `PRAGMA index_list(coupons)` trước khi tạo index trùng.
- `backend/database.js` hiện drop và tạo lại bảng khi khởi động. Index phải được tạo sau `CREATE TABLE` trong setup test hoặc migration; không nên dùng cách drop/recreate trong môi trường production.

**Cách xác minh:**

```sql
EXPLAIN QUERY PLAN SELECT * FROM users WHERE email = ?;
EXPLAIN QUERY PLAN
SELECT * FROM orders WHERE user_id = ? ORDER BY id DESC;
EXPLAIN QUERY PLAN
SELECT COUNT(*) FROM coupon_usage WHERE coupon_id = ? AND user_id = ?;
```

Kết quả mong muốn là query dùng `SEARCH ... USING INDEX`, không phải full table scan. Sau đó đo riêng latency p95/p99 của từng sampler.

### 4.2. Bật SQLite WAL và busy timeout

**Mức ưu tiên:** P1  
**Phân loại:** Conditional; phải đo trước/sau.

WAL cho phép reader tiếp tục đọc trong khi writer ghi trong nhiều tình huống, phù hợp với workflow có nhiều read endpoint và các write từ login, cart, checkout, coupon usage. Busy timeout giúp SQLite chờ lock trong một khoảng hữu hạn thay vì fail ngay khi contention ngắn.

Có thể cấu hình một lần sau khi mở database:

```js
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Could not connect to database', err);
    return;
  }

  db.configure('busyTimeout', 5000);
  db.exec('PRAGMA journal_mode = WAL;');
  db.exec('PRAGMA synchronous = NORMAL;');
});
```

**Lưu ý:**

- WAL không biến SQLite thành database write-scalable vô hạn; vẫn chỉ có giới hạn writer và có thể phát sinh WAL checkpoint.
- `busyTimeout` làm request chờ lâu hơn khi lock bị giữ; nếu đặt quá cao, p95 có thể tăng thay vì giảm.
- `synchronous=NORMAL` là trade-off durability/performance, không nên bật nếu yêu cầu durability nghiêm ngặt chưa được thống nhất.
- Không kết luận WAL có hiệu quả chỉ vì hệ thống dùng SQLite. Phải đo lock wait, failure count và p95/p99.

**Cách xác minh:** chạy cùng Stress profile với WAL off/on, theo dõi `success=false`, minute-window p95, total throughput và SQLite lock errors. Nếu p95 giảm nhưng Spike vẫn có request `elapsed` hàng trăm giây, WAL không giải quyết toàn bộ vấn đề.

### 4.3. Dùng prepared statement và parameterized search

**Mức ưu tiên:** P0 cho security/correctness, P1 cho hiệu năng  
**Phân loại:** Applicable.

Query Products hiện nối trực tiếp `searchQuery` vào SQL:

```js
const query = `SELECT * FROM products WHERE name LIKE '%${searchQuery}%'`;
```

Nên chuyển thành:

```js
db.all(
  'SELECT id, name, price, description, imageUrl, category_id ' + 'FROM products WHERE name LIKE ?',
  [`%${searchQuery}%`],
  (err, rows) => {
    // handle err and return rows
  },
);
```

Điều này loại bỏ SQL injection và giúp SQLite dùng parameter binding nhất quán. Tuy nhiên index B-tree thông thường không cải thiện tốt `LIKE '%keyword%'` vì leading wildcard. Nếu catalog lớn, cân nhắc:

- FTS5 cho full-text search;
- prefix search `keyword%` nếu sản phẩm cho phép đổi semantics;
- giới hạn số row trả về bằng pagination;
- chỉ select các cột cần cho workflow thay vì `SELECT *`.

Raw Stress có `17` failure ở Products, nhưng đó là Duration Assertion với HTTP `200`, không tự chứng minh SQL injection, full scan hoặc FTS là nguyên nhân. Đây là hướng cải tiến cần benchmark trên dataset lớn hơn.

### 4.4. Tối ưu transaction của checkout và coupon usage

**Mức ưu tiên:** P1 cho consistency, P2 cho hiệu năng  
**Phân loại:** Conditional, cần thay đổi API flow.

Hiện checkout insert order ở `/api/checkout`, còn ghi `coupon_usage` là endpoint riêng `/api/coupon-usage`. Hai operation có thể tạo round trip và trạng thái không nhất quán nếu một bước thành công, bước sau thất bại.

Nên gom các thao tác liên quan vào một transaction ở server:

```sql
BEGIN;
INSERT INTO orders (...);
INSERT INTO coupon_usage (coupon_id, user_id) VALUES (?, ?);
COMMIT;
```

Nếu bất kỳ thao tác nào lỗi thì `ROLLBACK`. Với `sqlite3`, phải bảo đảm các statement được chạy tuần tự trên cùng connection và có callback/error handling rõ ràng.

**Tác động kỳ vọng:** giảm round trip giữa client và server, giữ trạng thái order/coupon nhất quán và giúp phân tích failure dễ hơn. Đây không phải tối ưu p95 chắc chắn; transaction dài hoặc lock lâu có thể làm write contention tăng, nên cần đo lại.

### 4.5. Tái sử dụng prepared statement cho hot path

**Mức ưu tiên:** P1 nhỏ  
**Phân loại:** Applicable candidate.

Các query chạy ở mọi iteration như login, order lookup và coupon usage có thể được tạo bằng `db.prepare()` và tái sử dụng thay vì parse SQL ở mỗi request. Cần quản lý lifecycle của statement và finalize khi shutdown.

Đây là tối ưu micro-level; không nên kỳ vọng nó tự giải quyết p95 Stress `427 ms` hoặc các Spike request `481 s`. Chỉ giữ thay đổi này nếu benchmark cho thấy CPU parse/prepare có ý nghĩa.

### 4.6. Giảm dữ liệu đọc và response payload

**Mức ưu tiên:** P2  
**Phân loại:** Applicable candidate.

Nhiều endpoint dùng `SELECT *`. Có thể chuyển sang projection cụ thể:

- Login chỉ đọc các cột cần xác thực và tạo JWT.
- My Orders chỉ trả các cột UI cần dùng.
- Products chỉ trả các trường được workflow sử dụng.

Giảm payload có thể làm giảm bytes, serialization và thời gian response. Tuy nhiên với dataset hiện tại nhỏ, tác động có thể không đáng kể; cần đo trên dữ liệu có kích thước thực tế hơn.

### 4.7. Cache dữ liệu read-heavy

**Mức ưu tiên:** P2  
**Phân loại:** Conditional.

`GET /api/categories` có thể cache ngắn hạn vì dữ liệu ít thay đổi. Products search chỉ nên cache nếu có pattern lặp lại và có chiến lược invalidation rõ ràng.

Các lựa chọn:

- In-process cache TTL ngắn cho một instance localhost.
- Redis khi có nhiều backend instance hoặc cần cache dùng chung.

Redis không phải sửa chữa trực tiếp cho failure hiện tại. Nó thêm network hop, dependency vận hành và vấn đề invalidation. Không nên thêm Redis chỉ vì p95 Stress tăng nếu index/WAL/query plan chưa được kiểm tra.

### 4.8. Thay đổi database khi vượt giới hạn SQLite

**Mức ưu tiên:** P2/kiến trúc  
**Phân loại:** Conditional, không phải quick fix.

Nếu workload thực sự vượt giới hạn SQLite, có thể lập kế hoạch migration sang PostgreSQL/MySQL. SQLite file và `userCarts` in-memory hiện tại tạo các giới hạn:

- writer contention;
- dữ liệu cart không dùng chung giữa process;
- khó quản lý transaction và state nhất quán khi kiến trúc mở rộng.

Đây là phương án kiến trúc, không phải quick fix. Cần thiết kế schema/migration, session/cart storage dùng chung, transaction và deployment trước khi triển khai.

## 5. Connection pool sau migration

Connection pool chỉ được giữ lại như một lựa chọn sau khi database đã chuyển sang PostgreSQL/MySQL hoặc database server tương đương. Nó không phải một thay đổi áp dụng cho SQLite singleton hiện tại.

Khi database server hỗ trợ nhiều connection đồng thời, có thể dùng pool giới hạn:

```js
const pool = new Pool({
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
```

`max` phải dựa trên số CPU, khả năng database và concurrency thực tế. Pool quá lớn làm database quá tải; pool quá nhỏ làm request xếp hàng ở application. Cần theo dõi active/idle/waiting clients và database connection saturation.

## 6. Lộ trình triển khai

### Phase 0 - Baseline và observability

1. Giữ nguyên JMX, test data, hardware và profile.
2. Lưu raw JTL baseline hiện tại.
3. Thêm log/metric cho query duration, SQLite busy/lock error, event-loop delay và process RSS.
4. Chạy `EXPLAIN QUERY PLAN` trước khi thay đổi schema.

### Phase 1 - Quick wins và database indexes

1. Parameterize Products search.
2. Kiểm tra index unique tự động trên `coupons.code`.
3. Thêm các index còn thiếu trong migration/setup.
4. Chạy Load và Stress; so sánh per-sampler p95/p99 và failure labels.

### Phase 2 - SQLite concurrency

1. Bật WAL trong môi trường test riêng.
2. Thêm `busyTimeout` có giới hạn.
3. Đo lock wait và late-run trend.
4. Chạy lại Spike để kiểm tra request hang, không chỉ đọc p95.

### Phase 3 - Flow và payload

1. Gộp checkout/coupon usage vào transaction phù hợp.
2. Tái sử dụng prepared statement cho hot path nếu benchmark chứng minh lợi ích.
3. Dùng projection/pagination.
4. Chạy lại toàn bộ Load/Stress/Spike/Soak.

### Phase 4 - Kiến trúc dữ liệu

Chỉ cân nhắc Redis, migration sang database server và connection pool sau migration khi workload mục tiêu vượt khả năng SQLite và đã có evidence từ profiling. Đây là migration plan riêng, không phải thay đổi nhỏ trong `database.js`.

## 7. Kế hoạch benchmark và tiêu chí chấp nhận

### 7.1. Thiết kế A/B

Mỗi phương án chạy tối thiểu:

| Run         | Mục đích                                      |
| ----------- | --------------------------------------------- |
| Baseline A  | Code/schema hiện tại, cùng seed và cùng JMX.  |
| Candidate B | Chỉ bật một thay đổi.                         |
| Repeat      | Lặp lại để kiểm tra variance và loại outlier. |

Thứ tự khuyến nghị: indexes -> WAL/busy timeout -> parameterized/FTS -> transaction/payload -> cache hoặc migration. Không đổi test profile giữa A và B.

### 7.2. Acceptance criteria đề xuất

Các ngưỡng dưới đây là regression targets cho localhost, không phải production SLA:

| Metric                             | Mục tiêu sau tối ưu                                                                     |
| ---------------------------------- | --------------------------------------------------------------------------------------- |
| Stress overall p95                 | Không vượt `259 ms` baseline; mục tiêu cải thiện về `<= 200 ms` nếu không làm tăng lỗi. |
| Stress `apply-coupon` p95          | Không vượt `427 ms`; mục tiêu thử nghiệm `<= 350 ms`.                                   |
| Stress `apply-coupon` p99          | Không vượt `1288 ms`; mục tiêu thử nghiệm `<= 1000 ms`.                                 |
| Stress Duration Assertion failures | Mục tiêu `0` ở cùng profile; mọi failure phải giải thích được.                          |
| Spike samples `elapsed > 5000 ms`  | Mục tiêu `0`; không chấp nhận bỏ qua cụm request treo.                                  |
| Soak 180 late-run p95              | Duy trì khoảng `<= 50 ms` và không có trend tăng liên tục.                              |
| Soak 230 late-run p95              | Không tăng liên tục vượt `100 ms`; error rate vẫn `0%` trong baseline reference.        |
| Whole-run throughput               | Không giảm quá `5%` so với baseline khi latency/error được cải thiện.                   |

Một thay đổi chỉ được chấp nhận khi vừa cải thiện metric mục tiêu vừa không gây regression ở error rate, correctness, memory hoặc duration của các endpoint khác.

## 8. Kết luận

Ưu tiên thực tế cho hệ thống hiện tại là kiểm tra query plan và thêm index đúng chỗ, sau đó thử SQLite WAL cùng busy timeout có giới hạn. Parameterized query là bắt buộc vì correctness/security và là nền tảng cho việc tối ưu search; FTS5 hoặc cache chỉ nên cân nhắc khi dataset và access pattern chứng minh cần thiết.

Connection pool không phải giải pháp trực tiếp cho SQLite singleton hiện tại. Nếu workload vượt khả năng SQLite, hướng phù hợp là thiết kế migration sang PostgreSQL/MySQL cùng transaction, session/cart storage và giới hạn pool phù hợp.

Mọi đề xuất phải được xác nhận bằng A/B benchmark trên cùng raw JTL metrics. Đặc biệt, không được coi p95 thấp là hệ thống khỏe nếu vẫn còn Duration Assertion failures hoặc request có `elapsed` hàng trăm giây như Spike.
