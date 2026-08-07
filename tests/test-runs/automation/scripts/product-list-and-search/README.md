# Product List & Search (FR-05) — Playwright Automation Test Suite

> **Student:** Mạch Quốc Tấn — MSSV: **23127115**  
> **Assignment:** Homework 04 — Automation Testing  
> **Feature:** FR-05 Product List & Search  
> **Course:** CS423 / CSC15003 — Software Testing

---

## Tổng quan

Bộ kiểm thử tự động này bao phủ toàn bộ **29 test case** cho tính năng Xem danh sách & Tìm kiếm sản phẩm (FR-05) của EShop SUT, được tổ chức thành 3 file spec:

| File spec                | Test cases               | Kỹ thuật                                       |
| ------------------------ | ------------------------ | ---------------------------------------------- |
| `tests/plas-ep.spec.ts`  | TC-PLAS-001~006, 008~014 | Equivalence Partitioning, Functional, Security |
| `tests/plas-ui.spec.ts`  | TC-PLAS-007, 015~019     | Web UI, Navigation, Card Details, Layout       |
| `tests/plas-bva.spec.ts` | TC-PLAS-BVA-001~010      | Boundary Value Analysis                        |

### Assertion patterns được dùng (≥ 3 loại theo yêu cầu đề)

| Pattern | Loại                       | Ví dụ trong script                                                              |
| ------- | -------------------------- | ------------------------------------------------------------------------------- |
| 1       | Element visibility / state | `expect(plasPage.errorBox).not.toBeVisible()`, `toBeVisible()`                  |
| 2       | Nội dung / giá trị trường  | `expect(titles[0]).toContain('MacBook Pro M3')`                                 |
| 3       | Soft assertion             | `expect.soft(h1Count).toBe(1)`, `expect.soft(price.includes('₫')).toBeTruthy()` |
| 4       | Network / Event assertion  | `page.on('dialog', ...)`                                                        |
| 5       | Số lượng / count           | `expect(productCount).toBe(5)`, `toBeGreaterThan(0)`                            |

---

## Yêu cầu môi trường

| Phần mềm         | Phiên bản tối thiểu     |
| ---------------- | ----------------------- |
| Node.js          | ≥ 18.x                  |
| pnpm             | ≥ 8.x                   |
| @playwright/test | ^1.49.1                 |

### Dịch vụ cần chạy trước khi test

| Dịch vụ          | URL mặc định            | Ghi chú            |
| ---------------- | ----------------------- | ------------------ |
| **Backend API**  | `http://localhost:3000` | Express.js backend |
| **Frontend Web** | `http://localhost:5173` | Vite frontend      |

---

## Cài đặt

```bash
# 1. Di chuyển vào thư mục này
cd tests/test-runs/automation/scripts/product-list-and-search

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
pnpm test:ep             # Equivalence Partitioning tests (TC-001 → TC-014)
pnpm test:ui             # UI & Navigation tests (TC-007, TC-015 → TC-019)
pnpm test:bva            # BVA tests (BVA-001 → BVA-010)
```

### Xem HTML Report

```bash
pnpm report
# hoặc
pnpm exec playwright show-report
```

Report tại `playwright-report/index.html`.  
Tiêu đề report: **"EShop Product List & Search Automation — Run by: 23127115 (Mạch Quốc Tấn)"** kèm ISO timestamp.

---

## Cấu trúc thư mục

```
tests/test-runs/automation/scripts/product-list-and-search/
├── package.json                      # Dependencies & pnpm scripts
├── playwright.config.ts              # Multi-browser config, student metadata
├── tsconfig.json                     # TypeScript config
│
├── pages/
│   └── ProductListPage.ts            # Page Object Model (Locators & helper actions)
│
├── data/
│   └── plas-test-data.json           # File chứa dữ liệu 29 test cases
│
├── tests/
│   ├── plas-ep.spec.ts               # Equivalence Partitioning & Security (13 TC)
│   ├── plas-ui.spec.ts               # Web UI & Navigation (6 TC)
│   └── plas-bva.spec.ts              # Boundary Value Analysis (10 TC)
│
└── playwright-report/                # (tự sinh sau khi chạy)
    └── index.html
```

---

## Dữ liệu sản phẩm mẫu (Seed Data)

Các thông số dữ liệu kiểm thử được đối sánh chính xác với `backend/database.js`:

1. `iPhone 15 Pro Max` (30.000.000 ₫ - Điện thoại)
2. `Samsung Galaxy S24 Ultra` (28.000.000 ₫ - Điện thoại)
3. `MacBook Pro M3` (45.000.000 ₫ - Laptop)
4. `Tai nghe AirPods Pro 2` (6.000.000 ₫ - Phụ kiện)
5. `Bàn phím cơ Keychron Q1` (4.000.000 ₫ - Phụ kiện)

---

## Kết quả mong đợi & Bugs đã biết

| Test ID         | Expected                                  | Status   | Bug                                      |
| --------------- | ----------------------------------------- | -------- | ---------------------------------------- |
| TC-PLAS-001     | 5 items + 1 `<h1>` + ₫ symbol             | **Fail** | BUG-PLAS-001, BUG-PLAS-002, BUG-PLAS-003 |
| TC-PLAS-002     | 1 item "MacBook Pro M3"                   | Pass     | —                                        |
| TC-PLAS-003     | 0 items + empty state message             | **Fail** | BUG-PLAS-004                             |
| TC-PLAS-004     | 1 item "Bàn phím cơ Keychron Q1"          | Pass     | —                                        |
| TC-PLAS-005     | Safe XSS, no alert                        | Pass     | —                                        |
| TC-PLAS-006     | No crash on 300 chars                     | Pass     | —                                        |
| TC-PLAS-007     | Card image + title + price visible        | Pass     | —                                        |
| TC-PLAS-008     | Case insensitive match                    | Pass     | —                                        |
| TC-PLAS-009     | Partial name match                        | Pass     | —                                        |
| TC-PLAS-010     | Trimmed whitespace search                 | Pass     | —                                        |
| TC-PLAS-011     | Whitespace search returns 5 items         | Pass     | —                                        |
| TC-PLAS-012     | Empty search returns 5 items              | Pass     | —                                        |
| TC-PLAS-013     | Enter key triggers search                 | Pass     | —                                        |
| TC-PLAS-014     | Clear search restores 5 items             | Pass     | —                                        |
| TC-PLAS-015     | Detail button navigates to `/product/:id` | Pass     | —                                        |
| TC-PLAS-016     | Add to cart button functional             | Pass     | —                                        |
| TC-PLAS-017     | Logo navigates to home                    | Pass     | —                                        |
| TC-PLAS-018     | Footer displays total count               | Pass     | —                                        |
| TC-PLAS-019     | Page loads cleanly                        | Pass     | —                                        |
| TC-PLAS-BVA-001 | 1 char "i" returns 2 items                | Pass     | —                                        |
| TC-PLAS-BVA-002 | 255 chars search no crash                 | Pass     | —                                        |
| TC-PLAS-BVA-003 | 256 chars search no crash                 | Pass     | —                                        |
| TC-PLAS-BVA-004 | SQL injection safe                        | Pass     | —                                        |
| TC-PLAS-BVA-005 | Single `<h1>` tag maintained              | **Fail** | BUG-PLAS-001                             |
| TC-PLAS-BVA-006 | 0 char search returns 5 items             | Pass     | —                                        |
| TC-PLAS-BVA-007 | 2 char "S2" returns 1 item                | Pass     | —                                        |
| TC-PLAS-BVA-008 | 254 chars search no crash                 | Pass     | —                                        |
| TC-PLAS-BVA-009 | Numeric search "15" returns 1 item        | Pass     | —                                        |
| TC-PLAS-BVA-010 | Alphanumeric "Galaxy S24" returns 1 item  | Pass     | —                                        |

---

## Tham khảo thêm

- [Playwright Docs](https://playwright.dev/docs/intro)
- [Test Cases Product List & Search](../../test-cases/product-list-and-search/)
- [Bug Reports](../../../docs/report/Bug_Report.md)
- [AI Audit Report](../../../docs/report/AI_Audit_Report.md)
