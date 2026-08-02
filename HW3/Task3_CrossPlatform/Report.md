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

> [!NOTE]
> Bảng này đã được lọc và rút gọn xuống còn **15 checklist items** tiêu biểu nhạy cảm với việc hiển thị/tương tác chéo trình duyệt (Visual, Responsive, CSS Rendering, Keyboard Accessibility, Browser Native APIs/Dialogs).

| Checklist ID | Màn hình | Thành phần | Mục kiểm tra | Platform 1 (Chrome/Win) | Platform 2 (Firefox/macOS) | Platform 3 (Safari/macOS) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| GUI-FORGOT-IA01-03 | Quên Mật Khẩu | Nút gửi (Bước 1) | Nút "Lấy mã OTP" sử dụng màu xanh dương cho hành động tích cực | Not Run | Not Run | Not Run |
| GUI-FORGOT-IA01-04 | Quên Mật Khẩu | Thứ tự Tab | Phím Tab di chuyển focus từ trên xuống: ô email → nút gửi (Bước 1); ô OTP → ô mật khẩu → nút gửi → nút quay lại (Bước 2) | Not Run | Not Run | Not Run |
| GUI-FORGOT-IA01-05 | Quên Mật Khẩu | Vùng chứa trang | Không xuất hiện thanh cuộn ngang ở kích thước 1536×864 | Not Run | Not Run | Not Run |
| GUI-FORGOT-IA01-06 | Quên Mật Khẩu | Viền focus | Tất cả phần tử tương tác (ô nhập, nút) hiển thị viền focus rõ ràng khi được focus bằng phím Tab | Not Run | Not Run | Not Run |
| GUI-FORGOT-IA01-07 | Quên Mật Khẩu | Tương phản chữ | Chữ nội dung và nhãn có đủ độ tương phản với nền trắng của thẻ | Not Run | Not Run | Not Run |
| GUI-FORGOT-IA02-01 | Quên Mật Khẩu | Ô nhập email | Trường email sử dụng `type="email"` để kích hoạt xác thực HTML5 | Not Run | Not Run | Not Run |
| GUI-FORGOT-IA02-07 | Quên Mật Khẩu | Vị trí thông báo lỗi | Thông báo lỗi xác thực xuất hiện phía trên nút submit, không phải phía dưới | Not Run | Not Run | Not Run |
| GUI-FORGOT-IA02-09 | Quên Mật Khẩu | Liên kết nhãn | Nhấp vào nhãn văn bản sẽ focus vào ô nhập tương ứng | Not Run | Not Run | Not Run |
| GUI-ORDERS-IA01-02 | Quản lý Đơn hàng | Định dạng tiền tệ | Cột tổng tiền hiển thị giá với phân cách hàng nghìn và ký hiệu `₫` | Not Run | Not Run | Not Run |
| GUI-ORDERS-IA01-04 | Quản lý Đơn hàng | Cấu trúc bảng | Bảng đơn hàng sử dụng đúng cấu trúc `<table>`, `<thead>`, `<tbody>` với ô tiêu đề trong `<th>` | Not Run | Not Run | Not Run |
| GUI-ORDERS-IA01-05 | Quản lý Đơn hàng | Hiển thị địa chỉ giao hàng | Địa chỉ giao hàng hiển thị dưới dạng văn bản thuần đã escape, không render HTML thô | Not Run | Not Run | Not Run |
| GUI-ORDERS-IA02-01 | Quản lý Đơn hàng | Nút hành động là phần tử form | Các nút thay đổi trạng thái là thẻ `<button>` thực sự (không phải `<div>` hoặc `<span>`) để hỗ trợ bàn phím | Not Run | Not Run | Not Run |
| GUI-ORDERS-IA04-03 | Quản lý Đơn hàng | Phân biệt màu trạng thái | Mỗi badge trạng thái đơn hàng sử dụng màu riêng biệt, phù hợp ngữ nghĩa (ví dụ: đỏ cho đã hủy, xanh lá cho đã giao) | Not Run | Not Run | Not Run |
| GUI-ORDERS-IA04-05 | Quản lý Đơn hàng | Xác nhận trước khi chuyển trạng thái | Nhấn nút thay đổi trạng thái (ví dụ: "Hủy", "Hoàn thành") hiển thị hộp thoại xác nhận trước khi thực hiện | Not Run | Not Run | Not Run |
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
| **Platform 1 (Chrome/Win)** | 15 | | | |
| **Platform 2 (Firefox/macOS)** | 15 | | | |
| **Platform 3 (Safari/macOS)** | 15 | | | |

### 2. Đánh giá khả năng tương thích chéo (Cross-Platform Compatibility Evaluation)

*Đang chờ kết quả thực thi...*
