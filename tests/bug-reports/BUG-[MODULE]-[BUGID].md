---
name: Bug report
about: Create a report to help us improve
title: "[BUG][FEAT] - Describe the bug here"
labels: ""
assignees: ""
---
Mô tả về labels:
- Các labels đề xuất cần gắn bao gồm: `type: bug`, `module: login`, `severity: major`, `priority: P1`, `status: new`, và `found-by: test-case`.
**Hệ thống Labels quản lý test case và bug:**
- **Type:** `type: test-case`, `type: test-run`, `type: bug`, `type: task`
- **Module:** `module: login`, `module: register`, `module: cart`, `module: checkout`, `module: api`
- **Technique:** `technique: EP`, `technique: BVA`, `technique: decision-table`, `technique: state-transition`
- **Result/Status:** `result: pass`, `result: fail`, `result: blocked`, `status: ready for retest`
- **Priority/Severity:** `severity: critical`, `severity: major`, `priority: P0`, `priority: P1`

## Found by Test Case

TC-LOGIN-003

## Requirement liên quan

FR-LOGIN-02

## Severity / Priority

Major / P1

## Environment

Browser, OS, URL, build/commit

## Steps to reproduce

1. Mở trang Login

2. Nhập email hợp lệ

3. Nhập password sai

4. Bấm Login

## Expected result

Không cho đăng nhập và hiển thị lỗi.

## Actual result

Hệ thống vẫn đăng nhập thành công.

## Evidence

Screenshot / video / console log
