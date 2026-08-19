# CI/CD Sample Commits

**Student ID:** 23127152

---

## Run 1 — All Tests Passing ✅

| Field | Value |
|-------|-------|
| Commit SHA | `8b44b66` |
| Commit message | `hw06/cicd-github-actions` |
| Branch | `hw6/23127152` |
| Pipeline URL | https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/actions/runs/32269053058 |
| Newman result | CI Smoke 4/4 requests · 9/9 assertions passed |
| Screenshot | `cicd/screenshots/run-all-pass.png` |

---

## Run 2 — One Test Failing ❌ (intentional)

| Field | Value |
|-------|-------|
| Commit SHA | `2fe51ee` |
| Commit message | `hw06/cicd-intentional-fail-v2` |
| Branch | `hw6/23127152` |
| Pipeline URL | https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/actions/runs/32269286455 |
| Failed test | CI-01 — expected status **201**, actual **200** |
| Newman result | 1 assertion failed → workflow conclusion **failure** |
| Screenshot | `cicd/screenshots/run-one-fail.png` |

---

## How to reproduce failing run

1. Set Postman env `ciExpectStatus=201` (or change CI-01 expected status to 201).  
2. Push to `hw6/23127152` so workflow runs Newman CI Smoke.  
3. CI-01 `GET /api/products` returns 200 → assertion fails → red Actions run.  
4. Restore `ciExpectStatus=200` for subsequent green builds.
