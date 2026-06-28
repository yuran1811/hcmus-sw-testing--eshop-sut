# BUG-PRODUCT-002: Không validate giá sản phẩm (chấp nhận giá = 0, âm, trống, không phải số)

## Found by Test Case

TC-PRODUCT-007, TC-PRODUCT-008, TC-PRODUCT-009, TC-PRODUCT-010

## Requirement liên quan

FR-15 (Quản lý Sản phẩm — giá phải là số dương)

## Severity / Priority

Critical / P1

## Environment

- Browser: Chromium (Desktop Chrome)
- OS: Windows 11
- URL: http://localhost:5174 (frontend-admin)
- Build: nhánh `anh-khoa`, commit `a7b11fd`

## Steps to reproduce

**Kịch bản 1 — Giá = 0 (TC-PRODUCT-007):**

1. Đăng nhập trang Admin
2. Thêm sản phẩm mới, nhập tên hợp lệ, đặt giá = `0`
3. Bấm "Lưu"

**Kịch bản 2 — Giá âm (TC-PRODUCT-008):**

1. Tương tự, đặt giá = `-1` hoặc bất kỳ số âm nào
2. Bấm "Lưu"

**Kịch bản 3 — Giá trống (TC-PRODUCT-009):**

1. Tương tự, để trống trường Giá
2. Bấm "Lưu"

**Kịch bản 4 — Giá không phải số (TC-PRODUCT-010):**

1. Tương tự, nhập `abc` vào trường Giá
2. Bấm "Lưu"

## Expected result

Cả 4 kịch bản: hệ thống từ chối với thông báo lỗi tương ứng ("Giá phải là số dương", "Giá không được để trống", v.v.). Không tạo sản phẩm.

## Actual result

Cả 4 kịch bản đều bị hệ thống chấp nhận, sản phẩm được lưu mà không có bất kỳ validation nào cho trường giá.

```
Error: Spec yêu cầu reject khi Giá = 0
Error: Spec yêu cầu reject khi Giá âm
Error: Spec yêu cầu reject khi Giá rỗng
Error: Spec yêu cầu reject khi Giá không hợp lệ
```

## Evidence

- Screenshot (giá = 0): ![BUG-PRODUCT-002-zero](../screenshots/BUG-PRODUCT-002-price-zero.png)
- Screenshot (giá âm): ![BUG-PRODUCT-002-neg](../screenshots/BUG-PRODUCT-002-price-negative.png)
- Screenshot (giá trống): ![BUG-PRODUCT-002-empty](../screenshots/BUG-PRODUCT-002-price-empty.png)
- Screenshot (giá không hợp lệ): ![BUG-PRODUCT-002-invalid](../screenshots/BUG-PRODUCT-002-price-invalid.png)

## Notes

TC-PRODUCT-004 (giá = 1, biên dưới hợp lệ) và TC-PRODUCT-016 (giá = 0.01) đều PASS. Lỗi xảy ra với các trường hợp biên không hợp lệ: 0, âm, trống, chuỗi ký tự.
