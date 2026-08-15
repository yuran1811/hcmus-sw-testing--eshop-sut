# HW05 Performance Bug Reports & GitHub Issue Links

**Repository:** [yuran1811/hcmus-sw-testing--eshop-sut](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut)  
**Branch:** `hw05/23127148-nguyenan`  
**Student:** Ân Tiến Nguyên An (MSSV: 23127148)

---

## Danh Sách Các Báo Cáo Sự Cố & Vấn Đề Hiệu Năng (Bug & Performance Reports)

| ID | Tiêu đề Vấn đề | Loại Sự cố | Mức độ nghiêm trọng | Báo cáo chi tiết (Local Markdown) | GitHub Issue Link |
| :---: | :--- | :---: | :---: | :--- | :--- |
| **BUG-PERF-001** | [Spike Test] Suy giảm hiệu năng nghiêm trọng (P95 Latency > 1.8s) do tranh chấp Single-Writer Lock của SQLite dưới tải đột biến 250 VUs | Performance Bottleneck | **Major (P1)** | [`HW5/Bug Report/BUG-PERF-001.md`](./BUG-PERF-001.md) | *[Chờ tạo trên GitHub]* |
| **BUG-PERF-002** | [Admin Bulk Import] Nghẽn I/O và tắc nghẽn Event Loop do xử lý Import sản phẩm dạng Synchronous lặp dòng trong Request Context | Architectural Bottleneck | **Medium (P2)** | [`HW5/Bug Report/BUG-PERF-002.md`](./BUG-PERF-002.md) | *[Chờ tạo trên GitHub]* |
| **BUG-PERF-003** | [Auth Service] Cơ chế phạt Lockout tăng bậc số nhân (login_attempts += 2) gây nguy cơ Denial-of-Service (DoS) cho tài khoản Admin | Security / Functional | **Medium (P2)** | [`HW5/Bug Report/BUG-PERF-003.md`](./BUG-PERF-003.md) | *[Chờ tạo trên GitHub]* |
| **BUG-PERF-004** | [Categories API] Thiếu kiểm tra phân quyền Admin (RBAC) trên các endpoint quản lý danh mục (POST/PUT/DELETE /api/categories) | Broken Access Control | **Major (P1)** | [`HW5/Bug Report/BUG-PERF-004.md`](./BUG-PERF-004.md) | *[Chờ tạo trên GitHub]* |
| **BUG-PERF-005** | [Products API] Kiểu dữ liệu trường price bị trả về dạng chuỗi (String) đối với các sản phẩm có ID chẵn | Data Inconsistency | **Minor (P2)** | [`HW5/Bug Report/BUG-PERF-005.md`](./BUG-PERF-005.md) | *[Chờ tạo trên GitHub]* |

---

## Hướng Dẫn Tạo Issue Trên GitHub

1. Truy cập vào trang GitHub Issues của repo: [https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/new](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/new)
2. Sao chép tiêu đề và toàn bộ nội dung từ các file `BUG-PERF-001.md` đến `BUG-PERF-005.md` vào issue mới.
3. Kéo thả các hình ảnh minh chứng tương ứng trong thư mục `HW5/results/spike/evidences/` hoặc `HW5/results/endurance/evidences/` vào phần mô tả của GitHub Issue.
4. Cập nhật liên kết Issue vừa tạo vào cột **GitHub Issue Link** của bảng trên và file `HW5/bug_issue_links.md`.
