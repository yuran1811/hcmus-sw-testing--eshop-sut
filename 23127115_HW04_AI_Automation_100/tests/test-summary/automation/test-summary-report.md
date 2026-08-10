# Báo cáo tổng kết kiểm thử - HW04 Automation

## 1. Thông tin chung

- **Họ và tên:** Mạch Quốc Tấn
- **Mã số sinh viên:** 23127115
- **Môn học:** Kiểm thử phần mềm (Software Testing)
- **Bài tập:** Homework 04 - Automation Testing
- **Hệ thống kiểm thử (SUT):** EShop (https://github.com/ttbhanh/eshop-sut)
- **Ngày cập nhật:** 10/08/2026

## 2. Tổng quan kết quả theo test case

| Chỉ số                                   | Số lượng |  Tỷ lệ |
| ---------------------------------------- | -------: | -----: |
| Tổng số test case đã thiết kế            |       79 | 100,0% |
| Tổng số test case đã cập nhật trạng thái |       79 | 100,0% |
| Pass                                     |       41 |  51,9% |
| Fail                                     |       38 |  48,1% |
| Bug report automation                    |       28 |      - |
| GitHub Issue đã tạo                      |       28 |      - |

## 3. Thống kê theo tính năng

| Tính năng                                       | Yêu cầu chính       | Test case |   Pass |   Fail | Tỷ lệ Pass |
| ----------------------------------------------- | ------------------- | --------: | -----: | -----: | ---------: |
| Quản lý Danh mục (Category)                     | FR-14               |        28 |     18 |     10 |      64,3% |
| Thanh toán (Checkout)                           | FR-08               |        22 |      8 |     14 |      36,4% |
| Xem & Tìm kiếm sản phẩm (Product List & Search) | FR-05               |        29 |     15 |     14 |      51,7% |
| **Tổng cộng**                                   | FR-05, FR-08, FR-14 |    **79** | **41** | **38** |  **51,9%** |

## 4. Tổng quan kết quả chạy automation theo browser

| Bộ test               | Browser runs | Passed runs | Failed runs | HTML report                                                                                       |
| --------------------- | -----------: | ----------: | ----------: | ------------------------------------------------------------------------------------------------- |
| Category              |          102 |          58 |          44 | [Report](../../test-runs/automation/scripts/category/playwright-report/index.html)                |
| Checkout              |           87 |          45 |          42 | [Report](../../test-runs/automation/scripts/checkout/playwright-report/index.html)                |
| Product List & Search |           87 |          45 |          42 | [Report](../../test-runs/automation/scripts/product-list-and-search/playwright-report/index.html) |
| **Tổng cộng**         |      **276** |     **148** |     **128** | -                                                                                                 |

## 5. Bug report và GitHub Issue

| Module                | Bug report | GitHub Issue                                                                                                                                              | Bằng chứng              |
| --------------------- | ---------: | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| Category              |         10 | [#237](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/237) - [#246](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/246) | API assertion log       |
| Checkout              |         10 | [#247](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/247) - [#256](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/256) | API log + UI screenshot |
| Product List & Search |          8 | [#257](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/257) - [#264](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/264) | Playwright screenshot   |
| **Tổng cộng**         |     **28** | **#237 - #264**                                                                                                                                           | -                       |

## 6. Tài liệu liên quan

- [Ma trận truy vết](./traceability-matrix.md)
- [Bug report automation](../../bug-reports/automation)
- [Automation scripts và reports](../../test-runs/automation/scripts)
- [README Category automation](../../test-runs/automation/scripts/category/README.md)
- [README Checkout automation](../../test-runs/automation/scripts/checkout/README.md)
- [README Product List & Search automation](../../test-runs/automation/scripts/product-list-and-search/README.md)
