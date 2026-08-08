# Sprint 2 / Task 3 — Cross-Browser (cross-browser)

## 1. Thông tin lần chạy

| Trường | Giá trị |
|--------|---------|
| **Run ID** | RUN-23127152-TASK3-REAL |
| **Ngày chạy** | 2026-08-01 |
| **Người thực thi** | Cursor Agent — Google cross-browser/Nightly headed |
| **Loại test** | Cross-browser / platform-sensitive checklist items |
| **Nhánh** | `hw3/23127152` |
| **Kết quả Chrome/Firefox** | ✅ Hoàn tất — 12/14 Passed mỗi engine; 2 Failed (defect chung) |

## 2. Phạm vi

14 item platform-sensitive từ Login + Profile (COM / VIS / RES / FUN mật khẩu):

Xem [`../cross-platform/platform-matrix.md`](../cross-platform/platform-matrix.md).

## 3. Môi trường

| Platform | Tool | OS |
|----------|------|-----|
| Google Chrome (real) | Headed + OS window `screencapture -l` | Darwin 25.5.0 |
| Firefox (Playwright Nightly build) | Headed + OS window `screencapture -l` | Darwin 25.5.0 |

- SUT: http://localhost:5173/
- Watermark: `23127152@hcmus.edu.vn`
- Mỗi ảnh thấy **tab + thanh URL** (`localhost:5173/...`) trong khung cửa sổ browser

## 4. Kết quả

| Engine | Passed | Failed | Pass rate |
|--------|--------|--------|-----------|
| Chrome | 12 | 2 | 86% |
| Firefox | 12 | 2 | 86% |

Failed cả 2 engine (không phải bug riêng platform):

- LOGIN-VIS-02 → BUG-LOGIN-001
- LOGIN-FUN-03 → BUG-LOGIN-005

COM-01 Login/Profile: **Passed** trên cả Chrome và Firefox.

## 5. Bằng chứng

- 28 ảnh watermarked (cửa sổ thật): `../cross-platform/screenshots/`
- Raw: `../cross-platform/screenshots/_raw_real/`
- JSON: `task3-results-real.json`
- Script: `execute-task3-real.mjs` + `macos_window_capture.py`
