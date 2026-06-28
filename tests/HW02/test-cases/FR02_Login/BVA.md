# FR-02: Đăng nhập & Khóa tài khoản — Boundary Value Analysis (Test Cases Design)

**Feature:** FR-02 — Login & Account Lockout  
**Pool:** A — Authentication  
**Spec source:** `README.md` §FR-02, §FR-22  
**Design method:** Boundary Value Analysis — 3-point per boundary  
**Prerequisite:** Equivalence classes defined in `test-cases/FR02_Login/DomainTesting.md`  
**Technique guide:** `.claude/skills/boundary-value-analysis`

---

## Step 1 — Boundary Identification

From the equivalence classes in DomainTesting.md, every boundary between a valid and invalid class:

| # | Variable | Boundary Description | Boundary Value (B) | Unit | Spec Reference |
|---|----------|---------------------|-------------------|------|----------------|
| B1 | `login_attempts` | Lock triggers at ≥3 consecutive failures | 3 failures | 1 attempt | FR-02: "từ 3 lần trở lên" (3 or more) |
| B2 | `lock_duration` | Account unlocks after 30 seconds | 30 seconds | 1 second | FR-02: "tạm khóa 30 giây" |
| B3 | `email` length | RFC 5321 max total email length | 254 characters | 1 character | RFC 5321 standard |
| B4 | `password` presence | Password field must not be empty | 1 character (min) | 1 character | Implicit required field |
| B5 | `consecutive` counter | Successful login resets counter to 0 | 0 (reset) | 1 attempt | FR-02: "liên tiếp" (consecutive) |

### Boundary Boundary Inclusivity (from spec)

| Boundary | Spec wording | Inclusive? |
|----------|-------------|------------|
| B1: lock at 3 failures | "từ 3 lần **trở lên**" | Yes — 3 is locked (≥3) |
| B2: unlock at 30s | "tạm khóa **30 giây**" | Boundary at 30s; at t=30s lock should expire |
| B3: email 254 chars | RFC 5321 | 254 inclusive (valid); 255 invalid |
| B4: password 1 char | Required field | 1 char is minimum (non-empty is valid format) |

---

## Step 2 — BVA Test Cases

> **Design-only document.** Columns `Actual` and `Pass/Fail` belong in `test-runs/FR02_Login/BVA.md`.  
> 3-point BVA: one case below boundary, one at boundary, one above boundary.

### Boundary B1 — `login_attempts` lock threshold (threshold = 3)

| ID | Variable | Boundary | BVA Point | Test Value / Action | Preconditions | Expected Result |
|----|----------|---------|-----------|-------------------|---------------|----------------|
| BVA-FR02-01 | login_attempts | threshold = 3 | **Below** (2nd failure) | Submit wrong password | Account has 1 prior failure (total will be 2) | Login fail; total = 2 failures; account **NOT** locked; can retry |
| BVA-FR02-02 | login_attempts | threshold = 3 | **At boundary** (3rd failure) | Submit wrong password | Account has 2 prior failures (total will be 3) | Login fail; total = 3 failures; account **LOCKED** for 30s |
| BVA-FR02-03 | login_attempts | threshold = 3 | **Above** (locked state) | Submit correct password | Account has ≥3 failures; within 30s window | Login fail; "account locked" message shown; JWT not issued |

### Boundary B2 — `lock_duration` unlock window (30 seconds)

| ID | Variable | Boundary | BVA Point | Test Value / Action | Preconditions | Expected Result |
|----|----------|---------|-----------|-------------------|---------------|----------------|
| BVA-FR02-04 | lock_duration | unlock at 30s | **Below** (t = 29s) | Submit correct password at t=29s after lockout | Account just locked (t=0) | Login fail; lock still active; "account locked" message |
| BVA-FR02-05 | lock_duration | unlock at 30s | **At boundary** (t = 30s) | Submit correct password at t=30s after lockout | Account locked 30s ago | Login success; lock lifted; JWT returned |
| BVA-FR02-06 | lock_duration | unlock at 30s | **Above** (t = 31s) | Submit correct password at t=31s after lockout | Account locked 31s ago | Login success; lock lifted; JWT returned |

### Boundary B3 — `email` length (RFC 5321 max = 254 chars)

> Format used: `a×N + @test.com` where `@test.com` = 9 chars  
> 253 chars = `a`×244 + `@test.com`  
> 254 chars = `a`×245 + `@test.com`  
> 255 chars = `a`×246 + `@test.com`

| ID | Variable | Boundary | BVA Point | Test Value | Preconditions | Expected Result |
|----|----------|---------|-----------|-----------|---------------|----------------|
| BVA-FR02-07 | email length | max = 254 chars | **Below max** (253 chars) | `aaa…a@test.com` (253 chars total) | — | Format accepted; login fails with "invalid credentials" (not a format error) |
| BVA-FR02-08 | email length | max = 254 chars | **At max** (254 chars) | `aaa…a@test.com` (254 chars total) | — | Format accepted; login fails with "invalid credentials" (not a format error) |
| BVA-FR02-09 | email length | max = 254 chars | **Above max** (255 chars) | `aaa…a@test.com` (255 chars total) | — | Login fail; email exceeds max length; format validation error |

### Boundary B4 — `password` presence (min = 1 character)

| ID | Variable | Boundary | BVA Point | Test Value | Preconditions | Expected Result |
|----|----------|---------|-----------|-----------|---------------|----------------|
| BVA-FR02-10 | password length | min = 1 char (non-empty) | **Below min** (0 chars — empty) | `test@eshop.com` / `""` | account_state = normal | Login fail; password field required; not counted as a failed attempt |
| BVA-FR02-11 | password length | min = 1 char (non-empty) | **At min** (1 char) | `test@eshop.com` / `X` | account_state = normal | Login fail; wrong credentials; 1 char is a valid format (just wrong value) |

### Boundary B5 — Consecutive failures counter reset

| ID | Variable | Boundary | BVA Point | Test Value / Action | Preconditions | Expected Result |
|----|----------|---------|-----------|-------------------|---------------|----------------|
| BVA-FR02-12 | consecutive counter | resets on success | **At reset** | Login with correct password after 2 failures; then submit 1 wrong password | 2 prior failures | Step 1: Success, counter reset to 0. Step 2: 1 new failure (counter = 1, not 3 — account NOT locked) |

---

## Step 3 — Boundary Coverage Checklist

- [x] B1: login_attempts lock threshold — 3-point covered (BVA-FR02-01, 02, 03)
- [x] B2: lock_duration 30s window — 3-point covered (BVA-FR02-04, 05, 06)
- [x] B3: email length RFC max — 3-point covered (BVA-FR02-07, 08, 09)
- [x] B4: password presence — 2-point covered (BVA-FR02-10, 11) — spec has no max length for login
- [x] B5: consecutive counter reset — covered (BVA-FR02-12)
- [x] Spec read for inclusive/exclusive on all boundaries
- [x] Nominal values covered in DomainTesting.md (DT-FR02-01)
- [x] No two boundary variables tested simultaneously

---

## Step 4 — AI Gap Analysis

> _To be completed after test execution in `test-runs/`. Record any boundary cases the AI missed, and explain why._

| Gap | Missed by AI? | Reason |
|-----|--------------|--------|
| _(fill after execution)_ | | |
