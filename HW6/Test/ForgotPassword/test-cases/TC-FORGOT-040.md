# TC-FORGOT-040: Tuân thủ học thuật: Kiểm định sự hiện diện của header bắt buộc X-Student-Id

## Requirement ID
HW06 §6.1 Requirement

## Module / Test type / Technique
Forgot Password / Audit Compliance / HTTP Header Validation

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`

## Test data
| Field | Value |
|---|---|
| Endpoint | POST /api/forgot-password |
| Header X-Student-Id | 23127148 |
| Body.email | test@eshop.com |

## Test steps
1. Gửi HTTP POST request với header `X-Student-Id: 23127148`
2. Xác nhận request được gửi kèm đúng định danh sinh viên phục vụ chấm điểm và truy vết

## Expected result
Header `X-Student-Id: 23127148` được gửi đi chuẩn xác và được ghi nhận đầy đủ.

## Status / Related bugs
Not Run / None
