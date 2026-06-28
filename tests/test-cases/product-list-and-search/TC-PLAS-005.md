# TC-PLAS-005: Tìm kiếm sản phẩm bằng từ khóa chứa mã độc HTML/XSS (Hiển thị an toàn)

## Requirement ID

FR-05

## Module / Test type / Technique

Product List & Search / Functional / Domain Testing (Equivalence Partitioning)

## Preconditions

- Cơ sở dữ liệu EShop đã có các sản phẩm (ví dụ: iPhone 15 Pro Max, MacBook Pro M3, Tai nghe AirPods Pro 2).
- Người dùng đang ở trang chủ EShop.

## Test data

| Field  | Value                           |
| ------ | ------------------------------- |
| search | "<script>alert('XSS')</script>" |

## Test steps

1. Truy cập trang chủ EShop (`http://localhost:5173`).
2. Nhập từ khóa `"<script>alert('XSS')</script>"` vào thanh tìm kiếm.
3. Bấm nút Tìm kiếm (hoặc nhấn Enter).
4. Quan sát xem trình duyệt có thực thi mã script (hiển thị popup alert) hoặc render HTML không.
5. Kiểm tra mã nguồn HTML của trang kết quả tìm kiếm để đảm bảo ký tự `<` và `>` được hiển thị dưới dạng an toàn (escaped HTML entity: `&lt;` và `&gt;`).

## Expected result

- Không có popup alert nào xuất hiện.
- Từ khóa tìm kiếm hiển thị dạng chuỗi văn bản thông thường (plain text) trên màn hình: `"<script>alert('XSS')</script>"`.
- Lưới sản phẩm hiển thị thông báo không tìm thấy sản phẩm phù hợp (empty state).
- Chỉ tồn tại đúng 1 thẻ `<h1>` duy nhất trên trang.

## EC / Partition Covered

EC5 (search = HTML/Script payload) + EC7 (DB có sản phẩm) + EC11 (tải dữ liệu hoàn tất) + OC3 (hiển thị từ khóa an toàn) + OC4 (đúng 1 thẻ `<h1>`)

## Status / Related bugs

Fail / BUG-PLAS-001, BUG-PLAS-005
