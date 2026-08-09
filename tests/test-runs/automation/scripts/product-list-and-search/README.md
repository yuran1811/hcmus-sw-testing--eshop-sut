# Báo cáo Kết quả Kiểm thử Tự động - Phân hệ Product List & Search (FR-05)

Thư mục này chứa các kịch bản kiểm thử tự động bằng Playwright cho tính năng Danh sách sản phẩm & Tìm kiếm (FR-05).

## Thông tin chạy test

- **Ngày thực hiện**: 2026-08-09
- **Người thực hiện**: Mạch Quốc Tấn
- **Công cụ**: Playwright v1.40+ (TypeScript)
- **Môi trường chạy**: Localhost (Backend: port 3000, Frontend Web: port 5173)
- **Trình duyệt kiểm thử**: Chromium, Firefox, WebKit (Đa trình duyệt)

## Kết quả tổng quan

- **Tổng số kịch bản chạy (Browser Runs)**: 87 lượt (29 kịch bản × 3 trình duyệt)
- **Số lượt Pass**: 45
- **Số lượt Fail**: 42

## Danh sách các kịch bản kiểm thử

| Mã Test Case         | Tên Kịch bản                                   | Chromium | Firefox | WebKit | Ghi chú                                     |
| :------------------- | :--------------------------------------------- | :------- | :------ | :----- | :------------------------------------------ |
| TC-PLAS-001          | Xem danh sách khi search rỗng                  | Fail     | Fail    | Fail   | BUG-PLAS-001 (SEO h1 count > 1)             |
| TC-PLAS-002          | Tìm kiếm sản phẩm tên chính xác                | Fail     | Fail    | Fail   | BUG-PLAS-001                                |
| TC-PLAS-003          | Tìm kiếm với từ khóa không tồn tại             | Fail     | Fail    | Fail   | BUG-PLAS-004 (No empty state)               |
| TC-PLAS-004          | Tìm kiếm từ khóa Tiếng Việt có dấu             | Fail     | Fail    | Fail   | BUG-PLAS-001                                |
| TC-PLAS-005          | Tìm kiếm với mã độc XSS / script HTML          | Fail     | Fail    | Fail   | BUG-PLAS-001                                |
| TC-PLAS-006          | Tìm kiếm từ khóa cực dài 300 ký tự             | Fail     | Fail    | Fail   | BUG-PLAS-006 (Crash 500)                    |
| TC-PLAS-007          | Kiểm tra chi tiết thẻ sản phẩm (ảnh, tên, giá) | Fail     | Fail    | Fail   | BUG-PLAS-002 (no alt) / BUG-PLAS-003 (no ₫) |
| TC-PLAS-008          | Tìm kiếm không phân biệt hoa thường            | Pass     | Pass    | Pass   | Hoạt động đúng                              |
| TC-PLAS-009          | Tìm kiếm một phần tên sản phẩm                 | Pass     | Pass    | Pass   | Hoạt động đúng                              |
| TC-PLAS-010          | Tìm kiếm từ khóa có khoảng trắng thừa          | Fail     | Fail    | Fail   | BUG-PLAS-008 (Not trimmed)                  |
| TC-PLAS-011          | Tìm kiếm chỉ chứa khoảng trắng                 | Pass     | Pass    | Pass   | Hoạt động đúng                              |
| TC-PLAS-012          | Tìm kiếm bằng ký tự đặc biệt SQL Injection     | Pass     | Pass    | Pass   | Trả về danh sách trống an toàn              |
| TC-PLAS-013          | Tìm kiếm với từ khóa trùng khớp danh mục       | Pass     | Pass    | Pass   | Hoạt động đúng                              |
| TC-PLAS-014          | Xóa từ khóa tìm kiếm (nút Clear)               | Pass     | Pass    | Pass   | Hoạt động đúng                              |
| TC-PLAS-015          | Kiểm tra nút Xem chi tiết sản phẩm             | Pass     | Pass    | Pass   | Hoạt động đúng                              |
| TC-PLAS-016          | Kiểm tra nút Thêm vào giỏ hàng sản phẩm        | Pass     | Pass    | Pass   | Hoạt động đúng                              |
| TC-PLAS-017          | Kiểm tra điều hướng logo EShop về trang chủ    | Pass     | Pass    | Pass   | Hoạt động đúng                              |
| TC-PLAS-018          | Kiểm tra hiển thị tổng số sản phẩm             | Pass     | Pass    | Pass   | Hoạt động đúng                              |
| TC-PLAS-019          | Kiểm tra chỉ báo trạng thái đang tải           | Pass     | Pass    | Pass   | Hoạt động đúng                              |
| TC-PLAS-BVA-001      | Tìm kiếm từ khóa ở biên dưới (1 ký tự)         | Fail     | Fail    | Fail   | BUG-PLAS-001                                |
| TC-PLAS-BVA-002      | Tìm kiếm từ khóa 255 ký tự (mốc biên trên)     | Fail     | Fail    | Fail   | BUG-PLAS-007 (SQLite Error)                 |
| TC-PLAS-BVA-003      | Tìm kiếm từ khóa ở biên trên (256 ký tự)       | Fail     | Fail    | Fail   | BUG-PLAS-007 (SQLite Error)                 |
| TC-PLAS-BVA-004      | Tìm kiếm SQLi (' OR '1'='1)                    | Fail     | Fail    | Fail   | BUG-PLAS-005 (SQL Injection leak)           |
| TC-PLAS-BVA-005      | Kiểm tra duy trì 1 thẻ h1 duy nhất             | Fail     | Fail    | Fail   | BUG-PLAS-001                                |
| TC-PLAS-BVA-006..007 | Tìm kiếm biên dưới                             | Pass     | Pass    | Pass   | Hoạt động đúng                              |
| TC-PLAS-BVA-008      | Tìm kiếm ngay dưới biên trên                   | Fail     | Fail    | Fail   | BUG-PLAS-007                                |
| TC-PLAS-BVA-009..010 | Tìm kiếm chữ số / kết hợp                      | Pass     | Pass    | Pass   | Hoạt động đúng                              |

## Danh sách lỗi phát hiện (Báo cáo lỗi tự động)

Các lỗi phát hiện trong quá trình kiểm thử tự động được ghi nhận tại thư mục `tests/bug-reports/automation/product-list-and-search/`:

- [BUG-PLAS-001](../../../../bug-reports/automation/product-list-and-search/BUG-PLAS-001.md): Vi phạm tiêu chuẩn SEO: Trang web tồn tại nhiều hơn một thẻ h1.
- [BUG-PLAS-002](../../../../bug-reports/automation/product-list-and-search/BUG-PLAS-002.md): Ảnh sản phẩm không có thuộc tính alt hoặc alt bị bỏ trống.
- [BUG-PLAS-003](../../../../bug-reports/automation/product-list-and-search/BUG-PLAS-003.md): Giá sản phẩm không hiển thị ký hiệu tiền tệ chuẩn ₫.
- [BUG-PLAS-004](../../../../bug-reports/automation/product-list-and-search/BUG-PLAS-004.md): Tìm kiếm từ khóa không tồn tại không hiển thị thông điệp báo trống (Empty State).
- [BUG-PLAS-005](../../../../bug-reports/automation/product-list-and-search/BUG-PLAS-005.md): Lỗ hổng bảo mật SQL Injection trên thanh tìm kiếm sản phẩm.
- [BUG-PLAS-006](../../../../bug-reports/automation/product-list-and-search/BUG-PLAS-006.md): Tìm kiếm từ khóa cực dài (300 ký tự) gây crash backend và lỗi HTTP 500.
- [BUG-PLAS-007](../../../../bug-reports/automation/product-list-and-search/BUG-PLAS-007.md): Tìm kiếm từ khóa ở biên trên (255/256 ký tự) gây lỗi SQLite Error.
- [BUG-PLAS-008](../../../../bug-reports/automation/product-list-and-search/BUG-PLAS-008.md): Từ khóa tìm kiếm có khoảng trắng thừa ở đầu/cuối không được cắt bỏ (Trim).
