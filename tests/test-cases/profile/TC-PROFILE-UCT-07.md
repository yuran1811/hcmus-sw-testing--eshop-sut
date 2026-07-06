# TC-PROFILE-UCT-07: Cập nhật hồ sơ thất bại khi chưa đăng nhập hoặc Token JWT không hợp lệ (Extension 1a)

## Requirement ID

FR-04

## Module / Test type / Technique

profile / Functional / Use Case Testing

## Scenario Type / Extension ID

Extension 1a

## Primary Actor

Người dùng chưa đăng nhập (Unauthenticated User)

## Preconditions

- Không truyền Header `Authorization` hoặc truyền Token JWT bị hết hạn / hư hỏng.

## Test data

| Field / Parameter    | Value                                |
| -------------------- | ------------------------------------ |
| Authorization Header | Rỗng hoặc `Bearer invalid_token_123` |
| Name                 | `Hacker Name`                        |
| Phone                | `0912345678`                         |

## Test steps

1. Gửi request `PUT /api/users/me` không kèm Header `Authorization` (hoặc Token sai).
2. Kiểm tra phản hồi HTTP từ server.

## Expected result

- Đối chiếu với **Minimal Guarantees**:
  - Server từ chối xử lý, trả về mã lỗi HTTP `401 Unauthorized` hoặc `403 Forbidden`.
  - Không có thông tin người dùng nào trong hệ thống bị thay đổi.

## Status / Related bugs

Pass / None
