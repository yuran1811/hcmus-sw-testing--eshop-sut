# Usability Evaluation Report — SV 23127152

## Phạm vi

- Flow: **U-01** — Login → Profile → cập nhật hồ sơ (FR-02, FR-04)
- Index: [`../usability/U-01-login-profile/README.md`](../usability/U-01-login-profile/README.md)
- Nguồn phiên: [`Survey-23127152.xlsx`](../usability/U-01-login-profile/01-plan/Survey-23127152.xlsx) (P01–P07)

| Phase | Path | Trạng thái |
|-------|------|------------|
| 1 — Plan | `../usability/U-01-login-profile/01-plan/` | **Done** |
| 2 — Conduct | `../usability/U-01-login-profile/02-conduct/` | **Done** (P01–P07); P00 không có phiếu |
| 3 — Analyse | `../usability/U-01-login-profile/03-analyse/` | **Done** |

## Phase 1 — Plan (tóm tắt)

| Hạng mục | Nội dung |
|----------|----------|
| Objectives | (1) Login+Profile unassisted? (2) Tìm được chỗ sửa SĐT/địa chỉ? (3) Tin hồ sơ đã lưu? |
| Scenario | Goal-oriented: cập nhật SĐT + địa chỉ trước khi mua |
| Timebox | 5 phút |
| Instrument | SUS + probes Clarity / Error recovery / Speed / Trust |
| Recruitment | 7 chính đã điền tracker; pilot thiếu phiếu |

Chi tiết: [`test-plan.md`](../usability/U-01-login-profile/01-plan/test-plan.md), [`instruments.md`](../usability/U-01-login-profile/01-plan/instruments.md), [`recruitment-tracker.md`](../usability/U-01-login-profile/01-plan/recruitment-tracker.md).

## Phase 2 — Conduct

| Session | Outcome | SUS | Ghi chú |
|---------|---------|-----|---------|
| P00 pilot | Không có dữ liệu | — | Sheet P00 trống / không có trong Survey-23127152 |
| P01 | FAIL | 67.5 | SĐT false-reject; ~2 phút |
| P02 | SUCCESS_UNASSISTED | 67.5 | Extra: cần fix bug SĐT |
| P03 | FAIL | 72.5 | Không lưu được → Trust thấp |
| P04 | FAIL | 40.0 | Khó tìm Profile + SĐT |
| P05 | SUCCESS_UNASSISTED | 97.5 | Outlier tích cực |
| P06 | FAIL | 50.0 | Không thấy nút Hồ sơ + không lưu SĐT |
| P07 | FAIL | 47.5 | Validate muộn; lỗi dù tin đúng input |

Session logs: `../usability/U-01-login-profile/02-conduct/participants/`.

## Phase 3 — Analyse

| Metric | Giá trị |
|--------|---------|
| Completion unassisted | **2/7 (28.6%)** |
| Completion overall | **2/7 (28.6%)** |
| FAIL rate | **5/7 (71.4%)** |
| SUS mean / median | **63.2 / 67.5** |

### Findings (severity)

| ID | Vấn đề | Sev | Freq | Bug liên quan |
|----|--------|-----|------|---------------|
| F-01 | Validation SĐT chặn lưu (false reject / message lệch) | 4 | 6/7 | BUG-PROFILE-003 |
| F-02 | Không có CTA Hồ sơ rõ — phải hover greeting | 3 | 2/7 | — |
| F-03 | SĐT nhận text; chỉ check lúc submit | 2 | 1/7+ | — |
| F-04 | Không tin đã lưu / thiếu tín hiệu + privacy | 3 | 5/7 | BUG-PROFILE-004 (liên quan) |
| F-05 | Cảm nhận thiếu nhất quán (SUS item 6) | 2 | 4/7 tín hiệu | BUG-LOGIN-\* |

Chi tiết: [`aggregate-results.md`](../usability/U-01-login-profile/03-analyse/aggregate-results.md), [`findings-report.md`](../usability/U-01-login-profile/03-analyse/findings-report.md).

## Kết luận ngắn

Flow U-01 **chưa đạt** mục tiêu effectiveness: đa số người tham gia không cập nhật hồ sơ thành công vì **SĐT**. Cần sửa F-01 trước, thêm CTA Profile (F-02), rồi re-test.

## Việc còn lại (ngoài phân tích)

1. (Tuỳ chọn) Bổ sung phiếu / ghi chú pilot P00 nếu TA yêu cầu đủ 8 người có log  
2. Gắn evidence recording vào `02-conduct/evidence/` nếu có file/link Drive  
3. Mở/ cập nhật GitHub Issues cho F-01/F-02 nếu chưa khớp bug hiện có  
