# TC-FORGOT-041: Yêu cầu OTP đặt lại mật khẩu cho tài khoản đang bị khóa tạm thời (Lockout Bypass)

## Requirement ID
FR-03, FR-02

## Module / Test type / Technique
Forgot Password / Security & State Transition / Cross-Feature State Interaction

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Tài khoản người dùng `locked_user@eshop.com` đang bị khóa tạm thời do nhập sai mật khẩu $\ge 3$ lần (`login_attempts >= 3`, `locked_until > now`)
- Header `X-Student-Id: 23127148` được đính kèm trong request

## Test data
| Field | Value |
|---|---|
| Endpoint | POST /api/forgot-password |
| Header Content-Type | application/json |
| Header X-Student-Id | 23127148 |
| Body.email | locked_user@eshop.com |

## Test steps
1. Mô phỏng tài khoản bị khóa tạm thời bằng cách gửi 3 lần đăng nhập sai mật khẩu đến `/api/login`
2. Gửi HTTP POST request đến `/api/forgot-password` với email `locked_user@eshop.com`
3. Đính kèm header `Content-Type: application/json` và `X-Student-Id: 23127148`
4. Kiểm tra mã trạng thái HTTP response và kiểm tra xem hệ thống có cho phép tạo OTP và đặt lại mật khẩu để bypass cơ chế lockout mà không reset biến `locked_until` không

## Expected result
Theo chuẩn bảo mật (OWASP ASVS V3.2), hệ thống phải từ chối hoặc thông báo trạng thái tài khoản đang bị khóa (403 Forbidden / 423 Locked), hoặc nếu cho phép reset mật khẩu thì phải giải phóng `locked_until` và `login_attempts` sau khi reset thành công. Response không được để lộ trạng thái khóa tài khoản qua side-channel.

## Status / Related bugs
Not Run / SUT Defect (server.js bỏ qua kiểm tra `locked_until` trong forgot-password và không xóa `locked_until` khi reset-password)
