# BUG-ADMUSER-005: Token không hợp lệ trả về 403 thay vì 401

## Found by Test Case

TC-B-CART-SEC-002, SEC-003, SEC-004, TC-C-ADMUSER-SEC-002, SEC-003, SEC-005, SEC-006

## Requirement liên quan

SEC-02 ("Các API có tính bảo mật phải yêu cầu JWT Token hợp lệ") — quy ước chuẩn: 401 = chưa xác thực (token thiếu/sai/hết hạn), 403 = đã xác thực nhưng không đủ quyền

## Severity / Priority

Minor / P3

## Environment

- Tool: curl / Postman + Newman
- Backend: Node.js + Express + SQLite, chạy local tại `http://localhost:3000`
- Build: nhánh `hw06/23127211`, commit `47748c1`

## Steps to reproduce

```bash
# Token rỗng/rác
curl -s -w "\nSTATUS:%{http_code}\n" http://localhost:3000/api/admin/users \
  -H "Authorization: Bearer xxx"

# Token hết hạn (ký đúng secret, exp trong quá khứ)
curl -s -w "\nSTATUS:%{http_code}\n" http://localhost:3000/api/cart \
  -H "Authorization: Bearer <expiredToken>"
```

## Expected result

`401 Unauthorized` cho mọi trường hợp token rỗng/sai định dạng/hết hạn/sai chữ ký/`alg=none`.

## Actual result

Toàn bộ các trường hợp trên trả về `403 Forbidden` thay vì `401`.

## Evidence

`tests/postman/reports/newman-report.json` — 7 assertion FAIL, ví dụ `[TC-C-ADMUSER-SEC-002]`: message `expected response to have status code 401 but got 403`. Tương tự cho `TC-B-CART-SEC-002/003/004` và `TC-C-ADMUSER-SEC-003/005/006`.

## Notes

Mức độ ảnh hưởng thấp hơn 2 bug RBAC/self-delete (chỉ sai quy ước status code, không làm lộ dữ liệu hay bỏ qua xác thực — request vẫn bị chặn đúng), nhưng vẫn nên sửa vì client (frontend) thường phân biệt 2 mã này để điều hướng khác nhau (401 → chuyển về trang login, 403 → hiển thị "không đủ quyền"). Nếu middleware xác thực JWT hiện dùng chung 1 khối catch trả 403 cho mọi lỗi `jwt.verify`, cần tách rõ: lỗi verify (token sai/hết hạn) → 401; lỗi kiểm tra role sau khi verify thành công → 403 (áp dụng cùng lúc sẽ sửa luôn BUG-ADMUSER-001).
