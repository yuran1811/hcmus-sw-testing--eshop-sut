# FR09-APPLY-SEC-011: Ký tự điều khiển và payload mã hóa trong code

## Requirement ID

FR-09 / SEC-04 / SEC-05

## Module / Test type / Technique

Coupon API / API Testing / Security

## Preconditions

- JWT hợp lệ.

- Fixture service đặt lại seed user/coupon/coupon_usage và thiết lập use_count, is_active hoặc mốc ngày theo test_id trước mỗi iteration.

## Test data

| Field    | Value                                                                  |
| -------- | ---------------------------------------------------------------------- |
| API      | `POST /api/apply-coupon`                                               |
| Method   | `POST`                                                                 |
| Endpoint | `/api/apply-coupon`                                                    |
| Category | Security                                                               |
| SEC Ref  | SEC-04 / SEC-05                                                        |
| Priority | High                                                                   |
| Input    | Code chứa null byte, newline, URL encoding và chuỗi HTML/SQL đã mã hóa |

## Test steps

1. Gửi từng payload trong trường `code`.
2. Kiểm tra status, content type, body và log/database liên quan nếu có quyền kiểm tra.

## Expected result

Theo execution contract A-FR09: HTTP 400; response khớp schema error_required, không lộ secret/stack trace; coupon và coupon_usage không đổi.

## Status / Related bugs

Not Run / None
