# Báo cáo lỗi (Bug Report) — Markdown + GitHub Issues

Chỉ lập bug report khi một **assertion thất bại phản ánh lỗi thật của EShop**, không phải
lỗi trong chính script test (selector sai, chờ chưa đủ...). Nếu không chắc, chạy lại test
bằng tay trên trình duyệt thật trước khi kết luận đó là bug.

## 1. Mẫu Markdown (đưa vào báo cáo chính, mục "Bug Report")

```markdown
## BUG-01 — [Tên ngắn gọn của lỗi]

- **Tính năng:** FR-09 Discount coupons
- **Test case liên quan:** TC-07 (coupon hết hạn vẫn được áp dụng)
- **Mức độ:** Trung bình / Cao / Thấp
- **Trình duyệt phát hiện:** Chromium, Firefox (không xảy ra trên WebKit)
- **Các bước tái hiện:**
  1. Thêm sản phẩm vào giỏ, tổng giá trị ≥ mức tối thiểu áp dụng mã.
  2. Nhập mã giảm giá đã hết hạn (`EXPIRED2025`).
  3. Nhấn "Áp dụng".
- **Kết quả mong đợi:** Hệ thống báo "Mã giảm giá đã hết hạn", không trừ tiền.
- **Kết quả thực tế:** Hệ thống vẫn trừ giảm giá vào tổng tiền thanh toán.
- **Ảnh chụp màn hình:** `bugs/BUG-01-expired-coupon.png` (đính kèm)
- **Link GitHub Issue:** https://github.com/<user>/<repo>/issues/1
```

## 2. Tạo GitHub Issue kèm ảnh bằng GitHub CLI (`gh`)

Cài đặt (nếu chưa có): xem https://cli.github.com — sau đó đăng nhập `gh auth login`.

```bash
# Tạo issue kèm nội dung Markdown và đính kèm ảnh chụp màn hình
gh issue create \
  --repo <your-username>/<your-eshop-automation-repo> \
  --title "[BUG] Mã giảm giá hết hạn vẫn được áp dụng khi thanh toán" \
  --label bug \
  --body-file bugs/BUG-01.md
```

Ảnh chụp màn hình không đính kèm trực tiếp qua `gh issue create --body-file` (GitHub CLI
chưa hỗ trợ upload file kèm issue qua flag) — cách thực hiện đúng là:
1. Kéo-thả ảnh vào ô comment trên giao diện web GitHub Issues (GitHub tự tạo link CDN),
   rồi copy link đó dán vào `bugs/BUG-01.md` trước khi chạy `gh issue create --body-file`.
2. Hoặc dùng `gh issue create` trước để lấy issue number, sau đó:
   ```bash
   gh issue comment <issue-number> --body "Ảnh chụp lỗi:" 
   # rồi kéo-thả ảnh vào comment trên web (cách đáng tin cậy nhất)
   ```

## 3. Lấy screenshot tự động từ Playwright khi test fail

Playwright tự lưu screenshot khi test thất bại nếu bật trong config:

```ts
// playwright.config.ts
use: {
  screenshot: 'only-on-failure',
  trace: 'retain-on-failure',
},
```

Ảnh sẽ nằm trong `test-results/<test-name>/test-failed-1.png` — copy file này vào
`bugs/BUG-0X-<mô-tả>.png` trước khi đính kèm vào Issue/báo cáo.

## 4. Bảng tổng hợp bug (đưa vào README.md test summary report)

| ID | Tính năng | Mức độ | Trạng thái | Link Issue |
|---|---|---|---|---|
| BUG-01 | FR-09 Coupons | Trung bình | Open | #1 |
| BUG-02 | FR-10 Order state machine | Cao | Open | #2 |

## 5. Ghi lại test case KHÔNG tự động hóa được

```markdown
## Test case không tự động hóa được

- **TC-11 (FR-03 Reset mật khẩu):** Cần đọc email thật gửi từ hệ thống để lấy link reset
  → không có test mailbox tích hợp trong môi trường CI, phải test thủ công.
- **TC-12 (FR-08 Checkout qua cổng thanh toán bên thứ 3):** Sandbox cổng thanh toán yêu cầu
  OTP SMS thật → không automate được trong phạm vi bài tập, ghi nhận test case thủ công.
```
