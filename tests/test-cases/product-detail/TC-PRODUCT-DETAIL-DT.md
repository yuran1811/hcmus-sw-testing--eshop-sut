# TC-PRODUCT-DETAIL-DT: Domain Testing — Product Detail

## Requirement ID

FR-06

## How Domain Testing Was Applied

- Identified core input variables: `product_id` (URL parameter) and `quantity` (form input field).
- Defined the domain rules for each input variable.
- Created equivalence partitions: 1 valid and 2 invalid partitions for `product_id`; 1 valid and 5 invalid partitions for `quantity`.
- Selected representative values for each partition.
- Designed 9 test cases utilizing Single Fault Assumption to isolate failure triggers.

## Input Domain Analysis

### Variable: product_id (URL parameter)

| Partition | Type    | Description                  | Representative Value |
| --------- | ------- | ---------------------------- | -------------------- |
| EP-ID-1   | Valid   | ID sản phẩm tồn tại trong DB | `1`                  |
| EP-ID-2   | Invalid | ID không tồn tại trong DB    | `9999`               |
| EP-ID-3   | Invalid | ID không phải số nguyên      | `"abc"`              |

### Variable: quantity (form field, số lượng)

| Partition | Type    | Description               | Representative Value |
| --------- | ------- | ------------------------- | -------------------- |
| EP-Q-1    | Valid   | Số nguyên dương >= 1      | `2`                  |
| EP-Q-2    | Invalid | Bằng 0                    | `0`                  |
| EP-Q-3    | Invalid | Số âm                     | `-1`                 |
| EP-Q-4    | Invalid | Số thập phân              | `1.5`                |
| EP-Q-5    | Invalid | Ô nhập bỏ trống           | `""`                 |
| EP-Q-6    | Invalid | Chuỗi ký tự không phải số | `"abc"`              |

## Test Cases Summary

| TC ID                 | Description                                                                                                | Partition Exercised       | Expected           |
| --------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------- | ------------------ |
| TC-PRODUCT-DETAIL-001 | Product ID hợp lệ → hiển thị đầy đủ: ảnh, tên, giá, mô tả, danh mục                                        | EP-ID-1, EP-Q-1 (default) | Pass               |
| TC-PRODUCT-DETAIL-002 | Product ID không tồn tại (9999) → hiển thị thông báo lỗi phù hợp                                           | EP-ID-2                   | Fail (Error Shown) |
| TC-PRODUCT-DETAIL-003 | Product ID không phải số ("abc") → hiển thị lỗi phù hợp                                                    | EP-ID-3                   | Fail (Error Shown) |
| TC-PRODUCT-DETAIL-004 | Quantity hợp lệ (2) → thêm vào giỏ thành công; hiển thị toast notification và/hoặc badge giỏ hàng cập nhật | EP-Q-1                    | Pass               |
| TC-PRODUCT-DETAIL-005 | Quantity = 0 → bị từ chối (không thêm được vào giỏ)                                                        | EP-Q-2                    | Fail (Error Shown) |
| TC-PRODUCT-DETAIL-006 | Quantity = số âm (-1) → bị từ chối                                                                         | EP-Q-3                    | Fail (Error Shown) |
| TC-PRODUCT-DETAIL-007 | Quantity = số thập phân (1.5) → bị từ chối                                                                 | EP-Q-4                    | Fail (Error Shown) |
| TC-PRODUCT-DETAIL-008 | Quantity = rỗng → bị từ chối khi bấm "Thêm vào giỏ hàng"                                                   | EP-Q-5                    | Fail (Error Shown) |
| TC-PRODUCT-DETAIL-009 | Quantity = "abc" (chuỗi ký tự không phải số) → bị từ chối                                                  | EP-Q-6                    | Fail (Error Shown) |
