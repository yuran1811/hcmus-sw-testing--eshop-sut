# BUG-04: Thông báo lỗi đăng nhập hiển thị bên dưới nút submit

| Trường | Nội dung |
|--------|---------|
| **Mã lỗi** | BUG-04 |
| **Tiêu đề** | Thông báo lỗi đăng nhập hiển thị **bên dưới** nút submit thay vì phía trên |
| **Mức độ** | Trung bình (Medium) |
| **Tính năng** | FR-02 — Đăng nhập / FR-22 — Yêu cầu UI form |
| **Đặc tả tham chiếu** | `README.md` §FR-22: _"Thông báo lỗi phải hiển thị **phía trên** nút submit"_ |
| **Ngày phát hiện** | 2026-06-28 |
| **Test case liên quan** | DT-FR02-17 |
| **Trạng thái** | Mở (Open) |

---

## Mô tả

Khi đăng nhập thất bại, thông báo lỗi _"Đăng nhập thất bại. Vui lòng kiểm tra lại."_ được render **bên dưới** nút submit ("Sign In") thay vì phía trên theo yêu cầu FR-22. Vị trí sai làm giảm khả năng nhận thấy của người dùng về lý do thất bại.

---

## Các bước tái hiện

1. Mở trình duyệt, truy cập `http://localhost:5173/login`
2. Nhập email bất kỳ và mật khẩu sai, ví dụ: `nobody@test.com` / `WrongPass`
3. Nhấn nút "Sign In"
4. Quan sát vị trí thông báo lỗi trên trang

---

## Kết quả mong đợi

Thông báo lỗi xuất hiện **phía trên** nút submit "Sign In" (theo đặc tả FR-22):

```
[Email input     ]
[Password input  ]
Đăng nhập thất bại. Vui lòng kiểm tra lại.   ← phải ở đây
[    Sign In     ]
```

---

## Kết quả thực tế

Thông báo lỗi xuất hiện **bên dưới** nút submit:

```
[Email input     ]
[Password input  ]
[    Sign In     ]
Đăng nhập thất bại. Vui lòng kiểm tra lại.   ← thực tế ở đây
```

Đo lường vị trí DOM:
- Thông báo lỗi: `top = 517px`
- Nút submit: `top = 425px`
- → Thông báo lỗi thấp hơn nút submit 92px

---

## Ảnh chụp màn hình

| Mô tả | File |
|-------|------|
| Vị trí thông báo lỗi bên dưới nút submit | `test-runs/FR02_Login/screenshots/DT-FR02-17-result.png` |

---

## Tác động

- Người dùng có thể bỏ qua thông báo lỗi vì nằm ở vị trí ít chú ý sau khi vừa bấm nút.
- Vi phạm FR-22 về bố cục giao diện form đăng nhập.
- Ảnh hưởng trải nghiệm người dùng (UX), đặc biệt trên màn hình nhỏ.

---

## Lệnh tạo GitHub Issue (chạy thủ công)

```bash
gh issue create \
  --title "BUG-04: Thông báo lỗi đăng nhập hiển thị bên dưới nút submit (vi phạm FR-22)" \
  --label "bug,medium,UI,FR-02,FR-22" \
  --body "$(cat tests/bug-reports/BUG-04.md)"
```
