# TC-FORGOT-039: Kiểm thử chuyển trạng thái: Vòng đời mã OTP và khả năng sử dụng cho /api/reset-password

## Requirement ID
FR-03 -> FR-04

## Module / Test type / Technique
Forgot Password / State Transition / State Machine Testing

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Tài khoản `test@eshop.com` tồn tại

## Test data
| Field | Value |
|---|---|
| Step 1 | POST /api/forgot-password -> Nhận resetToken |
| Step 2 | POST /api/reset-password -> Sử dụng resetToken và newPassword |

## Test steps
1. Bước 1: Gửi request đến `/api/forgot-password` để sinh mã `resetToken`
2. Bước 2: Lưu `resetToken` vào biến môi trường và sử dụng cho request `/api/reset-password`
3. Bước 3: Kiểm tra mật khẩu mới có được cập nhật thành công hay không

## Expected result
Mã OTP sinh ra từ endpoint forgot-password được chấp nhận hợp lệ tại endpoint reset-password.

## Status / Related bugs
Not Run / None
