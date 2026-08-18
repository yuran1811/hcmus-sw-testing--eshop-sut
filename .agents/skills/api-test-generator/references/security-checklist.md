# Security Checklist cho API test (SEC-01 → SEC-07)

## Nguyên tắc đầu tiên

`api_specification.md` của EShop định nghĩa cụ thể SEC-01..SEC-07. **Đọc nguyên văn mục đó và map từng SEC vào bảng dưới**, đừng giả định SEC-03 là cái gì dựa trên trí nhớ. Bảng dưới là danh mục kỹ thuật chung để đối chiếu, không phải nội dung SEC của SUT.

Lập bảng truy vết trước khi sinh case:

| SEC ID | Nội dung nguyên văn trong spec | Nhóm kỹ thuật tương ứng | TC_ID phủ |
|---|---|---|---|
| SEC-01 | ... | ... | TC-...-SEC-001, 002 |

Mọi SEC xuất hiện trong spec phải có ít nhất 1 TC. SEC nào không áp dụng cho endpoint đang xét thì ghi "N/A + lý do" chứ không bỏ trống.

---

## Danh mục kỹ thuật

### A. Authentication (401)

- Không gửi `Authorization` header
- Token rỗng / chuỗi rác `Bearer xxx`
- Token hết hạn
- Token đúng định dạng nhưng sai chữ ký
- Token thuật toán `none` (JWT alg confusion)
- Token của user đã bị xoá / đã bị khoá
- Token cũ vẫn dùng được sau khi user đổi mật khẩu (nên bị vô hiệu)

### B. Authorization / RBAC (403)

- User thường gọi endpoint admin → **403, không phải 401**
- Guest gọi endpoint user → 401
- Admin gọi endpoint user thường (thường được phép — xác nhận với spec)
- Truy cập bằng đúng token nhưng sai scope

Tách bạch 401 và 403 luôn là 2 test case riêng. Gộp lại thì lỗi phân quyền thật sẽ bị che.

### C. IDOR / BOLA — Broken Object Level Authorization

Đây là nhóm AI hay bỏ sót nhất vì cần hiểu quan hệ dữ liệu, không suy ra được từ chữ ký endpoint.

- User A gọi `GET /api/orders/{id_của_B}` → kỳ vọng 403/404, tuyệt đối không 200
- User A gọi `PUT /api/cart/items/{id_của_B}`
- Đoán id tuần tự: thử id ± 1 quanh id của mình
- Truy cập resource đã bị xoá mềm
- Đọc profile user khác qua `GET /api/users/{id}`

### D. Injection

| Loại | Payload kiểm tra | Kỳ vọng |
|---|---|---|
| SQLi (bool) | `' OR '1'='1` | không 500, không trả về toàn bộ bản ghi |
| SQLi (union) | `' UNION SELECT null,null--` | không 500, không lộ cột |
| SQLi (time) | `'; WAITFOR DELAY '0:0:5'--` | response time không tăng đột biến |
| NoSQL | `{"$ne": null}` trong field string | 400 hoặc xử lý như string |
| XSS stored | `<script>alert(1)</script>` vào field tên/mô tả | lưu escaped hoặc từ chối 400; khi GET lại không trả về nguyên payload thực thi được |
| Command inj | `; ls -la`, `$(whoami)` | không 500, không lộ output shell |
| Path traversal | `../../etc/passwd` trong tên file CSV/ảnh | 400, không đọc được file ngoài thư mục |
| Header inj | `\r\nX-Injected: 1` trong giá trị header | bị strip |

Chỉ chạy trên deployment local của SUT. Payload nhằm kiểm tra *hành vi sanitize*, không nhằm phá dữ liệu — tránh payload dạng `DROP TABLE` trên môi trường có dữ liệu cần giữ.

### E. Mass assignment / privilege escalation

Gửi thêm field không có trong spec vào body:

- `{"role": "admin"}` hoặc `{"isAdmin": true}` khi đăng ký / cập nhật profile
- `{"id": 999}` khi tạo resource (ghi đè id)
- `{"price": 0}` hoặc `{"total": 0}` khi checkout — server phải tính lại, không tin client
- `{"status": "delivered"}` khi user tạo đơn
- `{"createdAt": "1990-01-01"}` ghi đè metadata hệ thống

Kỳ vọng: field bị bỏ qua (2xx nhưng giá trị không đổi) hoặc bị từ chối 400. Nếu 2xx **và** giá trị được áp dụng → đây là bug nghiêm trọng, ghi vào bug report.

### F. Rate limiting / brute force / lockout

- Gửi N+1 request đăng nhập sai → khoá tài khoản theo FR-02 hoặc 429
- Đăng nhập đúng mật khẩu khi tài khoản đang bị khoá → vẫn phải bị chặn
- Bộ đếm lockout có reset sai không (đăng nhập đúng giữa chừng có xoá bộ đếm?)
- Spam endpoint gửi mail reset password
- Response có header `Retry-After` / `X-RateLimit-Remaining` không

### G. Information disclosure

- Response chứa `password`, `passwordHash`, `salt`, token của user khác
- Lỗi 500 trả về stack trace / tên bảng / connection string
- Thông báo lỗi login phân biệt "email không tồn tại" vs "sai mật khẩu" → cho phép enumeration
- Thời gian phản hồi khác nhau giữa email tồn tại và không tồn tại (timing side channel)
- Header lộ phiên bản server / framework

### H. Transport & header (kiểm tra ở mức có thể với deployment local)

- `X-Content-Type-Options: nosniff`
- `Access-Control-Allow-Origin` không phải `*` nếu API có credential
- Content-Type ép buộc: gửi `text/plain` với body JSON → 415
- Method không được hỗ trợ → 405, không 500

---

## Mẫu ghi test case security

```
TC_ID:       TC-C-ORDER-SEC-007
Category:    SEC
Spec ref:    SEC-04 (IDOR)
Title:       Từ chối truy cập chi tiết đơn hàng của người dùng khác
Precondition: userA có token hợp lệ; order #1002 thuộc về userB
Request:     GET /api/orders/1002
Headers:     Authorization: Bearer {{tokenUserA}}, X-Student-Id: {StudentID}
Expected:    403 hoặc 404; body KHÔNG chứa thông tin đơn của userB
Note:        Nếu trả 200 -> bug nghiêm trọng, mở GitHub Issue
```
