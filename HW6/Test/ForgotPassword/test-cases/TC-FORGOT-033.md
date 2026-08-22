# TC-FORGOT-033: Bảo mật (SEC-07): Kiểm thử gán quyền hạn và giá trị trái phép (Mass Assignment)

## Requirement ID
SEC-07 / OWASP API6:2023

## Module / Test type / Technique
Forgot Password / Security / Mass Assignment

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Tài khoản `test@eshop.com` tồn tại

## Test data
| Field | Value |
|---|---|
| Endpoint | POST /api/forgot-password |
| Header Content-Type | application/json |
| Injected Body | {"email":"test@eshop.com","role":"admin","resetToken":"9999","newPassword":"pwned"} |

## Test steps
1. Gửi HTTP POST request đính kèm các trường nhạy cảm (`role`, `resetToken`, `newPassword`)
2. Kiểm tra xem server có nhận các trường bị gán trái phép hay không

## Expected result
Mã trạng thái 200 OK. Server chỉ trích xuất trường `email`, bỏ qua hoàn toàn các trường chèn thêm và tự sinh token mới.

## Status / Related bugs
Not Run / None
