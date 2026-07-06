# TC-PROFILE-UCT-06: Đảm bảo người dùng không thể tự nâng quyền role thành admin qua request cập nhật hồ sơ (Extension 3c)

## Requirement ID

FR-04

## Module / Test type / Technique

profile / Functional / Use Case Testing

## Scenario Type / Extension ID

Extension 3c

## Primary Actor

Người dùng có quyền 'user' đã đăng nhập

## Preconditions

- Tài khoản `test@eshop.com` đang ở quyền `role = 'user'`.

## Test data

| Field / Parameter  | Value                                         |
| ------------------ | --------------------------------------------- |
| Name               | `Nguyen Van Test`                             |
| Role (Cố tình gửi) | `admin` (Cố tình nâng quyền từ user -> admin) |
| Phone              | `0912345678`                                  |

## Test steps

1. Sử dụng REST Client gửi request `PUT /api/users/me` kèm Token của user `test@eshop.com`.
2. Truyền Body JSON chứa thuộc tính `role: "admin"`.
3. Kiểm tra phản hồi và gửi request `GET /api/users/me` (hoặc kiểm tra CSDL) xem `role` của user có bị đổi thành `admin` hay không.

## Expected result

- Đối chiếu với **Minimal Guarantees**:
  - Quyền hạn `role` của người dùng phải giữ nguyên là `'user'` (không được phép thay đổi thành `'admin'`).
  - Hệ thống từ chối hoặc bỏ qua tham số `role` từ client.

## Status / Related bugs

Fail / BUG-PROFILE-001
