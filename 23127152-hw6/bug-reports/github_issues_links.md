# GitHub Issues — Bug Links

**Repository:** https://github.com/yuran1811/hcmus-sw-testing--eshop-sut (confirm remote)  
**Student ID:** 23127152

| Bug ID | Title | Severity | GitHub Issue | Screenshot / evidence |
|--------|-------|----------|--------------|------------------------|
| BUG-PRODUCTS-001 | SQLi search dumps full catalog | Critical | [#294](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/294) | `screenshots/BUG-PRODUCTS-001-sqli.json` |
| BUG-PRODUCTS-002 | Search quote → HTML 500 DB error | Major | [#295](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/295) | `screenshots/BUG-PRODUCTS-002-body.html` |

---

## Known bugs / candidates relevant to locked APIs

| Candidate | API | Why | Status |
|-----------|-----|-----|--------|
| SQLi in `search` | FR-05 | `LIKE '%${searchQuery}%'` | ✅ Confirmed BUG-PRODUCTS-001 |
| HTML 500 on bad SQL | FR-05 | `res.send(<h1>Database Error…)` | ✅ Confirmed BUG-PRODUCTS-002 |
| IDOR on order detail | FR-11 | `GET /api/orders/:id` has no auth | ☐ Phase 2 |
| Missing auth on product CRUD | FR-15 | no JWT/role check | ☐ Phase 3 |
| Plaintext password in login response | Setup | Admin login returns `user.password` | ☐ later |

### Manual Issue create (when `gh` works)

```bash
gh issue create --title "[BUG][FR-05] SQL injection in GET /api/products?search=" \
  --body-file 23127152-hw6/bug-reports/BUG-PRODUCTS-001.md
gh issue create --title "[BUG][FR-05] HTML 500 Database Error on malicious search" \
  --body-file 23127152-hw6/bug-reports/BUG-PRODUCTS-002.md
```
