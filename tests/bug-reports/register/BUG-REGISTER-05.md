# BUG-05: Backend không có validation — API có thể bypass mọi kiểm tra frontend

## Thông tin chung

| Trường | Giá trị |
|--------|---------|
| Bug ID | BUG-05 |
| Feature | FR-01 — Account Register |
| Severity | Critical |
| Status | Open |
| Ngày phát hiện | 2026-06-29 |
| Phát hiện bởi | API direct test (curl) |

## Mô tả

API `POST /api/register` không thực hiện bất kỳ validation nào: không kiểm tra định dạng email, không kiểm tra độ mạnh mật khẩu, không kiểm tra email trùng. Toàn bộ validation chỉ nằm ở frontend JavaScript.

Bất kỳ ai biết endpoint đều có thể gọi API trực tiếp (curl, Postman, script) để:
- Tạo tài khoản với email không hợp lệ
- Tạo tài khoản với mật khẩu cực yếu (kể cả chuỗi rỗng)
- Tạo nhiều tài khoản trùng email

Ngoài ra, **mật khẩu được lưu dưới dạng plaintext** trong DB — vi phạm nguyên tắc bảo mật cơ bản, nếu DB bị lộ toàn bộ mật khẩu người dùng bị compromised ngay lập tức.

## Steps to Reproduce

```bash
# Tạo tài khoản với dữ liệu hoàn toàn không hợp lệ, bypass frontend:
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Hacker","email":"notanemail!!!","password":"1"}'
```

## Expected Result

API trả về HTTP 400:
```json
{"error": "Email không đúng định dạng."}
```

## Actual Result

```json
{"message":"User registered successfully","id":16}
```

Tài khoản được tạo thành công với email `notanemail!!!` và password `1` lưu plaintext trong DB.

## Root Cause

```javascript
// backend/server.js : 20–28
app.post("/api/register", (req, res) => {
  const { name, email, password } = req.body;
  // ↑ Không validate gì — nhận gì INSERT nấy
  db.run(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, password],  // ← password lưu plaintext, không hash
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "User registered successfully", id: this.lastID });
    },
  );
});
```

## Fix đề xuất

```javascript
// backend/server.js
const bcrypt = require('bcrypt');

app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;

  // 1. Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Email không đúng định dạng." });
  }

  // 2. Validate password strength
  const strongPwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!strongPwdRegex.test(password)) {
    return res.status(400).json({ error: "Mật khẩu quá yếu." });
  }

  // 3. Check email uniqueness
  db.get("SELECT id FROM users WHERE email = ?", [email], async (err, row) => {
    if (row) return res.status(409).json({ error: "Email đã được sử dụng." });

    // 4. Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10);
    db.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Đăng ký thành công.", id: this.lastID });
      }
    );
  });
});
```

## Related TC

Ảnh hưởng toàn bộ 12 TC — mọi validation frontend đều có thể bị bypass qua API trực tiếp.
