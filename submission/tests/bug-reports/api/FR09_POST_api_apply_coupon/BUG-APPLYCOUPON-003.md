---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Áp dụng mã giảm giá][API] Chấp nhận total_amount sai kiểu dữ liệu"
labels: "type: bug, module: apply-coupon, severity: major, priority: P1, status: new, found-by: api-testing"
assignees: ""
---

- **Test Cases:** FR09-APPLY-DP-015, FR09-APPLY-DP-017
- **Test Script File:** [FR09 Postman Collection](../../../test-runs/api/FR09_POST_api_apply_coupon/FR09_POST_api_apply_coupon.postman_collection.json)

## Requirement liên quan

FR-09

## Environment

Newman, Node.js 22.20.0, OS: Windows, URL: http://127.0.0.1:3100, X-Student-Id: 23127115

# BUG-APPLYCOUPON-003: API không kiểm tra kiểu của total_amount

**API / Endpoint:** `POST /api/apply-coupon`  
**FR liên quan:** FR-09  
**Test_ID liên quan:** FR09-APPLY-DP-015, FR09-APPLY-DP-017  
**Severity:** Major

## Mô tả

API chấp nhận `total_amount` là chuỗi số hoặc số có phần thập phân, sau đó tiếp tục tính giảm giá. Việc ép kiểu ngầm còn làm lộ lỗi công thức với giá trị âm và tổng cuối lớn hơn đầu vào.

## Request đại diện

```http
POST http://127.0.0.1:3100/api/apply-coupon
Authorization: Bearer <valid-user-token>
X-Student-Id: 23127115
Content-Type: application/json

{"code":"SAVE10","total_amount":"500000","user_id":2}
```

## Expected result

Trả `400 Bad Request`, body JSON có `error`; không thực hiện phép tính hay thay đổi trạng thái coupon.

## Actual result

Trả `200 OK` và body `{"success":true,"discount_amount":-4500000,"final_amount":5000000,...}`. Giá trị `500000.75` cũng được chấp nhận.

## Evidence

![FR09 failed tests](../../../test-runs/api/images/FR09_failed_tests_detail.png)

## Tác động

Dữ liệu tiền tệ không đúng kiểu đi vào nghiệp vụ, gây kết quả tính toán sai và làm API contract không đáng tin cậy.

## Đề xuất

Kiểm tra `total_amount` là số nguyên hữu hạn, không âm và đúng đơn vị tiền trước khi tính; từ chối chuỗi và số thập phân bằng 400.

## GitHub Issue

https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/337
