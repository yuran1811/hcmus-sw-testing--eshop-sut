# BUG-02: Input email có type="text" thay vì type="email"

| Trường | Nội dung |
|--------|---------|
| **Mã lỗi** | BUG-02 |
| **Tiêu đề** | Trường nhập email trên form đăng nhập có `type="text"` thay vì `type="email"` |
| **Mức độ** | Cao (High) |
| **Tính năng** | FR-02 — Đăng nhập / FR-22 — Yêu cầu UI form |
| **Đặc tả tham chiếu** | `README.md` §FR-22: _"Input email phải có thuộc tính `type=\"email\"`"_ |
| **Ngày phát hiện** | 2026-06-28 |
| **Test case liên quan** | DT-FR02-15 |
| **Trạng thái** | Mở (Open) |

---

## Mô tả

Trường nhập email trên trang đăng nhập (`/login`) có thuộc tính `type="text"` thay vì `type="email"` theo yêu cầu của FR-22. Điều này dẫn đến:

1. Trình duyệt không tự động validate định dạng email trước khi submit.
2. Không kích hoạt bàn phím `@` trên thiết bị di động.
3. Vi phạm tiêu chuẩn accessibility cho form đăng nhập.

---

## Các bước tái hiện

1. Mở trình duyệt, truy cập `http://localhost:5173/login`
2. Mở DevTools (F12) → Elements
3. Tìm thẻ `<input>` đầu tiên (trường email/username)
4. Kiểm tra thuộc tính `type`

---

## Kết quả mong đợi

Thẻ input có `type="email"`:

```html
<input type="email" ... />
```

---

## Kết quả thực tế

Thẻ input có `type="text"`:

```html
<input type="text" class="w-full border p-2 rounded" required="" />
```

---

## Ảnh chụp màn hình

| Mô tả | File |
|-------|------|
| Screenshot trang đăng nhập — input type không đúng | `test-runs/FR02_Login/screenshots/DT-FR02-15-result.png` |

---

## Tác động

- Trình duyệt không validate định dạng email phía client → người dùng có thể nhập bất kỳ chuỗi nào.
- Không có gợi ý bàn phím đúng trên mobile.
- Vi phạm FR-22 về yêu cầu thuộc tính HTML.

---

## Lệnh tạo GitHub Issue (chạy thủ công)

```bash
gh issue create \
  --title "BUG-02: Input email có type=\"text\" thay vì type=\"email\" (vi phạm FR-22)" \
  --label "bug,high,FR-02,FR-22" \
  --body "$(cat tests/bug-reports/BUG-02.md)"
```
