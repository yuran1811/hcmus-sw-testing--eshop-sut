# FR04-USRME-SEC-013: Authorization scheme không hợp lệ

## Requirement ID

FR-04 / SEC-02

## Preconditions

- API đang chạy và có token hợp lệ của user A để làm đối chứng.

## Test data

`Authorization: Basic <valid-jwt>` hoặc `Authorization: Token <valid-jwt>`; body hợp lệ: `{"name":"A security check","phone":"0912345678","shipping_address":"1 A"}`.

## Test steps

1. Gửi `PUT /api/users/me` với từng scheme nêu trên.
2. Gọi `GET /api/users/me` bằng token hợp lệ để xác nhận dữ liệu trước/sau.

## Expected result

Mỗi request trả `401 Unauthorized`, không cập nhật hồ sơ và không lộ chi tiết xác thực nội bộ.

## Review

VALID. Bổ sung biến thể header bị thiếu phần `Bearer`, là điều SEC-02 yêu cầu nhưng case cũ chưa bao phủ.
