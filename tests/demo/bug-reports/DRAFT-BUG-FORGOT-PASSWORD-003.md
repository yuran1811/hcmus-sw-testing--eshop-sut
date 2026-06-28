# [BUG][Forgot Password] Các lỗi giao diện (Thiếu Step Indicator, Thiếu dấu sao *, Thiếu nút quay lại, Hiển thị lỗi bằng alert)

## Found by Test Case

TC-FORGOT-PASSWORD-001, TC-FORGOT-PASSWORD-002, TC-FORGOT-PASSWORD-005, TC-FORGOT-PASSWORD-021, TC-FORGOT-PASSWORD-023

## Requirement liên quan

FR-03, FR-22

## Severity / Priority

Minor / P2

## Environment

- Browser: Google Chrome
- OS: Windows 11
- URL: http://localhost:5173/forgot-password
- Build/Commit: a6352864919d5523bbaa295fe7f68f40d59def82

## Steps to reproduce

1. Truy cập trang chủ EShop tại địa chỉ `http://localhost:5173`.
2. Nhấp vào liên kết "Đăng nhập", sau đó nhấp vào "Quên mật khẩu?".
3. Quan sát giao diện Bước 1:
   - Kiểm tra xem có hiển thị chỉ số bước "Bước 1 / 2" không.
   - Kiểm tra xem Email label có dấu sao đỏ `*` không.
   - Kiểm tra xem có nút "Quay lại đăng nhập" không.
4. Bỏ trống trường Email, bấm "Lấy mã OTP". Quan sát cách hiển thị thông báo lỗi.
5. Nhập email hợp lệ `test@eshop.com`, nhấn nút "Lấy mã OTP" để chuyển sang Bước 2.
6. Quan sát giao diện Bước 2:
   - Kiểm tra xem có hiển thị chỉ số bước "Bước 2 / 2" không.
   - Kiểm tra xem các label (OTP, Mật khẩu mới) có dấu sao đỏ `*` không.

## Expected result

- Giao diện phải hiển thị rõ ràng chỉ số bước: "Bước 1 / 2" ở Bước 1 và "Bước 2 / 2" ở Bước 2.
- Các trường nhập bắt buộc (Email ở Bước 1, và OTP, Mật khẩu mới ở Bước 2) phải có dấu sao đỏ `*` bên cạnh nhãn.
- Có nút hoặc liên kết "Quay lại đăng nhập" tại Bước 1 để người dùng quay về trang login.
- Các thông báo lỗi xác thực phải hiển thị bằng văn bản ở vị trí phía trên nút Submit thay vì sử dụng hộp thoại `alert()` của trình duyệt.

## Actual result

- Hoàn toàn không có Step Indicator ("Bước 1 / 2" hoặc "Bước 2 / 2") ở cả hai bước.
- Nhãn các trường nhập không hiển thị dấu sao đỏ `*`.
- Không có nút hay liên kết quay lại trang đăng nhập ở Bước 1.
- Khi có lỗi nhập liệu (ví dụ bỏ trống email hoặc nhập sai định dạng), lỗi được hiển thị dưới dạng hộp thoại `alert()` gây gián đoạn trải nghiệm người dùng.

## Evidence

- Recorded session: `file:///C:/Users/USER/.gemini/antigravity-ide/brain/74311d47-7ef9-45a5-a32b-c024bed6456a/forgot_password_run_1782640814592.webp`
- Screenshot Step 1: `file:///C:/Users/USER/.gemini/antigravity-ide/brain/74311d47-7ef9-45a5-a32b-c024bed6456a/forgot_password_step_1_1782640848180.png`
- Screenshot Step 2: `file:///C:/Users/USER/.gemini/antigravity-ide/brain/74311d47-7ef9-45a5-a32b-c024bed6456a/forgot_password_step_2_1782640864386.png`
