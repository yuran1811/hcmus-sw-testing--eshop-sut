# TC-COUPON-ADMIN-001: Tạo mã giảm giá percent hợp lệ thành công

## Requirement ID

FR-17, FR-12

## Module / Test type / Technique

Coupon Admin / Functional / Domain Testing

## Preconditions

- Backend chạy tại `http://localhost:3000`
- Web Admin chạy tại `http://localhost:5174`
- Đăng nhập thành công với tài khoản Admin (`admin@eshop.com` / `Admin123!`).
- Mã coupon `SUMMER25` chưa tồn tại trong hệ thống.

## Test Data

| Field             | Value          |
| ----------------- | -------------- |
| code              | `"SUMMER25"`   |
| type              | `"percent"`    |
| discount_value    | `15`           |
| min_order_amount  | `200000`       |
| expired_at        | `"2099-12-31"` |
| max_uses_per_user | `5`            |

## Test Steps

1. Truy cập vào trang quản trị Web Admin `http://localhost:5174`.
2. Tại thanh menu bên trái, nhấp chọn tab "Mã Giảm Giá".
3. Điền đầy đủ thông tin vào Form "Tạo mã giảm giá mới" theo dữ liệu kiểm thử:
   - Mã coupon: `SUMMER25`
   - Loại: `Phần trăm (%)`
   - Giá trị %: `15`
   - Đơn tối thiểu: `200000`
   - Ngày hết hạn: Chọn ngày `31/12/2099` (hoặc nhập `2099-12-31`)
   - Số lần dùng tối đa/người: `5`
4. Bấm nút "Tạo mã".
5. Quan sát thông báo của hệ thống và danh sách mã giảm giá hiển thị phía dưới.

## Expected Result

- Hệ thống xử lý thành công, không xuất hiện thông báo lỗi.
- Danh sách mã giảm giá cập nhật thêm dòng mới chứa mã `SUMMER25`:
  - Loại: `Phần trăm`
  - Giá trị: `15%`
  - Đơn tối thiểu: `200,000 ₫`
  - Hết hạn: `2099-12-31`
  - Giới hạn/người: `5 lần`

## Status / Related Bugs

Not Run / None
