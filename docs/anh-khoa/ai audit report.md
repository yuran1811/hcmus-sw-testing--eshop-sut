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
