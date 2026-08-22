# TC-FORGOT-028: Bảo mật: Đánh giá độ hỗn loạn và độ dài của mã OTP (Weak RNG - CWE-330)

## Requirement ID
SEC-02 / CWE-330

## Module / Test type / Technique
Forgot Password / Security / Cryptographic Analysis

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`

## Test data
| Field | Value |
|---|---|
| Endpoint | POST /api/forgot-password |
| Body.email | test@eshop.com |

## Test steps
1. Gửi HTTP POST request tạo token
2. Phân tích độ dài và định dạng của `resetToken` nhận được

## Expected result
Mã trạng thái 200 OK. Nhận diện token dạng 4 chữ số (khoảng giá trị 1000-9999, không gian 9000 giá trị) sinh bởi hàm Math.random() yếu kém.

## Status / Related bugs
Not Run / None
