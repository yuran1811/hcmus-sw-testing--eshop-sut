---
name: perf-jtl-analyzer
description: >
  Use this skill to parse and analyze JMeter JTL log files, derive performance
  metrics, use AI to interpret results and propose optimization recommendations,
  then critically review the AI analysis to identify misinterpretations,
  miscalculations, or hallucinated suggestions. Trigger when the user has raw
  JTL files to analyze, wants to compute p90/p95/p99 latency, error rates, or
  throughput from JMeter output, needs to find the endurance threshold of their
  system, wants to identify what AI got wrong in its performance analysis, or
  needs to evaluate whether AI-suggested optimizations are applicable to their
  stack. This skill covers the full AI-first analysis loop: AI proposes,
  human verifies against raw data, discrepancies are documented.
---

# Performance JTL Log Analyzer

## Purpose

Parse raw JTL files to compute accurate performance metrics, structure an
AI-assisted analysis session using targeted sub-prompts, identify every
place the AI misread or miscomputed a metric (with evidence from the raw log),
and classify each AI optimization recommendation as applicable or inapplicable.

## Understanding the JTL format

A JTL file is a CSV with the following columns (JMeter 5.x default):

```
timeStamp, elapsed, label, responseCode, responseMessage, threadName,
dataType, success, failureMessage, bytes, sentBytes, grpThreads,
allThreads, URL, Latency, IdleTime, Connect
```

Key column definitions:
- `elapsed`: total response time in milliseconds (from request send to last
  byte received). This is the primary latency metric.
- `Latency`: time from request send to first byte received. This is not
  the same as elapsed. AI frequently confuses these two.
- `Connect`: TCP connection establishment time. Included in elapsed.
- `success`: string "true" or "false". A request can have success=false
  with no HTTP error code if it exceeded a Duration Assertion threshold.
  AI often ignores this category when computing error rates.
- `timeStamp`: Unix epoch in milliseconds. Use min/max to compute duration.

## Step 1 — Parse and compute baseline metrics

Run the parser script against each JTL file before calling any AI tool.
This gives you the ground-truth numbers to compare against AI output.

See references/jtl-parser.md for the full implementation.

Quick usage:
```python
from scripts.parse_jtl import summarize_jtl

summary = summarize_jtl("results/load.jtl")
```

The summary includes per-sampler and overall figures for:
- Total requests, success count, failure count, error rate.
- avg, median, p90, p95, p99, max elapsed in milliseconds.
- Throughput (requests per second) computed from timeStamp range.
- Average bytes received per request.

Print the summary before any AI interaction so you have exact figures
to compare against what the AI reports.

## Step 2 — AI analysis session (structured sub-prompts)

Send the AI the parsed summary (not the raw JTL file) and work through
these sub-prompts in order. Keeping the AI focused on one question at a
time produces more verifiable answers than a single broad prompt.

### Sub-prompt A — Metric interpretation

```
Here are the performance metrics from a [Load / Stress / Spike] test
against [application name]. The workflow tested was: [brief description].

[Paste the summarize_jtl() output here]

Answer these questions:
1. Which sampler has the highest p95 latency and what does that indicate?
2. Is the overall error rate within acceptable bounds for this test type?
   (Load: under 1%, Stress: observe but accept up to 5%, Spike: under 5%)
3. Does the throughput figure suggest the system was CPU-bound, I/O-bound,
   or within comfortable limits given [N] CPU cores and [X] GB RAM?
4. Is there a meaningful gap between p95 and p99 that suggests occasional
   outliers rather than general slowness?
```

### Sub-prompt B — Threshold recommendations

```
Based on the same metrics, recommend specific performance thresholds for
a regression gate on this application. Provide:
- A p95 target in milliseconds for each sampler label.
- A maximum acceptable error rate percentage.
- A minimum acceptable throughput (requests per second).

Justify each threshold by referencing the numbers above.
```

### Sub-prompt C — Optimization recommendations

```
Propose 5 concrete optimization techniques to improve the response time
and throughput of this application. For each recommendation:
- Name the technique.
- Explain the expected impact in terms of the metrics above.
- Identify any prerequisite change to the application stack.
```

## Step 3 — Misinterpretation hunt

This is the most important step. For every claim the AI made in Steps A,
B, and C, verify it against the raw summary from Step 1. Document each
discrepancy in a findings table.

Common AI errors to check for systematically:

**Metric confusion**
- AI reports "average response time" but cites the p95 value (or vice versa).
  Check: compare every number the AI states against the summary output.
- AI confuses `Latency` with `elapsed`. These differ by the time spent
  receiving the response body. Check: state which column the metric came from.

**Error rate miscalculation**
- AI counts only HTTP 4xx/5xx codes as errors, ignoring rows where
  success=false but responseCode is 200 (Duration Assertion failures, timeout
  assertion failures). Check: count rows where success != "true" directly.
  Formula: error_rate = (rows where success != "true") / total_rows.

**Throughput computation error**
- AI divides total_requests by test_duration_minutes rather than by the
  elapsed time between first and last timeStamp in seconds.
  Correct formula: throughput = total_requests / ((max_ts - min_ts) / 1000)

**Hallucinated optimizations**
- AI recommends connection pooling for a database that does not support it
  (e.g., SQLite, which serializes writes by default).
- AI recommends Redis caching when the application has no cache layer and
  adding one requires significant architectural change.
- AI recommends horizontal scaling when the test environment is a single
  developer laptop with no orchestration layer.
- AI recommends JVM heap tuning when the application is not JVM-based.

For each discrepancy found, record:
- The AI claim (quote exactly).
- The correct value from the raw log and how it was computed.
- The likely reason the AI made this error (missing context, column
  confusion, formula assumption, or hallucination).

Use this table template:

```markdown
| # | AI claim | AI value | Correct value | Source in JTL | Reason for error |
|---|----------|----------|---------------|---------------|-----------------|
| 1 | ...      | ...      | ...           | ...           | ...             |
```

## Step 4 — Classify optimization recommendations

For each AI optimization proposal, evaluate applicability against the
actual application stack. Assign one of three labels:

- Applicable: the optimization is correct, implementable without major
  architectural change, and directly addresses a bottleneck visible in the data.
- Conditional: the optimization is correct in principle but requires
  a prerequisite change or applies only under certain conditions. State them.
- Not applicable: the optimization assumes a technology or architecture that
  the application does not use. Provide the specific reason.

```markdown
| Recommendation        | Label            | Justification                          |
|-----------------------|------------------|----------------------------------------|
| Add database index    | Applicable       | Query scan visible in slow sampler p99 |
| Use Redis cache       | Conditional      | Requires adding Redis to the stack     |
| Enable SQLite WAL     | Applicable       | Single command, improves read concurrency |
| Connection pool       | Not applicable   | SQLite does not use a connection pool  |
```

## Step 5 — Endurance threshold determination

Run a soak test at a fixed load level for 10-15 minutes. Use the
endurance analysis function from the parser to compute the sustainable
throughput and identify when degradation begins.

```python
from scripts.parse_jtl import endurance_threshold

result = endurance_threshold(
    jtl_file="results/soak.jtl",
    error_rate_limit=0.01,   # flag minute-windows above 1% error rate
    p95_limit_ms=3000,       # flag minute-windows where p95 exceeds this
)
print(result)
```

Report these figures:
- Maximum stable throughput (RPS) observed before degradation.
- Memory ceiling: the approximate RSS at the point degradation began
  (from the resource monitoring screenshot).
- The minute mark at which degradation first appeared.
- Hardware context: CPU cores, RAM, and any other relevant constraints.

## Output deliverables

- Parsed metric summary table for each JTL file.
- Misinterpretation findings table (minimum three entries recommended).
- Optimization classification table.
- Endurance threshold report with specific numerical findings.

## Reference files

See references/jtl-parser.md for the full Python implementation of
summarize_jtl() and endurance_threshold().
