# BUG-PRODUCT-004: API không validate category_id (chấp nhận giá trị rỗng và không tồn tại)

## Found by Test Case

TC-PRODUCT-011, TC-PRODUCT-012

## Requirement liên quan

FR-15 (Quản lý Sản phẩm — danh mục là bắt buộc và phải tồn tại)

## Severity / Priority

Major / P2

## Environment

- API endpoint: http://localhost:3000
- Tool: Playwright API request (project `api`)
- Build: nhánh `anh-khoa`, commit `a7b11fd`

## Steps to reproduce

**Kịch bản 1 — TC-PRODUCT-011 (category_id rỗng):**

1. Gửi POST request tạo sản phẩm mới tới API với `category_id: ""` (trống)
2. Kiểm tra response status

**Kịch bản 2 — TC-PRODUCT-012 (category_id không tồn tại):**

1. Gửi POST request tạo sản phẩm mới với `category_id: 999999` (ID không có trong DB)
2. Kiểm tra response status

## Expected result

- Kịch bản 1: API trả về `400 Bad Request` — "Danh mục không được để trống"
- Kịch bản 2: API trả về `400 Bad Request` hoặc `404 Not Found` — "Danh mục không tồn tại"

## Actual result

API chấp nhận cả hai request và tạo sản phẩm thành công mà không kiểm tra tính hợp lệ của `category_id`.

```
Error: Spec yêu cầu reject khi không chọn Danh mục
Error: Spec yêu cầu reject khi category_id không tồn tại
```

## Evidence

- Không có screenshot (API test, không có UI)
- Playwright log: `Error: Spec yêu cầu reject khi không chọn Danh mục`
- Playwright log: `Error: Spec yêu cầu reject khi category_id không tồn tại`
