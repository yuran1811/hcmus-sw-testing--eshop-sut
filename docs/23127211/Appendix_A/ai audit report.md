**AI Audit Report Item**

- **Công cụ AI:** Claude Code (Claude Opus 5 — `claude-opus-5`)
- **Thời gian:** 2026-07-27 19:39:18
- **Nội dung prompt:**
  > Hãy chạy skill @.agents/skills/gui-checklist-builder/SKILL.md để thực hiện các task sau
  >
  > ## Inputs
  >
  > **Màn hình cần test (theo thứ tự ưu tiên):**
  >
  > - Primary screen: product detail
  >
  > **Cách inspect:**
  > URL SUT đang chạy: http://localhost:5173/
  > **Target viewports:**
  >
  > - Desktop: 1440×900
  > - Tablet: 768×1024
  > - Mobile: 390×844
  >
  > **Target browsers:**
  >
  > - Chrome 126 (chính)
  > - Firefox 128
  >
  > **Yêu cầu riêng của đề:**
  >
  > - Phải phủ đủ 4 interface aspects: IA-01 (General UI), IA-02 (Forms), IA-03 (Navigation), IA-04 (Feedback/state)
  > - Tổng số item phải > 40
  > - Schema bắt buộc: ID | Screen | Category | Checklist Item | Expected Result | Status | Notes
  > - Status toàn bộ để "Not Run" — KHÔNG điền Passed/Failed, không thực thi
  > - Output: file Markdown, không cần CSV hay Excel
  > - Mỗi item thêm vào sau critical review: ghi rõ lý do AI bỏ sót (weak prompt input / no access to live UI / model blind spot)
  >
  > **Ràng buộc ID:**
  > Dùng prefix theo màn hình để tránh trùng khi gộp file sau:
  > [VD: CHECKOUT-VIS-01, CART-NAV-02, PRODDETAIL-FDB-01]
  >
  > ## Yêu cầu thực hiện
  >
  > Chạy đủ 4 pass tuần tự (IA-01 → IA-02 → IA-03 → IA-04), không dừng giữa chừng để hỏi.
  > Sau mỗi pass, thực hiện critical review ngay — loại item trùng, rewrite Expected Result vague,
  > và bổ sung các item AI thường bỏ sót (accessibility, dark mode, RTL, slow network, empty state,
  > overflow text, double submit).
  >
  > Kết thúc bằng coverage gate (bảng đếm item theo từng IA) trước khi xuất file.
  >
  > Sau đó, hãy sử dụng skill @.agents/skills/ai-audit-logger/SKILL.md để lưu lại toàn bộ log
- **AI output:**

  > # GUI Checklist — Product Detail (EShop SUT)
  >
  > ## 1. Header block
  >
  > | Trường               | Giá trị                                                                                                                                                                                                                                                                                                      |
  > | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
  > | **Screen**           | Product Detail                                                                                                                                                                                                                                                                                               |
  > | **Route**            | `/product/:id` (mẫu dùng để inspect: `/product/1` — iPhone 15 Pro Max)                                                                                                                                                                                                                                       |
  > | **Source component** | `frontend-web/src/pages/ProductDetail.jsx` (khung layout: `frontend-web/src/App.jsx`)                                                                                                                                                                                                                        |
  > | **SUT URL**          | http://localhost:5173/ (backend API: http://localhost:3000/api/products/:id)                                                                                                                                                                                                                                 |
  > | **Cách inspect**     | (1) Đọc source `ProductDetail.jsx`, `App.jsx`, `CartContext.jsx`, `index.css`; (2) Duyệt live UI bằng Playwright/Chromium, chụp màn hình ở cả 3 viewport và truy vấn DOM (naturalWidth, computed style, thuộc tính input/label, landmarks); (3) Gọi thẳng API `GET /api/products` để biết shape dữ liệu thật |
  > | **Target viewports** | Desktop 1440×900 · Tablet 768×1024 · Mobile 390×844                                                                                                                                                                                                                                                          |
  > | **Target browsers**  | Chrome 126 (chính) · Firefox 128                                                                                                                                                                                                                                                                             |
  > | **Building methods** | Component-based · State-based · Risk-based (luồng thêm giỏ hàng chạm tới tiền) · Experience-based · Heuristic-based (Nielsen)                                                                                                                                                                                |
  > | **Số item**          | 71 (yêu cầu > 40)                                                                                                                                                                                                                                                                                            |
  > | **Trạng thái**       | Toàn bộ `Not Run` — checklist này mới ở giai đoạn **thiết kế**, chưa thực thi                                                                                                                                                                                                                                |
  >
  > ### Inventory màn hình (Step 1)
  >
  > **Components thực tế có trên màn hình** (đếm từ DOM, không suy đoán):
  >
  > | Thành phần    | Chi tiết quan sát được                                                                                                                             |
  > | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
  > | Ảnh sản phẩm  | 1 `<img>`, `naturalWidth×Height = 300×300`, render 455×455 (desktop) / 327×327 (tablet) / 308×308 (mobile), `alt` = tên sản phẩm, `loading="auto"` |
  > | Tiêu đề       | 1 `<h1>` duy nhất trên trang; không có `<h2>`/`<h3>`                                                                                               |
  > | Giá           | `<p>` màu đỏ, render qua `Number(price).toLocaleString()` → hiện ra `30,000,000 ₫`                                                                 |
  > | Mô tả         | `<p>` có class `flex-grow`                                                                                                                         |
  > | Ô số lượng    | 1 `<input type="number">`, **không** có `id`, `name`, `min`, `max`, `step`, `aria-label`; giá trị mặc định `1`                                     |
  > | Nhãn số lượng | 1 `<label>` — **không** có thuộc tính `for`                                                                                                        |
  > | Nút hành động | Đúng **1** nút trên toàn màn hình: "Thêm vào giỏ hàng" (184×48 px), có class `bug-mobile-hidden`                                                   |
  > | Khung chung   | `header` + `nav` (logo EShop, Giỏ hàng, Đăng nhập, Đăng ký) + `main` + `footer`                                                                    |
  > | **Không có**  | breadcrumb, badge số lượng giỏ hàng, thông tin tồn kho, nút Mua ngay, nút tăng/giảm số lượng, tab mô tả/đánh giá                                   |
  >
  > **States quan sát được:**
  >
  > | Loại state                  | Biểu hiện thực tế                                                          |
  > | --------------------------- | -------------------------------------------------------------------------- |
  > | Screen — Initial/Loading    | `<div>Đang tải...</div>` (chữ thuần, không spinner)                        |
  > | Screen — Empty/Not found    | `/product/99999` → `Sản phẩm không tồn tại (Lỗi trắng trang do data rỗng)` |
  > | Screen — Error              | `.catch()` chỉ gọi `console.error` → **không có** state lỗi riêng          |
  > | Button — Default / Success  | `Thêm vào giỏ hàng` ↔ `Đã thêm` (tự trở lại sau 2000 ms)                   |
  > | Button — Disabled / Loading | **không tồn tại**                                                          |
  > | Input — Invalid             | **không tồn tại** (không có validation nào)                                |
  >
  > **Data-dependent variations cần chú ý:** tên/mô tả sản phẩm dài, `price` sai định dạng → `NaN`, `imageUrl` trỏ ra domain ngoài (`placehold.co`) nên phụ thuộc mạng, danh sách sản phẩm rỗng, id không hợp lệ.
  >
  > ***
  >
  > ## 2. Pass log (4 pass tuần tự)
  >
  > | Pass | Aspect               | Categories          | Sinh ở pass đầu | Thêm sau critical review | Tổng   |
  > | ---- | -------------------- | ------------------- | --------------- | ------------------------ | ------ |
  > | 1/4  | IA-01 General UI     | `VIS`, `RES`, `COM` | 15              | 8                        | 23     |
  > | 2/4  | IA-02 Forms          | `VAL`, `FUN`        | 11              | 6                        | 17     |
  > | 3/4  | IA-03 Navigation     | `NAV`               | 6               | 4                        | 10     |
  > | 4/4  | IA-04 Feedback/state | `FDB`, `USB`, `ACC` | 13              | 8                        | 21     |
  > |      |                      |                     | **45**          | **26**                   | **71** |
  >
  > ***
  >
  > ## 3. Critical review — item được bổ sung và lý do pass đầu bỏ sót
  >
  > Ba nhóm lý do: **[WPI]** Weak prompt input · **[NLU]** No access to live UI · **[MBS]** Model blind spot.
  >
  > ### Pass 1 — IA-01
  >
  > | ID bổ sung          | Nhóm | Vì sao pass đầu bỏ sót                                                                                                                                                                                                                                                   |
  > | ------------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
  > | `PRODDETAIL-VIS-01` | MBS  | Pass đầu chỉ sinh item "ảnh sản phẩm hiển thị đúng", mặc định ảnh luôn đúng độ phân giải. Chỉ khi đo thật `naturalWidth=300` so với chiều rộng render 455 px mới thấy ảnh bị phóng to ~52% → rủi ro vỡ nét. Mô hình mặc định tin vào asset, không nghĩ tới việc _đo_ nó. |
  > | `PRODDETAIL-VIS-02` | WPI  | Prompt không nêu SUT là ứng dụng **tiếng Việt**. Pass đầu chấp nhận mọi định dạng có phân tách hàng nghìn, trong khi `toLocaleString()` không truyền locale sẽ theo locale trình duyệt (`lang="en"` → `30,000,000`) thay vì chuẩn vi-VN `30.000.000`.                    |
  > | `PRODDETAIL-VIS-04` | NLU  | Khoảng trắng dọc thừa giữa mô tả và khối "Số lượng" sinh ra do `flex-grow` trên thẻ mô tả khi mô tả chỉ dài 1 dòng. Đọc source không đủ thấy; chỉ lộ ra khi render thật ở 1440×900.                                                                                      |
  > | `PRODDETAIL-VIS-09` | MBS  | Thiên happy-path: mặc định `imageUrl` luôn tải được. Thực tế ảnh trỏ ra domain ngoài `placehold.co` nên hoàn toàn có thể hỏng.                                                                                                                                           |
  > | `PRODDETAIL-VIS-10` | WPI  | Prompt chỉ nói "màn hình product detail", không nhắc metadata trang. Pass đầu bỏ qua `document.title` — thực tế vẫn là `frontend-web` mặc định của Vite cho mọi sản phẩm.                                                                                                |
  > | `PRODDETAIL-RES-05` | NLU  | Class `bug-mobile-hidden` nghe như "ẩn trên mobile" nhưng đọc `index.css` mới biết nó đặt `margin-right: -100px` ở `max-width: 640px`. Không đọc CSS thì pass đầu không thể biết có gì bất thường ở breakpoint này.                                                      |
  > | `PRODDETAIL-RES-06` | MBS  | Chỉ nghĩ tới thay đổi kích thước viewport, quên **zoom trình duyệt** — một biến khác hoàn toàn với resize.                                                                                                                                                               |
  > | `PRODDETAIL-RES-07` | MBS  | Bỏ qua chiều **landscape** của mobile; mặc định mobile luôn ở portrait.                                                                                                                                                                                                  |
  >
  > ### Pass 2 — IA-02
  >
  > | ID bổ sung                               | Nhóm | Vì sao pass đầu bỏ sót                                                                                                                                                          |
  > | ---------------------------------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  > | `PRODDETAIL-VAL-03`                      | MBS  | Pass đầu chỉ nghĩ tới số âm và số 0 — hai case "kinh điển". Bỏ qua đặc tính `input[type=number]` vẫn nhận **số thập phân**, trong khi số lượng hàng phải là số nguyên.          |
  > | `PRODDETAIL-VAL-06`                      | MBS  | Bỏ qua việc `input[type=number]` chấp nhận ký hiệu mũ (`2e3`) — hành vi HTML ít người nhớ, không nằm trong mẫu test quen thuộc của mô hình.                                     |
  > | `PRODDETAIL-VAL-04`                      | MBS  | Happy-path: giả định ô số lượng luôn có giá trị. Thực tế xoá rỗng rồi submit sẽ đưa `parseInt("")` → `NaN` vào giỏ hàng.                                                        |
  > | `PRODDETAIL-FUN-01`, `PRODDETAIL-FUN-02` | NLU  | Logic `clickCount` (lần bấm đầu tiên **không làm gì**, chỉ `return`) không thể đoán từ mô tả màn hình. Chỉ lộ ra khi đọc source **và** bấm thật 2 lần trên live UI để xác nhận. |
  > | `PRODDETAIL-FUN-04`                      | MBS  | Mặc định `addToCart` gộp theo sản phẩm như mọi giỏ hàng thông thường. Đọc `CartContext.jsx` mới thấy nó luôn `setCart([...cart, {...}])` — tức thêm dòng mới, không gộp.        |
  > | `PRODDETAIL-FUN-06`                      | MBS  | Quên phím **Enter** trong form một trường — một lối tương tác rất tự nhiên với người dùng nhưng hiếm khi xuất hiện trong checklist do mô hình sinh.                             |
  >
  > ### Pass 3 — IA-03
  >
  > | ID bổ sung                               | Nhóm | Vì sao pass đầu bỏ sót                                                                                                                                                                                                                                  |
  > | ---------------------------------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  > | `PRODDETAIL-NAV-06`, `PRODDETAIL-NAV-07` | MBS  | Happy-path: chỉ sinh item cho `/product/1` hợp lệ. Bỏ qua id không tồn tại (`/product/99999`) và id sai kiểu (`/product/abc`) — đúng hai chỗ dễ vỡ nhất của route có tham số.                                                                           |
  > | `PRODDETAIL-NAV-08`                      | WPI  | Prompt không nói SUT **có** breadcrumb hay không, nên pass đầu mặc định là có và sinh item "breadcrumb hoạt động đúng". Inventory thật cho thấy màn hình **không có** breadcrumb → item phải đổi thành kiểm tra _sự thiếu vắng lối quay lại danh sách_. |
  > | `PRODDETAIL-NAV-09`                      | MBS  | Bỏ qua việc giỏ hàng chỉ nằm trong React state (`useState`), không persist. Rời trang hay F5 là mất sạch — một hệ quả của kiến trúc, không nhìn thấy nếu chỉ xét màn hình đơn lẻ.                                                                       |
  > | `PRODDETAIL-NAV-10`                      | WPI  | Prompt không nêu SUT có trạng thái đăng nhập. Header đổi nội dung theo `user`, nên hành trình đăng nhập rồi quay lại product detail là một nhánh điều hướng thật cần kiểm tra.                                                                          |
  >
  > ### Pass 4 — IA-04
  >
  > | ID bổ sung          | Nhóm | Vì sao pass đầu bỏ sót                                                                                                                                                                                                                   |
  > | ------------------- | ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  > | `PRODDETAIL-ACC-01` | NLU  | Chỉ khi truy vấn DOM thật mới thấy `<label>` không có `for` và `<input>` không có `id`/`name`/`aria-label`. Nhìn giao diện thì nhãn "Số lượng:" nằm ngay cạnh ô nhập nên trông hoàn toàn bình thường.                                    |
  > | `PRODDETAIL-ACC-06` | WPI  | Prompt không nêu ngôn ngữ nội dung. DOM khai báo `<html lang="en">` trong khi toàn bộ nội dung là tiếng Việt — screen reader sẽ đọc sai ngữ điệu. Không kiểm tra thuộc tính `lang` thì không bao giờ phát hiện.                          |
  > | `PRODDETAIL-ACC-07` | MBS  | Nút đổi nhãn từ "Thêm vào giỏ hàng" thành "Đã thêm" là thay đổi **thị giác thuần tuý**; không có `aria-live` nên người dùng screen reader không được thông báo. Mô hình mặc định "có phản hồi trên màn hình" là đủ.                      |
  > | `PRODDETAIL-ACC-08` | WPI  | Prompt có nêu viewport mobile 390×844 nhưng không nêu tiêu chuẩn kích thước vùng chạm, nên pass đầu không sinh item về touch target tối thiểu 44–48 px.                                                                                  |
  > | `PRODDETAIL-FDB-02` | MBS  | `.catch()` trong `useEffect` chỉ gọi `console.error` mà không set state lỗi → khi backend chết, `product` giữ nguyên `null` và màn hình **kẹt vĩnh viễn** ở "Đang tải...". Mô hình thiên happy-path nên coi như request luôn thành công. |
  > | `PRODDETAIL-FDB-03` | NLU  | Chuỗi `Sản phẩm không tồn tại (Lỗi trắng trang do data rỗng)` là ghi chú debug của lập trình viên bị lộ ra người dùng cuối. Chỉ thấy được khi thật sự mở `/product/99999`.                                                               |
  > | `PRODDETAIL-FDB-06` | MBS  | Không có cơ chế disable nút trong lúc xử lý → bỏ ngỏ double-submit. Đây là item về _sự vắng mặt_ của một trạng thái, khó sinh hơn item về trạng thái đang tồn tại.                                                                       |
  > | `PRODDETAIL-FDB-07` | MBS  | Chỉ xét phản hồi **trong phạm vi màn hình**, quên rằng thêm vào giỏ phải phản ánh ở header dùng chung (hiện không có badge đếm).                                                                                                         |
  >
  > ***
  >
  > ## 4. Coverage gate
  >
  > | Aspect                       | Categories                   | Items  | ≥ 1 item? |
  > | ---------------------------- | ---------------------------- | ------ | --------- |
  > | IA-01 — General UI standards | `VIS` 12 + `RES` 7 + `COM` 4 | 23     | ✅        |
  > | IA-02 — Forms                | `VAL` 10 + `FUN` 7           | 17     | ✅        |
  > | IA-03 — Navigation           | `NAV` 10                     | 10     | ✅        |
  > | IA-04 — Feedback / state     | `FDB` 7 + `USB` 5 + `ACC` 9  | 21     | ✅        |
  > | **Total**                    |                              | **71** | ✅ > 40   |
  >
  > **Kiểm tra cân bằng:** aspect nhỏ nhất (IA-03, 10 item) chiếm 14% tổng số, aspect lớn nhất (IA-01, 23 item) chiếm 32%. Không có aspect nào rỗng hay bị bỏ rơi; phân bố lệch về IA-01 là hợp lý vì đề yêu cầu test trên 3 viewport và 2 trình duyệt.
  >
  > ***
  >
  > ## 5. Checklist
  >
  > > Toàn bộ `Status` = `Not Run` và `Notes` để trống — đây là bản thiết kế. Người thực thi sẽ điền `Passed`/`Failed`, ghi lý do fail vào `Notes`, và chụp màn hình cho **riêng các item Failed**.
  >
  > ### IA-01 — General UI standards
  >
  > | ID                | Screen         | Category      | Checklist Item                                                                                                                | Expected Result                                                                                                                  | Status  | Notes |
  > | ----------------- | -------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------- | ----- |
  > | PRODDETAIL-VIS-01 | Product Detail | Visual        | Mở `/product/1` ở 1440×900, phóng to vùng ảnh sản phẩm và so sánh với kích thước gốc của file ảnh                             | Ảnh hiển thị sắc nét, không bị vỡ hạt hay nhoè do bị phóng to vượt kích thước gốc                                                | Not Run |       |
  > | PRODDETAIL-VIS-02 | Product Detail | Visual        | Quan sát dấu phân tách hàng nghìn của giá sản phẩm (sản phẩm mẫu có giá 30000000)                                             | Giá hiển thị theo chuẩn tiền tệ Việt Nam `30.000.000` (dấu chấm), không phải `30,000,000`                                        | Not Run |       |
  > | PRODDETAIL-VIS-03 | Product Detail | Visual        | Quan sát vị trí và khoảng cách của ký hiệu `₫` so với phần số của giá                                                         | Ký hiệu `₫` đứng sau phần số, cách đúng một khoảng trắng, cùng cỡ chữ và cùng màu với phần số                                    | Not Run |       |
  > | PRODDETAIL-VIS-04 | Product Detail | Visual        | Ở 1440×900, đo khoảng trắng dọc giữa đáy đoạn mô tả và nhãn "Số lượng:" với sản phẩm có mô tả ngắn 1 dòng                     | Khoảng cách dọc nằm trong khoảng đồng nhất với các khối khác trên trang; không xuất hiện vùng trắng lớn bất thường giữa hai khối | Not Run |       |
  > | PRODDETAIL-VIS-05 | Product Detail | Visual        | Quan sát nhãn "Số lượng:" và ô nhập số lượng nằm cạnh nhau                                                                    | Nhãn và ô nhập căn giữa theo trục dọc; đường tâm ngang của chữ trùng với đường tâm ngang của ô nhập                              | Not Run |       |
  > | PRODDETAIL-VIS-06 | Product Detail | Visual        | So sánh chiều cao ô nhập số lượng với chiều cao nút "Thêm vào giỏ hàng"                                                       | Hai thành phần có tỉ lệ cân đối, cùng hệ bo góc; không có thành phần nào cao gấp đôi thành phần kia                              | Not Run |       |
  > | PRODDETAIL-VIS-07 | Product Detail | Visual        | Mở một sản phẩm có tên dài trên 60 ký tự (sửa dữ liệu qua API nếu cần)                                                        | Tên sản phẩm tự xuống dòng trong phạm vi cột phải, không tràn ra ngoài card trắng và không đè lên giá                            | Not Run |       |
  > | PRODDETAIL-VIS-08 | Product Detail | Visual        | Mở một sản phẩm có mô tả dài trên 500 ký tự                                                                                   | Mô tả xuống dòng đầy đủ bên trong card, không bị cắt cụt và không tràn ra ngoài viền card                                        | Not Run |       |
  > | PRODDETAIL-VIS-09 | Product Detail | Visual        | Chặn domain ảnh ngoài (`placehold.co`) trong DevTools rồi tải lại trang                                                       | Hiển thị văn bản `alt` hoặc ảnh thay thế; bố cục 2 cột giữ nguyên, cột phải không bị đẩy lệch                                    | Not Run |       |
  > | PRODDETAIL-VIS-10 | Product Detail | Visual        | Đọc tiêu đề tab trình duyệt khi đang ở trang chi tiết sản phẩm                                                                | Tiêu đề tab chứa tên sản phẩm đang xem, không phải chuỗi mặc định của dự án                                                      | Not Run |       |
  > | PRODDETAIL-VIS-11 | Product Detail | Visual        | So sánh card trắng bao nội dung với card ở trang Home và trang Cart                                                           | Cùng độ bo góc, cùng màu viền và cùng độ đổ bóng với card ở hai trang kia                                                        | Not Run |       |
  > | PRODDETAIL-VIS-12 | Product Detail | Visual        | Quan sát đoạn mô tả sản phẩm màu xám trên nền trắng ở độ sáng màn hình mặc định                                               | Chữ mô tả đọc được rõ ràng, không bị chìm vào nền trắng                                                                          | Not Run |       |
  > | PRODDETAIL-RES-01 | Product Detail | Responsive    | Mở `/product/1` ở viewport 1440×900                                                                                           | Ảnh và khối thông tin xếp thành 2 cột ngang nhau, mỗi cột chiếm khoảng nửa chiều rộng card                                       | Not Run |       |
  > | PRODDETAIL-RES-02 | Product Detail | Responsive    | Mở `/product/1` ở viewport 768×1024                                                                                           | Bố cục vẫn giữ 2 cột (đúng breakpoint `md`); không có phần tử nào bị chồng lấn                                                   | Not Run |       |
  > | PRODDETAIL-RES-03 | Product Detail | Responsive    | Thu viewport xuống 767×1024 (ngay dưới breakpoint `md`)                                                                       | Bố cục chuyển sang 1 cột: ảnh nằm trên, khối thông tin nằm dưới; không có khoảng trống lớn bất thường                            | Not Run |       |
  > | PRODDETAIL-RES-04 | Product Detail | Responsive    | Mở `/product/1` ở viewport 390×844 và thử cuộn ngang                                                                          | Không xuất hiện thanh cuộn ngang; `scrollWidth` của trang bằng đúng `clientWidth`                                                | Not Run |       |
  > | PRODDETAIL-RES-05 | Product Detail | Responsive    | Ở viewport 390×844, quan sát vị trí nút "Thêm vào giỏ hàng" so với mép trái/phải của card và so với ô nhập số lượng phía trên | Nút nằm trọn trong card, canh lề trái thẳng hàng với ô nhập số lượng, không bị đẩy lệch sang phải hay tràn khỏi vùng nội dung    | Not Run |       |
  > | PRODDETAIL-RES-06 | Product Detail | Responsive    | Ở 1440×900, đặt zoom trình duyệt lên 150%                                                                                     | Toàn bộ nội dung vẫn đọc được, không chồng chữ, không xuất hiện thanh cuộn ngang                                                 | Not Run |       |
  > | PRODDETAIL-RES-07 | Product Detail | Responsive    | Xoay mobile sang landscape (viewport 844×390)                                                                                 | Ảnh và thông tin sắp xếp lại hợp lý; nút "Thêm vào giỏ hàng" vẫn tiếp cận được bằng cách cuộn dọc                                | Not Run |       |
  > | PRODDETAIL-COM-01 | Product Detail | Compatibility | Mở `/product/1` ở 1440×900 lần lượt trên Chrome 126 và Firefox 128, so sánh ảnh chụp màn hình                                 | Bố cục, cỡ chữ, màu sắc và vị trí các phần tử giống nhau trên hai trình duyệt                                                    | Not Run |       |
  > | PRODDETAIL-COM-02 | Product Detail | Compatibility | So sánh hiển thị nút tăng/giảm (spinner) của ô số lượng trên Chrome 126 và Firefox 128                                        | Spinner hiển thị và hoạt động nhất quán trên cả hai; không trình duyệt nào làm ô nhập bị đổi chiều rộng hay che mất giá trị      | Not Run |       |
  > | PRODDETAIL-COM-03 | Product Detail | Compatibility | Kiểm tra hiển thị dấu tiếng Việt ở tên sản phẩm, mô tả và nhãn "Số lượng:" trên cả hai trình duyệt                            | Toàn bộ dấu tiếng Việt hiển thị đúng, không có ô vuông, không mất dấu, không lệch chân chữ                                       | Not Run |       |
  > | PRODDETAIL-COM-04 | Product Detail | Compatibility | Đổi ngôn ngữ ưu tiên của trình duyệt sang `en-US` rồi sang `vi-VN`, tải lại trang và so sánh chuỗi giá                        | Chuỗi giá giữ nguyên một định dạng thống nhất theo chuẩn Việt Nam, không đổi theo ngôn ngữ trình duyệt                           | Not Run |       |
  >
  > ### IA-02 — Forms
  >
  > | ID                | Screen         | Category   | Checklist Item                                                                                      | Expected Result                                                                                                       | Status  | Notes |
  > | ----------------- | -------------- | ---------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ------- | ----- |
  > | PRODDETAIL-VAL-01 | Product Detail | Validation | Nhập `-1` vào ô Số lượng rồi bấm "Thêm vào giỏ hàng"                                                | Hiện thông báo lỗi ngay dưới ô Số lượng; sản phẩm không được thêm vào giỏ                                             | Not Run |       |
  > | PRODDETAIL-VAL-02 | Product Detail | Validation | Nhập `0` vào ô Số lượng rồi bấm "Thêm vào giỏ hàng"                                                 | Hiện thông báo lỗi yêu cầu số lượng tối thiểu là 1; sản phẩm không được thêm vào giỏ                                  | Not Run |       |
  > | PRODDETAIL-VAL-03 | Product Detail | Validation | Nhập `1.5` vào ô Số lượng rồi bấm "Thêm vào giỏ hàng"                                               | Hệ thống từ chối giá trị thập phân và báo số lượng phải là số nguyên; giỏ hàng không nhận `1.5`                       | Not Run |       |
  > | PRODDETAIL-VAL-04 | Product Detail | Validation | Xoá trắng ô Số lượng rồi bấm "Thêm vào giỏ hàng"                                                    | Hiện thông báo bắt buộc nhập số lượng; giỏ hàng không nhận giá trị rỗng hay `NaN`                                     | Not Run |       |
  > | PRODDETAIL-VAL-05 | Product Detail | Validation | Gõ chuỗi chữ `abc` vào ô Số lượng                                                                   | Ô nhập không nhận ký tự chữ; giá trị hiển thị vẫn là số hợp lệ trước đó                                               | Not Run |       |
  > | PRODDETAIL-VAL-06 | Product Detail | Validation | Gõ `2e3` vào ô Số lượng rồi bấm "Thêm vào giỏ hàng"                                                 | Hệ thống từ chối ký hiệu mũ và báo lỗi; giỏ hàng không nhận giá trị 2000                                              | Not Run |       |
  > | PRODDETAIL-VAL-07 | Product Detail | Validation | Nhập `999999999` vào ô Số lượng rồi bấm "Thêm vào giỏ hàng"                                         | Hệ thống chặn theo giới hạn số lượng tối đa và báo rõ giới hạn đó cho người dùng                                      | Not Run |       |
  > | PRODDETAIL-VAL-08 | Product Detail | Validation | Kiểm tra thuộc tính `min`, `max`, `step` của ô nhập số lượng bằng DevTools                          | Ô nhập khai báo `min="1"` và `step="1"` để trình duyệt chặn giá trị không hợp lệ ngay từ đầu                          | Not Run |       |
  > | PRODDETAIL-VAL-09 | Product Detail | Validation | Với giá trị đang là `1`, bấm mũi tên giảm của ô số lượng                                            | Giá trị dừng lại ở `1`, không giảm xuống `0` hay số âm                                                                | Not Run |       |
  > | PRODDETAIL-VAL-10 | Product Detail | Validation | Dán (paste) chuỗi `-5` vào ô Số lượng rồi bấm "Thêm vào giỏ hàng"                                   | Giá trị âm bị chặn giống như khi gõ tay; hiện thông báo lỗi và không thêm vào giỏ                                     | Not Run |       |
  > | PRODDETAIL-FUN-01 | Product Detail | Functional | Tải mới trang `/product/1`, giữ số lượng mặc định `1`, bấm nút "Thêm vào giỏ hàng" **đúng một lần** | Sản phẩm được thêm vào giỏ ngay ở lần bấm đầu tiên; nhãn nút chuyển sang trạng thái xác nhận                          | Not Run |       |
  > | PRODDETAIL-FUN-02 | Product Detail | Functional | Sau bước trên, bấm nút "Thêm vào giỏ hàng" lần thứ hai                                              | Giỏ hàng có đúng 2 lượt thêm tương ứng 2 lần bấm — không nhiều hơn, không ít hơn                                      | Not Run |       |
  > | PRODDETAIL-FUN-03 | Product Detail | Functional | Bấm nút "Thêm vào giỏ hàng" hai lần thật nhanh liên tiếp (double-click)                             | Chỉ ghi nhận đúng số lần bấm thực tế; không tạo ra bản ghi giỏ hàng thừa do double-submit                             | Not Run |       |
  > | PRODDETAIL-FUN-04 | Product Detail | Functional | Thêm cùng một sản phẩm vào giỏ 2 lượt riêng biệt, sau đó mở trang Giỏ hàng                          | Giỏ hàng gộp thành 1 dòng với số lượng cộng dồn, không tạo 2 dòng trùng tên sản phẩm                                  | Not Run |       |
  > | PRODDETAIL-FUN-05 | Product Detail | Functional | Nhập số lượng `3`, thêm vào giỏ, rồi mở trang Giỏ hàng                                              | Dòng sản phẩm trong giỏ hiển thị đúng số lượng `3` và thành tiền bằng đơn giá nhân 3                                  | Not Run |       |
  > | PRODDETAIL-FUN-06 | Product Detail | Functional | Đặt con trỏ vào ô Số lượng rồi nhấn phím `Enter`                                                    | Hành vi rõ ràng và nhất quán: hoặc thêm vào giỏ, hoặc không làm gì — không tải lại trang, không mất giá trị đang nhập | Not Run |       |
  > | PRODDETAIL-FUN-07 | Product Detail | Functional | Sau khi thêm thành công, quan sát nhãn nút liên tục trong 5 giây                                    | Nhãn xác nhận hiển thị đủ lâu để người dùng kịp đọc rồi mới trở về nhãn gốc                                           | Not Run |       |
  >
  > ### IA-03 — Navigation
  >
  > | ID                | Screen         | Category   | Checklist Item                                                                                     | Expected Result                                                                                                      | Status  | Notes |
  > | ----------------- | -------------- | ---------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ------- | ----- |
  > | PRODDETAIL-NAV-01 | Product Detail | Navigation | Từ `/product/1`, bấm logo "EShop" ở header                                                         | Điều hướng về trang Home `/`; danh sách sản phẩm hiển thị đầy đủ                                                     | Not Run |       |
  > | PRODDETAIL-NAV-02 | Product Detail | Navigation | Từ `/product/1`, bấm link "Giỏ hàng" ở header                                                      | Điều hướng tới `/cart`; các sản phẩm đã thêm trước đó hiển thị đúng                                                  | Not Run |       |
  > | PRODDETAIL-NAV-03 | Product Detail | Navigation | Từ Home bấm vào một sản phẩm, sau đó bấm nút Back của trình duyệt                                  | Quay lại đúng trang Home, giữ nguyên vị trí cuộn trước đó                                                            | Not Run |       |
  > | PRODDETAIL-NAV-04 | Product Detail | Navigation | Sau khi Back về Home, bấm nút Forward của trình duyệt                                              | Quay lại đúng trang chi tiết của sản phẩm vừa xem, dữ liệu hiển thị đầy đủ                                           | Not Run |       |
  > | PRODDETAIL-NAV-05 | Product Detail | Navigation | Dán trực tiếp URL `http://localhost:5173/product/2` vào thanh địa chỉ của tab mới                  | Trang chi tiết sản phẩm id=2 tải được độc lập, không cần đi qua trang Home trước                                     | Not Run |       |
  > | PRODDETAIL-NAV-06 | Product Detail | Navigation | Truy cập `/product/99999` (id không tồn tại trong dữ liệu)                                         | Hiển thị thông báo thân thiện với người dùng cuối kèm lối quay lại danh sách sản phẩm                                | Not Run |       |
  > | PRODDETAIL-NAV-07 | Product Detail | Navigation | Truy cập `/product/abc` (id sai kiểu dữ liệu)                                                      | Xử lý an toàn như trường hợp không tìm thấy sản phẩm; không hiển thị màn hình trắng hay lỗi kỹ thuật                 | Not Run |       |
  > | PRODDETAIL-NAV-08 | Product Detail | Navigation | Từ trang chi tiết, tìm cách quay lại danh sách sản phẩm **mà không dùng** nút Back của trình duyệt | Trang cung cấp lối quay lại rõ ràng ngay trong nội dung (breadcrumb hoặc link "Quay lại danh sách")                  | Not Run |       |
  > | PRODDETAIL-NAV-09 | Product Detail | Navigation | Thêm sản phẩm vào giỏ, nhấn F5 tải lại trang, rồi mở trang Giỏ hàng                                | Sản phẩm đã thêm vẫn còn trong giỏ sau khi tải lại trang                                                             | Not Run |       |
  > | PRODDETAIL-NAV-10 | Product Detail | Navigation | Từ `/product/1` bấm "Đăng nhập", đăng nhập thành công, rồi quay lại trang chi tiết sản phẩm        | Sau đăng nhập người dùng được đưa về đúng ngữ cảnh trước đó; header hiển thị tên người dùng và giỏ hàng không bị mất | Not Run |       |
  >
  > ### IA-04 — Feedback / state
  >
  > | ID                | Screen         | Category      | Checklist Item                                                                             | Expected Result                                                                                                       | Status  | Notes |
  > | ----------------- | -------------- | ------------- | ------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- | ------- | ----- |
  > | PRODDETAIL-FDB-01 | Product Detail | Feedback      | Bật throttle "Slow 3G" trong DevTools rồi mở `/product/1`                                  | Hiển thị chỉ báo đang tải có tính thị giác (spinner/skeleton) thay cho chữ thuần, cho tới khi dữ liệu về              | Not Run |       |
  > | PRODDETAIL-FDB-02 | Product Detail | Feedback      | Tắt backend (cổng 3000) rồi mở `/product/1`, chờ 30 giây                                   | Hiển thị trạng thái lỗi rõ ràng kèm nút "Thử lại"; màn hình không kẹt vô hạn ở trạng thái đang tải                    | Not Run |       |
  > | PRODDETAIL-FDB-03 | Product Detail | Feedback      | Mở `/product/99999` và đọc nguyên văn thông báo hiển thị cho người dùng                    | Thông báo viết cho người dùng cuối, không chứa thuật ngữ debug nội bộ của lập trình viên                              | Not Run |       |
  > | PRODDETAIL-FDB-04 | Product Detail | Feedback      | Tải mới trang, bấm "Thêm vào giỏ hàng" đúng một lần và quan sát toàn màn hình trong 2 giây | Có phản hồi thị giác tức thì cho thao tác bấm; người dùng không rơi vào tình trạng bấm xong mà không thấy gì thay đổi | Not Run |       |
  > | PRODDETAIL-FDB-05 | Product Detail | Feedback      | Quan sát cách hệ thống xác nhận sau khi thêm sản phẩm vào giỏ thành công                   | Xác nhận đủ nổi bật để nhận ra ngay cả khi mắt người dùng không đặt trên nút (ví dụ toast hoặc thay đổi ở giỏ hàng)   | Not Run |       |
  > | PRODDETAIL-FDB-06 | Product Detail | Feedback      | Bấm "Thêm vào giỏ hàng" và quan sát trạng thái nút trong lúc thao tác đang được xử lý      | Nút chuyển sang trạng thái vô hiệu hoặc đang xử lý, ngăn người dùng bấm chồng lần nữa                                 | Not Run |       |
  > | PRODDETAIL-FDB-07 | Product Detail | Feedback      | Thêm sản phẩm vào giỏ rồi nhìn lên link "Giỏ hàng" ở header mà không rời trang             | Link "Giỏ hàng" hiển thị số lượng mặt hàng cập nhật ngay, không cần mở trang giỏ để biết                              | Not Run |       |
  > | PRODDETAIL-USB-01 | Product Detail | Usability     | Nhờ một người chưa từng dùng EShop thêm sản phẩm vào giỏ, quan sát mà không hướng dẫn      | Người dùng thêm được sản phẩm ở lần thử đầu tiên, không phải bấm thử nhiều lần để đoán cách hoạt động                 | Not Run |       |
  > | PRODDETAIL-USB-02 | Product Detail | Usability     | Tìm thông tin tình trạng còn hàng / hết hàng trên trang chi tiết                           | Trang cho biết sản phẩm còn hàng hay không trước khi người dùng bấm thêm vào giỏ                                      | Not Run |       |
  > | PRODDETAIL-USB-03 | Product Detail | Usability     | Kiểm tra khả năng đi thẳng tới thanh toán từ trang chi tiết sản phẩm                       | Có lối đi tới bước thanh toán mà không bắt buộc phải mở trang Giỏ hàng làm trung gian                                 | Not Run |       |
  > | PRODDETAIL-USB-04 | Product Detail | Usability     | Đọc nhãn nút hành động chính và đối chiếu với việc nó thực sự làm                          | Nhãn nút mô tả đúng và đủ hành động thực tế xảy ra khi bấm                                                            | Not Run |       |
  > | PRODDETAIL-USB-05 | Product Detail | Usability     | Kiểm tra trang có hiển thị sản phẩm liên quan hoặc cùng danh mục không                     | Người dùng có thể tiếp tục khám phá sản phẩm khác mà không phải quay ngược về trang Home                              | Not Run |       |
  > | PRODDETAIL-ACC-01 | Product Detail | Accessibility | Bấm chuột vào chữ "Số lượng:"                                                              | Con trỏ nhảy vào ô nhập số lượng, chứng tỏ nhãn đã được liên kết đúng với ô nhập                                      | Not Run |       |
  > | PRODDETAIL-ACC-02 | Product Detail | Accessibility | Từ đầu trang, nhấn Tab liên tục cho tới hết trang                                          | Thứ tự focus đi theo trình tự đọc: header → nội dung → ô số lượng → nút thêm vào giỏ → footer                         | Not Run |       |
  > | PRODDETAIL-ACC-03 | Product Detail | Accessibility | Dùng Tab để đưa focus lần lượt vào ô số lượng và nút "Thêm vào giỏ hàng"                   | Mỗi phần tử đang focus đều có viền/vòng focus nhìn thấy rõ trên nền trắng                                             | Not Run |       |
  > | PRODDETAIL-ACC-04 | Product Detail | Accessibility | Đưa focus vào nút "Thêm vào giỏ hàng" rồi lần lượt nhấn `Enter` và `Space`                 | Cả hai phím đều kích hoạt nút giống hệt như khi bấm chuột                                                             | Not Run |       |
  > | PRODDETAIL-ACC-05 | Product Detail | Accessibility | Kiểm tra thuộc tính `alt` của ảnh sản phẩm bằng DevTools                                   | `alt` mô tả đúng sản phẩm trong ảnh, không để trống và không phải tên file                                            | Not Run |       |
  > | PRODDETAIL-ACC-06 | Product Detail | Accessibility | Kiểm tra thuộc tính `lang` của thẻ `<html>` khi đang ở trang chi tiết                      | `lang` khai báo `vi` khớp với ngôn ngữ nội dung thực tế của trang                                                     | Not Run |       |
  > | PRODDETAIL-ACC-07 | Product Detail | Accessibility | Bật screen reader (NVDA hoặc Narrator), thêm sản phẩm vào giỏ và lắng nghe                 | Screen reader đọc lên thông báo thêm thành công; kết quả thao tác không chỉ thể hiện bằng thị giác                    | Not Run |       |
  > | PRODDETAIL-ACC-08 | Product Detail | Accessibility | Ở viewport 390×844, đo kích thước vùng chạm của nút "Thêm vào giỏ hàng" và ô số lượng      | Cả hai có cạnh ngắn tối thiểu 44 px và cách nhau đủ xa để không bấm nhầm bằng ngón tay                                | Not Run |       |
  > | PRODDETAIL-ACC-09 | Product Detail | Accessibility | Liệt kê toàn bộ thẻ heading trên trang bằng DevTools                                       | Cấu trúc heading có thứ bậc hợp lý, không nhảy cấp, đủ để screen reader điều hướng theo vùng nội dung                 | Not Run |       |
  >
  > ***
  >
  > ## 6. Handoff
  >
  > Bước tiếp theo **do người thực hiện**, không thuộc phạm vi skill này:
  >
  > 1. Mở SUT ở từng viewport/trình duyệt trong bảng, chạy từng dòng, điền `Passed`/`Failed`.
  > 2. Với mỗi dòng `Failed`: ghi lý do cụ thể vào cột `Notes` và chụp màn hình (chỉ chụp cho item Failed).
  > 3. Chuyển mỗi item `Failed` thành bug report — copy **nguyên văn** cột `Expected Result` sang trường ER của bug để giữ mạch truy vết `checklist item → Failed → evidence → bug`.
  > 4. Lưu bug report vào `tests/bug-reports/product-detail/` và tạo GitHub Issue kèm ảnh.

- **Đánh giá:** Incomplete
- **Suy luận:**
  Sau khi nhận output từ 4 pass, tôi thực hiện critical review và phát hiện một số vấn đề cần bổ sung hoặc chỉnh sửa so với bản AI sinh ban đầu:
  - **1 item sửa lại bản chất**: PRODDETAIL-USB-01 trong bản gốc yêu cầu có người thứ ba tham gia quan sát — không phải item GUI checklist độc lập mà là mini usability test. Đã viết lại thành item tester một mình kiểm tra được (đọc nhãn nút và đánh giá tính mô tả của nó).
  - **2 item thêm sau review lần hai**: PRODDETAIL-VIS-13 (dark mode) và PRODDETAIL-VIS-14 (RTL via DevTools) — hai case đề bài nhắc rõ là AI thường bỏ sót, xác nhận lại sau khi đọc lại yêu cầu.
  - **1 item bổ sung ghi chú**: PRODDETAIL-ACC-07 thiếu hướng dẫn cài đặt screen reader cụ thể, thêm tên công cụ và phím tắt để người thực thi không mất thời gian tìm kiếm.
- **Sửa:**
  - `PRODDETAIL-USB-01` — đổi Checklist Item thành: _"Đọc nhãn nút hành động chính trên trang mà không nhìn vào các phần tử khác — nhãn đó có đủ để hiểu ngay hành động sẽ xảy ra không"_; đổi Expected Result thành: _"Nhãn nút mô tả đúng và đầy đủ hành động thực tế ('Thêm vào giỏ hàng'), không dùng tên chung chung như 'Submit', 'OK' hay icon đơn thuần không có chú thích"_.
  - `PRODDETAIL-VIS-13` _(thêm mới, sau COM-04)_ — Category: Visual · Checklist Item: _"Bật dark mode của hệ điều hành (Windows: Settings → Personalization → Colors → Dark; macOS: System Settings → Appearance → Dark) rồi tải lại trang `/product/1`"_ · Expected Result: _"Chữ, nền và viền card vẫn đọc được rõ ràng — không xuất hiện vùng chữ tối trên nền tối hay chữ sáng trên nền sáng"_.
  - `PRODDETAIL-VIS-14` _(thêm mới, sau VIS-13)_ — Category: Visual · Checklist Item: _"Mở DevTools Console, gõ `document.documentElement.setAttribute('dir','rtl')` rồi Enter, quan sát toàn trang"_ · Expected Result: _"Bố cục 2 cột không vỡ; các phần tử không chồng lấn nhau và không tràn ra ngoài viewport"_.
  - `PRODDETAIL-ACC-07` — bổ sung vào Checklist Item: _"(NVDA trên Windows: tải tại nvaccess.org, bật bằng Ctrl+Alt+N; hoặc Narrator tích hợp sẵn: Win+Ctrl+Enter)"_.
  - Coverage gate và pass log: cập nhật tổng từ **71 → 73**, IA-01 từ 23 → 25 (`VIS` từ 12 → 14).

---

**AI Audit Report Item**

- **Công cụ AI:** Claude Code (Claude Opus 5 — `claude-opus-5`)
- **Thời gian:** 2026-07-27 20:26:36
- **Nội dung prompt:**
  > Hãy chạy skill @.agents/skills/usability-evaluation-builder/SKILL.md thực hiện Phase 1 — Plan. Dừng lại sau khi xuất xong các file Phase 1, không sang Phase 2 hay Phase 3.
  >
  > ## Inputs
  >
  > **Flow under test:**
  >
  > - Flow ID: U-01
  > - Tên: Tìm kiếm sản phẩm → Xem chi tiết → Thêm giỏ hàng → Áp mã giảm giá → Checkout
  > - FR liên quan: FR-05, FR-06, FR-07, FR-09, FR-08
  >
  > **Target user profile:**
  > Người từ 18–35 tuổi, có thói quen mua sắm online (đã dùng Shopee/Lazada)
  >
  > **Thang đo:** SUS (đã chọn — không cần hỏi lại)
  >
  > **Timebox:** 10 phút/người
  >
  > **Số phiên:** 7 người chính (P01–P07) + 1 pilot (P00)
  >
  > **SUT URL:** http://localhost:5173
  >
  > **Người điều phối:** nlhakhoa23@clc.fitus.edu.vn
  >
  > ## Yêu cầu output (Phase 1 only)
  >
  > Xuất 3 file sau, theo đúng template trong skill:
  >
  > ### File 1 — test-plan.md
  >
  > Bao gồm đầy đủ:
  >
  > - Metadata (ngày, URL, flow, FR, timebox, người điều phối, thiết bị/browser)
  > - Mục tiêu (1–3 câu hỏi testable, không phải mô tả lại flow)
  > - Task scenario dạng mục tiêu (KHÔNG liệt kê từng bước bấm)
  > - Start state / Success state / Failure state / Deviation handling
  > - Instrument: SUS — 10 item đầy đủ bằng tiếng Việt (lấy từ instruments_reference.md)
  > - Probe questions: tối thiểu 1 câu/nhóm (clarity / error recovery / speed / trust),
  >   viết bằng tiếng Việt, giọng trung lập không dẫn dắt
  > - Pre-session checklist
  > - Kịch bản mở đầu bằng lời (đoạn moderator đọc cho participant trước khi bắt đầu)
  > - Cách giao task scenario (đọc nguyên văn, không giải thích thêm)
  >
  > ### File 2 — recruitment-tracker.md
  >
  > - Bảng 8 hàng (P00 pilot + P01–P07)
  > - Toàn bộ cột thông tin cá nhân để TRỐNG (placeholder CHƯA THU THẬP)
  > - Có câu hỏi sàng lọc phù hợp với target user profile
  > - Có quy ước che thông tin liên hệ (che 4 số giữa)
  >
  > ### File 3 — sessions/P00-pilot.md
  >
  > - Template phiên pilot (toàn bộ để CHƯA THU THẬP)
  > - Có checklist riêng ghi lại "đã đổi gì sau pilot" để tinh chỉnh kịch bản
  >
  > ## Ràng buộc bắt buộc
  >
  > - KHÔNG tự điền thông tin người tham gia — tất cả là placeholder
  > - KHÔNG sinh dữ liệu quan sát, timeline, quote, hay rating giả
  > - Task scenario phải dạng mục tiêu, không phải walkthrough từng bước
  > - SUS item phải lấy nguyên văn từ instruments_reference.md, không paraphrase
  > - Probe questions viết bằng tiếng Việt, không dùng lại câu hỏi có sẵn trong bank
  >   mà phải viết lại phù hợp với flow cụ thể này
  > - Kịch bản mở đầu phải nhắc rõ: đang test sản phẩm không phải test người dùng,
  >   yêu cầu think-aloud, xin phép ghi màn hình
  >
  > Sau đó, hãy sử dụng skill @.agents/skills/ai-audit-logger/SKILL.md để lưu lại toàn bộ log
- **AI output:**

  > **File: `tests/usability/U-01/test-plan.md`**
  >
  > # Kế hoạch usability test — U-01
  >
  > - Ngày: 2026-07-27
  > - Website: http://localhost:5173
  > - Flow: U-01 — Tìm kiếm sản phẩm → Xem chi tiết → Thêm giỏ hàng → Áp mã giảm giá → Checkout
  > - FR liên quan: FR-05 (tìm kiếm & danh sách sản phẩm), FR-06 (xem chi tiết sản phẩm), FR-07 (giỏ hàng), FR-09 (mã giảm giá), FR-08 (thanh toán)
  > - Timebox: 10 phút/người
  > - Người điều phối: nlhakhoa23@clc.fitus.edu.vn
  > - Thiết bị/trình duyệt test chính: Laptop Windows 11, Chrome 126, cửa sổ 1440×900
  > - Số phiên: 7 người chính (P01–P07) + 1 pilot (P00)
  > - Hình thức: Moderated, in-person, think-aloud
  >
  > > **Lưu ý về thiết bị:** SUT chạy trên `localhost` của máy người điều phối nên người tham gia thao
  > > tác trên máy đó, không dùng điện thoại cá nhân. Đây là một giới hạn của nghiên cứu (hồ sơ mục
  > > tiêu là người quen mua sắm trên điện thoại) — phải ghi vào phần hạn chế ở báo cáo Phase 3. Nếu
  > > muốn test trên điện thoại thật, cần expose dev server ra LAN trước khi chạy phiên.
  >
  > ***
  >
  > ## Mục tiêu
  >
  > Ba câu hỏi kiểm chứng được, mỗi câu trả lời được bằng số liệu trong session log:
  >
  > 1. **Người dùng mới có tự hoàn tất đơn hàng có áp mã giảm giá trong 10 phút mà không cần moderator can thiệp không?**
  >    → đo bằng `Outcome` (`SUCCESS_UNASSISTED` vs các giá trị còn lại) và số `intervention`.
  > 2. **Người dùng có tự tìm ra chỗ nhập mã giảm giá không, hay đi tìm ở trang Giỏ hàng trước?**
  >    → đo bằng số `wrong turn` vào trang Giỏ hàng sau khi đã được giao nhiệm vụ có mã, và `hesitation ≥ 5s` tại màn hình Giỏ hàng/Checkout.
  > 3. **Trước khi bấm xác nhận thanh toán, người dùng có đối chiếu lại số tiền cuối cùng không?**
  >    → đo bằng quan sát hành vi (có quay lại nhìn/đọc to số tiền trước khi bấm) + câu hỏi mở nhóm Trust.
  >
  > _Vì sao chọn 3 câu này:_ câu 1 đo hiệu quả tổng thể (effectiveness), câu 2 nhắm vào một điểm nghi
  > ngờ cụ thể của thiết kế — ô nhập mã giảm giá nằm ở **trang Checkout** chứ không nằm ở trang Giỏ
  > hàng, trong khi tên flow và thói quen từ Shopee/Lazada khiến người dùng dễ tìm ở Giỏ hàng trước.
  > Câu 3 nhắm vào sự tin tưởng vào con số cuối cùng — màn hình Checkout cho phép **sửa trực tiếp ô
  > "Tổng tiền thanh toán"**, nên việc người dùng có kiểm chứng lại hay không là một tín hiệu đáng đo.
  >
  > ***
  >
  > ## Task scenario
  >
  > > Bạn đang muốn mua một món phụ kiện công nghệ **dưới 10 triệu đồng** để tự thưởng cho mình.
  > > Bạn vừa nhận được mã giảm giá **VIP100** từ chương trình khuyến mãi của EShop.
  > > Hãy tìm một sản phẩm phù hợp với ngân sách, xem kỹ thông tin sản phẩm trước khi quyết định, rồi
  > > hoàn tất việc đặt hàng có sử dụng mã giảm giá đó.
  >
  > **Vì sao kịch bản dừng ở đây:** kịch bản nêu _mục tiêu_ (mua phụ kiện, có ngân sách, có mã giảm
  > giá) và để người tham gia tự tìm đường. Không có câu nào chỉ ra phải bấm nút nào, vào trang nào,
  > hay nhập mã ở đâu — nếu chỉ ra thì chính câu hỏi mục tiêu số 2 sẽ không còn đo được gì.
  >
  > **Ràng buộc tạo ra điểm quyết định thật:** với ngân sách dưới 10 triệu, danh mục hiện có **2 sản
  > phẩm hợp lệ** (Tai nghe AirPods Pro 2 — 6.000.000 ₫ và Bàn phím cơ Keychron Q1 — 4.000.000 ₫) và
  > 3 sản phẩm vượt ngân sách (28–45 triệu). Người tham gia phải thật sự lọc, không có đường đi duy nhất.
  >
  > ***
  >
  > ## Điều kiện
  >
  > - **Bắt đầu:** trình duyệt đã mở `http://localhost:5173`, trang chủ đã tải xong, **đã đăng nhập sẵn**
  >   bằng tài khoản test, giỏ hàng rỗng, ô tìm kiếm trống, chưa cuộn trang.
  > - **Thành công:** màn hình hiển thị **"Thanh toán thành công!"**, và trước khi bấm xác nhận đã quan
  >   sát được mã giảm giá áp dụng thành công ở bước Checkout (xuất hiện dòng `Tiết kiệm: 100.000 ₫`).
  > - **Thất bại:** bỏ cuộc, hết timebox 10 phút, hoặc bị kẹt không phục hồi và không đến được trạng
  >   thái thành công.
  > - **Deviation:**
  >   - Nếu mã `VIP100` báo đã đạt giới hạn số lần dùng → **dừng đồng hồ**, khởi động lại backend để
  >     reseed dữ liệu, cho người tham gia thử lại, ghi lại là deviation (xem checklist trước phiên).
  >   - Nếu người tham gia **tự ý thử một mã khác** (`SAVE10`, `BIGBUY`, `EXPIRED`…) → **không ngăn cản**,
  >     ghi lại nguyên văn mã đã nhập, phản hồi hệ thống và phản ứng của họ. Đây là dữ liệu quan sát
  >     hợp lệ, không tính là deviation.
  >   - Nếu ảnh sản phẩm không tải được (ảnh trỏ ra domain ngoài `placehold.co`, phụ thuộc mạng) → ghi
  >     deviation và cho phiên tiếp tục.
  >
  > ### Vì sao đăng nhập sẵn trước khi tính giờ
  >
  > Trang Giỏ hàng chặn thao tác thanh toán nếu chưa đăng nhập (hiện `alert` rồi chuyển sang trang
  > Đăng nhập). Flow U-01 **không bao gồm** FR-01/FR-02, nên nếu để người tham gia tự đăng nhập thì:
  > (a) timebox 10 phút bị tiêu vào phần ngoài phạm vi, (b) các phiên không còn so sánh được với nhau
  > vì người có tài khoản sẵn và người phải đăng ký sẽ mất thời gian rất khác nhau. Vì vậy đăng nhập
  > sẵn là một phần của **start state chuẩn hoá**, không phải sự trợ giúp.
  >
  > Tài khoản dùng cho mọi phiên: `test@eshop.com` / `Test1234!` (tài khoản seed sẵn của SUT).
  >
  > ### Vì sao kịch bản dùng mã VIP100 chứ không phải SAVE10
  >
  > Đã kiểm chứng trực tiếp qua API `POST /api/apply-coupon` trước khi viết kế hoạch này:
  >
  > | Mã        | Loại                                                         | Kết quả với đơn 30.000.000 ₫                                                          | Dùng được trong kịch bản? |
  > | --------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------- | ------------------------- |
  > | `VIP100`  | fixed 100.000 ₫, đơn tối thiểu 300.000 ₫, tối đa 2 lần/người | giảm đúng 100.000 ₫ → còn 29.900.000 ₫                                                | ✅ **Dùng mã này**        |
  > | `BIGBUY`  | fixed 50.000 ₫, đơn tối thiểu 500.000 ₫, tối đa 1 lần/người  | giảm đúng 50.000 ₫                                                                    | Dự phòng                  |
  > | `SAVE10`  | percent 10%, đơn tối thiểu 300.000 ₫                         | **tổng tiền tăng lên 300.000.000 ₫** trong khi vẫn báo "Áp dụng thành công! Giảm 10%" | ❌ **Không dùng**         |
  > | `EXPIRED` | percent 20%, đã hết hạn                                      | bị từ chối đúng: "Mã giảm giá đã hết hạn"                                             | ❌ Không dùng             |
  >
  > `SAVE10` bị lỗi tính toán nghiêm trọng ở backend. Nếu đưa mã này vào kịch bản, cả 7 phiên sẽ bị
  > một lỗi **chức năng** chi phối và nghiên cứu sẽ không còn đo được **usability của flow** nữa. Lỗi
  > này cần được ghi nhận riêng thành bug report chức năng, không nhập chung vào nghiên cứu usability.
  >
  > > **Ranh giới quan trọng khi chấm "Thành công":** điều kiện thành công là _áp được mã và tới màn
  > > hình xác nhận_, **không** phải _số tiền giảm đúng_. Tính đúng/sai của số tiền là kiểm thử chức
  > > năng; nếu đặt nó làm tiêu chí thành công thì mọi phiên đều "thất bại" vì lỗi backend chứ không
  > > phải vì vấn đề usability.
  >
  > ***
  >
  > ## Công cụ đánh giá (Instrument)
  >
  > **Thang đo chuẩn: SUS (System Usability Scale)** — 10 item, thang Likert 1–5
  > (1 = Hoàn toàn không đồng ý, 5 = Hoàn toàn đồng ý). Thực hiện **ngay sau khi kết thúc task, trước
  > các câu hỏi mở**. Người tham gia thuộc nhóm không chuyên IT nên SUS phù hợp: dễ đọc, dễ trả lời,
  > dễ quy đổi ra một con số so sánh được.
  >
  > Nội dung 10 item (lấy nguyên văn từ `instruments_reference.md`):
  >
  > | #   | Nội dung item                                                            | Điểm (1–5) |
  > | --- | ------------------------------------------------------------------------ | ---------- |
  > | 1   | Tôi nghĩ tôi sẽ muốn dùng hệ thống này thường xuyên.                     |            |
  > | 2   | Tôi thấy hệ thống này phức tạp một cách không cần thiết.                 |            |
  > | 3   | Tôi thấy hệ thống này dễ sử dụng.                                        |            |
  > | 4   | Tôi nghĩ mình cần người rành kỹ thuật hỗ trợ mới dùng được hệ thống này. |            |
  > | 5   | Tôi thấy các chức năng trong hệ thống này được tích hợp tốt với nhau.    |            |
  > | 6   | Tôi thấy hệ thống này có quá nhiều điểm thiếu nhất quán.                 |            |
  > | 7   | Tôi nghĩ hầu hết mọi người sẽ học cách dùng hệ thống này rất nhanh.      |            |
  > | 8   | Tôi thấy hệ thống này rất cồng kềnh, bất tiện khi dùng.                  |            |
  > | 9   | Tôi cảm thấy rất tự tin khi dùng hệ thống này.                           |            |
  > | 10  | Tôi cần học nhiều thứ trước khi có thể bắt đầu dùng hệ thống này.        |            |
  >
  > **Công thức tính điểm** (chỉ áp dụng ở Phase 3, không quy đổi tại chỗ để tránh sai số cộng dồn):
  >
  > - Item lẻ (1, 3, 5, 7, 9): điểm đóng góp = (giá trị người dùng chọn) − 1
  > - Item chẵn (2, 4, 6, 8, 10): điểm đóng góp = 5 − (giá trị người dùng chọn)
  > - Tổng 10 điểm đóng góp (0–40) × 2.5 = điểm SUS cuối cùng (0–100)
  >
  > **Thang xếp loại:** > 85 = A (Tuyệt vời) · 73–85 = B (Tốt) · 52–72 = C (Trung bình) · < 51 = D/F (Kém, cần thiết kế lại)
  >
  > ### Câu hỏi mở (probe questions)
  >
  > Hỏi **sau** khi điền SUS. Giọng trung lập — không có câu nào gợi sẵn câu trả lời hay ám chỉ rằng
  > có vấn đề tồn tại. Mỗi nhóm có 2 câu; nếu hết giờ, hỏi ít nhất câu đầu của mỗi nhóm.
  >
  > | Nhóm               | Câu hỏi                                                                                                                    |
  > | ------------------ | -------------------------------------------------------------------------------------------------------------------------- |
  > | **Clarity**        | 1. Ở bước nhập mã giảm giá, bạn tìm thấy chỗ nhập mã bằng cách nào?                                                        |
  > |                    | 2. Khi xem trang thông tin chi tiết của sản phẩm, những gì hiển thị ở đó có đủ để bạn quyết định mua chưa?                 |
  > | **Error recovery** | 1. Nếu lúc nãy bạn muốn đổi sang một sản phẩm khác sau khi đã thêm vào giỏ, bạn sẽ làm thế nào?                            |
  > |                    | 2. Trong lúc thao tác, có lúc nào bạn nghĩ mình vừa làm sai một bước không? Lúc đó bạn đã làm gì tiếp theo?                |
  > | **Speed**          | 1. Từ lúc bắt đầu tìm sản phẩm đến lúc đặt xong, bạn thấy mất nhiều thời gian hơn hay ít hơn so với bạn hình dung ban đầu? |
  > |                    | 2. Có bước nào bạn thấy mình phải lặp lại thao tác nhiều lần không?                                                        |
  > | **Trust**          | 1. Số tiền cuối cùng hiển thị trước khi bấm xác nhận — bạn có đối chiếu lại với giá sản phẩm không? Vì sao?                |
  > |                    | 2. Nếu đây là tiền thật của bạn, bạn có bấm "Xác Nhận Thanh Toán" ở màn hình đó không?                                     |
  >
  > ***
  >
  > ## Checklist trước phiên
  >
  > **Chuẩn bị hệ thống (làm lại trước mỗi phiên, không phải một lần cho cả 7 phiên):**
  >
  > - [ ] **Khởi động lại backend để reseed dữ liệu.** `initDatabase()` trong `backend/database.js`
  >       chạy `DROP TABLE` rồi seed lại mỗi lần khởi động, nên restart sẽ xoá sạch bảng `coupon_usage`.
  >       **Bắt buộc** vì `VIP100` giới hạn 2 lần/người mà cả 7 phiên đều dùng chung một tài khoản
  >       `test@eshop.com` — không reset thì từ phiên thứ 3 trở đi mã sẽ bị từ chối.
  > - [ ] Kiểm tra frontend `http://localhost:5173` tải được và backend `http://localhost:3000` phản hồi.
  > - [ ] Thử áp `VIP100` một lần để chắc chắn mã còn hiệu lực, **rồi restart backend lần nữa** để xoá
  >       lượt dùng thử này.
  > - [ ] Đăng nhập sẵn `test@eshop.com` / `Test1234!`.
  > - [ ] Đưa trình duyệt về start state: trang chủ, giỏ hàng rỗng, ô tìm kiếm trống, cửa sổ 1440×900.
  > - [ ] Kiểm tra ảnh sản phẩm tải được (phụ thuộc mạng ngoài — `placehold.co`).
  >
  > **Chuẩn bị phiên:**
  >
  > - [ ] Có đồng thuận tham gia và đồng thuận ghi màn hình/ghi âm (ghi rõ hình thức: ký hay bằng lời).
  > - [ ] Phần mềm ghi màn hình đã chạy thử và có tiếng.
  > - [ ] Đồng hồ bấm giờ sẵn sàng; quy ước rõ thời điểm bắt đầu tính giờ (ngay sau khi đọc xong kịch bản).
  > - [ ] Phiếu SUS in sẵn hoặc mở sẵn form.
  > - [ ] Dùng mã P01–P07 (và P00 cho pilot); không ghi dữ liệu cá nhân ngoài mức cần thiết.
  > - [ ] **Không tập trước flow** cho người tham gia; không cho họ xem người khác làm.
  > - [ ] Đóng các tab nhạy cảm trên máy trước khi ghi màn hình.
  >
  > ***
  >
  > ## Kịch bản mở đầu (moderator đọc cho người tham gia)
  >
  > > "Cảm ơn bạn đã dành thời gian tham gia hôm nay.
  > >
  > > Trước khi bắt đầu, mình muốn nói rõ một điều quan trọng: **hôm nay mình kiểm tra sản phẩm, không
  > > phải kiểm tra bạn.** Không có câu trả lời đúng hay sai, và bạn cũng không cần cố gắng làm cho
  > > đúng. Nếu bạn thấy chỗ nào khó hiểu hay bị kẹt, thì đó chính là thông tin mình cần — nó cho thấy
  > > sản phẩm đang có vấn đề, chứ không phải bạn làm sai.
  > >
  > > Trong lúc thao tác, bạn hãy **nói ra thành lời những gì bạn đang nghĩ**: bạn đang tìm gì, bạn
  > > đang định bấm vào đâu, vì sao bạn chọn như vậy, chỗ nào làm bạn phân vân. Nghe hơi lạ lúc đầu
  > > nhưng bạn cứ nói tự nhiên, nghĩ gì nói nấy.
  > >
  > > Mình sẽ ngồi quan sát và hạn chế trả lời trong lúc bạn làm, không phải vì mình không muốn giúp,
  > > mà vì mình cần thấy trải nghiệm thật của bạn khi không có ai hướng dẫn. Nếu bạn kẹt hẳn thì mình
  > > sẽ vào hỗ trợ.
  > >
  > > Buổi này kéo dài khoảng 10 phút cho phần thao tác, sau đó mình xin bạn khoảng 5 phút để điền một
  > > bảng khảo sát ngắn và trả lời vài câu hỏi.
  > >
  > > **Mình xin phép được ghi lại màn hình và ghi âm giọng nói trong buổi hôm nay** — chỉ dùng cho
  > > mục đích phân tích của bài tập môn học, không chia sẻ ra ngoài, và trong báo cáo bạn sẽ chỉ được
  > > ghi bằng mã (ví dụ P01) chứ không ghi tên. Bạn có đồng ý không?
  > >
  > > Bạn có thể dừng lại hoặc rút khỏi buổi test bất cứ lúc nào mà không cần nêu lý do.
  > >
  > > Bạn có câu hỏi gì trước khi mình bắt đầu không?"
  >
  > **Chỉ bắt đầu sau khi nhận được đồng ý rõ ràng cho việc ghi hình/ghi âm.**
  >
  > ***
  >
  > ## Cách giao task scenario
  >
  > 1. Bật ghi màn hình **trước** khi đọc kịch bản.
  > 2. Đọc **nguyên văn** đoạn task scenario ở mục trên — đọc chậm, có thể đọc lại **y hệt** lần thứ hai
  >    nếu người tham gia yêu cầu.
  > 3. **Không giải thích thêm, không diễn giải lại bằng từ khác, không gợi ý bước nào.** Nếu người
  >    tham gia hỏi "mình phải bấm vào đâu?" hoặc "mã giảm giá nhập ở chỗ nào?", trả lời trung lập:
  >    > "Bạn cứ làm theo cách bạn nghĩ là hợp lý nhé."
  > 4. Đưa mã `VIP100` dưới dạng **văn bản viết sẵn** (mẩu giấy hoặc dán vào ô ghi chú) để người tham
  >    gia không phải nhớ, và để mọi phiên nhận cùng một thông tin đầu vào.
  > 5. **Bắt đầu bấm giờ ngay sau khi đọc xong** kịch bản.
  > 6. Trong lúc quan sát, chỉ dùng các câu nhắc trung lập:
  >    - "Bạn đang nghĩ gì vậy?"
  >    - "Bạn đang định làm gì tiếp theo?"
  >    - "Bạn có thể nói to suy nghĩ của bạn được không?"
  > 7. **Chỉ can thiệp khi người tham gia kẹt hẳn** (không thao tác gì trong ~60 giây và tự nói rằng
  >    không biết làm gì tiếp). Khi can thiệp, ghi lại **nguyên văn câu đã nói**, trạng thái màn hình
  >    ngay trước đó, và kết quả sau can thiệp — mỗi lần như vậy tính là 1 `intervention` và phiên
  >    không còn được tính `SUCCESS_UNASSISTED`.
  >
  > ***
  >
  > ## Liên kết
  >
  > - Danh sách người tham gia: [`recruitment-tracker.md`](../recruitment-tracker.md)
  > - Kế hoạch & kết quả pilot: [`sessions/P00-pilot.md`](../sessions/P00-pilot.md)
  > - Định nghĩa Outcome/Error/Wrong turn/Hesitation/Intervention: xem `session_log_template.md` trong skill,
  >   áp dụng thống nhất cho cả 8 phiên.
  >
  > ***
  >
  > ## Trạng thái tài liệu
  >
  > Đây là **Phase 1 — Plan**. Chưa chạy phiên nào, chưa có dữ liệu quan sát.
  > Phase 2 (Conduct) và Phase 3 (Analyse) chỉ được thực hiện sau khi các phiên thật đã diễn ra.
  >
  > ***
  >
  > **File: `tests/usability/U-01/recruitment-tracker.md`**
  >
  > # Danh sách người tham gia — U-01
  >
  > > **Cảnh báo bắt buộc đọc trước khi điền:** Bảng dưới đây phải được điền bằng thông tin người
  > > thật, do chính người thực hiện bài tập thu thập. AI không được tự sinh tên, số điện thoại,
  > > hay câu trả lời sàng lọc — đây là vi phạm quy định chống gian lận của môn học (TA có thể
  > > gọi ngẫu nhiên 2 người để xác minh, và giả mạo người tham gia = 0 điểm cho toàn bộ Task 2).
  > > Mọi ô trong bảng "Người tham gia" phải giữ nguyên `CHƯA THU THẬP` cho đến khi có dữ liệu thật.
  >
  > - Flow: U-01 — Tìm kiếm sản phẩm → Xem chi tiết → Thêm giỏ hàng → Áp mã giảm giá → Checkout
  > - Người điều phối: nlhakhoa23@clc.fitus.edu.vn
  > - Số lượng cần tuyển: **7 người chính (P01–P07) + 1 người pilot (P00) = 8 người**
  >
  > ***
  >
  > ## Hồ sơ mục tiêu (target profile)
  >
  > - **Độ tuổi:** 18–35.
  > - **Mức quen thuộc với ngành hàng:** có thói quen mua sắm online, đã từng tự đặt hàng trên
  >   Shopee/Lazada/Tiki (tức là đã quen khái niệm giỏ hàng, mã giảm giá, thanh toán).
  > - **Mức quen thuộc với EShop:** **chưa từng dùng EShop** — cần phản ứng của người dùng mới.
  > - **Thiết bị thường dùng:** ưu tiên người quen mua sắm trên điện thoại (để đối chiếu với thói quen
  >   thật), dù phiên test sẽ chạy trên laptop của người điều phối.
  > - **Ưu tiên:** người **không** làm trong lĩnh vực IT/kiểm thử phần mềm, để phản hồi usability
  >   không bị "nghề nghiệp hoá".
  > - **Bắt buộc loại trừ:** sinh viên đang học môn này / đang làm cùng bài tập HW03 (theo quy định của đề).
  >
  > ***
  >
  > ## Câu hỏi sàng lọc (screener)
  >
  > Hỏi trước khi hẹn lịch. Ghi lại câu trả lời vào cột "Hồ sơ" ở bảng dưới.
  >
  > 1. Bạn bao nhiêu tuổi? _(Đạt: 18–35)_
  > 2. Trong 6 tháng qua, bạn đã tự đặt hàng online bao nhiêu lần? Trên ứng dụng/trang nào?
  >    _(Đạt: ≥ 1 lần, có nêu được tên sàn như Shopee/Lazada/Tiki)_
  > 3. Bạn đã từng dùng mã giảm giá khi mua hàng online chưa?
  >    _(Ghi nhận — không loại, nhưng dùng để hiểu bối cảnh khi phân tích)_
  > 4. Bạn đã từng dùng trang EShop này bao giờ chưa?
  >    _(Trả lời "Rồi" thì **loại** — nghiên cứu cần người dùng mới)_
  > 5. Bạn có đang học môn Kiểm thử phần mềm hoặc đang làm bài tập HW03 này không?
  >    _(Trả lời "Có" thì **loại** — theo quy định chống gian lận của đề)_
  > 6. Bạn có làm việc trong lĩnh vực IT hoặc kiểm thử phần mềm không?
  >    _(Trả lời "Có" thì vẫn nhận được nhưng **ưu tiên thấp**; ghi rõ vào cột Hồ sơ)_
  > 7. Bạn có đồng ý cho ghi màn hình và ghi âm buổi kiểm thử không?
  >    _(Trả lời "Không" thì **loại** — không có bằng chứng thì phiên không dùng được)_
  >
  > ***
  >
  > ## Quy ước che thông tin liên hệ
  >
  > Giữ lại phần đầu và **2 số cuối**, che **4 số ở giữa**.
  >
  > | Loại                 | Ví dụ gốc               | Ghi vào bảng           |
  > | -------------------- | ----------------------- | ---------------------- |
  > | Số điện thoại / Zalo | `0912345678`            | `0912****78`           |
  > | Email                | `nguyenvanan@gmail.com` | `nguy****an@gmail.com` |
  >
  > > Chỉ ghi **một** kênh liên hệ đã che cho mỗi người — đủ để TA xác minh, không thu thập thừa.
  > > Bản đầy đủ chưa che (nếu cần cho việc liên hệ) giữ riêng, **không commit vào repo**.
  >
  > ***
  >
  > ## Người tham gia
  >
  > | #   | Vai trò     | Họ tên        | Kênh liên hệ  | Thông tin liên hệ (đã che) | Hồ sơ (tuổi/nghề nghiệp/mức quen thuộc) | Ngày hẹn      | Đồng ý ghi hình (Y/N) |
  > | --- | ----------- | ------------- | ------------- | -------------------------- | --------------------------------------- | ------------- | --------------------- |
  > | 0   | P00 (Pilot) | CHƯA THU THẬP | CHƯA THU THẬP | CHƯA THU THẬP              | CHƯA THU THẬP                           | CHƯA THU THẬP | CHƯA THU THẬP         |
  > | 1   | P01         | CHƯA THU THẬP | CHƯA THU THẬP | CHƯA THU THẬP              | CHƯA THU THẬP                           | CHƯA THU THẬP | CHƯA THU THẬP         |
  > | 2   | P02         | CHƯA THU THẬP | CHƯA THU THẬP | CHƯA THU THẬP              | CHƯA THU THẬP                           | CHƯA THU THẬP | CHƯA THU THẬP         |
  > | 3   | P03         | CHƯA THU THẬP | CHƯA THU THẬP | CHƯA THU THẬP              | CHƯA THU THẬP                           | CHƯA THU THẬP | CHƯA THU THẬP         |
  > | 4   | P04         | CHƯA THU THẬP | CHƯA THU THẬP | CHƯA THU THẬP              | CHƯA THU THẬP                           | CHƯA THU THẬP | CHƯA THU THẬP         |
  > | 5   | P05         | CHƯA THU THẬP | CHƯA THU THẬP | CHƯA THU THẬP              | CHƯA THU THẬP                           | CHƯA THU THẬP | CHƯA THU THẬP         |
  > | 6   | P06         | CHƯA THU THẬP | CHƯA THU THẬP | CHƯA THU THẬP              | CHƯA THU THẬP                           | CHƯA THU THẬP | CHƯA THU THẬP         |
  > | 7   | P07         | CHƯA THU THẬP | CHƯA THU THẬP | CHƯA THU THẬP              | CHƯA THU THẬP                           | CHƯA THU THẬP | CHƯA THU THẬP         |
  >
  > ## Người đã liên hệ nhưng bị loại
  >
  > > Giữ vết minh bạch cho quá trình tuyển chọn — ghi lý do loại thay vì xoá dòng.
  >
  > | #   | Kênh liên hệ (đã che) | Lý do bị loại (theo câu screener số mấy) |
  > | --- | --------------------- | ---------------------------------------- |
  > | —   | CHƯA THU THẬP         | CHƯA THU THẬP                            |
  >
  > ***
  >
  > ## Ghi chú
  >
  > - **P00 (Pilot) không tính vào 7 người chính thức** và **không đưa vào số liệu tổng hợp ở Phase 3**.
  >   Vai trò duy nhất của pilot là phát hiện lỗi trong kịch bản/công cụ trước khi chạy phiên thật.
  > - Pilot phải khớp hồ sơ mục tiêu nhưng **không được** là một trong 7 người chính.
  > - Mỗi người chỉ tham gia **đúng 1 phiên**.
  > - Nếu một người không đạt tiêu chí sàng lọc, ghi vào bảng "đã liên hệ nhưng bị loại" ở trên.
  > - Nhắc lại quy định của đề: người tham gia **phải ở ngoài lớp học**; TA có thể gọi ngẫu nhiên 2
  >   người để xác minh.
  >
  > ***
  >
  > **File: `tests/usability/U-01/sessions/P00-pilot.md`**
  >
  > # Phiên P00 (Pilot) — U-01
  >
  > > **Chưa chạy.** Toàn bộ file này là template rỗng. Điền các mục dưới đây **trong hoặc ngay sau**
  > > phiên pilot thật. Không suy đoán, không điền sẵn nội dung "hợp lý" — mọi dòng phải bắt nguồn từ
  > > quan sát thực tế (ghi chú tay, video, hoặc bản ghi âm của chính phiên này).
  >
  > **Mục đích của phiên pilot:** phát hiện lỗi trong **kịch bản và công cụ**, _không_ phải để tạo dữ
  > liệu cho báo cáo. Kết quả phiên này **không được đưa vào số liệu tổng hợp ở Phase 3** — chỉ ghi
  > chú trong báo cáo rằng đã chạy pilot và đã sửa những gì.
  >
  > ***
  >
  > ## Metadata
  >
  > - Ngày/giờ: CHƯA THU THẬP
  > - Người tham gia: P00 (Pilot) — khớp hồ sơ mục tiêu, **không** thuộc nhóm 7 người chính
  > - Thiết bị, OS, trình duyệt: CHƯA THU THẬP
  > - Đồng thuận: CHƯA THU THẬP _(ghi rõ hình thức: đã ký / bằng lời)_
  > - Timebox: 10 phút
  > - Deviation: CHƯA THU THẬP
  >
  > **Xác nhận đã chuẩn bị (đánh dấu tại thời điểm chạy phiên):**
  >
  > - [ ] Đã restart backend để reseed dữ liệu (xoá `coupon_usage`)
  > - [ ] Đã đăng nhập sẵn `test@eshop.com`
  > - [ ] Giỏ hàng rỗng, ô tìm kiếm trống, cửa sổ 1440×900
  > - [ ] Ghi màn hình + ghi âm đang chạy
  > - [ ] Mã `VIP100` đã viết sẵn ra giấy/ghi chú
  >
  > ***
  >
  > ## Kết quả
  >
  > - Outcome: CHƯA THU THẬP _(`SUCCESS_UNASSISTED` | `SUCCESS_ASSISTED` | `FAIL` | `ABANDONED`)_
  > - Thời lượng (giây): CHƯA THU THẬP
  > - Số error: CHƯA THU THẬP
  > - Số wrong turn: CHƯA THU THẬP
  > - Số hesitation ≥ 5 giây: CHƯA THU THẬP
  > - Số intervention: CHƯA THU THẬP
  > - Đạt điều kiện thành công (theo test-plan): CHƯA THU THẬP
  >
  > **Định nghĩa dùng để đếm (giữ nhất quán giữa các phiên):**
  >
  > | Thuật ngữ       | Định nghĩa                                                                                                                                            |
  > | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
  > | Error           | Hành động cho kết quả trái mục tiêu mà hệ thống không ngăn được (VD: thêm nhầm sản phẩm vượt ngân sách vào giỏ và tiến hành thanh toán)               |
  > | Wrong turn      | Điều hướng sang màn hình không tiến gần mục tiêu, tự sửa được, chưa đến mức là error (VD: mở trang Giỏ hàng để tìm ô nhập mã giảm giá rồi tự quay ra) |
  > | Hesitation ≥ 5s | Dừng lại không thao tác từ 5 giây trở lên, có biểu hiện phân vân — ghi lại mốc thời gian                                                              |
  > | Intervention    | Moderator nói/làm gì đó để giúp người tham gia thoát khỏi bế tắc — ghi nguyên văn, trạng thái trước đó và kết quả                                     |
  >
  > ***
  >
  > ## Timeline quan sát
  >
  > > Một dòng cho mỗi sự kiện đáng chú ý. Cột "Quote nguyên văn" chỉ ghi lời người tham gia **thật sự
  > > nói ra**, không diễn giải lại.
  >
  > | Thời gian | Stage/FR | Mục tiêu | Hành động quan sát được | Phản hồi hệ thống | Tác động | Quote nguyên văn |
  > | --------- | -------- | -------- | ----------------------- | ----------------- | -------- | ---------------- |
  > |           |          |          |                         |                   |          |                  |
  > |           |          |          |                         |                   |          |                  |
  > |           |          |          |                         |                   |          |                  |
  >
  > _Gợi ý các stage để đối chiếu (không bắt buộc theo thứ tự này — người tham gia tự chọn đường đi):_
  > `FR-05 tìm/lọc sản phẩm` · `FR-06 xem chi tiết` · `FR-07 thêm & xem giỏ hàng` · `FR-09 áp mã giảm giá` · `FR-08 xác nhận thanh toán`
  >
  > ***
  >
  > ## Can thiệp của moderator
  >
  > > Ghi nguyên văn lời gợi ý, thời điểm, trạng thái trước gợi ý và kết quả. Nếu không có, ghi `Không có`.
  >
  > CHƯA THU THẬP
  >
  > ***
  >
  > ## Thang đo sau phiên — SUS
  >
  > Ghi **điểm thô** từng item (1 = Hoàn toàn không đồng ý → 5 = Hoàn toàn đồng ý).
  > **Không quy đổi tại chỗ** — việc quy đổi thực hiện ở Phase 3 để tránh sai số cộng dồn.
  >
  > | #   | Nội dung item                                                            | Điểm (1–5) |
  > | --- | ------------------------------------------------------------------------ | ---------- |
  > | 1   | Tôi nghĩ tôi sẽ muốn dùng hệ thống này thường xuyên.                     |            |
  > | 2   | Tôi thấy hệ thống này phức tạp một cách không cần thiết.                 |            |
  > | 3   | Tôi thấy hệ thống này dễ sử dụng.                                        |            |
  > | 4   | Tôi nghĩ mình cần người rành kỹ thuật hỗ trợ mới dùng được hệ thống này. |            |
  > | 5   | Tôi thấy các chức năng trong hệ thống này được tích hợp tốt với nhau.    |            |
  > | 6   | Tôi thấy hệ thống này có quá nhiều điểm thiếu nhất quán.                 |            |
  > | 7   | Tôi nghĩ hầu hết mọi người sẽ học cách dùng hệ thống này rất nhanh.      |            |
  > | 8   | Tôi thấy hệ thống này rất cồng kềnh, bất tiện khi dùng.                  |            |
  > | 9   | Tôi cảm thấy rất tự tin khi dùng hệ thống này.                           |            |
  > | 10  | Tôi cần học nhiều thứ trước khi có thể bắt đầu dùng hệ thống này.        |            |
  >
  > ***
  >
  > ## Câu hỏi mở (probe questions)
  >
  > | Nhóm           | Câu hỏi                                                                                                                 | Trả lời |
  > | -------------- | ----------------------------------------------------------------------------------------------------------------------- | ------- |
  > | Clarity        | Ở bước nhập mã giảm giá, bạn tìm thấy chỗ nhập mã bằng cách nào?                                                        |         |
  > | Clarity        | Khi xem trang thông tin chi tiết của sản phẩm, những gì hiển thị ở đó có đủ để bạn quyết định mua chưa?                 |         |
  > | Error recovery | Nếu lúc nãy bạn muốn đổi sang một sản phẩm khác sau khi đã thêm vào giỏ, bạn sẽ làm thế nào?                            |         |
  > | Error recovery | Trong lúc thao tác, có lúc nào bạn nghĩ mình vừa làm sai một bước không? Lúc đó bạn đã làm gì tiếp theo?                |         |
  > | Speed          | Từ lúc bắt đầu tìm sản phẩm đến lúc đặt xong, bạn thấy mất nhiều thời gian hơn hay ít hơn so với bạn hình dung ban đầu? |         |
  > | Speed          | Có bước nào bạn thấy mình phải lặp lại thao tác nhiều lần không?                                                        |         |
  > | Trust          | Số tiền cuối cùng hiển thị trước khi bấm xác nhận — bạn có đối chiếu lại với giá sản phẩm không? Vì sao?                |         |
  > | Trust          | Nếu đây là tiền thật của bạn, bạn có bấm "Xác Nhận Thanh Toán" ở màn hình đó không?                                     |         |
  >
  > ***
  >
  > ## Tóm tắt của researcher
  >
  > - Điểm nghẽn chính: CHƯA THU THẬP
  > - Điều hỗ trợ hoàn thành: CHƯA THU THẬP
  > - Ghi chú cần xác minh, không phải quan sát trực tiếp: CHƯA THU THẬP
  >
  > ***
  >
  > # Checklist riêng của pilot — "đã đổi gì sau pilot"
  >
  > > Đây là **sản phẩm đầu ra thật sự** của phiên pilot. Mỗi mục: ghi phát hiện → quyết định sửa hay
  > > giữ → nội dung đã sửa. Nếu không có vấn đề, ghi rõ `Không đổi` kèm lý do — đừng để trống.
  >
  > ## A. Kịch bản task scenario
  >
  > | #   | Cần kiểm tra                                                                                                | Phát hiện ở pilot | Quyết định    | Nội dung đã sửa |
  > | --- | ----------------------------------------------------------------------------------------------------------- | ----------------- | ------------- | --------------- |
  > | A1  | Người tham gia có hiểu ngay mục tiêu sau khi nghe đọc 1 lần không?                                          | CHƯA THU THẬP     | CHƯA THU THẬP | CHƯA THU THẬP   |
  > | A2  | Kịch bản có vô tình **gợi ý các bước** (nói lộ chỗ nhập mã, tên nút) không?                                 | CHƯA THU THẬP     | CHƯA THU THẬP | CHƯA THU THẬP   |
  > | A3  | Ràng buộc "dưới 10 triệu" có tạo ra lựa chọn thật không, hay người tham gia chọn ngay không cần cân nhắc?   | CHƯA THU THẬP     | CHƯA THU THẬP | CHƯA THU THẬP   |
  > | A4  | Có từ ngữ nào trong kịch bản gây khó hiểu / phải hỏi lại không?                                             | CHƯA THU THẬP     | CHƯA THU THẬP | CHƯA THU THẬP   |
  > | A5  | Cách đưa mã `VIP100` (viết ra giấy) có tự nhiên không, hay làm người tham gia tưởng phải dùng ngay lập tức? | CHƯA THU THẬP     | CHƯA THU THẬP | CHƯA THU THẬP   |
  >
  > ## B. Timebox và nhịp phiên
  >
  > | #   | Cần kiểm tra                                                        | Phát hiện ở pilot | Quyết định    | Nội dung đã sửa |
  > | --- | ------------------------------------------------------------------- | ----------------- | ------------- | --------------- |
  > | B1  | Thời gian thực tế hoàn thành task là bao nhiêu?                     | CHƯA THU THẬP     | CHƯA THU THẬP | CHƯA THU THẬP   |
  > | B2  | 10 phút là quá dài, quá ngắn, hay vừa?                              | CHƯA THU THẬP     | CHƯA THU THẬP | CHƯA THU THẬP   |
  > | B3  | Phần SUS + câu hỏi mở mất bao lâu? Tổng buổi có vượt dự kiến không? | CHƯA THU THẬP     | CHƯA THU THẬP | CHƯA THU THẬP   |
  >
  > ## C. Công cụ và môi trường
  >
  > | #   | Cần kiểm tra                                                                                                                            | Phát hiện ở pilot | Quyết định    | Nội dung đã sửa |
  > | --- | --------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ------------- | --------------- |
  > | C1  | Ghi màn hình có bắt được toàn bộ thao tác không? Có tiếng rõ không?                                                                     | CHƯA THU THẬP     | CHƯA THU THẬP | CHƯA THU THẬP   |
  > | C2  | Đồng hồ bấm giờ và cách đánh dấu mốc thời gian có dùng được trong lúc vừa quan sát vừa ghi chú không?                                   | CHƯA THU THẬP     | CHƯA THU THẬP | CHƯA THU THẬP   |
  > | C3  | **Mã `VIP100` còn hiệu lực khi tới bước checkout không?** (giới hạn 2 lần/người — nếu báo hết lượt nghĩa là quy trình reseed chưa đúng) | CHƯA THU THẬP     | CHƯA THU THẬP | CHƯA THU THẬP   |
  > | C4  | Quy trình restart backend để reseed có thực sự xoá `coupon_usage` không?                                                                | CHƯA THU THẬP     | CHƯA THU THẬP | CHƯA THU THẬP   |
  > | C5  | Ảnh sản phẩm (tải từ domain ngoài) có hiện đủ trong suốt phiên không?                                                                   | CHƯA THU THẬP     | CHƯA THU THẬP | CHƯA THU THẬP   |
  > | C6  | Start state có được khôi phục đúng và nhanh giữa các phiên không?                                                                       | CHƯA THU THẬP     | CHƯA THU THẬP | CHƯA THU THẬP   |
  >
  > ## D. SUS và câu hỏi mở
  >
  > | #   | Cần kiểm tra                                                                           | Phát hiện ở pilot | Quyết định    | Nội dung đã sửa |
  > | --- | -------------------------------------------------------------------------------------- | ----------------- | ------------- | --------------- |
  > | D1  | Có item SUS nào người tham gia đọc xong phải hỏi lại nghĩa không? (ghi rõ item số mấy) | CHƯA THU THẬP     | CHƯA THU THẬP | CHƯA THU THẬP   |
  > | D2  | Người tham gia có hiểu thang 1–5 theo đúng chiều không (không nhầm ngược)?             | CHƯA THU THẬP     | CHƯA THU THẬP | CHƯA THU THẬP   |
  > | D3  | Câu hỏi mở nào bị trả lời cụt lủn "không có gì" — cần diễn đạt lại?                    | CHƯA THU THẬP     | CHƯA THU THẬP | CHƯA THU THẬP   |
  > | D4  | Có câu hỏi nào vô tình **dẫn dắt** (khiến người tham gia đoán ý moderator) không?      | CHƯA THU THẬP     | CHƯA THU THẬP | CHƯA THU THẬP   |
  >
  > ## E. Vai trò moderator
  >
  > | #   | Cần kiểm tra                                                                    | Phát hiện ở pilot | Quyết định    | Nội dung đã sửa |
  > | --- | ------------------------------------------------------------------------------- | ----------------- | ------------- | --------------- |
  > | E1  | Có lúc nào moderator lỡ gợi ý/xác nhận đúng-sai không?                          | CHƯA THU THẬP     | CHƯA THU THẬP | CHƯA THU THẬP   |
  > | E2  | Ngưỡng can thiệp (~60 giây kẹt) có hợp lý không?                                | CHƯA THU THẬP     | CHƯA THU THẬP | CHƯA THU THẬP   |
  > | E3  | Việc vừa quan sát vừa ghi timeline có kịp không, hay cần người ghi chú thứ hai? | CHƯA THU THẬP     | CHƯA THU THẬP | CHƯA THU THẬP   |
  >
  > ***
  >
  > ## Kết luận pilot
  >
  > - [ ] **Đã sửa xong kịch bản/công cụ — sẵn sàng chạy P01–P07**
  > - [ ] Cần chạy thêm một pilot nữa (ghi lý do: CHƯA THU THẬP)
  >
  > **Tổng số thay đổi đã thực hiện sau pilot:** CHƯA THU THẬP
  >
  > **Ngày chốt phiên bản kịch bản dùng cho P01–P07:** CHƯA THU THẬP
  >
  > > Sau khi chốt, **không được đổi kịch bản giữa chừng** trong 7 phiên chính — nếu buộc phải đổi,
  > > ghi rõ đổi từ phiên nào và cân nhắc loại các phiên trước đó khỏi phần tổng hợp định lượng.
  >
  > ***

- **Đánh giá:** Valid
- **Suy luận:** File do AI sinh ra khá tốt và đầy đủ
- **Sửa:** Không cần sửa

---

**AI Audit Report Item**

- **Công cụ AI:** Claude Code (Claude Opus 5 — `claude-opus-5`)
- **Thời gian:** 2026-07-29 22:24:07
- **Nội dung prompt:**
  > Tôi đã chạy sẵn eshop web và backend. Bạn hãy sử dụng playwright mcp để chạy các item trong @tests/checklist/product-detail/checklist_product-detail.md
  > Sau đó hãy cập nhật status những test nào đã chạy
  > Nếu có bug thì screenshot, dùng skill @.agents/skills/bug-reporting/SKILL.md để làm report từng bug nhé
  > tiếp theo, dùng skill @.agents/skills/ai-audit-logger/SKILL.md để ghi toàn bộ audit log lại nhé
- **AI output:**
  > # Phần 1 — Checklist đã cập nhật (`tests/checklist/product-detail/checklist_product-detail.md`)
  >
  > ## Header block — dòng Trạng thái đã đổi
  >
  > | **Trạng thái** | **Đã thực thi** 70/73 item bằng Playwright MCP (Chromium) ngày 2026-07-29 — 30 `Passed`, 40 `Failed`, 3 `Not Run` (cần Firefox 128) |
  >
  > ## Ghi chú đầu mục 5
  >
  > > **Đã thực thi ngày 2026-07-29** bằng Playwright MCP trên Chromium 1440×900 (và các viewport 768×1024, 767×1024, 390×844, 844×390, 960×600).
  > > Ảnh chụp bằng chứng cho các item `Failed` nằm ở `tests/bug-reports/screenshots/`; bug report tương ứng ở `tests/bug-reports/product-detail/`.
  > >
  > > **Kết quả:** 30 `Passed` · 40 `Failed` · 3 `Not Run` (COM-01/02/03 — cần Firefox 128, Playwright MCP chỉ lái được Chromium).
  >
  > ## IA-01 — General UI standards
  >
  > | ID                | Category      | Status  | Notes                                                                                                                                                                                                                                                                       |
  > | ----------------- | ------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  > | PRODDETAIL-VIS-01 | Visual        | Failed  | Ảnh gốc `naturalWidth×Height = 300×300` nhưng render 455×455 px (phóng 152%) → chữ "iPhone 15" trên ảnh nhoè thấy rõ trong screenshot. → `BUG-PRODDETAIL-010`                                                                                                               |
  > | PRODDETAIL-VIS-02 | Visual        | Failed  | Hiện `30,000,000 ₫` (dấu phẩy) vì `Number(price).toLocaleString()` không truyền locale nên bám theo locale trình duyệt. → `BUG-PRODDETAIL-008`                                                                                                                              |
  > | PRODDETAIL-VIS-03 | Visual        | Passed  | Chuỗi render `30,000,000 ₫`: `₫` sau phần số, cách đúng 1 khoảng trắng, nằm chung `<p>` nên cùng `font-size: 24px` và màu `rgb(220,38,38)`.                                                                                                                                 |
  > | PRODDETAIL-VIS-04 | Visual        | Failed  | Thẻ mô tả có class `flex-grow` nên cao 225 px dù chỉ chứa 1 dòng chữ ~24 px → sinh ~200 px trắng thừa giữa mô tả và "Số lượng:". Các khối khác chỉ cách nhau 16–32 px. → `BUG-PRODDETAIL-010`                                                                               |
  > | PRODDETAIL-VIS-05 | Visual        | Passed  | Nhãn: top 463 + h 24 → tâm 475. Ô nhập: top 454 + h 42 → tâm 475. Hai tâm trùng khít (container dùng `items-center`).                                                                                                                                                       |
  > | PRODDETAIL-VIS-06 | Visual        | Passed  | Ô nhập 80×42 px, nút 184,3×48 px → tỉ lệ chiều cao 1 : 1,14. Cả hai cùng `border-radius: 4px`.                                                                                                                                                                              |
  > | PRODDETAIL-VIS-07 | Visual        | Passed  | Mock API trả tên 102 ký tự: `<h1>` xuống 4 dòng, `right` 1191 < card `right` 1216, `bottom` 249 < giá `top` 265 → không tràn, không đè.                                                                                                                                     |
  > | PRODDETAIL-VIS-08 | Visual        | Passed  | Mock API trả mô tả 675 ký tự: `scrollHeight` = `clientHeight` (không cắt cụt), `overflow: visible`, `bottom` 553 < card `bottom` 708.                                                                                                                                       |
  > | PRODDETAIL-VIS-09 | Visual        | Passed  | Chặn `placehold.co` (`route.abort`): `naturalWidth` = 0, hiện chữ alt "iPhone 15 Pro Max"; 2 cột vẫn 455/455 px cùng hàng y=105, cột phải giữ nguyên x=736.                                                                                                                 |
  > | PRODDETAIL-VIS-10 | Visual        | Failed  | `document.title` = `frontend-web` (chuỗi mặc định của Vite) trên mọi sản phẩm, không hề chứa tên sản phẩm. → `BUG-PRODDETAIL-010`                                                                                                                                           |
  > | PRODDETAIL-VIS-11 | Visual        | Passed  | Cả 3 trang: `border-radius: 4px`, viền `1px solid rgb(229,231,235)`, shadow `rgba(0,0,0,0.05) 0 1px 2px 0`, nền `rgb(255,255,255)`.                                                                                                                                         |
  > | PRODDETAIL-VIS-12 | Visual        | Passed  | Chữ `rgb(55,65,81)` trên nền `rgb(255,255,255)` → tỉ lệ tương phản ≈ 10,3 : 1, vượt xa ngưỡng WCAG AA 4,5 : 1.                                                                                                                                                              |
  > | PRODDETAIL-VIS-13 | Visual        | Passed  | Chạy bằng `emulateMedia({colorScheme:'dark'})`: app không khai báo dark mode nên giữ nguyên card trắng / `<h1>` đen / mô tả `rgb(55,65,81)` — không sinh cặp màu trùng nền.                                                                                                 |
  > | PRODDETAIL-VIS-14 | Visual        | Passed  | Sau `dir=rtl`: 2 cột đảo chỗ (ảnh x=736, thông tin x=249), không chồng lấn, nút vẫn trong card, `scrollWidth` = `clientWidth` = 1440.                                                                                                                                       |
  > | PRODDETAIL-RES-01 | Responsive    | Passed  | Card rộng 992 px, 2 cột đều 455 px cùng hàng y=105 (mỗi cột ≈ 46% card, phần còn lại là padding + gap 32 px).                                                                                                                                                               |
  > | PRODDETAIL-RES-02 | Responsive    | Passed  | Vẫn 2 cột 327/327 px cùng hàng y=105; cột trái `right` 368 < cột phải `x` 400 → không chồng lấn.                                                                                                                                                                            |
  > | PRODDETAIL-RES-03 | Responsive    | Passed  | Chuyển đúng 1 cột: ảnh y=105 (670×670), khối thông tin y=807; khoảng cách 32 px — bằng `gap-8` của layout, không bất thường.                                                                                                                                                |
  > | PRODDETAIL-RES-04 | Responsive    | Passed  | `document.documentElement.scrollWidth` = `clientWidth` = 390 → không có thanh cuộn ngang.                                                                                                                                                                                   |
  > | PRODDETAIL-RES-05 | Responsive    | Passed  | Nút x=41 → right 225,3 nằm trọn trong card (16 → 374), thẳng lề trái với khối "Số lượng". **Lưu ý:** `.bug-mobile-hidden` có đặt `margin-right:-100px` ở ≤640 px nhưng nút dùng `self-start` (rộng theo nội dung) nên chưa gây lệch — rủi ro tiềm ẩn nếu đổi sang `w-full`. |
  > | PRODDETAIL-RES-06 | Responsive    | Passed  | Mô phỏng bằng viewport tương đương 960×600 CSS px (1440÷1,5): vẫn 2 cột 415,5 px, không chồng lấn, `scrollWidth` = `clientWidth` = 945. Chưa test bằng Ctrl+= thật (Playwright không có API zoom trình duyệt).                                                              |
  > | PRODDETAIL-RES-07 | Responsive    | Passed  | 844×390: quay lại 2 cột 357,5 px, không cuộn ngang. Nút ở y=414,5 (dưới nếp gấp 390 px) nhưng trang cuộn dọc tới được.                                                                                                                                                      |
  > | PRODDETAIL-COM-01 | Compatibility | Not Run | Playwright MCP trong phiên này chỉ lái được Chromium; sandbox chặn `require('playwright')` nên không khởi chạy được Firefox 128 để đối chiếu. Cần chạy tay hoặc cấu hình MCP thêm Firefox.                                                                                  |
  > | PRODDETAIL-COM-02 | Compatibility | Not Run | Cùng lý do COM-01 — thiếu vế Firefox 128.                                                                                                                                                                                                                                   |
  > | PRODDETAIL-COM-03 | Compatibility | Not Run | Trên Chromium dấu tiếng Việt hiển thị đúng ở mọi vị trí (đã quan sát qua screenshot), nhưng item yêu cầu **cả hai** trình duyệt nên chưa đủ căn cứ kết luận.                                                                                                                |
  > | PRODDETAIL-COM-04 | Compatibility | Failed  | Context `en-US` → `30,000,000 ₫`; context `vi-VN` → `30.000.000 ₫`. Chuỗi giá đổi theo locale trình duyệt thay vì cố định chuẩn vi-VN. → `BUG-PRODDETAIL-008`                                                                                                               |
  >
  > ## IA-02 — Forms
  >
  > | ID                | Category   | Status | Notes                                                                                                                                                                                                                             |
  > | ----------------- | ---------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  > | PRODDETAIL-VAL-01 | Validation | Failed | `-1` được nhận, không có thông báo lỗi nào; giỏ hàng nhận số lượng `-1`, thành tiền **-30.000.000 ₫**, tổng tạm tính âm. → `BUG-PRODDETAIL-002`                                                                                   |
  > | PRODDETAIL-VAL-02 | Validation | Failed | `0` được nhận, không báo lỗi; giỏ hàng tạo dòng với số lượng `0`, thành tiền `0 ₫`. → `BUG-PRODDETAIL-002`                                                                                                                        |
  > | PRODDETAIL-VAL-03 | Validation | Failed | Trình duyệt đã đánh dấu `validity.valid = false` (stepMismatch) nhưng UI **không** đọc tới và không báo gì; `parseInt("1.5")` âm thầm cắt còn `1` rồi thêm vào giỏ — người dùng mất dữ liệu mà không biết. → `BUG-PRODDETAIL-002` |
  > | PRODDETAIL-VAL-04 | Validation | Failed | Xoá trắng → `parseInt("")` = `NaN`; giỏ hàng hiển thị số lượng `NaN`, thành tiền `NaN ₫`, tổng tạm tính `NaN ₫`. → `BUG-PRODDETAIL-002`                                                                                           |
  > | PRODDETAIL-VAL-05 | Validation | Failed | Vế đầu đạt (ô nhập chặn chữ), **vế sau không đạt**: giá trị bị xoá thành rỗng chứ không giữ lại `1` trước đó → submit tiếp tạo `NaN` trong giỏ. → `BUG-PRODDETAIL-002`                                                            |
  > | PRODDETAIL-VAL-06 | Validation | Failed | `2e3` được nhận, không báo lỗi. `valueAsNumber` = 2000 nhưng `parseInt("2e3")` = **2** → giỏ nhận 2. Sai lệch giữa giá trị người dùng thấy và giá trị hệ thống dùng. → `BUG-PRODDETAIL-002`                                       |
  > | PRODDETAIL-VAL-07 | Validation | Failed | Không có giới hạn tối đa: giỏ nhận 999.999.999, thành tiền **29.999.999.970.000.000 ₫**. → `BUG-PRODDETAIL-002`                                                                                                                   |
  > | PRODDETAIL-VAL-08 | Validation | Failed | DOM thực tế: `<input class="border p-2 w-20 rounded" type="number" value="1">` — không có `min`, `max`, `step`, cũng không có `id`/`name`. → `BUG-PRODDETAIL-002`                                                                 |
  > | PRODDETAIL-VAL-09 | Validation | Failed | Từ `1` nhấn mũi tên giảm (ArrowDown) → giá trị về `0`; do thiếu `min="1"` nên trình duyệt không có mốc chặn. → `BUG-PRODDETAIL-002`                                                                                               |
  > | PRODDETAIL-VAL-10 | Validation | Failed | Dán `-5` được nhận nguyên vẹn, không báo lỗi; giỏ hàng nhận `-5`, thành tiền **-150.000.000 ₫**. → `BUG-PRODDETAIL-002`                                                                                                           |
  > | PRODDETAIL-FUN-01 | Functional | Failed | Lần bấm đầu tiên `handleAddToCart` chỉ chạy `setClickCount(1); return` → nhãn vẫn là "Thêm vào giỏ hàng" và trang Giỏ hàng báo "Giỏ hàng của bạn đang trống". → `BUG-PRODDETAIL-001`                                              |
  > | PRODDETAIL-FUN-02 | Functional | Failed | 2 lần bấm chỉ tạo **1** dòng giỏ hàng (số lượng 1). Lần bấm đầu bị nuốt, lần thứ hai mới thực sự thêm. → `BUG-PRODDETAIL-001`                                                                                                     |
  > | PRODDETAIL-FUN-03 | Functional | Failed | Double-click (2 lần bấm) chỉ ghi nhận **1** lượt thêm — không thừa nhưng **thiếu** so với số lần bấm thực tế, nên vẫn lệch khỏi ER. → `BUG-PRODDETAIL-001`                                                                        |
  > | PRODDETAIL-FUN-04 | Functional | Failed | 2 lượt thêm tạo **2 dòng riêng biệt** cùng tên "iPhone 15 Pro Max", mỗi dòng số lượng 1. `addToCart` luôn `setCart([...cart, {...}])`, không hề gộp theo `id`. → `BUG-PRODDETAIL-003`                                             |
  > | PRODDETAIL-FUN-05 | Functional | Passed | Giỏ hàng hiển thị số lượng `3`, thành tiền `90.000.000 ₫` = 30.000.000 × 3. Đúng ER.                                                                                                                                              |
  > | PRODDETAIL-FUN-06 | Functional | Passed | Nhấn Enter: URL không đổi, không tải lại trang, giá trị `5` được giữ nguyên, không thêm vào giỏ. Nhánh "không làm gì" — hợp lệ vì input không nằm trong `<form>`.                                                                 |
  > | PRODDETAIL-FUN-07 | Functional | Passed | Đo thực tế: nhãn "Đã thêm" xuất hiện sau 35 ms và hiển thị **2003 ms** rồi trở về nhãn gốc — đủ để đọc 2 chữ.                                                                                                                     |
  >
  > ## IA-03 — Navigation
  >
  > | ID                | Category   | Status | Notes                                                                                                                                                                                         |
  > | ----------------- | ---------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  > | PRODDETAIL-NAV-01 | Navigation | Passed | Bấm logo → URL `http://localhost:5173/`, trang Home render đủ 5 link sản phẩm.                                                                                                                |
  > | PRODDETAIL-NAV-02 | Navigation | Passed | Bấm "Giỏ hàng" → `/cart`; sản phẩm đã thêm hiển thị đúng tên, giá `30,000,000 ₫`, số lượng và thành tiền.                                                                                     |
  > | PRODDETAIL-NAV-03 | Navigation | Failed | Cuộn Home tới `scrollY` = 118 rồi mở chi tiết, bấm Back → về đúng `/` nhưng `scrollY` = **0**, mất vị trí cuộn. → `BUG-PRODDETAIL-012`                                                        |
  > | PRODDETAIL-NAV-04 | Navigation | Passed | Forward → đúng `/product/1`, `<h1>` "iPhone 15 Pro Max", giá và mô tả hiển thị đầy đủ.                                                                                                        |
  > | PRODDETAIL-NAV-05 | Navigation | Passed | Mở `/product/2` trong browser context hoàn toàn mới → "Samsung Galaxy S24 Ultra", giá `28,000,000 ₫`, ảnh có alt đúng. Không cần qua Home.                                                    |
  > | PRODDETAIL-NAV-06 | Navigation | Failed | Hiện `Sản phẩm không tồn tại (Lỗi trắng trang do data rỗng)` — ngôn ngữ debug nội bộ; `main` không chứa bất kỳ thẻ `<a>` nào nên không có lối quay lại. → `BUG-PRODDETAIL-005`                |
  > | PRODDETAIL-NAV-07 | Navigation | Failed | Không trắng trang và không crash (vế an toàn đạt), nhưng hiện đúng chuỗi debug như NAV-06 → vẫn vi phạm vế "không hiển thị lỗi kỹ thuật". → `BUG-PRODDETAIL-005`                              |
  > | PRODDETAIL-NAV-08 | Navigation | Failed | Truy vấn `main a` trả về mảng rỗng — không breadcrumb, không link "Quay lại danh sách". Chỉ còn logo ở header (ngoài phạm vi nội dung). → `BUG-PRODDETAIL-005`                                |
  > | PRODDETAIL-NAV-09 | Navigation | Failed | Trước F5 nút đã hiện "Đã thêm"; sau F5 giỏ hàng trống hoàn toàn. `localStorage` và `sessionStorage` đều rỗng — giỏ chỉ nằm trong `useState`. → `BUG-PRODDETAIL-006`                           |
  > | PRODDETAIL-NAV-10 | Navigation | Failed | Đăng nhập `test@eshop.com` thành công: header hiện "Chào, Test User" ✓ và giỏ hàng còn nguyên ✓, nhưng bị đưa về `/` thay vì quay lại `/product/1` → **mất ngữ cảnh**. → `BUG-PRODDETAIL-012` |
  >
  > ## IA-04 — Feedback / state
  >
  > | ID                | Category      | Status | Notes                                                                                                                                                                                                                                                                                              |
  > | ----------------- | ------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  > | PRODDETAIL-FDB-01 | Feedback      | Failed | Làm chậm API 4 giây: trạng thái tải là đúng `<div>Đang tải...</div>` — **0** spinner/skeleton/progressbar, **0** phần tử có `animation`. Chỉ là chữ thuần. → `BUG-PRODDETAIL-004`                                                                                                                  |
  > | PRODDETAIL-FDB-02 | Feedback      | Failed | Mô phỏng backend chết (`route.abort('connectionrefused')`): sau **30 giây** màn hình vẫn kẹt ở "Đang tải...", 0 nút, 0 thông báo lỗi. `.catch()` chỉ gọi `console.error` nên `product` mãi là `null`. → `BUG-PRODDETAIL-004`                                                                       |
  > | PRODDETAIL-FDB-03 | Feedback      | Failed | Nguyên văn hiển thị: `Sản phẩm không tồn tại (Lỗi trắng trang do data rỗng)` — phần trong ngoặc là ghi chú debug của lập trình viên bị lộ ra người dùng cuối. → `BUG-PRODDETAIL-005`                                                                                                               |
  > | PRODDETAIL-FDB-04 | Feedback      | Failed | So sánh `document.body.innerHTML` trước và sau 2 giây kể từ lần bấm: **giống hệt nhau**. Không nhãn đổi, không toast, không badge — người dùng bấm xong không thấy bất kỳ thay đổi nào. → `BUG-PRODDETAIL-001`                                                                                     |
  > | PRODDETAIL-FDB-05 | Feedback      | Failed | Xác nhận duy nhất là nhãn **bên trong chính nút vừa bấm**; không toast, không thay đổi nào ở header hay vùng khác của trang. Mắt rời khỏi nút là bỏ lỡ. → `BUG-PRODDETAIL-009`                                                                                                                     |
  > | PRODDETAIL-FDB-06 | Feedback      | Failed | Trong lúc xử lý: `disabled` = `false`, không `aria-busy`, không `aria-disabled`. Nút luôn bấm được, bỏ ngỏ double-submit. → `BUG-PRODDETAIL-009`                                                                                                                                                   |
  > | PRODDETAIL-FDB-07 | Feedback      | Failed | Sau khi thêm thành công, text của link header vẫn đúng chuỗi `Giỏ hàng`, không chứa chữ số nào — không có badge đếm. → `BUG-PRODDETAIL-009`                                                                                                                                                        |
  > | PRODDETAIL-USB-01 | Usability     | Passed | Nhãn là "Thêm vào giỏ hàng" — mô tả rõ hành động, không dùng "Submit"/"OK"/icon trần. Xét riêng về mặt chữ nghĩa thì đạt.                                                                                                                                                                          |
  > | PRODDETAIL-USB-02 | Usability     | Failed | Toàn bộ text của `main` là "iPhone 15 Pro Max / 30,000,000 ₫ / Điện thoại cao cấp của Apple / Số lượng: / Thêm vào giỏ hàng" — không có bất kỳ thông tin tồn kho nào. → `BUG-PRODDETAIL-011`                                                                                                       |
  > | PRODDETAIL-USB-03 | Usability     | Failed | `main` chỉ có đúng **1** nút ("Thêm vào giỏ hàng") và **0** link — bắt buộc phải qua trang Giỏ hàng mới tới được thanh toán. → `BUG-PRODDETAIL-011`                                                                                                                                                |
  > | PRODDETAIL-USB-04 | Usability     | Failed | Nhãn hứa "Thêm vào giỏ hàng" nhưng **lần bấm đầu tiên không thêm gì cả** (chỉ tăng `clickCount`). Nhãn không khớp hành vi thực tế. → `BUG-PRODDETAIL-001`                                                                                                                                          |
  > | PRODDETAIL-USB-05 | Usability     | Failed | Không có khối sản phẩm liên quan/cùng danh mục; `main` không chứa link nào dù dữ liệu đã có sẵn trường `category_id`. → `BUG-PRODDETAIL-011`                                                                                                                                                       |
  > | PRODDETAIL-ACC-01 | Accessibility | Failed | DOM: `<label>Số lượng:</label>` không có `for`, `<input>` không có `id`. Bấm vào nhãn → `document.activeElement` vẫn là `BODY`, con trỏ không nhảy vào ô nhập. → `BUG-PRODDETAIL-007`                                                                                                              |
  > | PRODDETAIL-ACC-02 | Accessibility | Passed | Thứ tự Tab đo được: EShop → Giỏ hàng → Đăng nhập → Đăng ký → ô số lượng → nút "Thêm vào giỏ hàng" → hết. Đúng trình tự đọc (footer không có phần tử focus được nên không xuất hiện).                                                                                                               |
  > | PRODDETAIL-ACC-03 | Accessibility | Passed | Cả hai phần tử giữ vòng focus mặc định của trình duyệt: `outline-style: auto`, `outline-color: rgb(16,16,16)` — không bị `outline: none` ghi đè.                                                                                                                                                   |
  > | PRODDETAIL-ACC-04 | Accessibility | Passed | Cả `Enter` và `Space` đều kích hoạt nút và thêm được sản phẩm vào giỏ, kết quả giống hệt bấm chuột.                                                                                                                                                                                                |
  > | PRODDETAIL-ACC-05 | Accessibility | Passed | `alt` = "iPhone 15 Pro Max" — mô tả đúng sản phẩm, không rỗng, không phải tên file.                                                                                                                                                                                                                |
  > | PRODDETAIL-ACC-06 | Accessibility | Failed | `document.documentElement.lang` = `"en"` trong khi 100% nội dung hiển thị là tiếng Việt → screen reader đọc sai ngữ điệu. → `BUG-PRODDETAIL-007`                                                                                                                                                   |
  > | PRODDETAIL-ACC-07 | Accessibility | Failed | **Phương pháp thay thế:** chưa chạy NVDA/Narrator thật (nằm ngoài khả năng của Playwright MCP); kết luận dựa trên DOM — trang có **0** vùng `aria-live` / `role=status` / `role=alert`, nên việc nhãn nút đổi thành "Đã thêm" chắc chắn không được screen reader thông báo. → `BUG-PRODDETAIL-007` |
  > | PRODDETAIL-ACC-08 | Accessibility | Failed | Ở 390×844: nút 184,3×48 px (đạt) nhưng ô số lượng chỉ 80×**42** px — cạnh ngắn dưới ngưỡng 44 px. Khoảng cách dọc giữa hai vùng chạm là 16 px. → `BUG-PRODDETAIL-007`                                                                                                                              |
  > | PRODDETAIL-ACC-09 | Accessibility | Passed | Toàn trang có đúng 1 heading: `<h1>iPhone 15 Pro Max</h1>`. Không nhảy cấp, phù hợp với trang chi tiết một sản phẩm không chia mục con.                                                                                                                                                            |
  >
  > ## Mục 6 mới — Kết quả thực thi (2026-07-29)
  >
  > ### Tổng hợp theo aspect
  >
  > | Aspect                       | Tổng   | Passed | Failed | Not Run | Tỉ lệ Failed |
  > | ---------------------------- | ------ | ------ | ------ | ------- | ------------ |
  > | IA-01 — General UI standards | 25     | 17     | 5      | 3       | 20%          |
  > | IA-02 — Forms                | 17     | 3      | 14     | 0       | 82%          |
  > | IA-03 — Navigation           | 10     | 4      | 6      | 0       | 60%          |
  > | IA-04 — Feedback / state     | 21     | 6      | 15     | 0       | 71%          |
  > | **Total**                    | **73** | **30** | **40** | **3**   | **55%**      |
  >
  > ### Môi trường thực thi
  >
  > - **Công cụ:** Playwright MCP (Chromium), điều khiển qua Claude Code
  > - **Frontend:** http://localhost:5173 · **Backend:** http://localhost:3000
  > - **Viewport đã chạy:** 1440×900 · 768×1024 · 767×1024 · 390×844 · 844×390 · 960×600 (mô phỏng zoom 150%)
  > - **Tài khoản test:** `test@eshop.com` / `Test1234!`
  > - **Nhánh:** `hw3/23127211`
  >
  > ### Item không chạy được và lý do
  >
  > | ID     | Lý do                                                                                                                                                     |
  > | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
  > | COM-01 | Cần đối chiếu Chrome 126 ↔ Firefox 128. Playwright MCP phiên này chỉ lái Chromium; sandbox chặn `require('playwright')` nên không khởi chạy được Firefox. |
  > | COM-02 | Cùng lý do trên (so sánh spinner của `input[type=number]` giữa 2 trình duyệt).                                                                            |
  > | COM-03 | Dấu tiếng Việt đã xác nhận đúng trên Chromium nhưng thiếu vế Firefox 128.                                                                                 |
  >
  > ### Item chạy bằng phương pháp thay thế
  >
  > | ID        | Phương pháp thay thế                                                                              |
  > | --------- | ------------------------------------------------------------------------------------------------- |
  > | RES-06    | Mô phỏng zoom 150% bằng viewport tương đương 960×600 CSS px thay cho Ctrl+= thật.                 |
  > | VIS-13    | `emulateMedia({colorScheme:'dark'})` thay cho việc đổi dark mode ở cấp hệ điều hành.              |
  > | FDB-02    | `route.abort('connectionrefused')` mô phỏng backend chết thay cho việc tắt tiến trình cổng 3000.  |
  > | ACC-07    | Kiểm chứng qua DOM (đếm vùng `aria-live`/`role=status`) thay cho việc chạy NVDA/Narrator thật.    |
  > | VIS-07/08 | Mock response API để tạo tên 102 ký tự và mô tả 675 ký tự (dữ liệu seed không có bản ghi đủ dài). |
  >
  > ***
  >
  > # Phần 2 — 12 bug report (`tests/bug-reports/product-detail/`)
  >
  > ## BUG-PRODDETAIL-001: Lần bấm đầu tiên vào "Thêm vào giỏ hàng" không có bất kỳ tác dụng nào
  >
  > **Found by Test Case:** PRODDETAIL-FUN-01, PRODDETAIL-FUN-02, PRODDETAIL-FUN-03, PRODDETAIL-FDB-04, PRODDETAIL-USB-04
  > **Requirement liên quan:** FR-06 (Xem chi tiết sản phẩm — nút "Thêm vào giỏ hàng", sau khi bấm hiển thị phản hồi trực quan)
  > **Severity / Priority:** Critical / P0
  > **Environment:** Chromium (Playwright MCP) 1440×900 · Windows 11 · http://localhost:5173/product/1 · nhánh `hw3/23127211`, commit `ff96609`
  >
  > **Steps to reproduce:**
  >
  > 1. Mở trang `http://localhost:5173/product/1` (tải mới hoàn toàn, không dùng điều hướng SPA)
  > 2. Giữ nguyên ô "Số lượng" ở giá trị mặc định `1`
  > 3. Bấm nút "Thêm vào giỏ hàng" **đúng một lần**
  > 4. Quan sát toàn bộ màn hình trong 2 giây
  > 5. Bấm link "Giỏ hàng" trên header để kiểm tra nội dung giỏ
  >
  > **Expected result:** Sản phẩm được thêm vào giỏ ngay ở lần bấm đầu tiên; nhãn nút chuyển sang trạng thái xác nhận.
  >
  > **Actual result:** Lần bấm đầu tiên **hoàn toàn không có tác dụng**: nhãn nút vẫn là "Thêm vào giỏ hàng", `document.body.innerHTML` trước và sau 2 giây **giống hệt nhau**, trang Giỏ hàng hiển thị "Giỏ hàng của bạn đang trống". Chỉ tới lần bấm **thứ hai** sản phẩm mới thực sự được thêm. Nguyên nhân: `handleAddToCart` có nhánh `if (clickCount === 0) { setClickCount(1); return; }`. Vì `clickCount` reset về `0` sau mỗi lượt thêm thành công và khi component remount, lỗi lặp lại liên tục.
  >
  > **Evidence:** `BUG-PRODDETAIL-001-first-click-no-effect.png`, `BUG-PRODDETAIL-001-cart-empty-after-click.png`
  >
  > ## BUG-PRODDETAIL-002: Ô "Số lượng" không có bất kỳ validation nào
  >
  > **Found by Test Case:** PRODDETAIL-VAL-01 → PRODDETAIL-VAL-10
  > **Requirement liên quan:** FR-06 (ô nhập **Số lượng** chỉ nhận số nguyên dương, tối thiểu là 1)
  > **Severity / Priority:** Critical / P0
  > **Environment:** Chromium (Playwright MCP) 1440×900 · Windows 11 · http://localhost:5173/product/1 · nhánh `hw3/23127211`, commit `ff96609`
  >
  > **Actual result —** không có bất kỳ validation nào, cả 10 kịch bản đều được chấp nhận:
  >
  > | Giá trị nhập | Số lượng vào giỏ | Thành tiền hiển thị          | Ghi chú                                        |
  > | ------------ | ---------------- | ---------------------------- | ---------------------------------------------- |
  > | `-1`         | `-1`             | **-30.000.000 ₫**            | Tổng tạm tính âm                               |
  > | `0`          | `0`              | `0 ₫`                        | Dòng rác trong giỏ                             |
  > | `1.5`        | `1`              | `30.000.000 ₫`               | `parseInt` âm thầm cắt còn 1                   |
  > | (rỗng)       | `NaN`            | **`NaN ₫`**                  | Tổng tạm tính cũng thành `NaN ₫`               |
  > | `abc`        | `NaN`            | **`NaN ₫`**                  | Ô chặn chữ nhưng xoá luôn giá trị cũ           |
  > | `2e3`        | `2`              | `60.000.000 ₫`               | `valueAsNumber`=2000 nhưng `parseInt("2e3")`=2 |
  > | `999999999`  | `999999999`      | **29.999.999.970.000.000 ₫** | Không có giới hạn tối đa                       |
  > | `-5` (paste) | `-5`             | **-150.000.000 ₫**           | Dán cũng không bị chặn                         |
  >
  > Bổ sung: VAL-08 — DOM là `<input class="border p-2 w-20 rounded" type="number" value="1">`, không có `min`/`max`/`step`. VAL-09 — từ `1` bấm mũi tên giảm về `0`. VAL-03 — trình duyệt đã set `validity.valid = false` nhưng ứng dụng không đọc tới.
  >
  > **Evidence:** `BUG-PRODDETAIL-002-qty-negative.png`, `-qty-zero.png`, `-qty-empty-NaN.png`, `-qty-overflow.png`
  >
  > **Notes:** Lỗi chạm trực tiếp tới tiền. Cần validate ở **cả frontend lẫn backend**.
  >
  > ## BUG-PRODDETAIL-003: Thêm cùng một sản phẩm nhiều lượt tạo ra nhiều dòng trùng lặp
  >
  > **Found by Test Case:** PRODDETAIL-FUN-04
  > **Requirement liên quan:** FR-07 (Giỏ hàng — "Thêm cùng một sản phẩm vào giỏ sẽ tăng số lượng, không tạo dòng mới")
  > **Severity / Priority:** Major / P1
  >
  > **Expected result:** Giỏ hàng gộp thành 1 dòng với số lượng cộng dồn, không tạo 2 dòng trùng tên sản phẩm.
  >
  > **Actual result:** Giỏ hàng tạo **2 dòng riêng biệt** cùng tên "iPhone 15 Pro Max", mỗi dòng số lượng `1`. Nguyên nhân trong `CartContext.jsx`: `addToCart` luôn chạy `setCart([...cart, { ...product, quantity }])`, không kiểm tra `product.id` đã tồn tại chưa.
  >
  > **Evidence:** `BUG-PRODDETAIL-003-cart-duplicate-rows.png`
  >
  > ## BUG-PRODDETAIL-004: Màn hình kẹt vĩnh viễn ở "Đang tải..." khi API lỗi
  >
  > **Found by Test Case:** PRODDETAIL-FDB-01, PRODDETAIL-FDB-02
  > **Requirement liên quan:** FR-06
  > **Severity / Priority:** Critical / P1
  >
  > **Actual result:** Kịch bản backend chết — sau **30 giây** màn hình vẫn kẹt ở "Đang tải...", không thông báo lỗi, không nút "Thử lại". Kịch bản mạng chậm — trạng thái tải là `<div>Đang tải...</div>`, **0** spinner/skeleton/progressbar, **0** phần tử có `animation`. Nguyên nhân: `.catch((err) => console.error(err))` chỉ log mà không set state lỗi, nên `product` giữ nguyên `null` và nhánh `if (!product)` luôn trả về màn hình "Đang tải...".
  >
  > **Evidence:** `BUG-PRODDETAIL-004-stuck-loading.png`
  >
  > ## BUG-PRODDETAIL-005: Thông báo lỗi lộ ghi chú debug và trang không có lối quay lại danh sách
  >
  > **Found by Test Case:** PRODDETAIL-NAV-06, NAV-07, NAV-08, FDB-03
  > **Requirement liên quan:** FR-06, FR-05
  > **Severity / Priority:** Major / P1
  >
  > **Actual result:** Cả `/product/99999` và `/product/abc` đều hiển thị nguyên văn `Sản phẩm không tồn tại (Lỗi trắng trang do data rỗng)` — phần trong ngoặc là ghi chú nội bộ của lập trình viên. Truy vấn `main a` trên cả 3 kịch bản đều trả về **mảng rỗng** — không breadcrumb, không link "Quay lại danh sách".
  >
  > **Evidence:** `BUG-PRODDETAIL-005-debug-message-99999.png`, `-debug-message-abc.png`
  >
  > ## BUG-PRODDETAIL-006: Giỏ hàng mất sạch sau khi tải lại trang
  >
  > **Found by Test Case:** PRODDETAIL-NAV-09
  > **Requirement liên quan:** FR-07
  > **Severity / Priority:** Major / P1
  >
  > **Actual result:** Sau F5 giỏ hàng **trống hoàn toàn**. `Object.keys(localStorage)` → `[]`, `Object.keys(sessionStorage)` → `[]`. Nguyên nhân: `const [cart, setCart] = useState([])` — giỏ chỉ tồn tại trong React state, không đồng bộ xuống storage cũng không lưu về backend.
  >
  > **Evidence:** `BUG-PRODDETAIL-006-cart-lost-after-reload.png`
  >
  > ## BUG-PRODDETAIL-007: Nhóm lỗi accessibility
  >
  > **Found by Test Case:** PRODDETAIL-ACC-01, ACC-06, ACC-07, ACC-08
  > **Requirement liên quan:** FR-06
  > **Severity / Priority:** Major / P2
  >
  > **Actual result:**
  >
  > - **ACC-01 — Nhãn rời rạc.** `<label>Số lượng:</label>` không có `for`, `<input>` không có `id`. Bấm vào nhãn → `document.activeElement` vẫn là `BODY`.
  > - **ACC-06 — Sai ngôn ngữ.** `document.documentElement.lang` = `"en"` trong khi 100% nội dung là tiếng Việt.
  > - **ACC-07 — Không có thông báo cho screen reader.** Trang có **0** vùng `aria-live` / `role=status` / `role=alert`. _Ghi chú phương pháp:_ chưa chạy NVDA/Narrator thật, kết luận dựa trên việc đếm live region trong DOM.
  > - **ACC-08 — Vùng chạm dưới chuẩn.** Ở 390×844: nút 184,3×48 px (đạt), ô nhập số lượng 80×**42** px (không đạt ngưỡng 44 px). Khoảng cách dọc giữa hai vùng chạm 16 px.
  >
  > **Evidence:** `BUG-PRODDETAIL-007-mobile-touch-target.png`
  >
  > ## BUG-PRODDETAIL-008: Định dạng giá phụ thuộc locale trình duyệt
  >
  > **Found by Test Case:** PRODDETAIL-VIS-02, PRODDETAIL-COM-04
  > **Requirement liên quan:** FR-05, FR-06
  > **Severity / Priority:** Major / P2
  >
  > **Actual result:** Chuỗi giá đổi theo locale — `en-US` → `30,000,000 ₫` (sai chuẩn), `vi-VN` → `30.000.000 ₫` (đúng). Vì `<html lang="en">` và phần lớn người dùng để trình duyệt mặc định, giá hiển thị thực tế là `30,000,000 ₫`. Nguyên nhân: `Number(product.price).toLocaleString()` gọi không truyền locale. Lỗi lặp lại ở trang Giỏ hàng.
  >
  > **Evidence:** `BUG-PRODDETAIL-008-price-comma-format.png`
  >
  > ## BUG-PRODDETAIL-009: Phản hồi sau khi thêm vào giỏ quá mờ nhạt và không chặn double-submit
  >
  > **Found by Test Case:** PRODDETAIL-FDB-05, FDB-06, FDB-07
  > **Requirement liên quan:** FR-06 ("toast notification hoặc badge cập nhật")
  > **Severity / Priority:** Minor / P2
  >
  > **Actual result:** FDB-05 — toàn bộ phản hồi thành công chỉ là nhãn nút đổi trong 2003 ms, không toast, không thay đổi ở header. FDB-06 — trong lúc xử lý `disabled` = `false`, `aria-busy` = `null`, `aria-disabled` = `null`. FDB-07 — link header vẫn đúng chuỗi `Giỏ hàng`, không chứa chữ số. FR-06 yêu cầu "toast **hoặc** badge" — SUT không có cả hai.
  >
  > **Evidence:** `BUG-PRODDETAIL-009-no-cart-badge.png`
  >
  > ## BUG-PRODDETAIL-010: Nhóm lỗi hiển thị
  >
  > **Found by Test Case:** PRODDETAIL-VIS-01, VIS-04, VIS-10
  > **Requirement liên quan:** FR-06, FR-05
  > **Severity / Priority:** Minor / P3
  >
  > **Actual result:**
  >
  > - **VIS-01 — Ảnh phóng 152%.** Ảnh gốc 300×300 px render ở 455×455 px; ở viewport 767 px còn nặng hơn — render 670×670 px (phóng 2,23×). Chữ "iPhone 15" trên ảnh nhoè thấy rõ.
  > - **VIS-04 — Khoảng trắng thừa ~200 px.** `<p class="text-gray-700 mb-6 flex-grow">` giãn ra chiếm hết chiều cao dư của cột — đo được 225 px dù chỉ chứa 1 dòng chữ ~24 px.
  > - **VIS-10 — Tiêu đề tab mặc định.** `document.title` = `frontend-web` trên mọi sản phẩm.
  >
  > **Evidence:** `BUG-PRODDETAIL-010-whitespace-and-upscaled-image.png`
  >
  > ## BUG-PRODDETAIL-011: Trang chi tiết thiếu thông tin tồn kho, lối thanh toán nhanh và sản phẩm liên quan
  >
  > **Found by Test Case:** PRODDETAIL-USB-02, USB-03, USB-05
  > **Requirement liên quan:** FR-06 ("Hiển thị đầy đủ: Ảnh lớn, Tên, Giá, Mô tả, **Danh mục**")
  > **Severity / Priority:** Minor / P3
  >
  > **Actual result:** Toàn bộ nội dung `main` chỉ gồm tên, giá, mô tả, "Số lượng:", nút "Thêm vào giỏ hàng". Không có thông tin tồn kho; `main` chỉ có 1 nút và 0 link nên bắt buộc qua trang Giỏ hàng mới tới thanh toán; không có khối sản phẩm liên quan dù API đã trả sẵn `category_id`. Ngoài ra trang **không hiển thị Danh mục** — vi phạm trực tiếp câu chữ FR-06.
  >
  > **Evidence:** `BUG-PRODDETAIL-010-whitespace-and-upscaled-image.png`
  >
  > ## BUG-PRODDETAIL-012: Mất vị trí cuộn khi Back và mất ngữ cảnh sau đăng nhập
  >
  > **Found by Test Case:** PRODDETAIL-NAV-03, PRODDETAIL-NAV-10
  > **Requirement liên quan:** FR-06, FR-01
  > **Severity / Priority:** Minor / P3
  >
  > **Actual result:** NAV-03 — cuộn Home tới `scrollY` = 118, mở chi tiết rồi Back: URL đúng nhưng `scrollY` = **0**. NAV-10 — đăng nhập từ `/product/1`: header hiện "Chào, Test User" ✓, giỏ hàng còn nguyên ✓, nhưng bị đưa về `/` thay vì quay lại `/product/1` ❌.
  >
  > **Evidence:** `BUG-PRODDETAIL-012-scroll-position-lost.png`
  >
  > **Phát hiện ngoài phạm vi checklist:** khi chạy NAV-10 nhận thấy cả hai ô của form đăng nhập đều là `type="text"` — ô mật khẩu **không được che dấu**. Thuộc màn hình Login, cần lập bug riêng cho module LOGIN.
  >
  > ***
  >
  > # Phần 3 — Screenshot bằng chứng (`tests/bug-reports/screenshots/`)
  >
  > 16 ảnh: `BUG-PRODDETAIL-001-first-click-no-effect.png`, `-001-cart-empty-after-click.png`, `-002-qty-negative.png`, `-002-qty-zero.png`, `-002-qty-empty-NaN.png`, `-002-qty-overflow.png`, `-003-cart-duplicate-rows.png`, `-004-stuck-loading.png`, `-005-debug-message-99999.png`, `-005-debug-message-abc.png`, `-006-cart-lost-after-reload.png`, `-007-mobile-touch-target.png`, `-008-price-comma-format.png`, `-009-no-cart-badge.png`, `-010-whitespace-and-upscaled-image.png`, `-012-scroll-position-lost.png`
- **Đánh giá:** Valid
- **Suy luận:**
  AI chạy được 70/73 item bằng Playwright MCP và đưa ra kết luận có số đo cụ thể cho từng item (kích thước px, tỉ lệ tương phản, thời gian ms, nội dung DOM) chứ không phán đoán chung chung. Ba điểm tôi kiểm tra kỹ và thấy hợp lý:
  - **Không tự nhận đã chạy thứ không chạy được:** COM-01/02/03 giữ `Not Run` với lý do rõ ràng (không mở được Firefox), thay vì suy đoán kết quả từ Chromium.
  - **Ghi rõ phương pháp thay thế:** 5 item (RES-06, VIS-13, FDB-02, ACC-07, VIS-07/08) chạy bằng cách mô phỏng thay vì thao tác gốc, và điều này được ghi thẳng vào cột Notes lẫn mục 6 — người đọc biết chỗ nào cần xác nhận lại bằng tay.
  - **Phân biệt được lỗi thật với lỗi trông có vẻ là lỗi:** RES-05 để `Passed` dù class `.bug-mobile-hidden` có `margin-right:-100px`, vì đo thực tế cho thấy `self-start` khiến nó chưa gây lệch; rủi ro tiềm ẩn được ghi vào Notes thay vì báo fail sai.
- **Sửa:** Không cần sửa

---

**AI Audit Report Item**

- **Công cụ AI:** Claude Code (Claude Opus 5 — `claude-opus-5`)
- **Thời gian:** 2026-08-01 14:06:46
- **Nội dung prompt:**
  > Sử dụng skill @.agents/skills/cross-platform-testing-tracker/SKILL.md để chọn ra các test case cần chạy lại, sao đó tạo 1 file checklist ghi nội dung vào nhé
  >
  > 3 nền tảng sẽ sử dụng là Chrome, Firefox và expose localhost ra internet để dùng safari trên điện thoại nhé
  >
  > Sau khi hoàn tất, sử dụng skill @.agents/skills/ai-audit-logger/SKILL.md để lưu lại toàn bộ audit
- **AI output:**

  > Chạy skill `cross-platform-testing-tracker`: lọc 73 item của checklist Task 1 xuống 20 item nhạy nền tảng, dựng ma trận 3 nền tảng (Chrome/Firefox/Safari iOS qua ngrok). Đã kiểm chứng bằng script: 20/20 ID trích dẫn đều truy vết được về checklist gốc. Nội dung đầy đủ file `tests/cross-platform/platform-matrix.md`:
  >
  > # Platform Matrix — Product Detail (EShop SUT)
  >
  > - **Platform 1:** Chrome 126 — Windows 11, desktop, cửa sổ 1440×900
  > - **Platform 2:** Firefox 128 — Windows 11, desktop, cửa sổ 1440×900
  > - **Platform 3:** Safari — iOS trên iPhone thật, truy cập qua ngrok (expose `localhost:5173` ra internet)
  > - **SUT URL khi test:** P1/P2 dùng `http://localhost:5173/product/1` · P3 dùng URL ngrok trỏ về cùng máy
  > - **Checklist nguồn:** [`../checklist/product-detail/checklist_product-detail.md`](../../checklist/product-detail/checklist_product-detail.md) (73 item)
  > - **Trạng thái:** chưa chạy — toàn bộ ô kết quả là `Not Run`
  >
  > > Bộ 3 này phủ trọn cả ba engine trình duyệt: **Blink** (Chrome), **Gecko** (Firefox), **WebKit**
  > > (Safari). Thêm nữa Platform 3 là thiết bị **cảm ứng thật**, nên bắt được cả nhóm lỗi chỉ xuất
  > > hiện khi không có chuột và không có hover.
  >
  > ***
  >
  > ## ⚠️ Hai việc phải xử lý TRƯỚC khi chạy Platform 3
  >
  > **1. Backend đang hard-code `localhost:3000` ở 13 chỗ trong 7 file.**
  >
  > Mở ngrok chỉ expose frontend (cổng 5173). Khi iPhone tải trang, đoạn JS chạy trên **điện thoại** sẽ
  > gọi `http://localhost:3000` — mà `localhost` lúc đó là chính chiếc iPhone, không phải máy bạn. Kết
  > quả: trang load nhưng **không có sản phẩm nào hiện ra**, mọi item đều Blocked.
  >
  > Phải chọn một trong hai cách trước khi test:
  >
  > - Tunnel luôn cổng 3000 bằng một ngrok thứ hai, rồi đổi 13 chỗ đó sang URL ngrok của backend; hoặc
  > - Cấu hình `server.proxy` trong `frontend-web/vite.config.js` cho `/api` → `http://localhost:3000`,
  >   rồi đổi 13 URL tuyệt đối thành đường dẫn tương đối `/api/...` (cách này gọn hơn về lâu dài).
  >
  > Ngoài ra `vite.config.js` cần thêm `server.allowedHosts` chứa domain ngrok, nếu không Vite chặn request.
  >
  > **2. Đề yêu cầu ảnh chụp thấy "SUT's localhost URL", nhưng qua ngrok thanh địa chỉ sẽ hiện domain ngrok.**
  >
  > Cách xử lý an toàn: ngoài ảnh chụp màn hình iPhone, chụp thêm **cửa sổ terminal đang chạy ngrok**
  > thể hiện dòng `Forwarding https://<...>.ngrok-free.dev -> http://localhost:5173`. Hai ảnh đi kèm
  > nhau chứng minh được đây đúng là instance localhost của bạn chứ không phải bản deploy công khai.
  >
  > ***
  >
  > ## Bước 2 — Cơ sở lọc item
  >
  > Không chạy lại cả 73 item trên 3 nền tảng. Phần lớn item chạy **cùng một đoạn JavaScript** nên đổi
  > engine không sinh thêm phát hiện nào — tốn công mà không tăng độ phủ lỗi.
  >
  > ### Nhóm được giữ lại
  >
  > | Category            | Trong checklist | Giữ lại | Vì sao nhạy nền tảng                                                          |
  > | ------------------- | --------------- | ------- | ----------------------------------------------------------------------------- |
  > | `VIS` Visual        | 14              | 10      | Render font, box-shadow, ảnh hỏng, dark mode khác nhau theo engine và theo OS |
  > | `RES` Responsive    | 7               | 4       | Viewport thật của thiết bị khác hẳn viewport giả lập bằng cách kéo cửa sổ     |
  > | `COM` Compatibility | 4               | 4       | Category sinh ra đúng cho mục đích này                                        |
  > | `ACC` Accessibility | 9               | 2       | Chỉ 2 item phụ thuộc nền tảng: viền focus mặc định và vùng chạm               |
  > | **Tổng**            | **73**          | **20**  |                                                                               |
  >
  > ### Nhóm bị loại — kèm lý do
  >
  > | Item bị loại                             | Lý do loại                                                                                                                                       |
  > | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
  > | `VIS-04` khoảng trắng dọc do `flex-grow` | Flexbox render nhất quán giữa các engine hiện đại, lợi ích thấp                                                                                  |
  > | `VIS-08` mô tả dài > 500 ký tự           | Trùng cơ chế xuống dòng với `VIS-07`, giữ một item là đủ                                                                                         |
  > | `VIS-10` tiêu đề tab trình duyệt         | `document.title` do JS đặt, không phụ thuộc engine chút nào                                                                                      |
  > | `VIS-14` bố cục RTL                      | Hành vi `dir="rtl"` nhất quán giữa các engine; app lại không hỗ trợ RTL nên kết quả giống nhau ở cả 3 nơi                                        |
  > | `RES-01`, `RES-02`, `RES-03`             | Đổi viewport trên desktop cho kết quả như nhau ở mọi engine; giá trị thật nằm ở `RES-04`/`RES-05` chạy trên thiết bị thật                        |
  > | Toàn bộ `VAL` (10 item)                  | Validation chạy cùng một đoạn JS — đổi trình duyệt không đổi kết quả                                                                             |
  > | Toàn bộ `FUN` (7 item)                   | Đã rà: không item nào chạm browser API (không date picker, không upload file, không camera/QR), nên không đủ điều kiện thuộc nhóm "FUN chạm API" |
  > | Toàn bộ `NAV` (10 item)                  | Routing của React Router, hành vi giống nhau mọi trình duyệt                                                                                     |
  > | Toàn bộ `FDB` (7 item)                   | Logic trạng thái ứng dụng, không phụ thuộc engine                                                                                                |
  > | Toàn bộ `USB` (5 item)                   | Đánh giá tính khả dụng, không phải khác biệt nền tảng                                                                                            |
  > | `ACC-01/02/04/05/06/07/09`               | Thuộc tính DOM và ngữ nghĩa (`for`, `alt`, `lang`, heading) — giống nhau ở mọi nền tảng                                                          |
  >
  > ***
  >
  > ## Kết quả
  >
  > Ký hiệu ô: `Not Run` → chưa chạy · `Passed` / `Failed` / `Blocked` + tên file ảnh khi đã chạy thật ·
  > `N/A` → không áp dụng trên nền tảng đó (đã nêu lý do ở chú thích dưới bảng).
  >
  > | ID                | Item (rút gọn từ checklist Task 1)                                   | P1 Chrome | P2 Firefox | P3 Safari iOS |
  > | ----------------- | -------------------------------------------------------------------- | --------- | ---------- | ------------- |
  > | PRODDETAIL-VIS-01 | Ảnh gốc 300×300 render ở 455×455 — kiểm tra độ nét                   | Not Run   | Not Run    | Not Run       |
  > | PRODDETAIL-VIS-02 | Dấu phân tách hàng nghìn của giá theo chuẩn VN                       | Not Run   | Not Run    | Not Run       |
  > | PRODDETAIL-VIS-03 | Vị trí và khoảng cách ký hiệu `₫` so với phần số                     | Not Run   | Not Run    | Not Run       |
  > | PRODDETAIL-VIS-05 | Nhãn "Số lượng:" căn giữa trục dọc với ô nhập                        | Not Run   | Not Run    | Not Run       |
  > | PRODDETAIL-VIS-06 | Chiều cao ô nhập số lượng so với nút "Thêm vào giỏ hàng"             | Not Run   | Not Run    | Not Run       |
  > | PRODDETAIL-VIS-07 | Tên sản phẩm dài > 60 ký tự xuống dòng trong cột phải                | Not Run   | Not Run    | Not Run       |
  > | PRODDETAIL-VIS-09 | Chặn ảnh ngoài — hiển thị `alt`, bố cục 2 cột không lệch             | Not Run   | Not Run    | Not Run       |
  > | PRODDETAIL-VIS-11 | Bo góc / viền / đổ bóng card so với Home và Cart                     | Not Run   | Not Run    | Not Run       |
  > | PRODDETAIL-VIS-12 | Tương phản chữ mô tả xám trên nền trắng                              | Not Run   | Not Run    | Not Run       |
  > | PRODDETAIL-VIS-13 | Bật dark mode của hệ điều hành rồi tải lại trang                     | Not Run   | Not Run    | Not Run       |
  > | PRODDETAIL-RES-04 | Viewport 390×844 — không có thanh cuộn ngang                         | Not Run   | Not Run    | Not Run       |
  > | PRODDETAIL-RES-05 | Vị trí nút "Thêm vào giỏ hàng" ở bề rộng ≤ 640px                     | Not Run   | Not Run    | Not Run       |
  > | PRODDETAIL-RES-06 | Zoom trang lên 150%                                                  | Not Run   | Not Run    | Not Run       |
  > | PRODDETAIL-RES-07 | Xoay ngang (landscape)                                               | Not Run   | Not Run    | Not Run       |
  > | PRODDETAIL-COM-01 | So sánh bố cục, cỡ chữ, màu sắc, vị trí phần tử giữa các trình duyệt | Not Run   | Not Run    | Not Run       |
  > | PRODDETAIL-COM-02 | Nút tăng/giảm (spinner) của ô `input[type=number]`                   | Not Run   | Not Run    | Not Run       |
  > | PRODDETAIL-COM-03 | Hiển thị dấu tiếng Việt ở tên, mô tả, nhãn                           | Not Run   | Not Run    | Not Run       |
  > | PRODDETAIL-COM-04 | Chuỗi giá khi đổi ngôn ngữ ưu tiên của trình duyệt                   | Not Run   | Not Run    | Not Run       |
  > | PRODDETAIL-ACC-03 | Viền focus nhìn thấy rõ khi Tab vào ô nhập và nút                    | Not Run   | Not Run    | N/A ¹         |
  > | PRODDETAIL-ACC-08 | Vùng chạm nút và ô nhập tối thiểu 44px                               | N/A ²     | N/A ²      | Not Run       |
  >
  > ¹ iOS Safari không có điều hướng bằng phím Tab nếu không gắn bàn phím ngoài — item này chỉ có nghĩa trên desktop.
  > ² P1/P2 dùng chuột, không phải thiết bị cảm ứng — tiêu chuẩn vùng chạm 44px chỉ có nghĩa thật trên P3.
  >
  > **Số item thực chạy:** P1 = 19 · P2 = 19 · P3 = 19
  >
  > ***
  >
  > ## Item nên bổ sung riêng cho iOS Safari
  >
  > Hai item dưới đây **không có trong checklist Task 1** vì checklist đó xây trên desktop. Chúng nhắm
  > vào hành vi chỉ tồn tại ở WebKit/iOS. Nếu dùng, thêm vào checklist gốc trước rồi mới điền vào đây,
  > để giữ mạch truy vết.
  >
  > | ID đề xuất          | Item                                                         | Vì sao chỉ có ở iOS Safari                                                                                                                            |
  > | ------------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
  > | `PRODDETAIL-COM-05` | Chạm vào ô "Số lượng" và quan sát trang có tự phóng to không | iOS Safari tự zoom trang khi focus vào input có `font-size` < 16px — lỗi kinh điển của WebKit, không tồn tại trên Chrome/Firefox                      |
  > | `PRODDETAIL-COM-06` | Chạm vào ô "Số lượng" và quan sát loại bàn phím ảo hiện lên  | `input[type=number]` trên iOS mở bàn phím số không có dấu trừ — người dùng không nhập được giá trị âm, khiến kết quả `VAL-01` khác hẳn so với desktop |
  >
  > ***
  >
  > ## Quy ước ảnh chụp
  >
  > Mỗi ảnh phải thấy đủ **ba** thứ trong cùng khung hình:
  >
  > 1. Tên trình duyệt / OS / thiết bị
  > 2. URL của SUT trên thanh địa chỉ (với P3, kèm thêm ảnh terminal ngrok như đã nêu ở trên)
  > 3. Watermark `23127211@hcmus.edu.vn`
  >
  > **Đặt tên file:** `<platform-slug>_<checklist-ID>_<mô-tả-ngắn>.png`
  >
  > ```
  > chrome-win11_PRODDETAIL-COM-02_number-spinner.png
  > firefox-win11_PRODDETAIL-COM-02_number-spinner.png
  > safari-ios_PRODDETAIL-RES-05_addtocart-offset.png
  > ```
  >
  > Chỉ chụp ảnh cho ô `Failed` — giống quy tắc ở Task 1.
  >
  > ### Lệnh chèn watermark
  >
  > ```bash
  > python .agents/skills/cross-platform-testing-tracker/scripts/watermark_screenshot.py \
  >   tests/cross-platform/screenshots/raw \
  >   --student-id 23127211 \
  >   --output-dir tests/cross-platform/screenshots/final
  > ```
  >
  > > **Bắt buộc truyền `--student-id`.** Nếu bỏ qua, script rơi về một email mặc định ở domain khác —
  > > tiện để thử render nhưng **sai định dạng nộp bài**. Kiểm tra lại MSSV trước khi chạy hàng loạt.
  >
  > ***
  >
  > ## Phân loại defect sau khi điền xong
  >
  > | ID  | Fail trên    | Phân loại                                                                                  |
  > | --- | ------------ | ------------------------------------------------------------------------------------------ |
  > |     | 1/3 platform | **Cross-platform defect thật** — log bug riêng, ghi rõ engine nào tái hiện                 |
  > |     | 2/3 platform | Cross-platform defect — thường do 2 engine chia sẻ đặc điểm; ghi rõ engine nào không dính  |
  > |     | 3/3 platform | Defect chung — đáng lẽ đã nằm trong bug list Task 1, **không** tính là phát hiện mới ở đây |
  >
  > Với mỗi bug platform-specific, dùng `bug_report_template.md` của skill `gui-checklist-builder` và
  > điền trường `Environment` bằng đúng nền tảng/trình duyệt/OS/viewport tái hiện được, kèm câu trả lời
  > rõ ràng cho câu hỏi _"có tái hiện trên 2 nền tảng còn lại không"_.
  >
  > ***
  >
  > ## Tóm tắt
  >
  > > Điền sau khi chạy xong cả 3 nền tảng.
  >
  > - Platform đã test: CHƯA CHẠY
  > - Số item test / platform: CHƯA CHẠY
  > - Pass rate mỗi platform: CHƯA CHẠY
  > - Bug platform-specific tìm được: CHƯA CHẠY
  >
  > ***
  >
  > ## Dự đoán nơi có khả năng ra defect cao nhất
  >
  > Không phải kết quả test — chỉ là gợi ý thứ tự ưu tiên chạy, dựa trên những gì đã đọc được từ source
  > và đo được trên desktop ở Task 1. **Vẫn phải chạy thật mới biết Pass hay Fail.**
  >
  > | Item                             | Vì sao đáng chạy trước                                                                                                              |
  > | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
  > | `COM-02` spinner ô số lượng      | iOS Safari không render spinner cho `input[type=number]`, Firefox và Chrome lại render khác nhau — nhiều khả năng lệch cả 3         |
  > | `COM-04` chuỗi giá theo locale   | `Number(price).toLocaleString()` không truyền locale nên phụ thuộc thẳng vào cài đặt ngôn ngữ của từng máy/thiết bị                 |
  > | `RES-05` vị trí nút ở ≤ 640px    | `.bug-mobile-hidden { margin-right: -100px }` chỉ kích hoạt dưới 640px; trên iPhone thật là lần đầu điều kiện này gặp viewport thật |
  > | `VIS-06` chiều cao ô nhập vs nút | iOS Safari áp style mặc định cho form control khác hẳn desktop                                                                      |
  > | `VIS-09` ảnh hỏng                | Mỗi engine vẽ ảnh lỗi và chữ `alt` một kiểu khác nhau                                                                               |

- **Đánh giá:** Valid
- **Suy luận:** File do AI sinh ra khá tốt và đầy đủ
- **Sửa:** Không cần sửa
