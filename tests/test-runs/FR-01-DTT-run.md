# Test Run: FR-01 — Đăng ký tài khoản (DTT)

**Ngày chạy:** 2026-06-29  
**Kỹ thuật:** Decision Table Testing  
**Công cụ:** Playwright v1.61.1 + Chromium  
**Môi trường:** localhost:5173 (frontend) · localhost:3000 (backend)  
**Tổng test cases:** 12 | **Pass:** 1 | **Fail:** 11

---

## Kết quả chi tiết

| TC | Conditions | Expected | Actual | Status | Root bugs |
|----|-----------|----------|--------|--------|-----------|
| TC01 | C1=T C2=T C3=T C4=T | E1: Redirect /login | Ở lại /register, hiện "Mật khẩu quá yếu" | **FAIL** | BUG-03 |
| TC02 | C1=T C2=T C3=T C4=F | E5: Lỗi xác nhận không khớp | Hiện "Mật khẩu quá yếu" (E4), không có E5 | **FAIL** | BUG-03, BUG-04 |
| TC03 | C1=T C2=T C3=F C4=T | E4: Lỗi mật khẩu yếu | E4 hiện đúng | **PASS** | — |
| TC04 | C1=T C2=T C3=F C4=F | E4 + E5 | Chỉ hiện E4, không có E5 | **FAIL** | BUG-04 |
| TC05 | C1=T C2=F C3=T C4=T | E3: Lỗi email đã tồn tại | Hiện E4 (BUG-03 chặn trước), không có E3 | **FAIL** | BUG-02, BUG-03 |
| TC06 | C1=T C2=F C3=T C4=F | E3 + E5 | Chỉ hiện E4, không có E3/E5 | **FAIL** | BUG-02, BUG-03, BUG-04 |
| TC07 | C1=T C2=F C3=F C4=T | E3 + E4 | Chỉ hiện E4, không có E3 | **FAIL** | BUG-02 |
| TC08 | C1=T C2=F C3=F C4=F | E3 + E4 + E5 | Chỉ hiện E4, không có E3/E5 | **FAIL** | BUG-02, BUG-04 |
| TC09 | C1=F C2=– C3=T C4=T | E2: Lỗi email không hợp lệ | Hiện E4 (BUG-03), không có E2 | **FAIL** | BUG-01, BUG-03 |
| TC10 | C1=F C2=– C3=T C4=F | E2 + E5 | Chỉ hiện E4, không có E2/E5 | **FAIL** | BUG-01, BUG-03, BUG-04 |
| TC11 | C1=F C2=– C3=F C4=T | E2 + E4 | Chỉ hiện E4, không có E2 | **FAIL** | BUG-01 |
| TC12 | C1=F C2=– C3=F C4=F | E2 + E4 + E5 | Chỉ hiện E4, không có E2/E5 | **FAIL** | BUG-01, BUG-04 |

---

## Quan sát bổ sung trong quá trình chạy

- **BUG-02 confirmed via API:** `POST /api/register` với cùng email 2 lần → cả 2 trả về `200 OK` với id khác nhau (id 14, id 15). Không có bất kỳ error response nào.
- **Validation order:** Frontend chỉ validate password (dòng 15–20 trong Register.jsx) trước khi submit form. Email và confirm password không được kiểm tra. Điều này khiến BUG-03 che khuất BUG-01, BUG-02.
- **TC03 pass nhưng vì lý do sai:** "abc123" bị từ chối vì thiếu whitespace (flawed regex), không phải vì thiếu ký tự đặc biệt. Kết quả đúng nhưng implementation sai.

---

## Bugs tìm thấy

| Bug ID | Mô tả ngắn | Severity | TC phát hiện |
|--------|-----------|----------|-------------|
| BUG-01 | Email format không được validate | High | TC09, TC11 |
| BUG-02 | Email không có UNIQUE constraint — duplicate registration allowed | High | TC05, TC07 + API test |
| BUG-03 | Password regex dùng `\s` thay vì ký tự đặc biệt | High | TC01 |
| BUG-04 | Trường xác nhận mật khẩu thiếu hoàn toàn | High | TC02, TC04 |
| BUG-05 | Backend không có validation — API có thể bypass mọi kiểm tra frontend | Critical | API direct test |

*Chi tiết từng bug: [../bug-reports/FR-01-bug-reports.md](../bug-reports/FR-01-bug-reports.md)*
