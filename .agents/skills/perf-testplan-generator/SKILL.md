---
name: perf-testplan-generator
description: >
  Use this skill to design and generate JMeter test plans (JMX files) or k6
  scripts for Load, Stress, and Spike scenarios. Trigger when the user asks
  to create a performance test plan, set JMeter parameters, write a JMX file,
  design a load scenario, configure thread groups, add listeners or assertions,
  or produce k6 scripts for any performance testing scenario. Also trigger when
  the user wants help choosing realistic ramp-up periods, think times, virtual
  user counts, or duration for any of the three test types. This skill follows
  an AI-first, step-by-step approach and ends with a human review checklist.
---

# Performance Test Plan Generator

## Purpose

Guide the creation of three distinct test plans — Load, Stress, and Spike —
each targeting the same end-to-end workflow but with different load profiles
suited to their purpose. The skill structures the AI assistance into explicit
sub-prompts so the user dials in each component separately rather than
accepting one monolithic output.

## Inputs required

Collect these before generating anything. Ask if not provided:

- Tool preference: JMeter (default) or k6.
- Base URL of the application under test.
- The end-to-end workflow (from the scope planner or user-provided).
- CSV data file name and its column headers.
- Host hardware specs: CPU core count and total RAM in GB.
- File naming convention (for example: {ID}_{ScenarioType}_{YYYYMMDD}).

Before writing any final JMX or k6 file, inspect the real backend implementation
or run a quick API probe to confirm:
- Actual response JSON shapes for every extracted field.
- Actual status codes for each step.
- Actual request payload field names for transactional endpoints.

Do not trust only the specification when source code is available.

## Parameter selection guide

Use hardware specs to derive starting parameters. These are estimates to
reason from, not hard limits.

```
Suggested max virtual users = min(RAM_GB * 40, CPU_cores * 80)
Approximate sustainable throughput = suggested_max_VU / mean_response_sec
```

### Load test — steady-state baseline

Purpose: simulate expected normal traffic to establish a performance baseline.

Recommended defaults:
- Virtual users: 20-50% of suggested max.
- Ramp-up: 60-120 seconds. Never use less than 30 seconds for Load.
- Duration: 10-15 minutes of steady state after ramp-up completes.
- Think time: Gaussian distribution, mean 1000-3000ms, deviation 300ms.
- Acceptable error rate threshold: under 1%.
- Success criterion: p95 response time under 2000ms for read endpoints,
  under 5000ms for transactional endpoints.

### Stress test — find the breaking point

Purpose: increase load incrementally until error rate or latency degrades
past the acceptable threshold, identifying the system's capacity limit.

Recommended defaults:
- Virtual users: start at Load-test level, increment by 25-50% every
  3-5 minutes until error rate exceeds 5% or p99 exceeds 10 seconds.
- Ramp-up per step: 30-60 seconds.
- Think time: 500-1000ms (moderate, not zero — zero think time is
  unrealistic and gives misleading results).
- There is no fixed duration; the test ends when degradation is confirmed.
- The key output is the VU count and RPS at which degradation began.

Implementation preference for JMeter:
- Prefer multiple built-in Thread Groups with staggered `delay` and `duration`
  to create cumulative staged load.
- Avoid relying on Stepping Thread Group, Ultimate Thread Group, or other
  plugins unless the user explicitly confirms plugin availability.
- Avoid Module Controller or brittle internal references when a self-contained
  plan is practical.

### Spike test — sudden traffic burst

Purpose: simulate a sudden surge of traffic (flash sale, viral event) and
measure recovery time after the spike subsides.

Recommended defaults:
- Baseline level: 10-20 virtual users.
- Spike level: 5-10x the baseline (never ramp gradually — spike means fast).
- Spike ramp-up: 5-15 seconds. This is the defining characteristic;
  a slow ramp-up is not a spike, it is a slow stress test.
- Spike duration: 60-120 seconds at peak.
- Recovery phase: return to baseline level and hold for 3-5 minutes to
  confirm the system recovers without manual intervention.
- Acceptable: p95 during spike may be elevated; what matters is that
  error rate returns below 1% and p95 returns to baseline within 2 minutes.

## Step-by-step AI prompting sequence

Do not send one prompt asking for the complete test plan. Instead, guide
the AI through these sub-tasks sequentially. After each step, review the
output before proceeding.

### Sub-prompt A — Thread Group configuration

```
I am configuring a [Load / Stress / Spike] test in JMeter.
Application: [name], Base URL: [URL].
Hardware: [N] CPU cores, [X] GB RAM.

Design the Thread Group with these parameters:
- Number of threads (virtual users): [derive from hardware guide]
- Ramp-up period in seconds: [derive from scenario type]
- Test duration or loop count: [derive from scenario type]
- Think time implementation: Gaussian Timer with mean [M]ms, deviation [D]ms

Explain the rationale for each value you choose.
Output: the Thread Group XML block only.
```

### Sub-prompt B — HTTP Sampler chain

```
I have this end-to-end workflow:
[Paste the ordered step list from the scope planner]

For each step, create a JMeter HTTP Request Sampler with:
- Method and path
- Headers including Authorization where needed
- Request body (JSON) using JMeter variables for parameterized fields
- A JSON Extractor for any value that subsequent steps depend on
  (specify the JSONPath expression and variable name)

Do not add assertions yet. Output each sampler as XML.
```

Important:
- If a later request depends on a computed monetary total, create that
  variable explicitly. Example: `cart_total = product_price * quantity`
  before applying a coupon. Do not send a single-item price when the API
  expects a cart/order total.
- Do not invent fallback values for critical extracted variables unless the
  workflow explicitly wants to continue after missing data.

### Sub-prompt C — Assertions

```
Add assertions to the sampler chain. For each step:
- A Response Assertion checking the HTTP status code matches [expected code].
- A Duration Assertion: [2000ms for read steps, 5000ms for transactional steps].
- If the step extracts a variable, add a Response Assertion confirming the
  extracted field is not empty.

Output the assertion XML blocks inline below each sampler they belong to.
```

For JMeter, prefer fail-fast extractor validation using `JSR223 Assertion`
when a plain Response Assertion is not enough. Critical variables include:
- auth token
- user id
- product id / price / name
- computed coupon result such as `final_amount`
- created order identifier

### Sub-prompt D — CSV Data Set Config

```
Add a CSV Data Set Config element to the test plan with:
- Filename: [CSV file name]
- Variable names: [comma-separated column headers]
- Delimiter: comma
- Recycle on EOF: true
- Stop thread on EOF: false
- Sharing mode: All Threads

Output the XML element only.
```

### Sub-prompt E — Listener selection

Each of the three test plans must use a different listener type. Do not
reuse the same listener across plans. Suggested assignment:

- Load test: View Results Tree (useful for debugging individual requests).
- Stress test: Aggregate Report (aggregates by sampler label, shows p90/p95).
- Spike test: Summary Report (high-level throughput and error rate).

If using k6, the equivalent outputs are:
- Load: k6 text output with --out influxdb or --out json.
- Stress: k6 summary with thresholds defined per metric.
- Spike: k6 custom handleSummary function.

### Sub-prompt F — File naming

Confirm the test plan file name follows the required convention:
`{ID}_{ScenarioType}_{YYYYMMDD}.jmx`

Example: `25127001_Load_20251013.jmx`

## Human review checklist

After the AI generates the test plan, verify every item below before
treating the plan as final. Record what was wrong and what you changed.

Ramp-up duration:
- Load test ramp-up is at least 60 seconds.
- Spike test ramp-up is under 15 seconds.
- Stress test increments gradually, not in one jump.

Think time:
- A Gaussian Timer or equivalent is present in every thread group.
- Mean think time is not zero. Zero think time produces unrealistic
  max-throughput benchmarks that no production scenario matches.

CSV configuration:
- The filename in the CSV Data Set Config exactly matches the file on disk.
- Variable names in the config exactly match the placeholder names in the
  sampler bodies.

Token/session management:
- A JSON Extractor exists for every value that downstream steps depend on.
- The extractor JSONPath is correct for the actual response schema.
- Authorization headers reference the extracted token variable.
- Extractor default values for critical workflow variables are blank unless
  the test intentionally supports a fallback path.

Account lockout handling:
- If the application locks accounts after N failed logins, the CSV contains
  enough distinct accounts that no account is targeted more than N-1 times.
- The Spike test and Stress test, which use high virtual user counts, have
  been checked against the CSV row count.

Assertions:
- Every sampler has at minimum a status code assertion.
- Duration assertions are set to realistic thresholds, not defaults.
- Critical extracted variables fail the sampler if missing, instead of silently
  continuing with dummy values.

Listener uniqueness:
- Each of the three test plans uses a different listener type.

Output ownership:
- Decide whether the canonical raw log comes from the in-plan listener
  `filename` or from CLI `-l`. Document one consistent convention and do not
  leave ambiguity about which file is the submission artifact.

## Output deliverables

- Three complete test plan files with correct names.
- A parameter comparison table covering all three scenarios.
- The completed human review checklist with notes on what was corrected.
- A short log of which AI outputs were used as-is versus modified versus
  discarded, with the reason for each change.

## Reference files

For JMeter XML structure details, see references/jmeter-xml-reference.md.
For k6 script patterns, see references/k6-patterns.md.
