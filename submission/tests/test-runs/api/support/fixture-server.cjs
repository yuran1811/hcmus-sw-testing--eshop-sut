const http = require("http");
const path = require("path");
const { DatabaseSync } = require("node:sqlite");

const PORT = Number(process.env.FIXTURE_PORT || 3001);
const SUT_BASE_URL = process.env.SUT_BASE_URL || "http://localhost:3000";
const dbPath = path.resolve(__dirname, "../../../../../backend/database.sqlite");
const db = new DatabaseSync(dbPath);
const snapshots = new Map();

const json = (res, status, payload) => {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
  });
  res.end(body);
};

const readBody = (req) =>
  new Promise((resolve, reject) => {
    let raw = "";
    req.setEncoding("utf8");
    req.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 1024 * 1024) reject(new Error("Fixture request is too large"));
    });
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch (error) {
        reject(new Error(`Invalid fixture JSON: ${error.message}`));
      }
    });
    req.on("error", reject);
  });

const resetRelevantState = () => {
  db.exec("BEGIN IMMEDIATE");
  try {
    db.exec(`
      DELETE FROM coupon_usage;
      DELETE FROM coupons;
      DELETE FROM users;
      DELETE FROM sqlite_sequence WHERE name IN ('coupon_usage', 'coupons', 'users');
    `);
    const insertUser = db.prepare(
      "INSERT INTO users (name, email, password, role, login_attempts, locked_until, reset_token, shipping_address, phone) VALUES (?, ?, ?, ?, 0, NULL, NULL, ?, ?)",
    );
    insertUser.run("Admin User", "admin@eshop.com", "Admin123!", "admin", null, null);
    insertUser.run(
      "Test User",
      "test@eshop.com",
      "Test1234!",
      "user",
      "Seed Address",
      "0912345678",
    );

    const insertCoupon = db.prepare(
      "INSERT INTO coupons (code, type, discount_value, min_order_amount, expired_at, is_active, max_uses_per_user) VALUES (?, ?, ?, ?, ?, ?, ?)",
    );
    insertCoupon.run("SAVE10", "percent", 10, 300000, "2099-12-31", 1, 1);
    insertCoupon.run("BIGBUY", "fixed", 50000, 500000, "2099-12-31", 1, 1);
    insertCoupon.run("VIP100", "fixed", 100000, 300000, "2099-12-31", 1, 2);
    insertCoupon.run("EXPIRED", "percent", 20, 100000, "2020-01-01", 1, 1);
    db.exec("COMMIT");
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
};

const dateOffset = (days) => {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
};

const couponId = (code) => db.prepare("SELECT id FROM coupons WHERE code = ?").get(code)?.id;

const addUsage = (code, userId, count) => {
  const id = couponId(code);
  if (!id) throw new Error(`Fixture coupon ${code} does not exist`);
  const insert = db.prepare("INSERT INTO coupon_usage (coupon_id, user_id) VALUES (?, ?)");
  for (let index = 0; index < count; index += 1) insert.run(id, userId);
};

const snapshot = () => ({
  users: db
    .prepare(
      "SELECT id, name, email, password, role, reset_token, shipping_address, phone FROM users ORDER BY id",
    )
    .all(),
  coupons: db.prepare("SELECT * FROM coupons ORDER BY id").all(),
  usage: db
    .prepare(
      "SELECT coupon_id, user_id, COUNT(*) AS count FROM coupon_usage GROUP BY coupon_id, user_id ORDER BY coupon_id, user_id",
    )
    .all(),
});

const setup = (testId) => {
  resetRelevantState();
  if (testId === "FR09-APPLY-ST-002") addUsage("SAVE10", 2, 1);
  if (testId === "FR09-APPLY-ST-003") addUsage("VIP100", 2, 1);
  if (testId === "FR09-APPLY-ST-004") addUsage("VIP100", 2, 2);
  if (testId === "FR09-APPLY-ST-005") {
    db.prepare("UPDATE coupons SET is_active = 0 WHERE code = 'SAVE10'").run();
  }
  if (testId === "FR09-APPLY-ST-008") {
    const insert = db.prepare(
      "INSERT INTO coupons (code, type, discount_value, min_order_amount, expired_at, is_active, max_uses_per_user) VALUES (?, 'fixed', 10000, 100000, ?, 1, 1)",
    );
    insert.run("TIME_BEFORE", dateOffset(1));
    insert.run("TIME_AT", dateOffset(0));
    insert.run("TIME_AFTER", dateOffset(-1));
  }
  const state = snapshot();
  snapshots.set(testId, state);
  return state;
};

const stable = (value) => JSON.stringify(value);
const equal = (left, right) => stable(left) === stable(right);
const withoutTestCoupons = (coupons) =>
  coupons.filter((coupon) => ["SAVE10", "BIGBUY", "VIP100", "EXPIRED"].includes(coupon.code));

const verifyState = ({
  test_id: testId,
  body_json: bodyJson,
  expected_status: status,
  follow_up_body_json: followUp,
}) => {
  const before = snapshots.get(testId);
  if (!before) throw new Error(`No fixture snapshot for ${testId}`);
  const after = snapshot();
  const checks = [];
  const check = (name, pass, details) => checks.push({ name, pass: Boolean(pass), details });

  if (testId.startsWith("FR04-")) {
    const beforeAdmin = before.users.find((user) => user.id === 1);
    const beforeUser = before.users.find((user) => user.id === 2);
    const afterAdmin = after.users.find((user) => user.id === 1);
    const afterUser = after.users.find((user) => user.id === 2);
    check("only two seed users remain", after.users.length === 2, `count=${after.users.length}`);
    check("other user is unchanged", equal(beforeAdmin, afterAdmin), "admin seed snapshot");
    if (Number(status) === 200) {
      const request = JSON.parse(followUp || bodyJson);
      const expected = { ...beforeUser };
      for (const key of ["name", "phone", "shipping_address"]) {
        if (Object.prototype.hasOwnProperty.call(request, key)) expected[key] = request[key];
      }
      check(
        "profile matches effective request",
        equal(expected, afterUser),
        stable({ expected, actual: afterUser }),
      );
    } else {
      check(
        "rejected update is atomic",
        equal(beforeUser, afterUser),
        stable({ before: beforeUser, after: afterUser }),
      );
    }
  } else if (testId.startsWith("FR09-")) {
    check(
      "coupon definitions are unchanged",
      equal(before.coupons, after.coupons),
      "coupons before/after",
    );
    check(
      "coupon usage is unchanged",
      equal(before.usage, after.usage),
      stable({ before: before.usage, after: after.usage }),
    );
    check("users are unchanged", equal(before.users, after.users), "users before/after");
  } else {
    const body = JSON.parse(bodyJson);
    const rows = after.coupons.filter((coupon) => coupon.code === body.code);
    if (Number(status) === 201) {
      check("exactly one requested coupon exists", rows.length === 1, `count=${rows.length}`);
      if (rows.length === 1) {
        const coupon = rows[0];
        for (const key of [
          "code",
          "type",
          "discount_value",
          "min_order_amount",
          "expired_at",
          "max_uses_per_user",
        ]) {
          check(
            `created coupon ${key} matches`,
            coupon[key] === body[key],
            stable({ expected: body[key], actual: coupon[key] }),
          );
        }
        check(
          "created coupon defaults active",
          coupon.is_active === 1,
          `is_active=${coupon.is_active}`,
        );
      }
    } else {
      const beforeCount = before.coupons.filter((coupon) => coupon.code === body.code).length;
      check(
        "rejected request creates no additional coupon",
        rows.length === beforeCount,
        `before=${beforeCount}, after=${rows.length}`,
      );
    }
    check(
      "seed coupons are unchanged",
      equal(withoutTestCoupons(before.coupons), withoutTestCoupons(after.coupons)),
      "seed coupon snapshot",
    );
    check("users are unchanged", equal(before.users, after.users), "users before/after");
  }

  return { pass: checks.every((item) => item.pass), checks };
};

const apiRequest = async ({ path: apiPath, method = "POST", token, body, studentId }) => {
  const headers = {
    "Content-Type": "application/json",
    "X-Student-Id": studentId,
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  console.log(`[fixture-forward] ${method} ${apiPath} X-Student-Id=${studentId}`);
  const response = await fetch(`${SUT_BASE_URL}${apiPath}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }
  return { status: response.status, body: payload };
};

const runSpecial = async (input, studentId) => {
  const body = JSON.parse(input.body_json);
  const userToken = input.user_token;
  const adminToken = input.admin_token;
  const sequence = input.special_sequence;
  let steps = [];

  if (sequence === "fr09_parallel_apply") {
    steps = await Promise.all([
      apiRequest({ path: "/api/apply-coupon", token: userToken, body, studentId }),
      apiRequest({ path: "/api/apply-coupon", token: userToken, body, studentId }),
    ]);
    const valid = steps.every(
      (step) =>
        step.status === 200 &&
        step.body?.discount_amount === 50000 &&
        step.body?.final_amount === 450000,
    );
    return { pass: valid, steps };
  }

  if (sequence === "fr09_expiry_boundary") {
    const codes = ["TIME_BEFORE", "TIME_AT", "TIME_AFTER"];
    for (const code of codes) {
      steps.push(
        await apiRequest({
          path: "/api/apply-coupon",
          token: userToken,
          studentId,
          body: { code, total_amount: 500000, user_id: 2 },
        }),
      );
    }
    return {
      pass: steps.map((step) => step.status).join(",") === "200,400,400",
      steps,
    };
  }

  if (sequence === "fr17_parallel_create") {
    steps = await Promise.all([
      apiRequest({ path: "/api/admin/coupons", token: adminToken, body, studentId }),
      apiRequest({ path: "/api/admin/coupons", token: adminToken, body, studentId }),
    ]);
    const statuses = steps.map((step) => step.status).sort((a, b) => a - b);
    return { pass: statuses.join(",") === "201,409", steps };
  }

  if (sequence === "fr17_repeat_create") {
    steps.push(
      await apiRequest({ path: "/api/admin/coupons", token: adminToken, body, studentId }),
    );
    return { pass: steps[0].status === 409, steps };
  }

  if (sequence === "fr17_create_then_apply") {
    steps.push(
      await apiRequest({
        path: "/api/apply-coupon",
        token: userToken,
        studentId,
        body: { code: body.code, total_amount: 200000, user_id: 2 },
      }),
    );
    return {
      pass:
        steps[0].status === 200 &&
        steps[0].body?.discount_amount === 20000 &&
        steps[0].body?.final_amount === 180000,
      steps,
    };
  }

  if (sequence === "fr17_delete_recreate") {
    const id = couponId(body.code);
    if (!id) return { pass: false, steps: [{ error: "created coupon not found" }] };
    steps.push(
      await apiRequest({
        path: `/api/admin/coupons/${id}`,
        method: "DELETE",
        token: adminToken,
        studentId,
      }),
    );
    steps.push(
      await apiRequest({ path: "/api/admin/coupons", token: adminToken, body, studentId }),
    );
    return { pass: steps[0].status === 204 && steps[1].status === 201, steps };
  }

  if (sequence === "fr17_coupon_lifecycle") {
    const id = couponId(body.code);
    if (!id) return { pass: false, steps: [{ error: "created coupon not found" }] };
    const applyBody = { code: body.code, total_amount: 200000, user_id: 2 };
    steps.push(
      await apiRequest({ path: "/api/apply-coupon", token: userToken, body: applyBody, studentId }),
    );
    steps.push(
      await apiRequest({
        path: "/api/coupon-usage",
        token: userToken,
        studentId,
        body: { coupon_id: id },
      }),
    );
    steps.push(
      await apiRequest({ path: "/api/apply-coupon", token: userToken, body: applyBody, studentId }),
    );
    return {
      pass: steps[0].status === 200 && steps[1].status === 200 && steps[2].status === 409,
      steps,
    };
  }

  return { pass: false, steps: [{ error: `Unknown special sequence ${sequence}` }] };
};

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === "GET" && req.url === "/health") {
      return json(res, 200, { status: "ok", service: "hw06-api-fixture" });
    }
    const input = await readBody(req);
    const studentId = String(req.headers["x-student-id"] || "");
    if (!studentId) return json(res, 400, { error: "X-Student-Id is required" });

    if (req.method === "POST" && req.url === "/fixture/setup") {
      const state = setup(input.test_id);
      return json(res, 200, {
        pass: true,
        test_id: input.test_id,
        counts: {
          users: state.users.length,
          coupons: state.coupons.length,
          usage_groups: state.usage.length,
        },
      });
    }
    if (req.method === "POST" && req.url === "/fixture/special") {
      return json(res, 200, await runSpecial(input, studentId));
    }
    if (req.method === "POST" && req.url === "/fixture/state") {
      return json(res, 200, verifyState(input));
    }
    if (req.method === "POST" && req.url === "/fixture/teardown") {
      snapshots.delete(input.test_id);
      resetRelevantState();
      return json(res, 200, { pass: true, test_id: input.test_id });
    }
    return json(res, 404, { error: "Fixture route not found" });
  } catch (error) {
    console.error(error);
    return json(res, 500, { error: error.message });
  }
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Fixture service listening on http://127.0.0.1:${PORT}`);
});

const shutdown = () => server.close(() => db.close());
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
