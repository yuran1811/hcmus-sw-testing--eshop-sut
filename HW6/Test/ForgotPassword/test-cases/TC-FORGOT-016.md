# TC-FORGOT-016: Từ chối yêu cầu khi thiếu hoàn toàn trường email trong JSON Body (Missing Field)

## Requirement ID
FR-03

## Module / Test type / Technique
Forgot Password / Negative Validation / Schema Validation

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`

## Test data
| Field | Value |
|---|---|
| Endpoint | POST /api/forgot-password |
| Header Content-Type | application/json |
| Body JSON | {} |

## Test steps
1. Gửi HTTP POST request với JSON rỗng `{}`
2. Kiểm tra mã trạng thái trả về

## Expected result
Mã phản hồi HTTP 400 Bad Request (hoặc 404 trên SUT hiện tại).

## Status / Related bugs
Not Run / None
