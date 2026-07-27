# BÁO CÁO KẾT QUẢ KIỂM THỬ

**MSSV:** 23127065  
**Ngày thực thi:** 2026-07-27

## 1. Tổng quan Test Run

- Node.js `v22.23.1`, Jest `30.2.0`, Supertest `7.1.4`.
- PostgreSQL `17.10`, 64-bit ARM, Alpine container.
- Lệnh kiểm chứng: `PRESERVE_LAB_SCHEMA=1 node --env-file=.env node_modules/jest/bin/jest.js --runInBand --verbose`.
- Kết quả: **17 test; 15 Pass; 2 Fail; 0 Skip** trong 0.646 giây.
- Hai test Fail là bằng chứng cho đúng hai lỗi logic được cài trong SUT. Các assertion giữ nguyên kết quả nghiệp vụ mong đợi; không đổi assertion để làm lỗi giả tạo thành Pass.
- `db-tests.test.js` chứa schema và dữ liệu test tối thiểu ngay trong tệp để bộ ba sản phẩm nộp có thể chạy độc lập. Mặc định `afterAll` xóa schema và role; biến `PRESERVE_LAB_SCHEMA=1` chỉ được dùng khi cần chạy tiếp `performance.sql` trên cùng fixture.

## 2. Schema và dữ liệu kiểm thử

Fixture sạch đã được assertion xác nhận:

- 5 users với email duy nhất và 4 role phục vụ RBAC.
- 5 products, gồm một sản phẩm hết hàng.
- 200 orders liên kết ngẫu nhiên với `user_id`.
- 4 coupon đúng tên: `CP_OK`, `CP_EXPIRED`, `CP_INACTIVE`, `CP_PERCENT150`.
- Các bảng: `users`, `products`, `coupons`, `orders`, và bảng hỗ trợ `order_items`.
- Ba khóa ngoại và các UNIQUE/CHECK constraints được đọc từ PostgreSQL catalog.
- Insert trùng `admin@example.test` bị từ chối bằng SQLSTATE `23505`: **Pass**.

## 3. Danh sách lỗi phát hiện

### BUG-DB-01 — `fn_calculate_discount` không giới hạn discount

- Test case: `2. Function › does not allow a discount to exceed the order amount`.
- Input: `fn_calculate_discount('percent', 150, 200)`.
- Expected: discount `<= 200`.
- Actual: discount `300`.
- Kết quả: **Fail**, tái hiện lỗi.
- Root cause: nhánh `percent` tính `order_amount * value / 100` nhưng không giới hạn bằng tổng đơn hàng.
- Fix đề xuất:

```sql
RETURN LEAST(round(p_order_amount * p_value / 100, 2), p_order_amount);
```

Nên bổ sung constraint `discount_value <= 100` cho coupon loại `percent`, nhưng function vẫn cần tự bảo vệ trước dữ liệu lỗi.

### BUG-DB-02 — `sp_process_checkout` không atomic

- Test case: `4. Stored procedure atomicity › rolls back every stock change and leaves no incomplete order`.
- Input: user 1 checkout products `[1, 5]`, quantities `[1, 1]`; product 1 có stock 50, product 5 có stock 0.
- Expected sau lỗi: product 1 stock 50; orders 200; order_items 0.
- Actual sau lỗi `23514`: product 1 stock 49; orders 201; order_items 1.
- Kết quả: **Fail**, tái hiện partial persistence.
- Root cause: procedure gọi `COMMIT` sau item đầu tiên; lỗi stock âm ở item sau chỉ rollback transaction mới.
- Fix đề xuất: bỏ transaction control khỏi procedure; khóa và validate toàn bộ sản phẩm trước khi ghi; caller quản lý một transaction với cùng một PostgreSQL client.

### `trg_prevent_negative_stock`

- Input: cập nhật product 1 thành stock `-5`.
- Expected: từ chối và giữ nguyên stock.
- Actual: SQLSTATE `23514`; stock không đổi.
- Catalog: trigger tồn tại và enabled (`tgenabled = 'O'`).
- Kết quả: **Pass**.

## 4. Functional API và Security

| Test | Expected | Actual | Result |
|---|---|---|---|
| `POST /api/apply-coupon`, `CP_OK`, `order_amount=120` | 200, discount 12 | 200, discount 12 | Pass |
| `CP_EXPIRED` | 400 | 400 | Pass |
| `CP_INACTIVE` | 400 | 400 | Pass |
| canceled → delivered | 400, không đổi dữ liệu | 400, vẫn canceled | Pass |
| confirmed → shipping | 200 | 200, shipping | Pass |
| SQLi search | Không 500, không trả toàn bộ, không sửa/xóa | 200, `[]`, products vẫn 5 | Pass |
| `app_user` DROP TABLE | Permission denied | SQLSTATE `42501` | Pass |
| `app_user` SELECT products | Được phép | Đọc 5 rows | Pass |

Chuỗi SQLi dùng để kiểm tra là `%' OR 1=1; DROP TABLE eshop_lab.products; --`. Endpoint truyền nó qua parameter `$1`, đồng thời test kiểm tra response scope và số rows trước/sau.

## 5. Kết quả hiệu năng

Truy vấn được đo đúng ở cả hai lần:

```sql
SELECT user_id, SUM(final_amount)
FROM orders
GROUP BY user_id
ORDER BY SUM(final_amount) DESC;
```

| Measurement | Plan | Planning Time | Execution Time | Buffers |
|---|---|---:|---:|---|
| Trước index | Seq Scan → HashAggregate → Sort | 1.008 ms | 0.342 ms | shared hit=5 tại Sort; hit=2 tại scan |
| Sau `idx_orders_user_id` + `ANALYZE` | Seq Scan → HashAggregate → Sort | 0.324 ms | 0.147 ms | shared hit=2 |

Index B-tree `idx_orders_user_id ON eshop_lab.orders(user_id)` được catalog xác nhận. PostgreSQL vẫn chọn Seq Scan vì truy vấn aggregate đọc toàn bộ bảng khoảng 200 rows và bảng chỉ chiếm ít page; index scan không rẻ hơn. Chênh lệch timing ở quy mô này có nhiễu, vì vậy plan và buffers là bằng chứng chính.

## 6. Nhật ký MCP

### Prompt

> Liệt kê các bảng, khóa ngoại, constraints, trigger, function và stored procedure trong schema `eshop_lab`. Với mỗi đối tượng, nêu tên, bảng liên quan và mục đích chính. Sau đó đọc kết quả EXPLAIN ANALYZE trước/sau index và giải thích lựa chọn của planner.

### Tóm tắt phản hồi AI/MCP

- Tables: `users`, `products`, `coupons`, `orders`, `order_items`.
- Foreign keys: `orders.user_id → users.id`, `order_items.order_id → orders.id`, `order_items.product_id → products.id`.
- Constraints: primary keys; UNIQUE cho `users.email` và `coupons.code`; CHECK cho product stock, coupon type, order status và item quantity.
- Trigger: `trg_prevent_negative_stock` trên `products`, gọi `prevent_negative_stock` trước INSERT/UPDATE stock.
- Function: `fn_calculate_discount(text, numeric, numeric)` tính discount.
- Procedure: `sp_process_checkout(int, int[], int[])` tạo order, items và giảm stock.
- EXPLAIN trước/sau index đều dùng Seq Scan; planner đánh giá quét toàn bộ bảng nhỏ rẻ hơn index scan.

### Cách kiểm chứng và phân biệt AI với kết luận

Phần trên là tóm tắt do AI/MCP hỗ trợ. Kết luận của sinh viên chỉ được chấp nhận sau các kiểm chứng độc lập sau:

1. Jest truy vấn `information_schema`, `pg_constraint`, `pg_proc` và `pg_trigger`, đồng thời thực thi hành vi thực tế.
2. Catalog SQL xác nhận 5 tables, 2 functions, 1 procedure, 1 non-internal trigger, 14 constraints, role `app_user`, và định nghĩa index.
3. `performance.sql` tự chạy hai `EXPLAIN (ANALYZE, BUFFERS)` và trả về plan/timing/buffers ghi ở mục 5.

## 7. Kết luận và khuyến nghị

Cả 7 khía cạnh bắt buộc đều có test/evidence: Schema, Functional, Trigger, Stored Procedure, Function, Performance và Security. Hạ tầng và 15 test không liên quan đến hai defect đều Pass. Hai assertion nghiệp vụ Fail đã phát hiện đúng discount vượt đơn hàng và checkout không rollback toàn bộ. Ưu tiên sửa atomicity trước vì nó làm dữ liệu tồn kho và đơn hàng không nhất quán; sau đó cap discount ở cả constraint và function.
