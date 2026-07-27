const fs = require('node:fs/promises');
const path = require('node:path');
const { Client } = require('pg');
require('dotenv').config({ path: path.join(__dirname, '..', '.env'), quiet: true });

async function main() {
  const sqlPath = process.argv[2];
  if (!sqlPath) throw new Error('Usage: node scripts/run-sql.js <file.sql>');
  const sql = await fs.readFile(path.resolve(__dirname, '..', sqlPath), 'utf8');
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  client.on('notice', (notice) => process.stdout.write(`${notice.message}\n`));
  try {
    const result = await client.query(sql);
    for (const item of Array.isArray(result) ? result : [result]) {
      if (item.rows.length) console.table(item.rows);
    }
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
