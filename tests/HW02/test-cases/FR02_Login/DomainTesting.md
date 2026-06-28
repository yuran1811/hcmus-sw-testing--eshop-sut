# FR-02: Đăng nhập & Khóa tài khoản — Domain Testing (Test Cases Design)

**Feature:** FR-02 — Login & Account Lockout  
**Pool:** A — Authentication  
**Spec source:** `README.md` §FR-02, §FR-22  
**Design method:** Domain Testing — Equivalence Partitioning  
**Technique guide:** `.claude/skills/domain-testing`

---

## Step 1 — Variable Identification

Every input that drives the behavior of FR-02, including hidden state variables:

| # | Variable | Source | Type | Notes |
|---|----------|--------|------|-------|
| 1 | `email` | Request body / UI form field | string | Identifies the account |
| 2 | `password` | Request body / UI form field | string | Authenticates the user |
| 3 | `account_state` | DB: `login_attempts`, `locked_until` | derived (hidden) | Determines whether login is allowed |
| 4 | `email_input_type` | UI HTML attribute | UI attribute | Spec FR-22 requires `type="email"` |
| 5 | `password_input_type` | UI HTML attribute | UI attribute | Spec FR-22 requires `type="password"` |
| 6 | `error_position` | UI rendering | UI behavior | Spec FR-22: error must appear above submit button |

---

## Step 2 — Domain Definition

| Variable | Data Type | Valid Format / Range | Spec Constraint |
|----------|-----------|----------------------|-----------------|
| `email` | string | RFC 5321 email format | Must contain `@` and domain; max 254 chars; must exist in system for success |
| `password` | string | any printable characters | Must match the stored password exactly (case-sensitive) |
| `account_state` | derived | login_attempts ∈ [0, ∞); locked_until = NULL or datetime | ≥3 consecutive failures → locked 30s; success resets counter |
| `email_input_type` | HTML attr | `type="email"` | Spec FR-22: must be exactly `type="email"` |
| `password_input_type` | HTML attr | `type="password"` | Spec FR-22: must be exactly `type="password"` |
| `error_position` | UI layout | above submit button | Spec FR-22: error message appears above submit, not below |

---

## Step 3 — Equivalence Classes

### 3.1 Variable: `email`

| Class ID | Class Name | Description | Representative Value | Type |
|----------|-----------|-------------|---------------------|------|
| EP-E1 | Valid — user account | Correct format, exists as regular user | `test@eshop.com` | Valid |
| EP-E2 | Valid — admin account | Correct format, exists as admin role | `admin@eshop.com` | Valid |
| EP-E3 | Invalid — not found | Correct format, does NOT exist in system | `nobody@test.com` | Invalid |
| EP-E4 | Invalid — missing @ | No `@` symbol | `testeshop.com` | Invalid |
| EP-E5 | Invalid — missing domain | Has `@` but no domain part | `test@` | Invalid |
| EP-E6 | Invalid — empty | Empty string | `""` | Invalid |
| EP-E7 | Invalid — whitespace only | Contains only spaces | `"   "` | Invalid |

### 3.2 Variable: `password`

| Class ID | Class Name | Description | Representative Value | Type |
|----------|-----------|-------------|---------------------|------|
| EP-P1 | Valid — correct | Matches stored password exactly | `Test1234!` | Valid |
| EP-P2 | Invalid — wrong | Different string, not the stored password | `WrongPass999!` | Invalid |
| EP-P3 | Invalid — empty | Empty string | `""` | Invalid |
| EP-P4 | Invalid — wrong case | Correct chars but different capitalisation | `test1234!` | Invalid |

### 3.3 Variable: `account_state`

| Class ID | Class Name | Description | Precondition to Set Up | Type |
|----------|-----------|-------------|----------------------|------|
| EP-A1 | Normal | 0 consecutive failures; no lock | Fresh/reset account | Valid |
| EP-A2 | 1 prior failure | 1 failure on record; not locked | 1 failed login attempt | Valid (can still attempt) |
| EP-A3 | 2 prior failures | 2 failures on record; one more will lock | 2 failed login attempts | Valid (can still attempt) |
| EP-A4 | Locked | ≥3 consecutive failures within 30s window | 3 failed login attempts, within 30s | Invalid — all attempts blocked |
| EP-A5 | Lock expired | Was locked, 30s+ has now elapsed | 3 failed attempts, wait 30s | Valid (lock lifted) |

### 3.4 UI Attributes

| Class ID | Class Name | Description | Type |
|----------|-----------|-------------|------|
| EP-U1 | Correct email input type | `<input type="email">` on email field | Valid |
| EP-U2 | Correct password input type | `<input type="password">` on password field | Valid |
| EP-U3 | Error above submit | Error message rendered above the submit button | Valid |

---

## Step 4 — Test Cases

> **Design-only document.** Columns `Actual` and `Pass/Fail` belong in `test-runs/FR02_Login/DomainTesting.md`.  
> Isolation rule: one variable varied per case; all others held at their valid class representative.

### Baseline

| ID | Variable(s) | Class | Test Value(s) | Preconditions | Expected Result |
|----|------------|-------|--------------|---------------|----------------|
| DT-FR02-01 | email + password | EP-E1 + EP-P1 (all valid) | `test@eshop.com` / `Test1234!` | account_state = normal (0 attempts) | Login success; JWT token returned; user redirected to home page |

### Vary: `email`

| ID | Variable(s) | Class | Test Value(s) | Preconditions | Expected Result |
|----|------------|-------|--------------|---------------|----------------|
| DT-FR02-02 | email | EP-E2 (admin account) | `admin@eshop.com` / `Admin123!` | account_state = normal | Login success; JWT returned; admin role in token |
| DT-FR02-03 | email | EP-E3 (not in system) | `nobody@test.com` / `Test1234!` | — | Login fail; generic error shown; no account details revealed |
| DT-FR02-04 | email | EP-E4 (missing @) | `testeshop.com` / `Test1234!` | — | Login fail; invalid email format error |
| DT-FR02-05 | email | EP-E5 (missing domain) | `test@` / `Test1234!` | — | Login fail; invalid email format error |
| DT-FR02-06 | email | EP-E6 (empty) | `""` / `Test1234!` | — | Login fail; email field required |
| DT-FR02-07 | email | EP-E7 (whitespace) | `"   "` / `Test1234!` | — | Login fail; invalid email format error |

### Vary: `password`

| ID | Variable(s) | Class | Test Value(s) | Preconditions | Expected Result |
|----|------------|-------|--------------|---------------|----------------|
| DT-FR02-08 | password | EP-P2 (wrong password) | `test@eshop.com` / `WrongPass999!` | account_state = normal (0 attempts) | Login fail; generic error shown; attempt counter incremented by 1 |
| DT-FR02-09 | password | EP-P3 (empty) | `test@eshop.com` / `""` | account_state = normal | Login fail; password field required |
| DT-FR02-10 | password | EP-P4 (wrong case) | `test@eshop.com` / `test1234!` | account_state = normal | Login fail; passwords are case-sensitive |

### Vary: `account_state`

| ID | Variable(s) | Class | Test Value(s) | Preconditions | Expected Result |
|----|------------|-------|--------------|---------------|----------------|
| DT-FR02-11 | account_state | EP-A2 (1 prior failure, now correct) | `test@eshop.com` / `Test1234!` | 1 failed attempt already on this account | Login success; JWT returned; failure counter reset to 0 |
| DT-FR02-12 | account_state | EP-A3 (2 prior failures, wrong password → triggers lock) | `test@eshop.com` / `WrongPass999!` | 2 failed attempts already on this account | Login fail; 3rd failure triggers lock; account locked for 30 seconds |
| DT-FR02-13 | account_state | EP-A4 (account locked, correct password submitted) | `test@eshop.com` / `Test1234!` | ≥3 consecutive failures within last 30s | Login fail; "account locked" message shown; no JWT |
| DT-FR02-14 | account_state | EP-A5 (lock expired, correct password) | `test@eshop.com` / `Test1234!` | Account was locked, but 30s+ has elapsed | Login success; lock lifted; JWT returned; counter reset |

### Vary: UI Attributes

| ID | Variable(s) | Class | What to Check | Preconditions | Expected Result |
|----|------------|-------|--------------|---------------|----------------|
| DT-FR02-15 | email_input_type | EP-U1 | Inspect `type` attribute of email `<input>` element | Navigate to login page | `type="email"` — browser validates email format natively |
| DT-FR02-16 | password_input_type | EP-U2 | Inspect `type` attribute of password `<input>` element | Navigate to login page | `type="password"` — password chars masked on screen |
| DT-FR02-17 | error_position | EP-U3 | Submit invalid credentials; observe error message DOM position | — | Error message appears **above** the submit button, not below |

---

## Step 5 — AI Gap Analysis

> _To be completed after test execution in `test-runs/`. Record any test cases or bug patterns that the AI missed, and explain why._

| Gap | Missed by AI? | Reason (prompt quality / AI limitation / feature complexity) |
|-----|--------------|--------------------------------------------------------------|
| _(fill after execution)_ | | |
