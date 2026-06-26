# TC-ORDER-HISTORY-001: Hiển thị danh sách lịch sử đơn hàng thành công (Happy Path)

## Requirement ID

FR-11

## Module / Test type / Technique

order-history / Functional / Equivalence Partitioning (Valid Input)

## Preconditions

- Người dùng đã đăng nhập thành công vào tài khoản `test@eshop.com`.
- Người dùng có 5 đơn hàng trong cơ sở dữ liệu.

## Test data

| Parameter | Value |
| --- | --- |
| userSession | logged in as test@eshop.com |
| ordersInDB | 5 orders |

## Test steps

1. Truy cập trang chủ EShop tại địa chỉ `http://localhost:5173`.
2. Đăng nhập với tài khoản `test@eshop.com`.
3. Đi tới trang Lịch sử đơn hàng bằng cách nhấp vào biểu tượng Tài khoản hoặc liên kết Lịch sử đơn hàng (`http://localhost:5173/orders`).
4. Kiểm tra sự xuất hiện của bảng danh sách đơn hàng.
5. Kiểm tra tính đầy đủ của các trường hiển thị cho từng đơn hàng: Mã đơn, Ngày đặt, Tổng tiền, Trạng thái hiện tại.
6. Xác nhận các trạng thái đơn hàng được hiển thị hoàn toàn bằng tiếng Việt.

## Expected result

- Hệ thống hiển thị danh sách 5 đơn hàng của chính người dùng.
- Mỗi hàng đơn hàng hiển thị đầy đủ 4 trường: Mã đơn, Ngày đặt, Tổng tiền, Trạng thái hiện tại.
- Trạng thái được dịch sang tiếng Việt chính xác (ví dụ: "chờ xác nhận", "đã giao") và có phân biệt màu sắc (ví dụ: chờ xác nhận có màu vàng/cam, đã giao có màu xanh lá).
- Người dùng không thấy đơn hàng của bất kỳ tài khoản nào khác.

## Status / Related bugs

Not Run / None
