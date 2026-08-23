# BUG-CART-003: Giá sản phẩm không được đối chiếu với DB — server tin hoàn toàn vào price client gửi

## Found by Test Case

TC-B-CART-DP-012 (case có sẵn trong bộ audit; script Postman được enrich thêm bước gọi `GET /api/products/1` + `GET /api/cart` để so sánh giá lưu thực tế với giá thật trong DB)

## Requirement liên quan

Tinh thần FR-08 ("Backend phải tự tính lại tổng tiền; không chấp nhận giá trị `total_amount` do client gửi lên") — nguyên tắc này phải áp dụng ngay từ bước thêm giỏ, không chỉ ở checkout

## Severity / Priority

Major / P1

## Environment

- Tool: Postman + Newman
- Backend: Node.js + Express, chạy local tại `http://localhost:3000`
- Build: nhánh `hw06/23127211`, commit `47748c1`

## Steps to reproduce

Chạy collection `tests/postman/collections/eshop-hw06.postman_collection.json` (folder `API2 - POST /api/cart / DP - Domain partition / [TC-B-CART-DP-012]`):

1. `POST /api/cart` với `{"id":1,"name":"Sản phẩm A","price":1,"quantity":10}` — sản phẩm `id=1` (iPhone 15 Pro Max) giá thật trong DB là 30.000.000đ.
2. Script test tự gọi `GET /api/products/1` (lấy giá thật) rồi `GET /api/cart` (xem giá đã lưu) để so sánh.

## Expected result

Server tự tra giá thật của sản phẩm `id=1` trong bảng `products`, KHÔNG dùng `price=1` client gửi. Nếu server không đối chiếu được, ít nhất phải từ chối request.

## Actual result

Assertion `Security: [TC-B-CART-DP-012] Server KHÔNG được lưu giá giả mạo (price=1) - phải tự tra giá thật trong DB` FAIL — item được lưu **đúng với `price:1`** như client gửi, hoàn toàn không đối chiếu với giá thật trong bảng `products`.

## Evidence

`tests/postman/reports/newman-report.json` — item `[TC-B-CART-DP-012]`, message assertion:
`Tìm thấy item với price=1 do client gửi, server không đối chiếu DB: expected { id: 1, name: 'Sản phẩm A', ... } to be undefined`.

## Notes

Nguyên nhân gốc: `POST /api/cart` (`backend/server.js` dòng 290-295) làm `userCarts[userId].push(req.body)` — lưu THẲNG object client gửi, không hề `SELECT` bảng `products` để tra giá thật. Đây là **lỗ hổng nghiêm trọng nhất tìm được ở API giỏ hàng**: kết hợp với việc `POST /api/checkout` (`backend/server.js` dòng 297-309) cũng nhận thẳng `total_amount` từ client mà KHÔNG hề đọc `userCarts` hay bảng `products` để tính lại — toàn bộ luồng mua hàng của hệ thống này **không có bất kỳ điểm nào server tự tính giá**, cho phép đặt hàng với giá tuỳ ý nếu client tự soạn request. `POST /api/checkout` không thuộc phạm vi 3 API được chọn cho HW06 này nhưng cần audit riêng vì mức độ nghiêm trọng.
