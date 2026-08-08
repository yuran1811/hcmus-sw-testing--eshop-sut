# U-01 — Login → Profile → cập nhật hồ sơ

| Trường | Giá trị |
|--------|---------|
| Flow ID | U-01 |
| FR | FR-02, FR-04 |
| SUT | http://localhost:5173 |
| Timebox | 5 phút |
| Instrument | SUS |
| Phase 1 | **Done** (2026-08-01) |
| Phase 2 | **Done** — P01–P07 từ `Survey-23127152.xlsx`; P00 không có phiếu |
| Phase 3 | **Done** — aggregate + findings (F-01…F-05) |

## Bản đồ thư mục

| Phase | Thư mục | Nội dung |
|-------|---------|----------|
| **1 — Plan** | [01-plan/](./01-plan/) | [test-plan.md](./01-plan/test-plan.md) · [instruments.md](./01-plan/instruments.md) · [recruitment-tracker.md](./01-plan/recruitment-tracker.md) · [Survey-23127152.xlsx](./01-plan/Survey-23127152.xlsx) |
| **2 — Conduct** | [02-conduct/](./02-conduct/) | [pilot/P00.md](./02-conduct/pilot/P00.md) · [participants/](./02-conduct/participants/) · [evidence/](./02-conduct/evidence/) |
| **3 — Analyse** | [03-analyse/](./03-analyse/) | [aggregate-results.md](./03-analyse/aggregate-results.md) · [findings-report.md](./03-analyse/findings-report.md) |

## Kết quả nhanh

- Completion unassisted: **2/7**
- SUS mean / median: **63.2 / 67.5**
- Finding P0: **F-01** validation SĐT (severity 4) → BUG-PROFILE-003

## Quy tắc chống gian lận

- Không AI-generate danh sách participants hay câu trả lời SUS/probes.
- Dữ liệu phiên lấy từ survey người thật; timeline tái cấu trúc từ probes (ghi rõ trong từng P0x).
