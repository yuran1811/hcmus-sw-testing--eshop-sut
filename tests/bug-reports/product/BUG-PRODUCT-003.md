# BUG-PRODUCT-003: API chi tiết sản phẩm trả `200 OK` kèm body rỗng `{}` cho ID không tồn tại thay vì `404 Not Found`

> **GitHub Issue:** [#282](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/282) — đã tạo ngày 2026-08-15, label: `type:bug`, `status:new`, `module:product`, `found-by:code-review`, `hw05-perf-testing`

## Found by Test Case

Không phát hiện qua test case GUI. Phát hiện khi **đọc mã nguồn backend để thiết kế test plan hiệu năng HW05** (`performance-testing/23127211_Review_Notes.md` mục #4), sau đó xác minh lại bằng lệnh gọi API trực tiếp.

## Requirement liên quan

FR-06 (Xem chi tiết sản phẩm) — và quy ước REST chung: tài nguyên không tồn tại phải trả `404 Not Found`.

## Severity / Priority

Major / P2

## Environment

- Backend: Node.js v20.20.2 + Express + SQLite
- OS: Ubuntu 22.04.5 LTS (WSL2)
- URL: `http://localhost:3000`
- Build: nhánh `hw05/23127211`, commit `7f0d46c`
- Mã nguồn liên quan: `backend/server.js:159-165`

## Steps to reproduce

1. Khởi động backend: `cd backend && node server.js`
2. Gọi API chi tiết sản phẩm với một ID chắc chắn không tồn tại:

   ```bash
   curl -s -w "\nHTTP %{http_code}\n" http://localhost:3000/api/products/99999
   ```

3. Quan sát mã trạng thái HTTP và nội dung body trả về.

## Expected result

Hệ thống trả về `404 Not Found`, kèm body mô tả lỗi, ví dụ:

```json
{ "error": "Product not found" }
```

Client (web/mobile/API consumer) nhờ đó phân biệt được rõ ràng ba trạng thái: **đang tải**, **không tìm thấy**, và **lỗi hệ thống**.

## Actual result

Hệ thống trả về **`200 OK`** kèm body là **object rỗng `{}`**:

```
$ curl -s -w " <-- HTTP %{http_code}\n" http://localhost:3000/api/products/99999
{} <-- HTTP 200
```

Nguyên nhân nằm ở `backend/server.js:159-165`:

```js
app.get("/api/products/:id", (req, res) => {
  db.get("SELECT * FROM products WHERE id = ?", [req.params.id], (err, row) => {
    if (!row) return res.status(200).json({});   // <-- trả 200 thay vì 404
    if (row.id % 2 === 0) row.price = row.price.toString();
    res.json(row);
  });
});
```

## Impact

1. **Vi phạm hợp đồng API**: mọi client buộc phải tự viết workaround. Bằng chứng: `frontend-web/src/pages/ProductDetail.jsx:34-35` đã phải thêm nhánh xử lý riêng, và thông báo trong chính mã nguồn thừa nhận đây là cách chữa cháy:

   ```jsx
   if (Object.keys(product).length === 0)
     return <div>Sản phẩm không tồn tại (Lỗi trắng trang do data rỗng)</div>;
   ```

2. **Vô hiệu hoá kiểm thử tự động** — đây là tác hại nghiêm trọng nhất và là lý do bug được phát hiện: một assertion chỉ kiểm tra `response code == 200` sẽ **luôn PASS** kể cả khi sản phẩm không tồn tại. Trong quá trình thiết kế test plan HW05, phải bổ sung thêm JSON Assertion kiểm tra sự tồn tại của trường `$.id` mới bắt được trường hợp này:
   - JMeter: `JSONPathAssertion` trên `$.id` (`performance-testing/jmeter/23127211_Load_20260814.jmx`)
   - k6: `check(res, { 'san pham ton tai (co field id)': (r) => r.json('id') !== undefined })`

   Nếu không có bước bổ sung này, một bài load test 6 966 request có thể báo "0 % lỗi" trong khi thực tế mọi request đều trỏ tới sản phẩm không tồn tại.

3. Không phân biệt được với trường hợp sản phẩm tồn tại nhưng dữ liệu rỗng.

## Evidence

- Lệnh tái hiện và kết quả thực tế (đã dán ở mục *Actual result*).
- Trích mã nguồn `backend/server.js:159-165`.
- Workaround trong `frontend-web/src/pages/ProductDetail.jsx:34-35`.
- Ảnh chụp GitHub Issue #282: `tests/bug-reports/screenshots/issue-282.png` ✅
- Ảnh chụp danh sách 5 issue HW05 (lọc theo `label:hw05-perf-testing`): `tests/bug-reports/screenshots/issues-list-hw05.png` ✅
- Screenshot bổ sung cần sinh viên tự chụp: màn hình terminal khi chạy lệnh `curl` ở mục *Steps to reproduce* 👤

## Notes

- Cùng nhóm lỗi "endpoint trả 200 cho tài nguyên không tồn tại" với issue #126 (xoá danh mục không tồn tại) và #105 (xoá coupon không tồn tại), nhưng đây là endpoint **GET chi tiết sản phẩm**, chưa được báo cáo riêng.
- Bug này **không** liên quan tới BUG-PRODUCT-004 (kiểu dữ liệu `price`), dù cả hai nằm trong cùng một hàm xử lý.
