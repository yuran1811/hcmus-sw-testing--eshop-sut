# FR-06 Product Detail Playwright Automation

This package converts the 15 manual Product Detail cases into one externally
parameterized Playwright suite. It is intentionally one feature slice; it does
not claim to satisfy the separate three-feature assignment completion gate.

## Reproduce

From this directory:

```bash
npm ci
npx playwright install chromium firefox webkit
npm run typecheck
npm run validate:data
npm run test:list
npm run test:matrix
```

The Playwright configuration starts the locked backend and frontend packages.
If they have not been installed yet, run `npm ci` once in both `../../backend`
and `../../frontend-web`.

Optional environment variables are `WEB_BASE_URL`, `API_BASE_URL`,
`ESHOP_USER_EMAIL`, `ESHOP_USER_PASSWORD`, and `STUDENT_ID`. Defaults match the
documented local SUT and student ID `23127065`.

The matrix command runs sequentially and writes three independent reports:

- `../../reports/html/product-detail/chromium/`
- `../../reports/html/product-detail/firefox/`
- `../../reports/html/product-detail/webkit/`

It also writes `../../reports/manifests/product-detail.json`, returns nonzero
when any cell fails, and verifies each report's exact visible `Run by:` label.
Legitimate requirement failures remain failed.

Playwright stores its configured title in a compressed payload. The runner also
embeds the same exact title as a persistent visible banner in each `index.html`
before checking the literal text. `npm run verify:reports` opens all three saved
reports in Chromium and independently confirms that each banner is visible.

The implementation follows Playwright's official guidance for
[parameterizing tests](https://playwright.dev/docs/test-parameterize),
[isolated fixtures](https://playwright.dev/docs/api/class-fixtures),
[API request contexts](https://playwright.dev/docs/api/class-apirequestcontext),
and [HTML reporter configuration](https://playwright.dev/docs/test-reporters).
