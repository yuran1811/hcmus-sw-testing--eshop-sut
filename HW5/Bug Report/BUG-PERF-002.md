# [BUG][Admin Bulk Import] Nghẽn I/O và tắc nghẽn Event Loop do xử lý Import sản phẩm dạng Synchronous lặp dòng trong Request Context

## Found by Test Case

- PERF-BULK-001 (Kịch bản Load & Endurance Test — Sampler: `POST /api/admin/import-products`)

## Requirement liên quan

- NFR-02 (Tối ưu hóa tài nguyên Event Loop và Disk I/O của Backend)
- API: `POST /api/admin/import-products`

## Severity / Priority

- **Severity**: Medium
- **Priority**: P2

## Environment

- Tool: Apache JMeter 5.6.3 / REST API Client
- OS: Windows 11 Home (64-bit)
- Backend: Node.js v20.x, Express.js 4.x
- Database: SQLite 3 (`backend/database.sqlite`)

## Steps to reproduce

1. Đăng nhập với tài khoản Admin để lấy Bearer Token.
2. Gửi request `POST /api/admin/import-products` với payload mảng JSON chứa 25 sản phẩm từ `products.csv`.
3. Kiểm tra mã nguồn tại `backend/server.js:199-241` và theo dõi thời gian phản hồi khi có nhiều request import đồng thời.

## Expected result

- Tác vụ Import số lượng lớn phải được thực thi trong một Database Transaction duy nhất (`BEGIN TRANSACTION ... COMMIT`), hoặc chuyển xuống Background Queue để trả về phản hồi tức thì (`202 Accepted`) cho client.

## Actual result

- Trong `backend/server.js:213-232`, ứng dụng lặp qua từng phần tử mảng bằng `rows.forEach()` và gọi `stmt.run()` riêng lẻ cho từng dòng ngoài transaction block.
- SQLite buộc phải thực hiện thao tác Disk Sync ghi đĩa lặp lại 25 lần cho mỗi request, làm nghẽn Event Loop của tiến trình Node.js và kéo dài thời gian phản hồi khi tải cao.

## Evidence

- Screenshot: ![Endurance Statistics Table](../results/endurance/evidences/endurance_statistics_table.png)
