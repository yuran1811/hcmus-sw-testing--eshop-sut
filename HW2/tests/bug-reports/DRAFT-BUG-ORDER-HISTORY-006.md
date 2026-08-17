# [BUG][Order History] Trang Hồ sơ & Lịch sử đơn hàng hoàn toàn thiếu thẻ tiêu đề trang H1

## Found by Test Case

- TC-ORDER-HISTORY-016
- TC-ORDER-HISTORY-017

## Requirement liên quan

- FR-21 (Tiêu chuẩn giao diện chung)

## Severity / Priority

- **Severity**: Minor
- **Priority**: P2

## Environment

- Browser: Google Chrome
- OS: Windows 11
- URL: http://localhost:5173/profile
- Build/Commit: a6352864919d5523bbaa295fe7f68f40d59def82

## Steps to reproduce

1. Truy cập trang Hồ sơ người dùng tại `/profile`.
2. Chuột phải chọn "View Page Source" hoặc mở F12 DevTools để kiểm tra cấu trúc DOM của trang.
3. Tìm kiếm sự hiện diện của thẻ `<h1>` (ví dụ: truy vấn `document.getElementsByTagName('h1')`).

## Expected result

- Để đảm bảo tiêu chuẩn cấu trúc trang HTML và chuẩn SEO của dự án, mỗi trang bắt buộc phải chứa **chính xác duy nhất 1 thẻ tiêu đề chính H1** (`<h1>`).

## Actual result

- Trang hoàn toàn không chứa bất kỳ thẻ `<h1>` nào (H1 count = 0). Hệ thống chỉ sử dụng các thẻ tiêu đề cấp thấp `<h2>` cho mục "Hồ sơ của bạn" và "Lịch sử đơn hàng".

## Evidence

- Browser console output:
  ```javascript
  document.getElementsByTagName("h1").length; // Returns 0
  ```
- Browser recording session: [order_history_ui_exploration_1782469485421.webp](evidence/order_history_ui_exploration_1782469485421.webp)
