const fs = require("fs");
const path = require("path");

const apiRoot = path.resolve(__dirname, "..");
const testCaseRoot = path.resolve(apiRoot, "../../test-cases/api");
const suites = {
  FR04_PUT_api_users_me: 51,
  FR09_POST_api_apply_coupon: 46,
  FR17_POST_api_admin_coupons: 48,
};
const requiredRequests = [
  "Login",
  "Reset and prepare fixture",
  "Execute iteration",
  "Verify database postconditions",
  "Teardown iteration fixture",
];

const fail = (message) => {
  throw new Error(message);
};

const requestNames = (items, names = []) => {
  for (const item of items || []) {
    if (item.request) names.push(item.name);
    if (item.item) requestNames(item.item, names);
  }
  return names;
};

const scripts = (collection) => {
  const found = [];
  const visit = (node) => {
    for (const event of node.event || []) {
      found.push({ name: node.name || "collection", code: (event.script?.exec || []).join("\n") });
    }
    for (const item of node.item || []) visit(item);
  };
  visit(collection);
  return found;
};

const allIds = new Set();
for (const [suite, expectedCount] of Object.entries(suites)) {
  const suiteRoot = path.join(apiRoot, suite);
  const data = JSON.parse(
    fs.readFileSync(path.join(suiteRoot, `${suite}_data_driven.json`), "utf8"),
  );
  if (data.length !== expectedCount) {
    fail(`${suite}: expected ${expectedCount} data rows, found ${data.length}`);
  }

  const dataIds = new Set();
  for (const row of data) {
    if (!row.test_id || dataIds.has(row.test_id) || allIds.has(row.test_id)) {
      fail(`${suite}: missing or duplicate test_id ${row.test_id}`);
    }
    dataIds.add(row.test_id);
    allIds.add(row.test_id);
    if (!Number.isInteger(row.expected_status)) {
      fail(`${row.test_id}: expected_status must be an integer`);
    }
    if (row.expected_status_class === "observe") {
      fail(`${row.test_id}: observe oracle is not executable`);
    }
    for (const key of [
      "oracle_basis",
      "expected_response_schema",
      "expected_state",
      "execution_mode",
    ]) {
      if (typeof row[key] !== "string" || row[key].trim() === "") {
        fail(`${row.test_id}: missing ${key}`);
      }
    }

    const testCasePath = path.join(testCaseRoot, suite, `${row.test_id}.md`);
    if (!fs.existsSync(testCasePath)) fail(`${row.test_id}: test-case file missing`);
    const testCase = fs.readFileSync(testCasePath, "utf8");
    const expectedBlock = testCase.match(
      /## Expected result\s+([\s\S]*?)\s+## Status \/ Related bugs/,
    )?.[1];
    if (!expectedBlock || !new RegExp(`HTTP ${row.expected_status}\\b`).test(expectedBlock)) {
      fail(`${row.test_id}: Markdown expected result does not match data oracle`);
    }
    if (!testCase.includes("Fixture service")) {
      fail(`${row.test_id}: fixture precondition missing`);
    }
  }

  const testCaseIds = new Set(
    fs
      .readdirSync(path.join(testCaseRoot, suite))
      .filter((name) => name.endsWith(".md"))
      .map((name) => path.basename(name, ".md")),
  );
  if (testCaseIds.size !== dataIds.size || [...dataIds].some((id) => !testCaseIds.has(id))) {
    fail(`${suite}: test-case files and iteration data are not one-to-one`);
  }

  const testRun = fs.readFileSync(path.join(suiteRoot, `${suite}_test_run.md`), "utf8");
  const runIds = new Set(
    [...testRun.matchAll(/^\|\s+(FR\d{2}-[^|\s]+)\s+\|/gm)].map((match) => match[1]),
  );
  if (runIds.size !== dataIds.size || [...dataIds].some((id) => !runIds.has(id))) {
    fail(`${suite}: test-run rows and iteration data are not one-to-one`);
  }

  const collection = JSON.parse(
    fs.readFileSync(path.join(suiteRoot, `${suite}.postman_collection.json`), "utf8"),
  );
  const preRequestScript = (collection.event || [])
    .filter((event) => event.listen === "prerequest")
    .flatMap((event) => event.script?.exec || [])
    .join("\n");
  if (!preRequestScript.includes("X-Student-Id") || !preRequestScript.includes("studentId")) {
    fail(`${suite}: collection-level X-Student-Id pre-request script missing`);
  }
  const names = requestNames(collection.item);
  for (const required of requiredRequests) {
    if (!names.some((name) => name.includes(required))) {
      fail(`${suite}: required request step missing: ${required}`);
    }
  }
  for (const script of scripts(collection)) {
    if (script.code.includes("pm.test.skip")) {
      fail(`${suite}: skipped assertion found in ${script.name}`);
    }
    try {
      new Function(script.code);
    } catch (error) {
      fail(`${suite}: invalid Postman script in ${script.name}: ${error.message}`);
    }
  }
}

if (allIds.size !== 145) fail(`Expected 145 globally unique test IDs, found ${allIds.size}`);

const environment = JSON.parse(
  fs.readFileSync(path.join(apiRoot, "local.postman_environment.json"), "utf8"),
);
const environmentKeys = new Set(environment.values.map((item) => item.key));
for (const key of ["baseUrl", "fixtureBaseUrl", "studentId"]) {
  if (!environmentKeys.has(key)) fail(`Environment variable missing: ${key}`);
}
const studentId = environment.values.find((item) => item.key === "studentId")?.value;
if (String(studentId) !== "23127115") fail("Environment studentId must be 23127115");

console.log("Validated 145/145 API cases, data rows, test-run rows and Postman setup.");
