---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Thanh toán][Automation] Giỏ hàng trống vẫn cho phép gửi yêu cầu thanh toán thành công"
labels: "type: bug, module: checkout, severity: major, priority: P1, status: new, found-by: automation"
assignees: ""
---

- **Test Cases:** TC-CHECKOUT-003
- **Test Script File:** [checkout-api.spec.ts](../../../test-runs/automation/scripts/checkout/tests/checkout-api.spec.ts)

## Requirement liên quan

FR-08 (Thanh toán)

## Environment

Browser: Chromium / Firefox / WebKit, OS: Windows, URL: http://localhost:3000

## Steps to reproduce

1. Đảm bảo giỏ hàng hiện tại trống.
2. Gửi request POST tới `/api/checkout` kèm địa chỉ giao hàng.

## Expected result

- API từ chối với mã lỗi HTTP 400 Bad Request.

## Actual result

- API chấp nhận thanh toán giỏ hàng trống, tạo hóa đơn mới với tổng số tiền = 0 và trả về HTTP 200/201.

## Evidence

### 1. HTTP Request/Response Log
```http
POST /api/checkout HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Authorization: Bearer [User_Token]

{
  "shipping_address": "123 Nguyen Van Cu"
}

HTTP/1.1 201 Created
Content-Type: application/json

{
  "order_id": 414,
  "status": "success",
  "total_amount": 0
}
```

### 2. Playwright Test Assertion Log
```bash
[chromium] › tests\checkout-api.spec.ts:130:7 › FR-08 Checkout — API Tests › TC-CHECKOUT-003: Thanh toán khi giỏ hàng trống

Error: expect(received).toBe(expected) // Object.is equality

Expected: 400
Received: 201

  135 |     const resp = await api.checkout(token, tc.payload);
  136 |     expect(resp.status()).not.toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
> 137 |     expect.soft(resp.status()).toBe(tc.expected_status);
      |                                ^
```
