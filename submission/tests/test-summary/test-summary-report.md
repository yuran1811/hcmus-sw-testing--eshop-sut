# Báo cáo tổng kết kiểm thử API - HW06

## 1. Thông tin chung

- **Họ và tên:** Mạch Quốc Tấn
- **Mã số sinh viên:** 23127115
- **Môn học:** Kiểm thử phần mềm (Software Testing)
- **Bài tập:** Homework 06 - API Testing
- **Hệ thống kiểm thử (SUT):** EShop
- **Ngày thực thi:** 22/08/2026
- **Ngày cập nhật:** 23/08/2026

## 2. Tổng quan kết quả

| Chỉ số                         | Số lượng |  Tỷ lệ |
| ------------------------------ | -------: | -----: |
| Test case đã thiết kế/thực thi |      145 | 100,0% |
| Pass                           |       22 |  15,2% |
| Fail                           |      123 |  84,8% |
| Assertion failure              |      385 |      - |
| Bug report API                 |       18 |      - |
| GitHub Issue đã tạo            |       18 |      - |

Một test case được tính Fail khi có ít nhất một assertion sai. 385 assertion failure đã được phân tích và gom theo nguyên nhân gốc thành 18 bug, không xem mỗi assertion failure là một bug độc lập.

## 3. Kết quả theo API

| Requirement | Endpoint                  | Test case |   Pass |    Fail | Assertion fail |    Bug |
| ----------- | ------------------------- | --------: | -----: | ------: | -------------: | -----: |
| FR-04       | `PUT /api/users/me`       |        51 |      0 |      51 |            168 |      5 |
| FR-09       | `POST /api/apply-coupon`  |        46 |     20 |      26 |             70 |      8 |
| FR-17       | `POST /api/admin/coupons` |        48 |      2 |      46 |            147 |      5 |
| **Tổng**    |                           |   **145** | **22** | **123** |        **385** | **18** |

## 4. Phạm vi kỹ thuật kiểm thử

Mỗi API được kiểm thử bằng bốn nhóm kỹ thuật:

- Domain Partition.
- State Transition.
- Security Testing.
- Schema Validation.

Postman collection sử dụng environment/collection variables, data-driven execution, pre-request script và test script. Mọi request đều được gắn `X-Student-Id: 23127115`. Bộ test được chạy bằng Newman trên SUT local, đồng thời có Mock Server, Monitor và GitHub Actions CI.

## 5. Bug report và GitHub Issue

| Module               | Bug report | GitHub Issue                                                                                                                                                                                                                                                                                                             |
| -------------------- | ---------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| FR04 - User profile  |          5 | [#330](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/330) đến [#334](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/334)                                                                                                                                                              |
| FR09 - Apply coupon  |          8 | [#335](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/335) đến [#339](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/339), [#345](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/345) đến [#347](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/347) |
| FR17 - Admin coupons |          5 | [#340](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/340) đến [#344](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/344)                                                                                                                                                              |
| **Tổng**             |     **18** | **#330–#347**                                                                                                                                                                                                                                                                                                            |

## 6. Bằng chứng thực thi

- Ba Newman HTML/JSON report và các file kết quả rút gọn tại [`test-runs/api/reports`](../test-runs/api/reports).
- Bảng kết quả của từng test case tại [`test-runs/api`](../test-runs/api).
- Ảnh Newman, Postman Console, environment, Mock Server, Monitor và GitHub Issues tại [`test-runs/api/images`](../test-runs/api/images).
- Báo cáo CI/CD và hai lần chạy mẫu tại [`ci-cd-report.md`](../test-runs/api/ci-cd-report.md).
- Dòng bắt buộc `[X-Student-Id] Header set = 23127115` được thể hiện trong ảnh Postman Console và log CI.

## 7. Tài liệu liên quan

- [Ma trận truy vết](./traceability-matrix.md)
- [Tóm tắt thực thi API](../test-runs/api/execution-summary.md)
- [Danh mục bug report API](../bug-reports/README.md)
- [Postman features đã sử dụng](../test-runs/api/postman-features-used.md)
- [Bằng chứng Monitor](../test-runs/api/monitor-run-evidence.md)
