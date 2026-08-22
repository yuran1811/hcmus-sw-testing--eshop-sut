const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const newman = require("newman");

const apiRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(apiRoot, "../../../..");
const reportsRoot = path.join(apiRoot, "reports");
const environmentPath = path.join(apiRoot, "local.postman_environment.json");
const smokeMode = process.argv.includes("--smoke");
const specialVerificationMode = process.argv.includes("--verify-special");
const sutPort = Number(process.env.API_TEST_PORT || 3100);
const sutBaseUrl = `http://127.0.0.1:${sutPort}`;
const suites = [
  "FR04_PUT_api_users_me",
  "FR09_POST_api_apply_coupon",
  "FR17_POST_api_admin_coupons",
];

const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

const identifyFixture = async () => {
  try {
    const response = await fetch("http://127.0.0.1:3001/health");
    if (!response.ok) return false;
    const body = await response.json();
    return body.service === "hw06-api-fixture";
  } catch {
    return false;
  }
};

const waitForFixture = async (timeoutMs = 30000) => {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    if (await identifyFixture()) return;
    await sleep(250);
  }
  throw new Error(
    "Port 3001 did not expose the HW06 fixture service. Stop the conflicting service before retrying.",
  );
};

const identifySut = async () => {
  try {
    const response = await fetch(`${sutBaseUrl}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Student-Id": "23127115",
      },
      body: JSON.stringify({ email: "test@eshop.com", password: "Test1234!" }),
    });
    if (response.status !== 200) return false;
    const body = await response.json();
    return typeof body.token === "string" && body.token.split(".").length === 3;
  } catch {
    return false;
  }
};

const waitForSut = async (timeoutMs = 30000) => {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    if (await identifySut()) return;
    await sleep(250);
  }
  throw new Error(
    `Port ${sutPort} did not expose the expected EShop SUT. Stop the conflicting service or verify backend/server.js can bind to ${sutBaseUrl}.`,
  );
};

const startProcess = (command, args, cwd, label, extraEnv = {}) => {
  const child = spawn(command, args, {
    cwd,
    env: { ...process.env, ...extraEnv },
    stdio: ["ignore", "pipe", "pipe"],
    windowsHide: true,
  });
  child.stdout.on("data", (chunk) => process.stdout.write(`[${label}] ${chunk}`));
  child.stderr.on("data", (chunk) => process.stderr.write(`[${label}] ${chunk}`));
  return child;
};

const runNewman = (suite) =>
  new Promise((resolve, reject) => {
    const suiteRoot = path.join(apiRoot, suite);
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const reportBase = path.join(
      reportsRoot,
      `${suite}${smokeMode ? "_smoke" : specialVerificationMode ? "_special_verify" : ""}_${timestamp}`,
    );
    const dataPath = path.join(suiteRoot, `${suite}_data_driven.json`);
    const allRows = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    const iterationData = smokeMode
      ? [allRows[0]]
      : specialVerificationMode
        ? allRows.filter((row) => row.execution_mode !== "normal")
        : dataPath;
    const environment = JSON.parse(fs.readFileSync(environmentPath, "utf8"));
    environment.values.find((item) => item.key === "baseUrl").value = sutBaseUrl;
    newman.run(
      {
        collection: path.join(suiteRoot, `${suite}.postman_collection.json`),
        environment,
        iterationData,
        reporters: ["cli", "json", "htmlextra"],
        reporter: {
          json: { export: `${reportBase}.json` },
          htmlextra: {
            export: `${reportBase}.html`,
            title: `HW06 API Test Report - ${suite}`,
            showOnlyFails: false,
            skipSensitiveData: true,
          },
        },
        timeoutRequest: 10000,
        timeoutScript: 15000,
        color: "on",
      },
      (error, summary) => {
        if (error) return reject(error);
        const failures = summary.run.failures || [];
        const rows = Array.isArray(iterationData) ? iterationData : allRows;
        const iterationResults = buildIterationResults({ rows, failures });
        fs.writeFileSync(
          `${reportBase}_results.json`,
          `${JSON.stringify(iterationResults, null, 2)}\n`,
          "utf8",
        );
        resolve({ suite, failures, reportBase, summary, rows, iterationResults });
      },
    );
  });

const stop = (child) => {
  if (child && !child.killed) child.kill("SIGTERM");
};

const cleanFailure = (failure) => {
  const assertion = failure.error?.test || failure.error?.name || "Execution error";
  const message = failure.error?.message || String(failure.error || "Unknown failure");
  return `${assertion}: ${message}`.replace(/\s+/g, " ").trim();
};

const buildIterationResults = ({ rows, failures }) => {
  const globalFailures = failures.filter((failure) => !Number.isInteger(failure.cursor?.iteration));
  return rows.map((row, iteration) => {
    const rowFailures = failures
      .filter((failure) => failure.cursor?.iteration === iteration)
      .concat(globalFailures)
      .map(cleanFailure);
    return {
      test_id: row.test_id,
      result: rowFailures.length === 0 ? "Pass" : "Fail",
      failures: rowFailures,
    };
  });
};

const updateTestRun = (suite, iterationResults) => {
  const testRunPath = path.join(apiRoot, suite, `${suite}_test_run.md`);
  let markdown = fs.readFileSync(testRunPath, "utf8");
  const byId = new Map(iterationResults.map((item) => [item.test_id, item]));
  let updatedRows = 0;

  markdown = markdown
    .split(/\r?\n/)
    .map((line) => {
      if (!line.startsWith("| ") || line.includes("Test Case ID")) return line;
      const cells = line
        .split("|")
        .slice(1, -1)
        .map((cell) => cell.trim());
      const execution = byId.get(cells[0]);
      if (!execution) return line;

      cells[3] = execution.result;
      cells[4] = "";
      if (execution.failures.length > 0) {
        const details = execution.failures.join(" / ").replace(/\|/g, "\\|");
        cells[5] = `${cells[5].replace(/<br>Execution:.*/, "")}<br>Execution: ${details}`;
      } else {
        cells[5] = cells[5].replace(/<br>Execution:.*/, "");
      }
      updatedRows += 1;
      return `| ${cells.join(" | ")} |`;
    })
    .join("\n");

  if (updatedRows !== iterationResults.length) {
    throw new Error(`${suite}: updated ${updatedRows}/${iterationResults.length} test-run rows`);
  }

  const pass = iterationResults.filter((item) => item.result === "Pass").length;
  const fail = iterationResults.length - pass;
  const runDate = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Ho_Chi_Minh",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
  markdown = markdown.replace(
    /^- \*\*(Ngày kiểm thử \(Test Date\)|Test Date):\*\*.*$/m,
    `- **Ngày kiểm thử (Test Date):** ${runDate}`,
  );
  markdown = markdown.replace(
    /^- \*\*Trạng thái:\*\*.*$/m,
    `- **Trạng thái:** Đã chạy - Pass ${pass}, Fail ${fail}`,
  );
  fs.writeFileSync(testRunPath, `${markdown.replace(/\s+$/, "")}\n`, "utf8");
};

const main = async () => {
  fs.mkdirSync(reportsRoot, { recursive: true });
  console.log(
    `[runner] Mode: ${smokeMode ? "smoke (first case per suite)" : specialVerificationMode ? "special verification" : "full (145 cases)"}`,
  );
  const owned = [];
  try {
    if (!(await identifySut())) {
      owned.push(
        startProcess(
          process.execPath,
          ["-e", "require('./server.js'); setInterval(() => {}, 2147483647)"],
          path.join(repoRoot, "backend"),
          "sut",
          { PORT: String(sutPort) },
        ),
      );
    } else {
      console.log(`[runner] Reusing verified EShop SUT already listening on port ${sutPort}`);
    }
    await waitForSut();

    if (!(await identifyFixture())) {
      owned.push(
        startProcess(
          process.execPath,
          [path.join(apiRoot, "support/fixture-server.cjs")],
          repoRoot,
          "fixture",
          { SUT_BASE_URL: sutBaseUrl },
        ),
      );
    } else {
      console.log("[runner] Reusing fixture service already listening on port 3001");
    }
    await waitForFixture();

    const results = [];
    for (const suite of suites) {
      console.log(`\n[runner] Running ${suite}`);
      results.push(await runNewman(suite));
    }

    const totalFailures = results.reduce((sum, result) => sum + result.failures.length, 0);
    console.log("\n[runner] Reports:");
    for (const result of results) {
      console.log(`  ${result.suite}: ${result.failures.length} failure(s)`);
      console.log(`    ${result.reportBase}.html`);
      console.log(`    ${result.reportBase}.json`);
      console.log(`    ${result.reportBase}_results.json`);
      if (!smokeMode && !specialVerificationMode) {
        updateTestRun(result.suite, result.iterationResults);
      }
    }
    process.exitCode = totalFailures > 0 ? 1 : 0;
  } finally {
    for (const child of owned.reverse()) stop(child);
  }
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
