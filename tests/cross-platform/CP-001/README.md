# CP-001 — Nhật ký chạy thử nghiệm Cross-Browser / Cross-Platform

Thư mục này quản lý toàn bộ quá trình lập kế hoạch, thực thi và lưu trữ hình ảnh minh chứng cho đợt kiểm thử đa nền tảng `CP-001` (luồng Đăng ký → Đăng nhập → Mua hàng → Checkout).

---

## 1. Cấu trúc tài liệu (Traceability Map)

| Tài liệu                                                                                      | Vai trò & Mục đích                                                         |
| --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| **[1_plan-prep/checklist.md](./1_plan-prep/checklist.md)**                                    | Bộ 54 tiêu chí kiểm thử giao diện dùng chung trên các nền tảng.            |
| **[2_execution/windows-chrome.md](./2_execution/windows-chrome.md)**                          | Nhật ký chạy thử nghiệm trên Windows 11 + Chrome Stable (Baseline).        |
| **[2_execution/windows-firefox.md](./2_execution/windows-firefox.md)**                        | Nhật ký chạy thử nghiệm trên Windows 11 + Firefox Stable.                  |
| **[2_execution/macos-safari.md](./2_execution/macos-safari.md)**                              | Nhật ký chạy thử nghiệm trên macOS + Safari Stable.                        |
| **[3_screenshots/](./3_screenshots/)**                                                        | Thư mục lưu trữ ảnh chụp màn hình minh chứng của 3 trình duyệt.            |
| **[Báo cáo ảnh chụp chính](../../../docs/submission_demo/cross_platform_screenshots_log.md)** | File log nộp bài chính thức chứa email overlay `mqtan23@clc.fitus.edu.vn`. |

---

## 2. Hướng dẫn thiết lập Môi trường & Chạy Test

### Bước 1: Khởi động SUT ở máy Local

1. Mở terminal 1 chạy API backend:
   ```bash
   cd backend
   npm install
   node server.js
   ```
2. Mở terminal 2 chạy web frontend Vite:
   ```bash
   cd frontend-web
   npm install
   npm run dev
   ```

### Bước 2: Thực thi test & Chèn Email Overlay

1. Mở URL `http://localhost:5173/` trên từng trình duyệt (Chrome, Firefox, Safari).
2. Nhấn `F12` mở tab **Console** và chạy đoạn script sau để chèn thông tin email của bạn lên góc màn hình:
   ```javascript
   (() => {
     const id = 'hw03-student-overlay';
     document.getElementById(id)?.remove();
     const overlay = document.createElement('div');
     overlay.id = id;
     overlay.textContent = 'mqtan23@clc.fitus.edu.vn';
     Object.assign(overlay.style, {
       position: 'fixed',
       top: '12px',
       left: '50%',
       transform: 'translateX(-50%)',
       zIndex: '2147483647',
       padding: '8px 12px',
       color: '#ffffff',
       background: 'rgba(0, 0, 0, 0.82)',
       border: '2px solid #ffffff',
       borderRadius: '6px',
       font: '700 16px Arial, sans-serif',
       pointerEvents: 'none',
     });
     document.body.appendChild(overlay);
   })();
   ```
3. Tiến hành chạy bộ checklist và chụp ảnh minh chứng ở 3 checkpoint (Trang chủ, Giỏ hàng, Checkout) lưu vào thư mục `3_screenshots/`.
