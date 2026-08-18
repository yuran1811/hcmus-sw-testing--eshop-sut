# FR09-APPLY-SEC-011: Ký tự điều khiển và payload mã hóa trong code

## Requirement ID

FR-09 / SEC-04 / SEC-05

## Module / Test type / Technique

Coupon API / API Testing / Security

## Preconditions

- JWT hợp lệ.

## Test data

| Field    | Value                                                                  |
| -------- | ---------------------------------------------------------------------- |
| API      | `POST /api/apply-coupon`                                               |
| Method   | `POST`                                                                 |
| Endpoint | `/api/apply-coupon`                                                    |
| Category | Security                                                               |
| Priority | High                                                                   |
| Input    | Code chứa null byte, newline, URL encoding và chuỗi HTML/SQL đã mã hóa |

## Test steps

1. Gửi từng payload trong trường `code`.
2. Kiểm tra status, content type, body và log/database liên quan nếu có quyền kiểm tra.

## Expected result

Request được xử lý có kiểm soát, không 5xx, không thực thi payload, không trả HTML/script và không làm thay đổi dữ liệu coupon. Không được áp dụng nhầm mã hợp lệ.

## Status / Related bugs

Not Run / None
