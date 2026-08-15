---
name: stress-test-design
description: Use when designing a JMeter or k6 stress test — incrementally increasing load beyond normal capacity to find the system's breaking point, error threshold, or maximum stable throughput.
---

# Stress Test Design

## Overview
Stress testing finds **where the system breaks**, not whether it meets SLA. Push load in steps above the Load test's baseline until error rate or latency crosses a failure threshold, then report the last stable step.

## When to use
- Designing the "Stress" leg of a Load/Stress/Spike suite (paired with `load-test-design`, `spike-test-design` under `performance-test-designer`)
- User asks for "stress test", "breaking point", "max capacity", "find the ceiling"

## Core parameters

| Parameter | How to choose | Anti-pattern |
|---|---|---|
| Load steps | Staircase: start at Load-test baseline VUs, step up by a fixed increment (e.g., +25%) every N minutes | Jumping straight to an arbitrary huge number |
| Step duration | Long enough per step to observe steady behavior (2–5 min) before stepping again | Stepping too fast — never see the step's true effect |
| Stop condition | Define numerically up front: error rate > X% OR p95 > Y ms OR throughput plateaus/drops while VUs rise | "Run until it feels broken" — not reproducible |
| Think-time | Same realistic think-time as Load — stress means more users, not users clicking faster | Removing think-time to "stress harder" — that's a different (unrealistic) test |

## JMeter shape
- **Stepping Thread Group** (jp@gc plugin) or multiple chained **Thread Groups** with staggered start delays, each adding a fixed increment of threads.
- Add a **Response Assertion** + **Duration Assertion** per request so failures are counted automatically at each step.
- Watch app-specific breakage: in EShop, repeated failed logins across many virtual users can trip the 3-attempt account lockout — document and reset it between runs, and don't let lockout responses masquerade as "server broke."

## k6 shape
```js
export const options = {
  stages: [
    { duration: '2m', target: 50 },   // = load baseline
    { duration: '2m', target: 100 },
    { duration: '2m', target: 150 },
    { duration: '2m', target: 200 },  // keep stepping until thresholds breach
  ],
  thresholds: {
    http_req_failed: ['rate<0.05'],   // stop condition, not just a report
    http_req_duration: ['p(95)<2000'],
  },
};
```

## Self-review checklist
- [ ] Steps start at the Load test's baseline VU count, not from zero
- [ ] Stop condition is a concrete number (error % or p95 ms), stated before running
- [ ] Report identifies the **last stable step** and the **first failing step** by number, not just "it broke eventually"
- [ ] Account-lockout / rate-limit side effects distinguished from genuine capacity failure
- [ ] Think-time unchanged from Load test — only concurrency increases

## Common mistakes
- No defined stop condition → can't say where the ceiling is, only that it exists.
- Confusing an auth-lockout error spike with a capacity failure — check response body/status, not just error count.
