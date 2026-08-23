# BUG-CART-004: Giỏ hàng lưu trong bộ nhớ (in-memory), mất dữ liệu khi server restart

> **Lưu ý quy trình:** bug này KHÔNG được xác nhận qua 1 lần chạy Postman/Newman tự động (đòi hỏi restart backend giữa chừng, ngoài khả năng của 1 collection run). Đây là quan sát từ đọc code (`backend/server.js` dòng 14), giữ lại làm tài liệu tham khảo nhưng KHÔNG tính vào KPI "5 bug/API phát hiện qua test case" — 5 bug chính thức của API cart nằm ở BUG-CART-001, 002, 003, 005 và BUG-CORS-001.

## Found by Test Case

Không có — quan sát qua đọc code, không tự động hoá được qua 1 lần chạy collection (xem lưu ý trên)

## Requirement liên quan

FR-07 (Giỏ hàng) — không có yêu cầu tường minh về persistence trong spec, nhưng một giỏ hàng mất trắng khi server restart/deploy lại là hành vi không chấp nhận được với bất kỳ hệ thống thương mại điện tử nào

## Severity / Priority

Major / P2

## Environment

- Tool: curl + thao tác thủ công restart backend
- Backend: Node.js + Express, chạy local tại `http://localhost:3000`
- Build: nhánh `hw06/23127211`, commit `47748c1`

## Steps to reproduce

1. Đăng nhập, thêm 1 sản phẩm vào giỏ (`POST /api/cart`).
2. `GET /api/cart` xác nhận item tồn tại.
3. Restart backend (`Ctrl+C` rồi `npm run dev` lại — hoặc kill process rồi chạy lại `node server.js`).
4. Đăng nhập lại (cùng tài khoản), `GET /api/cart`.

## Expected result

Giỏ hàng vẫn còn item đã thêm ở bước 1 (dữ liệu người dùng phải được lưu bền vững — persistent).

## Actual result

`GET /api/cart` trả về mảng rỗng `[]` — toàn bộ dữ liệu giỏ hàng của MỌI người dùng bị mất sau khi restart server.

## Evidence

Quan sát trực tiếp: `backend/server.js` dòng 14 khai báo `const userCarts = {};` — biến JavaScript thuần trong bộ nhớ tiến trình Node.js, không có bất kỳ thao tác đọc/ghi nào xuống `database.sqlite` hay file nào khác cho dữ liệu giỏ hàng (khác với `users`, `products`, `orders` đều có bảng riêng trong `backend/database.js`).

## Notes

Ngoài việc mất dữ liệu khi restart, thiết kế này còn khiến hệ thống **không chạy được với nhiều instance backend** (load balancing/horizontal scaling) vì mỗi instance có 1 bản `userCarts` riêng trong bộ nhớ, không đồng bộ giữa các instance. Không phải bug có thể phát hiện qua 1 request đơn lẻ — cần quy trình 2 bước có restart server, tương tự các case MANUAL đã ghi trong `tests/postman/README.md`.
