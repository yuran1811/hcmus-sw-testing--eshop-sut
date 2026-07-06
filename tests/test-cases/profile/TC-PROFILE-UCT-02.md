# TC-PROFILE-UCT-02: Cập nhật hồ sơ thất bại khi nhập Số điện thoại ít hơn 10 chữ số (Extension 3a)

## Requirement ID

FR-04

## Module / Test type / Technique

profile / Functional / Use Case Testing

## Scenario Type / Extension ID

Extension 3a

## Primary Actor

Người dùng đã đăng nhập (Logged-in User)

## Preconditions

- Người dùng đã đăng nhập thành công.

## Test data

| Field / Parameter | Value                                                     |
| ----------------- | --------------------------------------------------------- |
| Name              | `Nguyen Van Test`                                         |
| Phone             | `09123` (Chỉ có 5 chữ số — vi phạm quy định 10-11 chữ số) |
| Shipping Address  | `123 Đường ABC`                                           |

## Test steps

1. Truy cập trang Cập nhật hồ sơ (hoặc gửi request `PUT /api/users/me`).
2. Nhập Số điện thoại = `09123` (dưới 10 chữ số).
3. Bấm "Lưu thay đổi".

## Expected result

- Đối chiếu với **Minimal Guarantees**:
  - Hệ thống từ chối cập nhật và trả về thông báo lỗi phù hợp (ví dụ: "Số điện thoại phải từ 10-11 chữ số").
  - Thông tin số điện thoại cũ trong CSDL được giữ nguyên, không bị sai lệch dữ liệu.

## Status / Related bugs

Fail / BUG-PROFILE-002
