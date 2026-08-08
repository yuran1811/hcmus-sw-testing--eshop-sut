# BUG-PRODUCT-005: Danh mục sản phẩm không thực sự bắt buộc — UI không cho bỏ trống, backend không kiểm tồn tại

## Found by Test Case

TC-PRODUCT-011, TC-PRODUCT-012

## Requirement liên quan

FR-15 (Quản lý Sản phẩm — Danh mục là bắt buộc, phải chọn từ danh sách có sẵn)

## Severity / Priority

Major / P2

## Environment

- Browser: Chromium, Firefox, WebKit — tái hiện trên cả 3
- OS: Windows 11
- URL: http://localhost:5174 (frontend-admin), API: http://localhost:3000/api/products
- Build: nhánh `hw04/23127211`, commit `3d2a86d`

## Steps to reproduce

**Phần 1 (TC-PRODUCT-011):** Đăng nhập Admin → tab Sản phẩm → quan sát dropdown Danh mục trong form thêm sản phẩm.

**Phần 2 (TC-PRODUCT-012):** Gọi `POST /api/products` với `category_id: 999999` (không tồn tại trong bảng `categories`).

## Expected result

- Phần 1: UI phải có trạng thái "chưa chọn" (option rỗng) để người dùng có thể bỏ trống, thoả yêu cầu "Danh mục là bắt buộc" theo đúng nghĩa validate được.
- Phần 2: Request bị từ chối vì `category_id` không tồn tại.

## Actual result

- Phần 1: Dropdown (`frontend-admin/src/App.jsx:528-543`) chỉ render các category có sẵn (`categories.map(...)`), **không có option rỗng/placeholder nào**, và state mặc định `category_id = 1` — không thể tạo được trạng thái "không chọn danh mục" qua UI để kiểm chứng việc bắt buộc.
- Phần 2: Request **thành công**, sản phẩm được tạo với `category_id = 999999` không tồn tại. Bảng `products` (`backend/database.js:64-71`) không khai báo `FOREIGN KEY`, và `backend/server.js:167-177` không validate `category_id` có tồn tại trong bảng `categories` hay không trước khi `INSERT`.

## Evidence

![BUG-PRODUCT-005](../screenshots/BUG-PRODUCT-005.png)

- HTML report: `tests/e2e/reports/html/product-chromium/index.html` — test `TC-PRODUCT-011` (Failed): `expect(page.locator('form select').locator('option[value=""]')).toHaveCount(1)` nhận count = 0; test `TC-PRODUCT-012` (Failed): `expect(res.ok()).toBe(false)` nhận `true`.

## Notes

Hai triệu chứng của cùng một gốc rễ: "Danh mục bắt buộc" chỉ được thực thi hời hợt qua giá trị mặc định ở UI, không có validate thật ở tầng backend/CSDL (thiếu FOREIGN KEY constraint).
