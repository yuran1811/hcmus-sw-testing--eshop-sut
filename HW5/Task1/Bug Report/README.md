# HW05 Performance Bug Reports & GitHub Issue Links

**Repository:** [yuran1811/hcmus-sw-testing--eshop-sut](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut)  
**Branch:** `hw05/23127148-nguyenan`  
**Student:** Ân Tiến Nguyên An (MSSV: 23127148)

---

## Danh Sách Các Báo Cáo Sự Cố & Vấn Đề Hiệu Năng (Bug & Performance Reports)

| ID | Tiêu đề Vấn đề | Loại Sự cố | Mức độ | Báo cáo chi tiết | GitHub Issue |
| :---: | :--- | :---: | :---: | :--- | :---: |
| **BUG-PERF-001** | [Spike Test] Suy giảm hiệu năng nghiêm trọng (P95 > 1.8s) do SQLite Lock | Performance | **Major (P1)** | [`BUG-PERF-001.md`](./BUG-PERF-001.md) | [#288](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/288) |
| **BUG-PERF-002** | [Admin Bulk Import] Nghẽn I/O Event Loop do Import Synchronous | Architectural | **Medium (P2)** | [`BUG-PERF-002.md`](./BUG-PERF-002.md) | [#289](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/289) |
| **BUG-PERF-003** | [Auth Service] login_attempts += 2 gây DoS tài khoản Admin | Security | **Medium (P2)** | [`BUG-PERF-003.md`](./BUG-PERF-003.md) | [#290](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/290) |
| **BUG-PERF-004** | [Categories API] Thiếu kiểm tra phân quyền Admin (RBAC) | Broken Access Control | **Major (P1)** | [`BUG-PERF-004.md`](./BUG-PERF-004.md) | [#291](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/291) |
| **BUG-PERF-005** | [Products API] price trả về String cho ID chẵn | Data Inconsistency | **Minor (P2)** | [`BUG-PERF-005.md`](./BUG-PERF-005.md) | [#292](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/292) |
