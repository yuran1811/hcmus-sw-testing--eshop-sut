---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Mã giảm giá][API] API apply-coupon không bắt buộc JWT hợp lệ"
labels: "type: bug, module: apply-coupon, severity: critical, priority: P0, status: new, found-by: api-testing"
assignees: ""
---

- **Test Cases:** FR09-APPLY-SEC-001, SEC-002, SC-004
- **Test Script File:** [FR09 Postman Collection](../../../test-runs/api/FR09_POST_api_apply_coupon/FR09_POST_api_apply_coupon.postman_collection.json)

## Requirement liên quan

FR-09 C4, SEC-02

## Environment

Newman, Node.js 22.20.0, OS: Windows, URL: http://127.0.0.1:3100, X-Student-Id: 23127115

# BUG-APPLYCOUPON-001: API áp dụng coupon không bắt buộc JWT hợp lệ

**API / Endpoint:** `POST /api/apply-coupon`  
**FR liên quan:** FR-09 C4, SEC-02  
**Test_ID liên quan:** `FR09-APPLY-SEC-001`, `SEC-002`, `SC-004`  
**Severity:** High

## Request đại diện

```http
POST http://127.0.0.1:3100/api/apply-coupon
X-Student-Id: 23127115
Content-Type: application/json

{"code":"SAVE10","total_amount":300000,"user_id":2}
```

## Expected result

Thiếu hoặc sai JWT phải bị từ chối bằng 401 và không áp dụng coupon.

## Actual result

API tiếp tục xử lý request thay vì trả 401; ba test xác thực fail.

## Evidence

![FR09 failure](../../../test-runs/api/images/FR09_failed_tests_detail.png)

## Tác động

Client không xác thực có thể áp dụng coupon và giả mạo `user_id`, làm sai giới hạn số lượt sử dụng.

## Đề xuất

Bắt buộc middleware JWT và lấy user id từ token; bỏ tin cậy `user_id` trong body.

## GitHub Issue

https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/335
