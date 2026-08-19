# FR04-USRME-SEC-016: Unknown field không được ghi vào hồ sơ

## Requirement ID

FR-04 / SEC-06

## Module / Test type / Technique

User Profile API / API Testing / Security

## Preconditions

- Token JWT hợp lệ của user A; lưu snapshot hồ sơ.

## Test data

| Field    | Value                                                                                                               |
| -------- | ------------------------------------------------------------------------------------------------------------------- |
| API      | `PUT /api/users/me`                                                                                                 |
| Method   | `PUT`                                                                                                               |
| Endpoint | `/api/users/me`                                                                                                     |
| Category | Security                                                                                                            |
| SEC Ref  | SEC-06                                                                                                              |
| Priority | High                                                                                                                |
| Input    | Body gồm các trường hợp lệ và `is_admin`, `permissions`, `passwordHash`, `resetToken`, `createdAt` với giá trị giả. |

## Test steps

1. Gửi request.
2. Đọc lại hồ sơ và kiểm tra response JSON.

## Expected result

Các trường không thuộc `name`, `phone`, `shipping_address` bị từ chối hoặc bỏ qua; không có trường nhạy cảm được ghi/đưa vào response và dữ liệu hợp lệ xử lý nhất quán.

## Status / Related bugs

Not Run / None
