# Báo cáo tổng hợp nhóm — Test Design Techniques (EP, BVA, DT, PT, ST, UC)

## Thông tin chung

| Trường            | Nội dung                                                                                                   |
| ----------------- | ---------------------------------------------------------------------------------------------------------- |
| Tên nhóm          | [Điền tên nhóm]                                                                                            |
| Bài tập / Feature | EShop SUT - Sprint 1 regression + FR-09 coupon ST/UC Playwright run                                        |
| Thành viên        | [Tên 1], [Tên 2], [Tên 3], ...                                                                             |
| Ngày tổng hợp     | 06/07/2026                                                                                                 |
| Nguồn kết quả     | `tests/test-runs/sprint-1-test-run.md`, `ep-bva-bug-report.md`, `tests/reports/coupon/coupon-results.json` |

## 1. Tổng số Test Case (TCs) nhóm đã tạo

| Kỹ thuật | Tổng TCs nhóm | [Tên 1] | [Tên 2] | [Tên 3] | ... |
| -------- | ------------: | ------: | ------: | ------: | --: |
| EP       |            66 |      66 |         |         |     |
| BVA      |            17 |      17 |         |         |     |
| DT       |             0 |       0 |         |         |     |
| PT       |             0 |       0 |         |         |     |
| ST       |             8 |       8 |         |         |     |
| UC       |             6 |       6 |         |         |     |
| **Tổng** |        **97** |  **97** |         |         |     |

## 2. Coverage của TCs

### 2.1 Theo Feature / Requirement

| Feature / Requirement |     EP |    BVA |    DT |    PT |    ST |    UC | Tổng TCs |
| --------------------- | -----: | -----: | ----: | ----: | ----: | ----: | -------: |
| FR-06 Product Detail  |     13 |      2 |     0 |     0 |     0 |     0 |       15 |
| FR-09 Coupon Apply    |     13 |      5 |     0 |     0 |     8 |     6 |       32 |
| FR-17 Coupon Admin    |     20 |      6 |     0 |     0 |     0 |     0 |       26 |
| FR-20 Mobile Cart     |     20 |      4 |     0 |     0 |     0 |     0 |       24 |
| **Tổng**              | **66** | **17** | **0** | **0** | **8** | **6** |   **97** |

### 2.2 Theo Test Design Technique

| Kỹ thuật | Số TCs | Tỷ lệ % trên tổng TCs nhóm |
| -------- | -----: | -------------------------: |
| EP       |     66 |                     68.04% |
| BVA      |     17 |                     17.53% |
| DT       |      0 |                      0.00% |
| PT       |      0 |                      0.00% |
| ST       |      8 |                      8.25% |
| UC       |      6 |                      6.19% |
| **Tổng** | **97** |                   **100%** |

## 3. Status của TCs (Passed / Failed)

| Kỹ thuật      | Tổng TCs | Passed | Failed | Tỷ lệ Passed % |
| ------------- | -------: | -----: | -----: | -------------: |
| EP            |       66 |     42 |     24 |         63.64% |
| BVA           |       17 |     14 |      3 |         82.35% |
| DT            |        0 |      0 |      0 |              - |
| PT            |        0 |      0 |      0 |              - |
| ST            |        8 |      1 |      7 |         12.50% |
| UC            |        6 |      2 |      4 |         33.33% |
| **Tổng nhóm** |   **97** | **59** | **38** |     **60.82%** |

## 4. Tổng số Bugs nhóm đã tìm được

> Ghi chú: EP/BVA dùng 23 Bug ID từ `ep-bva-bug-report.md`. FR-09 ST/UC dùng 5 Bug ID từ `tests/reports/coupon/bug-report.md`. Một số bug được phát hiện bởi nhiều kỹ thuật, nên tổng theo từng kỹ thuật là coverage mapping; tổng nhóm là số Bug ID distinct.

| Kỹ thuật          | Bug IDs covered | [Tên 1] | [Tên 2] | [Tên 3] | ... |
| ----------------- | --------------: | ------: | ------: | ------: | --: |
| EP                |              22 |      22 |         |         |     |
| BVA               |               3 |       3 |         |         |     |
| DT                |               0 |       0 |         |         |     |
| PT                |               0 |       0 |         |         |     |
| ST                |               2 |       2 |         |         |     |
| UC                |               4 |       4 |         |         |     |
| **Tổng distinct** |          **28** |  **28** |         |         |     |

## 5. Coverage của Bugs

### 5.1 Theo Feature / Requirement

| Feature / Requirement | Số lượng Bug IDs distinct |  Tỷ lệ % |
| --------------------- | ------------------------: | -------: |
| FR-06 Product Detail  |                         5 |   17.86% |
| FR-09 Coupon Apply    |                         8 |   28.57% |
| FR-17 Coupon Admin    |                        10 |   35.71% |
| FR-20 Mobile Cart     |                         5 |   17.86% |
| **Tổng**              |                    **28** | **100%** |

### 5.2 Theo Severity

| Severity                  | Số lượng Bugs |  Tỷ lệ % |
| ------------------------- | ------------: | -------: |
| Critical                  |             3 |   10.71% |
| High                      |             1 |    3.57% |
| Medium                    |             1 |    3.57% |
| Major / P1                |            19 |   67.86% |
| Minor / P2                |             4 |   14.29% |
| Low                       |             0 |    0.00% |
| **Tổng distinct Bug IDs** |        **28** | **100%** |

## 6. Nhận xét / Kết luận

- **Kỹ thuật tạo nhiều TCs nhất**: EP, 66/97 test cases.
- **Kỹ thuật tìm nhiều Bug ID nhất**: EP, 22 Bug IDs covered; trong phần FR-09 mới, ST phát hiện nhiều failure nhất với 7/8 cases failed.
- **Feature có tỷ lệ Failed cao nhất**: FR-09 Coupon Apply trong bộ ST/UC mới, 11/14 failed.
- **Đề xuất cải thiện**: Ưu tiên sửa FR-09 backend trước: điều kiện min order `>=`, percent formula `/100`, bắt buộc JWT cho apply coupon, không tin `total_amount` từ client, và lưu coupon/discount vào order.
