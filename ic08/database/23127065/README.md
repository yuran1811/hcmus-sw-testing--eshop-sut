# PostgreSQL Mini-Lab — 23127065

This directory is isolated from the repository's SQLite application. It requires Docker, Docker Compose, and Node.js 20 or newer.

## Reproduce

```bash
cp .env.example .env
# Replace the example password in both POSTGRES_PASSWORD and DATABASE_URL.
npm install
npm run db:up
npm test
npm run evidence:transaction
npm run performance
npm run verify:catalog
npm run db:down
```

`npm test` rebuilds the schema before the suite and removes both `eshop_lab` and `app_user` afterward. `npm run performance` rebuilds the dataset, creates the index, and prints both `EXPLAIN (ANALYZE, BUFFERS)` plans. `npm run verify:catalog` independently lists the objects and restricted role from PostgreSQL's `pg_catalog`. Always run `npm run db:down` when finished to remove the local database volume.

The two tests labeled “deliberate defect” are expected to pass by proving that the supplied discount function can exceed the order total and that the supplied procedure can partially commit a failed checkout. Proposed corrections are documented in `REPORT.md`; the defects remain in `schema.sql` so the findings are reproducible.
