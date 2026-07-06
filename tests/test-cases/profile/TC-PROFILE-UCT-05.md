# TC-PROFILE-UCT-05: Đảm bảo không thể thay đổi địa chỉ Email qua request cập nhật hồ sơ (Extension 3b)

## Requirement ID

FR-04

## Module / Test type / Technique

profile / Functional / Use Case Testing

## Scenario Type / Extension ID

Extension 3b

## Primary Actor

Người dùng đã đăng nhập (Logged-in User)

## Preconditions

- Người dùng `test@eshop.com` đã đăng nhập thành công.

## Test data

| Field / Parameter   | Value                                          |
| ------------------- | ---------------------------------------------- |
| Name                | `Nguyen Van Test`                              |
| Email (Cố tình gửi) | `hacker@domain.com` (Email mới khác email gốc) |
| Phone               | `0912345678`                                   |

## Test steps

1. Sử dụng công cụ (API Client / REST Client) gửi request `PUT /api/users/me` kèm Token của user `test@eshop.com`.
2. Truyền Body JSON cố tình chứa trường `email: "hacker@domain.com"`.
3. Kiểm tra phản hồi HTTP và gửi request `GET /api/users/me` để đối chiếu lại email của user trong CSDL.

## Expected result

- Đối chiếu với **Minimal Guarantees**:
  - Email của người dùng trong CSDL giữ nguyên là `test@eshop.com` (không bị thay đổi thành `hacker@domain.com`).
  - Hệ thống bỏ qua thuộc tính `email` trong request body.

## Status / Related bugs

Pass / None
