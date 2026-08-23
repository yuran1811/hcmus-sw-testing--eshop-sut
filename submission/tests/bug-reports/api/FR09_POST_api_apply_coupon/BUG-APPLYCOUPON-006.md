---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Áp dụng mã giảm giá][API] Code sai định dạng bị phân loại thành tài nguyên không tồn tại"
labels: "type: bug, module: apply-coupon, severity: minor, priority: P2, status: new, found-by: api-testing"
assignees: ""
---

- **Test Cases:** FR09-APPLY-DP-009, FR09-APPLY-SEC-005, FR09-APPLY-SEC-011
- **Test Script File:** [FR09 Postman Collection](../../../test-runs/api/FR09_POST_api_apply_coupon/FR09_POST_api_apply_coupon.postman_collection.json)

## Requirement liên quan

FR-09 — kiểm tra dữ liệu đầu vào

## Environment

Newman, Node.js 22.20.0, Windows, URL: http://127.0.0.1:3100, X-Student-Id: 23127115

# BUG-APPLYCOUPON-006: Code sai định dạng trả 404 thay vì lỗi validation 400

**API / Endpoint:** `POST /api/apply-coupon`  
**FR liên quan:** FR-09  
**Test_ID liên quan:** `FR09-APPLY-DP-009`, `FR09-APPLY-SEC-005`, `FR09-APPLY-SEC-011`  
**Severity:** Low

## Mô tả

Các giá trị `code` chỉ có khoảng trắng, chứa XSS hoặc ký tự điều khiển không được từ chối tại bước validation. API tiếp tục tra cứu coupon rồi trả 404 như một mã hợp lệ nhưng không tồn tại.

## Request đại diện

```http
POST http://127.0.0.1:3100/api/apply-coupon
Authorization: Bearer <valid-user-token>
X-Student-Id: 23127115
Content-Type: application/json

{"code":"   ","total_amount":500000,"user_id":2}
```

## Expected result

Trả `400 Bad Request` với JSON `error`, không thực hiện tra cứu hoặc thay đổi trạng thái coupon.

## Actual result

Trả `404 Not Found` với lỗi mã giảm giá không tồn tại. Newman ghi nhận cả ba case sai status `400` → `404`.

## Evidence

![FR09 failed tests](../../../test-runs/api/images/FR09_failed_tests_detail.png)

## Tác động

API không phân biệt dữ liệu sai định dạng với tài nguyên không tồn tại, làm sai contract và xử lý lỗi phía client.

## Đề xuất

Trim và kiểm tra allow-list định dạng `code` trước khi truy vấn; trả 400 cho dữ liệu không hợp lệ.

## GitHub Issue

https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/345
