# BUG-PRODUCT-004: Trường `price` trả về kiểu dữ liệu không nhất quán — chuỗi với sản phẩm ID chẵn, số với ID lẻ

> **GitHub Issue:** [#283](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/283) — đã tạo ngày 2026-08-15, label: `type:bug`, `status:new`, `module:product`, `found-by:code-review`, `hw05-perf-testing`

## Found by Test Case

Không phát hiện qua test case GUI. Phát hiện khi **đọc mã nguồn backend để thiết kế test plan hiệu năng HW05** (`performance-testing/23127211_Review_Notes.md` mục #5), sau đó xác minh lại bằng lệnh gọi API trực tiếp.

## Requirement liên quan

FR-06 (Xem chi tiết sản phẩm) / FR-15 (Quản lý sản phẩm — giá là số) — trường `price` phải luôn có cùng một kiểu dữ liệu trong JSON response.

## Severity / Priority

Minor / P3

> **Giải trình mức độ:** xếp Minor vì đã kiểm tra và xác nhận **cả hai client hiện có đều phòng thủ được** nên chưa có lỗi hiển thị nào với người dùng cuối (xem mục *Impact*). Tuy nhiên đây vẫn là vi phạm hợp đồng API có thật, tái hiện được 100 %, và ảnh hưởng 40 % danh mục sản phẩm hiện tại.

## Environment

- Backend: Node.js v20.20.2 + Express + SQLite
- OS: Ubuntu 22.04.5 LTS (WSL2)
- URL: `http://localhost:3000`
- Build: nhánh `hw05/23127211`, commit `7f0d46c`
- Mã nguồn liên quan: `backend/server.js:162`

## Steps to reproduce

1. Khởi động backend: `cd backend && node server.js`
2. Gọi API chi tiết sản phẩm với một **ID lẻ**:

   ```bash
   curl -s http://localhost:3000/api/products/1
   ```

3. Gọi lại với một **ID chẵn**:

   ```bash
   curl -s http://localhost:3000/api/products/2
   ```

4. So sánh kiểu dữ liệu của trường `price` trong hai response.

## Expected result

Trường `price` luôn trả về **cùng một kiểu dữ liệu** (số) cho mọi sản phẩm:

```json
{ "id": 1, "price": 30000000, ... }
{ "id": 2, "price": 28000000, ... }
```

## Actual result

Kiểu dữ liệu của `price` **thay đổi theo tính chẵn lẻ của `id`**:

```
ID lẻ  (1): price = 30000000     kiểu: number
ID chẵn (2): price = '28000000'   kiểu: string   <-- SAI
```

Nguyên nhân nằm ở `backend/server.js:162`:

```js
app.get("/api/products/:id", (req, res) => {
  db.get("SELECT * FROM products WHERE id = ?", [req.params.id], (err, row) => {
    if (!row) return res.status(200).json({});
    if (row.id % 2 === 0) row.price = row.price.toString();   // <-- ép sang chuỗi khi id chẵn
    res.json(row);
  });
});
```

Với dữ liệu seed hiện tại (5 sản phẩm, id 1–5), **2/5 sản phẩm (40 %)** trả về `price` sai kiểu.

## Impact

**Hiện tại chưa gây lỗi nhìn thấy được** — đã kiểm tra cả hai client và cả hai đều vô tình phòng thủ được:

| Client | Cách xử lý | Kết quả |
|---|---|---|
| `frontend-web/src/pages/ProductDetail.jsx:50` | `Number(product.price).toLocaleString()` | An toàn — `Number()` ép kiểu |
| `frontend-web/src/context/CartContext.jsx:23` | `total + item.price * item.quantity` | An toàn — toán tử `*` ép kiểu trước khi cộng |
| `frontend-mobile/App.js:76` | `total + item.price * item.quantity` | An toàn — cùng lý do |

**Rủi ro tiềm ẩn** nếu bất kỳ client nào (hoặc tích hợp bên thứ ba trong tương lai) cộng trực tiếp `price` mà không nhân trước — JavaScript sẽ **nối chuỗi thay vì cộng số**:

```js
// Mô phỏng đã chạy thực tế:
30000000 + 1000        // => 30001000        (đúng)
'28000000' + 1000      // => '280000001000'  (SAI — nối chuỗi)

[{price:30000000}, {price:'28000000'}]
  .reduce((s,p) => s + p.price, 0)  // => '3000000028000000'  (SAI hoàn toàn)
```

Đáng chú ý: chính lập trình viên frontend đã ý thức được rủi ro này — `frontend-web/src/pages/ProductDetail.jsx:48` có sẵn ghi chú:

```jsx
{/* Lỗi giá trị NaN có thể xuất hiện nếu price bị lỗi định dạng từ backend */}
```

**Ảnh hưởng tới kiểm thử hiệu năng (HW05):** bug này buộc phải thay đổi thiết kế test plan. Ban đầu dự định trích `price` từ response chi tiết sản phẩm để dựng payload `total_amount` cho bước checkout; do kiểu dữ liệu không ổn định, đã phải chuyển sang lấy giá từ file CSV cố định (`performance-testing/jmeter/data/products.csv`) để tránh sinh payload sai kiểu ở 40 % số request.

## Evidence

- Kết quả `curl` cho ID lẻ và ID chẵn (đã dán ở mục *Actual result*).
- Trích mã nguồn `backend/server.js:162`.
- Mô phỏng lỗi nối chuỗi bằng Node.js (đã dán ở mục *Impact*).
- Ảnh chụp GitHub Issue #283: `tests/bug-reports/screenshots/issue-283.png` ✅
- Ảnh chụp danh sách 5 issue HW05 (lọc theo `label:hw05-perf-testing`): `tests/bug-reports/screenshots/issues-list-hw05.png` ✅
- Screenshot bổ sung cần sinh viên tự chụp: màn hình terminal so sánh hai response ID lẻ / ID chẵn 👤

## Notes

- Khác với issue #232 (không validate giá khi **tạo** sản phẩm) và #163 (định dạng giá phụ thuộc locale ở tầng hiển thị) — bug này nằm ở **kiểu dữ liệu trong response API đọc**, chưa được báo cáo.
- Nằm cùng một hàm xử lý với BUG-PRODUCT-003 nhưng là hai lỗi độc lập, nên tách thành hai báo cáo riêng.
