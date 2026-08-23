---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Quản lý mã giảm giá][API] Thiếu validation dữ liệu coupon"
labels: "type: bug, module: admin-coupon, severity: major, priority: P1, status: new, found-by: api-testing"
assignees: ""
---

- **Test Cases:** 30 case validation/state
- **Test Script File:** [FR17 Postman Collection](../../../test-runs/api/FR17_POST_api_admin_coupons/FR17_POST_api_admin_coupons.postman_collection.json)

## Requirement liên quan

FR-17

## Environment

Newman, Node.js 22.20.0, OS: Windows, URL: http://127.0.0.1:3100, X-Student-Id: 23127115

# BUG-ADMINCOUPON-002: API tạo coupon thiếu validation dữ liệu đầu vào

**API / Endpoint:** `POST /api/admin/coupons`  
**FR liên quan:** FR-17  
**Test_ID liên quan:** 30 case validation/state  
**Severity:** Medium

## Mô tả

API chấp nhận nhiều body thiếu/sai trường bắt buộc và tạo dữ liệu ngoài contract. Newman ghi nhận 30 case validation/cardinality/state sai, trong đó 28 case đáng lẽ trả 400.

## Request đại diện

```http
POST http://127.0.0.1:3100/api/admin/coupons
Authorization: Bearer <admin-token>
X-Student-Id: 23127115
Content-Type: application/json

{"code":"","type":"invalid","discount_value":-1,"min_order_amount":-1,"max_uses_per_user":0}
```

## Expected result

Trả 400, response lỗi dạng JSON và không tạo coupon.

## Actual result

Nhiều body không hợp lệ trả `200` và tạo bản ghi.

## Evidence

![FR17 report](../../../test-runs/api/images/FR17_newman_full_report.png)

## Tác động

CSDL chứa coupon không hợp lệ; client không thể tin cậy status/schema và các thao tác lifecycle trở nên không xác định.

## Đề xuất

Validate schema/enum/range/required fields trước INSERT và trả error schema nhất quán.

## GitHub Issue

https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/341
