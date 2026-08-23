# CI/CD Report — HW06 API Testing

**Student ID:** 23127152  
**Pipeline:** GitHub Actions + Newman  
**Date:** 2026-08-19

---

## 1. Pipeline Configuration

**Workflow file:** [`.github/workflows/hw06-api-tests.yml`](../../.github/workflows/hw06-api-tests.yml)

**Trigger:** `push` / `pull_request` on `hw6/23127152` (paths: `23127152-hw6/**`, `backend/**`, workflow file) + `workflow_dispatch`.

**Job steps (summary):**

1. Checkout repository  
2. Setup Node.js 20  
3. `npm install` in `backend/`  
4. Start SUT: `node server.js` in background (`127.0.0.1:3000`)  
5. Wait until `GET /api/products` succeeds  
6. Install `newman` + `newman-reporter-htmlextra`  
7. Run folder **`CI Smoke — Must Pass`** (green happy-path suite; full SEC negative suite stays local/Phase 1–3)  
8. Upload HTML artifact `newman-ci-smoke-report`  
9. Every request still carries `X-Student-Id: 23127152` via collection pre-request  

```yaml
# Key Newman invocation (from workflow)
newman run postman/EShop-HW06.postman_collection.json \
  -e postman/EShop-HW06.postman_environment.json \
  --folder "CI Smoke — Must Pass" \
  --env-var "baseUrl=http://127.0.0.1:3000" \
  --env-var "studentId=23127152" \
  -r cli,htmlextra \
  --reporter-htmlextra-export postman/reports/newman-ci-smoke.html
```

`ciExpectStatus` is read from the Postman environment (default **200**). The intentional-fail sample set it to **201** so CI-01 expects the wrong status.

---

## 2. Sample Run — All Passing

| Item | Value |
|------|-------|
| Commit SHA | `8b44b66` |
| Commit message | `hw06/cicd-github-actions` |
| Pipeline URL | https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/actions/runs/32269053058 |
| Result | ✅ success — all CI Smoke assertions passed |
| Screenshot | [`cicd/screenshots/run-all-pass.png`](../cicd/screenshots/run-all-pass.png) (Actions UI) · log: `run-all-pass-log.txt` |

CI Smoke: 4 requests · 9 assertions · 0 failed. Backend booted on Actions runner; Newman talked to real SUT on `127.0.0.1:3000`.

---

## 3. Sample Run — One Test Failing

| Item | Value |
|------|-------|
| Commit SHA | `2fe51ee` |
| Commit message | `hw06/cicd-intentional-fail-v2` |
| Pipeline URL | https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/actions/runs/32269286455 |
| Result | ❌ failure |
| Failed test | **CI-01 status** — expected **201**, got **200** |
| Screenshot | [`cicd/screenshots/run-one-fail.png`](../cicd/screenshots/run-one-fail.png) (Actions UI) · log: `run-one-fail-log.txt` |

**Why intentional:** demonstrate a red pipeline by changing only the expected status for CI-01 (`ciExpectStatus=201` / expect 201), not by breaking the SUT. Job still started backend successfully; Newman exit code 1 failed the workflow.

---

## 4. Observations

- Separating **CI Smoke** (always-green contract) from the full security suite (expected fails documenting bugs) keeps the pipeline useful as a regression gate.  
- First intentional-fail attempt (`86cd4a6`) stayed green because the workflow hard-coded `--env-var ciExpectStatus=200`, overriding the env file — fixed in `2fe51ee` by removing that override.  
- After the red sample, suite was restored to `ciExpectStatus=200` so subsequent pushes are green again.

---

## 5. Related links

| Item | URL |
|------|-----|
| Workflow runs (branch) | https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/actions/workflows/hw06-api-tests.yml |
| Pass run | https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/actions/runs/32269053058 |
| Fail run | https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/actions/runs/32269286455 |
