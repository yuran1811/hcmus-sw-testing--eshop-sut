# BUG-REGISTER-005: Lộ header X-Powered-By và mở CORS wildcard (*) cho mọi endpoint, kể cả API admin

## Found by Test Case

TC-A-REGISTER-SEC-009, TC-B-CART-SEC-009, TC-C-ADMUSER-SEC-012

## Requirement liên quan

SEC checklist nhóm H (Transport & header — "Header lộ phiên bản server", "Access-Control-Allow-Origin không phải `*` nếu API có credential"); FR-12 (endpoint admin cần kiểm soát truy cập chặt)

## Severity / Priority

Minor / P2

## Environment

- Tool: Postman + Newman
- Backend: Node.js + Express, chạy local tại `http://localhost:3000`
- Build: nhánh `hw06/23127211`, commit `47748c1`

## Steps to reproduce

Chạy collection `tests/postman/collections/eshop-hw06.postman_collection.json`, 3 case: `[TC-A-REGISTER-SEC-009]` (`POST /api/register`), `[TC-B-CART-SEC-009]` (`GET /api/cart`), `[TC-C-ADMUSER-SEC-012]` (`GET /api/admin/users`).

## Expected result

Response không có header `X-Powered-By`; header `Access-Control-Allow-Origin` không phải `*` cho các endpoint có xử lý dữ liệu người dùng — đặc biệt `GET /api/admin/users` (dữ liệu nhạy cảm nhất).

## Actual result

Cả 3 case đều FAIL cả 2 assertion:
- `Security: [...] Response KHÔNG lộ header X-Powered-By` → thực tế có `X-Powered-By: Express`.
- `Security: [...] Access-Control-Allow-Origin KHÔNG phải wildcard "*"` → thực tế là `*` trên cả 3 endpoint.

## Evidence

`tests/postman/reports/newman-report.json` — 6 assertion FAIL (2 assertion × 3 test case), cùng dạng `expected 'Express' to be null` và `expected '*' to not deeply equal '*'`.

## Notes

Nguyên nhân gốc (`backend/server.js` dòng 11): `app.use(cors())` không truyền option nào → mặc định cho phép **mọi origin**. `X-Powered-By: Express` là header mặc định của Express, không bị tắt (`app.disable('x-powered-by')`).

Mức độ ảnh hưởng: 1 bug cấu hình DUY NHẤT (global middleware) áp dụng cho TOÀN BỘ endpoint của hệ thống, không riêng 3 API đã chọn — nên gộp thành 1 bug report thay vì lặp lại 3 lần. Kết hợp với BUG-ADMUSER-001 (không kiểm tra role) thì CORS wildcard trên `GET /api/admin/users` làm tăng mức độ nghiêm trọng: một trang web bất kỳ có thể gọi thẳng endpoint admin từ trình duyệt của nạn nhân nếu nạn nhân đang có token hợp lệ lưu ở nơi JS truy cập được.
