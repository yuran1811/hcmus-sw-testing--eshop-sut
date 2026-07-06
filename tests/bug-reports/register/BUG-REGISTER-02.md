# BUG-02: Email không có ràng buộc duy nhất — đăng ký trùng email thành công

## Thông tin chung

| Trường | Giá trị |
|--------|---------|
| Bug ID | BUG-02 |
| Feature | FR-01 — Account Register |
| Severity | High |
| Status | Open |
| Ngày phát hiện | 2026-06-29 |
| Phát hiện bởi | Playwright DTT — TC-REGISTER-DTT-005 + API direct test |

## Mô tả

Cột `email` trong bảng `users` không có ràng buộc `UNIQUE`. Backend không kiểm tra xem email đã tồn tại hay chưa trước khi INSERT. Kết quả là nhiều tài khoản có thể được đăng ký với cùng một địa chỉ email, gây rủi ro bảo mật và nghiệp vụ nghiêm trọng.

## Steps to Reproduce

Gọi API trực tiếp hai lần với cùng email:

```bash
# Lần 1
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"User1","email":"duplicate@test.com","password":"pass1"}'

# Lần 2 — cùng email
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"User2","email":"duplicate@test.com","password":"pass2"}'
```

## Expected Result

Lần 2 trả về HTTP 409 với lỗi: *"Email đã được sử dụng"*.

## Actual Result

Cả 2 lần đều trả về `200 OK`:

```json
{"message":"User registered successfully","id":14}
{"message":"User registered successfully","id":15}
```

Có 2 bản ghi riêng biệt với cùng email trong DB.

## Root Cause

```javascript
// backend/database.js : 53
email TEXT,   // ← thiếu UNIQUE constraint
```

```javascript
// backend/server.js : 20–28
app.post("/api/register", (req, res) => {
  const { name, email, password } = req.body;
  db.run(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    // ← không có SELECT trước để kiểm tra email đã tồn tại
    [name, email, password],
    ...
  );
});
```

## Fix đề xuất

```javascript
// backend/database.js — thêm UNIQUE constraint:
email TEXT UNIQUE,

// backend/server.js — kiểm tra trước khi insert:
db.get("SELECT id FROM users WHERE email = ?", [email], (err, row) => {
  if (row) return res.status(409).json({ error: "Email đã được sử dụng." });
  db.run("INSERT INTO users ...", ...);
});
```

## Related TC

- TC-REGISTER-DTT-005 (C1=T, C2=F, C3=T, C4=T)
- TC-REGISTER-DTT-006 (C1=T, C2=F, C3=T, C4=F)
- TC-REGISTER-DTT-007 (C1=T, C2=F, C3=F, C4=T)
- TC-REGISTER-DTT-008 (C1=T, C2=F, C3=F, C4=F)
