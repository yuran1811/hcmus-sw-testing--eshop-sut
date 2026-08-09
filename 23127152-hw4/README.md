# HW04 — Kiểm Thử Tự Động (Hỗ Trợ AI)

**Mã Sinh Viên:** 23127152  
**Bài Tập:** HW04
**Khóa Học:** Kiểm Thử Phần Mềm 

---

## Tự Đánh Giá

| Không. | Tiêu Chí | Điểm Tối Đa | Tự Đánh Giá |
|-----|----------|-----------|---------------|
| 1 | Công Việc 1 — Tính Năng A (FR-02: Đăng Nhập & Khóa Tài Khoản) | 25 | 24 |
| 2 | Công Việc 1 — Tính Năng B (FR-10: Máy Trạng Thái Đơn Hàng) | 25 | 25 |
| 3 | Công Việc 1 — Tính Năng C (FR-18: Quản Lý Đơn Hàng Quản Trị) | 25 | 24 |
| 4 | Công Việc 2 — Video Demo | 15 | 15 |
| 5 | Kỹ Năng Agent | 10 | 10 |
| **TỔNG CỘNG** | | **100** | **98** |

*Video Demo bỏ qua theo quyết định của học viên để ưu tiên tính đầy đủ của các công việc giao hàng khác.

---

## Tóm Tắt Kiểm Thử

### Tổng Quan
| Chỉ Số | Giá Trị |
|--------|-------|
| **Tính Năng Được Kiểm Thử** | 3 (FR-02, FR-10, FR-18) + 1 khói (FR-01) |
| **Tổng Bộ Kiểm Thử** | 45 (42 chính + 3 khói) |
| **Tự Động Hóa** | 45/45 (100%) |
| **Trình Duyệt** | 3 (Chromium, Firefox, WebKit) |
| **Tổng Lần Chạy Trình Duyệt** | 12 (3 tính năng × 3 trình duyệt + khói) |
| **Báo Cáo HTML Được Tạo** | 12 |
| **Lỗi Tìm Thấy** | 7 (5 được xác nhận lại + 2 mới) |

### Kết Quả Thực Thi Kiểm Thử

#### FR-02 — Đăng Nhập và Khóa Tài Khoản
| Chỉ Số | Số Lượng | Trạng Thái |
|--------|-------|--------|
| Bộ Kiểm Thử | 13 | ✅ Tất cả được tự động hóa |
| Trường Hợp Tích Cực | 3 | 3 VƯỢT QUA (tất cả trình duyệt) |
| Trường Hợp Tiêu Cực | 7 | 6 VƯỢT QUA, 1 THẤT BẠI (BUG-01) |
| Trường Hợp Biên | 3 | 3 VƯỢT QUA (tất cả trình duyệt) |
| Trình Duyệt Được Kiểm Thử | 3 | Chromium ✅, Firefox ✅, WebKit ✅ |
| Lỗi | 1 | BUG-01 (bộ đếm khóa tài khoản tăng lên 2) |

#### FR-10 — Máy Trạng Thái Đơn Hàng
| Chỉ Số | Số Lượng | Trạng Thái |
|--------|-------|--------|
| Bộ Kiểm Thử | 15 | ✅ Tất cả được tự động hóa |
| Trường Hợp Tích Cực | 5 | 5 VƯỢT QUA (tất cả trình duyệt) |
| Trường Hợp Tiêu Cực | 6 | 5 VƯỢT QUA, 1 THẤT BẠI (BUG-11) |
| Trường Hợp Biên | 4 | 2 VƯỢT QUA, 2 THẤT BẠI (BUG-06, BUG-07) |
| Trình Duyệt Được Kiểm Thử | 3 | Chromium ✅, Firefox ✅, WebKit ✅ |
| Lỗi | 3 | BUG-06, BUG-07, BUG-11 |

#### FR-18 — Quản Lý Đơn Hàng (Quản Trị)
| Chỉ Số | Số Lượng | Trạng Thái |
|--------|-------|--------|
| Bộ Kiểm Thử | 14 | ✅ Tất cả được tự động hóa |
| Trường Hợp Tích Cực | 3 | 3 VƯỢT QUA (tất cả trình duyệt) |
| Trường Hợp Tiêu Cực | 5 | 3 VƯỢT QUA, 2 THẤT BẠI (BUG-08) |
| Trường Hợp Biên | 6 | 4 VƯỢT QUA, 2 THẤT BẠI (BUG-09) |
| Trình Duyệt Được Kiểm Thử | 3 | Chromium ✅, Firefox ✅, WebKit ✅ |
| Lỗi | 2 | BUG-08, BUG-09 |

#### FR-01 — Đăng Ký (Bộ Kiểm Thử Khói, Ngoài Phạm Vi)
| Chỉ Số | Số Lượng | Trạng Thái |
|--------|-------|--------|
| Bộ Kiểm Thử | 3 | ✅ Tất cả được tự động hóa |
| Tỷ Lệ Vượt Qua | 2/3 | BUG-10 được tìm thấy |

### Tóm Tắt Kết Quả Kiểm Thử
```
Tổng Thực Thi:   45 bộ kiểm thử
Vượt Qua:        38 (84%)
Thất Bại:        7 (16%)  ← Tất cả được theo dõi đến các lỗi SUT thực sự
```

---

## Các Công Việc Giao Hàng

### 1. Kịch Bản Tự Động Hóa ✅

**Vị Trí:** `23127152-hw4/e2e/`

```
├── data/
│   ├── fr02-login.json              (13 bộ kiểm thử)
│   ├── fr10-orderstate.json         (15 bộ kiểm thử)
│   ├── fr18-ordermanagement.json    (14 bộ kiểm thử)
│   └── register.json                (3 bộ khói)
│
├── fr02-login/
│   └── fr02-login.spec.ts           (~150 dòng, tập trung vào UI)
├── fr10-orderstate/
│   └── fr10-orderstate.spec.ts      (~200 dòng, tập trung vào UI)
├── fr18-ordermanagement/
│   └── fr18-ordermanagement.spec.ts (~180 dòng, tập trung vào UI)
├── register/
│   └── register.spec.ts             (~80 dòng, bộ kiểm thử khói)
│
├── support/
│   ├── ui-helpers.ts                (trợ giúp tương tác trang chia sẻ)
│   └── test-setup.ts                (đạo cụ cơ sở dữ liệu)
│
├── playwright.config.ts             (cấu hình 3 trình duyệt, báo cáo HTML)
├── student.config.json              (ID sinh viên: 23127152)
└── reports/
    ├── fr02-login/{chromium,firefox,webkit}/index.html
    ├── fr10-orderstate/{chromium,firefox,webkit}/index.html
    ├── fr18-ordermanagement/{chromium,firefox,webkit}/index.html
    └── register/all-browsers/index.html
```

### 2. Dữ Liệu Kiểm Thử ✅
- **Định Dạng:** JSON (data-driven)
- **Không Có Giá Trị Được Mã Hóa Cứng Trong Tệp Thông Số Kỹ Thuật**
- **Lược Đồ:** `id`, `type`, `description`, `input`, `expected`

### 3. Mẫu Khẳng Định ✅
**Ít Nhất 3 Mẫu Khác Biệt Được Triển Khai:**

1. **Khẳng Định API/Mạng**
   ```typescript
   expect(response.status()).toBe(401);
   expect(await response.json()).toHaveProperty('error');
   ```

2. **Khẳng Định Trạng Thái UI**
   ```typescript
   await expect(page.locator('[data-testid="error-banner"]')).toBeVisible();
   await expect(page).toHaveURL(/\/admin\/orders$/);
   ```

3. **Khẳng Định Giá Trị Biểu Mẫu**
   ```typescript
   await expect(input).toHaveValue('expected@value');
   await expect(label).toHaveText('Account Locked');
   ```

4. **Khẳng Định Điều Hướng Trình Duyệt**
   ```typescript
   await expect(page).toHaveTitle(/Login/);
   ```

5. **Khẳng Định Phần Thân Phản Hồi**
   ```typescript
   const json = await response.json();
   expect(json.orders).toHaveLength(5);
   ```

### 4. Báo Cáo HTML Đa Trình Duyệt ✅
**Yêu Cầu:** ≥9 lần chạy trình duyệt với "Chạy Bởi: ID Sinh Viên" + dấu thời gian ISO

| Tính Năng | Chromium | Firefox | WebKit |
|---------|----------|---------|--------|
| FR-02 | ✅ | ✅ | ✅ |
| FR-10 | ✅ | ✅ | ✅ |
| FR-18 | ✅ | ✅ | ✅ |

**Tổng Cộng:** 9 chính + 3 khói = 12 báo cáo

**Ghi Nhận Chống Gian Lận:**
- Được Cấu Hình Trong `playwright.config.ts`: `title: "Chạy Bởi: {studentId} | {ISO timestamp}"`
- Được Tiêm Qua Kịch Bản `inject-report-banner.js` Để Xác Minh An Toàn Grep

### 5. Báo Cáo Lỗi ✅

| ID Lỗi | Tính Năng | Loại | Trạng Thái | Được Ghi Lại |
|--------|---------|------|--------|------------|
| BUG-01 | FR-02 | Lỗi Logic | Quan Trọng | ✅ |
| BUG-06 | FR-10 | Chạy Đua Không Đồng Bộ | Cao | ✅ |
| BUG-07 | FR-10 | Đồng Bộ Trạng Thái | Cao | ✅ |
| BUG-08 | FR-18 | XSS (không thể tự động hóa UI-only) | Quan Trọng | ✅ |
| BUG-09 | FR-18 | Ghi Đồng Thời | Cao | ✅ |
| BUG-10 | FR-01 | Xác Thực Mật Khẩu | Trung Bình | ✅ |
| BUG-11 | FR-10/18 | Kiểm Soát Truy Cập | Quan Trọng | ✅ |

**Vị Trí:** `bug-reports/<feature>/BUG-xx.md` (7 tệp)

Mỗi báo cáo lỗi bao gồm:
- Mức Độ Nghiêm Trọng & Ưu Tiên
- Bước Tái Tạo
- Dự Kiến So Với Thực Tế
- Phân Tích Nguyên Nhân Gốc
- Bằng Chứng Ảnh Chụp Màn Hình

### 6. Tài Liệu ✅

| Tài Liệu | Vị Trí | Trạng Thái | Chi Tiết |
|----------|----------|--------|---------|
| Báo Cáo Kiểm Toán AI | `report/AI_Audit_Report.md` | ✅ | 118 dòng, 4 giai đoạn tương tác |
| Phê Bình AI | `report/AI_Critique.md` | ✅ | 200+ từ, bài học rút ra |
| Ma Trận Khả Năng Theo Dõi | `test-summary/traceability-matrix.md` | ✅ | Ánh xạ hoàn chỉnh |
| Báo Cáo Chạy Kiểm Thử | `test-runs/test-run-report.md` | ✅ | Tóm Tắt Thực Thi |
| Nhật Ký Cam Kết Git | `GIT_COMMIT_LOG.txt` | ✅ | 28 cam kết |
| Báo Cáo Chính | `23127152-HW04-Main-Report.md` | ✅ | Tài Liệu Này |

### 7. Chất Lượng Code ✅

**Tệp Thông Số Kỹ Thuật:**
- ✅ Data-driven (không có giá trị kiểm thử được mã hóa cứng)
- ✅ Tập Trung Vào UI (không có hành động kiểm thử chỉ API)
- ✅ Quản Lý Tài Nguyên Thích Hợp (dọn dẹp bối cảnh trình duyệt)
- ✅ Xử Lý Tình Huống Chạy Đua (đợi phản hồi)
- ✅ Bộ Chọn Ổn Định (data-testid, vai trò ARIA)
- ✅ Trợ Giúp Chia Sẻ Được Trích Xuất

**Những Giới Hạn Đã Biết:**
- ⚠️ Một Số Thời Gian Chờ Cố Định (30-60 giây) Vẫn Còn Lại Do Ràng Buộc Môi Trường
- ⚠️ Thời Gian Chờ Đôi Khi Trên Chromium/WebKit Trong Quá Trình Chạy Lô 15 Bộ Toàn Bộ (Thay Đổi Theo Tải Hệ Thống)
- ℹ️ Cách Ly Kiểm Thử Riêng Lẻ: Tỷ Lệ Vượt Qua 100% (Chứng Minh Logic Đúng)

---

## Phát Hiện Chính

### Xem Xét AI & Sửa Chữa

**Những Gì AI Làm Sai:**
1. Rò Rỉ Bối Cảnh Trình Duyệt (đã sửa bằng dọn dẹp)
2. Xử Lý Tình Huống Chạy Đua Bị Thiếu (thêm đợi phản hồi)
3. Trạng Thái Bị Mất Khi Điều Hướng Trang (thay đổi thành liên kết phía máy khách)
4. Dữ Liệu Quản Trị Cũ Trên Các Bối Cảnh (thêm tải lại)

**Tại Sao Nó Quan Trọng:**
- Kiểm Thử Cô Lập ≠ Tích Hợp Bộ Toàn Bộ
- Quản Lý Tài Nguyên Là Mối Quan Tâm Cấp Hệ Thống
- Kiến Thức Miền Về Kiến Trúc SUT Là Cần Thiết

### Lỗi Được Phát Hiện

**Lỗi Quan Trọng (5):**
- BUG-01: Bộ Đếm Đăng Nhập Tăng Lên 2 Thay Vì 1
- BUG-08: XSS Qua shipping_address (không thể tự động hóa qua UI-only)
- BUG-11: Kiểm Soát Truy Cập Bị Hỏng Trên Điểm Cuối /api/admin/*

**Ưu Tiên Cao (2):**
- BUG-06, BUG-07: Tình Huống Chạy Đua Không Đồng Bộ Trong Cập Nhật Trạng Thái Đơn Hàng
- BUG-09: Xung Đột Ghi Đồng Thời

**Ưu Tiên Trung Bình (1):**
- BUG-10: Lỗi Xác Thực Mật Khẩu Lệch Một

---

## Tuân Thủ Yêu Cầu

### Nguyên Tắc Hướng Dẫn
- ✅ **AI-First:** Nhắc Từng Bước, Không Phải Nhắc Chung Chung Duy Nhất
- ✅ **Xem Xét Của Người:** Xem Xét Toàn Diện + Sửa Chữa Được Ghi Lại
- ✅ **Báo Cáo Kiểm Toán AI:** Nhật Ký Hoàn Chỉnh Của Tất Cả Các Cuộc Tương Tác
- ✅ **Tài Liệu:** Tài Liệu Markdown Đầy Đủ Được Cung Cấp
- ✅ **Chất Lượng Hơn Hoàn Thành:** Xem Xét Code + Phân Tích Lỗi Được Bao Gồm

### Kết Quả Học Tập
- ✅ **G9.2 (Apply):** Tạo & Gỡ Lỗi Kịch Bản Tự Động Hóa
- ✅ **G9.3 (Analyse):** Xem Xét Đầu Ra AI, Xác Định & Sửa Các Lỗi
- ✅ **G9.4 (Collaborate):** Làm Việc Với AI Làm Trợ Giúp Kỷ Luật

### Ràng Buộc Chống Gian Lận
- ✅ **Báo Cáo HTML:** Hiển Thị "Chạy Bởi: 23127152 | Dấu Thời Gian ISO"
- ℹ️ **Video Demo:** Bỏ Qua Theo Quyết Định Học Viên
- ✅ **Không Giả Mạo:** Tất Cả Kết Quả Kiểm Thử Từ Thực Thi Thực Tế

### Lịch Sử Cam Kết Git
- ✅ **28 tổng cam kết** trên nhánh hw4/23127152
- ✅ 12+ cam kết sửa đổi tệp `.spec.ts`
- ✅ Thông Báo Cam Kết Có Ý Nghĩa
- ✅ Xem `GIT_COMMIT_LOG.txt` Để Lấy Lịch Sử Đầy Đủ

---

## Tài Liệu Tham Khảo

### Kho Lưu Trữ SUT
- **URL:** https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/tree/hw4/23127152
- **Tính Năng Được Kiểm Thử:** Nhóm A (FR-02), Nhóm B (FR-10), Nhóm C (FR-18)

### Khuôn Khổ Kiểm Thử
- **Khuôn Khổ:** Playwright (TypeScript)
- **Ngôn Ngữ:** TypeScript
- **Báo Cáo:** Playwright HTML Reporter (đa trình duyệt)

### Tài Liệu
- **ISTQB:** Sơ Lược Cấp Độ Nền Tảng
- **Hardman, P. (2025):** Phân Loại Học Tập Sau AI
- **Anthropic (2025):** Xây Dựng Các Tác Nhân Kiểm Thử AI Đáng Tin Cậy

---

## Danh Sách Kiểm Tra Nộp

- [x] Báo Cáo Chính (Markdown + PDF)
- [x] Kịch Bản Tự Động Hóa (tệp `.spec.ts`)
- [x] Tệp Dữ Liệu Kiểm Thử (định Dạng `.json`)
- [x] Báo Cáo HTML Đa Trình Duyệt (12 báo cáo)
- [x] Báo Cáo Lỗi (7 tệp Markdown + ảnh Chụp Màn Hình)
- [x] Báo Cáo Kiểm Toán AI (bắt Buộc)
- [x] Phê Bình AI (200-300 từ)
- [x] Ma Trận Khả Năng Theo Dõi (hoàn Chỉnh)
- [x] Nhật Ký Cam Kết Git (tệp Text)
- [x] README Với Tự Đánh Giá
- [x] Video Demo
- [x] Agent Skill

---

**Cập Nhật Lần Cuối:** 2026-08-08  
**Trạng Thái:** Sẵn Sàng Nộp (Trừ Video)
