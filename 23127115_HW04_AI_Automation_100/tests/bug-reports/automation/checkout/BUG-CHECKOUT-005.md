---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Thanh toán][Automation] Backend chấp nhận giá sản phẩm / items giả mạo từ client"
labels: "type: bug, module: checkout, severity: critical, priority: P0, status: new, found-by: automation"
assignees: ""
---

- **Test Cases:** TC-CHECKOUT-014
- **Test Script File:** [checkout-api.spec.ts](../../../test-runs/automation/scripts/checkout/tests/checkout-api.spec.ts)

## Requirement liên quan

FR-08 (Thanh toán)

## Environment

Browser: Chromium / Firefox / WebKit, OS: Windows, URL: http://localhost:3000

## Steps to reproduce

1. Thêm sản phẩm vào giỏ hàng.
2. Gửi request POST thanh toán tới `/api/checkout` sửa đổi trường giá trị `price` của từng item sản phẩm trong danh sách giỏ hàng.

## Expected result

- Server tự truy vấn giá sản phẩm từ database gốc thay vì tin tưởng thông tin items do client truyền lên.

## Actual result

- Server chấp nhận các giá trị sản phẩm giả mạo này để lưu trực tiếp vào chi tiết hóa đơn (order items).

## Evidence

### 1. HTTP Request/Response Log
```http
POST /api/checkout HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Authorization: Bearer [User_Token]

{
  "shipping_address": "123 Nguyen Van Cu",
  "items": [
    {
      "product_id": 1,
      "quantity": 1,
      "price": 1  # Giả mạo giá sản phẩm là 1₫ thay vì giá gốc
    }
  ]
}

HTTP/1.1 201 Created
Content-Type: application/json

{
  "order_id": 417,
  "status": "success",
  "total_amount": 1
}
```

### 2. Playwright Test Assertion Log
```bash
[chromium] › tests\checkout-api.spec.ts:359:7 › FR-08 Checkout — API Tests › TC-CHECKOUT-014: Backend không dùng items/giá giả mạo từ client payload

Error: expect(received).not.toBe(expected) // Object.is equality

Expected: not 1
Received: 1

  375 |         if (orderResp.ok()) {
  376 |           const order = await orderResp.json() as { total_amount?: number };
> 377 |           expect(order.total_amount).not.toBe(tc.must_not_persist_total);
      |                                          ^
```

## GitHub Issue

https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/251
