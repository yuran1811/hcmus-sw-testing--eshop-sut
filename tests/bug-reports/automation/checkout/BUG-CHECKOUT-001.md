---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Thanh toán][Automation] Khách hàng dùng token JWT không hợp lệ vẫn thanh toán thành công"
labels: "type: bug, module: checkout, severity: critical, priority: P0, status: new, found-by: automation"
assignees: ""
---

- **Test Cases:** TC-CHECKOUT-002
- **Test Script File:** [checkout-api.spec.ts](../../../test-runs/automation/scripts/checkout/tests/checkout-api.spec.ts)

## Requirement liên quan

FR-08 (Thanh toán)

## Environment

Browser: Chromium / Firefox / WebKit, OS: Windows, URL: http://localhost:3000

## Steps to reproduce

1. Gửi request POST tới `/api/checkout` kèm theo token JWT bị sửa đổi chữ ký hoặc hết hạn.

## Expected result

- API từ chối và phản hồi mã lỗi HTTP 401 Unauthorized.

## Actual result

- API chấp nhận token không hợp lệ, thực hiện thanh toán thành công và trả về HTTP 200/201.

## Evidence

### 1. HTTP Request/Response Log
```http
POST /api/checkout HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Authorization: Bearer invalid_or_expired_token_signature_here

{
  "shipping_address": "123 Nguyen Van Cu"
}

HTTP/1.1 201 Created
Content-Type: application/json

{
  "order_id": 413,
  "status": "success",
  "total_amount": 15000000
}
```

### 2. Playwright Test Assertion Log
```bash
[chromium] › tests\checkout-api.spec.ts:90:7 › FR-08 Checkout — API Tests › TC-CHECKOUT-002: Thanh toán với token JWT không hợp lệ

Error: expect(received).toBe(expected) // Object.is equality

Expected: 401
Received: 201

  95 |     const resp = await api.checkout("invalid_token", tc.payload);
  96 |     expect(resp.status()).not.toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
> 97 |     expect.soft(resp.status()).toBe(tc.expected_status);
     |                                ^
```
