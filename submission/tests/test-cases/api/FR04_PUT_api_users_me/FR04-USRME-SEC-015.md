# FR04-USRME-SEC-015: Token của user A không thể chọn user B qua các khóa định danh

## Requirement ID

FR-04 / SEC-02 / SEC-06

## Preconditions

- Có user A và B, lưu snapshot cả hai; token là của A.

## Test data

Body hợp lệ của A kèm đồng thời `id`, `userId`, `user_id` mang giá trị của B.

## Test steps

1. Gửi `PUT /api/users/me` bằng token A.
2. Đọc hồ sơ của A và B sau request.

## Expected result

Chỉ A có thể thay đổi (hoặc request bị từ chối); B giữ nguyên hoàn toàn. Không khóa cập nhật theo một định danh do client gửi.

## Review

VALID. Case cũ SEC-005 chỉ nêu một khóa `id`; case này kiểm tra các alias thường gặp trong payload.
