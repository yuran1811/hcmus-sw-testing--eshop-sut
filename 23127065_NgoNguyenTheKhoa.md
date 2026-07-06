# Báo cáo cá nhân — Test Design Techniques

## Thông tin chung

| Trường            | Nội dung                                                                                                   |
| ----------------- | ---------------------------------------------------------------------------------------------------------- |
| Họ và tên         | [Điền tên]                                                                                                 |
| Kỹ thuật đảm nhận | EP, BVA, ST, UC                                                                                            |
| Bài tập / Feature | EShop SUT - Sprint 1 regression + FR-09 coupon ST/UC Playwright run                                        |
| Ngày báo cáo      | 06/07/2026                                                                                                 |
| Nguồn kết quả     | `tests/test-runs/sprint-1-test-run.md`, `ep-bva-bug-report.md`, `tests/reports/coupon/coupon-results.json` |

## 1. Equivalence Partitioning (EP)

### 1.1 Danh sách Test Case

| STT | Test Case ID / Nhóm                  | Feature / Requirement             | Mô tả Test Case                                                          | Kỹ thuật thiết kế | Status            |
| --- | ------------------------------------ | --------------------------------- | ------------------------------------------------------------------------ | ----------------- | ----------------- |
| 1   | TC-PRODUCT-DETAIL-001..009, 012..015 | FR-06, FR-08, FR-21, FR-23, FR-24 | Product detail hợp lệ/không hợp lệ, auth, breadcrumb, alt text, XSS      | EP                | 4 Pass / 9 Fail   |
| 2   | TC-COUPON-001, 003..011, 016..018    | FR-09, FR-21                      | Coupon hợp lệ/không tồn tại/inactive/expired/usage/auth/display/security | EP                | 11 Pass / 2 Fail  |
| 3   | TC-COUPON-ADMIN-001..017, 024..026   | FR-17                             | Coupon CRUD hợp lệ/không hợp lệ, auth, duplicate, XSS                    | EP                | 10 Pass / 10 Fail |
| 4   | TC-CART-MOBILE-001..017, 022..024    | FR-20                             | Mobile cart add/update/remove/checkout/navigation/UI states              | EP                | 17 Pass / 3 Fail  |

### 1.2 Bugs tìm được

| STT | Bug ID / Nhóm Bug | Feature / Requirement | Mô tả Bug                                                                                                                       | Severity                                                     |
| --- | ----------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| 1   | BUG-01..BUG-05    | FR-06, FR-08, FR-23   | Missing category, add-to-cart double click, invalid quantity accepted, guest can add cart, missing breadcrumb                   | BUG-01..04 Major / P1; BUG-05 Minor / P2                     |
| 2   | BUG-06, BUG-08    | FR-09                 | Percent formula wrong, unauthenticated coupon apply allowed                                                                     | Major / P1                                                   |
| 3   | BUG-09..BUG-18    | FR-17                 | Invalid type/value/date/min/max accepted, delete missing coupon returns 200, user role can create coupon, missing code accepted | Major / P1                                                   |
| 4   | BUG-19..BUG-23    | FR-20                 | Direct edit quantity miscount, no delete confirm, wrong total label, wrong badge count, missing empty-cart illustration         | BUG-19, BUG-22 Major / P1; BUG-20, BUG-21, BUG-23 Minor / P2 |

### 1.3 Tóm tắt EP

| Chỉ số                        | Giá trị |
| ----------------------------- | ------: |
| Tổng số TCs                   |      66 |
| Số TCs Passed                 |      42 |
| Số TCs Failed                 |      24 |
| Tổng Bug IDs distinct covered |      22 |

## 2. Boundary Value Analysis (BVA)

### 2.1 Danh sách Test Case

| STT | Test Case ID / Nhóm        | Feature / Requirement | Mô tả Test Case                                                     | Kỹ thuật thiết kế | Status          |
| --- | -------------------------- | --------------------- | ------------------------------------------------------------------- | ----------------- | --------------- |
| 1   | TC-PRODUCT-DETAIL-010..011 | FR-06                 | Quantity tại biên hợp lệ 1 và trong biên 2                          | BVA               | 2 Pass / 0 Fail |
| 2   | TC-COUPON-002, 012..015    | FR-09                 | Coupon min order tại/dưới/trên biên SAVE10 và BIGBUY                | BVA               | 2 Pass / 3 Fail |
| 3   | TC-COUPON-ADMIN-018..023   | FR-17                 | discount_value, min_order_amount, max_uses_per_user tại biên hợp lệ | BVA               | 6 Pass / 0 Fail |
| 4   | TC-CART-MOBILE-018..021    | FR-20                 | Mobile cart quantity tại biên add/edit                              | BVA               | 4 Pass / 0 Fail |

### 2.2 Bugs tìm được

| STT | Bug ID / Nhóm Bug | Feature / Requirement | Mô tả Bug                                                                      | Severity   |
| --- | ----------------- | --------------------- | ------------------------------------------------------------------------------ | ---------- |
| 1   | BUG-06, BUG-07    | FR-09                 | SAVE10 sai công thức percent; BIGBUY/SAVE10 bị sai tại ngưỡng min_order_amount | Major / P1 |
| 2   | BUG-19            | FR-20                 | Sửa quantity tại biên trong cart bị cộng thêm 1 so với giá trị nhập            | Major / P1 |

### 2.3 Tóm tắt BVA

| Chỉ số                        | Giá trị |
| ----------------------------- | ------: |
| Tổng số TCs                   |      17 |
| Số TCs Passed                 |      14 |
| Số TCs Failed                 |       3 |
| Tổng Bug IDs distinct covered |       3 |

## 3. Decision Table (DT)

### 3.1 Danh sách Test Case

| STT | Test Case ID | Feature / Requirement | Mô tả Test Case                 | Kỹ thuật thiết kế | Status |
| --- | ------------ | --------------------- | ------------------------------- | ----------------- | ------ |
| -   | -            | -                     | Chưa thực hiện trong sprint này | DT                | -      |

### 3.2 Bugs tìm được

| STT | Bug ID | Feature / Requirement | Mô tả Bug | Severity |
| --- | ------ | --------------------- | --------- | -------- |
| -   | -      | -                     | Không có  | -        |

### 3.3 Tóm tắt DT

| Chỉ số                | Giá trị |
| --------------------- | ------: |
| Tổng số TCs           |       0 |
| Số TCs Passed         |       0 |
| Số TCs Failed         |       0 |
| Tổng số Bugs tìm được |       0 |

## 4. Pairwise Testing (PT)

### 4.1 Danh sách Test Case

| STT | Test Case ID | Feature / Requirement | Mô tả Test Case                 | Kỹ thuật thiết kế | Status |
| --- | ------------ | --------------------- | ------------------------------- | ----------------- | ------ |
| -   | -            | -                     | Chưa thực hiện trong sprint này | PT                | -      |

### 4.2 Bugs tìm được

| STT | Bug ID | Feature / Requirement | Mô tả Bug | Severity |
| --- | ------ | --------------------- | --------- | -------- |
| -   | -      | -                     | Không có  | -        |

### 4.3 Tóm tắt PT

| Chỉ số                | Giá trị |
| --------------------- | ------: |
| Tổng số TCs           |       0 |
| Số TCs Passed         |       0 |
| Số TCs Failed         |       0 |
| Tổng số Bugs tìm được |       0 |

## 5. State Transition (ST)

### 5.1 Danh sách Test Case

| STT | Test Case ID   | Feature / Requirement | Mô tả Test Case (Transition)                                   | Kỹ thuật thiết kế | Status |
| --- | -------------- | --------------------- | -------------------------------------------------------------- | ----------------- | ------ |
| 1   | TC-FR09-ST-001 | FR-09                 | S4 eligible_unused -> S5 discount_applied tại min order SAVE10 | ST                | Fail   |
| 2   | TC-FR09-ST-002 | FR-09                 | S5 discount_applied -> S6 usage_recorded sau checkout          | ST                | Fail   |
| 3   | TC-FR09-ST-003 | FR-09                 | S6 usage_recorded -> S7 usage_exhausted với SAVE10 1/1         | ST                | Fail   |
| 4   | TC-FR09-ST-004 | FR-09                 | S6 usage_recorded -> S5 discount_applied với VIP100 còn lượt   | ST                | Fail   |
| 5   | TC-FR09-ST-005 | FR-09                 | S6 usage_recorded -> S7 usage_exhausted với VIP100 2/2         | ST                | Fail   |
| 6   | TC-FR09-ST-006 | FR-09                 | Stay S2 coupon_expired với EXPIRED                             | ST                | Fail   |
| 7   | TC-FR09-ST-007 | FR-09                 | S4 eligible_unused -> S3 below_min_order với BIGBUY 499,999    | ST                | Pass   |
| 8   | TC-FR09-ST-008 | FR-09                 | S4 eligible_unused -> S5 discount_applied tại min order BIGBUY | ST                | Fail   |

### 5.2 Bugs tìm được

| STT | Bug ID       | Feature / Requirement | Mô tả Bug                                                                                                              | Severity |
| --- | ------------ | --------------------- | ---------------------------------------------------------------------------------------------------------------------- | -------- |
| 1   | BUG-FR09-001 | FR-09                 | Minimum order boundary dùng `>` thay vì `>=`; các request đúng ngưỡng bị chặn trước khi kiểm tra expiry/usage/discount | High     |
| 2   | BUG-FR09-005 | FR-09                 | Order không lưu thông tin coupon/discount dù usage đã ghi nhận                                                         | Medium   |

### 5.3 Tóm tắt ST

| Chỉ số                        | Giá trị |
| ----------------------------- | ------: |
| Tổng số TCs                   |       8 |
| Số TCs Passed                 |       1 |
| Số TCs Failed                 |       7 |
| Tổng failure rows             |       7 |
| Tổng Bug IDs distinct covered |       2 |

## 6. Use Case (UC)

### 6.1 Danh sách Test Case

| STT | Test Case ID   | Feature / Requirement | Mô tả Test Case (Main/Extension)                   | Kỹ thuật thiết kế | Status |
| --- | -------------- | --------------------- | -------------------------------------------------- | ----------------- | ------ |
| 1   | TC-FR09-UC-001 | FR-09                 | Main flow apply coupon và checkout thành công      | UC                | Fail   |
| 2   | TC-FR09-UC-002 | FR-09                 | Guest/unauthenticated user không được apply coupon | UC                | Fail   |
| 3   | TC-FR09-UC-003 | FR-09                 | Coupon không tồn tại hoặc inactive bị từ chối      | UC                | Pass   |
| 4   | TC-FR09-UC-004 | FR-09                 | Backend không tin total client sửa lên 3,000,000   | UC                | Fail   |
| 5   | TC-FR09-UC-005 | FR-09                 | Percent discount dùng đúng công thức               | UC                | Fail   |
| 6   | TC-FR09-UC-006 | FR-09                 | Fixed discount dùng đúng công thức                 | UC                | Pass   |

### 6.2 Bugs tìm được

| STT | Bug ID       | Feature / Requirement | Mô tả Bug                                                              | Severity |
| --- | ------------ | --------------------- | ---------------------------------------------------------------------- | -------- |
| 1   | BUG-FR09-001 | FR-09                 | Main checkout flow bị chặn tại đúng min order                          | High     |
| 2   | BUG-FR09-002 | FR-09                 | Percent coupon discount tính sai, trả discount âm và final amount tăng | Critical |
| 3   | BUG-FR09-003 | FR-09                 | Apply coupon không yêu cầu JWT hợp lệ và tin `user_id` từ client       | Critical |
| 4   | BUG-FR09-004 | FR-08/FR-09           | Backend tin `total_amount` client gửi khi apply coupon và checkout     | Critical |

### 6.3 Tóm tắt UC

| Chỉ số                        | Giá trị |
| ----------------------------- | ------: |
| Tổng số TCs                   |       6 |
| Số TCs Passed                 |       2 |
| Số TCs Failed                 |       4 |
| Tổng failure rows             |       4 |
| Tổng Bug IDs distinct covered |       4 |

## 7. Tổng hợp cá nhân (tất cả kỹ thuật)

| Kỹ thuật          | Tổng TCs | TCs Passed | TCs Failed | Bug IDs covered |
| ----------------- | -------: | ---------: | ---------: | --------------: |
| EP                |       66 |         42 |         24 |              22 |
| BVA               |       17 |         14 |          3 |               3 |
| DT                |        0 |          0 |          0 |               0 |
| PT                |        0 |          0 |          0 |               0 |
| ST                |        8 |          1 |          7 |               2 |
| UC                |        6 |          2 |          4 |               4 |
| **Tổng distinct** |   **97** |     **59** |     **38** |          **28** |
