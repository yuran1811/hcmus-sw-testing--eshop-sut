Title: [BUG][Import Products] Thao tác batch import thiếu tính nguyên tử giao dịch (Transaction Atomicity / Rollback Absence) khi có lỗi giữa chừng

## Found by Test Case
TC-IMPORT-041 (Human Extended Test Case)

## Requirement liên quan
FR-16 (CSV Product Batch Import), ACID Transaction Integrity (ISO/IEC 25010)

## Severity / Priority
Medium / P3

## Environment
- OS: Windows 11 / Linux Ubuntu 22.04
- SUT Base URL: `http://localhost:3000`
- Target Endpoint: `POST /api/admin/import-products`
- Tool: Postman v10+ / Newman CLI v6.2.2

## Steps to reproduce
1. Gửi HTTP `POST` request đến `/api/admin/import-products` với payload mảng 3 sản phẩm:
   - Item 1: Dữ liệu hoàn toàn hợp lệ
   - Item 2: Dữ liệu vi phạm (thiếu `name`)
   - Item 3: Dữ liệu hoàn toàn hợp lệ
2. Quan sát response trả về (`inserted: 2`, `errors: ['Hàng 3: Thiếu tên sản phẩm']`).
3. Truy vấn `GET /api/products` để kiểm tra các bản ghi trong cơ sở dữ liệu.

## Expected result
Đối với thao tác nhập dữ liệu hàng loạt (Batch Processing), tùy theo yêu cầu nghiệp vụ nghiêm ngặt về tính toàn vẹn (All-or-Nothing / Atomic Transaction), nếu một hàng trong batch bị lỗi, hệ thống phải cung cấp cơ chế rollback toàn bộ lô dữ liệu (`BEGIN TRANSACTION ... ROLLBACK`) để tránh tình trạng dữ liệu mồ côi (Partial Inconsistent State).

## Actual result
SUT sử dụng vòng lặp `rows.forEach` gọi `stmt.run` mà **không bao bọc trong transaction**:
```javascript
rows.forEach((row, index) => { ... stmt.run(...) });
```
Hệ thống âm thầm commit các dòng hợp lệ (Item 1 và Item 3) và bỏ qua dòng lỗi, không hỗ trợ chế độ giao dịch nguyên tử (Atomic Rollback) khi quản trị viên cần đảm bảo toàn bộ file CSV phải hợp lệ 100% mới được nạp vào kho.

## Evidence
- Mã nguồn tại `backend/server.js:209-240`.
- Cơ chế thực thi bất đồng bộ không có lệnh `db.run('BEGIN TRANSACTION')`.
