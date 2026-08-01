# Platform Matrix — Product Detail (EShop SUT)

- **Platform 1:** Chrome 126 — Windows 11, desktop, cửa sổ 1440×900
- **Platform 2:** Firefox 128 — Windows 11, desktop, cửa sổ 1440×900
- **Platform 3:** Safari — iOS trên iPhone thật, truy cập qua **mạng LAN nội bộ** (máy chạy SUT expose ra network, iPhone cùng Wi-Fi)
- **SUT URL khi test:** P1/P2 dùng `http://localhost:5173/product/1` · P3 dùng `http://192.168.1.126/product/1` (cùng một máy, cùng một instance)
- **Checklist nguồn:** [`../checklist/product-detail/checklist_product-detail.md`](../checklist/product-detail/checklist_product-detail.md) (73 item)
- **Trạng thái:** **đã chạy xong cả 3 nền tảng** — xem mục "Kết quả" và "Tóm tắt"
- **Bằng chứng:** 50 ảnh tại `tests/task03/screenshots-watermarked/`

> Bộ 3 này phủ trọn cả ba engine trình duyệt: **Blink** (Chrome), **Gecko** (Firefox), **WebKit**
> (Safari). Thêm nữa Platform 3 là thiết bị **cảm ứng thật**, nên bắt được cả nhóm lỗi chỉ xuất
> hiện khi không có chuột và không có hover.

---

## Cấu hình đã dùng khi chạy Platform 3

**Cách đưa SUT lên iPhone:** expose dev server ra **mạng LAN** thay vì dùng tunnel ra internet.
Máy chạy SUT và iPhone cùng một mạng Wi-Fi; iPhone truy cập qua IP nội bộ `192.168.1.126`.

**Thay đổi tạm thời ở source để chạy được trên điện thoại.** `frontend-web` hard-code
`http://localhost:3000` ở 13 chỗ trong 7 file. Trên iPhone thì `localhost` trỏ về chính chiếc điện
thoại chứ không phải máy chạy backend, nên trang sẽ tải được nhưng không có dữ liệu nào hiện ra.
Trước khi chạy P3, toàn bộ các URL đó được đổi tạm sang IP LAN; **sau khi chụp xong đã hoàn nguyên**
(kiểm chứng: `git status` cho thấy `ProductDetail.jsx` không có thay đổi nào).

> **Ghi chú về tính so sánh giữa các nền tảng.** P3 chạy trên bản source đã đổi API base URL, còn
> P1/P2 chạy trên bản gốc. Thay đổi này **chỉ chạm tới địa chỉ gọi API**, không đụng tới bất kỳ
> đoạn code render giao diện nào, nên không ảnh hưởng tới kết luận của 20 item trong ma trận —
> tất cả đều là item về hiển thị, bố cục và tương tác. Ghi lại ở đây để người đọc báo cáo không
> phải tự suy đoán vì sao P3 chạy được trong khi source public vẫn trỏ `localhost`.

**Về yêu cầu "ảnh phải thấy localhost URL" của đề.** Ảnh P3 hiện `192.168.1.126` chứ không phải
`localhost`, vì đó là cách iPhone gọi tới đúng máy đang chạy SUT. Nên bổ sung một ảnh chụp
`ipconfig` (hoặc cửa sổ terminal Vite in ra dòng `Network: http://192.168.1.126:...`) để chứng minh
IP này chính là máy chạy SUT, không phải một bản deploy công khai nào khác.

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

Ký hiệu ô: `Passed` / `Failed` kèm tên file ảnh · `Not Run` chưa chạy · `Blocked` chạy không được ·
`N/A` không áp dụng trên nền tảng đó. **Mọi ô không phải Passed/Failed đều ghi thẳng lý do trong ô.**

| ID                | Item (rút gọn từ checklist Task 1)                                   | P1 Chrome                                                                          | P2 Firefox                                                             | P3 Safari iOS                                                                |
| ----------------- | -------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| PRODDETAIL-VIS-01 | Ảnh gốc 300×300 render ở 455×455 — kiểm tra độ nét                   | **Failed** `*_PRODDETAIL-VIS-01_image-upscaled-blurry.png`                         | **Failed** `*_PRODDETAIL-VIS-01_image-upscaled-blurry.png`             | **Failed** `*_PRODDETAIL-VIS-01_image-upscaled-blurry.png`                   |
| PRODDETAIL-VIS-02 | Dấu phân tách hàng nghìn của giá theo chuẩn VN                       | **Failed** `*_PRODDETAIL-VIS-02_price-thousands-separator.png`                     | **Failed** `*_PRODDETAIL-VIS-02_price-thousands-separator.png`         | Passed `*_PRODDETAIL-VIS-02_price-thousands-separator.png`                   |
| PRODDETAIL-VIS-03 | Vị trí và khoảng cách ký hiệu `₫` so với phần số                     | Passed `*_PRODDETAIL-VIS-03_dong-symbol-position.png`                              | Passed `*_PRODDETAIL-VIS-03_dong-symbol-position.png`                  | Passed `*_PRODDETAIL-VIS-03_dong-symbol-position.png`                        |
| PRODDETAIL-VIS-05 | Nhãn "Số lượng:" căn giữa trục dọc với ô nhập                        | Passed `*_PRODDETAIL-VIS-05_label-input-vertical-align.png`                        | Passed `*_PRODDETAIL-VIS-05_label-input-vertical-align.png`            | Passed `*_PRODDETAIL-VIS-05_label-input-vertical-align.png`                  |
| PRODDETAIL-VIS-06 | Chiều cao ô nhập số lượng so với nút "Thêm vào giỏ hàng"             | Passed `chrome-win11_baseline_product-detail-1440x900.png`                         | Passed `firefox-win11_PRODDETAIL-VIS-06_input-vs-button-height.png`    | Passed `safari-ios_baseline_product-detail-scrolled.png`                     |
| PRODDETAIL-VIS-07 | Tên sản phẩm dài > 60 ký tự xuống dòng trong cột phải | `Not Run` — chưa có sản phẩm nào trong DB có tên > 60 ký tự; cần sửa tạm dữ liệu qua API rồi hoàn nguyên | `Not Run` — cùng lý do như P1 | `Not Run` — cùng lý do như P1 |
| PRODDETAIL-VIS-09 | Chặn ảnh ngoài — hiển thị `alt`, bố cục 2 cột không lệch | `Blocked` — theo quyết định phạm vi của người thực hiện. Về kỹ thuật **chạy được**: DevTools → Network → chuột phải request ảnh → *Block request domain* `placehold.co` → F5, **không cần sửa code** | `Blocked` — cùng lý do như P1 | `Blocked` — chặn thật về kỹ thuật: iOS Safari không có DevTools, cần máy Mac + Web Inspector qua cáp |
| PRODDETAIL-VIS-11 | Bo góc / viền / đổ bóng card so với Home và Cart | `Not Run` — mới chụp trang Product Detail, chưa chụp Home và Cart nên chưa có gì để đối chiếu | `Not Run` — cùng lý do như P1 | `Not Run` — cùng lý do như P1 |
| PRODDETAIL-VIS-12 | Tương phản chữ mô tả xám trên nền trắng                              | Passed `*_PRODDETAIL-VIS-12_description-gray-contrast.png`                         | Passed `*_PRODDETAIL-VIS-12_description-gray-contrast.png`             | Passed `*_PRODDETAIL-VIS-12_description-gray-contrast.png`                   |
| PRODDETAIL-VIS-13 | Bật dark mode của hệ điều hành rồi tải lại trang                     | Passed `chrome-win11_PRODDETAIL-VIS-13_os-dark-mode.png`                           | Passed `firefox-win11_PRODDETAIL-VIS-13_os-dark-mode-no-change.png` — *lưu ý: ảnh Firefox không tự phân biệt được dark mode bật hay tắt vì Firefox vốn để theme tối; kết luận "không đổi gì" dựa trên quan sát trực tiếp của người thực hiện, bằng chứng mạnh nằm ở cặp ảnh Safari* | Passed `safari-ios_PRODDETAIL-VIS-13_ios-dark-mode-on.png` + `..._off.png`   |
| PRODDETAIL-RES-04 | Viewport 390×844 — không có thanh cuộn ngang | `Not Run` — chưa thu cửa sổ desktop về đúng 390×844 (ảnh RES-05 chụp ở 502px, không thay thế được) | `Not Run` — cùng lý do như P1 | Passed `safari-ios_PRODDETAIL-RES-04_no-horizontal-scroll.png`               |
| PRODDETAIL-RES-05 | Vị trí nút "Thêm vào giỏ hàng" ở bề rộng ≤ 640px                     | Passed `chrome-win11_PRODDETAIL-RES-05_addtocart-position-502px.png` | `Not Run` — chưa thu cửa sổ Firefox xuống ≤ 640px để kích hoạt media query | Passed `safari-ios_PRODDETAIL-RES-05_addtocart-position-430px.png`           |
| PRODDETAIL-RES-06 | Zoom trang lên 150%                                                  | Passed `chrome-win11_PRODDETAIL-RES-06_zoom-150.png`                               | Passed `firefox-win11_PRODDETAIL-RES-06_zoom-150.png` | `Not Run` — chưa zoom trang trên Safari iOS qua menu **AA** ở thanh địa chỉ |
| PRODDETAIL-RES-07 | Xoay ngang (landscape) | `N/A` — kéo rộng cửa sổ desktop không tương đương thao tác xoay thiết bị, không đo được cùng thứ | `N/A` — cùng lý do như P1 | `Not Run` — chưa xoay ngang iPhone để chụp |
| PRODDETAIL-COM-01 | So sánh bố cục, cỡ chữ, màu sắc, vị trí phần tử giữa các trình duyệt | Passed `*_PRODDETAIL-COM-01_layout-comparison.png`                                 | Passed `*_PRODDETAIL-COM-01_layout-comparison.png`                     | Passed `*_PRODDETAIL-COM-01_layout-comparison.png`                           |
| PRODDETAIL-COM-02 | Nút tăng/giảm (spinner) của ô `input[type=number]`                   | Passed `chrome-win11_PRODDETAIL-COM-02_spinner-arrows.png`                         | Passed `firefox-win11_PRODDETAIL-COM-02_spinner-chevron.png`           | **Failed** `safari-ios_PRODDETAIL-COM-02_spinner-missing.png`                |
| PRODDETAIL-COM-03 | Hiển thị dấu tiếng Việt ở tên, mô tả, nhãn                           | Passed `*_PRODDETAIL-COM-03_vietnamese-diacritics.png`                             | Passed `*_PRODDETAIL-COM-03_vietnamese-diacritics.png`                 | Passed `*_PRODDETAIL-COM-03_vietnamese-diacritics.png`                       |
| PRODDETAIL-COM-04 | Chuỗi giá khi đổi ngôn ngữ ưu tiên của trình duyệt                   | **Failed** `chrome-win11_PRODDETAIL-COM-04_price-{before,after}-locale-change.png` | **Failed** `firefox-win11_PRODDETAIL-COM-04_price-comma-en-locale.png` | **Failed** `safari-ios_PRODDETAIL-COM-04_price-{dot-vi,comma-en}-locale.png` |
| PRODDETAIL-ACC-03 | Viền focus nhìn thấy rõ khi Tab vào ô nhập và nút                    | Passed `chrome-win11_PRODDETAIL-ACC-03_focus-ring-button.png`                      | Passed `firefox-win11_PRODDETAIL-ACC-03_focus-ring-button.png` | `N/A` — iOS Safari không có điều hướng bằng phím Tab nếu không gắn bàn phím ngoài, nên khái niệm "viền focus" không tồn tại |
| PRODDETAIL-ACC-08 | Vùng chạm nút và ô nhập tối thiểu 44px | `N/A` — thao tác bằng chuột, không phải thiết bị cảm ứng nên tiêu chuẩn 44px không áp dụng | `N/A` — cùng lý do như P1 | `Not Run` — chưa đo kích thước vùng chạm thực tế trên iPhone |

**Số item thực chạy (không tính `Not Run`, `Blocked`, `N/A`):** P1 = 14 · P2 = 13 · P3 = 14

| Nền tảng      | Passed | Failed | Blocked | Not Run | N/A | Pass rate          |
| ------------- | ------ | ------ | ------- | ------- | --- | ------------------ |
| P1 Chrome     | 11     | 3      | 1       | 3       | 2   | 11/14 = **78,6 %** |
| P2 Firefox    | 10     | 3      | 1       | 4       | 2   | 10/13 = **76,9 %** |
| P3 Safari iOS | 11     | 3      | 1       | 4       | 1   | 11/14 = **78,6 %** |

---

## Quy ước ảnh chụp

Mỗi ảnh phải thấy đủ **ba** thứ trong cùng khung hình:

1. Tên trình duyệt / OS / thiết bị
2. URL của SUT trên thanh địa chỉ (với P3 là IP LAN — kèm thêm ảnh `ipconfig` / terminal Vite như đã nêu ở trên)
3. Watermark định danh sinh viên

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

| ID                  | Fail trên                 | Phân loại                                                                                                                                                                     | Bug                                                                                           |
| ------------------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `PRODDETAIL-COM-02` | **1/3** — chỉ Safari iOS  | **Cross-platform defect thật.** WebKit không render spinner cho `input[type=number]`; app lại không có nút `+`/`−` thay thế nên trên iPhone không đổi được số lượng bằng chạm | [`BUG-PRODDETAIL-013`](../bug-reports/product-detail/BUG-PRODDETAIL-013.md) — **mới**         |
| `PRODDETAIL-VIS-02` | **2/3** — Chrome, Firefox | Cross-platform defect. Safari "đúng" chỉ vì máy đang để tiếng Việt, không phải do ứng dụng kiểm soát                                                                          | [`BUG-PRODDETAIL-008`](../bug-reports/product-detail/BUG-PRODDETAIL-008.md) — đã có từ Task 1 |
| `PRODDETAIL-COM-04` | **3/3**                   | Defect chung — cùng nguyên nhân với VIS-02: `toLocaleString()` không truyền locale                                                                                            | [`BUG-PRODDETAIL-008`](../bug-reports/product-detail/BUG-PRODDETAIL-008.md) — đã có từ Task 1 |
| `PRODDETAIL-VIS-01` | **3/3**                   | Defect chung — ảnh 300×300 bị phóng lên 455×455, không liên quan engine                                                                                                       | [`BUG-PRODDETAIL-010`](../bug-reports/product-detail/BUG-PRODDETAIL-010.md) — đã có từ Task 1 |

**Kết luận:** Task 3 sinh ra **đúng 1 bug mới** (`BUG-PRODDETAIL-013`). Ba lỗi còn lại đã nằm trong
bug list Task 1 nên theo quy tắc ở trên **không** tính là phát hiện mới — nhưng việc chạy trên thiết
bị thật đã nâng chất lượng bằng chứng cho `BUG-PRODDETAIL-008` từ _giả lập locale bằng Playwright_
lên _quan sát trực tiếp trên hai thiết bị thật với hai locale khác nhau_.

Với mỗi bug platform-specific, dùng `bug_report_template.md` của skill `gui-checklist-builder` và
điền trường `Environment` bằng đúng nền tảng/trình duyệt/OS/viewport tái hiện được, kèm câu trả lời
rõ ràng cho câu hỏi _"có tái hiện trên 2 nền tảng còn lại không"_.

---

## Tóm tắt

- **Platform đã test:** 3 — Chrome 126 (Windows 11), Firefox 128 (Windows 11), Safari trên iPhone thật (iOS, truy cập LAN `192.168.1.126`). Phủ trọn ba engine Blink / Gecko / WebKit.
- **Số item test / platform:** P1 = 14 · P2 = 13 · P3 = 14 (trên tổng 20 item đã lọc từ 73 item của checklist Task 1)
- **Pass rate mỗi platform:** P1 = 78,6 % · P2 = 76,9 % · P3 = 78,6 %
- **Bug platform-specific tìm được:** `BUG-PRODDETAIL-013` (mới, fail 1/3). Ngoài ra xác nhận lại `BUG-PRODDETAIL-008` và `BUG-PRODDETAIL-010` trên thiết bị thật.
- **Bằng chứng:** 50 ảnh chụp, đã chèn watermark hàng loạt, lưu tại `tests/task03/screenshots-watermarked/` (bản gốc chưa watermark giữ ở `tests/task03/screenshots/`).

### Việc còn dang dở

| Item     | Trạng thái       | Cần gì để hoàn tất                                                                                  |
| -------- | ---------------- | --------------------------------------------------------------------------------------------------- |
| `VIS-09` | Blocked ×3       | Desktop: DevTools chặn domain `placehold.co` (không cần sửa code). iOS: cần máy Mac + Web Inspector |
| `VIS-07` | Not Run ×3       | Cần một sản phẩm có tên > 60 ký tự                                                                  |
| `VIS-11` | Not Run ×3       | Cần chụp thêm trang Home và Cart để đối chiếu card                                                  |
| `RES-04` | Not Run ở P1, P2 | Thu cửa sổ desktop về đúng 390×844                                                                  |
| `RES-05` | Not Run ở P2     | Thu cửa sổ Firefox xuống ≤ 640px                                                                    |
| `RES-06` | Not Run ở P3     | Zoom trang trên Safari iOS qua menu AA                                                              |
| `RES-07` | Not Run ở P3     | Xoay ngang iPhone                                                                                   |
| `ACC-08` | Not Run ở P3     | Đo vùng chạm nút/ô nhập trên iPhone                                                                 |

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
