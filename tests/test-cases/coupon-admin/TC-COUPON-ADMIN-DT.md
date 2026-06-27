# TC-COUPON-ADMIN-DT: Domain Testing — Quản lý Mã Giảm Giá Admin / Coupon Admin CRUD

## Requirement ID

FR-17, FR-12, SEC-03, SEC-04

## How Domain Testing Was Applied

- Xác định các biến đầu vào chính khi Admin tạo mã giảm giá: `code` (mã giảm giá), `type` (loại giảm giá), `discount_value` (giá trị giảm), `expired_at` (ngày hết hạn), `min_order_amount` (ngưỡng đơn hàng tối thiểu), `max_uses_per_user` (số lần dùng tối đa mỗi người) và trạng thái phân quyền/auth.
- Định nghĩa các quy tắc nghiệp vụ cho từng biến đầu vào.
- Thiết lập các phân vùng tương đương (Equivalence Partitions - EP): bao gồm phân vùng hợp lệ (Valid EP) và phân vùng không hợp lệ (Invalid EP) cho mỗi quy tắc nghiệp vụ.
- Thiết kế các test case sử dụng nguyên tắc Single Fault Assumption (chỉ thay đổi một biến sang phân vùng lỗi tại một thời điểm, giữ các biến khác ở giá trị hợp lệ).
- Bổ sung các ca kiểm thử bảo mật (phân quyền vai trò người dùng, kiểm tra XSS khi lưu mã giảm giá).

## Input Domain Analysis

### Variable: code (mã giảm giá)

| Partition | Type    | Description                  | Representative Value |
| --------- | ------- | ---------------------------- | -------------------- |
| EP-CODE-1 | Valid   | Chuỗi duy nhất, không rỗng   | `"SUMMER25"`         |
| EP-CODE-2 | Invalid | Chuỗi rỗng (không nhập)      | `""`                 |
| EP-CODE-3 | Invalid | Trùng mã đã tồn tại trong DB | `"SAVE10"`           |

### Variable: type (loại giảm giá)

| Partition | Type    | Description                        | Representative Value |
| --------- | ------- | ---------------------------------- | -------------------- |
| EP-TYPE-1 | Valid   | Giảm theo phần trăm                | `"percent"`          |
| EP-TYPE-2 | Valid   | Giảm theo số tiền cố định          | `"fixed"`            |
| EP-TYPE-3 | Invalid | Giá trị ngoài tập {percent, fixed} | `"voucher"`          |

### Variable: discount_value (giá trị giảm)

| Partition | Type    | Description                         | Representative Value |
| --------- | ------- | ----------------------------------- | -------------------- |
| EP-DV-1   | Valid   | Số dương (lớn hơn 0)                | `15`                 |
| EP-DV-2   | Invalid | Bằng 0 (BVA OFF cho discount_value) | `0`                  |
| EP-DV-3   | Invalid | Số âm (nhỏ hơn 0)                   | `-10`                |

### Variable: expired_at (ngày hết hạn)

| Partition | Type    | Description                  | Representative Value |
| --------- | ------- | ---------------------------- | -------------------- |
| EP-EXP-1  | Valid   | Ngày tương lai hợp lệ        | `"2099-12-31"`       |
| EP-EXP-2  | Invalid | Thiếu trường bắt buộc (rỗng) | `""`                 |
| EP-EXP-3  | Invalid | Định dạng ngày không hợp lệ  | `"31-12-2099"`       |

### Variable: min_order_amount (ngưỡng đơn hàng tối thiểu)

| Partition | Type    | Description     | Representative Value |
| --------- | ------- | --------------- | -------------------- |
| EP-MOA-1  | Valid   | Bằng 0 (BVA ON) | `0`                  |
| EP-MOA-2  | Valid   | Số dương (> 0)  | `200000`             |
| EP-MOA-3  | Invalid | Số âm (BVA OFF) | `-1`                 |

### Variable: max_uses_per_user (số lần dùng tối đa mỗi người)

| Partition | Type    | Description               | Representative Value |
| --------- | ------- | ------------------------- | -------------------- |
| EP-MPU-1  | Valid   | Bằng 1 (BVA ON, đúng min) | `1`                  |
| EP-MPU-2  | Valid   | Số nguyên dương > 1       | `5`                  |
| EP-MPU-3  | Invalid | Bằng 0 (BVA OFF)          | `0`                  |
| EP-MPU-4  | Invalid | Số âm                     | `-1`                 |

### Variable: Trạng thái xác thực / Phân quyền

| Partition | Type    | Description                         | Representative Value |
| --------- | ------- | ----------------------------------- | -------------------- |
| EP-ROLE-1 | Valid   | JWT Token hợp lệ, role = admin      | admin@eshop.com      |
| EP-ROLE-2 | Invalid | Không có JWT Token (chưa đăng nhập) | Không gửi token      |
| EP-ROLE-3 | Invalid | JWT Token hợp lệ nhưng role = user  | test@eshop.com       |

---

## Test Cases Summary

| TC ID               | Description                                                               | Partition Exercised                                                                  | Expected                                     |
| ------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | -------------------------------------------- |
| TC-COUPON-ADMIN-001 | Tất cả trường hợp lệ (loại percent) → tạo thành công                      | Tất cả EP-V (EP-CODE-1, EP-TYPE-1, EP-DV-1, EP-EXP-1, EP-MOA-2, EP-MPU-2, EP-ROLE-1) | Pass (Coupon được tạo)                       |
| TC-COUPON-ADMIN-002 | Tất cả trường hợp lệ (loại fixed) → tạo thành công                        | EP-TYPE-2, các EP-V khác                                                             | Pass (Coupon được tạo)                       |
| TC-COUPON-ADMIN-003 | code = rỗng → bị từ chối, báo lỗi                                         | EP-CODE-2                                                                            | Fail (Lỗi yêu cầu code)                      |
| TC-COUPON-ADMIN-004 | code trùng với mã đã tồn tại (SAVE10) → bị từ chối                        | EP-CODE-3                                                                            | Fail (Lỗi trùng code)                        |
| TC-COUPON-ADMIN-005 | type = giá trị không hợp lệ ("voucher") → bị từ chối                      | EP-TYPE-3                                                                            | Fail (Lỗi loại không hợp lệ)                 |
| TC-COUPON-ADMIN-006 | discount_value = 0 → bị từ chối (BVA OFF)                                 | EP-DV-2                                                                              | Fail (Lỗi giá trị giảm phải dương)           |
| TC-COUPON-ADMIN-007 | discount_value = số âm (-10) → bị từ chối                                 | EP-DV-3                                                                              | Fail (Lỗi giá trị giảm phải dương)           |
| TC-COUPON-ADMIN-008 | expired_at = rỗng → bị từ chối                                            | EP-EXP-2                                                                             | Fail (Lỗi ngày hết hạn bắt buộc)             |
| TC-COUPON-ADMIN-009 | expired_at = sai định dạng ("31-12-2099") → bị từ chối                    | EP-EXP-3                                                                             | Fail (Lỗi định dạng ngày)                    |
| TC-COUPON-ADMIN-010 | min_order_amount = số âm (-1) → bị từ chối (BVA OFF)                      | EP-MOA-3                                                                             | Fail (Lỗi ngưỡng tối thiểu >= 0)             |
| TC-COUPON-ADMIN-011 | max_uses_per_user = 0 → bị từ chối (BVA OFF)                              | EP-MPU-3                                                                             | Fail (Lỗi lượt dùng tối đa >= 1)             |
| TC-COUPON-ADMIN-012 | max_uses_per_user = số âm (-1) → bị từ chối                               | EP-MPU-4                                                                             | Fail (Lỗi lượt dùng tối đa >= 1)             |
| TC-COUPON-ADMIN-013 | Xóa coupon theo ID hợp lệ → xóa thành công                                | Thao tác Xóa (ID hợp lệ), EP-ROLE-1                                                  | Pass (Xóa thành công)                        |
| TC-COUPON-ADMIN-014 | Xóa coupon theo ID không tồn tại → trả về lỗi (4xx)                       | Thao tác Xóa (ID không tồn tại), EP-ROLE-1                                           | Fail (Lỗi không tìm thấy coupon)             |
| TC-COUPON-ADMIN-015 | Lấy danh sách coupon → trả về đầy đủ các trường                           | Thao tác Xem, EP-ROLE-1                                                              | Pass (Trả về danh sách coupon)               |
| TC-COUPON-ADMIN-016 | Chưa đăng nhập (không có JWT) → 401 Unauthorized                          | EP-ROLE-2                                                                            | Fail (401 Unauthorized)                      |
| TC-COUPON-ADMIN-017 | Đăng nhập với role = user (non-admin) → 403 Forbidden                     | EP-ROLE-3                                                                            | Fail (403 Forbidden)                         |
| TC-COUPON-ADMIN-024 | expired_at = ngày trong quá khứ ("2020-01-01") → kiểm thử thăm dò hành vi | Thăm dò (expired_at quá khứ)                                                         | Thăm dò (Xác minh tạo được/hay bị chặn)      |
| TC-COUPON-ADMIN-025 | Thiếu hoàn toàn trường bắt buộc trong body (code) → bị từ chối            | Thiếu trường bắt buộc trong payload                                                  | Fail (Lỗi thiếu trường dữ liệu)              |
| TC-COUPON-ADMIN-026 | Tạo mã coupon với code chứa mã độc JS → kiểm tra escape an toàn           | Kiểm thử bảo mật (XSS input)                                                         | Pass (Coupon được lưu hoặc hiển thị escaped) |
