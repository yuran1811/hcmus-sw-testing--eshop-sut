# NHẬT KÝ THỰC THI KIỂM THỬ – SPRINT 1 (DEMO FR-03)

- **Ngày thực hiện**: 2026-06-28
- **Tester**: Antigravity (Gemini 3.5 Flash)
- **Môi trường**: Windows 11, Google Chrome, Build/Commit: a6352864919d5523bbaa295fe7f68f40d59def82
- **SUT URL**: http://localhost:5173
- **Backend API**: http://localhost:3000

## 1. Tóm tắt kết quả (Summary)

- **Tổng số ca kiểm thử**: 31
- **Đạt (Passed)**: 5
- **Lỗi (Failed)**: 24
- **Bị chặn (Blocked)**: 2
- **Chưa chạy (Not Run)**: 0
- **Tỷ lệ đạt (Pass Rate)**: 16.13% (5/31)

## 2. Nhật ký thực thi chi tiết (Execution Log)

| Test Case ID | Module | Tester | Result | Related Bug | Note |
|---|---|---|---|---|---|
| TC-FORGOT-PASSWORD-001 | forgot-password | Antigravity | Failed | [DRAFT-BUG-FORGOT-PASSWORD-001.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/demo/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-001.md), [DRAFT-BUG-FORGOT-PASSWORD-002.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/demo/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-002.md), [DRAFT-BUG-FORGOT-PASSWORD-003.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/demo/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-003.md) | Sinh mã OTP 4 số thay vì 6 số; thiếu trường Xác nhận mật khẩu mới; thiếu Step Indicator "Bước 1 / 2" |
| TC-FORGOT-PASSWORD-002 | forgot-password | Antigravity | Failed | [DRAFT-BUG-FORGOT-PASSWORD-003.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/demo/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-003.md) | Bỏ trống email, không báo lỗi bằng nhãn văn bản trên submit mà sử dụng HTML5 validation hoặc không hiển thị rõ ràng |
| TC-FORGOT-PASSWORD-003 | forgot-password | Antigravity | Failed | [DRAFT-BUG-FORGOT-PASSWORD-003.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/demo/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-003.md) | Định dạng email sai, hiển thị lỗi bằng alert() thay vì nhãn văn bản |
| TC-FORGOT-PASSWORD-004 | forgot-password | Antigravity | Failed | [DRAFT-BUG-FORGOT-PASSWORD-003.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/demo/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-003.md) | Email không tồn tại, báo lỗi bằng alert() thay vì nhãn văn bản |
| TC-FORGOT-PASSWORD-005 | forgot-password | Antigravity | Failed | [DRAFT-BUG-FORGOT-PASSWORD-003.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/demo/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-003.md) | Giao diện Bước 1 thiếu nút/liên kết "Quay lại đăng nhập" |
| TC-FORGOT-PASSWORD-006 | forgot-password | Antigravity | Failed | [DRAFT-BUG-FORGOT-PASSWORD-003.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/demo/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-003.md) | Bỏ trống trường OTP ở Bước 2, báo lỗi bằng alert() hoặc HTML5 |
| TC-FORGOT-PASSWORD-007 | forgot-password | Antigravity | Failed | [DRAFT-BUG-FORGOT-PASSWORD-001.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/demo/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-001.md) | OTP trong SUT chỉ dài 4 chữ số, nên kiểm thử OTP dài 5 chữ số bị lỗi/chặn |
| TC-FORGOT-PASSWORD-008 | forgot-password | Antigravity | Failed | [DRAFT-BUG-FORGOT-PASSWORD-001.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/demo/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-001.md) | OTP trong SUT chỉ dài 4 chữ số, nên kiểm thử OTP dài 7 chữ số bị lỗi/chặn |
| TC-FORGOT-PASSWORD-009 | forgot-password | Antigravity | Failed | [DRAFT-BUG-FORGOT-PASSWORD-003.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/demo/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-003.md) | Nhập sai OTP 6 chữ số (SUT dùng 4 số), trả về 400 và báo lỗi alert() |
| TC-FORGOT-PASSWORD-010 | forgot-password | Antigravity | Failed | [DRAFT-BUG-FORGOT-PASSWORD-003.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/demo/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-003.md) | OTP chứa ký tự chữ, báo lỗi qua alert() |
| TC-FORGOT-PASSWORD-011 | forgot-password | Antigravity | Failed | [DRAFT-BUG-FORGOT-PASSWORD-003.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/demo/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-003.md) | OTP của email khác, báo lỗi qua alert() |
| TC-FORGOT-PASSWORD-012 | forgot-password | Antigravity | Failed | [DRAFT-BUG-FORGOT-PASSWORD-003.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/demo/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-003.md) | Bỏ trống mật khẩu mới, báo lỗi alert() hoặc HTML5 |
| TC-FORGOT-PASSWORD-013 | forgot-password | Antigravity | Failed | [DRAFT-BUG-FORGOT-PASSWORD-003.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/demo/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-003.md) | Mật khẩu 7 ký tự, báo lỗi yếu qua alert() |
| TC-FORGOT-PASSWORD-014 | forgot-password | Antigravity | Failed | [DRAFT-BUG-FORGOT-PASSWORD-003.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/demo/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-003.md) | Mật khẩu thiếu chữ hoa, báo lỗi yếu qua alert() |
| TC-FORGOT-PASSWORD-015 | forgot-password | Antigravity | Failed | [DRAFT-BUG-FORGOT-PASSWORD-003.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/demo/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-003.md) | Mật khẩu thiếu chữ thường, báo lỗi yếu qua alert() |
| TC-FORGOT-PASSWORD-016 | forgot-password | Antigravity | Failed | [DRAFT-BUG-FORGOT-PASSWORD-003.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/demo/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-003.md) | Mật khẩu thiếu chữ số, báo lỗi yếu qua alert() |
| TC-FORGOT-PASSWORD-017 | forgot-password | Antigravity | Failed | [DRAFT-BUG-FORGOT-PASSWORD-003.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/demo/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-003.md) | Mật khẩu thiếu ký tự đặc biệt, báo lỗi yếu qua alert() |
| TC-FORGOT-PASSWORD-018 | forgot-password | Antigravity | Failed | [DRAFT-BUG-FORGOT-PASSWORD-003.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/demo/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-003.md) | Mật khẩu chứa ký tự đặc biệt không hợp lệ, báo lỗi alert() |
| TC-FORGOT-PASSWORD-019 | forgot-password | Antigravity | Blocked | [DRAFT-BUG-FORGOT-PASSWORD-002.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/demo/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-002.md) | Bị chặn do thiếu hoàn toàn trường "Xác nhận mật khẩu mới" |
| TC-FORGOT-PASSWORD-020 | forgot-password | Antigravity | Blocked | [DRAFT-BUG-FORGOT-PASSWORD-002.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/demo/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-002.md) | Bị chặn do thiếu hoàn toàn trường "Xác nhận mật khẩu mới" |
| TC-FORGOT-PASSWORD-021 | forgot-password | Antigravity | Failed | [DRAFT-BUG-FORGOT-PASSWORD-003.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/demo/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-003.md) | Thiếu dấu sao `*` đỏ tại nhãn các trường bắt buộc |
| TC-FORGOT-PASSWORD-022 | forgot-password | Antigravity | Passed | None | Các trường Email và Mật khẩu sử dụng đúng thuộc tính type="email" và type="password" |
| TC-FORGOT-PASSWORD-023 | forgot-password | Antigravity | Failed | [DRAFT-BUG-FORGOT-PASSWORD-003.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/demo/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-003.md) | Lỗi không xuất hiện phía trên nút submit mà xuất hiện qua alert() |
| TC-FORGOT-PASSWORD-024 | forgot-password | Antigravity | Failed | [DRAFT-BUG-FORGOT-PASSWORD-003.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/demo/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-003.md) | Mật khẩu hợp lệ `Reset123!` bị từ chối do regex kiểm tra độ mạnh quá ngặt nghèo hoặc lỗi logic |
| TC-FORGOT-PASSWORD-025 | forgot-password | Antigravity | Failed | [DRAFT-BUG-FORGOT-PASSWORD-003.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/demo/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-003.md) | Gửi yêu cầu với email viết hoa gây lỗi 404 từ API (thiếu xử lý case-insensitive) |
| TC-FORGOT-PASSWORD-026 | forgot-password | Antigravity | Failed | [DRAFT-BUG-FORGOT-PASSWORD-003.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/demo/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-003.md) | OTP không tự động hết hạn sau thời gian TTL quy định |
| TC-FORGOT-PASSWORD-027 | forgot-password | Antigravity | Passed | None | OTP đã sử dụng không thể dùng lại (trả về 400 Bad Request) |
| TC-FORGOT-PASSWORD-028 | forgot-password | Antigravity | Passed | None | Trạng thái single-page được reset khi load lại trang, không thể bypass vào thẳng Bước 2 |
| TC-FORGOT-PASSWORD-029 | forgot-password | Antigravity | Passed | None | Các mã OTP sinh ra liên tiếp hoàn toàn ngẫu nhiên |
| TC-FORGOT-PASSWORD-030 | forgot-password | Antigravity | Failed | [DRAFT-BUG-FORGOT-PASSWORD-003.md](file:///d:/Project/Testing/hcmus-sw-testing--eshop-sut/tests/demo/bug-reports/DRAFT-BUG-FORGOT-PASSWORD-003.md) | Nhập sai OTP nhiều lần liên tiếp không bị rate limit hay khóa tài khoản |
| TC-FORGOT-PASSWORD-031 | forgot-password | Antigravity | Passed | None | Quay lại (Back) sau khi reset thành công không cho phép gửi lại thông tin |
