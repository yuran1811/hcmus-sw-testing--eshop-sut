# BUG-CART-002: Thêm cùng sản phẩm vào giỏ KHÔNG cộng dồn số lượng — luôn tạo dòng mới

## Found by Test Case

TC-B-CART-ST-002 (case có sẵn trong bộ audit; script Postman được enrich thêm bước gọi `GET /api/cart` để assert nội dung giỏ hàng, không chỉ status)

## Requirement liên quan

FR-07 ("Thêm cùng một sản phẩm vào giỏ hàng sẽ tăng số lượng, **không tạo dòng mới**")

## Severity / Priority

Major / P1

## Environment

- Tool: Postman + Newman
- Backend: Node.js + Express, chạy local tại `http://localhost:3000`
- Build: nhánh `hw06/23127211`, commit `47748c1`

## Steps to reproduce

Chạy collection `tests/postman/collections/eshop-hw06.postman_collection.json` (folder `API2 - POST /api/cart / ST - State transition / [TC-B-CART-ST-002]`):

1. `POST /api/cart` với `{"id":1,"quantity":2}` (item chưa có trong giỏ)
2. `POST /api/cart` lại với `{"id":1,"quantity":3}` (cùng id)
3. Script test tự gọi thêm `GET /api/cart` để kiểm tra nội dung giỏ hàng sau 2 bước trên

```bash
newman run tests/postman/collections/eshop-hw06.postman_collection.json \
  -e tests/postman/envs/local.postman_environment.json --reporters cli,json \
  --reporter-json-export tests/postman/reports/newman-report.json
```

## Expected result

`GET /api/cart` trả về **1 dòng duy nhất** cho `id=1`, `quantity=5` (2+3).

## Actual result

Assertion `Functional: [TC-B-CART-ST-002] Giỏ hàng chỉ có ĐÚNG 1 dòng cho id=1 (không tạo dòng mới) - FR-07` FAIL. Giỏ hàng chứa **nhiều dòng riêng biệt** cùng `id=1` thay vì 1 dòng gộp.

## Evidence

`tests/postman/reports/newman-report.json` — item `[TC-B-CART-ST-002]`, message assertion:
`Số dòng id=1 hiện tại trong giỏ: [{"id":1,...,"quantity":2},{"id":1,...,"quantity":3},...]`
(nhiều dòng thay vì 1 dòng `quantity:5`). Xem thêm `tests/postman/reports/newman-report.html`.

## Notes

Nguyên nhân gốc (`backend/server.js` dòng 290-295): `POST /api/cart` chỉ làm `userCarts[userId].push(req.body)` — luôn thêm phần tử mới vào mảng, không hề kiểm tra `id` đã tồn tại trong giỏ hay chưa. Đây là lỗi nghiệp vụ cốt lõi của tính năng giỏ hàng.

`TC-B-CART-ST-002` trong bộ test đã audit **được thiết kế đúng để bắt bug này** ngay từ vòng generate ban đầu, nhưng script Postman tự sinh lúc đầu chỉ assert `status === 200`, không assert nội dung giỏ hàng — nên Newman không báo fail dù bug đã tồn tại từ đầu. Sau khi enrich script (gọi thêm `GET /api/cart` và assert số dòng + quantity), bug lộ ra ngay — minh chứng cụ thể cho phát hiện ở vòng review độc lập Entry #3 ("86% case chỉ assert status").
