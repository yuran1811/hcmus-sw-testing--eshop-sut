import { test, expect, Page } from '@playwright/test';
import sqlite3 from 'sqlite3';
import path from 'path';

/**
 * FR-20 — Đăng nhập trên Mobile (frontend-mobile, chạy qua `expo start --web`).
 *
 * Ứng dụng điều hướng bằng state nội bộ, KHÔNG có URL routing -> chỉ `page.goto('/')` một lần
 * ở đầu mỗi test, mọi điều hướng sau đó dùng click() nội bộ.
 *
 * ⚠️ BLOCKER đã biết: ứng dụng mobile gọi API tới một địa chỉ IP LAN cố định (không phải
 * localhost). Script dưới đây giả định máy chạy test có đúng IP này (hoặc đã được cập nhật lại
 * trước khi chạy) — nếu không, MỌI request /api/login sẽ lỗi network và che mất toàn bộ bug
 * nghiệp vụ thật. Đây là quyết định đã được xác nhận với người dùng.
 *
 * Các test dưới đây kiểm tra đúng theo spec FR-20/FR-02 (bộ đếm sai tăng đúng 1 đơn vị, khóa
 * sau 3 lần sai liên tiếp, khóa kéo dài 30 giây, không lộ nguyên nhân lỗi). Nếu hệ thống lệch
 * khỏi các quy tắc này, assertion tương ứng sẽ fail và cần ghi nhận làm bug — không phải lỗi
 * script.
 *
 * Theo yêu cầu của người dùng: KHÔNG dùng cách giả lập DB cho phần thời gian khóa — các test
 * có chờ thời gian (009/011/012) dùng `page.waitForTimeout` chờ thật, dù skill mặc định khuyến
 * cáo tránh waitForTimeout (ngoại lệ hợp lý vì đây chính là đối tượng cần test, không phải
 * workaround cho async UI).
 */

const SEEDED_USER = { email: 'test@eshop.com', password: 'Test1234!' };

function getDb(): sqlite3.Database {
  return new sqlite3.Database(path.resolve(__dirname, '../../backend/database.sqlite'));
}

function resetLoginState(email: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const db = getDb();
    db.run('UPDATE users SET login_attempts = 0, locked_until = NULL WHERE email = ?', [email], (err) => {
      db.close();
      if (err) return reject(err);
      resolve();
    });
  });
}

function getLoginState(email: string): Promise<{ login_attempts: number; locked_until: string | null } | undefined> {
  return new Promise((resolve, reject) => {
    const db = getDb();
    db.get(
      'SELECT login_attempts, locked_until FROM users WHERE email = ?',
      [email],
      (err, row: { login_attempts: number; locked_until: string | null } | undefined) => {
        db.close();
        if (err) return reject(err);
        resolve(row);
      },
    );
  });
}

const loginNavLink = (page: Page) => page.getByText('Đăng nhập', { exact: true });
const emailInput = (page: Page) => page.getByPlaceholder('Email');
const passwordInput = (page: Page) => page.getByPlaceholder('Mật khẩu');
const submitButton = (page: Page) => page.getByText('Sign In', { exact: true });
const genericErrorText = (page: Page) =>
  page.getByText('Đăng nhập thất bại. Vui lòng kiểm tra lại.', { exact: true });
const loggedInHeader = (page: Page) => page.getByText(/Chào, /);

async function gotoLoginScreen(page: Page) {
  await page.goto('/');
  await loginNavLink(page).click();
}

/** Điền form và bấm Sign In, đợi đúng network response của /api/login (web-first, CSR app). */
async function attemptLogin(page: Page, email: string, password: string) {
  await emailInput(page).fill(email);
  await passwordInput(page).fill(password);
  const responsePromise = page.waitForResponse((res) => res.url().includes('/api/login'));
  await submitButton(page).click();
  return responsePromise;
}

test.describe('FR-20 Đăng nhập Mobile', () => {
  // Nhiều test dùng chung tài khoản test@eshop.com để bám đúng Test Data trong file .md gốc
  // -> chạy serial để tránh các test đụng vào login_attempts của nhau khi chạy song song.
  test.describe.configure({ mode: 'serial' });

  test.beforeEach(async () => {
    await resetLoginState(SEEDED_USER.email);
  });

  test('TC-MOBILE_LOGIN-001: Đăng nhập thành công với thông tin hợp lệ', async ({ page }) => {
    await gotoLoginScreen(page);
    await attemptLogin(page, SEEDED_USER.email, SEEDED_USER.password);
    await expect(loggedInHeader(page)).toBeVisible();
  });

  test('TC-MOBILE_LOGIN-002: Email để trống -> báo lỗi trường bắt buộc', async ({ page }) => {
    await gotoLoginScreen(page);
    await attemptLogin(page, '', SEEDED_USER.password);
    // Theo spec phải hiện đúng message "Email là trường bắt buộc"; nếu hệ thống chỉ hiện lỗi
    // chung (không phân biệt theo field) thì assertion này sẽ fail, cần ghi nhận làm bug.
    await expect(page.getByText('Email là trường bắt buộc', { exact: true })).toBeVisible();
  });

  test('TC-MOBILE_LOGIN-003: Email sai định dạng -> báo lỗi định dạng email', async ({ page }) => {
    await gotoLoginScreen(page);
    await attemptLogin(page, 'test@', SEEDED_USER.password);
    // Theo spec phải hiện lỗi định dạng email riêng; nếu hệ thống chỉ hiện lỗi chung thì
    // assertion này sẽ fail, cần ghi nhận làm bug.
    await expect(page.getByText(/định dạng email/i)).toBeVisible();
  });

  test('TC-MOBILE_LOGIN-004: Mật khẩu để trống -> báo lỗi trường bắt buộc', async ({ page }) => {
    await gotoLoginScreen(page);
    await attemptLogin(page, SEEDED_USER.email, '');
    // Tương tự TC-002: nếu hệ thống không hiện đúng message riêng cho field này, sẽ fail.
    await expect(page.getByText('Mật khẩu là trường bắt buộc', { exact: true })).toBeVisible();
  });

  test('TC-MOBILE_LOGIN-005: Email đúng định dạng nhưng chưa đăng ký -> lỗi đăng nhập chung', async ({ page }) => {
    await gotoLoginScreen(page);
    await attemptLogin(page, 'notexist@eshop.com', 'Test1234!');
    await expect(genericErrorText(page)).toBeVisible();
    // Lưu ý: spec yêu cầu "bộ đếm sai tăng đúng 1" nhưng với email chưa đăng ký thì không có
    // tài khoản nào để gắn bộ đếm vào — phần "tăng bộ đếm" của spec không áp dụng được cho ca
    // này, chỉ còn kiểm được phần "lỗi đăng nhập chung chung" ở trên.
  });

  test('TC-MOBILE_LOGIN-006: Email đã đăng ký nhưng sai mật khẩu -> lỗi chung, bộ đếm +1', async ({ page }) => {
    await gotoLoginScreen(page);
    await attemptLogin(page, SEEDED_USER.email, 'WrongPass1!');
    await expect(genericErrorText(page)).toBeVisible();

    const state = await getLoginState(SEEDED_USER.email);
    expect(state?.login_attempts, 'Bộ đếm sai phải tăng đúng 1 đơn vị theo FR-02').toBe(1);
  });

  test('TC-MOBILE_LOGIN-007: Bộ đếm tăng đúng 1 đơn vị sau 1 lần sai, chưa khóa', async ({ page }) => {
    await gotoLoginScreen(page);
    await attemptLogin(page, SEEDED_USER.email, 'WrongPass1!');

    const state = await getLoginState(SEEDED_USER.email);
    expect(state?.login_attempts, 'Bộ đếm sai phải tăng đúng 1 đơn vị theo spec').toBe(1);
    expect(state?.locked_until, 'Chưa được khóa sau đúng 1 lần sai').toBeNull();
  });

  test('TC-MOBILE_LOGIN-008: Sai 2 lần liên tiếp -> chưa khóa (biên dưới); lần 3 đúng -> thành công', async ({
    page,
  }) => {
    await gotoLoginScreen(page);
    await attemptLogin(page, SEEDED_USER.email, 'WrongPass1!');
    await attemptLogin(page, SEEDED_USER.email, 'WrongPass1!');

    const state = await getLoginState(SEEDED_USER.email);
    // Theo spec, mới sai 2 lần thì CHƯA được khóa. Nếu hệ thống khóa sớm hơn quy định, assertion
    // này sẽ fail, cần ghi nhận làm bug.
    expect(state?.locked_until, 'Theo spec, mới sai 2 lần thì CHƯA được khóa').toBeNull();

    await attemptLogin(page, SEEDED_USER.email, SEEDED_USER.password);
    // Nếu đã bị khóa ở bước trên, lần đăng nhập đúng này cũng bị từ chối -> fail tiếp ở đây.
    await expect(loggedInHeader(page)).toBeVisible();
  });

  test('TC-MOBILE_LOGIN-009: Sai 3 lần liên tiếp -> khóa tài khoản 30 giây (biên kích hoạt)', async ({ page }) => {
    await gotoLoginScreen(page);
    await attemptLogin(page, SEEDED_USER.email, 'WrongPass1!');
    await attemptLogin(page, SEEDED_USER.email, 'WrongPass1!');
    await attemptLogin(page, SEEDED_USER.email, 'WrongPass1!');

    await expect(genericErrorText(page)).toBeVisible();

    const state = await getLoginState(SEEDED_USER.email);
    expect(state?.locked_until, 'Phải bị khóa sau khi sai từ 3 lần liên tiếp').toBeTruthy();

    const lockedUntilMs = new Date(state!.locked_until!).getTime();
    const expectedMs = Date.now() + 30_000;
    // Theo spec, thời gian khóa phải xấp xỉ 30 giây; nếu hệ thống khóa lâu hơn/ngắn hơn nhiều,
    // assertion này sẽ fail, cần ghi nhận làm bug.
    expect(Math.abs(lockedUntilMs - expectedMs), 'Thời gian khóa phải xấp xỉ 30 giây theo spec').toBeLessThan(
      5_000,
    );
  });

  test('TC-MOBILE_LOGIN-010: Đăng nhập khi đang bị khóa (dù đúng) -> vẫn bị từ chối', async ({ page }) => {
    await gotoLoginScreen(page);
    await attemptLogin(page, SEEDED_USER.email, 'WrongPass1!');
    await attemptLogin(page, SEEDED_USER.email, 'WrongPass1!');
    await attemptLogin(page, SEEDED_USER.email, 'WrongPass1!'); // kích hoạt khóa theo đúng kịch bản spec

    await attemptLogin(page, SEEDED_USER.email, SEEDED_USER.password); // đúng thông tin
    await expect(genericErrorText(page)).toBeVisible();
    await expect(loggedInHeader(page)).not.toBeVisible();
  });

  test('TC-MOBILE_LOGIN-011: Hết 30 giây khóa -> đăng nhập đúng lại thành công', async ({ page }) => {
    test.setTimeout(60_000); // nới timeout vì test này chờ thật 30 giây
    await gotoLoginScreen(page);
    await attemptLogin(page, SEEDED_USER.email, 'WrongPass1!');
    await attemptLogin(page, SEEDED_USER.email, 'WrongPass1!');
    await attemptLogin(page, SEEDED_USER.email, 'WrongPass1!');

    // Chờ thật 30 giây theo đúng spec (yêu cầu của người dùng — không giả lập qua DB). Nếu thời
    // gian khóa thực tế dài hơn 30 giây, bước login dưới đây sẽ vẫn bị từ chối -> assertion fail,
    // cần ghi nhận làm bug.
    await page.waitForTimeout(30_000);

    await attemptLogin(page, SEEDED_USER.email, SEEDED_USER.password);
    await expect(loggedInHeader(page)).toBeVisible();
  });

  test('TC-MOBILE_LOGIN-012 [BVA]: Vẫn còn khóa tại t ≈ 29 giây (off-point biên 30s)', async ({ page }) => {
    test.setTimeout(60_000);
    await gotoLoginScreen(page);
    await attemptLogin(page, SEEDED_USER.email, 'WrongPass1!');
    await attemptLogin(page, SEEDED_USER.email, 'WrongPass1!');
    await attemptLogin(page, SEEDED_USER.email, 'WrongPass1!');

    await page.waitForTimeout(29_000);

    await attemptLogin(page, SEEDED_USER.email, SEEDED_USER.password);
    // Mục tiêu BVA: tại t≈29s (off-point, ngay trước mốc 30s) tài khoản vẫn phải còn bị khóa.
    // Nếu đăng nhập thành công ở đây, nghĩa là khóa đã hết hạn SỚM HƠN 30 giây -> vi phạm spec.
    await expect(genericErrorText(page)).toBeVisible();
  });

  test('TC-MOBILE_LOGIN-013: Bộ đếm/khóa dùng chung giữa Web và Mobile', async ({ page, request }) => {
    // Mô phỏng "gây khóa trên Web" bằng cách gọi trực tiếp API /api/login — Web và Mobile cùng
    // gọi chung endpoint này (FR-20), nên kích hoạt khóa qua API tương đương kích hoạt từ Web UI.
    for (let i = 0; i < 3; i++) {
      await request.post('http://localhost:3000/api/login', {
        data: { email: SEEDED_USER.email, password: 'WrongPass1!' },
      });
    }
    const state = await getLoginState(SEEDED_USER.email);
    expect(state?.locked_until, 'Phải bị khóa sau khi "Web" gây khóa qua API').toBeTruthy();

    // Kiểm trên Mobile: phải thấy CÙNG trạng thái khóa (bộ đếm/khóa quản lý tại backend, dùng
    // chung cho mọi client), dù đăng nhập đúng.
    await gotoLoginScreen(page);
    await attemptLogin(page, SEEDED_USER.email, SEEDED_USER.password);
    await expect(genericErrorText(page)).toBeVisible();
    await expect(loggedInHeader(page)).not.toBeVisible();
  });
});
