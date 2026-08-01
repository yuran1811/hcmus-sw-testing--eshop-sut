# Platform Matrix — Product Detail (EShop SUT)

- **Platform 1:** Chrome 126 — Windows 11, desktop, cửa sổ 1440×900
- **Platform 2:** Firefox 128 — Windows 11, desktop, cửa sổ 1440×900
- **Platform 3:** Safari — iOS trên iPhone thật, truy cập qua ngrok (expose `localhost:5173` ra internet)
- **SUT URL khi test:** P1/P2 dùng `http://localhost:5173/product/1` · P3 dùng URL ngrok trỏ về cùng máy
- **Checklist nguồn:** [`../checklist/product-detail/checklist_product-detail.md`](../checklist/product-detail/checklist_product-detail.md) (73 item)
- **Trạng thái:** chưa chạy — toàn bộ ô kết quả là `Not Run`

> Bộ 3 này phủ trọn cả ba engine trình duyệt: **Blink** (Chrome), **Gecko** (Firefox), **WebKit**
> (Safari). Thêm nữa Platform 3 là thiết bị **cảm ứng thật**, nên bắt được cả nhóm lỗi chỉ xuất
> hiện khi không có chuột và không có hover.

---

## ⚠️ Hai việc phải xử lý TRƯỚC khi chạy Platform 3

**1. Backend đang hard-code `localhost:3000` ở 13 chỗ trong 7 file.**

Mở ngrok chỉ expose frontend (cổng 5173). Khi iPhone tải trang, đoạn JS chạy trên **điện thoại** sẽ
gọi `http://localhost:3000` — mà `localhost` lúc đó là chính chiếc iPhone, không phải máy bạn. Kết
quả: trang load nhưng **không có sản phẩm nào hiện ra**, mọi item đều Blocked.

Phải chọn một trong hai cách trước khi test:

- Tunnel luôn cổng 3000 bằng một ngrok thứ hai, rồi đổi 13 chỗ đó sang URL ngrok của backend; hoặc
- Cấu hình `server.proxy` trong `frontend-web/vite.config.js` cho `/api` → `http://localhost:3000`,
  rồi đổi 13 URL tuyệt đối thành đường dẫn tương đối `/api/...` (cách này gọn hơn về lâu dài).

Ngoài ra `vite.config.js` cần thêm `server.allowedHosts` chứa domain ngrok, nếu không Vite chặn request.

**2. Đề yêu cầu ảnh chụp thấy "SUT's localhost URL", nhưng qua ngrok thanh địa chỉ sẽ hiện domain ngrok.**

Cách xử lý an toàn: ngoài ảnh chụp màn hình iPhone, chụp thêm **cửa sổ terminal đang chạy ngrok**
thể hiện dòng `Forwarding https://<...>.ngrok-free.dev -> http://localhost:5173`. Hai ảnh đi kèm
nhau chứng minh được đây đúng là instance localhost của bạn chứ không phải bản deploy công khai.

---

## Bước 2 — Cơ sở lọc item

Không chạy lại cả 73 item trên 3 nền tảng. Phần lớn item chạy **cùng một đoạn JavaScript** nên đổi
engine không sinh thêm phát hiện nào — tốn công mà không tăng độ phủ lỗi.

### Nhóm được giữ lại

| Category            | Trong checklist | Giữ lại | Vì sao nhạy nền tảng                                                          |
| ------------------- | --------------- | ------- | ----------------------------------------------------------------------------- |
| `VIS` Visual        | 14              | 10      | Render font, box-shadow, ảnh hỏng, dark mode khác nhau theo engine và theo OS |
| `RES` Responsive    | 7               | 4       | Viewport thật của thiết bị khác hẳn viewport giả lập bằng cách kéo cửa sổ     |
| `COM` Compatibility | 4               | 4       | Category sinh ra đúng cho mục đích này                                        |
| `ACC` Accessibility | 9               | 2       | Chỉ 2 item phụ thuộc nền tảng: viền focus mặc định và vùng chạm               |
| **Tổng**            | **73**          | **20**  |                                                                               |

### Nhóm bị loại — kèm lý do

| Item bị loại                             | Lý do loại                                                                                                                                       |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `VIS-04` khoảng trắng dọc do `flex-grow` | Flexbox render nhất quán giữa các engine hiện đại, lợi ích thấp                                                                                  |
| `VIS-08` mô tả dài > 500 ký tự           | Trùng cơ chế xuống dòng với `VIS-07`, giữ một item là đủ                                                                                         |
| `VIS-10` tiêu đề tab trình duyệt         | `document.title` do JS đặt, không phụ thuộc engine chút nào                                                                                      |
| `VIS-14` bố cục RTL                      | Hành vi `dir="rtl"` nhất quán giữa các engine; app lại không hỗ trợ RTL nên kết quả giống nhau ở cả 3 nơi                                        |
| `RES-01`, `RES-02`, `RES-03`             | Đổi viewport trên desktop cho kết quả như nhau ở mọi engine; giá trị thật nằm ở `RES-04`/`RES-05` chạy trên thiết bị thật                        |
| Toàn bộ `VAL` (10 item)                  | Validation chạy cùng một đoạn JS — đổi trình duyệt không đổi kết quả                                                                             |
| Toàn bộ `FUN` (7 item)                   | Đã rà: không item nào chạm browser API (không date picker, không upload file, không camera/QR), nên không đủ điều kiện thuộc nhóm "FUN chạm API" |
| Toàn bộ `NAV` (10 item)                  | Routing của React Router, hành vi giống nhau mọi trình duyệt                                                                                     |
| Toàn bộ `FDB` (7 item)                   | Logic trạng thái ứng dụng, không phụ thuộc engine                                                                                                |
| Toàn bộ `USB` (5 item)                   | Đánh giá tính khả dụng, không phải khác biệt nền tảng                                                                                            |
| `ACC-01/02/04/05/06/07/09`               | Thuộc tính DOM và ngữ nghĩa (`for`, `alt`, `lang`, heading) — giống nhau ở mọi nền tảng                                                          |

---

## Kết quả

Ký hiệu ô: `Not Run` → chưa chạy · `Passed` / `Failed` / `Blocked` + tên file ảnh khi đã chạy thật ·
`N/A` → không áp dụng trên nền tảng đó (đã nêu lý do ở chú thích dưới bảng).

| ID                | Item (rút gọn từ checklist Task 1)                                   | P1 Chrome | P2 Firefox | P3 Safari iOS |
| ----------------- | -------------------------------------------------------------------- | --------- | ---------- | ------------- |
| PRODDETAIL-VIS-01 | Ảnh gốc 300×300 render ở 455×455 — kiểm tra độ nét                   | Not Run   | Not Run    | Not Run       |
| PRODDETAIL-VIS-02 | Dấu phân tách hàng nghìn của giá theo chuẩn VN                       | Not Run   | Not Run    | Not Run       |
| PRODDETAIL-VIS-03 | Vị trí và khoảng cách ký hiệu `₫` so với phần số                     | Not Run   | Not Run    | Not Run       |
| PRODDETAIL-VIS-05 | Nhãn "Số lượng:" căn giữa trục dọc với ô nhập                        | Not Run   | Not Run    | Not Run       |
| PRODDETAIL-VIS-06 | Chiều cao ô nhập số lượng so với nút "Thêm vào giỏ hàng"             | Not Run   | Not Run    | Not Run       |
| PRODDETAIL-VIS-07 | Tên sản phẩm dài > 60 ký tự xuống dòng trong cột phải                | Not Run   | Not Run    | Not Run       |
| PRODDETAIL-VIS-09 | Chặn ảnh ngoài — hiển thị `alt`, bố cục 2 cột không lệch             | Not Run   | Not Run    | Not Run       |
| PRODDETAIL-VIS-11 | Bo góc / viền / đổ bóng card so với Home và Cart                     | Not Run   | Not Run    | Not Run       |
| PRODDETAIL-VIS-12 | Tương phản chữ mô tả xám trên nền trắng                              | Not Run   | Not Run    | Not Run       |
| PRODDETAIL-VIS-13 | Bật dark mode của hệ điều hành rồi tải lại trang                     | Not Run   | Not Run    | Not Run       |
| PRODDETAIL-RES-04 | Viewport 390×844 — không có thanh cuộn ngang                         | Not Run   | Not Run    | Not Run       |
| PRODDETAIL-RES-05 | Vị trí nút "Thêm vào giỏ hàng" ở bề rộng ≤ 640px                     | Not Run   | Not Run    | Not Run       |
| PRODDETAIL-RES-06 | Zoom trang lên 150%                                                  | Not Run   | Not Run    | Not Run       |
| PRODDETAIL-RES-07 | Xoay ngang (landscape)                                               | Not Run   | Not Run    | Not Run       |
| PRODDETAIL-COM-01 | So sánh bố cục, cỡ chữ, màu sắc, vị trí phần tử giữa các trình duyệt | Not Run   | Not Run    | Not Run       |
| PRODDETAIL-COM-02 | Nút tăng/giảm (spinner) của ô `input[type=number]`                   | Not Run   | Not Run    | Not Run       |
| PRODDETAIL-COM-03 | Hiển thị dấu tiếng Việt ở tên, mô tả, nhãn                           | Not Run   | Not Run    | Not Run       |
| PRODDETAIL-COM-04 | Chuỗi giá khi đổi ngôn ngữ ưu tiên của trình duyệt                   | Not Run   | Not Run    | Not Run       |
| PRODDETAIL-ACC-03 | Viền focus nhìn thấy rõ khi Tab vào ô nhập và nút                    | Not Run   | Not Run    | N/A ¹         |
| PRODDETAIL-ACC-08 | Vùng chạm nút và ô nhập tối thiểu 44px                               | N/A ²     | N/A ²      | Not Run       |

¹ iOS Safari không có điều hướng bằng phím Tab nếu không gắn bàn phím ngoài — item này chỉ có nghĩa trên desktop.
² P1/P2 dùng chuột, không phải thiết bị cảm ứng — tiêu chuẩn vùng chạm 44px chỉ có nghĩa thật trên P3.

**Số item thực chạy:** P1 = 19 · P2 = 19 · P3 = 19

---

## Quy ước ảnh chụp

Mỗi ảnh phải thấy đủ **ba** thứ trong cùng khung hình:

1. Tên trình duyệt / OS / thiết bị
2. URL của SUT trên thanh địa chỉ (với P3, kèm thêm ảnh terminal ngrok như đã nêu ở trên)
3. Watermark `23127211@hcmus.edu.vn`

**Đặt tên file:** `<platform-slug>_<checklist-ID>_<mô-tả-ngắn>.png`

```
chrome-win11_PRODDETAIL-COM-02_number-spinner.png
firefox-win11_PRODDETAIL-COM-02_number-spinner.png
safari-ios_PRODDETAIL-RES-05_addtocart-offset.png
```

Chỉ chụp ảnh cho ô `Failed` — giống quy tắc ở Task 1.

### Lệnh chèn watermark

```bash
python .agents/skills/cross-platform-testing-tracker/scripts/watermark_screenshot.py \
  tests/cross-platform/screenshots/raw \
  --student-id 23127211 \
  --output-dir tests/cross-platform/screenshots/final
```

> **Bắt buộc truyền `--student-id`.** Nếu bỏ qua, script rơi về một email mặc định ở domain khác —
> tiện để thử render nhưng **sai định dạng nộp bài**. Kiểm tra lại MSSV trước khi chạy hàng loạt.

---

## Phân loại defect sau khi điền xong

| ID  | Fail trên    | Phân loại                                                                                  |
| --- | ------------ | ------------------------------------------------------------------------------------------ |
|     | 1/3 platform | **Cross-platform defect thật** — log bug riêng, ghi rõ engine nào tái hiện                 |
|     | 2/3 platform | Cross-platform defect — thường do 2 engine chia sẻ đặc điểm; ghi rõ engine nào không dính  |
|     | 3/3 platform | Defect chung — đáng lẽ đã nằm trong bug list Task 1, **không** tính là phát hiện mới ở đây |

Với mỗi bug platform-specific, dùng `bug_report_template.md` của skill `gui-checklist-builder` và
điền trường `Environment` bằng đúng nền tảng/trình duyệt/OS/viewport tái hiện được, kèm câu trả lời
rõ ràng cho câu hỏi _"có tái hiện trên 2 nền tảng còn lại không"_.

---

## Tóm tắt

> Điền sau khi chạy xong cả 3 nền tảng.

- Platform đã test: CHƯA CHẠY
- Số item test / platform: CHƯA CHẠY
- Pass rate mỗi platform: CHƯA CHẠY
- Bug platform-specific tìm được: CHƯA CHẠY

---

## Dự đoán nơi có khả năng ra defect cao nhất

Không phải kết quả test — chỉ là gợi ý thứ tự ưu tiên chạy, dựa trên những gì đã đọc được từ source
và đo được trên desktop ở Task 1. **Vẫn phải chạy thật mới biết Pass hay Fail.**

| Item                             | Vì sao đáng chạy trước                                                                                                              |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `COM-02` spinner ô số lượng      | iOS Safari không render spinner cho `input[type=number]`, Firefox và Chrome lại render khác nhau — nhiều khả năng lệch cả 3         |
| `COM-04` chuỗi giá theo locale   | `Number(price).toLocaleString()` không truyền locale nên phụ thuộc thẳng vào cài đặt ngôn ngữ của từng máy/thiết bị                 |
| `RES-05` vị trí nút ở ≤ 640px    | `.bug-mobile-hidden { margin-right: -100px }` chỉ kích hoạt dưới 640px; trên iPhone thật là lần đầu điều kiện này gặp viewport thật |
| `VIS-06` chiều cao ô nhập vs nút | iOS Safari áp style mặc định cho form control khác hẳn desktop                                                                      |
| `VIS-09` ảnh hỏng                | Mỗi engine vẽ ảnh lỗi và chữ `alt` một kiểu khác nhau                                                                               |
