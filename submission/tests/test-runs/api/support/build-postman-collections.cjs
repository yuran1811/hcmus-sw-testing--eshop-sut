const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const apiRoot = path.resolve(__dirname, "..");

const base64url = (value) => Buffer.from(JSON.stringify(value)).toString("base64url");
const expiredToken = () => {
  const header = base64url({ alg: "HS256", typ: "JWT" });
  const payload = base64url({ id: 2, role: "user", iat: 1, exp: 2 });
  const signature = crypto
    .createHmac("sha256", "super_secret_key_that_should_not_be_here")
    .update(`${header}.${payload}`)
    .digest("base64url");
  return `${header}.${payload}.${signature}`;
};

const suites = [
  {
    folder: "FR04_PUT_api_users_me",
    id: "23127115-0000-4000-8000-000000000004",
    name: "HW06 FR04 - PUT /api/users/me",
    method: "PUT",
    endpoint: "/api/users/me",
    needsAdmin: false,
    followUp: true,
    special: false,
  },
  {
    folder: "FR09_POST_api_apply_coupon",
    id: "23127115-0000-4000-8000-000000000009",
    name: "HW06 FR09 - POST /api/apply-coupon",
    method: "POST",
    endpoint: "/api/apply-coupon",
    needsAdmin: false,
    followUp: false,
    special: true,
  },
  {
    folder: "FR17_POST_api_admin_coupons",
    id: "23127115-0000-4000-8000-000000000017",
    name: "HW06 FR17 - POST /api/admin/coupons",
    method: "POST",
    endpoint: "/api/admin/coupons",
    needsAdmin: true,
    followUp: false,
    special: true,
  },
];

const script = (listen, exec) => ({
  listen,
  script: { type: "text/javascript", exec },
});

const jsonRequest = (method, url, body, headers = []) => ({
  method,
  header: [{ key: "Content-Type", value: "application/json" }, ...headers],
  body: { mode: "raw", raw: body },
  url,
});

const loginItem = (role) => {
  const admin = role === "admin";
  const label = admin ? "admin" : "user";
  const tokenKey = admin ? "adminAuthToken" : "authToken";
  return {
    name: `Login ${label} and store ${tokenKey}`,
    request: jsonRequest(
      "POST",
      "{{baseUrl}}/api/login",
      JSON.stringify(
        {
          email: admin ? "{{adminEmail}}" : "{{userEmail}}",
          password: admin ? "{{adminPassword}}" : "{{userPassword}}",
        },
        null,
        2,
      ),
    ),
    event: [
      script("test", [
        `pm.test('Login ${label} status is 200', () => pm.response.to.have.status(200));`,
        `pm.test('Login ${label} response time is acceptable', () => pm.expect(pm.response.responseTime).to.be.below(Number(pm.environment.get('maxResponseTimeMs') || 2000)));`,
        "let json = {};",
        "try { json = pm.response.json(); } catch (error) { console.error(error); }",
        `pm.test('Login ${label} returns token', () => pm.expect(json.token).to.be.a('string').and.not.empty);`,
        `if (json.token) { pm.environment.set('${tokenKey}', json.token); }`,
        ...(admin
          ? [
              "if (json.token) { const tail = json.token.slice(-1) === 'a' ? 'b' : 'a'; pm.environment.set('tamperedAdminToken', json.token.slice(0, -1) + tail); }",
            ]
          : [
              "if (json.token) { const tail = json.token.slice(-1) === 'a' ? 'b' : 'a'; pm.environment.set('tamperedAuthToken', json.token.slice(0, -1) + tail); }",
            ]),
      ]),
    ],
  };
};

const fixtureResultTests = (label) => [
  "let json = {};",
  "try { json = pm.response.json(); } catch (error) { console.error(error); }",
  `pm.test('${label} status is 200', () => pm.response.to.have.status(200));`,
  `pm.test('${label} reports pass', () => pm.expect(json.pass, JSON.stringify(json)).to.equal(true));`,
];

const fixtureSetupItem = {
  name: "Reset and prepare fixture for iteration",
  event: [
    script("prerequest", [
      "const testId = pm.iterationData.get('test_id');",
      "if (!testId) { throw new Error('test_id is required in iteration data'); }",
      "pm.request.body.raw = JSON.stringify({ test_id: testId });",
      "console.log('[FIXTURE SETUP] ' + testId + ' | ' + pm.iterationData.get('setup'));",
    ]),
    script("test", fixtureResultTests("Fixture setup")),
  ],
  request: jsonRequest("POST", "{{fixtureBaseUrl}}/fixture/setup", "{}"),
};

const mainPreRequest = [
  "const testId = pm.iterationData.get('test_id') || 'UNKNOWN';",
  "if (pm.iterationData.get('main_request_enabled') === false) { console.log('[SKIP MAIN] ' + testId); pm.execution.skipRequest(); }",
  "const authTemplate = pm.iterationData.get('authorization_header');",
  "const resolvedAuth = authTemplate ? pm.variables.replaceIn(String(authTemplate)) : '';",
  "if (resolvedAuth.trim()) { pm.request.headers.upsert({ key: 'Authorization', value: resolvedAuth }); } else { pm.request.headers.remove('Authorization'); }",
  "pm.request.headers.upsert({ key: 'Content-Type', value: String(pm.iterationData.get('content_type') || 'application/json') });",
  "console.log('[DATA] ' + testId + ' | oracle=' + pm.iterationData.get('oracle_basis') + ' | expected=' + pm.iterationData.get('expected_status'));",
];

const mainTests = [
  "const testId = pm.iterationData.get('test_id') || 'UNKNOWN';",
  "const expectedStatus = Number(pm.iterationData.get('expected_status'));",
  "const schema = String(pm.iterationData.get('expected_response_schema'));",
  "pm.test(testId + ' status is exactly ' + expectedStatus, () => pm.response.to.have.status(expectedStatus));",
  "const maxMs = Number(pm.environment.get('maxResponseTimeMs') || 2000);",
  "pm.test(testId + ' response time < ' + maxMs + ' ms', () => pm.expect(pm.response.responseTime).to.be.below(maxMs));",
  "const contentType = String(pm.response.headers.get('Content-Type') || '');",
  "pm.test(testId + ' response Content-Type is JSON', () => pm.expect(contentType.toLowerCase()).to.include('application/json'));",
  "let json = null;",
  "try { json = pm.response.json(); } catch (error) { console.error('[INVALID JSON] ' + testId, error); }",
  "pm.test(testId + ' response body is valid JSON', () => pm.expect(json).to.be.an('object'));",
  "const raw = pm.response.text();",
  "const forbiddenPattern = /(password|passwordhash|reset[_-]?token|access[_-]?token|secret|stack|sqlite|select\s+|insert\s+|update\s+|delete\s+from)/i;",
  "pm.test(testId + ' response exposes no secret, SQL detail, or stack trace', () => pm.expect(raw).not.to.match(forbiddenPattern));",
  "if (json) {",
  "  const keys = Object.keys(json).sort();",
  "  if (schema === 'error_exact' || schema === 'error_required') {",
  "    pm.test(testId + ' error is a non-empty string', () => pm.expect(json.error).to.be.a('string').and.not.empty);",
  "    if (schema === 'error_exact') pm.test(testId + ' error schema is exact', () => pm.expect(keys).to.eql(['error']));",
  "  } else if (schema === 'profile_update_exact' || schema === 'profile_update_required') {",
  "    pm.test(testId + ' message is a non-empty string', () => pm.expect(json.message).to.be.a('string').and.not.empty);",
  "    if (schema === 'profile_update_exact') pm.test(testId + ' success schema is exact', () => pm.expect(keys).to.eql(['message']));",
  "  } else if (schema === 'coupon_success_exact' || schema === 'coupon_success_required') {",
  "    pm.test(testId + ' discount_amount is finite and non-negative', () => { pm.expect(json.discount_amount).to.be.a('number'); pm.expect(Number.isFinite(json.discount_amount)).to.equal(true); pm.expect(json.discount_amount).to.be.at.least(0); });",
  "    pm.test(testId + ' final_amount is finite and non-negative', () => { pm.expect(json.final_amount).to.be.a('number'); pm.expect(Number.isFinite(json.final_amount)).to.equal(true); pm.expect(json.final_amount).to.be.at.least(0); });",
  "    const expectedDiscount = pm.iterationData.get('expected_discount_amount');",
  "    const expectedFinal = pm.iterationData.get('expected_final_amount');",
  "    if (expectedDiscount !== undefined) pm.test(testId + ' discount formula is correct', () => pm.expect(json.discount_amount).to.equal(Number(expectedDiscount)));",
  "    if (expectedFinal !== undefined) pm.test(testId + ' final amount formula is correct', () => pm.expect(json.final_amount).to.equal(Number(expectedFinal)));",
  "    if (schema === 'coupon_success_exact') pm.test(testId + ' coupon success schema is exact', () => pm.expect(keys).to.eql(['discount_amount', 'final_amount']));",
  "  } else if (schema === 'coupon_created_exact' || schema === 'coupon_created_required') {",
  "    pm.test(testId + ' created id is a positive integer', () => { pm.expect(json.id).to.be.a('number'); pm.expect(Number.isInteger(json.id)).to.equal(true); pm.expect(json.id).to.be.above(0); });",
  "    pm.test(testId + ' created message is non-empty', () => pm.expect(json.message).to.be.a('string').and.not.empty);",
  "    if (schema === 'coupon_created_exact') pm.test(testId + ' coupon created schema is exact', () => pm.expect(keys).to.eql(['id', 'message']));",
  "  }",
  "}",
];

const mainItem = (suite) => ({
  name: `Execute iteration - ${suite.method} ${suite.endpoint}`,
  event: [script("prerequest", mainPreRequest), script("test", mainTests)],
  request: {
    method: suite.method,
    header: [
      { key: "Content-Type", value: "{{content_type}}" },
      { key: "Authorization", value: "{{authorization_header}}" },
    ],
    body: { mode: "raw", raw: "{{body_json}}" },
    url: `{{baseUrl}}${suite.endpoint}`,
  },
});

const followUpItem = {
  name: "Execute follow-up/retry PUT when required",
  event: [
    script("prerequest", [
      "const body = pm.iterationData.get('follow_up_body_json');",
      "if (!body) { pm.execution.skipRequest(); }",
      "pm.request.headers.upsert({ key: 'Authorization', value: 'Bearer ' + pm.environment.get('authToken') });",
      "pm.request.body.raw = String(body);",
      "console.log('[FOLLOW-UP] ' + pm.iterationData.get('test_id'));",
    ]),
    script("test", [
      "const testId = pm.iterationData.get('test_id');",
      "const expected = Number(pm.iterationData.get('follow_up_expected_status'));",
      "pm.test(testId + ' follow-up status is ' + expected, () => pm.response.to.have.status(expected));",
      "pm.test(testId + ' follow-up response time is acceptable', () => pm.expect(pm.response.responseTime).to.be.below(Number(pm.environment.get('maxResponseTimeMs') || 2000)));",
    ]),
  ],
  request: jsonRequest("PUT", "{{baseUrl}}/api/users/me", "{}", [
    { key: "Authorization", value: "Bearer {{authToken}}" },
  ]),
};

const specialItem = {
  name: "Execute concurrency or multi-API sequence when required",
  event: [
    script("prerequest", [
      "const sequence = pm.iterationData.get('special_sequence');",
      "if (!sequence) { pm.execution.skipRequest(); }",
      "pm.request.body.raw = JSON.stringify({",
      "  test_id: pm.iterationData.get('test_id'),",
      "  special_sequence: sequence,",
      "  body_json: pm.iterationData.get('body_json'),",
      "  user_token: pm.environment.get('authToken'),",
      "  admin_token: pm.environment.get('adminAuthToken')",
      "});",
      "console.log('[SPECIAL] ' + pm.iterationData.get('test_id') + ' | ' + sequence);",
    ]),
    script("test", fixtureResultTests("Special sequence")),
  ],
  request: jsonRequest("POST", "{{fixtureBaseUrl}}/fixture/special", "{}"),
};

const profileReadItem = {
  name: "Read profile and verify public postcondition",
  event: [
    script("prerequest", [
      "pm.request.headers.upsert({ key: 'Authorization', value: 'Bearer ' + pm.environment.get('authToken') });",
      "console.log('[GET PROFILE] ' + pm.iterationData.get('test_id'));",
    ]),
    script("test", [
      "const testId = pm.iterationData.get('test_id');",
      "pm.test(testId + ' GET profile status is 200', () => pm.response.to.have.status(200));",
      "let json = {}; try { json = pm.response.json(); } catch (error) { console.error(error); }",
      "pm.test(testId + ' GET profile returns authenticated user', () => { pm.expect(json.id).to.equal(2); pm.expect(json.email).to.equal('test@eshop.com'); pm.expect(json.role).to.equal('user'); });",
      "const forbidden = ['password', 'passwordHash', 'reset_token', 'resetToken', 'otp', 'token'];",
      "pm.test(testId + ' GET profile exposes no sensitive field', () => forbidden.forEach((key) => pm.expect(json).not.to.have.property(key)));",
      "const expectedStatus = Number(pm.iterationData.get('expected_status'));",
      "const bodyText = pm.iterationData.get('follow_up_body_json') || pm.iterationData.get('body_json');",
      "let body = {}; try { body = JSON.parse(bodyText); } catch (error) { body = {}; }",
      "const expected = expectedStatus === 200 ? { name: body.name ?? 'Test User', phone: body.phone ?? '0912345678', shipping_address: body.shipping_address ?? 'Seed Address' } : { name: 'Test User', phone: '0912345678', shipping_address: 'Seed Address' };",
      "pm.test(testId + ' GET profile state matches oracle', () => { pm.expect(json.name).to.equal(expected.name); pm.expect(json.phone).to.equal(expected.phone); pm.expect(json.shipping_address).to.equal(expected.shipping_address); });",
    ]),
  ],
  request: {
    method: "GET",
    header: [{ key: "Authorization", value: "Bearer {{authToken}}" }],
    url: "{{baseUrl}}/api/users/me",
  },
};

const couponListItem = {
  name: "List coupons and verify API-visible postcondition",
  event: [
    script("prerequest", [
      "pm.request.headers.upsert({ key: 'Authorization', value: 'Bearer ' + pm.environment.get('adminAuthToken') });",
      "console.log('[GET COUPONS] ' + pm.iterationData.get('test_id'));",
    ]),
    script("test", [
      "const testId = pm.iterationData.get('test_id');",
      "pm.test(testId + ' GET coupons status is 200', () => pm.response.to.have.status(200));",
      "let rows = null; try { rows = pm.response.json(); } catch (error) { console.error(error); }",
      "pm.test(testId + ' GET coupons returns an array', () => pm.expect(rows).to.be.an('array'));",
      "if (Array.isArray(rows)) {",
      "  const body = JSON.parse(pm.iterationData.get('body_json'));",
      "  const matching = rows.filter((coupon) => coupon.code === body.code);",
      "  const seedCodes = ['SAVE10', 'BIGBUY', 'VIP100', 'EXPIRED'];",
      "  const expectedCount = seedCodes.includes(body.code) || Number(pm.iterationData.get('expected_status')) === 201 ? 1 : 0;",
      "  pm.test(testId + ' API list has expected code cardinality', () => pm.expect(matching.length).to.equal(expectedCount));",
      "}",
    ]),
  ],
  request: {
    method: "GET",
    header: [{ key: "Authorization", value: "Bearer {{adminAuthToken}}" }],
    url: "{{baseUrl}}/api/coupons",
  },
};

const stateItem = {
  name: "Verify database postconditions",
  event: [
    script("prerequest", [
      "pm.request.body.raw = JSON.stringify({",
      "  test_id: pm.iterationData.get('test_id'),",
      "  body_json: pm.iterationData.get('body_json'),",
      "  expected_status: pm.iterationData.get('expected_status'),",
      "  follow_up_body_json: pm.iterationData.get('follow_up_body_json') || null",
      "});",
      "console.log('[STATE VERIFY] ' + pm.iterationData.get('test_id') + ' | ' + pm.iterationData.get('expected_state'));",
    ]),
    script("test", [
      ...fixtureResultTests("State verification"),
      "if (json.checks) { json.checks.filter((check) => !check.pass).forEach((check) => console.error('[STATE FAIL] ' + check.name + ' | ' + check.details)); }",
    ]),
  ],
  request: jsonRequest("POST", "{{fixtureBaseUrl}}/fixture/state", "{}"),
};

const teardownItem = {
  name: "Teardown iteration fixture",
  event: [
    script("prerequest", [
      "pm.request.body.raw = JSON.stringify({ test_id: pm.iterationData.get('test_id') });",
      "console.log('[FIXTURE TEARDOWN] ' + pm.iterationData.get('test_id'));",
    ]),
    script("test", fixtureResultTests("Fixture teardown")),
  ],
  request: jsonRequest("POST", "{{fixtureBaseUrl}}/fixture/teardown", "{}"),
};

for (const suite of suites) {
  const setupItems = [loginItem("user")];
  if (suite.needsAdmin) setupItems.push(loginItem("admin"));
  setupItems.push(fixtureSetupItem);

  const executionItems = [mainItem(suite)];
  if (suite.followUp) executionItems.push(followUpItem);
  if (suite.special) executionItems.push(specialItem);
  if (suite.folder.startsWith("FR04")) executionItems.push(profileReadItem);
  if (suite.folder.startsWith("FR17")) executionItems.push(couponListItem);
  executionItems.push(stateItem, teardownItem);

  const collection = {
    info: {
      _postman_id: suite.id,
      name: suite.name,
      description: `Data-driven execution-ready collection for ${suite.folder}. Includes isolated fixture setup, exact status/schema assertions, state verification and teardown.`,
      schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
    },
    event: [
      script("prerequest", [
        "const studentId = pm.environment.get('studentId');",
        "if (!studentId) { throw new Error('Environment variable studentId is required'); }",
        "pm.request.headers.upsert({ key: 'X-Student-Id', value: String(studentId) });",
        "console.log('[X-Student-Id] Header set = ' + studentId + ' | Request: ' + pm.info.requestName + ' | URL: ' + pm.request.url.toString());",
      ]),
    ],
    item: [
      { name: "00 Authentication and fixture setup", item: setupItems },
      { name: "10 Main and special execution", item: executionItems },
    ],
  };

  const output = path.join(apiRoot, suite.folder, `${suite.folder}.postman_collection.json`);
  fs.writeFileSync(output, `${JSON.stringify(collection, null, 2)}\n`, "utf8");
}

const environmentPath = path.join(apiRoot, "local.postman_environment.json");
const environment = JSON.parse(fs.readFileSync(environmentPath, "utf8"));
const fixtureVariable = environment.values.find((item) => item.key === "fixtureBaseUrl");
if (fixtureVariable) fixtureVariable.value = "http://127.0.0.1:3001";
else {
  environment.values.splice(1, 0, {
    key: "fixtureBaseUrl",
    value: "http://127.0.0.1:3001",
    type: "default",
    enabled: true,
  });
}
const expiredVariable = environment.values.find((item) => item.key === "expiredAuthToken");
if (!expiredVariable) throw new Error("expiredAuthToken is missing from local environment");
expiredVariable.value = expiredToken();
fs.writeFileSync(environmentPath, `${JSON.stringify(environment, null, 2)}\n`, "utf8");

console.log("Built three execution-ready Postman collections and updated the local environment.");
