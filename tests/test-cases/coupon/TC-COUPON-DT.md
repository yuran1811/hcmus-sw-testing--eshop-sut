# TC-COUPON-DT: Domain Testing — Mã Giảm Giá / Apply Coupon

## Requirement ID

FR-09

## How Domain Testing Was Applied

- Identified core input variables: `code` (mã giảm giá nhập vào), `total_amount` (tổng giá trị đơn hàng), `user_id` (trạng thái xác thực/đăng nhập của người dùng), `usage_count` (số lần đã dùng mã của người dùng), và `discount_type` (loại giảm giá của mã).
- Defined the domain rules for each input variable.
- Created equivalence partitions: 1 valid and 3 invalid partitions for `code`; 2 valid and 2 invalid partitions for `total_amount`; 1 valid and 1 invalid partition for `user_id` (authentication status); 1 valid and 1 invalid partition for `usage_count`; 2 valid partitions for `discount_type`.
- Selected representative values for each partition.
- Designed 11 test cases (TC-COUPON-001 to TC-COUPON-011) using the Single Fault Assumption to isolate failure triggers.

## Input Domain Analysis

### Variable: code (mã giảm giá nhập vào)

| Partition | Type    | Description                                | Representative Value |
| --------- | ------- | ------------------------------------------ | -------------------- |
| EP-CODE-1 | Valid   | Mã tồn tại trong DB và đang hoạt động      | `SAVE10`             |
| EP-CODE-2 | Invalid | Mã không tồn tại trong DB                  | `NOTEXIST`           |
| EP-CODE-3 | Invalid | Mã tồn tại nhưng bị vô hiệu hóa (active=0) | `INACTIVE`           |
| EP-CODE-4 | Invalid | Mã tồn tại nhưng đã hết hạn sử dụng        | `EXPIRED`            |

### Variable: total_amount (tổng đơn hàng)

| Partition  | Type    | Description                                    | Representative Value |
| ---------- | ------- | ---------------------------------------------- | -------------------- |
| EP-TOTAL-1 | Valid   | Trên ngưỡng đơn hàng tối thiểu của mã (SAVE10) | `400,000`            |
| EP-TOTAL-2 | Valid   | Đúng ngưỡng đơn hàng tối thiểu của mã (BIGBUY) | `500,000`            |
| EP-TOTAL-3 | Invalid | Dưới ngưỡng đơn hàng tối thiểu của mã (SAVE10) | `299,999`            |
| EP-TOTAL-4 | Invalid | Tổng đơn hàng bằng 0                           | `0`                  |

### Variable: Trạng thái xác thực (JWT Token / user_id)

| Partition | Type    | Description                                  | Representative Value     |
| --------- | ------- | -------------------------------------------- | ------------------------ |
| EP-AUTH-1 | Valid   | Đã đăng nhập (có JWT Token / user_id hợp lệ) | Đăng nhập tài khoản test |
| EP-AUTH-2 | Invalid | Chưa đăng nhập (không truyền user_id / JWT)  | Không truyền token/id    |

### Variable: Số lần đã dùng mã (usage_count vs max_uses_per_user)

| Partition  | Type    | Description                            | Representative Value |
| ---------- | ------- | -------------------------------------- | -------------------- |
| EP-USAGE-1 | Valid   | Số lần đã sử dụng dưới giới hạn tối đa | `0`                  |
| EP-USAGE-2 | Invalid | Đã dùng đạt hoặc vượt giới hạn tối đa  | `1` (giới hạn = 1)   |

### Variable: Loại mã giảm giá (discount_type)

| Partition | Type  | Description                                          | Representative Value |
| --------- | ----- | ---------------------------------------------------- | -------------------- |
| EP-TYPE-1 | Valid | Loại phần trăm (`percent`): Giảm theo tỷ lệ đơn hàng | `percent` (SAVE10)   |
| EP-TYPE-2 | Valid | Loại tiền cố định (`fixed`): Giảm số tiền cụ thể     | `fixed` (BIGBUY)     |

---

## Test Cases Summary

| TC ID         | Description                                                                         | Partition Exercised                                                   | Expected                                       |
| ------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ---------------------------------------------- |
| TC-COUPON-001 | Áp dụng mã SAVE10 (percent) hợp lệ, total = 400k → giảm 40k, còn 360k               | Tất cả EP-V (EP-CODE-1, EP-TOTAL-1, EP-AUTH-1, EP-USAGE-1, EP-TYPE-1) | Pass (Discount 40k, Final 360k)                |
| TC-COUPON-002 | Áp dụng mã BIGBUY (fixed) hợp lệ, total = 500k → giảm 50k, còn 450k                 | EP-TOTAL-2, EP-TYPE-2, các EP-V khác                                  | Pass (Discount 50k, Final 450k)                |
| TC-COUPON-003 | Nhập mã không tồn tại trong hệ thống (NOTEXIST) → báo lỗi phù hợp                   | EP-CODE-2                                                             | Fail (Error: Mã không tồn tại...)              |
| TC-COUPON-004 | Nhập mã bị vô hiệu hóa (INACTIVE, is_active=0) → báo lỗi phù hợp                    | EP-CODE-3                                                             | Fail (Error: Mã không tồn tại...)              |
| TC-COUPON-005 | Nhập mã đã hết hạn sử dụng (EXPIRED) → báo lỗi phù hợp                              | EP-CODE-4                                                             | Fail (Error: Mã giảm giá đã hết hạn)           |
| TC-COUPON-006 | Đơn hàng 299,999 ₫ dưới ngưỡng tối thiểu của SAVE10 (300k) → báo lỗi                | EP-TOTAL-3                                                            | Fail (Error: Đơn hàng chưa đủ...)              |
| TC-COUPON-007 | Đơn hàng 0 ₫ dưới ngưỡng tối thiểu của SAVE10 (300k) → báo lỗi                      | EP-TOTAL-4                                                            | Fail (Error: Đơn hàng chưa đủ...)              |
| TC-COUPON-008 | Áp dụng mã khi chưa đăng nhập (không gửi user_id hoặc token không hợp lệ) → báo lỗi | EP-AUTH-2                                                             | Fail (Error: Unauthorized / Yêu cầu đăng nhập) |
| TC-COUPON-009 | Áp dụng mã SAVE10 khi đã dùng hết lượt (đã dùng 1 lần, max = 1) → báo lỗi           | EP-USAGE-2 (đã dùng = 1)                                              | Fail (Error: Bạn đã sử dụng mã này...)         |
| TC-COUPON-010 | Áp dụng mã VIP100 lần 2 (đã dùng 1 lần, max = 2) → thành công, giảm 100k            | EP-USAGE-1 (đã dùng 1 < max 2)                                        | Pass (Discount 100k, Final 200k)               |
| TC-COUPON-011 | Áp dụng mã VIP100 lần 3 (đã dùng 2 lần, max = 2) → báo lỗi                          | EP-USAGE-2 (đã dùng 2 = max 2)                                        | Fail (Error: Bạn đã sử dụng mã này...)         |
