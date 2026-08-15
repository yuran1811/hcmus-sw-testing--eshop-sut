---
name: performance-test-designer
description: Use when the user mentions load test, stress test, spike test, soak/endurance test, JMeter, k6, performance test plan, workload model, ramp-up, think time, thread group, virtual user, or performance testing, or gives an API/system and wants its performance measured.
---

# Performance Test Designer

## Overview
Turns "test the performance of this API" into a complete Load + Stress + Spike suite by driving a fixed 6-step process. Never skip a step or jump straight to writing a `.jmx`/script — each step's output feeds the next.

**REQUIRED SUB-SKILLS:** use `load-test-design` for step 5's Load plan, `stress-test-design` for the Stress plan, `spike-test-design` for the Spike plan. Use `performance-test-analyzer` once results come back.

## The 6 steps

### 1. Performance Goal
Before touching a tool, state numeric targets: max acceptable p95 response time per endpoint group, max error rate, target throughput (RPS). Ground these in the SUT's actual context, not invented industry benchmarks. Write them down — step 6 checks results against these.

### 2. Workload Model
Define, explicitly, before generating any plan:
- **Transaction distribution** — what % of virtual users do what (e.g., 40% browse-only, 40% browse+cart, 20% full checkout). Must not be uniform-random without justification.
- **Think-time** — per-step pause distribution (e.g., Gaussian 1–5s) representing a human reading/deciding, not a bot hammering.
- **Load profile** — the ramp-up/steady/ramp-down shape for each of Load/Stress/Spike (delegate exact numbers to the respective sub-skill).

### 3. End-to-end scenario across all 3 endpoint groups
One workflow, reused by all three test plans, that touches:
- **Auth-heavy**: login (account creation once via CSV, not per-iteration)
- **Read-heavy**: product listing/search + product detail
- **Transactional**: add-to-cart → checkout

Example: `login → GET /api/products?search= → GET /api/products/:id → POST /api/cart → POST /api/checkout`. State explicitly, in the plan's documentation, which request maps to which endpoint group — this mapping is graded in HW05.

### 4. Data-driven with CSV
Parameterize anything that must vary per virtual user or would otherwise collide (duplicate registrations, identical cart race conditions): credentials, product IDs, coupon codes, shipping addresses. One CSV per data category is fine. Bind via JMeter's CSV Data Set Config (`recycle on EOF` depends on whether Load/Stress needs more rows than users) or k6's `SharedArray` from a parsed CSV file. Never hardcode a single test account across every virtual user for a login-heavy scenario — that trips account-lockout logic instead of testing load.

### 5. Generate the test plans
For each of Load, Stress, Spike: invoke the matching sub-skill (`load-test-design` / `stress-test-design` / `spike-test-design`) with the workload model and E2E scenario from steps 2–3 as input. Each plan gets:
- Its own listener/report type — do not reuse a listener/report type across the three plans (e.g., View Results Tree for one, Summary Report for another, Aggregate Report for the third).
- Filename `{StudentID}_{ScenarioType}_{YYYYMMDD}` — this is checked for authenticity; don't let the AI invent a different convention.

### 6. Self-review + evidence checklist
Run each sub-skill's own checklist first, then confirm across all three plans:
- [ ] Same E2E workflow in all three plans (only the load profile differs)
- [ ] All 3 endpoint groups present and labeled in every plan
- [ ] CSV data-driven, no hardcoded single-account collisions
- [ ] 3 distinct report/listener types, none repeated
- [ ] Filenames match `{StudentID}_{ScenarioType}_{YYYYMMDD}`
- [ ] Assertions check response time thresholds from step 1, not just HTTP 200
- [ ] Execution evidence plan exists: screenshot of tool + resource monitor (htop/Task Manager) in the same frame per run, hardware spec report, raw `.jtl`/k6 JSON output retained in full
- [ ] Account-lockout reset procedure documented if the auth-heavy step can trigger it under Stress/Spike

## Template
Copy `templates/performance-worksheet-template.md` and fill it in for steps 1–4 before generating any plan — it's the fill-in form for Performance Goal, Workload Model, the endpoint-group mapping, and the data-driving plan.

## Common mistakes
- Writing the `.jmx`/script before defining the Workload Model — parameters end up arbitrary and unjustifiable when asked "why 50 threads?"
- Three unrelated workflows instead of one E2E workflow reused across Load/Stress/Spike — breaks comparability between the three runs.
- Delegating steps 2–4 to the AI with a single prompt ("make me a load test") instead of driving each step — produces ungrounded numbers with no traceable reasoning.
