---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Áp dụng mã giảm giá][API] Hai request đồng thời cùng vượt qua giới hạn lượt dùng"
labels: "type: bug, module: apply-coupon, severity: critical, priority: P0, status: new, found-by: api-testing"
assignees: ""
---

- **Test Cases:** FR09-APPLY-SEC-009
- **Test Script File:** [FR09 Postman Collection](../../../test-runs/api/FR09_POST_api_apply_coupon/FR09_POST_api_apply_coupon.postman_collection.json)

## Requirement liên quan

FR-09 — giới hạn `max_uses_per_user`, kiểm tra đồng thời

## Environment

Newman, Node.js 22.20.0, Windows, URL: http://127.0.0.1:3100, X-Student-Id: 23127115

# BUG-APPLYCOUPON-008: Race condition tại giới hạn lượt sử dụng coupon

**API / Endpoint:** `POST /api/apply-coupon`  
**FR liên quan:** FR-09  
**Test_ID liên quan:** `FR09-APPLY-SEC-009`  
**Severity:** High

## Mô tả

Hai request áp dụng `SAVE10` được gửi đồng thời tại biên giới hạn sử dụng. Cả hai cùng đọc trạng thái chưa đạt giới hạn và đều trả thành công.

## Request đại diện

```http
POST http://127.0.0.1:3100/api/apply-coupon
Authorization: Bearer <valid-user-token>
X-Student-Id: 23127115
Content-Type: application/json

{"code":"SAVE10","total_amount":500000,"user_id":2}
```

## Expected result

Kiểm tra và giữ lượt sử dụng phải nguyên tử; tối đa một request được chấp nhận, request còn lại phải bị từ chối do đạt giới hạn.

## Actual result

Cả hai bước trong special sequence đều trả `200 OK`. Newman ghi `Special sequence reports pass ... expected false to equal true`.

## Evidence

![FR09 failed tests](../../../test-runs/api/images/FR09_failed_tests_detail.png)

## Tác động

Người dùng có thể gửi đồng thời nhiều request để vượt `max_uses_per_user`, gây áp dụng coupon vượt chính sách.

## Đề xuất

Thực hiện kiểm tra và ghi nhận lượt dùng trong cùng transaction, kèm unique constraint/conditional update để chống race condition.

## GitHub Issue

https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/347
