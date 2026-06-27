# TC-COUPON-ADMIN-024: expired_at = ngày trong quá khứ (vd: "2020-01-01") → hành vi cần xác minh

## Requirement ID

FR-17

## Module / Test type / Technique

Coupon Admin / Functional / Domain Testing (Exploratory)

## Preconditions

- Backend chạy tại `http://localhost:3000`
- Web Admin chạy tại `http://localhost:5174`
- Đăng nhập thành công với tài khoản Admin (`admin@eshop.com` / `Admin123!`).
- Mã `PASTEXPIRY` chưa tồn tại trong hệ thống.

## Test Data

| Field             | Value          |
| ----------------- | -------------- |
| code              | `"PASTEXPIRY"` |
| type              | `"percent"`    |
| discount_value    | `15`           |
| min_order_amount  | `200000`       |
| expired_at        | `"2020-01-01"` |
| max_uses_per_user | `5`            |

## Test Steps

1. Truy cập vào trang quản trị Web Admin `http://localhost:5174`.
2. Tại thanh menu bên trái, nhấp chọn tab "Mã Giảm Giá".
3. Điền thông tin vào Form "Tạo mã giảm giá mới" theo dữ liệu kiểm thử (ngày expired_at là quá khứ):
   - Mã coupon: `PASTEXPIRY`
   - Loại: `Phần trăm (%)`
   - Giá trị %: `15`
   - Đơn tối thiểu: `200000`
   - Ngày hết hạn: Chọn ngày `01/01/2020` (hoặc nhập `2020-01-01`)
   - Số lần dùng tối đa/người: `5`
4. Bấm nút "Tạo mã".
5. Quan sát hành vi phản hồi của hệ thống.

## Expected Result

- Ca kiểm thử này mang tính chất thăm dò hành vi hệ thống:
  - **Kịch bản A (Cho phép tạo):** Coupon được tạo thành công, xuất hiện ở danh sách mã giảm giá và hiển thị trạng thái "Hết hạn". (Hành vi này chấp nhận được vì đặc tả chỉ cấm _áp dụng_ mã đã hết hạn khi checkout chứ không cấm admin lưu thông tin lịch sử).
  - **Kịch bản B (Từ chối tạo):** Hệ thống chặn ngay từ form hoặc backend trả về lỗi chỉ cho phép nhập ngày tương lai.
  - Cần ghi nhận lại kết quả thực tế để đối chiếu với kỳ vọng nghiệp vụ.

## Status / Related Bugs

Not Run / None
