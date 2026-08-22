# Tổng hợp bug từ lần chạy full 2026-08-22

| Bug ID              | API                       | Severity | Mô tả ngắn                                         | Test đại diện          | GitHub Issue |
| ------------------- | ------------------------- | -------- | -------------------------------------------------- | ---------------------- | ------------ |
| BUG-USRME-001       | GET `/api/users/me`       | Critical | Lộ mật khẩu plaintext và reset token               | FR04-USRME-SC-002      | Chưa tạo     |
| BUG-USRME-002       | PUT `/api/users/me`       | Critical | Mass assignment cho phép tự nâng role admin        | FR04-USRME-SEC-003     | Chưa tạo     |
| BUG-USRME-003       | PUT `/api/users/me`       | Major    | Thiếu validation và cập nhật không nguyên tử       | FR04-USRME-DP-004      | Chưa tạo     |
| BUG-USRME-004       | PUT `/api/users/me`       | Major    | Content-Type sai gây 500 HTML và lộ stack trace    | FR04-USRME-DP-022      | Chưa tạo     |
| BUG-USRME-005       | PUT `/api/users/me`       | Major    | Partial update làm các trường không gửi thành null | FR04-USRME-DP-007      | Chưa tạo     |
| BUG-APPLYCOUPON-001 | POST `/api/apply-coupon`  | Critical | Không bắt buộc JWT hợp lệ                          | FR09-APPLY-SEC-001     | Chưa tạo     |
| BUG-APPLYCOUPON-002 | POST `/api/apply-coupon`  | Critical | Tính discount/final amount sai                     | FR09-APPLY-ST-007      | Chưa tạo     |
| BUG-APPLYCOUPON-003 | POST `/api/apply-coupon`  | Major    | Chấp nhận total_amount sai kiểu                    | FR09-APPLY-DP-015      | Chưa tạo     |
| BUG-APPLYCOUPON-004 | POST `/api/apply-coupon`  | Minor    | Hết lượt dùng trả 400 thay vì 409                  | FR09-APPLY-ST-002      | Chưa tạo     |
| BUG-APPLYCOUPON-005 | POST `/api/apply-coupon`  | Major    | Tổng tiền bằng min_order_amount bị từ chối         | FR09-APPLY-DP-002      | Chưa tạo     |
| BUG-ADMINCOUPON-001 | POST `/api/admin/coupons` | Critical | User thường gọi được API admin                     | FR17-ADMINCOUP-SEC-002 | Chưa tạo     |
| BUG-ADMINCOUPON-002 | POST `/api/admin/coupons` | Major    | Thiếu validation dữ liệu coupon                    | FR17-ADMINCOUP-DP-004  | Chưa tạo     |
| BUG-ADMINCOUPON-003 | POST `/api/admin/coupons` | Minor    | Tạo thành công trả 200 thay vì 201                 | FR17-ADMINCOUP-DP-001  | Chưa tạo     |
| BUG-ADMINCOUPON-004 | POST `/api/admin/coupons` | Major    | Code trùng gây 500 và lộ lỗi SQLite                | FR17-ADMINCOUP-DP-006  | Chưa tạo     |
| BUG-ADMINCOUPON-005 | POST `/api/admin/coupons` | Minor    | JWT bị chỉnh sửa trả 403 thay vì 401               | FR17-ADMINCOUP-SEC-003 | Chưa tạo     |

15 bug được gom theo nguyên nhân gốc từ 385 assertion failure. Không xem mỗi assertion fail là một bug độc lập. Link GitHub Issue chỉ được điền sau khi issue thật được tạo và screenshot thật được người dùng xác nhận.
