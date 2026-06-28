# BUG-03: Input mật khẩu có type="text" — mật khẩu hiển thị rõ

| Trường | Nội dung |
|--------|---------|
| **Mã lỗi** | BUG-03 |
| **Tiêu đề** | Trường nhập mật khẩu có `type="text"` — mật khẩu hiển thị rõ chữ, không bị che |
| **Mức độ** | Nghiêm trọng (Critical) |
| **Tính năng** | FR-02 — Đăng nhập / FR-22 — Yêu cầu UI form |
| **Đặc tả tham chiếu** | `README.md` §FR-22: _"Input mật khẩu phải có thuộc tính `type=\"password\"`"_ |
| **Ngày phát hiện** | 2026-06-28 |
| **Test case liên quan** | DT-FR02-16 |
| **Trạng thái** | Mở (Open) |

---

## Mô tả

Trường nhập mật khẩu trên trang đăng nhập (`/login`) có thuộc tính `type="text"` thay vì `type="password"`. Điều này khiến **mật khẩu người dùng hiển thị dưới dạng văn bản rõ** khi nhập, bất kỳ ai nhìn vào màn hình đều có thể đọc được mật khẩu. Đây là lỗi bảo mật nghiêm trọng.

---

## Các bước tái hiện

1. Mở trình duyệt, truy cập `http://localhost:5173/login`
2. Nhấp vào trường nhập mật khẩu (label: "Mật khẩu")
3. Gõ bất kỳ chuỗi ký tự nào (ví dụ: `MySecretPass123`)
4. Quan sát: ký tự được hiển thị rõ thay vì ẩn thành `●●●●●●●`

Hoặc kiểm tra qua DevTools:

```
F12 → Elements → tìm <input> thứ hai → kiểm tra type
```

---

## Kết quả mong đợi

Trường mật khẩu có `type="password"` — ký tự nhập được che bởi dấu `●`:

```html
<input type="password" ... />
```

---

## Kết quả thực tế

Trường mật khẩu có `type="text"` — ký tự nhập hiển thị rõ:

```html
<input type="text" class="w-full border p-2 rounded" required="" />
```

---

## Ảnh chụp màn hình

| Mô tả | File |
|-------|------|
| Screenshot trang đăng nhập — mật khẩu hiển thị rõ | `test-runs/FR02_Login/screenshots/DT-FR02-16-result.png` |

---

## Tác động

- **Rủi ro bảo mật cao:** mật khẩu người dùng bị lộ với bất kỳ ai quan sát màn hình (shoulder surfing).
- Các công cụ ghi màn hình, camera giám sát, hay người ngồi gần đều có thể đọc mật khẩu.
- Trình quản lý mật khẩu (password manager) của trình duyệt không nhận dạng đây là trường mật khẩu → không tự điền.
- Vi phạm FR-22 và tiêu chuẩn bảo mật cơ bản.

---

## Lệnh tạo GitHub Issue (chạy thủ công)

```bash
gh issue create \
  --title "BUG-03: [CRITICAL] Input mật khẩu type=\"text\" — mật khẩu hiển thị rõ (vi phạm FR-22)" \
  --label "bug,critical,security,FR-02,FR-22" \
  --body "$(cat tests/bug-reports/BUG-03.md)"
```
