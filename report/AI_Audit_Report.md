# AI Audit Report

## Audit Entries

### Entry 1 — State Transition Testing cho FR-02: Đăng nhập & Khóa tài khoản

| Field                      | Value                                                                                                                                                                                                                        |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **AI Tool**                | Antigravity AI Agent                                                                                                                                                                                                         |
| **Date/Time**              | 2026-07-06T15:44:00+07:00                                                                                                                                                                                                    |
| **Task**                   | State Transition test case design & execution for FR-02 (Authentication & Account Locking)                                                                                                                                   |
| **Output Summary**         | Executed 10 STT TCs against live SUT: 3 Pass, 6 Fail, 1 Blocked. Logged 3 critical bugs (`BUG-AUTH-001`, `BUG-AUTH-002`, `BUG-AUTH-003`).                                                                                    |
| **Human Review Required**  | Yes — review bug reports and test run results                                                                                                                                                                                |
| **Files Created/Modified** | `tests/test-runs/AUTH-test-run.md`<br>`tests/bug-reports/auth/BUG-AUTH-001.md`<br>`tests/bug-reports/auth/BUG-AUTH-002.md`<br>`tests/bug-reports/auth/BUG-AUTH-003.md`<br>`tests/test-cases/auth/TC-AUTH-STT-01.md`..`10.md` |

### Entry 2 — Use Case Testing cho FR-04: Quản lý hồ sơ cá nhân

| Field                      | Value                                                                                                                                                                                                                   |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **AI Tool**                | Antigravity AI Agent                                                                                                                                                                                                    |
| **Date/Time**              | 2026-07-06T15:55:00+07:00                                                                                                                                                                                               |
| **Task**                   | Use Case test case design & execution for FR-04 (User Profile Management)                                                                                                                                               |
| **Output Summary**         | Executed 7 UCT TCs against live SUT: 3 Pass, 4 Fail. Logged 2 bugs: `BUG-PROFILE-001` (Critical Privilege Escalation) and `BUG-PROFILE-002` (Major missing phone validation).                                           |
| **Human Review Required**  | Yes — review bug reports and test run results                                                                                                                                                                           |
| **Files Created/Modified** | `tests/test-design/Use_Case_Testing.md`<br>`tests/test-runs/PROFILE-test-run.md`<br>`tests/bug-reports/profile/BUG-PROFILE-001.md`<br>`tests/bug-reports/profile/BUG-PROFILE-002.md`<br>`tests/test-cases/profile/*.md` |
