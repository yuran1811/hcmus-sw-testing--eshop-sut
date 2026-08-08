/**
 * Task 3 re-run — real Google Chrome + Playwright Firefox/Nightly (headed),
 * OS window capture via CGWindowListCreateImage (browser chrome + URL bar),
 * then watermark 23127152@hcmus.edu.vn.
 *
 *   node tests-23127152/test-runs/execute-task3-real.mjs
 *   node tests-23127152/test-runs/execute-task3-real.mjs --only=firefox
 *   node tests-23127152/test-runs/execute-task3-real.mjs --only=chrome
 */
import { chromium, firefox } from '../../e2e/node_modules/playwright/index.mjs';
import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const RAW = path.join(ROOT, 'cross-platform/screenshots/_raw_real');
const OUT = path.join(ROOT, 'cross-platform/screenshots');
const BASE = 'http://localhost:5173';
const API = 'http://localhost:3000';
const OS_LABEL = `${os.type()} ${os.release()}`;
const CAPTURE_PY = path.join(__dirname, 'macos_window_capture.py');
const WATERMARK = path.resolve(
  ROOT,
  '../.agents/skills/cross-platform-testing-tracker/scripts/watermark_screenshot.py',
);

const onlyArg = process.argv.find((a) => a.startsWith('--only='));
const ONLY = onlyArg ? onlyArg.split('=')[1] : 'both';

fs.mkdirSync(RAW, { recursive: true });
fs.mkdirSync(OUT, { recursive: true });

const ARCHIVE = path.join(OUT, '_playwright_viewport_archive');
if (!fs.existsSync(ARCHIVE)) {
  fs.mkdirSync(ARCHIVE, { recursive: true });
  for (const f of fs.readdirSync(OUT)) {
    if (/^(chrome|firefox)_.*\.png$/.test(f)) {
      fs.renameSync(path.join(OUT, f), path.join(ARCHIVE, f));
    }
  }
  console.log('Archived previous viewport screenshots ->', ARCHIVE);
}

const ITEMS = [
  { id: 'LOGIN-COM-01', route: '/login', auth: false, win: { w: 1440, h: 960 }, check: 'comLayout' },
  { id: 'LOGIN-COM-02', route: '/login', auth: false, win: { w: 1440, h: 960 }, check: 'viTextLogin' },
  { id: 'LOGIN-VIS-01', route: '/login', auth: false, win: { w: 1440, h: 960 }, check: 'loginCard' },
  { id: 'LOGIN-VIS-02', route: '/login', auth: false, win: { w: 1440, h: 960 }, check: 'loginTitle' },
  { id: 'LOGIN-RES-01', route: '/login', auth: false, win: { w: 1440, h: 960 }, check: 'noHScroll' },
  { id: 'LOGIN-RES-03', route: '/login', auth: false, win: { w: 430, h: 920 }, check: 'noHScroll' },
  { id: 'LOGIN-FUN-03', route: '/login', auth: false, win: { w: 1440, h: 960 }, check: 'pwdType' },
  { id: 'PROFILE-COM-01', route: '/profile', auth: true, win: { w: 1440, h: 960 }, check: 'profileLayout' },
  { id: 'PROFILE-COM-02', route: '/profile', auth: true, win: { w: 1440, h: 960 }, check: 'viTextProfile' },
  { id: 'PROFILE-VIS-01', route: '/profile', auth: true, win: { w: 1440, h: 960 }, check: 'profileLayout' },
  { id: 'PROFILE-VIS-02', route: '/profile', auth: true, win: { w: 1440, h: 960 }, check: 'profileFormCard' },
  { id: 'PROFILE-VIS-04', route: '/profile', auth: true, win: { w: 1440, h: 960 }, check: 'emailDisabled' },
  { id: 'PROFILE-RES-01', route: '/profile', auth: true, win: { w: 1440, h: 960 }, check: 'noHScroll' },
  { id: 'PROFILE-RES-03', route: '/profile', auth: true, win: { w: 430, h: 920 }, check: 'noHScroll' },
];

const results = {};

function captureWindow(owner, outPath, titleSubstr) {
  const args = ['capture', owner, outPath];
  if (titleSubstr) args.push('--title-substr', titleSubstr);
  execFileSync('python3', [CAPTURE_PY, ...args], { stdio: 'inherit' });
  if (!fs.existsSync(outPath) || fs.statSync(outPath).size < 2000) {
    throw new Error(`capture too small/missing: ${outPath}`);
  }
}

async function resizeWindow(page, w, h) {
  await page.evaluate(
    ({ w, h }) => {
      try {
        window.moveTo(40, 40);
        window.resizeTo(w, h);
      } catch (_) {
        /* ignore */
      }
    },
    { w, h },
  );
  // Chrome also via CDP when available
  try {
    const session = await page.context().newCDPSession(page);
    const { windowId } = await session.send('Browser.getWindowForTarget');
    await session.send('Browser.setWindowBounds', {
      windowId,
      bounds: { left: 40, top: 40, width: w, height: h, windowState: 'normal' },
    });
  } catch (_) {
    /* Firefox has no CDP */
  }
  await page.waitForTimeout(350);
}

async function login(page) {
  const res = await page.request.post(`${API}/api/login`, {
    data: { email: 'test@eshop.com', password: 'Test1234!' },
  });
  if (!res.ok()) throw new Error(`login API failed: ${res.status()}`);
  const data = await res.json();
  await page.goto(BASE, { waitUntil: 'domcontentloaded' });
  await page.evaluate((t) => localStorage.setItem('token', t), data.token);
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(400);
}

async function evaluateCheck(page, check) {
  switch (check) {
    case 'loginCard': {
      const box = await page.locator('main form').boundingBox();
      return {
        ok: !!box && box.width > 200,
        notes: box ? `form w=${Math.round(box.width)} x=${Math.round(box.x)}` : 'no form',
      };
    }
    case 'loginTitle': {
      const t = await page.locator('main h2').innerText();
      const ok = /đăng nhập/i.test(t) && !/đăng ký/i.test(t);
      return { ok, notes: `h2="${t}"` };
    }
    case 'viTextLogin': {
      const txt = await page.locator('main').innerText();
      const ok = /Mật khẩu/.test(txt) && /Quên mật khẩu/.test(txt) && !/□|�/.test(txt);
      return { ok, notes: ok ? 'Dấu tiếng Việt OK' : 'Thiếu/hỏng dấu tiếng Việt' };
    }
    case 'noHScroll': {
      const ok = await page.evaluate(
        () => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1,
      );
      return { ok, notes: ok ? 'no horizontal scroll' : 'horizontal scroll present' };
    }
    case 'pwdType': {
      const type = await page.locator('form input').nth(1).getAttribute('type');
      return { ok: type === 'password', notes: `password input type="${type}"` };
    }
    case 'comLayout':
    case 'profileLayout': {
      const visible = await page.locator('main').isVisible();
      const h2 = await page.locator('main h2').first().innerText().catch(() => '');
      return { ok: visible && h2.length > 0, notes: `main visible, h2="${h2}"` };
    }
    case 'viTextProfile': {
      const txt = await page.locator('main').innerText();
      const ok = /Hồ sơ của bạn/.test(txt) && /Địa chỉ giao hàng/.test(txt);
      return { ok, notes: ok ? 'Dấu tiếng Việt OK' : 'Thiếu chuỗi VN' };
    }
    case 'profileFormCard': {
      const ok = await page.getByText('Hồ sơ của bạn').isVisible();
      return { ok, notes: ok ? 'form card visible' : 'missing form card' };
    }
    case 'emailDisabled': {
      const disabled = await page.locator('form input').first().isDisabled();
      return { ok: disabled, notes: disabled ? 'email disabled' : 'email editable' };
    }
    default:
      return { ok: false, notes: `unknown check ${check}` };
  }
}

async function runBrowser({ launch, slug, owner, titleSubstr, label }) {
  const browser = await launch();
  const context = await browser.newContext({
    viewport: null,
    locale: 'vi-VN',
  });
  const page = await context.newPage();
  let loggedIn = false;

  await page.goto(`${BASE}/login`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(800);
  await resizeWindow(page, 1440, 960);

  // Verify capture target exists
  execFileSync('python3', [CAPTURE_PY, 'list', owner], { stdio: 'inherit' });

  for (const item of ITEMS) {
    await resizeWindow(page, item.win.w, item.win.h);

    if (!item.auth) {
      await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 20000 });
      await page.evaluate(() => localStorage.clear());
      loggedIn = false;
    } else if (!loggedIn) {
      await login(page);
      loggedIn = true;
    }

    await page.goto(`${BASE}${item.route}`, { waitUntil: 'networkidle', timeout: 20000 }).catch(() =>
      page.goto(`${BASE}${item.route}`, { waitUntil: 'domcontentloaded', timeout: 20000 }),
    );
    await page.waitForTimeout(600);

    if (item.auth) {
      const guest = await page.getByText('Vui lòng đăng nhập').isVisible().catch(() => false);
      if (guest) {
        await login(page);
        loggedIn = true;
        await page.goto(`${BASE}${item.route}`, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(600);
      }
    }

    await resizeWindow(page, item.win.w, item.win.h);
    await page.bringToFront().catch(() => {});
    await page.waitForTimeout(400);

    const verdict = await evaluateCheck(page, item.check);
    const file = `${slug}_${item.id}_${item.check}.png`;
    const rawPath = path.join(RAW, file);
    captureWindow(owner, rawPath, titleSubstr);

    if (!results[item.id]) results[item.id] = {};
    results[item.id][slug] = {
      status: verdict.ok ? 'Passed' : 'Failed',
      file,
      notes: verdict.notes,
      viewport: `${item.win.w}x${item.win.h}`,
      capture: 'cg-window-real-browser',
      label,
    };
    console.log(`${slug} ${item.id}: ${verdict.ok ? 'Passed' : 'Failed'} — ${verdict.notes}`);
  }

  await browser.close();
}

function watermarkAll() {
  console.log('Watermarking raw_real -> screenshots/');
  execFileSync(
    'python3',
    [WATERMARK, RAW, '--student-id', '23127152', '--output-dir', OUT, '--position', 'br'],
    { stdio: 'inherit' },
  );
}

function finalizeCom01() {
  for (const id of ['LOGIN-COM-01', 'PROFILE-COM-01']) {
    const row = results[id];
    if (!row?.chrome || !row?.firefox) continue;
    if (row.chrome.status === 'Passed' && row.firefox.status === 'Passed') {
      row.chrome.notes += ' | layout comparable vs Firefox (both rendered)';
      row.firefox.notes += ' | layout comparable vs Chrome (both rendered)';
    }
  }
}

console.log('OS:', OS_LABEL, '| only:', ONLY);

if (ONLY === 'both' || ONLY === 'chrome') {
  await runBrowser({
    slug: 'chrome',
    owner: 'Google Chrome',
    titleSubstr: 'frontend-web',
    label: 'Google Chrome (real) | macOS',
    launch: () =>
      chromium.launch({
        channel: 'chrome',
        headless: false,
        args: ['--disable-infobars', '--window-position=40,40', '--new-window'],
      }),
  });
}

if (ONLY === 'both' || ONLY === 'firefox') {
  // Playwright ships Firefox as Nightly.app — UI is Firefox chrome; URL bar shows localhost.
  await runBrowser({
    slug: 'firefox',
    owner: 'Nightly',
    titleSubstr: 'frontend-web',
    label: 'Firefox/Nightly (Playwright Firefox build) | macOS',
    launch: () =>
      firefox.launch({
        headless: false,
        args: ['-width', '1440', '-height', '960'],
      }),
  });
}

// Merge prior chrome results if firefox-only
if (ONLY === 'firefox' && fs.existsSync(path.join(__dirname, 'task3-results-real.json'))) {
  try {
    const prev = JSON.parse(fs.readFileSync(path.join(__dirname, 'task3-results-real.json'), 'utf8'));
    for (const [id, row] of Object.entries(prev.results || {})) {
      if (row.chrome && !results[id]?.chrome) {
        results[id] = { ...(results[id] || {}), chrome: row.chrome };
      }
    }
  } catch (_) {
    /* ignore */
  }
}

finalizeCom01();
watermarkAll();

fs.writeFileSync(
  path.join(__dirname, 'task3-results-real.json'),
  JSON.stringify({ OS_LABEL, capture: 'cg-window-real-browser', ONLY, results }, null, 2),
);

const count = fs.readdirSync(OUT).filter((f) => /^(chrome|firefox)_.*\.png$/.test(f)).length;
console.log('Watermarked screenshots in OUT:', count);
console.log('DONE');
