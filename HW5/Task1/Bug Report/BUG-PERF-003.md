# [BUG][Auth Service] Cơ chế phạt Lockout tăng bậc số nhân (login_attempts += 2) gây nguy cơ Denial-of-Service (DoS) cho tài khoản Admin

## Found by Test Case

- PERF-AUTH-001 (Kịch bản Authentication Under Load & Code Review)

## Requirement liên quan

- FR-01 (Xác thực đăng nhập và cơ chế chống brute-force)
- Endpoint: `POST /api/login`

## Severity / Priority

- **Severity**: Medium
- **Priority**: P2

## Environment

- Tool: Postman / cURL / JMeter
- OS: Windows 11
- Backend: Node.js v20.x, Express.js 4.x
- Source Code: `backend/server.js:54-58`

## Steps to reproduce

1. Gửi request `POST /api/login` với email `admin@eshop.com` và mật khẩu sai lần thứ 1.
2. Gửi request `POST /api/login` với email `admin@eshop.com` và mật khẩu sai lần thứ 2.
3. Gửi request `POST /api/login` với mật khẩu đúng `Admin123!`.

## Expected result

- Hệ thống chỉ khóa tài khoản sau **5 lần nhập sai liên tiếp** (`login_attempts += 1` mỗi lần). Ở lần thứ 3 nhập đúng, người dùng phải đăng nhập thành công.

## Actual result

- Tại `backend/server.js:54`, mã nguồn ghi nhận `const newAttempts = user.login_attempts + 2;` và nếu `newAttempts >= 3` sẽ gán `lockedUntil = new Date(Date.now() + 180000)`.
- Kết quả: Sau đúng 2 lần thử sai, `newAttempts = 4 >= 3` $\rightarrow$ tài khoản Admin bị khóa 3 phút ngay lập tức. Khi chạy test tải có packet drop ngẫu nhiên, tài khoản bị khóa hàng loạt làm gián đoạn toàn bộ workflow (Account Denial-of-Service).

## Evidence

- Trích xuất mã nguồn `backend/server.js:54-62`:
  ```javascript
  const newAttempts = user.login_attempts + 2;
  let lockedUntil = null;
  if (newAttempts >= 3) {
    lockedUntil = new Date(Date.now() + 180000).toISOString();
  }
  db.run("UPDATE users SET login_attempts = ?, locked_until = ? WHERE id = ?", [newAttempts, lockedUntil, user.id]);
  ```
