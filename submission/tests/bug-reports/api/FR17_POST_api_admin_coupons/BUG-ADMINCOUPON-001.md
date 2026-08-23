---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Quản lý mã giảm giá][API] User thường gọi được API tạo coupon admin"
labels: "type: bug, module: admin-coupon, severity: critical, priority: P0, status: new, found-by: api-testing"
assignees: ""
---

- **Test Cases:** FR17-ADMINCOUP-SEC-002, SEC-006, SC-003
- **Test Script File:** [FR17 Postman Collection](../../../test-runs/api/FR17_POST_api_admin_coupons/FR17_POST_api_admin_coupons.postman_collection.json)

## Requirement liên quan

FR-12, FR-17, SEC-03

## Environment

Newman, Node.js 22.20.0, OS: Windows, URL: http://127.0.0.1:3100, X-Student-Id: 23127115

# BUG-ADMINCOUPON-001: User thường có thể tạo coupon qua API admin

**API / Endpoint:** `POST /api/admin/coupons`  
**FR liên quan:** FR-12, FR-17, SEC-03  
**Test_ID liên quan:** `FR17-ADMINCOUP-SEC-002`, `SEC-006`, `SC-003`  
**Severity:** High

## Request đại diện

```http
POST http://127.0.0.1:3100/api/admin/coupons
Authorization: Bearer <regular-user-token>
X-Student-Id: 23127115
Content-Type: application/json

{"code":"USERCREATED","type":"percent","discount_value":10,"expired_at":"2099-12-31","min_order_amount":0,"max_uses_per_user":1}
```

## Expected result

Trả 403 và không tạo dữ liệu vì mọi API `/api/admin/*` phải kiểm tra `role = admin` trong token.

## Actual result

```json
{ "message": "Coupon created", "id": 6 }
```

API trả `200`; hậu kiểm thấy coupon được tạo.

## Evidence

![FR17 failure](../../../test-runs/api/images/FR17_failed_tests_detail.png)

## Tác động

Leo thang quyền theo chức năng: user thường tạo coupon tùy ý, ảnh hưởng trực tiếp doanh thu.

## Đề xuất

Đặt middleware xác thực và kiểm tra role admin trước controller cho toàn bộ route `/api/admin/*`.

## GitHub Issue

https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/340
