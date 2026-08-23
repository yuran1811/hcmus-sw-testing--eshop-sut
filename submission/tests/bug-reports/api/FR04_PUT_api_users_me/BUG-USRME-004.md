---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Hồ sơ người dùng][API] Content-Type không hỗ trợ gây 500 và lộ stack trace"
labels: "type: bug, module: users-me, severity: major, priority: P1, status: new, found-by: api-testing"
assignees: ""
---

- **Test Cases:** FR04-USRME-DP-022
- **Test Script File:** [FR04 Postman Collection](../../../test-runs/api/FR04_PUT_api_users_me/FR04_PUT_api_users_me.postman_collection.json)

## Requirement liên quan

FR-04

## Environment

Newman, Node.js 22.20.0, OS: Windows, URL: http://127.0.0.1:3100, X-Student-Id: 23127115

# BUG-USRME-004: Content-Type không hỗ trợ gây 500 và lộ stack trace

**API / Endpoint:** `PUT /api/users/me`  
**FR liên quan:** FR-04  
**Test_ID liên quan:** FR04-USRME-DP-022  
**Severity:** Major

## Mô tả

Khi gửi body `text/plain`, handler vẫn destructure `req.body` dù body parser không tạo object. API trả 500 HTML kèm đường dẫn máy chủ và stack trace thay vì lỗi JSON 415.

## Request đại diện

```http
PUT http://127.0.0.1:3100/api/users/me
Authorization: Bearer <valid-user-token>
X-Student-Id: 23127115
Content-Type: text/plain

name=PlainText&phone=0912345678&shipping_address=1+A
```

## Expected result

Trả `415 Unsupported Media Type`, body JSON có trường `error`, không để lộ chi tiết nội bộ.

## Actual result

Trả `500 Internal Server Error`, `Content-Type: text/html`; body chứa `TypeError`, đường dẫn `backend/server.js:109` và stack trace thư viện.

## Evidence

![FR04 failed tests](../../../test-runs/api/images/FR04_failed_tests_detail.png)

## Tác động

Client không xử lý được schema lỗi thống nhất; thông tin đường dẫn và cấu trúc backend bị lộ, hỗ trợ kẻ tấn công do thám hệ thống.

## Đề xuất

Chặn Content-Type không được hỗ trợ trước handler, kiểm tra `req.body`, dùng error middleware trả JSON và tắt stack trace ở response production.

## GitHub Issue

https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/333
