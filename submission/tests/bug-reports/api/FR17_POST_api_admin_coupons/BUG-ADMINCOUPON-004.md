---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Quản lý mã giảm giá][API] Code trùng gây 500 và lộ lỗi SQLite"
labels: "type: bug, module: admin-coupon, severity: major, priority: P1, status: new, found-by: api-testing"
assignees: ""
---

- **Test Cases:** FR17-ADMINCOUP-DP-006, FR17-ADMINCOUP-SC-005, FR17-ADMINCOUP-SEC-008
- **Test Script File:** [FR17 Postman Collection](../../../test-runs/api/FR17_POST_api_admin_coupons/FR17_POST_api_admin_coupons.postman_collection.json)

## Requirement liên quan

FR-17

## Environment

Newman, Node.js 22.20.0, OS: Windows, URL: http://127.0.0.1:3100, X-Student-Id: 23127115

# BUG-ADMINCOUPON-004: Code coupon trùng gây 500 và lộ chi tiết CSDL

**API / Endpoint:** `POST /api/admin/coupons`  
**FR liên quan:** FR-17  
**Test_ID liên quan:** FR17-ADMINCOUP-DP-006, FR17-ADMINCOUP-SC-005, FR17-ADMINCOUP-SEC-008  
**Severity:** Major

## Mô tả

Khi tạo coupon có `code` đã tồn tại, lỗi unique constraint không được ánh xạ thành lỗi nghiệp vụ. API trả 500 và gửi nguyên thông báo SQLite cho client; lỗi cũng tái hiện khi hai request tạo trùng diễn ra gần nhau.

## Request đại diện

```http
POST http://127.0.0.1:3100/api/admin/coupons
Authorization: Bearer <valid-admin-token>
X-Student-Id: 23127115
Content-Type: application/json

{"code":"SAVE10","type":"percent","discount_value":10,"min_order_amount":300000,"expired_at":"2099-12-31","max_uses_per_user":1}
```

## Expected result

Trả `409 Conflict`, body JSON lỗi ở mức nghiệp vụ và không lộ công nghệ lưu trữ.

## Actual result

Trả `500 Internal Server Error` với `{"error":"SQLITE_CONSTRAINT: UNIQUE constraint failed: coupons.code"}`.

## Evidence

![FR17 failed tests](../../../test-runs/api/images/FR17_failed_tests_detail.png)

## Tác động

Lộ loại CSDL/tên bảng/cột, đồng thời khiến client hiểu nhầm xung đột dữ liệu có thể dự đoán là sự cố máy chủ.

## Đề xuất

Bắt mã lỗi unique constraint và ánh xạ sang 409 với thông báo trung tính; vẫn giữ unique constraint để bảo vệ trường hợp đồng thời.

## GitHub Issue

Chưa tạo — cần đăng issue thật và bổ sung URL.
