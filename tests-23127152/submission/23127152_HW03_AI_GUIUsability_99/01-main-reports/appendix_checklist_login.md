# GUI Checklist — Login (EShop SUT)

## 1. Header block

| Trường               | Giá trị                                                                                                                                                                                                                                                                          |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Screen**           | Login                                                                                                                                                                                                                                                                            |
| **Route**            | `/login`                                                                                                                                                                                                                                                                         |
| **Source component** | `frontend-web/src/pages/Login.jsx` (khung layout: `frontend-web/src/App.jsx`)                                                                                                                                                                                                    |
| **SUT URL**          | http://localhost:5173/login (backend API: http://localhost:3000/api/login)                                                                                                                                                                                                       |
| **Cách inspect**     | (1) Đọc source `Login.jsx`, `App.jsx`, `AuthContext.jsx`; (2) Duyệt live UI tại http://localhost:5173/login ở 3 viewport, truy vấn DOM (type input, label/for, tabIndex, lang); (3) Gọi thẳng `POST /api/login` để xác nhận lockout sau nhiều lần sai mật khẩu              |
| **Target viewports** | Desktop 1440×900 · Tablet 768×1024 · Mobile 390×844                                                                                                                                                                                                                              |
| **Target browsers**  | Chrome (chính) · Firefox                                                                                                                                                                                                                                                       |
| **Building methods** | Component-based · State-based · Risk-based (auth / lockout) · Heuristic-based (Nielsen)                                                                                                                                                                                        |
| **Prefix ID**        | `LOGIN-`                                                                                                                                                                                                                                                                         |
| **Số item**          | 33                                                                                                                                                                                                                                                                               |
| **Trạng thái**       | **Đã thực thi Sprint 1 + Task 3 COM** — COM-01 Passed (Chrome↔Firefox). Chi tiết: `../../test-runs/sprint-1-gui-execution.md`, `../../cross-platform/platform-matrix.md`                                                                                                      |

### Inventory màn hình (Step 1)

**Components thực tế có trên màn hình** (từ source + live SUT):

| Thành phần        | Chi tiết quan sát được                                                                                                                                              |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Card form         | 1 `<div>` `max-w-md mx-auto mt-10 bg-white p-8 border rounded shadow-sm` trên nền `bg-gray-50` chung                                                                |
| Tiêu đề           | 1 `<h2>` chữ **"Đăng Ký"** (sai — đây là trang đăng nhập)                                                                                                           |
| Ô Username        | 1 `<input type="text">` bind state `email`, label "Username", `required`, **không** có `id`/`name`/`autocomplete`                                                  |
| Ô Mật khẩu        | 1 `<input type="text">` bind state `password`, label "Mật khẩu", `required` — **mật khẩu hiển thị dạng text thường**, không phải `type="password"`                 |
| Link quên MK      | `<a href="/forgot-password">Quên mật khẩu?</a>` — thẻ `<a>` HTML thuần, **không** phải React `<Link>` → full page navigation                                       |
| Nút submit        | `<button type="submit">Sign In</button>` `w-full bg-blue-600`, có `tabIndex={1}` bất thường                                                                         |
| Link đăng ký      | `<Link to="/register">Đăng ký ngay</Link>` trong câu "Chưa có tài khoản?"                                                                                          |
| Khối lỗi          | `<div class="bg-red-100 text-red-700 p-3 mt-4 rounded">` chỉ render khi `error` state khác rỗng (sau `.catch`)                                                      |
| Khung chung       | `header` (logo EShop, Giỏ hàng, Đăng nhập, Đăng ký) + `main` + `footer` copyright                                                                                   |
| **Không có**      | spinner/loading, disabled nút khi submit, toggle hiện/ẩn mật khẩu, validation per-field, `htmlFor`/`id` trên label, `aria-*`, remember-me, OAuth, CAPTCHA trên UI |

**States quan sát được:**

| Loại state              | Biểu hiện thực tế                                                                                          |
| ----------------------- | ---------------------------------------------------------------------------------------------------------- |
| Screen — Initial        | Form trống, không có thông báo lỗi                                                                         |
| Screen — Error          | Khối đỏ "Đăng nhập thất bại. Vui lòng kiểm tra lại." sau `catch` (401 hoặc lỗi mạng)                     |
| Screen — Success        | `navigate('/')` — không có toast/xác nhận trên màn Login                                                   |
| Button — Loading        | **không tồn tại** — nút luôn bấm được trong lúc gọi API                                                   |
| Input — Invalid (HTML5) | Trình duyệt chặn submit khi `required` trống; không có styling lỗi riêng                                   |
| Backend — Lockout       | Sau nhiều lần sai, API trả lỗi lockout (backend tăng counter +2 mỗi lần, khóa khi `>= 3`) — UX chưa rõ |

**Data-dependent variations cần chú ý:** email dài, ký tự đặc biệt trong mật khẩu, tài khoản bị khóa, mạng chậm/tắt backend, double-submit nhanh, paste mật khẩu, email có dấu.

---

## 2. Pass log (4 pass tuần tự)

| Pass | Aspect               | Categories          | Sinh ở pass đầu | Thêm sau critical review | Tổng   |
| ---- | -------------------- | ------------------- | --------------- | ------------------------ | ------ |
| 1/4  | IA-01 General UI     | `VIS`, `RES`, `COM` | 6               | 5                        | 11     |
| 2/4  | IA-02 Forms          | `VAL`, `FUN`        | 5               | 3                        | 8      |
| 3/4  | IA-03 Navigation     | `NAV`               | 3               | 2                        | 5      |
| 4/4  | IA-04 Feedback/state | `FDB`, `USB`, `ACC` | 5               | 4                        | 9      |
|      |                      |                     | **19**          | **14**                   | **33** |

---

## 3. Critical review — item được bổ sung và lý do pass đầu bỏ sót

Ba nhóm lý do: **[WPI]** Weak prompt input · **[NLU]** No access to live UI · **[MBS]** Model blind spot.

### Pass 1 — IA-01

| ID bổ sung     | Nhóm | Vì sao pass đầu bỏ sót                                                                                                                                                                                                                       |
| -------------- | ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `LOGIN-VIS-02` | MBS  | Pass đầu sinh item "tiêu đề trang hiển thị rõ ràng" mà không đối chiếu nội dung thật. Chỉ khi đọc DOM mới thấy `<h2>` ghi **"Đăng Ký"** trên route `/login` — lỗi copy-paste từ Register, dễ bỏ qua nếu chỉ nhìn layout.                    |
| `LOGIN-VIS-04` | WPI  | Prompt không nhắc metadata trang. Pass đầu bỏ qua `document.title` — thực tế vẫn là chuỗi mặc định Vite `frontend-web`, không phản ánh màn đăng nhập.                                                                                      |
| `LOGIN-VIS-05` | WPI  | Prompt không nêu SUT có dark mode. Pass IA-01 chỉ kiểm contrast ở theme sáng; cần item riêng cho `prefers-color-scheme: dark` vì app không khai báo dark palette.                                                                           |
| `LOGIN-RES-04` | MBS  | Pass đầu chỉ resize viewport, quên **zoom trình duyệt 150%** — biến độc lập với breakpoint, quan trọng với form auth trên màn hình nhỏ.                                                                                                   |
| `LOGIN-COM-02` | NLU  | Dấu tiếng Việt ("Mật khẩu", "Quên mật khẩu?", "Đăng ký ngay") cần đối chiếu render thật trên Firefox; đọc source không đủ phát hiện lỗi font/substitution trên từng engine.                                                                  |

### Pass 2 — IA-02

| ID bổ sung     | Nhóm | Vì sao pass đầu bỏ sót                                                                                                                                                                                          |
| -------------- | ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `LOGIN-FUN-03` | NLU  | Nhìn UI, ô mật khẩu trông giống mọi input khác. Chỉ khi inspect DOM mới thấy `type="text"` thay vì `type="password"` — mật khẩu lộ plaintext khi gõ và khi autofill.                                           |
| `LOGIN-FUN-04` | MBS  | Thiên happy-path: giả định một lần bấm = một request. Source không có `disabled`/`loading` trên nút submit → cần item double-submit / double-click.                                                            |
| `LOGIN-VAL-04` | MBS  | Pass đầu chỉ test sai mật khẩu một lần. Backend có lockout (counter +2, khóa `>= 3`) — rủi ro auth bắt buộc item lặp submit nhiều lần; không đọc `server.js` thì dễ bỏ sót.                                   |

### Pass 3 — IA-03

| ID bổ sung     | Nhóm | Vì sao pass đầu bỏ sót                                                                                                                                                                                                                   |
| -------------- | ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `LOGIN-NAV-04` | MBS  | Pass đầu sinh item "link Quên mật khẩu hoạt động" mặc định dùng client-side routing. Thực tế là `<a href>` HTML → full reload, có thể mất state SPA; khác hẳn `<Link to>` của React Router.                                            |
| `LOGIN-NAV-05` | NLU  | `tabIndex={1}` trên nút submit chỉ thấy khi đọc source — làm lệch thứ tự Tab so với các control header/form; pass NAV thông thường không kiểm tra override tabIndex tường minh.                                                         |

### Pass 4 — IA-04

| ID bổ sung     | Nhóm | Vì sao pass đầu bỏ sót                                                                                                                                                                                                                |
| -------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `LOGIN-ACC-01` | NLU  | Nhãn "Username" và "Mật khẩu" nằm ngay trên input nên trông bình thường. DOM: `<label>` không có `for`, `<input>` không có `id` → bấm vào label không focus input.                                                                    |
| `LOGIN-ACC-03` | WPI  | Prompt không nêu ngôn ngữ nội dung. `<html lang="en">` trong khi UI hỗn hợp Việt/Anh → screen reader đọc sai ngữ điệu cho "Mật khẩu", "Quên mật khẩu?".                                                                              |
| `LOGIN-ACC-04` | NLU  | Khối lỗi xuất hiện bằng mắt thường nhưng không có `role="alert"`/`aria-live` → người dùng screen reader có thể không được thông báo khi đăng nhập thất bại.                                                                           |
| `LOGIN-FDB-03` | MBS  | Pass FDB chỉ kiểm thông báo lỗi chung sau một lần fail. Lockout backend có thể trả message khác — cần item riêng cho phản hồi khi tài khoản bị khóa, tránh người dùng thử mãi không hiểu lý do.                                      |

---

## 4. Coverage gate

| Aspect                       | Categories                   | Items  | ≥ 1 item? |
| ---------------------------- | ---------------------------- | ------ | --------- |
| IA-01 — General UI standards | `VIS` 5 + `RES` 4 + `COM` 2 | 11     | ✅        |
| IA-02 — Forms                | `VAL` 4 + `FUN` 4            | 8      | ✅        |
| IA-03 — Navigation           | `NAV` 5                      | 5      | ✅        |
| IA-04 — Feedback / state     | `FDB` 3 + `USB` 2 + `ACC` 4 | 9      | ✅        |
| **Total**                    |                              | **33** | ✅        |

**Kiểm tra cân bằng:** aspect nhỏ nhất (IA-03, 5 item) chiếm 15%; aspect lớn nhất (IA-01, 11 item) chiếm 33%. Phân bố hợp lý cho một màn form đơn giản; IA-04 chiếm 27% nhờ nhóm ACC/FDB quan trọng với auth.

---

## 5. Checklist

> **Đã thực thi** bằng Playwright Chromium (`test-runs/execute-task1.mjs`). Ảnh Failed: `bug-reports/screenshots/`.

### IA-01 — General UI standards

| ID            | Screen | Category      | Checklist Item                                                                                                                                                  | Expected Result                                                                                                                  | Status  | Notes |
| ------------- | ------ | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------- | ----- |
| LOGIN-VIS-01  | Login  | Visual        | Mở `/login` ở 1440×900, quan sát card form trắng trên nền xám                                                                                                 | Card `max-w-md` căn giữa ngang, có viền/bóng nhẹ, padding đều; nền trang `bg-gray-50` đồng nhất với các trang khác             | Passed | Card width≈448px tại x=496 |
| LOGIN-VIS-02  | Login  | Visual        | Đọc nội dung tiêu đề `<h2>` ngay trên form                                                                                                                    | Tiêu đề phản ánh đúng màn hình đăng nhập (ví dụ "Đăng nhập"), **không** hiển thị "Đăng Ký"                                       | Failed | Tiêu đề hiện "Đăng Ký" thay vì Đăng nhập. → BUG-LOGIN-001 |
| LOGIN-VIS-03  | Login  | Visual        | Quan sát ngôn ngữ nhãn trường, nút submit và link phụ trên cùng một form                                                                                       | Ngôn ngữ thống nhất (toàn tiếng Việt hoặc toàn tiếng Anh); không trộn "Username" / "Mật khẩu" / "Sign In" gây khó hiểu         | Failed | Trộn Username / Mật khẩu / Sign In trên cùng form. → BUG-LOGIN-002 |
| LOGIN-VIS-04  | Login  | Visual        | Đọc tiêu đề tab trình duyệt khi đang ở `/login`                                                                                                                 | Tiêu đề tab mô tả màn đăng nhập (ví dụ "Đăng nhập — EShop"), không phải chuỗi mặc định dự án như `frontend-web`                 | Failed | document.title="frontend-web". → BUG-LOGIN-003 |
| LOGIN-VIS-05  | Login  | Visual        | Bật dark mode hệ điều hành (hoặc `prefers-color-scheme: dark`) rồi tải lại `/login`                                                                             | Chữ, nền card và viền input vẫn đọc được rõ; không xuất hiện cặp màu chữ/nền trùng nhau                                         | Passed | App không dark theme riêng; giữ nền rgba(0, 0, 0, 0), chữ h2 rgb(0, 0, 0) — vẫn đọc được trên card trắng. |
| LOGIN-RES-01  | Login  | Responsive    | Mở `/login` ở viewport 1440×900                                                                                                                                 | Form nằm gọn trong viewport, không bị cắt; header/footer hiển thị đầy đủ                                                        | Passed | 1440×900 không cuộn ngang |
| LOGIN-RES-02  | Login  | Responsive    | Mở `/login` ở viewport 768×1024                                                                                                                                 | Card form co giãn hợp lý, các trường và nút full-width vẫn dùng được; không chồng lấn header                                     | Passed | 768×1024 form visible |
| LOGIN-RES-03  | Login  | Responsive    | Mở `/login` ở viewport 390×844 và thử cuộn ngang                                                                                                              | Không xuất hiện thanh cuộn ngang; `scrollWidth` của trang bằng `clientWidth`                                                    | Passed | scrollWidth=clientWidth=390 |
| LOGIN-RES-04  | Login  | Responsive    | Ở 1440×900, đặt zoom trình duyệt lên 150% (hoặc viewport tương đương ~960×600)                                                                                  | Toàn bộ form và link "Quên mật khẩu?" vẫn đọc được, không chồng chữ, không cần cuộn ngang                                       | Passed | Zoom tương đương 150% (960×600) |
| LOGIN-COM-01  | Login  | Compatibility | Mở `/login` ở 1440×900 lần lượt trên Chrome và Firefox, so sánh ảnh chụp                                                                                      | Bố cục card, cỡ chữ, màu nút xanh và vị trí các phần tử giống nhau trên hai trình duyệt                                          | Passed | Task 3 2026-08-01: Chromium + Firefox cùng render card/form; ảnh `chrome_LOGIN-COM-01_*` / `firefox_LOGIN-COM-01_*`. |
| LOGIN-COM-02  | Login  | Compatibility | Kiểm tra hiển thị dấu tiếng Việt ở "Mật khẩu", "Quên mật khẩu?", "Đăng ký ngay" trên Chrome và Firefox                                                         | Dấu tiếng Việt hiển thị đúng, không ô vuông, không mất dấu                                                                       | Passed | Chrome + Firefox: dấu tiếng Việt OK. Ảnh `chrome_LOGIN-COM-02_*` / `firefox_LOGIN-COM-02_*`. |

### IA-02 — Forms

| ID            | Screen | Category   | Checklist Item                                                                                                      | Expected Result                                                                                                       | Status  | Notes |
| ------------- | ------ | ---------- | ------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ------- | ----- |
| LOGIN-VAL-01  | Login  | Validation | Bỏ trống trường Username rồi bấm "Sign In"                                                                         | Trình duyệt chặn submit và báo bắt buộc nhập (HTML5 `required`); không gọi API                                        | Passed | Bỏ trống username (email): HTML5 required chặn submit. |
| LOGIN-VAL-02  | Login  | Validation | Bỏ trống trường Mật khẩu rồi bấm "Sign In"                                                                          | Trình duyệt chặn submit và báo bắt buộc nhập; không gọi API                                                          | Passed | Bỏ trống mật khẩu: HTML5 required chặn submit. |
| LOGIN-VAL-03  | Login  | Validation | Nhập email hợp lệ và mật khẩu **sai** (ví dụ `test@eshop.com` / `WrongPass!`) rồi bấm "Sign In"                   | API trả 401; hiện khối lỗi đỏ "Đăng nhập thất bại. Vui lòng kiểm tra lại."; **không** chuyển trang                    | Passed | Hiện lỗi đỏ, không chuyển trang. |
| LOGIN-VAL-04  | Login  | Validation | Lặp lại đăng nhập sai mật khẩu nhiều lần liên tiếp (≥ 3 lần) với cùng tài khoản test                                | Sau ngưỡng lockout backend, hệ thống hiển thị thông báo rõ ràng (tài khoản bị khóa / thử lại sau) — không im lặng fail | Failed | Login.jsx catch() luôn setError chuỗi chung; không hiển thị "Tài khoản đã bị khóa" từ API 403. → BUG-LOGIN-004 |
| LOGIN-FUN-01  | Login  | Functional | Nhập đúng tài khoản seed (`test@eshop.com` / `Test1234!`) rồi bấm "Sign In"                                         | Đăng nhập thành công, điều hướng về `/`; header hiển thị tên người dùng thay cho link "Đăng nhập"                     | Passed | URL=http://localhost:5173/; header có user. |
| LOGIN-FUN-02  | Login  | Functional | Nhập địa chỉ email vào trường label "Username" (không phải username thuần) rồi đăng nhập đúng mật khẩu             | API `POST /api/login` chấp nhận trường email; đăng nhập thành công                                                    | Passed | Email vào field Username đăng nhập thành công. |
| LOGIN-FUN-03  | Login  | Functional | Gõ mật khẩu vào trường "Mật khẩu" và quan sát ký tự hiển thị                                                       | Ký tự mật khẩu được che (bullet/dot) như `type="password"`; **không** hiện plaintext                                  | Failed | input mật khẩu type="text" — phải là password. → BUG-LOGIN-005 |
| LOGIN-FUN-04  | Login  | Functional | Bật throttle mạng "Slow 3G", nhập credentials đúng rồi **double-click** nút "Sign In" nhanh                       | Chỉ một request đăng nhập được gửi; nút disabled/loading trong lúc xử lý; không double-submit                         | Failed | Double-click gửi 2 request; nút không có cơ chế disabled mặc định. → BUG-LOGIN-006 |

### IA-03 — Navigation

| ID            | Screen | Category   | Checklist Item                                                                                          | Expected Result                                                                                                      | Status  | Notes |
| ------------- | ------ | ---------- | ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ------- | ----- |
| LOGIN-NAV-01  | Login  | Navigation | Từ `/login`, bấm logo "EShop" ở header                                                                  | Điều hướng về trang Home `/`                                                                                         | Passed | URL=http://localhost:5173/ |
| LOGIN-NAV-02  | Login  | Navigation | Từ `/login`, bấm link "Đăng ký ngay" trong form                                                       | Điều hướng tới `/register` bằng client-side routing, không full reload trang                                         | Passed | URL=http://localhost:5173/register |
| LOGIN-NAV-03  | Login  | Navigation | Dán trực tiếp URL `http://localhost:5173/login` vào tab trình duyệt mới                                | Trang Login tải độc lập, form hiển thị đầy đủ, không cần đi qua trang khác trước                                    | Passed | Deep link /login OK |
| LOGIN-NAV-04  | Login  | Navigation | Từ `/login`, bấm link "Quên mật khẩu?"                                                                  | Điều hướng tới `/forgot-password`; hành vi nhất quán với SPA (ưu tiên client-side routing, không reload bất ngờ)   | Failed | Dùng <a href="/forgot-password"> full document navigation thay vì React Router Link. → BUG-LOGIN-007 |
| LOGIN-NAV-05  | Login  | Navigation | Từ đầu trang `/login`, nhấn Tab liên tục và ghi lại thứ tự focus                                      | Focus đi theo trình tự đọc hợp lý: header links → Username → Mật khẩu → Quên mật khẩu? → Sign In → Đăng ký ngay; không bị `tabIndex` làm nhảy cóc | Failed | Nút Sign In có tabIndex=1 → nhảy cóc khỏi thứ tự tự nhiên. → BUG-LOGIN-008 |

### IA-04 — Feedback / state

| ID            | Screen | Category      | Checklist Item                                                                                                                                  | Expected Result                                                                                                                  | Status  | Notes |
| ------------- | ------ | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------- | ----- |
| LOGIN-FDB-01  | Login  | Feedback      | Nhập sai mật khẩu một lần và quan sát vùng dưới form                                                                                            | Xuất hiện khối lỗi nền đỏ nhạt, chữ đỏ: "Đăng nhập thất bại. Vui lòng kiểm tra lại."                                             | Passed |  |
| LOGIN-FDB-02  | Login  | Feedback      | Bấm "Sign In" với credentials hợp lệ (mạng bình thường) và quan sát nút trong lúc chờ API                                                     | Nút chuyển trạng thái loading/disabled hoặc có spinner; người dùng biết hệ thống đang xử lý                                     | Failed | Không có loading/disabled trên nút Sign In khi chờ API. → BUG-LOGIN-006 |
| LOGIN-FDB-03  | Login  | Feedback      | Sau khi tài khoản bị lockout, thử đăng nhập lại với mật khẩu **đúng**                                                                          | Hiển thị thông báo tài khoản đang bị khóa (hoặc hướng dẫn liên hệ admin), không chỉ lỗi chung "Đăng nhập thất bại"              | Failed | Không phân biệt lockout vs sai mật khẩu trên UI. → BUG-LOGIN-004 |
| LOGIN-USB-01  | Login  | Usability     | Đọc nhãn nút submit chính trên form mà không nhìn các phần tử khác                                                                              | Nhãn mô tả rõ hành động bằng ngôn ngữ người dùng mục tiêu (ví dụ "Đăng nhập"), không dùng "Sign In" lạc lõi trên UI tiếng Việt  | Failed | Nhãn nút="Sign In". → BUG-LOGIN-002 |
| LOGIN-USB-02  | Login  | Usability     | Người dùng mới chưa có tài khoản tìm lối đăng ký từ màn Login                                                                                   | Dòng "Chưa có tài khoản? Đăng ký ngay" dễ thấy ngay dưới nút submit, link hoạt động                                              | Passed |  |
| LOGIN-ACC-01  | Login  | Accessibility | Bấm chuột vào chữ nhãn "Username" và "Mật khẩu"                                                                                                | Con trỏ nhảy vào đúng ô input tương ứng (label liên kết qua `htmlFor`/`id`)                                                    | Failed | Labels không có for: [{"text":"Username","htmlFor":null},{"text":"Mật khẩu","htmlFor":null}]. → BUG-LOGIN-009 |
| LOGIN-ACC-02  | Login  | Accessibility | Dùng Tab đưa focus lần lượt vào ô Username, ô Mật khẩu và nút "Sign In"                                                                       | Mỗi phần tử focus có viền/vòng focus nhìn thấy rõ trên nền trắng                                                                | Passed | Focus input: outline=auto, boxShadow=none (browser default). |
| LOGIN-ACC-03  | Login  | Accessibility | Kiểm tra thuộc tính `lang` của thẻ `<html>` khi đang ở `/login`                                                                                 | `lang` khớp ngôn ngữ chính của nội dung (ví dụ `vi` nếu UI tiếng Việt)                                                         | Failed | html lang="en" trong khi UI tiếng Việt. → BUG-LOGIN-010 |
| LOGIN-ACC-04  | Login  | Accessibility | Sau khi đăng nhập thất bại, kiểm tra DOM khối lỗi (hoặc bật screen reader)                                                                      | Thông báo lỗi có `role="alert"` hoặc nằm trong vùng `aria-live` để screen reader đọc ngay khi xuất hiện                        | Failed | Khối lỗi không có role=alert/aria-live: {"role":null,"live":null,"tag":"DIV"}. → BUG-LOGIN-011 |
