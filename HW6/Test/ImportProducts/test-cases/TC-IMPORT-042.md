# TC-IMPORT-042: Kiểm thử lỗ hổng chèn công thức bảng tính CSV Formula Injection (CWE-1236) trong dữ liệu sản phẩm

## Requirement ID
FR-16

## Module / Test type / Technique
Import Products / Security (SEC-06 & CWE-1236) / CSV & Formula Injection

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Tài khoản Admin có Bearer JWT hợp lệ
- Header `X-Student-Id: 23127148` được đính kèm trong request

## Test data
| Field | Value |
|---|---|
| Endpoint | POST /api/admin/import-products |
| Header Authorization | Bearer {{adminToken}} |
| Header X-Student-Id | 23127148 |
| Body.products | Mảng sản phẩm chứa các payload công thức thực thi lệnh: `=cmd\|' /C calc'!A0`, `@SUM(1+1)*cmd\|' /C calc'!A0`, `-2+3+cmd\|' /C calc'!A0`, `+cmd\|' /C notepad'!A0` trong trường `name` và `description` |

## Test steps
1. Gửi HTTP POST request đến `/api/admin/import-products` chứa danh sách sản phẩm với các chuỗi bắt đầu bằng các ký tự đặc biệt công thức Excel/CSV (`=`, `@`, `+`, `-`)
2. Đính kèm header `X-Student-Id: 23127148` và `Authorization: Bearer {{adminToken}}`
3. Nhận response và kiểm tra trạng thái lưu trữ
4. Gửi `GET /api/products` để kiểm tra chuỗi dữ liệu trong database và phân tích nguy cơ thực thi mã độc client-side (DDE/Formula execution) khi người dùng quản trị xuất file CSV hoặc mở trên Excel/Calc

## Expected result
API tiếp nhận hoặc lọc ký tự nguy hiểm. Dữ liệu khi xuất ra hoặc hiển thị trên giao diện quản trị viên phải được escape an toàn (thêm dấu nháy đơn `'` ở đầu chuỗi) để vô hiệu hóa việc tự động thực thi công thức trên các ứng dụng bảng tính client.

## Status / Related bugs
Not Run / Security Consideration (CWE-1236)
