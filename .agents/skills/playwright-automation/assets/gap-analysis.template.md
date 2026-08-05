# Gap Analysis — Rà soát script do AI sinh

**Tính năng:** FR-XX — <tên tính năng>
**Công cụ AI:** <tên + phiên bản>
**Người rà soát:** <họ tên> — <MSSV>
**Ngày rà soát:** <ISO date>

---

## 1. Tổng quan

| Chỉ số | Số lượng |
|---|---|
| Test case đưa vào | |
| Script AI sinh ra ở lượt đầu | |
| Số lỗi phát hiện khi rà soát | |
| Số lỗi phải sửa thủ công | |
| Ca không tự động hoá được | |

---

## 2. Chi tiết từng lỗi

### Lỗi #1 — <tiêu đề ngắn gọn mô tả lỗi>

**Phân loại:** Locator giòn / Assertion yếu / Chờ cứng / Hardcode data / Thiếu ca biên / Khác

**Bằng chứng** — `<đường dẫn file>:<dòng>`

```typescript
// Code AI sinh ra
```

**Nguyên nhân**
Loại: `Chất lượng prompt` / `Giới hạn mô hình` / `Đặc thù tính năng`

<Giải thích cụ thể vì sao AI mắc lỗi này. Tránh câu chung chung — nêu chính xác thông tin nào AI thiếu và vì sao nó thiếu.>

**Cách sửa**

```typescript
// Code sau khi sửa
```

<Giải thích vì sao phiên bản mới ổn định hơn — dựa trên cơ chế, không chỉ nói "tốt hơn".>

---

### Lỗi #2 — <...>

<lặp lại khuôn trên>

---

## 3. Ca không tự động hoá được

| TC-ID | Lý do không tự động hoá | Hướng xử lý thay thế |
|---|---|---|
| | | |

---

## 4. Bug thật phát hiện qua automation

Chỉ liệt kê ca mà **script đúng nhưng SUT sai** — không tính lỗi script.

| TC-ID | Mô tả bug | Trình duyệt | GitHub Issue | Ảnh chụp |
|---|---|---|---|---|
| | | | #<số> | |

---

## 5. Nguyên tắc rút ra khi cộng tác với AI

<Nêu 2–3 nguyên tắc cụ thể, kiểm chứng được từ chính trải nghiệm trong bài này. Mỗi nguyên tắc gắn với một lỗi đã nêu ở mục 2 — tránh khẩu hiệu chung chung.>
