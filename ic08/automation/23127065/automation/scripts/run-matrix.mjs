import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ensureVisibleReportLabel } from "./report-label.mjs";

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repositoryRoot = path.resolve(packageRoot, "../..");
const playwrightBin = path.join(packageRoot, "node_modules/.bin/playwright");
const browsers = ["chromium", "firefox", "webkit"];
const studentId = process.env.STUDENT_ID ?? "23127065";
const resultRoot = path.join(repositoryRoot, "reports/results/product-detail");
const manifestPath = path.join(repositoryRoot, "reports/manifests/product-detail.json");

fs.mkdirSync(resultRoot, { recursive: true });
fs.mkdirSync(path.dirname(manifestPath), { recursive: true });

function collectTests(suites, accumulator = []) {
  for (const suite of suites ?? []) {
    for (const spec of suite.specs ?? []) {
      for (const test of spec.tests ?? []) {
        accumulator.push({ title: spec.title, test });
      }
    }
    collectTests(suite.suites, accumulator);
  }
  return accumulator;
}

function classifyFailure(message, jsonExists) {
  if (/Invalid Product Detail dataset/i.test(message)) return "invalid data";
  if (
    /ECONNREFUSED|ERR_CONNECTION_REFUSED|Executable doesn't exist|browserType\.launch|Environment failure/i.test(
      message,
    )
  ) {
    return "environment failure";
  }
  if (
    /Automation defect|Cannot find module|SyntaxError|ReferenceError|TypeError|TransformError/i.test(
      message,
    )
  ) {
    return "automation defect";
  }
  return jsonExists ? "product defect" : "environment failure";
}

const cells = [];
for (const browser of browsers) {
  const reportPath = path.join(repositoryRoot, "reports/html/product-detail", browser);
  const resultPath = path.join(resultRoot, `${browser}.json`);
  const logPath = path.join(resultRoot, `${browser}.log`);
  const label = `Run by: ${studentId} | Product Detail | ${browser}`;
  process.stdout.write(`\nRunning Product Detail on ${browser}...\n`);

  const result = spawnSync(
    playwrightBin,
    ["test", "--project", browser],
    {
      cwd: packageRoot,
      encoding: "utf8",
      env: {
        ...process.env,
        STUDENT_ID: studentId,
        PW_BROWSER: browser,
        PW_HTML_REPORT_DIR: reportPath,
        PW_JSON_REPORT_PATH: resultPath,
      },
      maxBuffer: 64 * 1024 * 1024,
    },
  );

  const combinedOutput = `${result.stdout ?? ""}${result.stderr ?? ""}`;
  fs.writeFileSync(logPath, combinedOutput);
  process.stdout.write(result.stdout ?? "");
  process.stderr.write(result.stderr ?? "");

  let tests = [];
  let parseError;
  if (fs.existsSync(resultPath)) {
    try {
      const report = JSON.parse(fs.readFileSync(resultPath, "utf8"));
      tests = collectTests(report.suites);
    } catch (error) {
      parseError = error instanceof Error ? error.message : String(error);
    }
  }

  const failures = tests
    .filter(({ test }) => test.status !== "expected" && test.status !== "skipped")
    .map(({ title, test }) => {
      const message = (test.results ?? [])
        .flatMap((attempt) => attempt.errors ?? [])
        .map((error) => error.message ?? String(error))
        .join("\n");
      return {
        caseId: title.match(/TC-PRODUCT-DETAIL-\d{3}/)?.[0] ?? "unknown",
        title,
        classification: classifyFailure(message, true),
        message: message.split("\n")[0] ?? "Test failed",
      };
    });

  if (tests.length === 0 && result.status !== 0) {
    failures.push({
      caseId: "discovery",
      title: "Playwright discovery or startup",
      classification: classifyFailure(`${parseError ?? ""}\n${combinedOutput}`, false),
      message: parseError ?? combinedOutput.split("\n").find(Boolean) ?? "No JSON result",
    });
  }

  const reportIndex = path.join(reportPath, "index.html");
  const labelVerified = ensureVisibleReportLabel(reportIndex, label);
  const passed = tests.filter(({ test }) => test.status === "expected").length;
  const skipped = tests.filter(({ test }) => test.status === "skipped").length;
  const failed = tests.length - passed - skipped;
  const cell = {
    feature: "Product Detail",
    browser,
    exitStatus: result.status ?? 1,
    counts: { total: tests.length, passed, failed, skipped },
    reportPath: path.relative(repositoryRoot, reportPath),
    resultPath: path.relative(repositoryRoot, resultPath),
    logPath: path.relative(repositoryRoot, logPath),
    expectedLabel: label,
    labelVerified,
    failures,
  };
  cells.push(cell);
  process.stdout.write(
    `Cell summary: ${browser} exit=${cell.exitStatus} pass=${passed} fail=${failed} ` +
      `report=${cell.reportPath} label=${labelVerified ? "verified" : "missing"}\n`,
  );
}

const manifest = {
  generatedAt: new Date().toISOString(),
  studentId,
  feature: "Product Detail",
  logicalCases: 15,
  expectedExecutions: 45,
  cells,
  overallExitStatus: cells.some(
    (cell) => cell.exitStatus !== 0 || !cell.labelVerified || cell.counts.total !== 15,
  )
    ? 1
    : 0,
};
fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

process.stdout.write(`\nMatrix manifest: ${path.relative(repositoryRoot, manifestPath)}\n`);
for (const cell of cells) {
  process.stdout.write(
    `${cell.browser}: ${cell.counts.passed} passed, ${cell.counts.failed} failed, ` +
      `${cell.counts.skipped} skipped; ${cell.reportPath}\n`,
  );
}
process.exitCode = manifest.overallExitStatus;
