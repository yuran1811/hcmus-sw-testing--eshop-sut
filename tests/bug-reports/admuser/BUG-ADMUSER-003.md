# BUG-ADMUSER-003: GET /api/admin/users trả field name = null cho user tạo bởi dữ liệu không hợp lệ

## Found by Test Case

TC-C-ADMUSER-SCH-001 (assertion bổ sung ở vòng review độc lập trên Postman collection — xem `docs/anh-khoa/ai-audit-report.md`, mục "Đánh giá độc lập ... Entry #3")

## Requirement liên quan

FR-19 (Quản lý người dùng — Admin xem danh sách tất cả người dùng); liên quan trực tiếp tới BUG-REGISTER-001 (nguyên nhân gốc)

## Severity / Priority

Major / P2

## Environment

- Tool: Postman + Newman
- Backend: Node.js + Express + SQLite, chạy local tại `http://localhost:3000`
- Build: nhánh `hw06/23127211`, commit `47748c1`

## Steps to reproduce

1. Chạy `TC-A-REGISTER-DP-003` (`POST /api/register` với `name: null`) — do BUG-REGISTER-001, request này thành công (200), tạo 1 user với `name = null` trong DB.
2. Đăng nhập admin, gọi `GET /api/admin/users`.

```bash
curl -s -X POST http://localhost:3000/api/register -H "Content-Type: application/json" \
  -d '{"name":null,"email":"nullname-test@domain.com","password":"Password123!"}'

ADMIN_TOKEN=$(curl -s -X POST http://localhost:3000/api/login -H "Content-Type: application/json" \
  -d '{"email":"admin@eshop.com","password":"Admin123!"}' | python3 -c "import json,sys;print(json.load(sys.stdin)['token'])")

curl -s http://localhost:3000/api/admin/users -H "Authorization: Bearer $ADMIN_TOKEN" | python3 -m json.tool
```

## Expected result

`name` của mọi user trong danh sách phải là chuỗi (string) hợp lệ. Nếu hệ thống lỡ chấp nhận `name: null` khi đăng ký (BUG-REGISTER-001), endpoint đọc danh sách vẫn nên chuẩn hoá/lọc dữ liệu output (ít nhất trả chuỗi rỗng thay vì `null`) để không phá vỡ hợp đồng dữ liệu (contract) với client.

## Actual result

Phần tử tương ứng trong mảng trả về có `"name": null` nguyên văn — không được chuẩn hoá.

## Evidence

`tests/postman/reports/newman-report.json` — request `[TC-C-ADMUSER-SCH-001]`, assertion `Contract: [TC-C-ADMUSER-SCH-001] Response là mảng, mỗi phần tử có id(number)/name(string)/email(string)/role(string)` FAIL với message `user[8].name: expected null to be a string`.

## Notes

Đây là bug **dây chuyền** (chained defect): nguyên nhân gốc là BUG-REGISTER-001 (không validate `name` khi đăng ký), nhưng triệu chứng lộ ra ở một endpoint hoàn toàn khác (`GET /api/admin/users`). Bug này CHỈ bị phát hiện sau khi bộ script Postman được viết assertion đủ chặt (kiểm tra kiểu dữ liệu từng field thay vì chỉ status code) — minh chứng cho việc script chỉ assert status (baseline ban đầu) sẽ bỏ sót các lỗi kiểu này. Sửa BUG-REGISTER-001 (validate `name` không được null/rỗng khi đăng ký) sẽ ngăn được cả bug này ở nguồn.
