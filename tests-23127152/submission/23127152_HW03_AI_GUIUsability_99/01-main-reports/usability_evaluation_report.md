# Main Report — Usability Evaluation (Task 2)

**SV:** 23127152 · **Flow:** U-01 — Login → Profile → cập nhật hồ sơ (FR-02, FR-04)  
**Evidence đầy đủ:** `../06-usability-evidence/`

## 1. Phase 1 — Plan

| Hạng mục | Nội dung |
|----------|----------|
| Objectives | (1) Unassisted login→profile? (2) Tìm chỗ sửa SĐT/địa chỉ? (3) Tin hồ sơ đã lưu? |
| Scenario | Goal-oriented: cập nhật SĐT + địa chỉ trước khi mua (không liệt kê click) |
| Timebox | 5 phút |
| Instrument | SUS (10) + probes Clarity / Error recovery / Speed / Trust |
| Participants | 7 chính (P01–P07) — `01-plan/recruitment-tracker.md` (SĐT đã che) |

Chi tiết: `../06-usability-evidence/01-plan/test-plan.md`, `instruments.md`.  
Phiếu raw: `Survey-23127152.xlsx`.

## 2. Phase 2 — Conduct

| Session | Outcome | SUS |
|---------|---------|-----|
| P01 | FAIL | 67.5 |
| P02 | SUCCESS_UNASSISTED | 67.5 |
| P03 | FAIL | 72.5 |
| P04 | FAIL | 40.0 |
| P05 | SUCCESS_UNASSISTED | 97.5 |
| P06 | FAIL | 50.0 |
| P07 | FAIL | 47.5 |

Session logs: `../06-usability-evidence/02-conduct/participants/`.

## 3. Phase 3 — Analyse

| Metric | Giá trị |
|--------|---------|
| Completion unassisted | 2/7 (28.6%) |
| FAIL | 5/7 (71.4%) |
| SUS mean / median | 63.2 / 67.5 |

### Findings (severity)

| ID | Vấn đề | Sev | Freq | Bug |
|----|--------|-----|------|-----|
| F-01 | Validation SĐT chặn lưu (false reject / message lệch) | 4 | 6/7 | BUG-PROFILE-003 |
| F-02 | Không có CTA Hồ sơ rõ — phải hover greeting | 3 | 2/7 | — |
| F-03 | SĐT nhận text; chỉ check lúc submit | 2 | 1/7+ | — |
| F-04 | Không tin đã lưu / thiếu tín hiệu tin cậy | 3 | 5/7 | BUG-PROFILE-004 |
| F-05 | Cảm nhận thiếu nhất quán (SUS item 6) | 2 | 4/7 | BUG-LOGIN-\* |

Chi tiết: `../06-usability-evidence/03-analyse/findings-report.md`.

## 4. Kết luận

Flow U-01 chưa đạt effectiveness mong muốn: đa số phiên không cập nhật hồ sơ thành công vì **F-01**. Cần sửa validation SĐT (khớp FR-04) và CTA Profile trước khi re-test.
