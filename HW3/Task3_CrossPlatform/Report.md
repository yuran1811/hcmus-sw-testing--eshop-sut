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

| Checklist ID       | Màn hình         | Thành phần                           | Mục kiểm tra                                                                                                                 | Platform 1 (Chrome/Win) | Platform 2 (Firefox/macOS) | Platform 3 (Safari/macOS) |
| :----------------- | :--------------- | :----------------------------------- | :--------------------------------------------------------------------------------------------------------------------------- | :---------------------- | :------------------------- | :------------------------ |
| GUI-FORGOT-IA01-03 | Quên Mật Khẩu    | Nút gửi (Bước 1)                     | Nút "Lấy mã OTP" sử dụng màu xanh dương cho hành động tích cực                                                               | Pass (Chrome/forgot-password.png) | Pass (Firefox/forgot-password.png) | Pass (Safari/forgot-password.png) |
| GUI-FORGOT-IA01-05 | Quên Mật Khẩu    | Vùng chứa trang                      | Không xuất hiện thanh cuộn ngang ở kích thước 1536×864                                                                       | Pass (Chrome/forgot-password.png) | Pass (Firefox/forgot-password.png) | Pass (Safari/forgot-password.png) |
| GUI-FORGOT-IA01-07 | Quên Mật Khẩu    | Tương phản chữ                       | Chữ nội dung và nhãn có đủ độ tương phản với nền trắng của thẻ                                                               | Pass (Chrome/forgot-password.png) | Pass (Firefox/forgot-password.png) | Pass (Safari/forgot-password.png) |
| GUI-FORGOT-IA02-01 | Quên Mật Khẩu    | Ô nhập email                         | Trường email sử dụng `type="email"` để kích hoạt xác thực HTML5                                                              | Fail (Chrome/forgot-password.png) | Fail (Firefox/forgot-password.png) | Fail (Safari/forgot-password.png) |
| GUI-FORGOT-IA02-07 | Quên Mật Khẩu    | Vị trí thông báo lỗi                 | Thông báo lỗi xác thực xuất hiện phía trên nút submit, không phải phía dưới                                                  | Fail (Chrome/user-not-found.png) | Fail (Firefox/user-not-found.png) | Fail (Safari/user-not-found.png) |
| GUI-FORGOT-IA01-06 | Quên Mật Khẩu    | Viền focus                           | Tất cả phần tử tương tác (ô nhập, nút) hiển thị viền focus rõ ràng khi được focus bằng phím Tab                              | Pass (Chrome/forgot-password-step2.png) | Pass (Firefox/forgot-password-step2.png) | Pass (Safari/forgotpassword-step2.png) |
| GUI-ORDERS-IA01-02 | Quản lý Đơn hàng | Định dạng tiền tệ                    | Cột tổng tiền hiển thị giá với phân cách hàng nghìn và ký hiệu `₫`                                                           | Pass (Chrome/admin-orders.png) | Pass (Firefox/admin-orders.png) | Pass (Safari/admin-orders.png) |
| GUI-ORDERS-IA01-04 | Quản lý Đơn hàng | Cấu trúc bảng                        | Bảng đơn hàng sử dụng đúng cấu trúc `<table>`, `<thead>`, `<tbody>` với ô tiêu đề trong `<th>`                               | Pass (Chrome/admin-orders.png) | Pass (Firefox/admin-orders.png) | Pass (Safari/admin-orders.png) |
| GUI-ORDERS-IA01-05 | Quản lý Đơn hàng | Hiển thị địa chỉ giao hàng           | Địa chỉ giao hàng hiển thị dưới dạng văn bản thuần đã escape, không render HTML thô                                          | Fail (Chrome/admin-orders.png) | Fail (Firefox/admin-orders.png) | Fail (Safari/admin-orders.png) |
| GUI-ORDERS-IA04-03 | Quản lý Đơn hàng | Phân biệt màu trạng thái             | Mỗi badge trạng thái đơn hàng sử dụng màu riêng biệt, phù hợp ngữ nghĩa (ví dụ: đỏ cho đã hủy, xanh lá cho đã giao)          | Pass (Chrome/admin-orders.png) | Pass (Firefox/admin-orders.png) | Pass (Safari/admin-orders.png) |

---

## Nhật ký ảnh chụp bằng chứng (Screenshots Log)

Dưới đây là danh sách các tệp ảnh chụp màn hình tương ứng với từng nền tảng kiểm thử, được lưu tại thư mục `HW3/Task3_CrossPlatform/Evidences/`:

### 1. Platform 1: Google Chrome (Windows 11 - Cục bộ)
- **Quên Mật Khẩu (Bước 1 - Tĩnh):** `Chrome/forgot-password.png` (minh chứng cho `GUI-FORGOT-IA01-03`, `GUI-FORGOT-IA01-05`, `GUI-FORGOT-IA01-07`, `GUI-FORGOT-IA02-01`)
- **Quên Mật Khẩu (Bước 1 - Popup lỗi):** `Chrome/user-not-found.png` (minh chứng cho `GUI-FORGOT-IA02-07`)
- **Quên Mật Khẩu (Bước 2 - Nhập OTP):** `Chrome/forgot-password-step2.png` (minh chứng cho `GUI-FORGOT-IA01-06`)
- **Quản lý Đơn hàng Admin (`/admin/orders`):** `Chrome/admin-orders.png` (minh chứng cho `GUI-ORDERS-IA01-02`, `GUI-ORDERS-IA01-04`, `GUI-ORDERS-IA01-05`, `GUI-ORDERS-IA04-03`)

### 2. Platform 2: Mozilla Firefox (macOS Sonoma via BrowserStack)
- **Quên Mật Khẩu (Bước 1 - Tĩnh):** `Firefox/forgot-password.png` (minh chứng cho `GUI-FORGOT-IA01-03`, `GUI-FORGOT-IA01-05`, `GUI-FORGOT-IA01-07`, `GUI-FORGOT-IA02-01`)
- **Quên Mật Khẩu (Bước 1 - Popup lỗi):** `Firefox/user-not-found.png` (minh chứng cho `GUI-FORGOT-IA02-07`)
- **Quên Mật Khẩu (Bước 2 - Nhập OTP):** `Firefox/forgot-password-step2.png` (minh chứng cho `GUI-FORGOT-IA01-06`)
- **Quản lý Đơn hàng Admin (`/admin/orders`):** `Firefox/admin-orders.png` (minh chứng cho `GUI-ORDERS-IA01-02`, `GUI-ORDERS-IA01-04`, `GUI-ORDERS-IA01-05`, `GUI-ORDERS-IA04-03`)

### 3. Platform 3: Safari (macOS Sequoia via BrowserStack)
- **Quên Mật Khẩu (Bước 1 - Tĩnh):** `Safari/forgot-password.png` (minh chứng cho `GUI-FORGOT-IA01-03`, `GUI-FORGOT-IA01-05`, `GUI-FORGOT-IA01-07`, `GUI-FORGOT-IA02-01`)
- **Quên Mật Khẩu (Bước 1 - Popup lỗi):** `Safari/user-not-found.png` (minh chứng cho `GUI-FORGOT-IA02-07`)
- **Quên Mật Khẩu (Bước 2 - Nhập OTP):** `Safari/forgotpassword-step2.png` (minh chứng cho `GUI-FORGOT-IA01-06`)
- **Quản lý Đơn hàng Admin (`/admin/orders`):** `Safari/admin-orders.png` (minh chứng cho `GUI-ORDERS-IA01-02`, `GUI-ORDERS-IA01-04`, `GUI-ORDERS-IA01-05`, `GUI-ORDERS-IA04-03`)

---

## Phân loại lỗi Cross-Platform (Cross-Platform Bug Classification)

Bảng phân loại các lỗi phát hiện được trong quá trình kiểm thử chéo nền tảng:

| Mã lỗi (Bug ID) | Tên lỗi / Mô tả | Tác động | Phân loại lỗi | Nền tảng bị lỗi |
| :-------------- | :-------------- | :------- | :------------ | :-------------- |
| **BUG-FORGOT-002** | Trường email sử dụng `type="text"` và thiếu dấu hoa thị bắt buộc | Người dùng nhập sai định dạng email vẫn có thể bấm nút gửi, không kích hoạt cơ chế validation HTML5 | General defect | Tất cả (Chrome, Firefox, Safari) |
| **BUG-FORGOT-007** | Hiển thị thông báo lỗi "User not found" qua `window.alert` thay vì banner trên UI | Làm gián đoạn trải nghiệm người dùng, vi phạm tiêu chuẩn thiết kế UI hiện đại | General defect | Tất cả (Chrome, Firefox, Safari) |
| **BUG-ORDERS-001** | Lỗ hổng bảo mật XSS tại cột địa chỉ giao hàng (sử dụng `dangerouslySetInnerHTML`) | Nghiêm trọng: Kẻ tấn công có thể chèn mã HTML hoặc Script độc hại để thực thi trên trình duyệt của Admin | General defect | Tất cả (Chrome, Firefox, Safari) |

_Ghi chú về phân loại lỗi:_

- **Cross-platform defect:** Lỗi chỉ xuất hiện trên 1 hoặc 2 nền tảng, không xuất hiện trên tất cả.
- **General defect:** Lỗi xuất hiện trên tất cả các nền tảng (lỗi logic chung của ứng dụng).

---

## Tóm tắt & Đánh giá chung

### 1. Số liệu thống kê kết quả kiểm thử

| Nền tảng (Platform)            | Tổng số test cases | Số lượng Pass | Số lượng Fail | Tỷ lệ Pass (%) |
| :----------------------------- | :----------------- | :------------ | :------------ | :------------- |
| **Platform 1 (Chrome/Win)**    | 10                 | 7             | 3             | 70%            |
| **Platform 2 (Firefox/macOS)** | 10                 | 7             | 3             | 70%            |
| **Platform 3 (Safari/macOS)**  | 10                 | 7             | 3             | 70%            |

### 2. Đánh giá khả năng tương thích chéo (Cross-Platform Compatibility Evaluation)

- **Tính tương thích giao diện:** Hệ thống hiển thị tương đối đồng đều và chính xác trên cả 3 trình duyệt Chrome (Windows), Firefox (macOS), và Safari (macOS). Font chữ hiển thị chuẩn xác, màu sắc hài hòa, cấu trúc card Quên Mật Khẩu và bảng đơn hàng Admin đều được giữ vững ở tỷ lệ khung nhìn chuẩn mà không bị vỡ layout, tràn viền hay xuất hiện thanh cuộn ngang không mong muốn.
- **Tính năng và hành vi:** Các tương tác chính (chuyển đổi bước nhập OTP, hover nút, cập nhật badge màu trạng thái tức thì) hoạt động nhất quán.
- **Khác biệt nhỏ về trình duyệt:** Có một số khác biệt nhỏ do cơ chế mặc định của engine hiển thị:
  - Firefox hiển thị viền focus (focus outline) dày và sắc nét hơn Chrome/Safari khi dùng Tab điều hướng.
  - Hộp thoại `window.alert()` được vẽ theo UI riêng của từng trình duyệt (Chrome hiển thị hộp thoại pop-up có tiêu đề tên miền ở góc trên; Firefox hiển thị modal góc bo tròn có nút bấm "OK" xanh dương ở giữa trang; Safari hiển thị modal tương tự nhưng với nút bấm là "Close").
- **Kết luận:** Tỷ lệ vượt qua (Pass Rate) đạt **70%** (7/10 cases) trên cả 3 nền tảng. Toàn bộ 3 case bị Fail đều là **General defect** (lỗi logic và HTML chung đã tồn tại sẵn trong code nguồn) và không phát sinh bất kỳ **Cross-platform defect** (lỗi tương thích riêng) nào. Ứng dụng đáp ứng tốt tiêu chuẩn tương thích đa nền tảng.
