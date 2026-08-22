# BUG-ADMUSER-002: Admin có thể tự xoá chính tài khoản đang đăng nhập

## Found by Test Case

TC-C-ADMUSER-ST-006 (case Extend, Source=HUMAN)

## Requirement liên quan

FR-19 ("Admin có thể xóa người dùng, **ngoại trừ không được xóa chính tài khoản đang đăng nhập**")

## Severity / Priority

Critical / P0

## Environment

- Tool: curl / Postman + Newman (folder `XT - [TC-C-ADMUSER-ST-006] Admin tự xoá chính mình bị chặn`)
- Backend: Node.js + Express + SQLite, chạy local tại `http://localhost:3000`
- Build: nhánh `hw06/23127211`, commit `47748c1`

## Steps to reproduce

1. Đăng nhập bằng tài khoản admin (`admin@eshop.com` / `Admin123!`), lấy `token` và `id` (= 1) của chính admin đó.
2. Gọi `DELETE /api/admin/users/1` (đúng id của chính admin đang gọi request) kèm token đó.
3. Gọi lại `GET /api/admin/users`.

```bash
ADMIN_TOKEN=$(curl -s -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@eshop.com","password":"Admin123!"}' | python3 -c "import json,sys;print(json.load(sys.stdin)['token'])")

curl -s -w "\nSTATUS:%{http_code}\n" -X DELETE http://localhost:3000/api/admin/users/1 \
  -H "Authorization: Bearer $ADMIN_TOKEN"

curl -s -w "\nSTATUS:%{http_code}\n" -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@eshop.com","password":"Admin123!"}'
```

## Expected result

Bước 2 phải bị từ chối (400/403/409 tuỳ quy ước lỗi nghiệp vụ của hệ thống) vì đây là chính tài khoản đang đăng nhập. Sau bước 2, admin vẫn còn trong hệ thống và đăng nhập lại được.

## Actual result

Bước 2 trả `200 OK`, tài khoản admin bị xoá thật khỏi DB. Sau đó đăng nhập lại bằng `admin@eshop.com/Admin123!` trả về `401 {"error":"Invalid email or password"}` — vì hệ thống chỉ seed đúng **1 tài khoản admin duy nhất**, bug này gây **mất hoàn toàn quyền truy cập khu vực admin**, không còn cách nào đăng nhập admin qua API công khai để khôi phục (phải restart backend để reseed DB).

## Evidence

- `tests/postman/reports/newman-report.json` — item `[TC-C-ADMUSER-ST-006] B1 - Admin gọi DELETE nhắm vào CHÍNH mình`: status thực tế = 200, url = `/api/admin/users/1`.
- Log console khi restart backend sau sự cố: `Database initialized and seeded (Phase 2).` (bằng chứng phải reseed DB mới đăng nhập lại được).

## Notes

Đây là bug **AI (skill sinh test case) bỏ sót ở vòng generate ban đầu** — chỉ được phát hiện ở bước Extend (skill `api-testcase-auditor`, phần "Ràng buộc xuyên endpoint") vì nó đòi hỏi hiểu quan hệ giữa `GET /api/admin/users` (endpoint được chọn test) và `DELETE /api/admin/users/:id` (endpoint chị em), điều mà AI không tự suy ra khi chỉ được giao 1 endpoint trong prompt.

Vì bug này **xoá thật** dữ liệu duy nhất trong bảng liên quan, không nên chạy lại case `XT - [TC-C-ADMUSER-ST-006]` trên môi trường có dữ liệu cần giữ mà không backup/restart DB trước.
