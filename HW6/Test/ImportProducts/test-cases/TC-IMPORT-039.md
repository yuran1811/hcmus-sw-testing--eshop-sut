# TC-IMPORT-039: Kiểm Thử Hợp Đồng - JSON Schema Validation (200 OK & 400 Bad Request)

## Requirement ID
FR-16 / RFC 8259

## Module / Test type / Technique
Admin Product Import / Contract Testing / JSON Schema Draft-07 Assertions

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Đã đăng nhập bằng tài khoản admin và có `adminToken` hợp lệ
- Header `X-Student-Id: 23127148` được đính kèm trong request

## Test data
| Schema Target | Required Properties | Types |
|---|---|---|
| Success (200 OK) | `message`, `inserted`, `errors` | `message: string`, `inserted: integer (>=0)`, `errors: array` |
| Error (400 Bad Request) | `error` | `error: string` |

## Test steps
1. Gửi request hợp lệ và áp dụng JSON Schema assertion trên response 200 OK
2. Gửi request rỗng và áp dụng JSON Schema assertion trên response 400 Bad Request

## Expected result
Tất cả các response JSON đều tuân thủ 100% định nghĩa cấu trúc JSON Schema Draft-07.

## Status / Related bugs
Not Run / None
