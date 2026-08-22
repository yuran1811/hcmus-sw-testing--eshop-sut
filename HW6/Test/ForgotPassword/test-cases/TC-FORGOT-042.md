# TC-FORGOT-042: Ghi đè và vô hiệu hóa OTP cũ khi gửi yêu cầu Forgot Password liên tiếp (Token Invalidation)

## Requirement ID
FR-03

## Module / Test type / Technique
Forgot Password / State Transition & Security / Temporal Token Lifecycle

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Tài khoản người dùng `test@eshop.com` đã tồn tại hợp lệ trong database
- Header `X-Student-Id: 23127148` được đính kèm trong request

## Test data
| Field | Value |
|---|---|
| Endpoint | POST /api/forgot-password & POST /api/reset-password |
| Header Content-Type | application/json |
| Header X-Student-Id | 23127148 |
| Body.email | test@eshop.com |

## Test steps
1. Gửi HTTP POST request lần 1 đến `/api/forgot-password` với email `test@eshop.com` -> Lưu `Token_1`
2. Gửi tiếp HTTP POST request lần 2 đến `/api/forgot-password` với email `test@eshop.com` -> Lưu `Token_2`
3. Thử thực hiện `POST /api/reset-password` sử dụng `Token_1` đã cũ
4. Nhận và kiểm tra mã trạng thái HTTP response của request reset với `Token_1`

## Expected result
Request đặt lại mật khẩu với `Token_1` phải bị từ chối với mã lỗi `400 Bad Request` ("Invalid token or email") vì `Token_1` đã bị vô hiệu hóa khi `Token_2` được sinh ra. Chỉ `Token_2` mới có hiệu lực hợp lệ.

## Status / Related bugs
Not Run / None
