# [BUG][Lịch Sử Đơn Hàng] Trang lịch sử đơn hàng không có thẻ tiêu đề h1 duy nhất

## Found by Test Case

- F11-TC-016

## Requirement liên quan

- FR-11

## Severity / Priority

- **Severity**: Minor
- **Priority**: P2

## Environment

- Browser: Google Chrome
- OS: Windows 11
- URL: http://localhost:5173/profile
- Build/Commit: 3aa95b1

## Steps to reproduce

1. Đăng nhập vào tài khoản người dùng bình thường.
2. Điều hướng tới trang cá nhân `/profile` (chứa phần lịch sử đơn hàng).
3. Inspect mã nguồn DOM để kiểm tra số lượng và nội dung các thẻ tiêu đề `<h1>`.

## Expected result

- Mỗi trang web phải chứa duy nhất một thẻ tiêu đề `<h1>` mô tả trực quan và rõ ràng nội dung của trang đó.

## Actual result

- Trang `/profile` hoàn toàn không có bất kỳ phần tử `<h1>` nào trong DOM. Tiêu đề "Hồ sơ của bạn" và "Lịch sử đơn hàng" đều sử dụng thẻ `<h2>`, vi phạm chuẩn Semantic HTML5.

## Evidence

- Screenshot: ![Screenshot](../../Evidences/FR11/F11-TC-016.png)
