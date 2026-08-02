# Báo cáo Kiểm thử Cross-Platform (Task 3 - HW3)

## Thông tin cá nhân
- **Họ và tên:** Ân Tiến Nguyên An
- **Mã số sinh viên (MSSV):** 23127148
- **Email:** 23127148@student.hcmus.edu.vn

## Thiết lập môi trường và nền tảng kiểm thử
- **Đường dẫn URL kiểm thử (SUT):**
  - Web khách hàng: `http://localhost:5173`
  - Web Admin: `http://localhost:5174`

- **Danh sách 3 nền tảng kiểm thử (Platform):**
  - **Platform 1:** Google Chrome (Windows 11 - Cục bộ)
  - **Platform 2:** Mozilla Firefox (macOS Sonoma via BrowserStack)
  - **Platform 3:** Safari (macOS Sequoia via BrowserStack)

---

## Bảng Ma trận kết quả (Platform Matrix)

| Checklist ID | Màn hình | Thành phần | Mục kiểm tra | Platform 1 (Chrome/Win) | Platform 2 (Firefox/macOS) | Platform 3 (Safari/macOS) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| GUI-FORGOT-IA01-01 | Quên Mật Khẩu | Tiêu đề trang | Trang có đúng một thẻ `<h1>` mô tả nội dung trang | Not Run | Not Run | Not Run |
| GUI-FORGOT-IA01-02 | Quên Mật Khẩu | Ngôn ngữ giao diện | Tất cả nhãn, nút, và thông báo hiển thị bằng tiếng Việt | Not Run | Not Run | Not Run |
| GUI-FORGOT-IA01-03 | Quên Mật Khẩu | Nút gửi (Bước 1) | Nút "Lấy mã OTP" sử dụng màu xanh dương cho hành động tích cực | Not Run | Not Run | Not Run |
| GUI-FORGOT-IA01-04 | Quên Mật Khẩu | Thứ tự Tab | Phím Tab di chuyển focus từ trên xuống: ô email → nút gửi (Bước 1); ô OTP → ô mật khẩu → nút gửi → nút quay lại (Bước 2) | Not Run | Not Run | Not Run |
| GUI-FORGOT-IA01-05 | Quên Mật Khẩu | Vùng chứa trang | Không xuất hiện thanh cuộn ngang ở kích thước 1536×864 | Not Run | Not Run | Not Run |
| GUI-FORGOT-IA01-06 | Quên Mật Khẩu | Viền focus | Tất cả phần tử tương tác (ô nhập, nút) hiển thị viền focus rõ ràng khi được focus bằng phím Tab | Not Run | Not Run | Not Run |
| GUI-FORGOT-IA01-07 | Quên Mật Khẩu | Tương phản chữ | Chữ nội dung và nhãn có đủ độ tương phản với nền trắng của thẻ | Not Run | Not Run | Not Run |
| GUI-FORGOT-IA02-01 | Quên Mật Khẩu | Ô nhập email | Trường email sử dụng `type="email"` để kích hoạt xác thực HTML5 | Not Run | Not Run | Not Run |
| GUI-FORGOT-IA02-02 | Quên Mật Khẩu | Dấu bắt buộc | Nhãn trường email có ký hiệu `*` để chỉ trường bắt buộc | Not Run | Not Run | Not Run |
| GUI-FORGOT-IA02-03 | Quên Mật Khẩu | Ô nhập mật khẩu | Trường mật khẩu mới sử dụng `type="password"` (ẩn ký tự) | Not Run | Not Run | Not Run |
| GUI-FORGOT-IA02-04 | Quên Mật Khẩu | Chỉ báo bước | Có chỉ báo bước trực quan hiển thị "Bước 1/2" hoặc "Bước 2/2" cho bước hiện tại | Not Run | Not Run | Not Run |
| GUI-FORGOT-IA02-05 | Quên Mật Khẩu | Xác nhận mật khẩu | Bước 2 có trường "Xác nhận mật khẩu mới" phải khớp với mật khẩu mới | Not Run | Not Run | Not Run |
| GUI-FORGOT-IA02-06 | Quên Mật Khẩu | Nhãn OTP | Nhãn ô nhập OTP ghi đúng số chữ số theo đặc tả (6 chữ số) | Not Run | Not Run | Not Run |
| GUI-FORGOT-IA02-07 | Quên Mật Khẩu | Vị trí thông báo lỗi | Thông báo lỗi xác thực xuất hiện phía trên nút submit, không phải phía dưới | Not Run | Not Run | Not Run |
| GUI-FORGOT-IA02-08 | Quên Mật Khẩu | Mật khẩu không khớp | Khi xác nhận mật khẩu không khớp mật khẩu mới, thông báo lỗi rõ ràng được hiển thị | Not Run | Not Run | Not Run |
| GUI-FORGOT-IA02-09 | Quên Mật Khẩu | Liên kết nhãn | Nhấp vào nhãn văn bản sẽ focus vào ô nhập tương ứng | Not Run | Not Run | Not Run |
| GUI-FORGOT-IA02-10 | Quên Mật Khẩu | Độ mạnh mật khẩu | Thông báo lỗi mật khẩu yếu liệt kê đúng yêu cầu: chữ hoa, chữ thường, chữ số, và ký tự đặc biệt (`@$!%*?&`) | Not Run | Not Run | Not Run |
| GUI-FORGOT-IA03-01 | Quên Mật Khẩu | Highlight thanh điều hướng | Thanh điều hướng header không highlight sai mục nào (vì Quên Mật Khẩu không nằm trong menu chính), hoặc highlight đúng nếu có | Not Run | Not Run | Not Run |
| GUI-FORGOT-IA03-02 | Quên Mật Khẩu | Nhãn đăng xuất | Nếu người dùng đã đăng nhập, nút đăng xuất có nhãn "Đăng xuất" (không phải "Thoát") | Not Run | Not Run | Not Run |
| GUI-FORGOT-IA03-03 | Quên Mật Khẩu | Quay lại đăng nhập (Bước 1) | Bước 1 cung cấp link hoặc nút để quay lại trang Đăng nhập | Not Run | Not Run | Not Run |
| GUI-FORGOT-IA03-04 | Quên Mật Khẩu | Nút quay lại (Bước 2) | Nút "← Quay lại" ở Bước 2 đưa người dùng về Bước 1 mà không mất giá trị email đã nhập | Not Run | Not Run | Not Run |
| GUI-FORGOT-IA03-05 | Quên Mật Khẩu | Logo về trang chủ | Nhấn logo "EShop" trên header sẽ điều hướng về trang chủ `/` | Not Run | Not Run | Not Run |
| GUI-FORGOT-IA04-01 | Quên Mật Khẩu | Hiển thị OTP | Sau khi gửi email hợp lệ ở Bước 1, mã OTP được hiển thị trên màn hình (chế độ demo) | Not Run | Not Run | Not Run |
| GUI-FORGOT-IA04-02 | Quên Mật Khẩu | Chuyển bước | Sau khi yêu cầu OTP thành công, giao diện chuyển từ form Bước 1 sang form Bước 2 | Not Run | Not Run | Not Run |
| GUI-FORGOT-IA04-03 | Quên Mật Khẩu | Chuyển hướng thành công | Sau khi đổi mật khẩu thành công, người dùng được chuyển đến trang Đăng nhập kèm thông báo thành công | Not Run | Not Run | Not Run |
| GUI-FORGOT-IA04-04 | Quên Mật Khẩu | Thông báo lỗi | Khi gửi email chưa đăng ký hoặc OTP sai, thông báo lỗi rõ ràng hiển thị trên giao diện (không chỉ dùng `window.alert`) | Not Run | Not Run | Not Run |
| GUI-FORGOT-IA04-05 | Quên Mật Khẩu | Xóa trường mật khẩu | Sau khi đổi mật khẩu thành công, các trường mật khẩu và OTP được xóa sạch hoặc trang chuyển đi | Not Run | Not Run | Not Run |
| GUI-ORDERS-IA01-01 | Quản lý Đơn hàng | Tiêu đề phần | "Quản lý Đơn hàng" hiển thị rõ ràng và không phải `<h1>` trùng lặp (chỉ sidebar `<h1>` tồn tại) | Not Run | Not Run | Not Run |
| GUI-ORDERS-IA01-02 | Quản lý Đơn hàng | Định dạng tiền tệ | Cột tổng tiền hiển thị giá với phân cách hàng nghìn và ký hiệu `₫` | Not Run | Not Run | Not Run |
| GUI-ORDERS-IA01-03 | Quản lý Đơn hàng | Nhãn trạng thái tiếng Việt | Badge trạng thái đơn hàng hiển thị tiếng Việt: "Chờ xác nhận", "Đã xác nhận", "Đang giao", "Đã giao", "Đã hủy" | Not Run | Not Run | Not Run |
| GUI-ORDERS-IA01-04 | Quản lý Đơn hàng | Cấu trúc bảng | Bảng đơn hàng sử dụng đúng cấu trúc `<table>`, `<thead>`, `<tbody>` với ô tiêu đề trong `<th>` | Not Run | Not Run | Not Run |
| GUI-ORDERS-IA01-05 | Quản lý Đơn hàng | Hiển thị địa chỉ giao hàng | Địa chỉ giao hàng hiển thị dưới dạng văn bản thuần đã escape, không render HTML thô | Not Run | Not Run | Not Run |
| GUI-ORDERS-IA02-01 | Quản lý Đơn hàng | Nút hành động là phần tử form | Các nút thay đổi trạng thái là thẻ `<button>` thực sự (không phải `<div>` hoặc `<span>`) để hỗ trợ bàn phím | Not Run | Not Run | Not Run |
| GUI-ORDERS-IA02-02 | Quản lý Đơn hàng | Trạng thái vô hiệu cho đơn kết thúc | Đơn hàng ở trạng thái kết thúc "Đã giao" hoặc "Đã hủy" không hiển thị nút thay đổi trạng thái | Not Run | Not Run | Not Run |
| GUI-ORDERS-IA03-01 | Quản lý Đơn hàng | Tab sidebar đang chọn | Mục "Đơn hàng" trên sidebar được highlight (ví dụ: màu chữ khác) khi tab đơn hàng đang hoạt động | Not Run | Not Run | Not Run |
| GUI-ORDERS-IA03-02 | Quản lý Đơn hàng | Nhãn đăng xuất | Mục đăng xuất trên sidebar có nhãn "Đăng xuất" (không phải "Thoát" hay tiếng Anh "Logout") | Not Run | Not Run | Not Run |
| GUI-ORDERS-IA03-03 | Quản lý Đơn hàng | Chuyển tab | Nhấn bất kỳ mục sidebar nào khác (Dashboard, Danh mục, Sản phẩm, v.v.) sẽ chuyển khỏi trang đơn hàng mà không mất dữ liệu hoặc lỗi | Not Run | Not Run | Not Run |
| GUI-ORDERS-IA03-04 | Quản lý Đơn hàng | Deep link / URL | Tải trực tiếp URL hoặc làm mới trang khi đang ở tab đơn hàng vẫn giữ nguyên giao diện (hoặc hiện form đăng nhập nếu hết phiên) | Not Run | Not Run | Not Run |
| GUI-ORDERS-IA04-01 | Quản lý Đơn hàng | Chỉ báo đang tải | Trong khi đang lấy dữ liệu đơn hàng từ API, hiển thị spinner hoặc skeleton loading | Not Run | Not Run | Not Run |
| GUI-ORDERS-IA04-02 | Quản lý Đơn hàng | Trạng thái trống | Khi không có đơn hàng nào, hiển thị thông báo trạng thái trống (và tùy chọn hình minh họa) thay vì bảng rỗng | Not Run | Not Run | Not Run |
| GUI-ORDERS-IA04-03 | Quản lý Đơn hàng | Phân biệt màu trạng thái | Mỗi badge trạng thái đơn hàng sử dụng màu riêng biệt, phù hợp ngữ nghĩa (ví dụ: đỏ cho đã hủy, xanh lá cho đã giao) | Not Run | Not Run | Not Run |
| GUI-ORDERS-IA04-04 | Quản lý Đơn hàng | Chặn chuyển Đã hủy → Đã giao | Đơn hàng ở trạng thái "Đã hủy" (canceled) KHÔNG hiển thị nút "Đánh dấu Đã giao" — đã hủy là trạng thái kết thúc | Not Run | Not Run | Not Run |
| GUI-ORDERS-IA04-05 | Quản lý Đơn hàng | Xác nhận trước khi chuyển trạng thái | Nhấn nút thay đổi trạng thái (ví dụ: "Hủy", "Hoàn thành") hiển thị hộp thoại xác nhận trước khi thực hiện | Not Run | Not Run | Not Run |
| GUI-ORDERS-IA04-06 | Quản lý Đơn hàng | Phản hồi thành công | Sau khi thay đổi trạng thái thành công, dòng trong bảng cập nhật trạng thái mới mà không cần tải lại trang | Not Run | Not Run | Not Run |
| GUI-ORDERS-IA04-07 | Quản lý Đơn hàng | Phản hồi lỗi | Khi thay đổi trạng thái thất bại (ví dụ: chuyển trạng thái không hợp lệ bị API từ chối), thông báo lỗi rõ ràng được hiển thị | Not Run | Not Run | Not Run |

---

## Nhật ký ảnh chụp bằng chứng (Screenshots Log)

Dưới đây là danh sách các tệp ảnh chụp màn hình tương ứng với từng nền tảng kiểm thử, được lưu tại thư mục `HW3/Task3_CrossPlatform/Evidences/`:

### 1. Platform 1: Google Chrome (Windows 11 - Cục bộ)
- **Quên Mật Khẩu (`/forgot-password`):** `chrome_forgot_password.png`
- **Quản lý Đơn hàng Admin (`/admin/orders`):** `chrome_admin_orders.png`

### 2. Platform 2: Mozilla Firefox (macOS Sonoma via BrowserStack)
- **Quên Mật Khẩu (`/forgot-password`):** `firefox_forgot_password.png`
- **Quản lý Đơn hàng Admin (`/admin/orders`):** `firefox_admin_orders.png`

### 3. Platform 3: Safari (macOS Sequoia via BrowserStack)
- **Quên Mật Khẩu (`/forgot-password`):** `safari_forgot_password.png`
- **Quản lý Đơn hàng Admin (`/admin/orders`):** `safari_admin_orders.png`

---

## Phân loại lỗi Cross-Platform (Cross-Platform Bug Classification)

Bảng phân loại các lỗi phát hiện được trong quá trình kiểm thử chéo nền tảng:

| Mã lỗi (Bug ID) | Tên lỗi / Mô tả | Tác động | Phân loại lỗi | Nền tảng bị lỗi |
| :--- | :--- | :--- | :--- | :--- |
| | | | | |

*Ghi chú về phân loại lỗi:*
- **Cross-platform defect:** Lỗi chỉ xuất hiện trên 1 hoặc 2 nền tảng, không xuất hiện trên tất cả.
- **General defect:** Lỗi xuất hiện trên tất cả các nền tảng (lỗi logic chung của ứng dụng).

---

## Tóm tắt & Đánh giá chung

### 1. Số liệu thống kê kết quả kiểm thử

| Nền tảng (Platform) | Tổng số test cases | Số lượng Pass | Số lượng Fail | Tỷ lệ Pass (%) |
| :--- | :--- | :--- | :--- | :--- |
| **Platform 1 (Chrome/Win)** | 45 | | | |
| **Platform 2 (Firefox/macOS)** | 45 | | | |
| **Platform 3 (Safari/macOS)** | 45 | | | |

### 2. Đánh giá khả năng tương thích chéo (Cross-Platform Compatibility Evaluation)

*Đang chờ kết quả thực thi...*
