# Performance Test Worksheet — {SUT_NAME}

Fill this in during steps 1–2 of `performance-test-designer`, before generating any test plan.
Every blank below must be a stated decision, not left implicit in the AI's head.

## 1. Performance Goal

| Endpoint group | Max p95 response time | Max error rate | Target throughput |
|---|---|---|---|
| Auth-heavy | | | |
| Read-heavy | | | |
| Transactional | | | |

Justification for these numbers (why these targets, not generic industry defaults):

## 2. Workload Model

**Transaction distribution** — % of virtual users following each path through the E2E workflow:

| User path | % of virtual users |
|---|---|
| Browse-only (read-heavy path, no login/purchase) | |
| Browse + auth, no purchase | |
| Full E2E (auth → browse → transactional) | |

**Think-time** — distribution and range used between requests, and why it's realistic for this user persona:

**Load profile per scenario** — filled in by the matching sub-skill (`load-test-design` / `stress-test-design` / `spike-test-design`):

| Scenario | Ramp shape | Peak | Duration | Stop/hold condition |
|---|---|---|---|---|
| Load | | | | |
| Stress | | | | |
| Spike | | | | |

## 3. End-to-end scenario → endpoint group mapping

| Step # | Request | Endpoint group |
|---|---|---|
| 1 | | auth-heavy |
| 2 | | read-heavy |
| 3 | | read-heavy |
| 4 | | transactional |
| 5 | | transactional |

## 4. Data-driving plan

What varies per virtual user, and why (avoid collisions/duplicate-state errors): 

Column names planned per CSV file (values are decided when the file is built against the real SUT, not here):
