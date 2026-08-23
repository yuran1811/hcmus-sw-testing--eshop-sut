---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Áp dụng mã giảm giá][API] Tổng tiền bằng ngưỡng tối thiểu bị từ chối"
labels: "type: bug, module: apply-coupon, severity: major, priority: P1, status: new, found-by: api-testing"
assignees: ""
---

- **Test Cases:** FR09-APPLY-DP-002, FR09-APPLY-DP-003, FR09-APPLY-DP-004, FR09-APPLY-SC-002
- **Test Script File:** [FR09 Postman Collection](../../../test-runs/api/FR09_POST_api_apply_coupon/FR09_POST_api_apply_coupon.postman_collection.json)

## Requirement liên quan

FR-09, điều kiện C3

## Environment

Newman, Node.js 22.20.0, OS: Windows, URL: http://127.0.0.1:3100, X-Student-Id: 23127115

# BUG-APPLYCOUPON-005: API xử lý sai biên min_order_amount

**API / Endpoint:** `POST /api/apply-coupon`  
**FR liên quan:** FR-09 C3  
**Test_ID liên quan:** FR09-APPLY-DP-002, DP-003, DP-004, SC-002  
**Severity:** Medium

## Mô tả

FR-09 C3 quy định tổng đơn hàng phải `>= min_order_amount`. API lại từ chối khi tổng tiền đúng bằng ngưỡng, cho thấy điều kiện đang được xử lý như `>`.

## Request đại diện

```http
POST http://127.0.0.1:3100/api/apply-coupon
Authorization: Bearer <valid-user-token>
X-Student-Id: 23127115
Content-Type: application/json

{"code":"BIGBUY","total_amount":500000,"user_id":2}
```

## Expected result

Trả `200`; BIGBUY giảm `50000`, `final_amount` bằng `450000` vì tổng tiền bằng ngưỡng `500000` vẫn hợp lệ.

## Actual result

Trả `400 Bad Request` với `{"error":"Đơn hàng chưa đủ giá trị tối thiểu 500,000 ₫ để áp dụng mã này"}`. Lỗi cũng tái hiện với SAVE10 và VIP100 tại đúng ngưỡng.

## Evidence

![FR09 failed tests](../../../test-runs/api/images/FR09_failed_tests_detail.png)

## Tác động

Khách hàng đủ điều kiện theo yêu cầu vẫn không dùng được coupon, gây sai nghiệp vụ trực tiếp tại checkout.

## Đề xuất

Chỉ từ chối khi `total_amount < min_order_amount`; bổ sung unit/integration test cho giá trị ngay dưới, đúng bằng và ngay trên ngưỡng.

## GitHub Issue

https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/339
