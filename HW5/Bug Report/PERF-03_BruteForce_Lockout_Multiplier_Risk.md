# [PERF-03][Auth Service] Cơ chế phạt Lockout tăng bậc số nhân (login_attempts += 2) gây nguy cơ Denial-of-Service (DoS) cho tài khoản Admin dưới tải phân tán

## Found by Test Scenario

- Kịch bản **Authentication Under Load & Code Inspection** — Endpoint: `POST /api/login`

## Requirement / Endpoint liên quan

- Endpoint: `POST /api/login` (Xác thực đăng nhập người dùng và quản trị viên)
- An ninh & Hiệu năng: Bảo vệ chống brute-force và phòng ngừa tấn công từ chối dịch vụ (Account Denial-of-Service)

## Severity / Priority

- **Severity:** Medium (Rủi ro bảo mật & khả năng truy cập hệ thống quản trị)
- **Priority:** P2

## Environment

- **SUT Backend:** Node.js v20.x, Express.js 4.x
- **Source Code:** `backend/server.js:45`

---

## Steps to reproduce

1. Kiểm tra mã nguồn xử lý đăng nhập thất bại tại `backend/server.js`:
   ```javascript
   // backend/server.js:45
   user.login_attempts += 2;
   if (user.login_attempts >= 5) {
     user.locked_until = Date.now() + 15 * 60 * 1000;
   }
   ```
2. Gửi 2 request đăng nhập liên tiếp với mật khẩu sai cho tài khoản Admin.
3. Ở lần thử thứ 3 gửi request với mật khẩu đúng (`Admin123!`).

---

## Expected result

- Theo quy chuẩn an toàn thông thường, hệ thống chỉ khóa tài khoản sau **5 lần nhập sai liên tiếp** (`login_attempts += 1` mỗi lần), và khi nhập đúng phải cho phép truy cập.

---

## Actual result

- Vì mỗi lần sai bị cộng dồn **`+ 2`**:
  - Lần 1 sai: `login_attempts = 2`
  - Lần 2 sai: `login_attempts = 4`
  - Lần 3 sai: `login_attempts = 6` $\rightarrow$ Vượt ngưỡng 5 và kích hoạt khóa tài khoản `locked_until` 15 phút!
- **Hậu quả dưới tải hiệu năng:** Khi chạy các bài kiểm thử tự động với nhiều threads hoặc mạng chập chờn gây mất gói tin (packet drop), tài khoản Admin bị khóa ngay lập tức chỉ sau 2-3 sự cố ngẫu nhiên, làm sập toàn bộ các kịch bản kiểm thử phía sau (Cascading Failures) và có thể bị kẻ xấu lợi dụng để khóa tài khoản quản trị viên (Denial of Service).

---

## Root cause analysis

- Lỗi hardcode logic tăng số lần thử sai `user.login_attempts += 2` thay vì tăng đơn vị `+= 1` tại tầng xử lý authentication của backend.

---

## Proposed Solution / Recommendations

1. **Sửa logic đếm lần sai:**
   ```javascript
   user.login_attempts = (user.login_attempts || 0) + 1;
   ```
2. **Áp dụng Rate Limiting theo IP:**
   Sử dụng middleware như `express-rate-limit` để giới hạn số lần thử login từ cùng một địa chỉ IP (ví dụ: tối đa 5 requests/phút) thay vì khóa cứng tài khoản trên cơ sở dữ liệu.

---

## Evidence

- Trích xuất mã nguồn `backend/server.js:40-55`:
  ```javascript
  if (!user || user.password !== password) {
    if (user) {
      user.login_attempts = (user.login_attempts || 0) + 2; // BUG: Tăng 2 bậc mỗi lần
      if (user.login_attempts >= 5) {
        user.locked_until = Date.now() + 15 * 60 * 1000;
      }
    }
    return res.status(400).json({ error: "Email hoặc mật khẩu không đúng" });
  }
  ```
