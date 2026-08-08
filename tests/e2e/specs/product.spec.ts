import {
  test,
  expect,
  type Page,
  type Locator,
  type APIRequestContext,
} from '@playwright/test';
import { readFileSync } from 'node:fs';
import path from 'node:path';

/**
 * FR-15 - Quan ly San pham (Admin CRUD).
 *
 * Du lieu test nam o test-data/product.json (yeu cau data-driven cua HW04:
 * khong hardcode inline trong script).
 *
 * LUU Y VE BASE URL:
 * frontend-admin chay o cong 5174 nhung playwright.config.ts dat baseURL =
 * 5173 (frontend-web). Spec nay co y dung URL tuyet doi qua hang so ADMIN_URL
 * thay vi them mot project rieng vao config: them project se nhan doi so
 * project tu 3 len 6, keo theo register.spec.ts va cart.spec.ts chay lai duoi
 * project admin va pha vo cau truc "3 browser = 3 project" ma bo report dang
 * dua vao. Co the doi bang bien moi truong ADMIN_URL khi can.
 *
 * Expected bam theo dung FR-15 / FR-12 / SEC-02 / SEC-03 trong README.md
 * (SRS), KHONG chinh theo hanh vi loi hien tai cua SUT - mot assertion fail o
 * day chinh la bang chung bug cho bao cao. Chi tiet cac diem lech kem so dong
 * o muc "knownIssues" trong product.json.
 */

const API_BASE = process.env.API_BASE ?? 'http://localhost:3000';
const ADMIN_URL = process.env.ADMIN_URL ?? 'http://localhost:5174';

type Credentials = { email: string; password: string };
type SeedProduct = { key: string; name: string; price: number };
type ApiProduct = { id: number; name: string; price: number | string; category_id: number };

type ProductCase = {
  id: string;
  title: string;
  kind:
    | 'uiCreate'
    | 'apiValidation'
    | 'apiAuthCheck'
    | 'categoryRequired'
    | 'editIsolation'
    | 'listIntegrity'
    | 'deleteProduct';
  auth?: 'none' | 'user';
  seedProducts?: SeedProduct[];
  input?: {
    name?: string;
    nameLength?: number;
    nameChar?: string;
    price?: string;
    category_id?: number;
    useCategory?: boolean;
    editKey?: string;
    newName?: string;
    newPrice?: string;
    deleteKey?: string;
  };
  expected: {
    created?: boolean;
    fieldInvalid?: string;
    rejected?: boolean;
    statuses?: number[];
    reason?: string;
    untouchedKey?: string;
    checkKey?: string;
  };
};

const dataFile = path.join(__dirname, '..', 'test-data', 'product.json');
const data = JSON.parse(readFileSync(dataFile, 'utf-8')) as {
  adminCredentials: Credentials;
  userCredentials: Credentials;
  category: { id: number; name: string };
  cases: ProductCase[];
};

const { adminCredentials, userCredentials, category, cases } = data;

// ---------------------------------------------------------------------------
// API helpers
// ---------------------------------------------------------------------------

async function tokenFor(request: APIRequestContext, creds: Credentials): Promise<string> {
  const res = await request.post(`${API_BASE}/api/login`, { data: creds });
  const body = await res.json();
  return body.token as string;
}

function authHeader(token?: string): Record<string, string> {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function listProducts(request: APIRequestContext): Promise<ApiProduct[]> {
  const res = await request.get(`${API_BASE}/api/products`);
  return (await res.json()) as ApiProduct[];
}

async function createProduct(
  request: APIRequestContext,
  token: string,
  product: { name: string; price: number },
): Promise<void> {
  // Gui kem token admin du hien tai server khong yeu cau - de script van dung
  // neu sau nay lo hong xac thuc duoc va.
  await request.post(`${API_BASE}/api/products`, {
    headers: authHeader(token),
    data: { ...product, description: '', imageUrl: '', category_id: category.id },
  });
}

// ---------------------------------------------------------------------------
// UI helpers (frontend-admin)
// ---------------------------------------------------------------------------

async function loginAdmin(page: Page): Promise<void> {
  await page.goto(ADMIN_URL);
  // Man hinh dang nhap admin dung placeholder, khong co <label> (App.jsx:196-211).
  await page.getByPlaceholder('Email').fill(adminCredentials.email);
  await page.getByPlaceholder('Password').fill(adminCredentials.password);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('heading', { name: 'EShop Admin' })).toBeVisible();
}

async function openProductsTab(page: Page): Promise<void> {
  // Muc sidebar la the <li> co onClick, khong phai link/button (App.jsx:239-244).
  await page.locator('li').filter({ hasText: /^Sản phẩm$/ }).click();
  await expect(page.getByRole('heading', { name: 'Quản lý Sản phẩm' })).toBeVisible();
}

/** Bang danh sach san pham (App.jsx:567-608), phan biet voi bang preview CSV. */
function productTable(page: Page): Locator {
  return page.locator('table').filter({ hasText: 'Tên SP' }).locator('tbody tr');
}

/**
 * Da xac minh bang Playwright MCP: filter({ hasText: name }) khop CHUOI CON,
 * khong phan biet hoa/thuong. Voi ten dai/co token {{unique}} thi gan nhu
 * khong trung, nhung TC-PRODUCT-002/003 dung ten chi gom toan ky tu 'A' lap
 * lai (bien tren/duoi cua do dai) - rieng TC-PRODUCT-003 (ten = "A") khop
 * NHAM toi 5-6 dong khac trong bang (bat ky dong nao co chua chu 'a') thay vi
 * dung 1 dong, khien assertion toHaveCount(1) fail SAI LY DO. Doi sang khop
 * CHINH XAC noi dung o cell "Ten SP" de tranh dung chuoi con.
 */
function productRow(page: Page, name: string): Locator {
  return productTable(page).filter({ has: page.getByRole('cell', { name, exact: true }) });
}

/** Form them/sua san pham - chi co placeholder, khong co <label> (App.jsx:483-566). */
function nameInput(page: Page): Locator {
  return page.getByPlaceholder('Tên sản phẩm');
}

function priceInput(page: Page): Locator {
  return page.getByPlaceholder('Giá tiền');
}

async function submitProductForm(page: Page, method: 'POST' | 'PUT') {
  // Bat request truoc khi click: neu HTML5 constraint validation chan form thi
  // se khong co request nao duoc gui, va ta phan biet duoc 2 truong hop nay
  // thay vi doan mo.
  const responsePromise = page
    .waitForResponse(
      (res) =>
        res.url().includes('/api/products') && res.request().method() === method,
      { timeout: 5_000 },
    )
    .catch(() => null);

  await page.getByRole('button', { name: 'Lưu sản phẩm' }).click();
  return responsePromise;
}

function buildName(input: NonNullable<ProductCase['input']>, unique: string): string {
  if (typeof input.nameLength === 'number') {
    return (input.nameChar ?? 'A').repeat(input.nameLength);
  }
  return (input.name ?? '').replace('{{unique}}', unique);
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

test.describe('FR-15 - Quan ly San pham (Admin)', () => {
  let baselineIds: number[] = [];

  test.beforeEach(async ({ request }) => {
    baselineIds = (await listProducts(request)).map((p) => p.id);
  });

  test.afterEach(async ({ request }) => {
    // Don dep moi san pham do test tao ra, tra he thong ve dung trang thai ban
    // dau de lan chay sau khong bi nhieu.
    const token = await tokenFor(request, adminCredentials);
    for (const product of await listProducts(request)) {
      if (!baselineIds.includes(product.id)) {
        await request.delete(`${API_BASE}/api/products/${product.id}`, {
          headers: authHeader(token),
        });
      }
    }
  });

  for (const testCase of cases) {
    test(`${testCase.id}: ${testCase.title}`, async ({ page, request }, testInfo) => {
      const unique = `${Date.now().toString(36)}${testInfo.project.name}`;
      const input = testCase.input ?? {};
      const adminToken = await tokenFor(request, adminCredentials);

      // Seed du lieu rieng cua test (khong dung 5 san pham seed san cua he
      // thong) de thao tac sua/xoa khong lam hong du lieu goc.
      const seeded = new Map<string, string>();
      for (const seed of testCase.seedProducts ?? []) {
        const name = seed.name.replace('{{unique}}', unique);
        await createProduct(request, adminToken, { name, price: seed.price });
        seeded.set(seed.key, name);
      }

      switch (testCase.kind) {
        // -------------------------------------------------------------------
        // Pattern 1 - thao tac tren form UI, doi chieu ket qua voi API.
        // -------------------------------------------------------------------
        case 'uiCreate': {
          const name = buildName(input, unique);

          await loginAdmin(page);
          await openProductsTab(page);

          await nameInput(page).fill(name);
          await priceInput(page).fill(input.price ?? '');
          await page.locator('form select').selectOption({ label: category.name });

          const response = await submitProductForm(page, 'POST');

          // Pattern 2 - assertion tren Constraint Validation API cua DOM.
          if (testCase.expected.fieldInvalid) {
            const invalid = await nameInput(page).evaluate(
              (el) => (el as HTMLInputElement).validity.valueMissing,
            );
            expect(
              invalid,
              `Truong "${testCase.expected.fieldInvalid}" phai bi chan khi de trong`,
            ).toBe(true);
          }

          const after = await listProducts(request);
          const wasCreated =
            name.length > 0
              ? after.some((p) => p.name === name)
              : after.length > baselineIds.length;

          expect(
            wasCreated,
            testCase.expected.created
              ? `FR-15: du lieu hop le phai duoc luu (request gui di: ${response ? 'co' : 'khong'})`
              : `FR-15: du lieu khong hop le khong duoc luu (request gui di: ${response ? 'co' : 'khong'})`,
          ).toBe(testCase.expected.created);

          if (testCase.expected.created) {
            await expect(
              productRow(page, name),
              'San pham vua tao phai xuat hien trong danh sach',
            ).toHaveCount(1);
          }
          break;
        }

        // -------------------------------------------------------------------
        // Pattern 3 - assertion tren phan hoi API (validate phia backend).
        // -------------------------------------------------------------------
        case 'apiValidation': {
          const name = buildName(input, unique);
          const res = await request.post(`${API_BASE}/api/products`, {
            headers: authHeader(adminToken),
            data: {
              name,
              price: input.price,
              description: '',
              imageUrl: '',
              category_id: input.useCategory ? category.id : input.category_id,
            },
          });

          expect(res.ok(), `${testCase.expected.reason} - request phai bi tu choi`).toBe(false);

          const after = await listProducts(request);
          expect(
            after.some((p) => p.name === name),
            'Khong duoc luu san pham khi du lieu khong hop le',
          ).toBe(false);
          break;
        }

        // -------------------------------------------------------------------
        // Pattern 4 - assertion tren ma trang thai HTTP (kiem soat truy cap).
        // -------------------------------------------------------------------
        case 'apiAuthCheck': {
          const name = buildName(input, unique);
          const token =
            testCase.auth === 'user' ? await tokenFor(request, userCredentials) : undefined;

          const res = await request.post(`${API_BASE}/api/products`, {
            headers: authHeader(token),
            data: {
              name,
              price: Number(input.price),
              description: '',
              imageUrl: '',
              category_id: category.id,
            },
          });

          expect(
            testCase.expected.statuses,
            'Danh sach ma trang thai mong doi phai duoc khai bao trong file du lieu',
          ).toBeDefined();
          expect(
            testCase.expected.statuses!,
            `${testCase.expected.reason} - nhan duoc ${res.status()}`,
          ).toContain(res.status());

          const after = await listProducts(request);
          expect(
            after.some((p) => p.name === name),
            'Khong duoc tao san pham khi chua du quyen',
          ).toBe(false);
          break;
        }

        // -------------------------------------------------------------------
        // Pattern 5 - assertion tren su TON TAI cua element bat buoc theo spec.
        // -------------------------------------------------------------------
        case 'categoryRequired': {
          await loginAdmin(page);
          await openProductsTab(page);

          await expect(
            page.locator('form select').locator('option[value=""]'),
            testCase.expected.reason,
          ).toHaveCount(1);
          break;
        }

        case 'editIsolation': {
          const editName = seeded.get(input.editKey!)!;
          const untouchedName = seeded.get(testCase.expected.untouchedKey!)!;
          const newName = (input.newName ?? '').replace('{{unique}}', unique);

          await loginAdmin(page);
          await openProductsTab(page);

          await productRow(page, editName).getByRole('button', { name: 'Sửa' }).click();
          await nameInput(page).fill(newName);
          await priceInput(page).fill(input.newPrice ?? '');
          await submitProductForm(page, 'PUT');

          // Tang 1 - giao dien ngay sau khi luu. App.jsx:110-114 doi ten TAT CA
          // san pham trong state cuc bo, nen day la noi bug lo ra voi nguoi
          // dung. Neu chi kiem API se FALSE PASS va bo sot bug nay.
          await expect
            .soft(
              productRow(page, untouchedName),
              'FR-15: sua 1 san pham khong duoc lam doi hien thi cua san pham khac',
            )
            .toHaveCount(1);

          // Tang 2 - toan ven du lieu that trong CSDL.
          const after = await listProducts(request);
          expect(
            after.some((p) => p.name === newName),
            'San pham duoc sua phai mang gia tri moi',
          ).toBe(true);
          expect(
            after.some((p) => p.name === untouchedName),
            'San pham khac phai giu nguyen trong CSDL',
          ).toBe(true);
          break;
        }

        case 'listIntegrity': {
          const checkName = seeded.get(testCase.expected.checkKey!)!;
          const apiProducts = await listProducts(request);

          await loginAdmin(page);
          await openProductsTab(page);

          await expect(
            productTable(page),
            'Danh sach tren UI phai hien thi dung so luong san pham dang co',
          ).toHaveCount(apiProducts.length);

          const row = productRow(page, checkName);
          await expect(row, `Phai co dung 1 dong cho "${checkName}"`).toHaveCount(1);

          const expectedPrice = apiProducts.find((p) => p.name === checkName)!.price;
          await expect(row, 'Gia hien thi phai khop du lieu trong CSDL').toContainText(
            String(expectedPrice),
          );

          // FR-21: luon dung ky hieu d voi dinh dang phan cach hang nghin.
          await expect
            .soft(row, 'FR-21: gia phai hien thi co phan cach hang nghin')
            .toContainText(
              await page.evaluate((n) => Number(n).toLocaleString(), Number(expectedPrice)),
            );

          // Admin khong co trang chi tiet rieng; "xem chi tiet" = bam Sua roi
          // doi chieu gia tri da do vao form.
          await row.getByRole('button', { name: 'Sửa' }).click();
          await expect(nameInput(page)).toHaveValue(checkName);
          await expect(priceInput(page)).toHaveValue(String(expectedPrice));
          break;
        }

        case 'deleteProduct': {
          const deleteName = seeded.get(input.deleteKey!)!;
          const untouchedName = seeded.get(testCase.expected.untouchedKey!)!;

          await loginAdmin(page);
          await openProductsTab(page);

          const deleteResponse = page
            .waitForResponse(
              (res) =>
                res.url().includes('/api/products') && res.request().method() === 'DELETE',
              { timeout: 5_000 },
            )
            .catch(() => null);
          await productRow(page, deleteName).getByRole('button', { name: 'Xóa' }).click();
          await deleteResponse;

          await expect(
            productRow(page, deleteName),
            'San pham da xoa phai bien khoi danh sach',
          ).toHaveCount(0);
          await expect(
            productRow(page, untouchedName),
            'San pham khac phai giu nguyen trong danh sach',
          ).toHaveCount(1);

          const after = await listProducts(request);
          expect(
            after.some((p) => p.name === deleteName),
            'San pham da xoa khong duoc con trong CSDL',
          ).toBe(false);
          expect(
            after.some((p) => p.name === untouchedName),
            'San pham khac phai con nguyen trong CSDL',
          ).toBe(true);
          break;
        }
      }
    });
  }
});
