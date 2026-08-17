# NHẬT KÝ THỰC THI KIỂM THỬ – SPRINT 1

- **Ngày thực hiện**: 2026-06-26
- **Tester**: Antigravity (Gemini 3.5 Flash)
- **Môi trường**: Windows 11, Google Chrome, Build/Commit: a6352864919d5523bbaa295fe7f68f40d59def82

## 1. Tóm tắt kết quả (Summary)

- **Tổng số ca kiểm thử**: 105
- **Đạt (Passed)**: 45 (5 từ forgot-password, 13 từ order-history, 11 từ user-management, 16 từ mobile-checkout)
- **Lỗi (Failed)**: 58 (24 từ forgot-password, 14 từ order-history, 10 từ user-management, 10 từ mobile-checkout)
- **Bị chặn (Blocked)**: 2 (từ forgot-password)
- **Chưa chạy (Not Run)**: 0
- **Tỷ lệ đạt của module Quên mật khẩu**: 16.13% (5/31)
- **Tỷ lệ đạt của module Lịch sử đơn hàng**: 48.15% (13/27)
- **Tỷ lệ đạt của module Quản lý người dùng**: 52.38% (11/21)
- **Tỷ lệ đạt của module Thanh toán di động**: 61.54% (16/26)
- **Tỷ lệ đạt tổng thể của Sprint 1 (đã chạy)**: 42.86% (45/105)

## 2. Nhật ký thực thi chi tiết (Execution Log)

| Test Case ID | Module | Tester | Result | Related Bug | Note |
|---|---|---|---|---|---|
| TC-FORGOT-PASSWORD-001 | forgot-password | Antigravity | Failed | [BUG-003](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-003.md), [BUG-004](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-004.md) | Sinh mã OTP 4 số thay vì 6 số; thiếu Step Indicator "Bước 1 / 2" |
| TC-FORGOT-PASSWORD-002 | forgot-password | Antigravity | Failed | [BUG-001](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-001.md), [BUG-002](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-002.md), [BUG-003](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-003.md), [BUG-004](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-004.md) | Thiếu Confirm Password; lỗi Regex chặn mật khẩu mạnh; sinh OTP 4 số; thiếu Step Indicator "Bước 2 / 2" |
| TC-FORGOT-PASSWORD-003 | forgot-password | Antigravity | Failed | [BUG-006](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-006.md) | Bị chặn bởi HTML5 required nhưng không hiển thị lỗi dạng văn bản trên submit |
| TC-FORGOT-PASSWORD-004 | forgot-password | Antigravity | Failed | [BUG-006](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-006.md) | Hiển thị lỗi bằng alert() thay vì nhãn văn bản trên submit |
| TC-FORGOT-PASSWORD-005 | forgot-password | Antigravity | Failed | [BUG-006](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-006.md) | Trường input là type="text", không tự động check định dạng email; lỗi hiển thị bằng alert() |
| TC-FORGOT-PASSWORD-006 | forgot-password | Antigravity | Failed | [BUG-010](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-010.md) | Giao diện Bước 1 thiếu nút/liên kết "Quay lại đăng nhập" |
| TC-FORGOT-PASSWORD-007 | forgot-password | Antigravity | Failed | [BUG-006](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-006.md) | Bị chặn bởi HTML5 required nhưng không hiển thị lỗi trên submit |
| TC-FORGOT-PASSWORD-008 | forgot-password | Antigravity | Failed | [BUG-003](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-003.md), [BUG-006](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-006.md) | Gửi lên BE trả về 400 và báo lỗi bằng alert(); (OTP trong SUT chỉ dài 4 ký tự) |
| TC-FORGOT-PASSWORD-009 | forgot-password | Antigravity | Failed | [BUG-003](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-003.md), [BUG-006](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-006.md) | Gửi lên BE trả về 400 và báo lỗi bằng alert() |
| TC-FORGOT-PASSWORD-010 | forgot-password | Antigravity | Failed | [BUG-006](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-006.md) | Gửi lên BE trả về 400 và báo lỗi bằng alert() |
| TC-FORGOT-PASSWORD-011 | forgot-password | Antigravity | Failed | [BUG-006](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-006.md) | Gửi lên BE trả về 400 và báo lỗi bằng alert() |
| TC-FORGOT-PASSWORD-012 | forgot-password | Antigravity | Failed | [BUG-006](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-006.md) | Gửi lên BE trả về 400 và báo lỗi bằng alert() |
| TC-FORGOT-PASSWORD-013 | forgot-password | Antigravity | Failed | [BUG-006](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-006.md) | Bị chặn bởi HTML5 required nhưng không hiển thị lỗi trên submit |
| TC-FORGOT-PASSWORD-014 | forgot-password | Antigravity | Failed | [BUG-002](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-002.md), [BUG-006](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-006.md) | Báo mật khẩu quá yếu qua alert() |
| TC-FORGOT-PASSWORD-015 | forgot-password | Antigravity | Failed | [BUG-002](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-002.md), [BUG-006](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-006.md) | Báo mật khẩu quá yếu qua alert() |
| TC-FORGOT-PASSWORD-016 | forgot-password | Antigravity | Failed | [BUG-002](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-002.md), [BUG-006](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-006.md) | Báo mật khẩu quá yếu qua alert() |
| TC-FORGOT-PASSWORD-017 | forgot-password | Antigravity | Failed | [BUG-002](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-002.md), [BUG-006](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-006.md) | Báo mật khẩu quá yếu qua alert() |
| TC-FORGOT-PASSWORD-018 | forgot-password | Antigravity | Failed | [BUG-002](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-002.md), [BUG-006](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-006.md) | Báo mật khẩu quá yếu qua alert() |
| TC-FORGOT-PASSWORD-019 | forgot-password | Antigravity | Failed | [BUG-002](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-002.md), [BUG-006](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-006.md) | Mật khẩu chứa ký tự đặc biệt hợp lệ bị từ chối; báo lỗi qua alert() |
| TC-FORGOT-PASSWORD-020 | forgot-password | Antigravity | Blocked | [BUG-001](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-001.md) | Không thể thực hiện vì thiếu hoàn toàn trường "Xác nhận mật khẩu mới" |
| TC-FORGOT-PASSWORD-021 | forgot-password | Antigravity | Blocked | [BUG-001](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-001.md) | Không thể thực hiện vì thiếu hoàn toàn trường "Xác nhận mật khẩu mới" |
| TC-FORGOT-PASSWORD-022 | forgot-password | Antigravity | Passed | None | Trường mật khẩu mới có type="password" và ẩn hiển thị đúng dạng "●" |
| TC-FORGOT-PASSWORD-023 | forgot-password | Antigravity | Failed | [BUG-005](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-005.md), [BUG-006](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-006.md) | Nhãn thiếu ký tự "*"; lỗi hiển thị qua alert() thay vì trên nút submit |
| TC-FORGOT-PASSWORD-024 | forgot-password | Antigravity | Failed | [BUG-002](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-002.md) | Mật khẩu chuẩn 8 ký tự `Reset123!` bị từ chối bởi lỗi Regex |
| TC-FORGOT-PASSWORD-025 | forgot-password | Antigravity | Failed | [BUG-007](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-007.md) | Gửi email chữ hoa trả về 404 từ API (phân biệt chữ hoa/thường) |
| TC-FORGOT-PASSWORD-026 | forgot-password | Antigravity | Failed | [BUG-008](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-008.md) | OTP không có thời gian hết hiệu lực, dùng được vô hạn |
| TC-FORGOT-PASSWORD-027 | forgot-password | Antigravity | Passed | None | Sử dụng lại OTP cũ đã dùng thành công bị BE chặn (trả về 400) |
| TC-FORGOT-PASSWORD-028 | forgot-password | Antigravity | Passed | None | Single page state reset ngăn chặn truy cập trực tiếp vào Bước 2 |
| TC-FORGOT-PASSWORD-029 | forgot-password | Antigravity | Passed | None | Hai lần yêu cầu liên tiếp sinh ra 2 mã OTP hoàn toàn ngẫu nhiên |
| TC-FORGOT-PASSWORD-030 | forgot-password | Antigravity | Failed | [BUG-009](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-009.md) | Nhập sai OTP quá 5 lần liên tiếp tài khoản vẫn không bị khóa |
| TC-FORGOT-PASSWORD-031 | forgot-password | Antigravity | Passed | None | Token được xóa trong DB sau khi đặt lại mật khẩu, Back trình duyệt không thể submit lại |
| TC-ORDER-HISTORY-001 | order-history | Antigravity | Failed | [BUG-003](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-ORDER-HISTORY-003.md), [BUG-004](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-ORDER-HISTORY-004.md), [BUG-006](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-ORDER-HISTORY-006.md) | Thiếu bộ lọc; thiếu phân trang; thiếu tiêu đề H1 |
| TC-ORDER-HISTORY-002 | order-history | Antigravity | Failed | [BUG-005](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-ORDER-HISTORY-005.md) | Không tự động chuyển hướng người dùng chưa đăng nhập về trang Login |
| TC-ORDER-HISTORY-003 | order-history | Antigravity | Failed | [BUG-001](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-ORDER-HISTORY-001.md) | Lỗ hổng bảo mật IDOR cho phép xem đơn hàng người khác qua API |
| TC-ORDER-HISTORY-004 | order-history | Antigravity | Failed | [BUG-007](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-ORDER-HISTORY-007.md) | Trang lịch sử trống hiển thị văn bản thô sơ, thiếu Empty State chuẩn FR-24 |
| TC-ORDER-HISTORY-005 | order-history | Antigravity | Failed | [BUG-003](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-ORDER-HISTORY-003.md), [BUG-004](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-ORDER-HISTORY-004.md), [BUG-006](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-ORDER-HISTORY-006.md) | Thiếu bộ lọc; thiếu phân trang; thiếu tiêu đề H1; đơn hàng không nhấp được |
| TC-ORDER-HISTORY-006 | order-history | Antigravity | Passed | None | Hiển thị nhãn trạng thái "Chờ xác nhận" màu vàng chính xác |
| TC-ORDER-HISTORY-007 | order-history | Antigravity | Passed | None | Hiển thị nhãn trạng thái "Đã xác nhận" màu indigo chính xác |
| TC-ORDER-HISTORY-008 | order-history | Antigravity | Passed | None | Hiển thị nhãn trạng thái "Đang giao" màu xanh dương chính xác |
| TC-ORDER-HISTORY-009 | order-history | Antigravity | Passed | None | Hiển thị nhãn trạng thái "Đã giao" màu xanh lá chính xác |
| TC-ORDER-HISTORY-010 | order-history | Antigravity | Passed | None | Hiển thị nhãn trạng thái "Đã hủy" màu đỏ chính xác |
| TC-ORDER-HISTORY-011 | order-history | Antigravity | Passed | None | Số tiền tối thiểu hiển thị chính xác định dạng VND: `1 ₫` |
| TC-ORDER-HISTORY-012 | order-history | Antigravity | Passed | None | Số tiền 999 hiển thị đúng dạng `999 ₫` (không dấu chấm phân cách) |
| TC-ORDER-HISTORY-013 | order-history | Antigravity | Passed | None | Số tiền 1.000 hiển thị đúng dạng `1.000 ₫` (có dấu chấm phân cách) |
| TC-ORDER-HISTORY-014 | order-history | Antigravity | Passed | None | Số tiền 1.001 hiển thị đúng dạng `1.001 ₫` (có dấu chấm phân cách) |
| TC-ORDER-HISTORY-015 | order-history | Antigravity | Passed | None | Số tiền lớn hiển thị đúng định dạng dấu chấm phân cách hàng triệu/nghìn |
| TC-ORDER-HISTORY-016 | order-history | Antigravity | Failed | [BUG-006](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-ORDER-HISTORY-006.md) | Giao diện hoàn toàn thiếu thẻ tiêu đề <h1> (H1 count = 0) |
| TC-ORDER-HISTORY-017 | order-history | Antigravity | Failed | [BUG-006](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-ORDER-HISTORY-006.md) | Giao diện hoàn toàn thiếu thẻ tiêu đề <h1> (H1 count = 0) |
| TC-ORDER-HISTORY-018 | order-history | Antigravity | Passed | None | Hệ thống không có lỗi thừa thẻ H1 (H1 count = 0 chứ không phải 2) |
| TC-ORDER-HISTORY-019 | order-history | Antigravity | Passed | None | Toàn bộ giao diện lịch sử đơn hàng nhất quán tiếng Việt 100% |
| TC-ORDER-HISTORY-020 | order-history | Antigravity | Failed | [BUG-003](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-ORDER-HISTORY-003.md) | Không thể thực hiện vì thiếu bộ lọc trạng thái trên giao diện |
| TC-ORDER-HISTORY-021 | order-history | Antigravity | Failed | [BUG-004](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-ORDER-HISTORY-004.md) | Không có logic phân trang, toàn bộ đơn hàng đều render ra bảng |
| TC-ORDER-HISTORY-022 | order-history | Antigravity | Failed | [BUG-004](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-ORDER-HISTORY-004.md) | Thiếu phân trang, không thể nhấp chuyển sang trang thứ 2 |
| TC-ORDER-HISTORY-023 | order-history | Antigravity | Passed | None | Định dạng hiển thị Ngày đặt (created_at) dạng thân thiện tiếng Việt thành công |
| TC-ORDER-HISTORY-024 | order-history | Antigravity | Failed | [BUG-002](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-ORDER-HISTORY-002.md) | Mã đơn hàng chỉ là văn bản thô, thiếu nút và trang Chi tiết đơn hàng |
| TC-ORDER-HISTORY-025 | order-history | Antigravity | Failed | [BUG-002](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-ORDER-HISTORY-002.md) | Thiếu trang Chi tiết đơn hàng để hiển thị các chi tiết phí ship và giảm giá |
| TC-ORDER-HISTORY-026 | order-history | Antigravity | Failed | [BUG-001](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-ORDER-HISTORY-001.md) | Lỗ hổng bảo mật IDOR cho phép xem đơn hàng người khác qua API |
| TC-ORDER-HISTORY-027 | order-history | Antigravity | Failed | [BUG-003](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-ORDER-HISTORY-003.md), [BUG-004](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-ORDER-HISTORY-004.md), [BUG-008](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-ORDER-HISTORY-008.md) | Focus bàn phím bị thiếu/lộn xộn do thiếu bộ lọc, phân trang và dialog hủy |
| TC-USER-MANAGEMENT-001 | user-management | Antigravity | Passed | None | Đăng nhập Admin và hiển thị danh sách người dùng thành công |
| TC-USER-MANAGEMENT-002 | user-management | Antigravity | Passed | None | Chặn truy cập danh sách khi chưa đăng nhập, điều hướng về trang Login |
| TC-USER-MANAGEMENT-003 | user-management | Antigravity | Passed | None | Chặn truy cập danh sách khi đăng nhập bằng User thường, báo lỗi "Bạn không phải là admin!" |
| TC-USER-MANAGEMENT-004 | user-management | Antigravity | Failed | [BUG-USER-MANAGEMENT-001](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-USER-MANAGEMENT-001.md) | Không hiển thị Empty State khi hệ thống không có người dùng nào khác ngoài Admin |
| TC-USER-MANAGEMENT-005 | user-management | Antigravity | Passed | None | Bảng hiển thị chính xác 2 dòng khi có đúng 1 người dùng khác ngoài Admin |
| TC-USER-MANAGEMENT-006 | user-management | Antigravity | Failed | [BUG-USER-MANAGEMENT-002](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-USER-MANAGEMENT-002.md) | Người dùng bị xóa ngay lập tức khi nhấn "Xóa" mà không có dialog xác nhận |
| TC-USER-MANAGEMENT-007 | user-management | Antigravity | Failed | [BUG-USER-MANAGEMENT-002](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-USER-MANAGEMENT-002.md) | Không có dialog xác nhận xóa nên không thể thực hiện thao tác "Hủy" |
| TC-USER-MANAGEMENT-008 | user-management | Antigravity | Failed | [BUG-USER-MANAGEMENT-003](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-USER-MANAGEMENT-003.md) | Nút "Xóa" của chính Admin đang đăng nhập vẫn hiển thị hoạt động trên UI |
| TC-USER-MANAGEMENT-009 | user-management | Antigravity | Failed | [BUG-USER-MANAGEMENT-004](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-USER-MANAGEMENT-004.md) | Gửi request DELETE từ tài khoản thường đến API admin thành công (200 OK), người dùng bị xóa |
| TC-USER-MANAGEMENT-010 | user-management | Antigravity | Passed | None | Khách vãng lai gửi request DELETE đến API bị backend chặn (401 Unauthorized) |
| TC-USER-MANAGEMENT-011 | user-management | Antigravity | Passed | None | Mật khẩu không hiển thị trong DOM và không được gửi về client |
| TC-USER-MANAGEMENT-012 | user-management | Antigravity | Failed | [BUG-USER-MANAGEMENT-005](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-USER-MANAGEMENT-005.md) | Nhiều từ khóa hiển thị bằng tiếng Anh trên trang Login, Sidebar và Bảng người dùng |
| TC-USER-MANAGEMENT-013 | user-management | Antigravity | Passed | None | Giao diện hiển thị chính xác duy nhất 1 thẻ H1 ("EShop Admin") |
| TC-USER-MANAGEMENT-014 | user-management | Antigravity | Passed | None | Xác nhận trang không bị thiếu thẻ H1 (đếm được đúng 1 thẻ) |
| TC-USER-MANAGEMENT-015 | user-management | Antigravity | Passed | None | Xác nhận trang không bị thừa thẻ H1 (đếm được đúng 1 thẻ) |
| TC-USER-MANAGEMENT-016 | user-management | Antigravity | Passed | None | Các nút hành động nguy hiểm "Xóa" hiển thị màu đỏ (bg-red-500) đặc trưng |
| TC-USER-MANAGEMENT-017 | user-management | Antigravity | Passed | None | Dữ liệu người dùng được escape an toàn trước khi render lên DOM, chống XSS |
| TC-USER-MANAGEMENT-018 | user-management | Antigravity | Failed | [BUG-USER-MANAGEMENT-006](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-USER-MANAGEMENT-006.md) | Xóa thành công người dùng đang có đơn hàng hoạt động, gây mồ côi đơn hàng |
| TC-USER-MANAGEMENT-019 | user-management | Antigravity | Failed | [BUG-USER-MANAGEMENT-007](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-USER-MANAGEMENT-007.md) | API backend cho phép Admin gửi request tự xóa tài khoản của chính mình thành công (200 OK) |
| TC-USER-MANAGEMENT-020 | user-management | Antigravity | Failed | [BUG-USER-MANAGEMENT-008](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-USER-MANAGEMENT-008.md) | Cả hai request DELETE gửi đồng thời đều trả về 200 OK thay vì báo lỗi 404 cho request thứ hai |
| TC-USER-MANAGEMENT-021 | user-management | Antigravity | Failed | [BUG-USER-MANAGEMENT-009](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-USER-MANAGEMENT-009.md) | Phím Tab bỏ qua các menu thanh bên (Sidebar) do thiếu thuộc tính tabindex trên <li> |
| TC-MOBILE-CHECKOUT-001 | mobile-checkout | Antigravity | Failed | [DRAFT-BUG-MOBILE-CHECKOUT-003](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-MOBILE-CHECKOUT-003.md) | Cắt bỏ phần tử cuối cùng trong giỏ hàng (slice) trước khi gửi checkout |
| TC-MOBILE-CHECKOUT-002 | mobile-checkout | Antigravity | Passed | None | Hiển thị thông báo yêu cầu đăng nhập và chuyển hướng chính xác |
| TC-MOBILE-CHECKOUT-003 | mobile-checkout | Antigravity | Passed | None | Hiển thị thông báo giỏ hàng trống và nút mua tiếp chính xác |
| TC-MOBILE-CHECKOUT-004 | mobile-checkout | Antigravity | Passed | None | Đặt hàng thành công khi giỏ hàng chỉ có đúng 1 sản phẩm (không bị cắt bớt) |
| TC-MOBILE-CHECKOUT-005 | mobile-checkout | Antigravity | Failed | [DRAFT-BUG-MOBILE-CHECKOUT-001](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-MOBILE-CHECKOUT-001.md) | Mã SAVE10 từ chối đơn hàng có giá trị đúng bằng ngưỡng tối thiểu 300.000 ₫ do dùng so sánh `>` |
| TC-MOBILE-CHECKOUT-006 | mobile-checkout | Antigravity | Passed | None | Chặn chính xác coupon SAVE10 khi tổng tiền dưới ngưỡng tối thiểu 300.000 ₫ |
| TC-MOBILE-CHECKOUT-007 | mobile-checkout | Antigravity | Failed | [DRAFT-BUG-MOBILE-CHECKOUT-007](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-MOBILE-CHECKOUT-007.md) | Lỗi công thức toán học tính mã giảm giá phần trăm làm tăng tổng tiền đơn hàng lên gấp 10 lần |
| TC-MOBILE-CHECKOUT-008 | mobile-checkout | Antigravity | Passed | None | Áp dụng thành công mã BIGBUY (fixed discount) khi tổng tiền trên ngưỡng tối thiểu |
| TC-MOBILE-CHECKOUT-009 | mobile-checkout | Antigravity | Passed | None | Chặn chính xác coupon EXPIRED với thông báo lỗi phù hợp |
| TC-MOBILE-CHECKOUT-010 | mobile-checkout | Antigravity | Passed | None | Chặn chính xác coupon không tồn tại hoặc đã vô hiệu hóa với lỗi 404 |
| TC-MOBILE-CHECKOUT-011 | mobile-checkout | Antigravity | Passed | None | Áp dụng thành công VIP100 khi số lần sử dụng của tài khoản dưới giới hạn 2 lần |
| TC-MOBILE-CHECKOUT-012 | mobile-checkout | Antigravity | Passed | None | Chặn chính xác coupon VIP100 khi tài khoản đã đạt tới giới hạn sử dụng 2 lần |
| TC-MOBILE-CHECKOUT-013 | mobile-checkout | Antigravity | Failed | [DRAFT-BUG-MOBILE-CHECKOUT-002](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-MOBILE-CHECKOUT-002.md) | Lỗ hổng Price Parameter Tampering cho phép mua hàng với giá trị tự chỉnh sửa ở client |
| TC-MOBILE-CHECKOUT-014 | mobile-checkout | Antigravity | Passed | None | Số tiền 999 ₫ hiển thị đúng định dạng, không có dấu chấm phân cách hàng nghìn |
| TC-MOBILE-CHECKOUT-015 | mobile-checkout | Antigravity | Passed | None | Số tiền 1.000 ₫ hiển thị đúng định dạng có dấu chấm phân cách hàng nghìn |
| TC-MOBILE-CHECKOUT-016 | mobile-checkout | Antigravity | Passed | None | Số tiền 1.001 ₫ hiển thị đúng định dạng có dấu chấm phân cách hàng nghìn |
| TC-MOBILE-CHECKOUT-017 | mobile-checkout | Antigravity | Failed | [DRAFT-BUG-MOBILE-CHECKOUT-005](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-MOBILE-CHECKOUT-005.md) | Màn hình đăng nhập hiển thị nhãn Username và nút Sign In bằng tiếng Anh, không nhất quán tiếng Việt |
| TC-MOBILE-CHECKOUT-018 | mobile-checkout | Antigravity | Failed | [DRAFT-BUG-MOBILE-CHECKOUT-010](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-MOBILE-CHECKOUT-010.md) | Hiển thị lỗi mạng bằng alert() thay vì nhãn văn bản phía trên nút Đặt hàng theo FR-22 |
| TC-MOBILE-CHECKOUT-019 | mobile-checkout | Antigravity | Failed | [DRAFT-BUG-MOBILE-CHECKOUT-004](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-MOBILE-CHECKOUT-004.md) | Xóa sản phẩm khỏi giỏ hàng lập tức không hiển thị hộp thoại xác nhận |
| TC-MOBILE-CHECKOUT-020 | mobile-checkout | Antigravity | Failed | [DRAFT-BUG-MOBILE-CHECKOUT-004](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-MOBILE-CHECKOUT-004.md) | Do không có dialog xác nhận xóa sản phẩm nên không thể thực hiện thao tác Hủy xóa |
| TC-MOBILE-CHECKOUT-021 | mobile-checkout | Antigravity | Passed | None | Màu sắc các nút hành động đồng bộ và nhất quán trên giao diện di động |
| TC-MOBILE-CHECKOUT-022 | mobile-checkout | Antigravity | Passed | None | Hủy đơn hàng thành công khi ở trạng thái Chờ xác nhận, cập nhật trạng thái lập tức |
| TC-MOBILE-CHECKOUT-023 | mobile-checkout | Antigravity | Passed | None | Ẩn hoàn toàn nút Hủy đơn khi đơn hàng chuyển sang trạng thái Đang giao (shipping) |
| TC-MOBILE-CHECKOUT-024 | mobile-checkout | Antigravity | Failed | [DRAFT-BUG-MOBILE-CHECKOUT-006](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-MOBILE-CHECKOUT-006.md) | Màn hình Checkout thiếu hoàn toàn các trường thông tin giao hàng và bỏ qua tuần tự focus phím Tab |
| TC-MOBILE-CHECKOUT-025 | mobile-checkout | Antigravity | Passed | None | Vô hiệu hóa nút đặt hàng khi đang xử lý (checkoutLoading), ngăn ngừa Double Submit thành công |
| TC-MOBILE-CHECKOUT-026 | mobile-checkout | Antigravity | Failed | [DRAFT-BUG-MOBILE-CHECKOUT-008](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/bug-reports/DRAFT-BUG-MOBILE-CHECKOUT-008.md) | Áp dụng mã giảm giá fixed lớn hơn giá trị giỏ hàng làm tổng tiền thanh toán bị âm (-10.000 ₫) |
