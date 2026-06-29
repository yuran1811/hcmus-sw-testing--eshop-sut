# HW02 - Domain Testing & Boundary Value Analysis

## 1. Thông tin cá nhân

- **Họ và tên:** Mạch Quốc Tấn
- **Mã số sinh viên:** 23127115
- **Email:** mqtan23@clc.fitus.edu.vn
- **GitHub repo:** https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/tree/hw2/mqtan-23127115

## 2. Bảng tự đánh giá (Self-Assessment)

| No. | Criteria                              | Grade   | Self-Assessed Grade |
| --- | ------------------------------------- | ------- | ------------------- |
| 1   | Feature A (Domain + Boundary)         | 25      | 25                  |
| 2   | Feature B (Domain + Boundary)         | 25      | 25                  |
| 3   | Feature C (Domain + Boundary)         | 25      | 25                  |
| 4   | Feature D (Mobile, Domain + Boundary) | 15      | 15                  |
| 5   | Agent Skills                          | 10      | 10                  |
|     | **Total**                             | **100** | **100**             |

## 3. Báo cáo tổng kết kiểm thử (Test Summary Report)

### 3.1. Các tính năng đã kiểm thử (Features)

- **Feature A (Pool A - Product):** Product list and search (FR-05)
- **Feature B (Pool B - Checkout):** Checkout (FR-08)
- **Feature C (Pool C - Web Admin):** Category management (CRUD) (FR-14)
- **Feature D (Pool D - Mobile):** Account registration (FR-01)

### 3.2. Số liệu tổng quan

- **Tổng số tính năng kiểm thử:** 4
- **Tổng số Test Cases đã thiết kế và chạy:** 47
- **Tổng số lỗi (Bugs) tìm thấy:** 21

### 3.3. Trạng thái thực thi (Execution Status)

- Toàn bộ 47/47 Test Cases đã được thực thi hoàn tất.
- Chi tiết số lượng Pass/Fail xem tại các file bảng Test Run tương ứng trong thư mục `tests/test-runs/`.
- Danh sách 21 lỗi được báo cáo chi tiết trong file `Bug_Report.md`.

### 3.4. Tài nguyên bổ sung (Demo Videos / Skills)

- **Video demo** toàn bộ quy trình: https://youtu.be/SR3oKVqRSvI

- **Agent Skills:** Skill `test-writer`, `ai-audit-report` và `test-run-reporter` được định nghĩa trong thư mục `.agents/skills/`.

## 4. Danh sách các file nộp đính kèm

- Link GitHub repo: https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/tree/hw2/mqtan-23127115
- `.agents/skills/`: Định nghĩa các Agent Skills.
- `report/`:
    - `Main_Report.md` (.pdf)
    - `Domain_Testing_Report.md` (.pdf)
    - `Boundary_Value_Analysis_Report.md` (.pdf)
    - `Bug_Report.md` (.pdf)
    - `AI_Audit_Report.md` (.pdf) (Bản đánh giá hiệu chỉnh của sinh viên)
    - `AI_Audit_Report_Raw_AI.md` (.pdf) (Bản nhật ký tương tác AI thô)
    - `AI_Critique.md` (.pdf)
    - `git_commit_logs.txt`
    - `README.md` (.pdf) (Bản báo cáo tổng kết)
- Folder `tests/` chứa mã nguồn test cases, test runs, test summary report và hình ảnh minh chứng.
