# Báo cáo Kết quả Kiểm thử Tự động - Phân hệ Checkout (FR-08)

Thư mục này chứa các kịch bản kiểm thử tự động bằng Playwright cho tính năng Thanh toán (FR-08 Checkout).

## Thông tin chạy test

- **Ngày thực hiện**: 2026-08-10
- **Người thực hiện**: Mạch Quốc Tấn
- **Công cụ**: Playwright v1.40+ (TypeScript)
- **Môi trường chạy**: Localhost (Backend: port 3000, Frontend Web: port 5173)
- **Trình duyệt kiểm thử**: Chromium, Firefox, WebKit (Đa trình duyệt)

## Kết quả tổng quan

- **Tổng số kịch bản chạy (Browser Runs)**: 87 lượt (29 kịch bản × 3 trình duyệt)
- **Số lượt Pass**: 45
- **Số lượt Fail**: 42

## Danh sách các kịch bản kiểm thử

| Mã Test Case              | Tên Kịch bản                                   | Chromium | Firefox | WebKit | Ghi chú                                   |
| :------------------------ | :--------------------------------------------- | :------- | :------ | :----- | :---------------------------------------- |
| TC-CHECKOUT-001           | Thanh toán thành công giỏ hàng hợp lệ          | Fail     | Fail    | Fail   | BUG-CHECKOUT-006 (Cart not cleared)       |
| TC-CHECKOUT-002           | Thanh toán với token JWT không hợp lệ          | Fail     | Fail    | Fail   | BUG-CHECKOUT-001 (Auth bypass)            |
| TC-CHECKOUT-002B          | Thanh toán không đính kèm header token         | Pass     | Pass    | Pass   | Chặn đúng yêu cầu thiếu token             |
| TC-CHECKOUT-003           | Thanh toán khi giỏ hàng trống                  | Fail     | Fail    | Fail   | BUG-CHECKOUT-002 (Empty cart accepted)    |
| TC-CHECKOUT-004           | Sửa total_amount thành mốc giá rẻ hơn          | Fail     | Fail    | Fail   | BUG-CHECKOUT-003 (Forged amount accepted) |
| TC-CHECKOUT-005           | Địa chỉ giao hàng thông thường                 | Fail     | Fail    | Fail   | BUG-CHECKOUT-006 (Cart not cleared)       |
| TC-CHECKOUT-006           | Địa chỉ giao hàng chứa số và ký tự đặc biệt    | Pass     | Pass    | Pass   | Hoạt động đúng                            |
| TC-CHECKOUT-007           | Địa chỉ giao hàng Tiếng Việt có dấu            | Pass     | Pass    | Pass   | Hoạt động đúng                            |
| TC-CHECKOUT-008A..008B    | Thiếu shipping_address / shipping_address null | Pass     | Pass    | Pass   | Hoạt động đúng                            |
| TC-CHECKOUT-009           | Địa chỉ giao hàng chỉ chứa khoảng trắng        | Pass     | Pass    | Pass   | Chặn đúng (400)                           |
| TC-CHECKOUT-010A          | Địa chỉ giao hàng null                         | Pass     | Pass    | Pass   | Chặn đúng (400)                           |
| TC-CHECKOUT-010B          | Địa chỉ giao hàng number                       | Pass     | Pass    | Pass   | Chặn đúng (400)                           |
| TC-CHECKOUT-010C          | Địa chỉ giao hàng object                       | Fail     | Fail    | Fail   | BUG-CHECKOUT-010                          |
| TC-CHECKOUT-010D          | Địa chỉ giao hàng array                        | Pass     | Pass    | Pass   | Chặn đúng / xử lý an toàn                 |
| TC-CHECKOUT-011           | Xem trang checkout khi có sản phẩm             | Fail     | Fail    | Fail   | BUG-CHECKOUT-008 (UI error)               |
| TC-CHECKOUT-012           | Chỉnh sửa tổng tiền trực tiếp trên UI          | Fail     | Fail    | Fail   | BUG-CHECKOUT-009 (UI editable)            |
| TC-CHECKOUT-013           | Backend tự tính total_amount khi client không gửi | Fail     | Fail    | Fail   | BUG-CHECKOUT-004 (total_amount null)      |
| TC-CHECKOUT-014           | Sửa đổi giá (price) của từng item sản phẩm     | Fail     | Fail    | Fail   | BUG-CHECKOUT-005 (Forged items price)     |
| TC-CHECKOUT-015           | Checkout của User B không ảnh hưởng User A     | Fail     | Fail    | Fail   | BUG-CHECKOUT-007 (Cart leak delete)       |
| TC-CHECKOUT-BVA-001       | Thanh toán thành công biên dưới (1 sản phẩm)   | Fail     | Fail    | Fail   | BUG-CHECKOUT-006 (Cart not cleared)       |
| TC-CHECKOUT-BVA-002       | Sửa total_amount chênh lệch nhỏ hơn (-1₫)      | Fail     | Fail    | Fail   | BUG-CHECKOUT-003                          |
| TC-CHECKOUT-BVA-003       | Sửa total_amount chênh lệch lớn hơn (+1₫)      | Fail     | Fail    | Fail   | BUG-CHECKOUT-004                          |
| TC-CHECKOUT-BVA-004..007C | Các kịch bản biên shipping_address             | Pass     | Pass    | Pass   | Hoạt động đúng                            |

## Danh sách lỗi phát hiện (Báo cáo lỗi tự động)

Các lỗi phát hiện trong quá trình kiểm thử tự động được ghi nhận tại thư mục `tests/bug-reports/automation/checkout/`:

- [BUG-CHECKOUT-001](../../../../bug-reports/automation/checkout/BUG-CHECKOUT-001.md): Khách hàng dùng token JWT không hợp lệ vẫn thanh toán thành công.
- [BUG-CHECKOUT-002](../../../../bug-reports/automation/checkout/BUG-CHECKOUT-002.md): Giỏ hàng trống vẫn cho phép gửi yêu cầu thanh toán thành công.
- [BUG-CHECKOUT-003](../../../../bug-reports/automation/checkout/BUG-CHECKOUT-003.md): Backend chấp nhận total_amount giả mạo thấp hơn giá thực tế.
- [BUG-CHECKOUT-004](../../../../bug-reports/automation/checkout/BUG-CHECKOUT-004.md): Backend không đảm bảo total_amount được tính từ dữ liệu server.
- [BUG-CHECKOUT-005](../../../../bug-reports/automation/checkout/BUG-CHECKOUT-005.md): Backend chấp nhận giá sản phẩm / items giả mạo từ client.
- [BUG-CHECKOUT-006](../../../../bug-reports/automation/checkout/BUG-CHECKOUT-006.md): Giỏ hàng không được xóa sạch sau khi thực hiện thanh toán thành công.
- [BUG-CHECKOUT-007](../../../../bug-reports/automation/checkout/BUG-CHECKOUT-007.md): Lỗi rò rỉ phân tách dữ liệu: API Checkout xóa nhầm giỏ hàng của user khác.
- [BUG-CHECKOUT-008](../../../../bug-reports/automation/checkout/BUG-CHECKOUT-008.md): UI Checkout hiển thị thiếu thông tin sản phẩm.
- [BUG-CHECKOUT-009](../../../../bug-reports/automation/checkout/BUG-CHECKOUT-009.md): UI Checkout cho phép sửa tổng tiền total_amount.
- [BUG-CHECKOUT-010](../../../../bug-reports/automation/checkout/BUG-CHECKOUT-010.md): API Checkout chấp nhận shipping_address sai kiểu dữ liệu dạng Object.
