# Playwright Automation Test Suite — Product List & Search (FR-05)

> **Môn học:** CS423 / CSC15003 — Kiểm thử Phần mềm (Software Testing)  
> **Bài tập:** Homework 04 — Automation Testing  
> **Sinh viên:** Mạch Quốc Tấn — **MSSV:** 23127115 — **Lớp:** 23KTPM3  
> **Tính năng tự động hóa:** FR-05 Xem danh sách & Tìm kiếm sản phẩm (Product List & Search)  
> **Package Manager:** `pnpm`  

---

## 1. Tổng quan Dự án

Thư mục này chứa toàn bộ kịch bản kiểm thử tự động hóa (Automation Test Suite) được chuyển đổi **100% (29/29 Test Cases)** từ tài liệu thiết kế sang Playwright TypeScript cho tính năng **Xem danh sách & Tìm kiếm sản phẩm (FR-05)** thuộc hệ thống **EShop SUT**.

Các thông số dữ liệu kiểm thử (Test Data) đã được tham chiếu và đối sánh chính xác với file khởi tạo CSDL `backend/database.js`:
- **5 Sản phẩm mẫu (Seed Data):**
  1. `iPhone 15 Pro Max` (30.000.000 ₫ - Điện thoại)
  2. `Samsung Galaxy S24 Ultra` (28.000.000 ₫ - Điện thoại)
  3. `MacBook Pro M3` (45.000.000 ₫ - Laptop)
  4. `Tai nghe AirPods Pro 2` (6.000.000 ₫ - Phụ kiện)
  5. `Bàn phím cơ Keychron Q1` (4.000.000 ₫ - Phụ kiện)

---

## 2. Cấu trúc Thư mục

```text
tests/scripts/product-list-and-search/
├── data/
│   └── plas-test-data.json           # File chứa dữ liệu 29 test cases (Data-driven)
├── pages/
│   └── ProductListPage.ts            # Page Object Model chuẩn hóa locators & phương thức
├── tests/
│   └── product-list-and-search.spec.ts # Bộ kịch bản 29 Playwright test cases
├── package.json                      # Quản lý dependencies & pnpm scripts
├── pnpm-lock.yaml                    # pnpm lockfile
├── playwright.config.ts              # Cấu hình 3 trình duyệt (Chromium/Firefox/WebKit) & HTML reporter tag MSSV
├── tsconfig.json                     # Cấu hình TypeScript (passed pnpm exec tsc --noEmit)
└── README.md                         # Hướng dẫn chi tiết thực thi
```

---

## 3. Hướng dẫn Cài đặt & Thực thi với `pnpm`

### 3.1. Điều kiện tiên quyết
1. **Node.js** `>= 18.0.0` & **pnpm** `>= 8.0.0`.
2. **Khởi chạy EShop SUT:**
   - **Backend API:** `http://localhost:3000` (`cd backend && pnpm dev`)
   - **Frontend Web:** `http://localhost:5173` (`cd frontend-web && pnpm dev`)

### 3.2. Cài đặt Dependencies & Trình duyệt
Mở terminal tại `tests/scripts/product-list-and-search`:
```bash
pnpm install
pnpm exec playwright install
```

### 3.3. Lệnh chạy Kiểm thử bằng `pnpm`
- **Chạy tất cả 29 Test Cases:**
  ```bash
  pnpm test
  ```
- **Chạy Đa trình duyệt (Chromium, Firefox, WebKit - 3 Browsers):**
  ```bash
  pnpm test:all
  ```
- **Chạy từng trình duyệt đơn:**
  ```bash
  pnpm test:chromium
  pnpm test:firefox
  pnpm test:webkit
  ```
- **Xem Báo cáo HTML (kèm Tag MSSV 23127115):**
  ```bash
  pnpm report
  ```

---

## 4. Danh sách 29 Test Cases Tự động hóa

| STT | Test Case ID | Tên Kịch bản / Mô tả | Dữ liệu kiểm thử | Loại kiểm thử |
|---|---|---|---|---|
| 1 | **TC-PLAS-001** | Xem toàn bộ danh sách sản phẩm thành công khi search rỗng | `""` | Positive |
| 2 | **TC-PLAS-002** | Tìm kiếm sản phẩm theo tên chính xác hợp lệ | `"MacBook Pro M3"` | Positive |
| 3 | **TC-PLAS-003** | Tìm kiếm với từ khóa không tồn tại | `"NonExistentProduct99999"` | Negative |
| 4 | **TC-PLAS-004** | Tìm kiếm từ khóa Tiếng Việt có dấu | `"Bàn phím"` | Positive |
| 5 | **TC-PLAS-005** | Tìm kiếm với mã độc XSS / script HTML | `"<script>alert('XSS')</script>"` | Security |
| 6 | **TC-PLAS-006** | Tìm kiếm từ khóa cực dài 300 ký tự | `"A"*300` | Edge Case |
| 7 | **TC-PLAS-007** | Kiểm tra hiển thị chi tiết thẻ sản phẩm | `"Samsung Galaxy S24 Ultra"` | Positive |
| 8 | **TC-PLAS-008** | Tìm kiếm không phân biệt hoa thường | `"macbook pro m3"` | Positive |
| 9 | **TC-PLAS-009** | Tìm kiếm một phần tên sản phẩm (partial match) | `"Galaxy"` | Positive |
| 10 | **TC-PLAS-010** | Tìm kiếm từ khóa có khoảng trắng thừa | `"  iPhone 15  "` | Positive |
| 11 | **TC-PLAS-011** | Tìm kiếm chỉ chứa khoảng trắng | `"   "` | Edge Case |
| 12 | **TC-PLAS-012** | Nhấn nút Tìm kiếm mà không nhập từ khóa | `""` | Positive |
| 13 | **TC-PLAS-013** | Nhấn phím Enter trên ô nhập liệu để tìm kiếm | `"AirPods"` + Enter | Event |
| 14 | **TC-PLAS-014** | Xóa từ khóa trong ô tìm kiếm và tìm lại | Clear search | Function |
| 15 | **TC-PLAS-015** | Kiểm tra nút Xem chi tiết sản phẩm | Click "Xem chi tiết" | Navigation |
| 16 | **TC-PLAS-016** | Kiểm tra nút Thêm vào giỏ hàng | Click "Thêm vào giỏ" | Function |
| 17 | **TC-PLAS-017** | Kiểm tra điều hướng logo EShop về trang chủ | Click Logo | Navigation |
| 18 | **TC-PLAS-018** | Kiểm tra hiển thị tổng số sản phẩm bên dưới | `"Hiển thị 5 sản phẩm"` | UI Spec |
| 19 | **TC-PLAS-019** | Kiểm tra chỉ báo trạng thái đang tải | Loading state | UI Spec |
| 20 | **TC-PLAS-BVA-001** | Tìm kiếm từ khóa 1 ký tự (Biên dưới tối thiểu) | `"i"` | BVA |
| 21 | **TC-PLAS-BVA-002** | Tìm kiếm từ khóa 255 ký tự (Biên trên tiêu chuẩn) | `"A"*255` | BVA |
| 22 | **TC-PLAS-BVA-003** | Tìm kiếm từ khóa 256 ký tự (Biên trên vượt ngưỡng) | `"A"*256` | BVA |
| 23 | **TC-PLAS-BVA-004** | Tìm kiếm bằng ký tự đặc biệt SQL Injection | `"' OR '1'='1"` | Security/BVA |
| 24 | **TC-PLAS-BVA-005** | Kiểm tra duy trì đúng 1 thẻ `<h1>` duy nhất | `"iPhone"` | UI Spec |
| 25 | **TC-PLAS-BVA-006** | Tìm kiếm từ khóa độ dài 0 ký tự | `""` | BVA |
| 26 | **TC-PLAS-BVA-007** | Tìm kiếm từ khóa độ dài 2 ký tự | `"S2"` | BVA |
| 27 | **TC-PLAS-BVA-008** | Tìm kiếm từ khóa độ dài 254 ký tự | `"A"*254` | BVA |
| 28 | **TC-PLAS-BVA-009** | Tìm kiếm từ khóa ký tự số | `"15"` | BVA |
| 29 | **TC-PLAS-BVA-010** | Tìm kiếm từ khóa kết hợp chữ, số và khoảng trắng | `"Galaxy S24"` | BVA |
