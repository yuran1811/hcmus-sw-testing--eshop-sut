# BUG-CART-001: Giỏ hàng in-memory phình vô hạn và không bao giờ được giải phóng — rò rỉ bộ nhớ phát hiện qua kiểm thử hiệu năng

> **GitHub Issue:** [#285](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/285) — đã tạo ngày 2026-08-15, label: `type:bug`, `status:new`, `priority:P1`, `severity:major`, `module:cart`, `found-by:perf-testing`, `hw05-perf-testing`

> **Issue liên quan đã tồn tại (đã tra trùng lặp trước khi báo cáo):**
>
> - **#76** — [BUG][Checkout] Giỏ hàng không bị xóa sau khi thanh toán thành công (`module:checkout`, `found-by:test-case`)
> - **#201** — [BUG][Checkout] Giỏ hàng vẫn còn sau khi thanh toán thành công (`module:checkout`, `found-by:usability-test`)
> - **#252** — [BUG][Thanh toán][Automation] Giỏ hàng không được xóa sạch sau khi thanh toán (`module:checkout`, `found-by:automation`)
>
> **Điểm mới của báo cáo này so với 3 issue trên:** cả ba đều mô tả **hệ quả chức năng** ở quy mô một vài sản phẩm ("giỏ hàng vẫn còn sau khi thanh toán"). Báo cáo này ghi nhận **hệ quả tài nguyên khi tích luỹ ở quy mô lớn** — thứ chỉ lộ ra khi chạy kiểm thử hiệu năng và chưa từng được định lượng: sau **24 692 lần checkout**, mảng giỏ hàng trong RAM của **một** tài khoản chứa **24 692 phần tử** và `GET /api/cart` trả về **716 069 bytes**. Đây là một cấu trúc **tăng đơn điệu, không bao giờ được giải phóng** cho tới khi restart tiến trình — tức là một rò rỉ bộ nhớ thật sự, khác về bản chất với "quên xoá giỏ hàng".

## Found by Test Case

Không phát hiện qua test case chức năng. Phát hiện khi **chạy kiểm thử hiệu năng HW05** (workflow "Khách mới — mua rồi đổi ý", 6 kịch bản JMeter + k6, tổng ~24 700 iteration), sau đó xác minh bằng lệnh gọi API trực tiếp.

## Requirement liên quan

FR-08 (Thanh toán) — `README.md` dòng 108: *"Sau thanh toán thành công, giỏ hàng được xóa."*

## Severity / Priority

Major / P1

## Environment

- Backend: Node.js v20.20.2 + Express + SQLite
- OS: Ubuntu 22.04.5 LTS (WSL2), máy `VN1-5CG1041RBP`
- URL: `http://localhost:3000`
- Build: nhánh `hw05/23127211`, commit `7f0d46c`
- Mã nguồn liên quan: `backend/server.js:14` (khai báo `userCarts`), `:290-295` (add-to-cart), `:297-309` (checkout)

## Steps to reproduce

1. Khởi động backend: `cd backend && node server.js`
2. Đăng nhập lấy token:

   ```bash
   TOKEN=$(curl -s -X POST http://localhost:3000/api/login \
     -H 'Content-Type: application/json' \
     -d '{"email":"test@eshop.com","password":"Test1234!"}' \
     | python3 -c "import json,sys;print(json.load(sys.stdin)['token'])")
   ```

3. Lặp lại nhiều lần cặp thao tác **thêm vào giỏ → thanh toán** (trong bài này thực hiện bằng test plan hiệu năng, ~24 700 vòng lặp):

   ```bash
   curl -s -X POST http://localhost:3000/api/cart -H "Authorization: Bearer $TOKEN" \
        -H 'Content-Type: application/json' -d '{"productId":1,"quantity":1}'
   curl -s -X POST http://localhost:3000/api/checkout -H "Authorization: Bearer $TOKEN" \
        -H 'Content-Type: application/json' \
        -d '{"total_amount":30000000,"shipping_address":"123 Test"}'
   ```

4. Kiểm tra kích thước giỏ hàng phía server:

   ```bash
   curl -s http://localhost:3000/api/cart -H "Authorization: Bearer $TOKEN" \
     | python3 -c "import json,sys; d=json.load(sys.stdin); print('So phan tu:', len(d))"
   ```

## Expected result

Sau mỗi lần thanh toán thành công, `userCarts[userId]` được xoá rỗng. Số phần tử trong giỏ luôn phản ánh **giỏ hàng hiện tại**, không tích luỹ theo lịch sử mua hàng. Bộ nhớ của tiến trình không tăng theo số đơn hàng đã tạo.

## Actual result

Giỏ hàng **không bao giờ được xoá**. Số phần tử tăng đơn điệu theo tổng số lần add-to-cart trong suốt vòng đời tiến trình:

```
So phan tu trong userCarts[userId]: 24692
Kich thuoc JSON tra ve: 0.78 MB
3 phan tu dau: [{'productId': 2, 'quantity': 1}, {'productId': 5, 'quantity': 1}, {'productId': 1, 'quantity': 1}]
```

Đo thời gian và kích thước response, so với một endpoint đọc thông thường:

| Endpoint | Kích thước response | Thời gian (5 lần đo) |
|---|---|---|
| `GET /api/cart` (24 692 phần tử) | **716 069 bytes** | 0,0446 s · 0,0314 s · 0,0744 s · 0,0084 s · 0,0072 s |
| `GET /api/categories` (đối chứng) | **91 bytes** | 0,0053 s · 0,0030 s · 0,0030 s |

⇒ Response của `GET /api/cart` lớn gấp **7 868 lần** endpoint đọc thông thường, và vẫn đang tiếp tục tăng.

**Nguyên nhân gốc.** `backend/server.js:14` khai báo giỏ hàng là một object in-memory toàn cục:

```js
const userCarts = {};
```

`POST /api/cart` (`:290-295`) chỉ `push` thêm, không bao giờ hợp nhất hay dọn:

```js
app.post("/api/cart", authenticateToken, (req, res) => {
  const userId = req.user.id;
  if (!userCarts[userId]) userCarts[userId] = [];
  userCarts[userId].push(req.body);          // <-- chỉ thêm, không bao giờ xoá
  res.json({ message: "Added to cart" });
});
```

Và `POST /api/checkout` (`:297-309`) **không hề tham chiếu tới `userCarts`** — đã kiểm chứng: số lần chuỗi `userCarts` xuất hiện trong handler checkout là **0**. Handler chỉ `INSERT INTO orders` rồi trả về `orderId`.

## Impact

1. **Rò rỉ bộ nhớ (memory leak) đúng nghĩa.** `userCarts` là biến toàn cục sống suốt vòng đời tiến trình; mọi phần tử từng được thêm vào đều **không bao giờ được giải phóng**, kể cả sau khi đơn hàng đã hoàn tất hoặc đã bị huỷ. Trong môi trường thật chạy nhiều ngày không restart, bộ nhớ sẽ tăng tuyến tính theo tổng số thao tác add-to-cart của toàn hệ thống.

2. **Response phình theo thời gian.** `GET /api/cart` trả về **toàn bộ** mảng, nên băng thông và thời gian phản hồi của endpoint này xấu đi tuyến tính theo lịch sử sử dụng của từng người dùng — không có phân trang, không có giới hạn.

3. **Sai lệch dữ liệu nghiệp vụ.** Giỏ hàng phía server chứa mọi sản phẩm người dùng từng thêm từ trước tới nay, nên bất kỳ client nào đọc giỏ từ server đều nhận dữ liệu sai. Lỗi này hiện bị **che khuất** bởi frontend: `frontend-web/src/context/CartContext.jsx:18-19` chỉ xoá state phía client (`setCart([])`), còn giỏ phía server vẫn nguyên — nên người dùng thấy giỏ trống trong khi server thì không.

4. **Ảnh hưởng tới chính việc kiểm thử.** Bug này làm sai lệch kết luận về memory leak trong báo cáo hiệu năng: soak test 15 phút chỉ thêm ~3 596 phần tử (≈ 0,4 MB), chìm hoàn toàn trong biên độ dao động ~24 MB của V8 heap, nên **đo RSS không đủ nhạy để phát hiện**. Phải truy vấn trực tiếp `GET /api/cart` mới lộ ra.

## Evidence

- Kết quả `GET /api/cart` sau 24 692 lần checkout (đã dán ở mục *Actual result*).
- Bảng đo kích thước và thời gian response, có endpoint đối chứng.
- Trích mã nguồn `backend/server.js:14`, `:290-295`, `:297-309`.
- Workaround phía client: `frontend-web/src/context/CartContext.jsx:18-19`.
- Báo cáo hiệu năng liên quan: `performance-testing/23127211_Execution_Report.md` §4 (endurance/memory ceiling).
- Ảnh chụp GitHub Issue #285: `tests/bug-reports/screenshots/issue-285.png` ✅
- Ảnh chụp danh sách 5 issue HW05 (lọc theo `label:hw05-perf-testing`): `tests/bug-reports/screenshots/issues-list-hw05.png` ✅
- Screenshot bổ sung cần sinh viên tự chụp: màn hình terminal chạy lệnh ở bước 4 👤

## Notes

- **Đề xuất sửa:** trong handler `POST /api/checkout`, sau khi `INSERT INTO orders` thành công thì gán `userCarts[userId] = []`. Về lâu dài nên chuyển giỏ hàng ra khỏi bộ nhớ tiến trình (bảng `carts` trong DB hoặc store dùng chung) — vì `userCarts` in-memory còn khiến hệ thống **không thể chạy nhiều worker/instance**, mỗi tiến trình sẽ giữ một bản giỏ hàng khác nhau.
- Liên quan tới issue #77 ("Frontend không gọi API của cart") — chính vì frontend không đọc giỏ từ server nên lỗi này không lộ ra trong kiểm thử giao diện thông thường.
