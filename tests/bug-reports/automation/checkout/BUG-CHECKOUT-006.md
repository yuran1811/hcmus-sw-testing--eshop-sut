---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Thanh toán][Automation] Giỏ hàng không được xóa sạch sau khi thực hiện thanh toán thành công"
labels: "type: bug, module: checkout, severity: major, priority: P1, status: new, found-by: automation"
assignees: ""
---

- **Test Cases:** TC-CHECKOUT-001, TC-CHECKOUT-005, TC-CHECKOUT-006, TC-CHECKOUT-007, TC-CHECKOUT-BVA-001
- **Test Script Files:**
  * [checkout-api.spec.ts](../../../test-runs/automation/scripts/checkout/tests/checkout-api.spec.ts) (cho TC-CHECKOUT-001, TC-CHECKOUT-005, TC-CHECKOUT-006, TC-CHECKOUT-007)
  * [checkout-bva.spec.ts](../../../test-runs/automation/scripts/checkout/tests/checkout-bva.spec.ts) (cho TC-CHECKOUT-BVA-001)

## Requirement liên quan

FR-08 (Thanh toán)

## Environment

Browser: Chromium / Firefox / WebKit, OS: Windows, URL: http://localhost:3000

## Steps to reproduce

1. Thêm sản phẩm vào giỏ hàng.
2. Gửi request thanh toán POST `/api/checkout` thành công.
3. Gửi request lấy giỏ hàng GET `/api/cart`.

## Expected result

- Giỏ hàng của người dùng thực hiện thanh toán phải được làm sạch hoàn toàn (số lượng sản phẩm = 0).

## Actual result

- Giỏ hàng vẫn giữ nguyên các sản phẩm cũ sau khi đơn hàng đã được tạo thành công.

## Evidence

### 1. HTTP Request/Response Log
```http
# Gửi request lấy giỏ hàng sau khi checkout thành công:
GET /api/cart HTTP/1.1
Host: localhost:3000
Authorization: Bearer [User_Token]

# Phản hồi từ server:
HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "product_id": 2,
    "quantity": 1,
    "name": "Samsung Galaxy S23"
  }
]
```

### 2. Playwright Test Assertion Log
```bash
[chromium] › tests\checkout-api.spec.ts:60:7 › FR-08 Checkout — API Tests › TC-CHECKOUT-001: Thanh toán thành công giỏ hàng hợp lệ

Error: expect(received).toHaveLength(expected)

Expected length: 0
Received length: 1
Received array:  [{"product_id": 2, "quantity": 1, "name": "Samsung Galaxy S23"}]

  75 |     const cartResp = await api.getCart(token);
  76 |     const cart = await cartResp.json();
> 77 |     expect(cart).toHaveLength(0);
     |                  ^
```
