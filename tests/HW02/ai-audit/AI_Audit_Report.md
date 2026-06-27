# AI Audit Report — HW02 Domain Testing

## Declaration

"I use AI tools for the following tasks in this exercise."

**Tool used:** Claude Code (claude-sonnet-4-6) via CLI  
**Session date:** 2026-06-27  

---

## Interaction Log

### Session 1 — Codebase Exploration & Planning

**Date/Time:** 2026-06-27  
**AI Tool:** Claude Code (claude-sonnet-4-6)

**Prompt 1 — FR-02 Exploration:**
> "Explore the EShop SUT codebase at [...] to understand FR-02: Login and Account Lockout feature. Find and report: 1. The overall project structure 2. All files related to login/authentication/account lockout logic 3. The login form fields and validation rules 4. Account lockout logic: how many failed attempts before lockout, lockout duration, how lockout is reset 5. Any constants or config values for login 6. Database schema for users 7. API endpoints for login 8. Any existing tests for login"

**AI Output — FR-02:**
- Xác định project structure (backend Node.js, frontend-web React, frontend-admin React, frontend-mobile React Native)
- Phát hiện `Login.jsx:40` dùng `type="text"` cho password (BUG-03)
- Phát hiện `Login.jsx:30` dùng `type="text"` cho email (BUG-04)
- Phát hiện `server.js:54` tăng attempts `+2` thay vì `+1` (BUG-01)
- Phát hiện `server.js:57` lockout 180000ms thay vì 30000ms (BUG-02)
- Phát hiện plaintext password storage (BUG-05)
- Tìm ra DB schema, seeded test users, API endpoints

---

**Prompt 2 — FR-10 & FR-18 Exploration:**
> "Explore the EShop SUT codebase to understand FR-10: Order State Machine and FR-18: Order Management (Admin). Find and report: 1. All order-related files 2. Order states/statuses 3. State machine logic 4. Admin endpoints 5. Database schema 6. Business rules 7. Input validation rules 8. State constants/enums"

**AI Output — FR-10 & FR-18:**
- Xác định 5 trạng thái: pending, confirmed, shipping, delivered, canceled
- Map đầy đủ valid/invalid transitions từ `server.js:525-568`
- Phát hiện `server.js:550-551` cho phép `canceled → delivered` (BUG-06)
- Phát hiện `server.js:329` thiếu check shipping trong user cancel (BUG-07)
- Phát hiện `App.jsx:801-803` dùng `dangerouslySetInnerHTML` (BUG-08)
- Phát hiện `App.jsx:218` revenue `* 2` (BUG-09)
- Liệt kê đầy đủ API endpoints và admin UI behavior

---

**Prompt 3 — Mobile Exploration:**
> "Explore the EShop SUT codebase to understand the Mobile app and Order History feature (Pool D). Find and report: 1. Mobile app folder structure - framework 2. Order history files 3. Data displayed 4. Filtering/sorting/pagination 5. API endpoints consumed 6. Input fields 7. Validation rules 8. Shared backend API endpoints"

**AI Output — Mobile:**
- Xác định React Native + Expo, monolithic `App.js` ~1300 lines
- Map toàn bộ order history rendering (`App.js:893-976`)
- Phát hiện `App.js:16` hardcoded API_URL (BUG-13)
- Xác định cancel button visibility logic (pending/confirmed only)
- Phát hiện inconsistency giữa UI (ẩn khi shipping) và backend (allow cancel shipping) → BUG-11
- Xác nhận không có filter/sort/pagination (BUG-12)

---

### Session 2 — Planning

**Prompt:**
> "4 tính năng tôi cần làm là FR-02, FR-10, FR-18 và Mobile Order History. Hãy lên kế hoạch chi tiết và chính xác giúp tôi hoàn thiện bài tập testing 2 với 4 features này."

**AI Output:**
- Lập kế hoạch đầy đủ với Bước 0 (setup) + 4 features
- Thiết kế phân vùng tương đương cho mỗi feature
- Thiết kế test case matrix
- Lên danh sách bugs, deliverables checklist, thứ tự thực hiện
- Viết plan file tại `/Users/tuananhnguyen/.claude/plans/...`

---

### Session 3 — Report Writing

**Prompt:**
> [Thực thi plan: viết các file báo cáo DomainTesting.md, BVA.md, bug reports cho 4 features]

**AI Output:**
- Tạo 8 file báo cáo (DomainTesting + BVA cho 4 features)
- Tạo 13 bug reports (BUG-01 đến BUG-13)
- Tạo AI Audit Report và AI Critique
- Tạo README.md tổng hợp

---

## Human Review Notes

Sau khi AI tạo các báo cáo, tôi đã review và điều chỉnh:

1. **Xác nhận bugs từ code**: Tất cả bugs AI phát hiện đều được verify bằng cách đọc source code trực tiếp
2. **Bổ sung test cases**: Thêm TC kiểm tra case-sensitivity email (AI bỏ sót)
3. **Điều chỉnh Expected**: Một số TC AI dùng spec nhưng thực tế impl khác → cập nhật cột "Actual"
4. **AI Gap Analysis**: Viết phần AI gap analysis dựa trên review thực tế

---

## Summary

| Metric | Value |
|--------|-------|
| AI Tool | Claude Code (claude-sonnet-4-6) |
| Sessions | 3 |
| Bugs phát hiện qua AI | 13 |
| Bugs confirm sau human review | 13 (tất cả được xác nhận) |
| Test cases thiết kế | ~90 |
| Test cases bổ sung thủ công | ~10 |
