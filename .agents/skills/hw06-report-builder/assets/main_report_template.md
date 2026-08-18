# Báo cáo chính — HW06 Kiểm thử API

## 1. Giới thiệu
- SUT: EShop (https://github.com/ttbhanh/eshop-sut)
- 3 API đã chọn và lý do chọn (1 API/pool)

---

## 2. API 1 — <Tên API, FR-xx, Pool A>

### 2.1 Sinh test case bằng AI
- Công cụ AI dùng: ...
- Tóm tắt 4 vòng đã thực hiện (Domain Partition / State Transition / Security / Schema Validation)
- Tổng số test case sinh ra: ...
- (Chi tiết đầy đủ prompt/output → xem AI Audit Report)

### 2.2 Kiểm toán (Audit)
- Thống kê VALID / INVALID / INCOMPLETE
- Ví dụ tiêu biểu mỗi loại + lý giải

### 2.3 Mở rộng (Extend)
- Danh sách ≥5 test case tự bổ sung + lý do AI bỏ sót

### 2.4 Thực thi (Execute)
- Công cụ: Postman + Newman
- Kết quả: <pass>/<tổng>
- Link báo cáo HTML Newman

### 2.5 Báo cáo lỗi
- Bảng bug tìm được (xem chi tiết mục Bug Reports)

---

## 3. API 2 — <Tên API, FR-xx, Pool B>
(Cấu trúc tương tự mục 2)

---

## 4. API 3 — <Tên API, FR-xx, Pool C>
(Cấu trúc tương tự mục 2)

---

## 5. Tính năng Postman đã sử dụng
<Bảng từ postman_features_used_template.md>

---

## 6. CI/CD
<Nội dung từ cicd_report_template.md>

---

## 7. Thiết kế bộ sinh test AI-driven (Agent Skill)
### 7.1 Sơ đồ (tự vẽ)
<Chèn ảnh sơ đồ tự vẽ ở đây>

### 7.2 Pseudocode
```
<pseudocode>
```

### 7.3 (Nếu triển khai thành Agent Skill) Video demo
<link YouTube>

---

## 8. Bug Reports tổng hợp
| Bug ID | API | Severity | Mô tả | Link Issue | AI phát hiện? |
|---|---|---|---|---|---|

---

## 9. Nhận xét, phê bình AI (AI Critique) — 200-300 từ
<Tự viết, dựa trên câu hỏi gợi ý: AI đã sai ở đâu? có thiên vị/chưa đầy đủ ở điểm nào? tại sao không phát hiện ra? bài học rút ra khi cộng tác với AI?>

---

## Phụ lục — AI Audit Report
<Xem file ai_audit_report.md riêng, hoặc chèn trực tiếp vào đây>
