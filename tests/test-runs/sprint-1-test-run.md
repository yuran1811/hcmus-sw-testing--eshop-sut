# NHẬT KÝ THỰC THI KIỂM THỬ – SPRINT 1

- **Ngày thực hiện**: 2026-06-26
- **Tester**: Antigravity (Gemini 3.5 Flash)
- **Môi trường**: Windows 11, Google Chrome, Build/Commit: a6352864919d5523bbaa295fe7f68f40d59def82

## 1. Tóm tắt kết quả (Summary)

- **Tổng số ca kiểm thử**: 105
- **Đạt (Passed)**: 18 (5 từ forgot-password, 13 từ order-history)
- **Lỗi (Failed)**: 38 (24 từ forgot-password, 14 từ order-history)
- **Bị chặn (Blocked)**: 2 (từ forgot-password)
- **Chưa chạy (Not Run)**: 47 (Các module khác)
- **Tỷ lệ đạt của module Quên mật khẩu**: 16.13% (5/31)
- **Tỷ lệ đạt của module Lịch sử đơn hàng**: 48.15% (13/27)
- **Tỷ lệ đạt tổng thể của Sprint 1 (đã chạy)**: 31.03% (18/58)

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
