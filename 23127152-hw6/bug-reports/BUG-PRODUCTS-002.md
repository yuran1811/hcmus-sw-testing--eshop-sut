# BUG-PRODUCTS-002: Search SQL syntax error returns HTML 500 instead of JSON

## Found by Test Case

TC-A1-023, TC-A1-038, TC-A1-E02, TC-A1-E06

## Requirement liên quan

FR-05 · SEC-05

## Severity / Priority

Major / P1

## Environment

API `http://localhost:3000` · Newman 6.2.2 · macOS · Student 23127152 · 2026-08-19

## Steps to reproduce

1. `GET /api/products?search='` (or `search=%27`).
2. Inspect status code, `Content-Type`, and body.

## Expected result

Malformed search must not crash into a raw database error page. Prefer 400 + JSON `{ "error": "..." }` and parameterized queries so quotes are safe.

## Actual result

HTTP **500**, `Content-Type: text/html`, body:

```html
<h1>Database Error</h1><p>SQLITE_ERROR: unrecognized token: "'"</p>
```

## Evidence

- Newman failures: TC-A1-023, TC-A1-E02
- Saved body: `bug-reports/screenshots/BUG-PRODUCTS-002-body.html`
- CLI log: `postman/screenshots/newman-api1-fr05-cli.txt`
- GitHub Issue: [#295](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/295)

## Root Cause (if known)

Same unsafe concatenation as BUG-PRODUCTS-001; error handler sends HTML via `res.status(500).send(\`<h1>Database Error</h1>...\`)` in `backend/server.js` ~147–149.
