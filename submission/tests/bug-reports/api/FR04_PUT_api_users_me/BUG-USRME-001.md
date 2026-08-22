---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Hồ sơ cá nhân][API] API trả mật khẩu plaintext trong response"
labels: "type: bug, module: user-profile, severity: critical, priority: P0, status: new, found-by: api-testing"
assignees: ""
---

- **Test Cases:** Toàn bộ 51 case FR04; đại diện FR04-USRME-SC-002
- **Test Script File:** [FR04 Postman Collection](../../../test-runs/api/FR04_PUT_api_users_me/FR04_PUT_api_users_me.postman_collection.json)

## Requirement liên quan

FR-04, SEC-01

## Environment

Newman, Node.js 22.20.0, OS: Windows, URL: http://127.0.0.1:3100, X-Student-Id: 23127115

# BUG-USRME-001: API hồ sơ làm lộ mật khẩu plaintext

**API / Endpoint:** `GET /api/users/me`  
**FR liên quan:** FR-04, SEC-01  
**Test_ID liên quan:** Toàn bộ 51 case FR04; đại diện `FR04-USRME-SC-002`  
**Severity:** Critical

## Mô tả

Response đọc hồ sơ chứa trường `password` với giá trị plaintext và cả `reset_token`. Sai lệch xuất hiện trong 51/51 iteration FR04.

## Steps to reproduce

1. Đăng nhập bằng user seed và lấy JWT.
2. Gọi `GET /api/users/me` với JWT và header mã sinh viên.
3. Quan sát response JSON.

## Request gửi đi

```http
GET http://127.0.0.1:3100/api/users/me
Authorization: Bearer <user-token>
X-Student-Id: 23127115
```

## Expected result

Response không chứa `password`, `reset_token` hoặc bí mật xác thực; SEC-01 yêu cầu mật khẩu không được lưu plaintext.

## Actual result

```json
{
  "id": 2,
  "email": "test@eshop.com",
  "password": "Test1234!",
  "reset_token": null
}
```

Newman ghi nhận assertion `GET profile exposes no sensitive field` fail ở cả 51 case.

## Evidence

![FR04 failure](../../../test-runs/api/images/FR04_failed_tests_detail.png)

## Tác động

Lộ thông tin xác thực và chứng minh mật khẩu đang được lưu plaintext; nếu response/log bị truy cập, tài khoản có thể bị chiếm đoạt.

## Đề xuất

Băm mật khẩu bằng thuật toán phù hợp; không bao giờ SELECT/serialize `password` và `reset_token` trong DTO hồ sơ.

## GitHub Issue

Chưa tạo — cần đăng issue thật và bổ sung URL.
