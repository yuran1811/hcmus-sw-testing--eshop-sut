const fs = require("node:fs");
const path = require("node:path");

const reportsDir = path.resolve(__dirname, "../reports");
const files = fs
  .readdirSync(reportsDir)
  .filter(
    (name) =>
      /_results\.json$/.test(name) &&
      !name.includes("_smoke_") &&
      !name.includes("_special_verify_"),
  )
  .sort();

for (const file of files) {
  const rows = JSON.parse(fs.readFileSync(path.join(reportsDir, file), "utf8"));
  const resultCounts = rows.reduce((counts, row) => {
    counts[row.result] = (counts[row.result] || 0) + 1;
    return counts;
  }, {});
  const categoryCounts = rows.reduce((counts, row) => {
    const category = row.test_id.match(/-(DP|ST|SEC|SC)-/)?.[1] || "OTHER";
    counts[category] ||= { Pass: 0, Fail: 0 };
    counts[category][row.result] = (counts[category][row.result] || 0) + 1;
    return counts;
  }, {});
  const assertions = new Map();
  for (const row of rows) {
    for (const failure of row.failures || []) {
      const name = failure
        .split(": expected")[0]
        .replace(/^FR\d{2}-[A-Z]+-(?:DP|ST|SEC|SC)-\d+\s+/, "")
        .replace(/\s*:\s*\{.*$/, "")
        .trim();
      const entry = assertions.get(name) || { count: 0, ids: [] };
      entry.count += 1;
      if (entry.ids.length < 8) entry.ids.push(row.test_id);
      assertions.set(name, entry);
    }
  }
  console.log(`\n${file}: ${JSON.stringify(resultCounts)}`);
  console.log(`Categories: ${JSON.stringify(categoryCounts)}`);
  for (const [name, entry] of [...assertions].sort((a, b) => b[1].count - a[1].count)) {
    console.log(`${String(entry.count).padStart(3)} | ${name} | ${entry.ids.join(", ")}`);
  }
}
