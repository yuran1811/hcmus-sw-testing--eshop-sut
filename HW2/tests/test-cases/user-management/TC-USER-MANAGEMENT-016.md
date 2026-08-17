# TC-USER-MANAGEMENT-016: Nhất quán màu sắc nút hành động nguy hiểm - Nút Xóa phải màu đỏ

## Requirement ID

FR-21

## Module / Test type / Technique

user-management / GUI / Error Isolation

## Preconditions

- Tài khoản Admin `admin@eshop.com` đang đăng nhập.
- Danh sách người dùng hiển thị ít nhất một tài khoản người dùng thường khác có nút "Xóa".

## Test data

| Parameter | Value |
| --- | --- |
| userSession | logged in as admin@eshop.com (role = admin) |

## Test steps

1. Đăng nhập Admin Portal và mở trang "Quản lý Người dùng".
2. Tìm nút hành động "Xóa" tương ứng với một người dùng thường khác trong bảng.
3. Quan sát màu sắc hiển thị trực quan của nút bấm này.
4. Kiểm tra class CSS hoặc mã màu của nút bấm bằng công cụ Inspect Element (ví dụ: class Tailwind như `bg-red-600`, `text-red-500` hoặc mã màu HEX như `#FF0000`, `#DC2626`).

## Expected result

- Nút "Xóa" phải được hiển thị bằng màu đỏ đặc trưng cho hành động nguy hiểm/hủy bỏ (Danger button color compliance) theo đúng tiêu chuẩn FR-21.
- Không được dùng các màu sắc khác như xanh dương (nút tích cực), xanh lá, hoặc xám thông thường cho nút xóa đang hoạt động.

## Status / Related bugs

Not Run / None
