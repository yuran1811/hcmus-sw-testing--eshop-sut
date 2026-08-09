---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Thanh toán][Automation] API Checkout chấp nhận shipping_address sai kiểu dữ liệu dạng Object"
labels: "type: bug, module: checkout, severity: major, priority: P1, status: new, found-by: automation"
assignees: ""
---

- **Test Cases:** TC-CHECKOUT-010C
- **Test Script File:** [checkout-api.spec.ts](../../../test-runs/automation/scripts/checkout/tests/checkout-api.spec.ts)

## Requirement liên quan

FR-08 (Thanh toán)

## Environment

Browser: Chromium / Firefox / WebKit, OS: Windows, URL: http://localhost:3000

## Steps to reproduce

1. Gửi request POST tới `/api/checkout` với thuộc tính `shipping_address` truyền vào là một Object `{}` thay vì kiểu string.

## Expected result

- API validate địa chỉ giao hàng và phản hồi mã lỗi HTTP 400 Bad Request.

## Actual result

- API chấp nhận kiểu dữ liệu sai lệch này, dẫn đến việc lưu chuỗi đại diện `[object Object]` vào cột địa chỉ giao hàng trong database.

## Evidence

### 1. HTTP Request/Response Log
```http
POST /api/checkout HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Authorization: Bearer [User_Token]

{
  "shipping_address": {
    "city": "HCM",
    "street": "Nguyen Van Cu"
  }
}

HTTP/1.1 201 Created
Content-Type: application/json

{
  "order_id": 418,
  "status": "success",
  "shipping_address": "[object Object]"
}
```

### 2. Playwright Test Assertion Log
```bash
[chromium] › tests\checkout-api.spec.ts:305:9 › FR-08 Checkout — API Tests (Equivalence Partitioning) › TC-CHECKOUT-010C: shipping_address là Object (type mismatch)

Error: expect(received).not.toBe(expected) // Object.is equality

Expected: not "[object Object]"

  320 |             const order = await orderResp.json() as { shipping_address?: string };
  321 |             if (variant.must_not_persist_object_string) {
> 322 |               expect.soft(order.shipping_address).not.toBe(variant.must_not_persist_object_string);
      |                                                       ^
```

## GitHub Issue

https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/256
