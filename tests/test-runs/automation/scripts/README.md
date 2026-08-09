# Hướng dẫn chạy Automation Test Suites - HW04

Thư mục này chứa các bộ kiểm thử tự động (Automation Test Suites) sử dụng Playwright và TypeScript cho các chức năng của hệ thống E-Shop.

---

## Cấu trúc thư mục

- \_common/: Chứa các tiện ích dùng chung (đọc cấu hình môi trường .env, mã trạng thái HTTP).
- category/: Bộ kiểm thử chức năng Quản lý danh mục (FR-14).
- checkout/: Bộ kiểm thử chức năng Thanh toán (FR-08).
- product-list-and-search/: Bộ kiểm thử chức năng Danh sách sản phẩm & Tìm kiếm (FR-05).

---

## Chuẩn bị môi trường

### 1. Cấu hình file .env

Đảm bảo bạn có file .env nằm tại thư mục tests/test-runs/automation/scripts/.env với nội dung cấu hình URL của Backend và Frontend tương tự như sau:

```env
ESHOP_FRONTEND_BASE_URL="http://localhost:5173"
ESHOP_API_BASE_URL="http://localhost:3000"
```

### 2. Cài đặt các thư viện phụ thuộc (Dependencies)

Do các bộ kiểm thử được chia thành các dự án nhỏ độc lập để dễ quản lý, bạn cần cài đặt thư viện cho từng thư mục bằng cách mở Terminal tại thư mục của dự án đó và chạy:

```bash
npm install
```

Lưu ý: Nếu trình duyệt của Playwright chưa được cài đặt trên máy, hãy chạy lệnh sau sau khi cài đặt gói:

```bash
npx playwright install
```

---

## Hướng dẫn chạy thử nghiệm

Di chuyển Terminal vào thư mục của chức năng bạn muốn test (ví dụ: tests/test-runs/automation/scripts/category), sau đó sử dụng các lệnh dưới đây:

### 1. Chạy tất cả các test cases trên mọi trình duyệt

```bash
npm run test
```

### 2. Chạy trên một trình duyệt cụ thể

```bash
# Chỉ chạy trên Chromium
npm run test:chromium

# Chỉ chạy trên Firefox
npm run test:firefox

# Chỉ chạy trên Webkit (Safari)
npm run test:webkit
```

### 3. Chạy các nhóm kiểm thử cụ thể (ví dụ trong category)

- Chạy các test case CRUD (Equivalence Partitioning): `npm run test:crud`
- Chạy các test case Phân quyền (Authorization): `npm run test:auth`
- Chạy các test case Bảo mật (XSS, SQL Injection): `npm run test:security`
- Chạy các test case Phân tích giá trị biên (BVA): `npm run test:bva`

### 4. Xem báo cáo kết quả kiểm thử (Report HTML)

Sau khi chạy test xong, bạn có thể mở báo cáo chi tiết trực quan bằng lệnh:

```bash
npm run report
```
