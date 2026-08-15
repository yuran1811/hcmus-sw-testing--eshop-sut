---
name: load-test-design
description: Use when designing a JMeter or k6 load test plan — steady, realistic traffic at expected/normal peak volume to validate response-time and error-rate SLAs, choosing thread/VU counts, ramp-up, and think-time for a sustained scenario.
---

# Load Test Design

## Overview
Load testing measures behavior under **expected, sustained** traffic — not the breaking point. Goal: confirm the system meets its SLA (response time, error rate, throughput) at realistic normal/peak-normal load, held long enough to reach steady state.

## When to use
- Designing the "Load" leg of a Load/Stress/Spike suite (paired with `stress-test-design`, `spike-test-design` under `performance-test-designer`)
- User asks for "load test", "baseline performance", "normal traffic simulation"

## Core parameters

| Parameter | How to choose | Anti-pattern to avoid |
|---|---|---|
| Virtual users / threads | Expected concurrent users at normal peak (from product context, not guessed) | Copying a Stress-test thread count |
| Ramp-up | Long & gradual — spread arrival over the full ramp window (e.g., 50 users over 60s) so all users aren't hammering at t=0 | Ramp-up of 1s for 50 users — that's a spike, not a load test |
| Think-time | Realistic per-request pause (Gaussian/uniform, e.g., 1–5s) matching a human reading a page/deciding | 0ms think-time — unrealistic, inflates RPS |
| Duration | Long enough to pass ramp-up and hold **steady state** (typically 5–15 min held load) | Stopping right after ramp-up completes |
| Loop count | Iterations per user across the duration, not a fixed small number | Single iteration — never reaches steady state |

## JMeter shape
- **Thread Group**: `Number of Threads` = target VUs, `Ramp-up period` = gradual (seconds), `Loop Count` = enough to fill Duration, or use `Duration` + `Startup delay` via Scheduler.
- Add a **Constant Timer** or **Gaussian Random Timer** for think-time between requests.
- CSV Data Set Config feeding credentials/product IDs (see `performance-test-designer` for the data-driven step).

## k6 shape
```js
export const options = {
  stages: [
    { duration: '1m', target: 50 },  // gradual ramp-up
    { duration: '10m', target: 50 }, // steady state — this is the load test
    { duration: '1m', target: 0 },   // ramp-down
  ],
};
```
Use `sleep(randomThinkTime())` between steps, not `sleep(0)`.

## Self-review checklist
- [ ] Ramp-up spreads arrivals — no thundering herd at t=0
- [ ] Steady-state window ≥ 5 min held at target VUs
- [ ] Think-time present and randomized, not zero/fixed
- [ ] Thread/VU count justified by a stated assumption (e.g., "50 concurrent = normal peak for a demo shop"), not copied from Stress
- [ ] Assertions check both status code AND response time threshold, not just "no error"

## Common mistakes
- Confusing Load with Stress: if the plan ramps until it breaks, it's a Stress test, not Load — rename or fix.
- Missing steady-state hold: everyone gets counted mid-ramp, understating real latency at full concurrency.
