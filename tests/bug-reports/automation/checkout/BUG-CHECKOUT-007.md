---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Thanh toán][Automation] Lỗi rò rỉ phân tách dữ liệu: API Checkout xóa nhầm giỏ hàng của user khác"
labels: "type: bug, module: checkout, severity: critical, priority: P0, status: new, found-by: automation"
assignees: ""
---

- **Test Cases:** TC-CHECKOUT-015
- **Test Script File:** [checkout-api.spec.ts](../../../test-runs/automation/scripts/checkout/tests/checkout-api.spec.ts)

## Requirement liên quan

FR-08 (Thanh toán)

## Environment

Browser: Chromium / Firefox / WebKit, OS: Windows, URL: http://localhost:3000

## Steps to reproduce

1. User A thêm sản phẩm vào giỏ hàng.
2. User B thực hiện checkout thanh toán thành công giỏ hàng của mình.
3. Kiểm tra giỏ hàng của User A.

## Expected result

- API Checkout chỉ được làm sạch giỏ hàng của User B (người thanh toán), giỏ hàng User A phải được giữ nguyên.

## Actual result

- Khi User B checkout, API backend xóa toàn bộ bảng giỏ hàng của tất cả người dùng trong hệ thống (thiếu điều kiện lọc theo user_id khi thực hiện câu lệnh xóa).

## Evidence

### 1. HTTP Request/Response Log
```http
# Check giỏ hàng User A sau khi User B checkout:
GET /api/cart HTTP/1.1
Host: localhost:3000
Authorization: Bearer [User_A_Token]

# Phản hồi từ server:
HTTP/1.1 200 OK
Content-Type: application/json

[]
```

### 2. Playwright Test Assertion Log
```bash
[chromium] › tests\checkout-api.spec.ts:390:7 › FR-08 Checkout — API Tests › TC-CHECKOUT-015: Checkout của User B không ảnh hưởng User A

Error: expect(received).toHaveLength(expected)

Expected length: 1
Received length: 0
Received array:  []

  415 |     const cartBRespAfter = await api.getCart(tokenB);
  416 |     const cartBItemsAfter = await cartBRespAfter.json() as unknown[];
> 417 |     expect(cartBItemsAfter).toHaveLength(cartBCountBefore);
      |                             ^
```
