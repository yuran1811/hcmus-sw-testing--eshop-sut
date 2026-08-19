# FR17-ADMINCOUP-SEC-009: Giả mạo danh tính admin qua body

## Requirement ID

FR-17 / SEC-03 / SEC-06

## Module / Test type / Technique

Coupon API / API Testing / Security

## Preconditions

- Request dùng JWT của admin A.
- Body cố gắng thêm `admin_id`, `created_by`, `user_id` của user B.

## Test data

| Field    | Value                                                              |
| -------- | ------------------------------------------------------------------ |
| API      | `POST /api/admin/coupons`                                          |
| Method   | `POST`                                                             |
| Endpoint | `/api/admin/coupons`                                               |
| Category | Security                                                           |
| SEC Ref  | SEC-03 / SEC-06                                                    |
| Priority | High                                                               |
| Input    | Body coupon hợp lệ kèm `admin_id`, `created_by` và `user_id` của B |

## Test steps

1. Gửi request bằng token của admin A.
2. Kiểm tra owner/audit field và quyền của user B sau request nếu hệ thống có lưu các field này.

## Expected result

Authorization chỉ dựa trên JWT đã xác thực; field định danh trong body không chọn user hoặc nâng quyền. Các field ngoài spec bị bỏ qua hoặc từ chối, không làm thay đổi dữ liệu của B.

## Status / Related bugs

Not Run / None
