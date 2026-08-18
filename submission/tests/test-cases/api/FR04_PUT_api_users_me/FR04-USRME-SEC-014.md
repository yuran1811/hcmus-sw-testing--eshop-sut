# FR04-USRME-SEC-014: Prototype pollution qua trường ngoài allow-list

## Requirement ID

FR-04 / SEC-06

## Preconditions

- Token JWT hợp lệ của user A; lưu snapshot hồ sơ trước request.

## Test data

`{"name":"A","phone":"0912345678","shipping_address":"1 A","__proto__":{"role":"admin"},"constructor":{"prototype":{"role":"admin"}}}`.

## Test steps

1. Gửi request với body trên.
2. Đọc lại hồ sơ bằng `GET /api/users/me` và kiểm tra quyền của user A trong request tiếp theo.

## Expected result

API từ chối hoặc bỏ qua các trường ngoài allow-list; `role` không đổi, không tạo thuộc tính kế thừa nguy hiểm và hồ sơ hợp lệ không bị ảnh hưởng.

## Review

VALID. Đây là biến thể mass assignment/prototype pollution chưa có trong bộ AI.
