#!/usr/bin/env node
// Generic JMeter .jtl metrics calculator — no external dependencies.
// Works on any .jtl produced with the default CSV save config
// (timeStamp,elapsed,label,responseCode,...,success,...).
//
// Usage:
//   node jtl-metrics.js <path-to-file.jtl>
//
// Computes, per sampler label AND overall: count, error rate, avg, median,
// p90, p95, p99, min/max elapsed (ms), and throughput (req/s) over the
// observed time window. Use this to recompute the numbers before trusting
// any AI-generated summary of the same file — see performance-test-analyzer.

const fs = require("fs");

const file = process.argv[2];
if (!file) {
  console.error("Usage: node jtl-metrics.js <path-to-file.jtl>");
  process.exit(1);
}

const lines = fs.readFileSync(file, "utf8").trim().split("\n");
const header = lines[0].split(",");
const idx = (name) => header.indexOf(name);

const iElapsed = idx("elapsed");
const iLabel = idx("label");
const iSuccess = idx("success");
const iTimestamp = idx("timeStamp");

if (iElapsed === -1 || iLabel === -1 || iSuccess === -1) {
  console.error("Unexpected .jtl header — expected at least elapsed,label,success columns.");
  process.exit(1);
}

const rows = lines.slice(1).map((line) => line.split(","));

function percentile(sorted, p) {
  if (sorted.length === 0) return 0;
  const rank = Math.ceil((p / 100) * sorted.length) - 1;
  return sorted[Math.min(Math.max(rank, 0), sorted.length - 1)];
}

function summarize(groupRows, windowSeconds) {
  const elapsed = groupRows.map((r) => Number(r[iElapsed])).sort((a, b) => a - b);
  const errors = groupRows.filter((r) => r[iSuccess] !== "true").length;
  const sum = elapsed.reduce((a, b) => a + b, 0);
  return {
    count: groupRows.length,
    errorRatePct: ((errors / groupRows.length) * 100).toFixed(2),
    avgMs: (sum / groupRows.length).toFixed(1),
    medianMs: percentile(elapsed, 50),
    p90Ms: percentile(elapsed, 90),
    p95Ms: percentile(elapsed, 95),
    p99Ms: percentile(elapsed, 99),
    minMs: elapsed[0],
    maxMs: elapsed[elapsed.length - 1],
    throughputRps: windowSeconds > 0 ? (groupRows.length / windowSeconds).toFixed(2) : "n/a",
  };
}

let windowSeconds = 0;
if (iTimestamp !== -1) {
  const timestamps = rows.map((r) => Number(r[iTimestamp]));
  windowSeconds = (Math.max(...timestamps) - Math.min(...timestamps)) / 1000;
}

const byLabel = {};
for (const r of rows) {
  const label = r[iLabel];
  (byLabel[label] = byLabel[label] || []).push(r);
}

const result = { overall: summarize(rows, windowSeconds), byLabel: {} };
for (const [label, groupRows] of Object.entries(byLabel)) {
  result.byLabel[label] = summarize(groupRows, windowSeconds);
}

console.log(JSON.stringify(result, null, 2));
