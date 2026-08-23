---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Áp dụng mã giảm giá][API] Chấp nhận field ngoài đặc tả và dữ liệu tampering"
labels: "type: bug, module: apply-coupon, severity: major, priority: P1, status: new, found-by: api-testing"
assignees: ""
---

- **Test Cases:** FR09-APPLY-SEC-007, FR09-APPLY-SEC-010
- **Test Script File:** [FR09 Postman Collection](../../../test-runs/api/FR09_POST_api_apply_coupon/FR09_POST_api_apply_coupon.postman_collection.json)

## Requirement liên quan

FR-09, SEC-02 — chỉ chấp nhận field thuộc API contract

## Environment

Newman, Node.js 22.20.0, Windows, URL: http://127.0.0.1:3100, X-Student-Id: 23127115

# BUG-APPLYCOUPON-007: API không từ chối field ngoài đặc tả và dữ liệu tampering

**API / Endpoint:** `POST /api/apply-coupon`  
**FR liên quan:** FR-09, SEC-02  
**Test_ID liên quan:** `FR09-APPLY-SEC-007`, `FR09-APPLY-SEC-010`  
**Severity:** Medium

## Mô tả

Request chứa các field nhạy cảm ngoài đặc tả như `role`, `is_active`, `discount_amount`, `final_amount` và `max_uses_per_user` vẫn được xử lý thành công thay vì bị từ chối.

## Request đại diện

```http
POST http://127.0.0.1:3100/api/apply-coupon
Authorization: Bearer <valid-user-token>
X-Student-Id: 23127115
Content-Type: application/json

{"code":"SAVE10","total_amount":500000,"user_id":2,"discount_amount":0,"final_amount":0,"is_active":true,"max_uses_per_user":999999}
```

## Expected result

Trả `400 Bad Request` và không áp dụng coupon khi body chứa field ngoài allow-list.

## Actual result

Trả `200 OK` và response thành công; Newman ghi nhận thiếu trường `error` và sai status ở cả hai case.

## Evidence

![FR09 failed tests](../../../test-runs/api/images/FR09_failed_tests_detail.png)

## Tác động

Contract đầu vào không được kiểm soát, che giấu hành vi tampering và tạo rủi ro khi implementation sau này vô tình bind các field nhạy cảm.

## Đề xuất

Áp dụng schema strict hoặc allow-list chỉ gồm `code`, `total_amount`; lấy danh tính từ token và từ chối mọi field không xác định.

## GitHub Issue

https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/346
