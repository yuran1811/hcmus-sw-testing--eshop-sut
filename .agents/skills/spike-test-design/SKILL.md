---
name: spike-test-design
description: Use when designing a JMeter or k6 spike test — a sudden, short burst of traffic far above normal load to check recovery time and stability, as opposed to sustained capacity.
---

# Spike Test Design

## Overview
Spike testing checks **recovery**, not capacity: slam concurrency up almost instantly (seconds, not minutes), hold briefly, drop back down, and measure whether the system recovers to baseline latency/error rate afterward — e.g., a flash-sale traffic burst.

## When to use
- Designing the "Spike" leg of a Load/Stress/Spike suite (paired with `load-test-design`, `stress-test-design` under `performance-test-designer`)
- User asks for "spike test", "flash sale", "sudden burst", "traffic surge", "recovery test"

## Core parameters

| Parameter | How to choose | Anti-pattern |
|---|---|---|
| Ramp-up to peak | Seconds, not minutes (e.g., 0→200 VUs in 5–10s) — the whole point is abruptness | A gradual ramp — that's just a small Stress test |
| Peak hold | Short (30s–2min) — long enough to see the impact, not to reach new steady state | Holding peak for 10+ min — becomes a Stress/Load test |
| Drop-off | As sharp as the ramp-up — back to baseline VUs (or zero) quickly | Gradual ramp-down that hides recovery behavior |
| Post-spike observation | Keep a baseline-load tail (2–5 min) after the drop to measure recovery time to normal latency | Stopping the test right after the drop — no recovery evidence |

## JMeter shape
- **Ultimate Thread Group** (jp@gc plugin) with explicit rows: `Start Threads Count | Initial Delay | Startup Time (short) | Hold Load (short) | Shutdown Time (short)`, or chain three vanilla Thread Groups (baseline → spike → baseline) with scheduler start/end offsets.
- Keep think-time realistic even during the spike (real users don't remove think-time in a flash sale).

## k6 shape
```js
export const options = {
  stages: [
    { duration: '2m', target: 30 },    // baseline
    { duration: '10s', target: 300 },  // sudden spike
    { duration: '1m', target: 300 },   // brief hold at peak
    { duration: '10s', target: 30 },   // sharp drop
    { duration: '3m', target: 30 },    // recovery observation window
  ],
};
```

## Self-review checklist
- [ ] Ramp-up to peak is abrupt (seconds), clearly distinct from the Stress test's staircase
- [ ] Peak hold is short — not long enough to become a new steady state
- [ ] A post-spike baseline tail exists so recovery time can be measured and reported with a number (e.g., "p95 returned to baseline 45s after the drop")
- [ ] Think-time preserved during the spike — concurrency comes from more users, not faster users

## Common mistakes
- Gradual ramp mislabeled as "spike" — if ramp-up takes minutes, it's Stress, not Spike.
- No recovery window → can't answer the actual spike-test question ("does it recover?").
