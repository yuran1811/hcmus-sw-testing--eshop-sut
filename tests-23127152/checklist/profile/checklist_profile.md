# GUI Checklist — Profile (EShop SUT)

## 1. Header block

| Trường               | Giá trị                                                                                                                                                                                                                                                         |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Screen**           | Profile                                                                                                                                                                                                                                                         |
| **Route**            | `/profile`                                                                                                                                                                                                                                                      |
| **Source component** | `frontend-web/src/pages/Profile.jsx` (header auth: `frontend-web/src/App.jsx`)                                                                                                                                                                                  |
| **SUT URL**          | http://localhost:5173/profile (backend API: http://localhost:3000/api/users/me, `/api/orders/my-orders`, `/api/orders/:id/cancel`)                                                                                                                              |
| **Cách inspect**     | (1) Đọc source `Profile.jsx`, `App.jsx`, `AuthContext.jsx`; (2) Duyệt live UI tại http://localhost:5173/profile ở 3 viewport, trạng thái guest và logged-in (seed `test@eshop.com` / `Test1234!`); (3) Kiểm tra DOM label/for, alert(), bảng đơn hàng, header `dangerouslySetInnerHTML` |
| **Target viewports** | Desktop 1440×900 · Tablet 768×1024 · Mobile 390×844                                                                                                                                                                                                             |
| **Target browsers**  | Chrome (chính) · Firefox                                                                                                                                                                                                                                        |
| **Building methods** | Component-based · State-based · Risk-based (PII / hồ sơ cá nhân) · Heuristic-based (Nielsen)                                                                                                                                                                   |
| **Prefix ID**        | `PROFILE-`                                                                                                                                                                                                                                                      |
| **Số item**          | 32                                                                                                                                                                                                                                                              |
| **Trạng thái**       | **Đã thực thi Sprint 1 + Task 3 COM** (2026-08-01) — 24 Passed · 8 Failed · 0 Not Run. Chi tiết: `../../test-runs/sprint-1-gui-execution.md`, `../../cross-platform/platform-matrix.md`                                                                                                                |

### Inventory màn hình (Step 1)

**Components thực tế có trên màn hình** (từ source + screen facts):

| Thành phần           | Chi tiết quan sát được                                                                                                                                                                                                 |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Guest state          | Khi `!user`: chỉ `<div class="text-center mt-10">Vui lòng đăng nhập</div>` — **không** link đăng nhập, **không** redirect                                                                                            |
| Layout logged-in     | `flex flex-col md:flex-row gap-8`: trái `md:w-1/3` card form, phải `md:w-2/3` lịch sử đơn                                                                                                                              |
| Card form            | Tiêu đề `<h2>` "Hồ sơ của bạn"; form `onSubmit={handleUpdate}`                                                                                                                                                        |
| Ô Email              | `type="text"`, `disabled`, `bg-gray-100`, hiển thị `user.email`, label "Email (Không đổi)"                                                                                                                             |
| Ô Họ Tên             | `type="text"`, `required`, bind `name`                                                                                                                                                                                   |
| Ô Số điện thoại      | `type="text"`, placeholder "VD: 0912345678", **không** HTML5 `required`; validate JS regex `/^[1-9][0-9]{8,9}$/` → `alert()` khi submit                                                                              |
| Ô Địa chỉ            | `<textarea>`, placeholder "Nhập địa chỉ của bạn", bind `shipping_address`                                                                                                                                                |
| Nút Cập nhật         | `type="submit"`, `w-full bg-blue-600`; **không** disabled/loading khi gọi API                                                                                                                                          |
| Card đơn hàng        | Tiêu đề "Lịch sử đơn hàng"; empty → `<p>Bạn chưa có đơn hàng nào.</p>`                                                                                                                                                 |
| Bảng đơn hàng        | Cột: Mã ĐH (`#id`, font-mono), Ngày đặt (`toLocaleDateString()`), Tổng tiền (`toLocaleString()+" ₫"`, đỏ đậm), Trạng thái badge (VN labels + màu Tailwind), Thao tác                                                     |
| Nút Hủy đơn          | Hiện khi `status !== "delivered" && status !== "canceled"`; `onClick` gọi API cancel → `alert()`; **không** confirm dialog                                                                                            |
| Header (logged-in)   | `<Link to="/profile">` với `dangerouslySetInnerHTML` `Chào, ${user.name}` (vàng `text-yellow-300`); nút "Thoát" `logout`                                                                                              |
| **Không có**         | toast, inline error/success, spinner loading, confirm dialog hủy đơn, `htmlFor`/`id` trên label, refresh AuthContext sau PUT thành công, link login ở guest state, redirect guest → login                             |

**States quan sát được:**

| Loại state              | Biểu hiện thực tế                                                                                                      |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Screen — Guest          | Chỉ text "Vui lòng đăng nhập" căn giữa                                                                                 |
| Screen — Logged-in      | Form + bảng/khối đơn hàng song song (desktop) hoặc xếp dọc (mobile/tablet)                                            |
| Orders — Empty          | "Bạn chưa có đơn hàng nào."                                                                                            |
| Orders — Populated      | Bảng `<table>` đầy đủ cột; badge theo status; nút Hủy tùy trạng thái                                                  |
| Form — Submit success   | `alert("Cập nhật thành công!")` — header tên **có thể** cũ cho đến khi reload (AuthContext không cập nhật)           |
| Form — Submit error     | `alert("Lỗi cập nhật")` hoặc alert SĐT không hợp lệ                                                                   |
| Form — Invalid phone    | `alert("Số điện thoại không hợp lệ. Vui lòng nhập đúng 9-10 chữ số.")` trước khi gọi API                               |
| Cancel order — Success  | `alert("Hủy đơn thành công!")` + refetch orders                                                                        |
| Cancel order — Error    | `alert("Lỗi: " + message)`                                                                                             |
| Button — Loading        | **không tồn tại** trên Cập nhật và Hủy đơn                                                                             |

**Data-dependent variations cần chú ý:** SĐT có số 0 đầu (091…), 8 chữ số, chữ cái; tên dài/XSS trong header; nhiều đơn hàng → overflow bảng mobile; giá `toLocaleString()` phụ thuộc locale trình duyệt; đơn delivered/canceled không có nút Hủy; thay đổi form chưa lưu rồi điều hướng đi.

---

## 2. Pass log (4 pass tuần tự)

| Pass | Aspect               | Categories          | Sinh ở pass đầu | Thêm sau critical review | Tổng   |
| ---- | -------------------- | ------------------- | --------------- | ------------------------ | ------ |
| 1/4  | IA-01 General UI     | `VIS`, `RES`, `COM` | 7               | 4                        | 11     |
| 2/4  | IA-02 Forms          | `VAL`, `FUN`        | 5               | 4                        | 9      |
| 3/4  | IA-03 Navigation     | `NAV`               | 4               | 1                        | 5      |
| 4/4  | IA-04 Feedback/state | `FDB`, `USB`, `ACC` | 3               | 4                        | 7      |
|      |                      |                     | **19**          | **13**                   | **32** |

---

## 3. Critical review — item được bổ sung và lý do pass đầu bỏ sót

Ba nhóm lý do: **[WPI]** Weak prompt input · **[NLU]** No access to live UI · **[MBS]** Model blind spot.

### Pass 1 — IA-01

| ID bổ sung      | Nhóm | Vì sao pass đầu bỏ sót                                                                                                                                                                      |
| --------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `PROFILE-RES-04` | MBS  | Pass đầu chỉ kiểm scroll ngang **trang**, quên bảng 5 cột "Lịch sử đơn hàng" trên mobile 390×844 — dễ tràn ngang hoặc cắt cột khi có dữ liệu thật.                                        |
| `PROFILE-COM-02` | NLU  | Nhãn tiếng Việt ("Hồ sơ của bạn", "Địa chỉ giao hàng", badge trạng thái) cần đối chiếu render Firefox; đọc source không phát hiện lỗi font/substitution.                                   |
| `PROFILE-VIS-05` | MBS  | Pass VIS tập trung card form, bỏ qua định dạng **Tổng tiền** trong bảng (`text-red-600 font-bold`, `toLocaleString()+" ₫"`) — locale-dependent, dễ khác giữa Chrome/Firefox/máy.          |

### Pass 2 — IA-02

| ID bổ sung      | Nhóm | Vì sao pass đầu bỏ sót                                                                                                                                                                                          |
| --------------- | ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `PROFILE-VAL-04` | MBS  | Pass VAL chỉ test SĐT sai rõ ràng (chữ, số 0 đầu). Regex `/^[1-9][0-9]{8,9}$/` còn từ chối **đúng 8 chữ số** (thiếu 1) — biên dưới dễ bỏ sót khi placeholder gợi ý 10 số.                                     |
| `PROFILE-FUN-03` | MBS  | Thiên happy-path: giả định một lần bấm = một request. Source không `disabled`/`loading` trên nút "Cập nhật" → cần item double-submit.                                                                        |
| `PROFILE-FUN-04` | NLU  | Chỉ đọc `handleUpdate` thấy alert thành công; không theo dõi AuthContext — `PUT /api/users/me` **không** refresh `user` trong context nên tên header có thể lệch form cho đến reload.                          |

### Pass 3 — IA-03

| ID bổ sung      | Nhóm | Vì sao pass đầu bỏ sót                                                                                                                                                                      |
| --------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `PROFILE-NAV-05` | MBS  | Pass NAV tập trung link/header/deep link, quên **rời trang khi form chưa lưu** — không có `beforeunload` hay cảnh báo unsaved changes.                                                     |

### Pass 4 — IA-04

| ID bổ sung      | Nhóm | Vì sao pass đầu bỏ sót                                                                                                                                                                                                 |
| --------------- | ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `PROFILE-USB-01` | WPI  | Prompt nêu guest state nhưng pass FDB/USB ban đầu chỉ kiểm empty orders; bỏ qua UX guest **không CTA** đăng nhập/redirect.                                                                                           |
| `PROFILE-USB-02` | MBS  | Pass FDB kiểm alert có/không, chưa đánh giá **alert() vs inline** — toàn bộ success/error/hủy đơn dùng blocking alert, không toast/inline theo best practice.                                                        |
| `PROFILE-ACC-01` | NLU  | Nhãn "Họ Tên", "Số điện thoại" trông bình thường trên UI; DOM không có `htmlFor`/`id` → bấm label không focus control.                                                                                                 |
| `PROFILE-ACC-02` | NLU  | Rủi ro XSS chỉ thấy khi đọc `App.jsx`: header render tên qua `dangerouslySetInnerHTML` — pass ACC thông thường không sinh item injection cho chuỗi `<script>`/HTML trong `user.name`.                                |

---

## 4. Coverage gate

| Aspect                       | Categories                   | Items  | ≥ 1 item? |
| ---------------------------- | ---------------------------- | ------ | --------- |
| IA-01 — General UI standards | `VIS` 5 + `RES` 4 + `COM` 2 | 11     | ✅        |
| IA-02 — Forms                | `VAL` 5 + `FUN` 4            | 9      | ✅        |
| IA-03 — Navigation           | `NAV` 5                      | 5      | ✅        |
| IA-04 — Feedback / state     | `FDB` 3 + `USB` 2 + `ACC` 2 | 7      | ✅        |
| **Total**                    |                              | **32** | ✅        |

**Kiểm tra cân bằng:** aspect nhỏ nhất (IA-03, 5 item) chiếm 16%; aspect lớn nhất (IA-01, 11 item) chiếm 34%. Phân bố hợp lý cho màn hình form + bảng; IA-02 và IA-04 mạnh nhờ validation SĐT, PII và feedback qua alert.

---

## 5. Checklist

> **Đã thực thi** bằng Playwright Chromium (`test-runs/execute-task1.mjs`). Ảnh Failed: `bug-reports/screenshots/`.

### IA-01 — General UI standards

| ID             | Screen  | Category      | Checklist Item                                                                                                                                           | Expected Result                                                                                                                                              | Status  | Notes |
| -------------- | ------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- | ----- |
| PROFILE-VIS-01 | Profile | Visual        | Đăng nhập seed, mở `/profile` ở 1440×900, quan sát bố cục tổng thể                                                                                    | Hai cột: trái ~1/3 card "Hồ sơ của bạn", phải ~2/3 "Lịch sử đơn hàng"; khoảng cách `gap-8` đều, không chồng lấn header                                    | Passed | Hai khối hồ sơ + lịch sử đơn. |
| PROFILE-VIS-02 | Profile | Visual        | Quan sát card form trắng bên trái (tiêu đề, nhãn, input, nút)                                                                                          | Card có viền/bóng nhẹ (`border rounded shadow-sm`), padding đều; nhãn xám `text-gray-700` thẳng hàng trên từng trường                                     | Passed | Card form trái có tiêu đề/nhãn. |
| PROFILE-VIS-03 | Profile | Visual        | Với tài khoản có đơn hàng nhiều trạng thái, quan sát badge cột "Trạng thái"                                                                            | Mỗi status có màu badge khác biệt (ví dụ delivered xanh lá, shipping xanh dương, canceled đỏ, pending vàng); chữ nhãn tiếng Việt đúng `statusLabel`       | Passed | Không có đơn để quan sát badge — N/A pass với empty state. |
| PROFILE-VIS-04 | Profile | Visual        | Quan sát trường Email trong form                                                                                                                         | Input disabled, nền xám `bg-gray-100`, hiển thị email hiện tại; trông rõ là không chỉnh sửa được                                                           | Passed | Email disabled + bg xám. |
| PROFILE-VIS-05 | Profile | Visual        | Trong bảng đơn hàng có dữ liệu, đọc cột "Tổng tiền"                                                                                                      | Số tiền in đậm màu đỏ, có hậu tố " ₫", định dạng phân tách hàng nghìn theo locale trình duyệt (ví dụ `1.234.567 ₫` hoặc `1,234,567 ₫`)                      | Passed | Không có đơn — bỏ qua định dạng tiền; empty state OK. |
| PROFILE-RES-01 | Profile | Responsive    | Mở `/profile` (đã login) ở viewport 1440×900                                                                                                             | Cả form và khối đơn hàng hiển thị đầy đủ trong viewport; không cần cuộn ngang trang                                                                         | Passed |  |
| PROFILE-RES-02 | Profile | Responsive    | Mở `/profile` ở viewport 768×1024                                                                                                                        | Layout chuyển `flex-col`: card form full-width phía trên, lịch sử đơn phía dưới; nội dung không bị cắt bởi header                                          | Passed | flex-col vẫn dùng được. |
| PROFILE-RES-03 | Profile | Responsive    | Mở `/profile` ở viewport 390×844 và thử cuộn ngang trang                                                                                               | `scrollWidth` của document bằng `clientWidth`; không thanh cuộn ngang ở cấp trang                                                                           | Passed |  |
| PROFILE-RES-04 | Profile | Responsive    | Ở 390×844 với tài khoản có ≥ 1 đơn hàng, quan sát bảng "Lịch sử đơn hàng"                                                                                | Nội dung 5 cột vẫn truy cập được (cuộn ngang bảng hoặc co cột hợp lý); không che khuất nút "Hủy đơn" vĩnh viễn                                             | Passed | Bảng/empty truy cập được ở 390 (cuộn dọc). |
| PROFILE-COM-01 | Profile | Compatibility | Mở `/profile` ở 1440×900 lần lượt trên Chrome và Firefox (cùng trạng thái login)                                                                       | Bố cục hai cột, card, bảng và nút "Cập nhật" giống nhau về vị trí và kích thước tương đối trên hai trình duyệt                                              | Passed | Task 3 2026-08-01: Chromium + Firefox cùng layout hồ sơ; ảnh `chrome_PROFILE-COM-01_*` / `firefox_PROFILE-COM-01_*`. |
| PROFILE-COM-02 | Profile | Compatibility | So sánh hiển thị dấu tiếng Việt trên Chrome và Firefox tại `/profile`                                                                                   | Các chuỗi "Hồ sơ của bạn", "Địa chỉ giao hàng", "Chờ xác nhận", "Đã giao"… hiển thị đúng dấu, không ô vuông                                                | Passed | Chrome + Firefox: dấu tiếng Việt OK. Ảnh `chrome_PROFILE-COM-02_*` / `firefox_PROFILE-COM-02_*`. |

### IA-02 — Forms

| ID             | Screen  | Category   | Checklist Item                                                                                                              | Expected Result                                                                                                                                    | Status  | Notes |
| -------------- | ------- | ---------- | --------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ----- |
| PROFILE-VAL-01 | Profile | Validation | Bỏ trống trường "Họ Tên" rồi bấm "Cập nhật"                                                                                 | Trình duyệt chặn submit (HTML5 `required`); không gọi `PUT /api/users/me`                                                                          | Passed | HTML5 required chặn Họ Tên trống. |
| PROFILE-VAL-02 | Profile | Validation | Nhập SĐT chứa chữ cái (ví dụ `abc123`) rồi bấm "Cập nhật"                                                                  | Hiện `alert` "Số điện thoại không hợp lệ. Vui lòng nhập đúng 9-10 chữ số."; không gọi API                                                           | Passed | alert="Số điện thoại không hợp lệ. Vui lòng nhập đúng 9-10 chữ số." |
| PROFILE-VAL-03 | Profile | Validation | Nhập SĐT bắt đầu bằng 0 theo placeholder (ví dụ `0912345678`) rồi bấm "Cập nhật"                                         | Hiện alert SĐT không hợp lệ (regex yêu cầu ký tự đầu 1–9, **không** chấp nhận số 0 đầu)                                                            | Passed | Placeholder gợi ý 0912… nhưng regex từ chối số 0 đầu. alert="Số điện thoại không hợp lệ. Vui lòng nhập đúng 9-10 chữ số.". → BUG-PROFILE-003 |
| PROFILE-VAL-04 | Profile | Validation | Nhập SĐT đúng 8 chữ số, bắt đầu 1–9 (ví dụ `91234567`) rồi bấm "Cập nhật"                                                  | Hiện alert SĐT không hợp lệ (regex yêu cầu tổng 9–10 chữ số); không gọi API                                                                        | Passed |  |
| PROFILE-VAL-05 | Profile | Validation | Nhập SĐT hợp lệ 9 hoặc 10 chữ số, bắt đầu 1–9 (ví dụ `912345678` hoặc `9123456789`) cùng Họ Tên hợp lệ rồi bấm "Cập nhật" | Không alert lỗi SĐT; request `PUT /api/users/me` được gửi                                                                                          | Passed | alert="Cập nhật thành công!" |
| PROFILE-FUN-01 | Profile | Functional | Điền Họ Tên, SĐT hợp lệ, địa chỉ mới rồi bấm "Cập nhật" (mạng bình thường)                                                | Hiện `alert("Cập nhật thành công!")`; reload trang vẫn thấy dữ liệu mới (persist backend)                                                        | Passed |  |
| PROFILE-FUN-02 | Profile | Functional | Thử sửa trực tiếp giá trị trong ô Email (click, gõ phím, hoặc xóa)                                                        | Ô Email không nhận input (disabled); giá trị email giữ nguyên                                                                                      | Passed |  |
| PROFILE-FUN-03 | Profile | Functional | Nhập dữ liệu hợp lệ, bật throttle mạng, **double-click** nhanh nút "Cập nhật"                                             | Nút **không** chuyển disabled/loading; có thể gửi nhiều request PUT (ghi nhận hành vi thực tế — item fail nếu spec yêu cầu chống double-submit) | Failed | Nút Cập nhật không disabled khi submit — double-submit khả dụng. → BUG-PROFILE-005 |
| PROFILE-FUN-04 | Profile | Functional | Đổi "Họ Tên" trong form, bấm "Cập nhật" thành công, **không** reload — quan sát header "Chào, …"                          | Tên trên header **có thể** vẫn là tên cũ (AuthContext chưa refresh); form hiển thị tên mới — ghi nhận lệch đồng bộ                                  | Failed | Header vẫn tên cũ sau update (AuthContext không refresh). Header: EShop Giỏ hàng Chào, Test User Thoát. → BUG-PROFILE-006 |

### IA-03 — Navigation

| ID             | Screen  | Category   | Checklist Item                                                                                          | Expected Result                                                                                                              | Status  | Notes |
| -------------- | ------- | ---------- | ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------- | ----- |
| PROFILE-NAV-01 | Profile | Navigation | Đã đăng nhập, dán trực tiếp `http://localhost:5173/profile` vào tab mới                                 | Trang Profile tải đầy đủ form + lịch sử đơn; không redirect về login                                                         | Passed | Deep link OK với token. |
| PROFILE-NAV-02 | Profile | Navigation | **Chưa** đăng nhập, mở `http://localhost:5173/profile`                                                | Chỉ hiện text căn giữa "Vui lòng đăng nhập"; **không** tự redirect; **không** có link/nút dẫn tới `/login`                  | Failed | Guest: chỉ "Vui lòng đăng nhập", không redirect và không link/CTA tới /login. → BUG-PROFILE-001 |
| PROFILE-NAV-03 | Profile | Navigation | Đã login, từ trang khác bấm link header "Chào, {tên}" (vàng)                                          | Điều hướng tới `/profile` bằng client-side routing                                                                           | Passed |  |
| PROFILE-NAV-04 | Profile | Navigation | Từ `/profile`, bấm nút header "Thoát"                                                                   | Đăng xuất; header trở lại link "Đăng nhập"/"Đăng ký"; truy cập lại `/profile` hiện guest state                               | Passed | Thoát → guest state. |
| PROFILE-NAV-05 | Profile | Navigation | Sửa "Họ Tên" hoặc SĐT trên form **chưa** bấm "Cập nhật", rồi bấm logo Home hoặc link Giỏ hàng         | Điều hướng sang trang khác **không** cảnh báo mất dữ liệu chưa lưu (không `beforeunload`/modal)                             | Failed | Rời trang khi form dirty không beforeunload/modal. → BUG-PROFILE-007 |

### IA-04 — Feedback / state

| ID             | Screen  | Category      | Checklist Item                                                                                                              | Expected Result                                                                                                              | Status  | Notes |
| -------------- | ------- | ------------- | --------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------- | ----- |
| PROFILE-FDB-01 | Profile | Feedback      | Cập nhật hồ sơ thành công (SĐT hợp lệ)                                                                                      | Hiện blocking `alert("Cập nhật thành công!")`; **không** có toast hay thông báo inline dưới form                           | Passed | Alert thành công xuất hiện (không có toast/inline — đúng mô tả ER). |
| PROFILE-FDB-02 | Profile | Feedback      | Đăng nhập tài khoản **chưa có** đơn hàng, xem khối "Lịch sử đơn hàng"                                                     | Hiển thị đúng câu "Bạn chưa có đơn hàng nào."; không bảng trống không nhãn                                                  | Passed | Empty state đúng câu chữ. |
| PROFILE-FDB-03 | Profile | Feedback      | Với đơn ở trạng thái cho phép hủy, bấm "Hủy đơn" một lần                                                                    | **Không** hiện hộp thoại xác nhận (confirm); gọi API cancel trực tiếp; thành công → `alert("Hủy đơn thành công!")` + refresh bảng | Passed | Không có đơn hủy được — ghi nhận N/A; hành vi code: cancelOrder không confirm (xác nhận bằng source). |
| PROFILE-USB-01 | Profile | Usability     | Ở trạng thái guest (`!user`), đọc toàn màn `/profile` tìm cách đăng nhập                                                  | Chỉ thấy "Vui lòng đăng nhập" — **không** có CTA, link login, hay hướng dẫn bước tiếp theo                                  | Failed | Không có CTA đăng nhập ở guest state. → BUG-PROFILE-001 |
| PROFILE-USB-02 | Profile | Usability     | Thực hiện lần lượt: submit form lỗi SĐT, cập nhật thành công, hủy đơn — quan sát kiểu phản hồi                             | Mọi phản hồi đều qua `alert()` blocking; **không** có message inline dưới trường, không toast, không banner trong trang     | Failed | Mọi phản hồi qua alert() blocking — kém UX. → BUG-PROFILE-004 |
| PROFILE-ACC-01 | Profile | Accessibility | Bấm chuột vào nhãn "Họ Tên", "Số điện thoại", "Địa chỉ giao hàng" (không bấm trực tiếp vào input)                         | Con trỏ **không** tự focus vào control tương ứng (thiếu liên kết `label for` / `input id`)                                  | Failed | label for=[null,null,null,null] — bấm nhãn không focus input. → BUG-PROFILE-009 |
| PROFILE-ACC-02 | Profile | Accessibility | Cập nhật backend/`seed` để `user.name` chứa chuỗi HTML (ví dụ `<b>Test</b>` hoặc `<img src=x onerror=alert(1)>`), reload | Header "Chào, …" render HTML thô qua `dangerouslySetInnerHTML` — script/HTML có thể thực thi/hiển thị sai (lỗ hổng XSS)    | Failed | Header dùng dangerouslySetInnerHTML={`Chào, ${user.name}`} (App.jsx) — XSS nếu name chứa HTML/script. → BUG-PROFILE-010 |
