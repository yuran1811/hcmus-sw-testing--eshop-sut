---
name: performance-test-analyzer
description: Use when analyzing performance test results — raw .jtl/k6 JSON logs, computing p90/p95/p99 latency, error rate, and throughput, judging AI-suggested optimizations, or writing up a performance test report after a Load/Stress/Spike/Soak run.
---

# Performance Test Analyzer

## Overview
Turns a raw `.jtl`/k6 result file into a defensible report by forcing every claim — yours or the AI's — back to a number in the raw log. Companion to `performance-test-designer`; use after test plans from that skill (or its sub-skills) have been run.

## Process

### 1. Extract metrics from the raw log, not a summary
Per endpoint group (auth-heavy / read-heavy / transactional) and per scenario (Load/Stress/Spike/Soak), compute: count, error %, avg, median, p90, p95, p99, min/max latency, throughput (req/s). Do this from the `.jtl` (or k6's JSON summary) directly — never accept an AI's numbers without recomputing at least the p95 and error rate yourself, since these are the two AI misreads most often (e.g., confusing average with p95, or counting expected non-2xx statuses — like a deliberate lockout test — as failures).

### 2. Compare against the Performance Goal
Pull the numeric targets defined in `performance-test-designer` step 1. State pass/fail per endpoint group per scenario, with the actual number next to the target (e.g., "checkout p95 = 1840ms, target ≤1500ms → FAIL").

### 3. Find the breaking point / bottleneck
For Stress: identify the load step where error rate or p95 crosses the stop condition; report the last *stable* step by number/VU-count, not just "it broke." For Spike: report recovery time (how long after the drop until p95 returns to baseline). For Soak/endurance: report the maximum stable RPS and any resource ceiling (memory growth, CPU saturation) observed in the monitor screenshots, not just from the log.

### 4. AI-assisted analysis + misinterpretation hunt
Prompt an AI tool with the raw log (or a faithful extract) to analyze results and propose thresholds. Then, for every AI claim, check it against the number computed in step 1:
- Did it read the right percentile (p95 vs avg)?
- Did it count expected non-2xx responses (e.g., a deliberate 401 from the lockout test) as real failures?
- Did it correctly attribute high latency to the right endpoint group, or lump everything together?

Record each misinterpretation as: **AI claim** → **actual value from raw log** → **why it's wrong**.

### 5. Judge AI-proposed optimizations
For each optimization the AI proposes (DB index, connection pool, SQLite WAL mode, caching, etc.), classify:
- **Feasible** — grounded in what the raw data actually shows (e.g., write-heavy checkout endpoint + SQLite → WAL mode is plausible) and compatible with the actual stack.
- **Hallucinated** — no evidence in the data supports it, or it assumes infrastructure the SUT doesn't have (e.g., recommending a Redis cache when there's no cache layer in the stack).
State the reasoning for each classification, not just the label.

### 6. Report structure
```
## Results Summary
| Scenario | Endpoint group | p95 (ms) | Error % | Throughput (req/s) | vs Goal |

## Breaking point / recovery findings

## AI Misinterpretation Log
| AI claim | Raw log value | Why it's wrong |

## Optimization Judgment
| Proposal | Feasible / Hallucinated | Reasoning |
```

## Scripts & templates
- `scripts/jtl-metrics.js` — run `node scripts/jtl-metrics.js <file.jtl>` to recompute count/error%/avg/median/p90/p95/p99/throughput per label straight from the raw log, before checking any AI-produced numbers against it (step 1).
- `templates/analysis-report-template.md` — copy for step 6's report.

## Self-review checklist
- [ ] Every reported metric traced to a raw log value, not just the AI's summary
- [ ] p95/p99 explicitly computed, not approximated from average
- [ ] At least one AI misinterpretation documented with the correct value cited
- [ ] Every AI optimization proposal classified feasible/hallucinated with reasoning
- [ ] Breaking point (Stress) or recovery time (Spike) stated as a concrete number

## Common mistakes
- Trusting an AI's stated p95 without recomputing it — silent averaging errors are the most common AI misread on `.jtl` data.
- Treating all non-2xx responses as failures, even ones the test intentionally triggered (e.g., account lockout under Stress).
- Approving an optimization because it "sounds right" rather than checking it against what the raw data actually shows.
