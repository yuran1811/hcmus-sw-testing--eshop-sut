# GitHub Issues — Bug Links

**Repository:** https://github.com/yuran1811/hcmus-sw-testing--eshop-sut  
**Student ID:** 23127152  
**Author:** [Anhnguyenk835](https://github.com/Anhnguyenk835) (canonical)

| Bug ID | Title | Severity | GitHub Issue | Screenshot / evidence |
|--------|-------|----------|--------------|------------------------|
| BUG-PRODUCTS-001 | SQLi search dumps full catalog | Critical | [#300](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/300) | `screenshots/BUG-PRODUCTS-001-sqli.json` |
| BUG-PRODUCTS-002 | Search quote → HTML 500 DB error | Major | [#301](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/301) | `screenshots/BUG-PRODUCTS-002-body.html` |
| BUG-ORDERS-001 | IDOR on GET /api/orders/:id (PII leak) | Critical | [#302](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/302) | `screenshots/BUG-ORDERS-001-idor.json` |
| BUG-ADMINPROD-001 | Product CRUD missing JWT/admin checks | Critical | [#303](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/303) | `screenshots/BUG-ADMINPROD-001-unauth-create.json` |
| BUG-ADMINPROD-002 | Create accepts neg price / empty body | Major | [#304](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/304) | Newman TC-C3-005/038 |
| BUG-ADMINPROD-003 | DELETE missing id returns 200 | Minor | [#305](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/305) | `screenshots/BUG-ADMINPROD-003-delete-missing.txt` |

> **Note:** #294–#299 were MCP-authored under `thanhngo-beroka` and are superseded by #300–#305. Close #294–#299 as duplicates if desired.

---

## Known bugs / candidates relevant to locked APIs

| Candidate | API | Why | Status |
|-----------|-----|-----|--------|
| SQLi in `search` | FR-05 | `LIKE '%${searchQuery}%'` | ✅ Confirmed BUG-PRODUCTS-001 [#300] |
| HTML 500 on bad SQL | FR-05 | `res.send(<h1>Database Error…)` | ✅ Confirmed BUG-PRODUCTS-002 [#301] |
| IDOR on order detail | FR-11 | `GET /api/orders/:id` has no auth | ✅ Confirmed BUG-ORDERS-001 [#302] |
| Missing auth on product CRUD | FR-15 | no JWT/role check | ✅ Confirmed BUG-ADMINPROD-001 [#303] |
| Plaintext password in login response | Setup | Admin login returns `user.password` | ☐ later |
