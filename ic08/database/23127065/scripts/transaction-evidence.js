const path = require('node:path');
const { Client } = require('pg');
require('dotenv').config({ path: path.join(__dirname, '..', '.env'), quiet: true });

const snapshotSql = `SELECT
  (SELECT stock FROM eshop_lab.products WHERE id = 1)::int AS product_1_stock,
  (SELECT stock FROM eshop_lab.products WHERE id = 5)::int AS product_5_stock,
  (SELECT count(*) FROM eshop_lab.orders)::int AS orders,
  (SELECT count(*) FROM eshop_lab.order_items)::int AS order_items`;

async function main() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  try {
    console.log('Before failed checkout:', (await client.query(snapshotSql)).rows[0]);
    try {
      await client.query("CALL eshop_lab.sp_process_checkout(1, ARRAY[1,5], ARRAY[1,1], NULL)");
    } catch (error) {
      console.log('Checkout error:', { code: error.code, message: error.message });
    }
    console.log('After failed checkout:', (await client.query(snapshotSql)).rows[0]);
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
