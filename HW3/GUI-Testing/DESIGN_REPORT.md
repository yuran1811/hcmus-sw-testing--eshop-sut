# Báo cáo Thiết kế Checklist Kiểm thử GUI — Quên Mật Khẩu + Quản lý Đơn hàng (Admin)

## Phạm vi

| Trường | Giá trị |
| --- | --- |
| Màn hình chính | Quên Mật Khẩu (`/forgot-password`) — frontend-web |
| Màn hình phụ | Quản lý Đơn hàng Admin (tab `/admin/orders`) — frontend-admin |
| Kích thước màn hình | Desktop 1536 × 864 |
| URL SUT (web) | `http://localhost:5173` |
| URL SUT (admin) | `http://localhost:5174` |
| Tài khoản thử nghiệm | Admin: `admin@eshop.com` / `Admin123!` · User: `test@eshop.com` / `Test1234!` |
| Nguồn đặc tả | README.md — FR-01, FR-03, FR-10, FR-18, FR-21, FR-22, FR-23, FR-24, SEC-04 |

---

## Bảng kê thành phần (Component Inventory)

### Quên Mật Khẩu (`/forgot-password`)

| Thành phần | Trạng thái | IA |
| --- | --- | --- |
| Tiêu đề trang (`<h2>`) | Tĩnh | IA-01 |
| Ô nhập Email + nhãn | Mặc định, đang focus, không hợp lệ, đã gửi | IA-01, IA-02 |
| Nút "Lấy mã OTP" | Mặc định, hover, đang gửi | IA-01, IA-02 |
| Chỉ báo bước (Step Indicator) | Bước 1, Bước 2 (yêu cầu theo FR-22) | IA-02, IA-04 |
| Banner hiển thị OTP (xanh lá) | Ẩn (bước 1), hiện (bước 2) | IA-04 |
| Ô nhập OTP + nhãn | Mặc định, đang focus, không hợp lệ | IA-02 |
| Ô nhập mật khẩu mới + nhãn | Mặc định, đang focus, không hợp lệ | IA-02 |
| Ô xác nhận mật khẩu (thiếu) | Yêu cầu theo FR-03 nhưng không có | IA-02 |
| Nút "Đặt lại mật khẩu" | Mặc định, hover | IA-01, IA-02 |
| Nút "← Quay lại" | Mặc định, hover | IA-03 |
| Link "Quay lại đăng nhập" (yêu cầu) | Yêu cầu theo FR-03 | IA-03 |
| Hộp thoại cảnh báo (`window.alert`) | Lỗi, thành công | IA-04 |
| Thanh điều hướng Header | Highlight trang hiện tại, nhãn đăng xuất | IA-01, IA-03 |
| Footer | Tĩnh | IA-01 |
| Tiêu đề tab trình duyệt / favicon | Chrome trình duyệt | IA-01 |

### Quản lý Đơn hàng Admin (tab `/admin/orders`)

| Thành phần | Trạng thái | IA |
| --- | --- | --- |
| Thanh điều hướng bên (Sidebar) | Tab đang chọn được highlight, hover | IA-03 |
| Tiêu đề "EShop Admin" (`<h1>`) | Tĩnh | IA-01 |
| Tiêu đề phần "Quản lý Đơn hàng" | Tĩnh | IA-01 |
| Bảng đơn hàng | Có dữ liệu, trống (0 đơn), đang tải | IA-01, IA-04 |
| Các cột: ID, Người đặt, Tổng tiền, Địa chỉ, Trạng thái, Hành động | Hiển thị theo dòng | IA-01 |
| Badge trạng thái (mỗi dòng) | pending/confirmed/shipping/delivered/canceled | IA-01, IA-04 |
| Nút hành động: Xác nhận, Giao hàng, Hoàn thành, Hủy | Hiển thị có điều kiện theo trạng thái | IA-01, IA-04 |
| Nút "Đánh dấu Đã giao" trên đơn đã hủy | Chuyển trạng thái không hợp lệ (lỗi) | IA-04 |
| Ô địa chỉ giao hàng (`dangerouslySetInnerHTML`) | Dễ bị XSS | IA-01, IA-04 |
| Mục "Đăng xuất" trên sidebar | Tĩnh | IA-03 |
| Chỉ báo đang tải (thiếu) | Yêu cầu khi đang lấy dữ liệu | IA-04 |
| Trạng thái trống (thiếu) | Yêu cầu khi 0 đơn hàng | IA-04 |
| Hộp thoại cảnh báo lỗi | Phản hồi lỗi API | IA-04 |

---

## Phương pháp xây dựng Checklist

| Phương pháp | Cách áp dụng |
| --- | --- |
| Dựa trên yêu cầu (Requirement-based) | FR-03 (quy trình quên mật khẩu 2 bước), FR-10 (máy trạng thái đơn hàng), FR-18 (quản lý đơn hàng admin), FR-21 (giao diện chung), FR-22 (biểu mẫu), FR-23 (điều hướng), FR-24 (phản hồi/trạng thái) |
| Dựa trên thành phần (Component-based) | Ô nhập liệu, nút, bảng, badge, thanh điều hướng, sidebar, tiêu đề, nhãn, banner |
| Dựa trên trạng thái (State-based) | Bước 1 vs Bước 2, đang tải, trống, lỗi, thành công, vô hiệu, hiển thị nút theo trạng thái |
| Dựa trên heuristic (Heuristic-based) | Nguyên tắc Nielsen: nhất quán, ngăn ngừa lỗi, hiển thị trạng thái hệ thống, tương thích giữa hệ thống và thực tế |
| Dựa trên rủi ro (Risk-based) | Bảo mật mật khẩu (lỗi regex), XSS qua `dangerouslySetInnerHTML`, chuyển trạng thái không hợp lệ trên đơn đã hủy |
| Dựa trên kinh nghiệm (Experience-based) | Thiếu `type="email"`, thiếu xác nhận mật khẩu, thiếu dấu `*` bắt buộc, số chữ số OTP không khớp |

---

## Ma trận phủ (Coverage Matrix)

| IA | Số lượng | Danh sách ID |
| --- | --- | --- |
| IA-01 | 12 | GUI-FORGOT-IA01-01 … 07, GUI-ORDERS-IA01-01 … 05 |
| IA-02 | 12 | GUI-FORGOT-IA02-01 … 10, GUI-ORDERS-IA02-01 … 02 |
| IA-03 | 9 | GUI-FORGOT-IA03-01 … 05, GUI-ORDERS-IA03-01 … 04 |
| IA-04 | 12 | GUI-FORGOT-IA04-01 … 05, GUI-ORDERS-IA04-01 … 07 |
| **Tổng** | **45** | |

---

## Truy vết (Traceability)

| Checklist ID | FR / IA | Phương pháp |
| --- | --- | --- |
| GUI-FORGOT-IA01-01 | FR-21 | Yêu cầu |
| GUI-FORGOT-IA01-02 | FR-21 | Yêu cầu |
| GUI-FORGOT-IA01-03 | FR-21 | Yêu cầu + Heuristic |
| GUI-FORGOT-IA01-04 | FR-21 | Yêu cầu |
| GUI-FORGOT-IA01-05 | FR-21 | Thành phần |
| GUI-FORGOT-IA01-06 | FR-21 | Heuristic (a11y) |
| GUI-FORGOT-IA01-07 | FR-21 | Heuristic (a11y) |
| GUI-FORGOT-IA02-01 | FR-22, FR-02 | Yêu cầu |
| GUI-FORGOT-IA02-02 | FR-22 | Yêu cầu |
| GUI-FORGOT-IA02-03 | FR-22 | Yêu cầu |
| GUI-FORGOT-IA02-04 | FR-03, FR-22 | Yêu cầu |
| GUI-FORGOT-IA02-05 | FR-03 | Yêu cầu |
| GUI-FORGOT-IA02-06 | FR-03, FR-22 | Yêu cầu |
| GUI-FORGOT-IA02-07 | FR-22 | Yêu cầu |
| GUI-FORGOT-IA02-08 | FR-03 | Yêu cầu |
| GUI-FORGOT-IA02-09 | FR-22 | Heuristic |
| GUI-FORGOT-IA02-10 | FR-03, FR-01 | Yêu cầu |
| GUI-FORGOT-IA03-01 | FR-23 | Yêu cầu |
| GUI-FORGOT-IA03-02 | FR-23 | Yêu cầu |
| GUI-FORGOT-IA03-03 | FR-03 | Yêu cầu |
| GUI-FORGOT-IA03-04 | FR-03 | Yêu cầu |
| GUI-FORGOT-IA03-05 | FR-23 | Thành phần |
| GUI-FORGOT-IA04-01 | FR-24, FR-03 | Yêu cầu |
| GUI-FORGOT-IA04-02 | FR-24, FR-03 | Trạng thái |
| GUI-FORGOT-IA04-03 | FR-03 | Trạng thái |
| GUI-FORGOT-IA04-04 | FR-24 | Heuristic |
| GUI-FORGOT-IA04-05 | FR-24, FR-03 | Rủi ro |
| GUI-ORDERS-IA01-01 | FR-21 | Yêu cầu |
| GUI-ORDERS-IA01-02 | FR-21 | Yêu cầu |
| GUI-ORDERS-IA01-03 | FR-21 | Yêu cầu |
| GUI-ORDERS-IA01-04 | FR-21 | Heuristic (a11y) |
| GUI-ORDERS-IA01-05 | FR-18, SEC-04 | Rủi ro |
| GUI-ORDERS-IA02-01 | FR-22 | Heuristic |
| GUI-ORDERS-IA02-02 | FR-10, FR-22 | Trạng thái |
| GUI-ORDERS-IA03-01 | FR-23 | Yêu cầu |
| GUI-ORDERS-IA03-02 | FR-23 | Yêu cầu |
| GUI-ORDERS-IA03-03 | FR-23 | Heuristic |
| GUI-ORDERS-IA03-04 | FR-23 | Thành phần |
| GUI-ORDERS-IA04-01 | FR-24 | Trạng thái |
| GUI-ORDERS-IA04-02 | FR-24 | Trạng thái |
| GUI-ORDERS-IA04-03 | FR-24, FR-11 | Yêu cầu |
| GUI-ORDERS-IA04-04 | FR-10, FR-24 | Yêu cầu + Rủi ro |
| GUI-ORDERS-IA04-05 | FR-10 | Yêu cầu |
| GUI-ORDERS-IA04-06 | FR-24 | Heuristic |
| GUI-ORDERS-IA04-07 | FR-24 | Heuristic |

---

## Ghi chú mơ hồ (Ambiguity Notes)

| Phát biểu | Cách hiểu có thể | Giả định đã chọn |
| --- | --- | --- |
| FR-22: "Thông báo lỗi phải xuất hiện **trên** nút submit" | Có thể là thông báo inline phía trên nút, hoặc banner phía trên form | Hiểu là: thông báo lỗi phải xuất hiện ở vị trí phía trên nút submit trên giao diện, không phải phía dưới |
| FR-03: "hiển thị trực tiếp trên màn hình" (OTP ở chế độ demo) | Có thể là toast, alert, hoặc banner inline | Chấp nhận mọi hình thức hiển thị trên màn hình; kiểm tra rằng không cần mở email ở chế độ demo |
| FR-21: "Mỗi trang có đúng 1 thẻ `<h1>`" | Với admin SPA, 1 `<h1>` cho toàn bộ DOM hay 1 cho view đang hiển thị? | Hiểu là: đúng 1 `<h1>` hiển thị trong view/tab hiện tại tại bất kỳ thời điểm nào |
| FR-10: "canceled" là trạng thái kết thúc | "Kết thúc" có nghĩa là UI phải ẩn nút hành động, hay chỉ backend từ chối? | Cả hai: UI không được hiển thị nút chuyển trạng thái VÀ backend phải từ chối; checklist GUI chỉ kiểm tra phía UI |
| FR-03: OTP "6 chữ số" vs nhãn "4 số" | Đặc tả nói 6, nhãn giao diện nói 4 — cái nào đúng? | Đặc tả là chuẩn; nhãn "4 số" trên giao diện là lỗi |
