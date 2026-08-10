---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Quản lý Danh mục][Automation] Xóa danh mục không xử lý các sản phẩm liên kết gây orphan records"
labels: "type: bug, module: category, severity: major, priority: P1, status: new, found-by: automation"
assignees: ""
---

- **Test Cases:** TC-CATEGORY-009
- **Test Script File:** [category-crud.spec.ts](../../../test-runs/automation/scripts/category/tests/category-crud.spec.ts)

## Requirement liên quan

FR-14 (Quản lý Danh mục)

## Environment

Browser: Chromium / Firefox / WebKit, OS: Windows, URL: http://localhost:3000

## Steps to reproduce

1. Tạo một danh mục mới.
2. Thêm một sản phẩm và liên kết sản phẩm đó tới ID của danh mục vừa tạo.
3. Thực hiện gửi request DELETE để xóa danh mục vừa tạo.
4. Kiểm tra sản phẩm liên kết trong database.

## Expected result

- Khi danh mục bị xóa, tất cả sản phẩm thuộc danh mục đó phải tự động cập nhật trường `category_id` về null (SET NULL) hoặc bị xóa cùng danh mục (CASCADE delete).

## Actual result

- Danh mục bị xóa thành công nhưng sản phẩm liên kết vẫn giữ nguyên giá trị `category_id` cũ (ID đã bị xóa khỏi bảng categories).

## Evidence

### 1. HTTP Request/Response Log
```http
DELETE /api/categories/12 HTTP/1.1
Host: localhost:3000
Authorization: Bearer [Admin_Token]

HTTP/1.1 200 OK

---
# Query database trực tiếp:
SELECT id, name, category_id FROM products WHERE category_id = 12;

# Kết quả truy vấn trả về:
[
  { "id": 45, "name": "iPhone 15 Pro", "category_id": 12 }
]
# Trong khi bảng categories đã không còn ID = 12 nữa.
```

### 2. Playwright Test Assertion Log
```bash
[chromium] › tests\category-crud.spec.ts:180:7 › FR-14 Category CRUD — Equivalence Partitioning › TC-CATEGORY-009: Xóa danh mục có sản phẩm liên kết

Error: expect(received).toHaveLength(expected)

Expected length: 0
Received length: 1
Received array:  [{"id": 45, "name": "iPhone Pro", "category_id": 12}]

  195 |     const productsResp = await api.getProductsByCategoryId(12);
  196 |     const list = await productsResp.json();
> 197 |     expect(list).toHaveLength(0);
      |                  ^
```

## GitHub Issue

https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/246
