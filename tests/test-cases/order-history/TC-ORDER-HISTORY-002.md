# TC-ORDER-HISTORY-002: Chặn truy cập trang Lịch sử đơn hàng khi chưa đăng nhập (Functional - Security)

## Requirement ID

FR-11

## Module / Test type / Technique

order-history / Functional & Security / Equivalence Partitioning (Invalid Session)

## Preconditions

- Người dùng ở trạng thái chưa đăng nhập (khách vãng lai).

## Test data

| Parameter | Value |
| --- | --- |
| userSession | anonymous (không đăng nhập) |

## Test steps

1. Mở trình duyệt và truy cập trang chủ EShop tại địa chỉ `http://localhost:5173`.
2. Nhập trực tiếp địa chỉ trang Lịch sử đơn hàng vào thanh địa chỉ của trình duyệt: `http://localhost:5173/orders`.
3. Nhấn Enter và quan sát hành vi của hệ thống.

## Expected result

- Hệ thống từ chối quyền truy cập của người dùng chưa đăng nhập.
- Người dùng ngay lập tức bị điều hướng về trang Đăng nhập (`http://localhost:5173/login`).
- Hiển thị thông báo yêu cầu: "Vui lòng đăng nhập để xem lịch sử đơn hàng của bạn".

## Status / Related bugs

Not Run / None
