---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Thanh toán][Automation] Backend không đảm bảo total_amount được tính từ dữ liệu server"
labels: "type: bug, module: checkout, severity: major, priority: P1, status: new, found-by: automation"
assignees: ""
---

- **Test Cases:** TC-CHECKOUT-013, TC-CHECKOUT-BVA-003
- **Test Script File(s):**
  * [checkout-api.spec.ts](../../../test-runs/automation/scripts/checkout/tests/checkout-api.spec.ts) (cho TC-CHECKOUT-013)
  * [checkout-bva.spec.ts](../../../test-runs/automation/scripts/checkout/tests/checkout-bva.spec.ts) (cho TC-CHECKOUT-BVA-003)

## Requirement liên quan

FR-08 (Thanh toán)

## Environment

Browser: Chromium / Firefox / WebKit, OS: Windows, URL: http://localhost:3000

## Steps to reproduce

1. Thêm sản phẩm vào giỏ hàng.
2. Gửi request POST thanh toán tới `/api/checkout` trong một trong hai biến thể:
   - Không gửi thuộc tính `total_amount`.
   - Gửi `total_amount` cao hơn tổng giá trị thực tế của các sản phẩm.

## Expected result

- Server tự tính toán lại tổng tiền từ database/giỏ hàng phía server, bác bỏ request hoặc ghi đè giá trị đúng.

## Actual result

- Khi client không gửi `total_amount`, server vẫn tạo đơn nhưng lưu `total_amount = null`.
- Khi client gửi `total_amount` cao hơn thực tế, server chấp nhận và lưu trực tiếp giá trị giả mạo vào database.

## Evidence

### 1. HTTP Request/Response Log
```http
POST /api/checkout HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Authorization: Bearer [User_Token]

{
  "shipping_address": "123 Nguyen Van Cu",
  "total_amount": 99999999  # Giả mạo giá cực cao
}

HTTP/1.1 201 Created
Content-Type: application/json

{
  "order_id": 416,
  "status": "success",
  "total_amount": 99999999
}
```

### 2. Playwright Test Assertion Log
```bash
[chromium] › tests\checkout-bva.spec.ts:131:7 › FR-08 Checkout — BVA › TC-CHECKOUT-BVA-003: total_amount cao hơn giá trị hệ thống tính

Error: expect(received).not.toBe(expected) // Object.is equality

Expected: not 99999999
Received: 99999999

  342 |         if (orderResp.ok()) {
  343 |           const order = await orderResp.json() as { total_amount?: number };
> 344 |           expect(order.total_amount).not.toBe(tc.must_not_persist_total);
      |                                      ^
```

```bash
[chromium] › tests\checkout-api.spec.ts:333:7 › FR-08 Checkout — API Tests › TC-CHECKOUT-013: Backend tự tính total_amount khi client không gửi

Error: expect(received).toBeGreaterThan(expected)

Matcher error: received value must be a number or bigint
Received has value: null

  347 |         if (orderResp.ok()) {
  348 |           const order = await orderResp.json() as { total_amount?: number; status?: string };
> 349 |           expect.soft(order.total_amount).toBeGreaterThan(0);
      |                                           ^
```

## GitHub Issue

https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/250
