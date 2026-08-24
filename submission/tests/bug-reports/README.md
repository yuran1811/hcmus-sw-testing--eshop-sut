# Tổng hợp bug từ lần chạy full 2026-08-22

Tài liệu này là chỉ mục của **17 lỗi sản phẩm hợp lệ** được gom theo nguyên nhân gốc từ lần chạy chính thức 145 test case. Mỗi bug có một báo cáo Markdown trong thư mục API tương ứng và một GitHub Issue công khai.

## Mục lục

- [Thống kê](#thống-kê)
- [Danh sách bug](#danh-sách-bug)
- [Cấu trúc và quy ước](#cấu-trúc-và-quy-ước)
- [Bằng chứng GitHub Issues](#bằng-chứng-github-issues)

## Thống kê

| API/Module | Critical | Major | Minor |   Tổng | Khoảng issue         |
| ---------- | -------: | ----: | ----: | -----: | -------------------- |
| FR-04      |        2 |     3 |     0 |      5 | #330–#334            |
| FR-09      |        2 |     3 |     2 |      7 | #335–#339, #345–#346 |
| FR-17      |        1 |     2 |     2 |      5 | #340–#344            |
| **Tổng**   |    **5** | **8** | **4** | **17** | #330–#346            |

Kết quả full run có 385 assertion failure, nhưng một bug có thể làm nhiều assertion/test case cùng fail. Vì vậy số bug được tính theo nguyên nhân gốc, không theo số assertion failure.

## Danh sách bug

| Bug ID              | API                       | Severity | Mô tả ngắn                                         | Test đại diện          | GitHub Issue                                                        |
| ------------------- | ------------------------- | -------- | -------------------------------------------------- | ---------------------- | ------------------------------------------------------------------- |
| BUG-USRME-001       | GET `/api/users/me`       | Critical | Lộ mật khẩu plaintext và reset token               | FR04-USRME-SC-002      | https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/330 |
| BUG-USRME-002       | PUT `/api/users/me`       | Critical | Mass assignment cho phép tự nâng role admin        | FR04-USRME-SEC-003     | https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/331 |
| BUG-USRME-003       | PUT `/api/users/me`       | Major    | Thiếu validation và cập nhật không nguyên tử       | FR04-USRME-DP-004      | https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/332 |
| BUG-USRME-004       | PUT `/api/users/me`       | Major    | Content-Type sai gây 500 HTML và lộ stack trace    | FR04-USRME-DP-022      | https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/333 |
| BUG-USRME-005       | PUT `/api/users/me`       | Major    | Partial update làm các trường không gửi thành null | FR04-USRME-DP-007      | https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/334 |
| BUG-APPLYCOUPON-001 | POST `/api/apply-coupon`  | Critical | Không bắt buộc JWT hợp lệ                          | FR09-APPLY-SEC-001     | https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/335 |
| BUG-APPLYCOUPON-002 | POST `/api/apply-coupon`  | Critical | Tính discount/final amount sai                     | FR09-APPLY-ST-007      | https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/336 |
| BUG-APPLYCOUPON-003 | POST `/api/apply-coupon`  | Major    | Chấp nhận total_amount sai kiểu                    | FR09-APPLY-DP-015      | https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/337 |
| BUG-APPLYCOUPON-004 | POST `/api/apply-coupon`  | Minor    | Hết lượt dùng trả 400 thay vì 409                  | FR09-APPLY-ST-002      | https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/338 |
| BUG-APPLYCOUPON-005 | POST `/api/apply-coupon`  | Major    | Tổng tiền bằng min_order_amount bị từ chối         | FR09-APPLY-DP-002      | https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/339 |
| BUG-APPLYCOUPON-006 | POST `/api/apply-coupon`  | Minor    | Code sai định dạng trả 404 thay vì 400             | FR09-APPLY-DP-009      | https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/345 |
| BUG-APPLYCOUPON-007 | POST `/api/apply-coupon`  | Major    | Chấp nhận field ngoài đặc tả và tampering          | FR09-APPLY-SEC-007     | https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/346 |
| BUG-ADMINCOUPON-001 | POST `/api/admin/coupons` | Critical | User thường gọi được API admin                     | FR17-ADMINCOUP-SEC-002 | https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/340 |
| BUG-ADMINCOUPON-002 | POST `/api/admin/coupons` | Major    | Thiếu validation dữ liệu coupon                    | FR17-ADMINCOUP-DP-004  | https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/341 |
| BUG-ADMINCOUPON-003 | POST `/api/admin/coupons` | Minor    | Tạo thành công trả 200 thay vì 201                 | FR17-ADMINCOUP-DP-001  | https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/342 |
| BUG-ADMINCOUPON-004 | POST `/api/admin/coupons` | Major    | Code trùng gây 500 và lộ lỗi SQLite                | FR17-ADMINCOUP-DP-006  | https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/343 |
| BUG-ADMINCOUPON-005 | POST `/api/admin/coupons` | Minor    | JWT bị chỉnh sửa trả 403 thay vì 401               | FR17-ADMINCOUP-SEC-003 | https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/344 |

## Cấu trúc và quy ước

- [FR-04 — User profile](./api/FR04_PUT_api_users_me): 5 bug `BUG-USRME-001` đến `BUG-USRME-005`.
- [FR-09 — Apply coupon](./api/FR09_POST_api_apply_coupon): 7 bug `BUG-APPLYCOUPON-001` đến `BUG-APPLYCOUPON-007`.
- [FR-17 — Admin coupons](./api/FR17_POST_api_admin_coupons): 5 bug `BUG-ADMINCOUPON-001` đến `BUG-ADMINCOUPON-005`.
- Mỗi báo cáo ghi module, severity, priority, môi trường, precondition, bước tái hiện, expected/actual, evidence, test case liên quan và GitHub Issue.
- `Fail` chỉ trở thành bug khi sai khác là lỗi sản phẩm đã được xác nhận; negative test trả đúng lỗi mong đợi vẫn là `Pass`.
- Issue `#347` đã đóng do false positive: đặc tả `POST /api/apply-coupon` chỉ thực hiện phép tính và không thay đổi database.

## Bằng chứng GitHub Issues

- [Ảnh danh sách Issues — phần 1](../test-runs/api/images/github_api_bug_issues_01.png)
- [Ảnh danh sách Issues — phần 2](../test-runs/api/images/github_api_bug_issues_02.png)
- [Danh sách Issues trực tuyến](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues)
- [Test Summary](../test-summary/test-summary-report.md) và [Traceability Matrix](../test-summary/traceability-matrix.md) cung cấp ánh xạ từ suite/test case sang bug.
