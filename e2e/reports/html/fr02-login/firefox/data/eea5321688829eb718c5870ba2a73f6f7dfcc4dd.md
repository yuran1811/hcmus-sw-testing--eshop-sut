# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: fr02-login.spec.ts >> FR-02 Login & Account Lockout (12 cases) >> FR02-01: Wrong login attempt 2 — account not locked
- Location: tests/fr02-login.spec.ts:156:9

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 2
Received: 3
```

# Test source

```ts
  5   |   readAccountState,
  6   |   seedAccountState,
  7   | } from "../src/helpers/account-state";
  8   | import {
  9   |   dataPath,
  10  |   loadFeatureData,
  11  |   resolveEmail,
  12  | } from "../src/helpers/load-test-data";
  13  | import { LoginPage } from "../src/pages/LoginPage";
  14  | import { StepAction, TestCaseRecord } from "../src/types";
  15  | 
  16  | const data = loadFeatureData(dataPath("test-data/fr02-login.json"));
  17  | const TRACKED_EMAIL = data.defaultUser.email;
  18  | 
  19  | async function settleLoginResponse(
  20  |   page: Page,
  21  |   loginPage: LoginPage,
  22  | ): Promise<void> {
  23  |   await Promise.race([
  24  |     page
  25  |       .waitForURL((url) => !url.pathname.includes("/login"), { timeout: 5000 })
  26  |       .catch(() => undefined),
  27  |     loginPage.errorBanner
  28  |       .waitFor({ state: "visible", timeout: 5000 })
  29  |       .catch(() => undefined),
  30  |     page.waitForLoadState("networkidle").catch(() => undefined),
  31  |   ]);
  32  | }
  33  | 
  34  | async function applyExpectations(
  35  |   page: Page,
  36  |   loginPage: LoginPage,
  37  |   testCase: TestCaseRecord,
  38  |   baselineAttempts: number,
  39  | ): Promise<void> {
  40  |   const exp = testCase.expectations;
  41  | 
  42  |   // Assertion pattern 1 — URL / navigation
  43  |   if (exp.urlPath) {
  44  |     await expect(page).toHaveURL(new RegExp(`${exp.urlPath.replace("/", "\\/")}(?:\\?.*)?$`));
  45  |   }
  46  | 
  47  |   // Assertion pattern 2 — visibility / text of error
  48  |   if (exp.outcome === "success") {
  49  |     await expect(loginPage.errorBanner).toBeHidden();
  50  |   } else if (exp.errorContains) {
  51  |     await expect(loginPage.errorBanner).toBeVisible();
  52  |     await expect(loginPage.errorBanner).toContainText(exp.errorContains, {
  53  |       ignoreCase: true,
  54  |     });
  55  |   } else if (exp.outcome === "failure" || exp.outcome === "locked") {
  56  |     await expect(loginPage.errorBanner).toBeVisible();
  57  |   } else if (exp.outcome === "validation") {
  58  |     // HTML5 required / client validation: stay on login, no token
  59  |     await expect(page).toHaveURL(/\/login/);
  60  |   }
  61  | 
  62  |   if (exp.errorKind === "format") {
  63  |     await expect(loginPage.errorBanner).toBeVisible();
  64  |     const text = (await loginPage.errorBanner.textContent()) ?? "";
  65  |     expect(
  66  |       /định dạng|format|invalid|quá dài|max|length|email/i.test(text),
  67  |       `Expected format-related error, got: "${text}"`,
  68  |     ).toBe(true);
  69  |   }
  70  | 
  71  |   if (exp.errorKind === "lock" || exp.outcome === "locked") {
  72  |     const text = (await loginPage.errorBanner.textContent()) ?? "";
  73  |     expect(
  74  |       /khóa|locked|lock/i.test(text),
  75  |       `Expected lock-related error, got: "${text}"`,
  76  |     ).toBe(true);
  77  |   }
  78  | 
  79  |   // Assertion pattern 3 — localStorage token value
  80  |   const token = await loginPage.getTokenFromStorage();
  81  |   if (exp.tokenPresent) {
  82  |     expect(token, "Expected JWT token in localStorage").toBeTruthy();
  83  |   } else {
  84  |     expect(token, "Expected no JWT token in localStorage").toBeFalsy();
  85  |   }
  86  | 
  87  |   // Assertion pattern 4 — DB state (attempts / lock)
  88  |   if (
  89  |     exp.loginAttempts !== undefined ||
  90  |     exp.isLocked !== undefined ||
  91  |     exp.loginAttemptsUnchanged
  92  |   ) {
  93  |     // Allow async DB write from the API to settle
  94  |     await expect
  95  |       .poll(async () => (await readAccountState(TRACKED_EMAIL)).login_attempts, {
  96  |         timeout: 3000,
  97  |       })
  98  |       .toEqual(expect.any(Number));
  99  |     const state = await readAccountState(TRACKED_EMAIL);
  100 | 
  101 |     if (exp.loginAttemptsUnchanged) {
  102 |       expect(state.login_attempts).toBe(baselineAttempts);
  103 |     }
  104 |     if (exp.loginAttempts !== undefined) {
> 105 |       expect(state.login_attempts).toBe(exp.loginAttempts);
      |                                    ^ Error: expect(received).toBe(expected) // Object.is equality
  106 |     }
  107 |     if (exp.isLocked !== undefined) {
  108 |       expect(isCurrentlyLocked(state.locked_until)).toBe(exp.isLocked);
  109 |     }
  110 |   }
  111 | }
  112 | 
  113 | async function runStep(
  114 |   page: Page,
  115 |   loginPage: LoginPage,
  116 |   testCase: TestCaseRecord,
  117 |   step: StepAction,
  118 | ): Promise<void> {
  119 |   const email = resolveEmail(testCase.inputs);
  120 |   const password = testCase.inputs.password ?? "";
  121 | 
  122 |   switch (step) {
  123 |     case "login": {
  124 |       await loginPage.goto();
  125 |       await loginPage.clearClientAuth();
  126 |       await loginPage.login(email, password);
  127 |       await settleLoginResponse(page, loginPage);
  128 |       break;
  129 |     }
  130 |     case "logout": {
  131 |       await loginPage.logoutIfVisible();
  132 |       await loginPage.clearClientAuth();
  133 |       await loginPage.goto();
  134 |       break;
  135 |     }
  136 |     case "loginWrongFollowUp": {
  137 |       const followUp =
  138 |         testCase.inputs.followUpPassword ??
  139 |         (() => {
  140 |           throw new Error(`${testCase.id}: missing followUpPassword`);
  141 |         })();
  142 |       await loginPage.goto();
  143 |       await loginPage.login(email, followUp);
  144 |       await settleLoginResponse(page, loginPage);
  145 |       break;
  146 |     }
  147 |     default: {
  148 |       const _exhaustive: never = step;
  149 |       throw new Error(`Unknown step action: ${_exhaustive}`);
  150 |     }
  151 |   }
  152 | }
  153 | 
  154 | test.describe(`FR-02 Login & Account Lockout (${data.cases.length} cases)`, () => {
  155 |   for (const testCase of data.cases) {
  156 |     test(`${testCase.id}: ${testCase.title}`, async ({ page }) => {
  157 |       // Fixture setup — seed DB to match case preconditions
  158 |       await seedAccountState(TRACKED_EMAIL, {
  159 |         loginAttempts: testCase.preconditions.loginAttempts,
  160 |         lockedUntilOffsetMs: testCase.preconditions.lockedUntilOffsetMs,
  161 |       });
  162 |       const baseline = await readAccountState(TRACKED_EMAIL);
  163 |       const baselineAttempts = baseline.login_attempts;
  164 | 
  165 |       const loginPage = new LoginPage(page);
  166 | 
  167 |       for (const step of testCase.steps) {
  168 |         await runStep(page, loginPage, testCase, step);
  169 |       }
  170 | 
  171 |       await applyExpectations(page, loginPage, testCase, baselineAttempts);
  172 |     });
  173 |   }
  174 | });
  175 | 
  176 | // Ensure data file path is discoverable in failure messages
  177 | test.afterAll(() => {
  178 |   // no-op marker for report context
  179 |   void path.basename(dataPath("test-data/fr02-login.json"));
  180 | });
  181 | 
```