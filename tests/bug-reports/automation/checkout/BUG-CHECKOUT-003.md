---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Thanh toán][Automation] Backend chấp nhận total_amount giả mạo thấp hơn giá thực tế"
labels: "type: bug, module: checkout, severity: critical, priority: P0, status: new, found-by: automation"
assignees: ""
---

- **Test Cases:** TC-CHECKOUT-004, TC-CHECKOUT-BVA-002
- **Test Script Files:**
  * [checkout-api.spec.ts](../../../test-runs/automation/scripts/checkout/tests/checkout-api.spec.ts) (cho TC-CHECKOUT-004)
  * [checkout-bva.spec.ts](../../../test-runs/automation/scripts/checkout/tests/checkout-bva.spec.ts) (cho TC-CHECKOUT-BVA-002)

## Requirement liên quan

FR-08 (Thanh toán)

## Environment

Browser: Chromium / Firefox / WebKit, OS: Windows, URL: http://localhost:3000

## Steps to reproduce

1. Thêm sản phẩm vào giỏ hàng.
2. Gửi request POST thanh toán tới `/api/checkout` cố tình sửa đổi thuộc tính `total_amount` trong payload thấp hơn tổng giá trị thực tế của các sản phẩm.

## Expected result

- Server tự tính toán lại tổng tiền từ database, bác bỏ request hoặc ghi đè giá trị đúng.

## Actual result

- Server chấp nhận và lưu trực tiếp giá trị total_amount giả mạo thấp hơn vào database.

## Evidence

### 1. HTTP Request/Response Log
```http
POST /api/checkout HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Authorization: Bearer [User_Token]

{
  "shipping_address": "123 Nguyen Van Cu",
  "total_amount": 1000  # Giả mạo giá cực thấp (Ví dụ tổng thật là 15,000,000)
}

HTTP/1.1 201 Created
Content-Type: application/json

{
  "order_id": 415,
  "status": "success",
  "total_amount": 1000
}
```

### 2. Playwright Test Assertion Log
```bash
[chromium] › tests\checkout-api.spec.ts:160:7 › FR-08 Checkout — API Tests › TC-CHECKOUT-004: Sửa total_amount thành mốc giá rẻ hơn

Error: expect(received).not.toBe(expected) // Object.is equality

Expected: not 1000
Received: 1000

  170 |         if (orderResp.ok()) {
  171 |           const order = await orderResp.json() as { total_amount?: number };
> 172 |           expect(order.total_amount).not.toBe(tc.must_not_persist_total);
      |                                      ^
```
