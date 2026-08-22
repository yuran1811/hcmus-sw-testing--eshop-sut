---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Hồ sơ cá nhân][API] User thường tự nâng role thành admin"
labels: "type: bug, module: user-profile, severity: critical, priority: P0, status: new, found-by: api-testing"
assignees: ""
---

- **Test Cases:** FR04-USRME-SEC-003, FR04-USRME-SC-005
- **Test Script File:** [FR04 Postman Collection](../../../test-runs/api/FR04_PUT_api_users_me/FR04_PUT_api_users_me.postman_collection.json)

## Requirement liên quan

FR-04, SEC-06

## Environment

Newman, Node.js 22.20.0, OS: Windows, URL: http://127.0.0.1:3100, X-Student-Id: 23127115

# BUG-USRME-002: Người dùng tự nâng quyền admin qua cập nhật hồ sơ

**API / Endpoint:** `PUT /api/users/me`  
**FR liên quan:** FR-04, SEC-06  
**Test_ID liên quan:** `FR04-USRME-SEC-003`, `FR04-USRME-SC-005`  
**Severity:** High

## Mô tả

Endpoint chấp nhận trường `role` từ body và lưu `role = admin` cho user thường, trái FR-04 và SEC-06.

## Request gửi đi

```http
PUT http://127.0.0.1:3100/api/users/me
Authorization: Bearer <user-token>
X-Student-Id: 23127115
Content-Type: application/json

{"name":"Schema role","phone":"0912345678","shipping_address":"1 A","role":"admin"}
```

## Expected result

Từ chối trường `role` với lỗi 400 và không thay đổi dữ liệu/quyền.

## Actual result

```json
{ "message": "Profile updated" }
```

Status `200`; hậu kiểm đọc được `role: "admin"` cho user id 2.

## Evidence

![FR04 failure](../../../test-runs/api/images/FR04_failed_tests_detail.png)

## Tác động

User thường có thể leo thang đặc quyền và truy cập chức năng quản trị.

## Đề xuất

Dùng allow-list cố định chỉ gồm `name`, `phone`, `shipping_address`; không ánh xạ trực tiếp body vào câu lệnh UPDATE.

## GitHub Issue

Chưa tạo — cần đăng issue thật và bổ sung URL.
