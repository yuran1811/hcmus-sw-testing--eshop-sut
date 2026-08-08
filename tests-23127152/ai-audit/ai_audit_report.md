# AI Audit Report — HW03 SV 23127152

## Khai báo

- [x] I use AI tools for the following tasks

---

**AI Audit Report Item**

- **Công cụ AI:** Cursor (Composer / Agent) + skill `gui-checklist-builder`
- **Thời gian:** 2026-08-01 ~00:20–00:40 (UTC+7)
- **Nội dung prompt:**
  > execute task 1 trong plan — GUI checklist Login + Profile (design 4-pass + execute + bugs)
- **AI output:**
  > - `checklist/login/checklist_login.md` (33 item, IA-01…IA-04, critical review)
  > - `checklist/profile/checklist_profile.md` (32 item)
  > - Execute `test-runs/execute-task1.mjs` (Playwright Chromium)
  > - Bug reports BUG-LOGIN-001…011, BUG-PROFILE-001…010 (+ screenshots)
  > - `test-runs/sprint-1-gui-execution.md`, `submission/gui_checklist_report.md`
- **Human review:** Đối chiếu Pass/Fail trên SUT; bổ sung item AI miss (WPI/NLU/MBS); giữ screenshots Failed.

---

**AI Audit Report Item**

- **Công cụ AI:** Cursor (Composer / Agent) + skill `usability-evaluation-builder`
- **Thời gian:** 2026-08-01 ~00:34 (UTC+7)
- **Nội dung prompt:**
  > tiến hành task 2 — usability evaluation U-01 Login → Profile (Phase 1)
- **AI output:**
  > - `01-plan/test-plan.md` — objectives, scenario goal-oriented, start/success/failure
  > - `01-plan/instruments.md` — SUS + probes Clarity / Error recovery / Speed / Trust
  > - `01-plan/recruitment-tracker.md` + template session P00–P07
  > - Phase 2–3: **không** fabricate participants/session
- **Human review:** Tuyển người thật, chạy phiên, điền survey.

---

**AI Audit Report Item**

- **Công cụ AI:** Cursor (Composer / Agent) + skill `cross-platform-testing-tracker`
- **Thời gian:** 2026-08-01 ~12:08–13:34 (UTC+7)
- **Nội dung prompt:**
  > thực hiện task 3 — cross-browser Login/Profile, screenshot có watermark identity
- **AI output:**
  > - Script capture headed + OS window (`execute-task3-real.mjs`)
  > - Watermark `23127152@hcmus.edu.vn`
  > - `cross-platform/platform-matrix.md` + 28 ảnh evidence (tab + URL `localhost:5173`)
  > - COM-01 Login/Profile Passed; fail chung LOGIN-VIS-02 / LOGIN-FUN-03 → bug Task 1
- **Human review:** Cấp Screen Recording; xác nhận ảnh thấy browser chrome + URL + watermark.

---

**AI Audit Report Item**

- **Công cụ AI:** Cursor (Composer / Agent)
- **Thời gian:** 2026-08-02 (UTC+7)
- **Nội dung prompt:**
  > hoàn thiện Task 2 từ Survey-23127152.xlsx (P01–P07) → session logs + aggregate + findings
- **AI output:**
  > - Điền recruitment-tracker, P01…P07 từ survey (SUS + probes)
  > - `03-analyse/aggregate-results.md`, `findings-report.md` (F-01…F-05)
  > - `submission/usability_evaluation_report.md`
- **Human review:** Xác nhận dữ liệu survey là người thật; không bịa timeline recording.

---

**AI Audit Report Item**

- **Công cụ AI:** Cursor (Composer / Agent) + skill `bug-reporting` / `gh`
- **Thời gian:** 2026-08-02 (UTC+7)
- **Nội dung prompt:**
  > hoàn thành Task 1 còn thiếu — Excel checklist + GitHub Issues
- **AI output:**
  > - `submission/checklist_and_test_summary.xlsx` (65 rows + summary + bugs)
  > - Tạo Issues #137–#156 trên repo; map trong `bug-reports/github-issues-created.md`
- **Human review:** Kiểm tra Issue URL; đính ảnh trên UI nếu cần sau khi push.

---

**AI Audit Report Item**

- **Công cụ AI:** Cursor (Composer / Agent)
- **Thời gian:** 2026-08-02 (UTC+7)
- **Nội dung prompt:**
  > tạo folder submission đúng deliverables đề HW03 (Markdown+PDF, Excel, evidence, README, zip)
- **AI output:**
  > - Đóng gói submission Moodle-ready + AI Critique + commit_log + zip
- **Human review:** SV kiểm tra đủ 9 hạng mục zip; điền self-assessed grade; thêm link demo video nếu có.
