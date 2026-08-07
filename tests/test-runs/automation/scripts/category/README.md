# Category Management (FR-14) — Playwright Automation Test Suite

> **Student:** Mạch Quốc Tấn — MSSV: **23127115**  
> **Assignment:** Homework 04 — Automation Testing  
> **Feature:** FR-14 Category Management  
> **Course:** CS423 / CSC15003 — Software Testing

---

## Tổng quan

Bộ kiểm thử tự động này bao phủ toàn bộ **28 test case** cho tính năng Category Management (FR-14) của EShop SUT, được tổ chức thành 4 file spec:

| File spec                         | Test cases                                 | Kỹ thuật                              |
| --------------------------------- | ------------------------------------------ | ------------------------------------- |
| `tests/category-crud.spec.ts`     | TC-CATEGORY-001~006, 009, 012~015, 019~020 | Equivalence Partitioning, Data-driven |
| `tests/category-auth.spec.ts`     | TC-CATEGORY-007, 008, 010, 011, 018        | Equivalence Partitioning (Auth)       |
| `tests/category-security.spec.ts` | TC-CATEGORY-016, 017                       | Malicious Input Partition             |
| `tests/category-bva.spec.ts`      | TC-CATEGORY-BVA-001~008                    | Boundary Value Analysis               |

### Assertion patterns được dùng (≥ 3 loại theo yêu cầu đề)

| Pattern | Loại                      | Ví dụ trong script                                                   |
| ------- | ------------------------- | -------------------------------------------------------------------- |
| 1       | HTTP status code          | `expect(resp.status()).toBe(400)`, `not.toBe(500)`                   |
| 2       | Nội dung / giá trị trường | `expect(found?.name).toBe('Điện tử')`                                |
| 3       | Số lượng / count          | `expect(list.length).toBeGreaterThanOrEqual(2)`, `toBe(countBefore)` |
| 4       | Network / API response    | `request.post(...)`, kiểm tra `status()` và `json()`                 |
| 5       | Soft assertion            | `expect.soft([200, 204]).toContain(resp.status())`                   |

---

## Yêu cầu môi trường

| Phần mềm         | Phiên bản tối thiểu |
| ---------------- | ------------------- |
| Node.js          | ≥ 18.x              |
| pnpm             | ≥ 8.x               |
| @playwright/test | ^1.49.1             |

### Dịch vụ cần chạy trước khi test

| Dịch vụ         | URL mặc định            | Ghi chú                     |
| --------------- | ----------------------- | --------------------------- |
| **Backend API** | `http://localhost:3000` | Express.js + SQLite backend |

> **Không cần** Frontend (`localhost:5173`) — toàn bộ tests đều là **API tests**.

---

## Cài đặt

```bash
# 1. Di chuyển vào thư mục này
cd tests/test-runs/automation/scripts/category

# 2. Cài đặt dependencies
pnpm install

# 3. Cài browser binaries (lần đầu)
pnpm exec playwright install
```

---

## Chạy test

### Chạy toàn bộ (3 browsers: Chromium, Firefox, WebKit)

```bash
pnpm test
# hoặc
pnpm exec playwright test
```

### Chạy theo browser riêng lẻ

```bash
pnpm test:chromium       # Chỉ Chromium
pnpm test:firefox        # Chỉ Firefox
pnpm test:webkit         # Chỉ WebKit (Safari engine)
```

### Chạy theo nhóm test

```bash
pnpm test:crud           # CRUD tests (TC-001 → TC-020)
pnpm test:auth           # Auth/Authorization tests (TC-007, 008, 010, 011, 018)
pnpm test:security       # Security tests (TC-016, 017)
pnpm test:bva            # BVA tests (BVA-001 → BVA-008)
```

### Xem HTML Report

```bash
pnpm report
# hoặc
pnpm exec playwright show-report
```

Report tại `playwright-report/index.html`.  
Tiêu đề report: **"EShop Category Automation — Run by: 23127115 (Mạch Quốc Tấn)"** kèm ISO timestamp.

---

## Cấu trúc thư mục

```
tests/test-runs/automation/scripts/category/
├── package.json                      # Dependencies & pnpm scripts
├── playwright.config.ts              # Multi-browser config, student metadata
├── tsconfig.json                     # TypeScript config
│
├── pages/
│   └── CategoryPage.ts               # API Helper (CategoryAPIHelper)
│
├── data/
│   └── category-test-data.json       # Test data cho tất cả 28 test cases
│
├── tests/
│   ├── category-crud.spec.ts         # CRUD + Equivalence Partitioning (13 TC)
│   ├── category-auth.spec.ts         # Auth/Authorization (5 TC + 2 invalid-token variants)
│   ├── category-security.spec.ts     # XSS + SQL Injection (2 TC)
│   └── category-bva.spec.ts          # Boundary Value Analysis (8 TC)
│
└── playwright-report/                # (tự sinh sau khi chạy)
    └── index.html
```

---

## Tài khoản test mặc định

Bộ test tự **đăng ký** 2 tài khoản khi khởi chạy (ignore 400 nếu đã tồn tại):

| Vai trò         | Email                       | Password    | Mục đích                         |
| --------------- | --------------------------- | ----------- | -------------------------------- |
| **Admin**       | `admin_cat_test@eshop.test` | `Admin123!` | Thực hiện CRUD category          |
| **Normal User** | `user_cat_test@eshop.test`  | `User123!`  | Test authorization (TC-008, 011) |

> **Lưu ý:** Backend EShop SUT phân biệt `role: 'admin'` và `role: 'user'`.  
> Nếu tài khoản admin tự đăng ký không có `role = 'admin'`, cần tạo thủ công hoặc seed dữ liệu.

---

## Tạo tài khoản Admin thủ công (nếu cần)

Nếu API `/api/register` không gán role admin tự động, seed thủ công qua SQLite:

```bash
# Trong thư mục backend
sqlite3 database.db "UPDATE users SET role='admin' WHERE email='admin_cat_test@eshop.test';"
```

---

## API Endpoints được test

| Method   | Endpoint              | Test Cases                                |
| -------- | --------------------- | ----------------------------------------- |
| `POST`   | `/api/categories`     | TC-001~003, 007~008, 012~018              |
| `GET`    | `/api/categories`     | TC-004, BVA-006~008                       |
| `DELETE` | `/api/categories/:id` | TC-005~006, 009~011, 019~020, BVA-003~005 |
| `POST`   | `/api/register`       | Setup (auto)                              |
| `POST`   | `/api/login`          | Setup (auto)                              |

---

## Lưu ý về thứ tự chạy test

- Tests chạy **tuần tự** (`workers: 1`) để tránh race conditions trên shared categories table.
- Mỗi test tự **cleanup** category đã tạo ở `afterEach` / cuối test body.
- Test **characterization** (TC-006, 009, 015, 019, 020, BVA-006) sử dụng `expect.soft()` vì SRS chưa định nghĩa hành vi bắt buộc — các test này ghi nhận hành vi thực tế.

---

## Kết quả mong đợi

| Test ID               | Expected                     | Status   | Bug              |
| --------------------- | ---------------------------- | -------- | ---------------- |
| TC-CATEGORY-001       | 200/201 + in list            | Pass     | —                |
| TC-CATEGORY-002       | 400 (empty name)             | **Fail** | BUG-CATEGORY-001 |
| TC-CATEGORY-003       | 400 (whitespace-only)        | **Fail** | BUG-CATEGORY-001 |
| TC-CATEGORY-004       | 200 + array with id,name     | Pass     | —                |
| TC-CATEGORY-005       | 200/204 + removed            | Pass     | —                |
| TC-CATEGORY-006       | No 500, no mutation          | **Fail** | BUG-CATEGORY-002 |
| TC-CATEGORY-007       | 401/403                      | Pass     | —                |
| TC-CATEGORY-008       | 403                          | **Fail** | BUG-CATEGORY-003 |
| TC-CATEGORY-009       | No orphan records            | **Fail** | BUG-CATEGORY-004 |
| TC-CATEGORY-010       | 401                          | Pass     | —                |
| TC-CATEGORY-011       | 403                          | **Fail** | BUG-CATEGORY-005 |
| TC-CATEGORY-012       | 400 (missing name)           | Not Run  | —                |
| TC-CATEGORY-013 (1-5) | 400 (type error)             | Not Run  | —                |
| TC-CATEGORY-014       | 200/201 + unicode OK         | Not Run  | —                |
| TC-CATEGORY-015       | Characterization             | Not Run  | —                |
| TC-CATEGORY-016       | XSS safe                     | Not Run  | —                |
| TC-CATEGORY-017       | SQL safe                     | Not Run  | —                |
| TC-CATEGORY-018 (1,2) | 401/403                      | Not Run  | —                |
| TC-CATEGORY-019 (1,2) | 400/404                      | Not Run  | —                |
| TC-CATEGORY-020       | No 500, idempotent           | Not Run  | —                |
| TC-CATEGORY-BVA-001   | 200/201, name='A'            | Pass     | —                |
| TC-CATEGORY-BVA-002   | 200/201, name='AB'           | Pass     | —                |
| TC-CATEGORY-BVA-003   | 400/404, no mutation         | Not Run  | —                |
| TC-CATEGORY-BVA-004   | 200/204, removed             | Not Run  | —                |
| TC-CATEGORY-BVA-005   | 200/204, only target removed | Not Run  | —                |
| TC-CATEGORY-BVA-006   | 200 + array                  | Not Run  | —                |
| TC-CATEGORY-BVA-007   | 200 + 1 item                 | Not Run  | —                |
| TC-CATEGORY-BVA-008   | 200 + 2 items                | Not Run  | —                |

---

## Tham khảo thêm

- [Playwright Docs](https://playwright.dev/docs/intro)
- [Test Cases Category](../../test-cases/category/)
- [Bug Reports](../../../docs/report/Bug_Report.md)
- [AI Audit Report](../../../docs/report/AI_Audit_Report.md)
