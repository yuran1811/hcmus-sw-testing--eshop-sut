# HW02 — Domain Testing & BVA — Test Report

**Student ID:** 23127152  
**Họ tên:** Nguyễn Tuấn Anh  
**Branch:** `ntanh/23127152-HW2`  

---

## Tóm tắt kết quả kiểm thử

### Tổng hợp theo feature

| Feature | Pool | TC Thiết kế | Thực thi | Đạt | Không đạt | Inconclusive | Bugs |
|---------|------|:-----------:|:--------:|:---:|:---------:|:------------:|:----:|
| FR-02: Login & Account Lockout | A | 29 | 29 | 22 | 6 | 1 | 4 |
| FR-10: Order State Machine | B | 21 | 21 | 18 | 3 | 0 | 2 |
| FR-18: Admin Order Management | C | 19 | 19 | 13 | 6 | 0 | 2 |
| Mobile: Order History (FR-20) | D | 19 | 19 | 19 | 0 | 0 | 0 |
| **Tổng** | | **88** | **88** | **72** | **15** | **1** | **8** |

### Tỉ lệ tổng thể

| Chỉ số | Giá trị |
|--------|---------|
| Tỉ lệ thực thi | 100% (88/88) |
| Tỉ lệ đạt | 81.8% (72/88) |
| Tỉ lệ phát hiện lỗi | 9.1% (8/88) |
| Coverage theo DT | 44 TC (50%) |
| Coverage theo BVA | 34 TC (38.6%) |

---

## Danh sách tất cả bug

| Mã lỗi | Feature | Mức độ | Ưu tiên | Mô tả tóm tắt |
|--------|---------|--------|---------|--------------|
| BUG-01 | FR-02 | Cao (Major) | P1 | Khóa tài khoản không tự gỡ sau 30 giây |
| BUG-02 | FR-02 | Cao (Major) | P2 | Input email có `type="text"` thay vì `type="email"` |
| BUG-03 | FR-02 | Nghiêm trọng (Critical) | P0 | Input mật khẩu có `type="text"` — mật khẩu lộ rõ |
| BUG-04 | FR-02 | Trung bình (Minor) | P2 | Thông báo lỗi hiển thị bên dưới nút submit |
| BUG-05 | FR-10 | Cao (Major) | P1 | User hủy được đơn ở trạng thái `shipping` |
| BUG-06 | FR-10 | Cao (Major) | P1 | Admin không thể hủy đơn ở trạng thái `shipping` |
| BUG-07 | FR-18 | Cao (Major) | P1 | User token truy cập được `GET /api/admin/orders` (IDOR) |
| BUG-08 | FR-18 | Nghiêm trọng (Critical) | P0 | Stored XSS qua `shipping_address` trong admin UI |

---

## Self-assessment

### Điểm tự đánh giá

| Hạng mục | Điểm tối đa | Tự chấm | Lý do |
|----------|:-----------:|:-------:|-------|
| FR-02 (Pool A) | 25 | 25 | 29 TC; 4 bug được tìm thấy |
| FR-10 (Pool B) | 25 | 25 | 21 TC; 2 bug được tìm thấy |
| FR-18 (Pool C) | 25 | 25 | 19 TC; 2 bug được tìm thấy |
| Mobile/Pool D | 15 | 15 | 19 TC; không bug mới và hoàn thành các test case |
| Agent Skills | 10 | 10 | Tất cả skill được document và sử dụng; demo video được ghi |
| **Tổng** | **100** | **100** | |

### Điểm mạnh của bài làm

- **Bao phủ toàn diện:** 88 test case cho 4 feature, 100% thực thi — không TC nào bị bỏ qua
- **Phát hiện lỗi bảo mật thực sự:** BUG-07 (IDOR/Broken Access Control) và BUG-08 (Stored XSS) là 2 lỗi bảo mật cấp cao nhất — được phát hiện nhờ áp dụng đúng security test case trong DT + BVA
- **Attack chain được mô tả rõ:** BUG-07 + BUG-08 kết hợp tạo ra attack vector nguy hiểm — được ghi chú trong test-summary/FR18

---

## Cấu trúc thư mục

```
tests/
├── README.md                          ← file này
├── plan.md                            ← execution plan gốc
├── test-cases/
│   ├── FR02_Login/
│   │   ├── DomainTesting.md           (17 TC)
│   │   └── BVA.md                     (12 TC)
│   ├── FR10_OrderState/
│   │   ├── DomainTesting.md           (13 TC)
│   │   └── BVA.md                     (8 TC)
│   ├── FR18_AdminOrder/
│   │   ├── DomainTesting.md           (11 TC)
│   │   └── BVA.md                     (8 TC)
│   └── Mobile_OrderHistory/
│       ├── DomainTesting.md           (13 TC)
│       └── BVA.md                     (6 TC)
├── test-runs/
│   ├── FR02_Login/         (DomainTesting.md + BVA.md + 21 screenshots)
│   ├── FR10_OrderState/    (DomainTesting.md + BVA.md + 26 screenshots)
│   ├── FR18_AdminOrder/    (DomainTesting.md + BVA.md + 19 screenshots)
│   └── Mobile_OrderHistory/(DomainTesting.md + BVA.md + screenshots)
├── test-summary/
│   ├── FR02_Login.md
│   ├── FR10_OrderState.md
│   ├── FR18_AdminOrder.md
│   ├── Mobile_OrderHistory.md
│   └── traceability-matrix.md
├── bug-reports/
│   ├── FR02_Login/    (BUG-01…04)
│   ├── FR10_OrderState/ (BUG-05…06)
│   └── FR18_AdminOrder/ (BUG-07…08)
└── ai-audit/
    ├── AI_Audit_Report.md
    └── AI_Critique.md
```

---

## GitHub Issues

| Bug | Issue | Labels |
|-----|-------|--------|
| BUG-01 | Khóa tài khoản không tự gỡ sau 30 giây | `type:bug` `severity:major` `priority:P1` `module:login` |
| BUG-02 | Input email type=text | `type:bug` `severity:major` `priority:P2` `module:login` |
| BUG-03 | Input password type=text — mật khẩu lộ | `type:bug` `severity:critical` `priority:P0` `module:login` |
| BUG-04 | Thông báo lỗi dưới nút submit | `type:bug` `severity:minor` `priority:P2` `module:login` |
| BUG-05 | User hủy đơn shipping | `type:bug` `severity:major` `priority:P1` `module:order-history` |
| BUG-06 | Admin không hủy được đơn shipping | `type:bug` `severity:major` `priority:P1` `module:admin` |
| BUG-07 | IDOR — user token vào admin API | `type:bug` `severity:major` `priority:P1` `module:admin` |
| BUG-08 | Stored XSS trong admin panel | `type:bug` `severity:critical` `priority:P0` `module:admin` |

---

## Agent Skills

| Skill | File | Mô tả |
|-------|------|-------|
| domain-testing | `.claude/skills/domain-testing` | Hướng dẫn phân vùng tương đương + thiết kế TC |
| boundary-value-analysis | `.claude/skills/bva` | Hướng dẫn BVA 3-điểm mỗi biên |