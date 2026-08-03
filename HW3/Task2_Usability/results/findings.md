# Findings & Bugs

## Pain Points đã gom nhóm

| Nhóm vấn đề | Mô tả | Participant liên quan | Loại | Mức độ |
|-------------|-------|------------------------|------|--------|
| **Lỗi Regex Mật khẩu mới** | Regex kiểm tra mật khẩu mới bắt buộc phải chứa khoảng trắng (`\s`) thay vì ký tự đặc biệt, chặn đứng tất cả người dùng đổi mật khẩu thành công. | P01, P02, P03, P04, P05, P06, P07 | Systemic Issue | Blocker |
| **Thiếu trường xác nhận & ẩn/hiện mật khẩu** | Form đổi mật khẩu thiếu ô nhập lại mật khẩu để xác nhận, đồng thời không có nút bật/tắt hiển thị mật khẩu khiến người dùng dễ gõ sai mà không biết. | P02, P03, P04, P05, P06, P07 | Systemic Issue | Major |
| **Mất an toàn hiển thị OTP** | Mã OTP bảo mật lại hiển thị trực tiếp ngay trên giao diện web (dưới dạng thông báo thành công) thay vì được gửi riêng tư qua email. | P05, P06 | Systemic Issue | Major |
| **Không chuyển hướng trang** | Sau khi nhấn Đặt lại mật khẩu (với mật khẩu hợp lệ chứa khoảng trắng), hệ thống không tự động chuyển hướng người dùng về trang Đăng nhập. | P01, P02, P03, P04, P05, P06, P07 | Systemic Issue | Major |

## Danh sách Bug đã báo cáo GitHub Issues

| Bug ID | Mô tả ngắn | Link Issue | Screenshot |
|--------|-----------|------------|------------|
| **BUG-FORGOT-006** | Regex kiểm tra mật khẩu mới bắt buộc khoảng trắng | [Issue #6](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/6) | [GUI-FORGOT-IA02-10.png](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW3/Task1_GUI/Evidences/GUI-FORGOT-IA02-10.png) |
| **BUG-FORGOT-005** | Thiếu trường Xác nhận mật khẩu và nhãn OTP ghi sai | [Issue #5](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/5) | [GUI-FORGOT-IA02-05.png](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW3/Task1_GUI/Evidences/GUI-FORGOT-IA02-05.png) |
| **BUG-FORGOT-008** | Không chuyển hướng về trang Login sau khi đổi mật khẩu | [Issue #8](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/8) | [GUI-FORGOT-IA04-03.png](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/HW3/Task1_GUI/Evidences/GUI-FORGOT-IA04-03.png) |

