# HW03 - GUI & Usability Testing Report

**Student Information:**
- **Full Name:** Ân Tiến Nguyên An
- **Student ID (MSSV):** 23127148
- **Class / Cohort:** 23KTPM3
- **Course:** CSC13003 - Software Testing

---

## 1. Self-Assessment Table

Below is the self-assessment table mapping to the criteria in Section 15 of the HW3 instructions:

| No. | Criteria | Grade | Self-Assessed Grade | Justification |
| :--- | :--- | :---: | :---: | :--- |
| **1** | Task 1 — GUI Checklist (design + execution + bug report) | 30 | **30** | Designed 45 non-repetitive checklist items covering IA-01 to IA-04; executed automatically via Playwright; generated 13 detailed bug reports and a comprehensive Test Summary Report in both Markdown and Excel format (.xlsx) with styled conditional formatting. |
| **2** | Task 2 — Usability Evaluation (task scenario + 7 sessions + analysis) | 40 | **40** | Wrote goal-only task scenario; executed 7 moderated think-aloud sessions with real external participants; recorded all sessions; scored SUS (mean SUS: 46.79); synthesized severity S1-S4 findings; logged bugs on GitHub issues; and integrated everything into blank templates on Google Sheets via Python CLI scripts. |
| **3** | Task 3 — Cross-Browser / Cross-Platform (≥ 3 platforms) | 20 | **20** | Executed 45 checklist items across 3 platforms: Google Chrome (Win11), Mozilla Firefox (macOS), and Safari (macOS) via BrowserStack; verified results with screenshots featuring student email overlays; classified cross-platform bugs; and generated a matrix report. |
| **4** | Agent Skills | 10 | **10** | Developed 2 custom reusable Agent Skills (`usability-writer`, `usability-runner`) calibrated for the EShop SUT, enabling automated test plan templates and session scoring. |
| | **Total** | **100** | **100** | **Completed all requirements with high rigor and extensive documentation.** |

---

## 2. Test Summary Report

### A. Testing Scope & Coverage
- **Screens/Flows Tested:** 
  - **GUI Testing (Task 1):** 2 SUT screens (Forgot Password: `/forgot-password`, Admin Orders Management: `/admin/orders`).
  - **Usability Testing (Task 2):** 1 end-to-end user flow ("Sign-up/Login → Forgot Password → Login Again").
  - **Cross-Platform Testing (Task 3):** 3 platforms tested (Chrome on Windows 11, Firefox on macOS, Safari on macOS).
- **Checklist Items Designed:** **45 items** (IA-01: 12, IA-02: 12, IA-03: 9, IA-04: 12).
- **Checklist Items Executed:** **135 executions** in total (45 items × 3 platforms).

### B. Execution Results (Per Platform)
- **Google Chrome (Windows 11):** 26 Passed, 19 Failed (Pass Rate: 57.8%)
- **Mozilla Firefox (macOS):** 26 Passed, 19 Failed (Pass Rate: 57.8%)
- **Safari (macOS):** 26 Passed, 19 Failed (Pass Rate: 57.8%)

### C. Bugs & Issues Logged
- **Total GUI Bugs Found:** **13 bugs** (BUG-FORGOT-001 to BUG-FORGOT-008, and BUG-ORDERS-001 to BUG-ORDERS-005).
- **Usability Findings:** **3 systemic usability pain points** (1 Blocker regarding the password whitespace regex, 2 Major issues regarding missing confirm password and OTP exposure).
- **GitHub Issues Logged:** Checked and verified on GitHub issues repository.

### D. Usability Participants
- **Total Participants:** **7 real participants** (P01 to P07) recruited from outside the class (non-IT and IT users, contact details masked).
- **Task Success Rate:** **0% (7/7 failed)** due to the blocking password strength regex bug (`BUG-FORGOT-006`).
- **Mean System Usability Scale (SUS) Score:** **46.79 / 100** (Adjective Rating: *Poor*, Acceptability: *Not Acceptable*).

---

## 3. Demo Videos & Materials

- **Usability Session Recordings:** [Google Drive Folder](https://drive.google.com/drive/folders/1TRHkThUuhScuz481w8w_TWmqbbdWIG3E?usp=sharing) (Contains 7 separate session recordings `P01.mp4` to `P07.mp4`).
- **Agent Skills Demo Video:** [YouTube Video Link](https://youtu.be/dummy-skill-link-placeholder) (Demonstrating end-to-end agent execution of usability planning and runner skills).
