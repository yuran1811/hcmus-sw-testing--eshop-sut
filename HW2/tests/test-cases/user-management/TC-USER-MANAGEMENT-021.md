# TC-USER-MANAGEMENT-021: Kiểm tra thứ tự chuyển tiêu điểm bàn phím (Tab Order) trên bảng danh sách người dùng (FR-21)

## Requirement ID

FR-21

## Module / Test type / Technique

user-management / GUI / Error Isolation

## Preconditions

- Tài khoản Admin đã đăng nhập và đang đứng tại trang "Quản lý Người dùng" của Admin Portal.
- Tiêu điểm (focus) hiện tại đang nằm ở thanh điều hướng bên cạnh (Sidebar).

## Test data

| Parameter | Value |
| --- | --- |
| userSession | logged in as admin |

## Test steps

1. Nhấn phím `Tab` liên tục trên bàn phím.
2. Quan sát đường đi của đường viền tiêu điểm (focus indicator border) trên các phần tử của trang.

## Expected result

- Tiêu điểm di chuyển tuần tự đúng quy chuẩn giao diện tiếp cận từ trên xuống dưới, từ trái sang phải (FR-21): Sidebar -> Tiêu đề bảng -> Nút Xóa của người dùng dòng 1 -> Nút Xóa của người dùng dòng 2 -> ... -> Footer.
- Không có hiện tượng tiêu điểm di chuyển lộn xộn, nhảy cóc, hoặc bỏ qua các nút "Xóa" hoạt động trên danh sách bảng.

## Status / Related bugs

Not Run / None
