# BUG-01: Khóa tài khoản không tự gỡ sau 30 giây

| Trường | Nội dung |
|--------|---------|
| **Mã lỗi** | BUG-01 |
| **Tiêu đề** | Khóa tài khoản không tự gỡ sau 30 giây theo đặc tả |
| **Mức độ** | Cao (High) |
| **Tính năng** | FR-02 — Đăng nhập & Khóa tài khoản |
| **Đặc tả tham chiếu** | `README.md` §FR-02: _"Hệ thống sẽ **tạm khóa** tài khoản trong **30 giây**"_ |
| **Ngày phát hiện** | 2026-06-28 |
| **Test case liên quan** | DT-FR02-14, BVA-FR02-06, BVA-FR02-12 |
| **Trạng thái** | Mở (Open) |

---

## Mô tả

Sau khi tài khoản bị khóa do 3 lần đăng nhập sai liên tiếp, hệ thống không tự động gỡ khóa sau 30 giây. Tài khoản vẫn trong trạng thái bị khóa dù đã chờ 35–40+ giây, vi phạm đặc tả FR-02.

---

## Các bước tái hiện

1. Mở trình duyệt, truy cập `http://localhost:5173/login`
2. Nhập `test@eshop.com` và mật khẩu sai (`WrongPass999!`) → submit → lặp lại **3 lần** (mỗi lần submit)
3. Ghi nhận thời điểm bị khóa (sau lần sai thứ 3)
4. Chờ **35 giây** (vượt quá ngưỡng 30 giây của đặc tả)
5. Nhập `test@eshop.com` / `Test1234!` (đúng mật khẩu) → submit

---

## Kết quả mong đợi

Đăng nhập **thành công** — khóa đã hết hạn sau 30 giây; JWT được trả về; bộ đếm reset về 0.

---

## Kết quả thực tế

Đăng nhập **thất bại** — Thông báo: _"Đăng nhập thất bại. Vui lòng kiểm tra lại."_  
Tài khoản vẫn bị khóa dù đã chờ 35–40 giây.

---

## Ảnh chụp màn hình

| Mô tả | File |
|-------|------|
| Trạng thái bị khóa (DT-FR02-13) | `test-runs/FR02_Login/screenshots/DT-FR02-13-result.png` |
| Thất bại sau 38s (DT-FR02-14) | `test-runs/FR02_Login/screenshots/DT-FR02-14-result.png` |
| Thất bại sau 35s — BVA (BVA-FR02-06) | `test-runs/FR02_Login/screenshots/BVA-FR02-06-result.png` |

---

## Tác động

- Người dùng bị khóa tài khoản **vĩnh viễn** (hoặc trong thời gian rất dài) sau 3 lần nhập sai.
- Không thể tự phục hồi — phải liên hệ hỗ trợ hoặc chờ server restart.
- Gây ảnh hưởng nghiêm trọng đến trải nghiệm người dùng và có thể bị lợi dụng để tấn công từ chối dịch vụ (DoS) trên tài khoản cụ thể.

---

## Lệnh tạo GitHub Issue (chạy thủ công)

```bash
gh issue create \
  --title "BUG-01: Khóa tài khoản không tự gỡ sau 30 giây" \
  --label "bug,high,FR-02" \
  --body "$(cat tests/bug-reports/BUG-01.md)"
```
