# AI Audit Report — HW02 Domain Testing & BVA

**Student ID:** 23127152  
**Tool:** Claude Code (claude-sonnet-4-6) — Anthropic  
**Project period:** 2026-06-01 → 2026-06-28  

---

## Tổng quan sử dụng AI

| Hạng mục | Chi tiết |
|----------|---------|
| Công cụ AI chính | Claude Code CLI (`claude-sonnet-4-6`) |
| Tích hợp | Playwright MCP plugin (điều khiển trình duyệt) |
| Số session | ~6 session chính |
| Ngôn ngữ trao đổi | Tiếng Việt + English (lệnh kỹ thuật) |

---

## Nhật ký tương tác theo phase

### PHASE 1 — FR-02: Login & Account Lockout

| # | Ngày | Prompt (tóm tắt) | AI Output | Đánh giá |
|---|------|-----------------|-----------|---------|
| 1 | 2026-06-10 | Thiết kế domain testing cho FR-02: xác định biến, lớp tương đương, 17 test case | `test-cases/FR02_Login/DomainTesting.md` — 17 TC (DT-FR02-01…17) | Đầy đủ, đúng spec |
| 2 | 2026-06-10 | Thiết kế BVA cho FR-02: 4 biên, 3-điểm mỗi biên, 12 test case | `test-cases/FR02_Login/BVA.md` — 12 TC (BVA-FR02-01…12) | Đầy đủ |
| 3 | 2026-06-12 | Thực thi FR-02 qua Playwright MCP: điền form, chụp màn hình, ghi kết quả | `test-runs/FR02_Login/DomainTesting.md` + `BVA.md` + 21 screenshots | Thực thi đúng; phát hiện 4 bug |
| 4 | 2026-06-12 | Viết test summary FR-02 | `test-summary/FR02_Login.md` | Đúng số liệu |
| 5 | 2026-06-12 | Viết 4 bug reports (BUG-01…04) | `bug-reports/FR02_Login/BUG-0[1-4].md` | Đủ template |

### PHASE 2 — FR-10: Order State Machine

| # | Ngày | Prompt (tóm tắt) | AI Output | Đánh giá |
|---|------|-----------------|-----------|---------|
| 6 | 2026-06-14 | Thiết kế domain testing FR-10: state machine, 6 lớp EP, 13 TC | `test-cases/FR10_OrderState/DomainTesting.md` — 13 TC | Chính xác theo spec state machine |
| 7 | 2026-06-14 | Thiết kế BVA FR-10: 3 biên, 8 TC | `test-cases/FR10_OrderState/BVA.md` — 8 TC | Đúng |
| 8 | 2026-06-16 | Thực thi FR-10: admin UI + user UI + API calls qua Playwright | `test-runs/FR10_OrderState/` + screenshots | Phát hiện BUG-05, BUG-06 |
| 9 | 2026-06-16 | Viết summary + 2 bug reports FR-10 | `test-summary/FR10_OrderState.md`, `bug-reports/FR10_OrderState/` | Đúng |

### PHASE 3 — FR-18: Admin Order Management

| # | Ngày | Prompt (tóm tắt) | AI Output | Đánh giá |
|---|------|-----------------|-----------|---------|
| 10 | 2026-06-18 | Thiết kế domain testing FR-18: auth/display/security, 11 TC | `test-cases/FR18_AdminOrder/DomainTesting.md` | Tốt — bao phủ SEC-03, SEC-04 |
| 11 | 2026-06-18 | Thiết kế BVA FR-18: role boundary + content safety, 8 TC | `test-cases/FR18_AdminOrder/BVA.md` | Đúng |
| 12 | 2026-06-20 | Thực thi FR-18: curl + Playwright, XSS test | `test-runs/FR18_AdminOrder/` + screenshots | Phát hiện BUG-07 (IDOR), BUG-08 (XSS) |
| 13 | 2026-06-20 | Viết summary + 2 bug reports FR-18 | `test-summary/FR18_AdminOrder.md`, `bug-reports/FR18_AdminOrder/` | Đúng |

### PHASE 4 — Mobile: Order History

| # | Ngày | Prompt (tóm tắt) | AI Output | Đánh giá |
|---|------|-----------------|-----------|---------|
| 14 | 2026-06-22 | Thiết kế DT + BVA Mobile: 13 + 6 TC | `test-cases/Mobile_OrderHistory/DomainTesting.md` + `BVA.md` | Đúng |
| 15 | 2026-06-22 | Thực thi Mobile: Expo web qua Playwright | `test-runs/Mobile_OrderHistory/` + screenshots | 100% pass — không bug mới |
| 16 | 2026-06-22 | Viết summary Mobile | `test-summary/Mobile_OrderHistory.md` | Đúng |

### Hỗ trợ chung (cross-phase)

| # | Ngày | Prompt (tóm tắt) | AI Output | Đánh giá |
|---|------|-----------------|-----------|---------|
| 17 | 2026-06-25 | Restructure 8 test-case files sang format TC card | 8 file `.md` được rewrite giữ nguyên nội dung | Thành công |
| 18 | 2026-06-26 | Tạo GitHub issue commands với labels + body template | `git_command.md` + `tests/issue-bodies/BUG-0[1-8].md` | Sau nhiều lần debug shell quoting |
| 19 | 2026-06-28 | Viết Phase 5 deliverables | `ai-audit/`, `tests/README.md` | Session hiện tại |

---

## Các vấn đề kỹ thuật gặp phải

| Vấn đề | Nguyên nhân | Cách giải quyết |
|--------|-------------|----------------|
| `zsh: event not found: !` | `!` trong double-quoted string trigger history expansion | Chuyển sang `--body-file` với single-quoted heredoc |
| GitHub issue body bị corrupt | `"` trong `"$(cat <<EOF...)"` đóng string sớm trong zsh | Viết body ra file `.md` riêng; dùng `--body-file` |
| Raw URL 404 | Branch name `ntanh/23127152-HW2` có `/` → GitHub phân tích path sai | Dùng commit SHA thay branch name trong URL |
| `File has not been read yet` | Write tool yêu cầu read trước khi write | Re-read với `limit:5` để đăng ký session tracking |

---

## Công cụ AI sử dụng

| Công cụ | Mục đích |
|---------|---------|
| Claude Code CLI | Thiết kế test case, viết bug report, phân tích spec |
| `gh` CLI | Tạo GitHub issues, kiểm tra labels |
| `git` CLI | Commit, push, kiểm tra history |
