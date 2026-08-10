# Báo cáo Kết quả Kiểm thử Tự động - Phân hệ Category (FR-14)

Thư mục này chứa các kịch bản kiểm thử tự động bằng Playwright cho tính năng Quản lý Danh mục (FR-14 Category).

## Thông tin chạy test

- **Ngày thực hiện**: 2026-08-09
- **Người thực hiện**: Mạch Quốc Tấn
- **Công cụ**: Playwright v1.40+ (TypeScript)
- **Môi trường chạy**: Localhost (Backend: port 3000, Frontend Admin: port 5174)
- **Trình duyệt kiểm thử**: Chromium, Firefox, WebKit (Đa trình duyệt)

## Kết quả tổng quan

- **Tổng số kịch bản chạy (Browser Runs)**: 102 lượt (34 kịch bản × 3 trình duyệt)
- **Số lượt Pass**: 58
- **Số lượt Fail**: 44

## Danh sách các kịch bản kiểm thử

| Mã Test Case             | Tên Kịch bản                                         | Chromium | Firefox | WebKit | Ghi chú                           |
| :----------------------- | :--------------------------------------------------- | :------- | :------ | :----- | :-------------------------------- |
| TC-CATEGORY-001          | Thêm danh mục thành công tên hợp lệ                  | Pass     | Pass    | Pass   | Hoạt động đúng                    |
| TC-CATEGORY-002          | Thêm danh mục thất bại khi tên rỗng                  | Fail     | Fail    | Fail   | BUG-CATEGORY-001                  |
| TC-CATEGORY-003          | Thêm danh mục thất bại khi tên chỉ chứa khoảng trắng | Fail     | Fail    | Fail   | BUG-CATEGORY-002                  |
| TC-CATEGORY-004          | Xem danh sách danh mục thành công                    | Pass     | Fail    | Fail   | Lỗi trên Firefox/WebKit           |
| TC-CATEGORY-005          | Xóa danh mục thành công                              | Pass     | Pass    | Pass   | Hoạt động đúng                    |
| TC-CATEGORY-006          | Xóa danh mục không tồn tại                           | Pass     | Pass    | Pass   | BUG-CATEGORY-003 (Báo thành công) |
| TC-CATEGORY-007          | Thêm danh mục không token                            | Pass     | Pass    | Pass   | Chặn đúng (401)                   |
| TC-CATEGORY-008          | Thêm danh mục với token user thường                  | Fail     | Fail    | Fail   | BUG-CATEGORY-004 (403 bypass)     |
| TC-CATEGORY-009          | Xóa danh mục có sản phẩm liên kết                    | Fail     | Fail    | Fail   | BUG-CATEGORY-010 (Orphan records) |
| TC-CATEGORY-010          | Xóa danh mục không token                             | Pass     | Pass    | Pass   | Chặn đúng (401)                   |
| TC-CATEGORY-011          | Xóa danh mục với token user thường                   | Fail     | Fail    | Fail   | BUG-CATEGORY-005 (403 bypass)     |
| TC-CATEGORY-012          | Thêm danh mục thiếu thuộc tính name                  | Fail     | Fail    | Fail   | BUG-CATEGORY-006                  |
| TC-CATEGORY-013-1        | name = null                                          | Fail     | Fail    | Fail   | BUG-CATEGORY-007                  |
| TC-CATEGORY-013-2        | name = 123                                           | Fail     | Fail    | Fail   | BUG-CATEGORY-007                  |
| TC-CATEGORY-013-3        | name = true                                          | Fail     | Fail    | Fail   | BUG-CATEGORY-007                  |
| TC-CATEGORY-013-4        | name = []                                            | Fail     | Fail    | Fail   | BUG-CATEGORY-007                  |
| TC-CATEGORY-013-5        | name = {}                                            | Fail     | Fail    | Fail   | BUG-CATEGORY-007                  |
| TC-CATEGORY-014          | Thêm danh mục tên Unicode/Emoji                      | Pass     | Pass    | Pass   | Hoạt động đúng                    |
| TC-CATEGORY-015          | Trùng tên danh mục                                   | Pass     | Pass    | Pass   | Hoạt động đúng                    |
| TC-CATEGORY-016          | Tên danh mục chứa XSS                                | Pass     | Pass    | Pass   | Hoạt động đúng                    |
| TC-CATEGORY-017          | Tên danh mục chứa SQLi                               | Pass     | Pass    | Pass   | Hoạt động đúng                    |
| TC-CATEGORY-018-1..002   | Token sai chữ ký / hết hạn                           | Pass     | Pass    | Pass   | 2 biến thể đều hoạt động đúng     |
| TC-CATEGORY-019-1        | DELETE với ID sai cú pháp (abc)                      | Fail     | Fail    | Fail   | BUG-CATEGORY-008 (500 Error)      |
| TC-CATEGORY-019-2        | DELETE với ID sai cú pháp (1.5)                      | Fail     | Fail    | Fail   | BUG-CATEGORY-008 (500 Error)      |
| TC-CATEGORY-020          | Xóa lặp cùng ID                                      | Pass     | Pass    | Pass   | Hoạt động đúng                    |
| TC-CATEGORY-BVA-001..002 | Biên ký tự độ dài tên hợp lệ                         | Pass     | Pass    | Pass   | Hoạt động đúng                    |
| TC-CATEGORY-BVA-003      | DELETE với ID dưới mốc tham chiếu                    | Fail     | Fail    | Fail   | BUG-CATEGORY-009 (500 Error)      |
| TC-CATEGORY-BVA-004..008 | Các kịch bản biên khác                               | Pass     | Pass    | Pass   | Hoạt động đúng                    |

## Danh sách lỗi phát hiện (Báo cáo lỗi tự động)

Các lỗi phát hiện trong quá trình kiểm thử tự động được ghi nhận tại thư mục `tests/bug-reports/automation/category/`:

- [BUG-CATEGORY-001](../../../../bug-reports/automation/category/BUG-CATEGORY-001.md): API chấp nhận thêm mới danh mục với tên rỗng.
- [BUG-CATEGORY-002](../../../../bug-reports/automation/category/BUG-CATEGORY-002.md): API chấp nhận thêm mới danh mục với tên chỉ chứa khoảng trắng.
- [BUG-CATEGORY-003](../../../../bug-reports/automation/category/BUG-CATEGORY-003.md): Báo xóa thành công danh mục không tồn tại thay vì phản hồi lỗi hợp lý.
- [BUG-CATEGORY-004](../../../../bug-reports/automation/category/BUG-CATEGORY-004.md): Lỗi phân quyền, cho phép tài khoản user thường thêm danh mục.
- [BUG-CATEGORY-005](../../../../bug-reports/automation/category/BUG-CATEGORY-005.md): Lỗi phân quyền, cho phép tài khoản user thường xóa danh mục.
- [BUG-CATEGORY-006](../../../../bug-reports/automation/category/BUG-CATEGORY-006.md): API chấp nhận thêm mới danh mục khi payload thiếu thuộc tính name.
- [BUG-CATEGORY-007](../../../../bug-reports/automation/category/BUG-CATEGORY-007.md): API chấp nhận thêm mới danh mục khi name sai kiểu dữ liệu.
- [BUG-CATEGORY-008](../../../../bug-reports/automation/category/BUG-CATEGORY-008.md): API DELETE không validate ID dạng chuỗi/số thực dẫn đến SQLite syntax error.
- [BUG-CATEGORY-009](../../../../bug-reports/automation/category/BUG-CATEGORY-009.md): API DELETE không validate ID nằm ngoài biên (0, -1) dẫn đến SQLite error.
- [BUG-CATEGORY-010](../../../../bug-reports/automation/category/BUG-CATEGORY-010.md): Xóa danh mục không xử lý các sản phẩm liên kết gây orphan records.
