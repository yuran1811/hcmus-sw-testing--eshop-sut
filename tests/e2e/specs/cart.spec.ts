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
 * FR-07 - Gio hang (Shopping Cart).
 *
 * Du lieu test nam o test-data/cart.json (yeu cau data-driven cua HW04:
 * khong hardcode inline trong script).
 *
 * LUU Y QUAN TRONG VE DIEU HUONG:
 * CartContext.jsx:6 luu gio hang bang useState([]) thuan, khong co
 * localStorage/sessionStorage. Do do MOI page.goto() deu la full reload va se
 * XOA SACH gio hang. Tat ca thao tac seed du lieu vi vay phai dieu huong bang
 * cach click link trong app (SPA navigation) chu khong duoc dung page.goto().
 * Rieng TC-CART-013 co y reload that vi do chinh la thu can kiem.
 *
 * Cac diem lech giua SUT va FR-07 da xac minh bang doc code (chi tiet kem so
 * dong o muc "knownIssues" trong cart.json). Expected duoi day bam theo dung
 * FR-07 trong README.md (SRS), KHONG chinh theo hanh vi loi hien tai - mot
 * assertion fail o day chinh la bang chung bug cho bao cao.
 */

const API_BASE = 'http://localhost:3000';

type ProductKey = string;

type ProductRef = { id: number; name: string };

type SetupStep = {
  product: ProductKey;
  quantity: number;
  via: 'home' | 'detail';
  clicks?: number;
};

type LineExpectation = { product: ProductKey; quantity: number };

type Expected =
  | { kind: 'cartLines'; lines: LineExpectation[]; requiredColumns?: string[] }
  | { kind: 'elementMissing'; product: ProductKey; controls: string[]; reason: string }
  | { kind: 'totalLabel'; label: string; lines: LineExpectation[] }
  | {
      kind: 'confirmDialog';
      removeProduct: ProductKey;
      dialogAction: 'accept' | 'dismiss';
      remainingLines: LineExpectation[];
    }
  | { kind: 'emptyState'; removeProduct: ProductKey; messageContains: string }
  | { kind: 'navigate'; linkName: string; urlPattern: string }
  | {
      kind: 'quantityGuard';
      product: ProductKey;
      datasets: { label: string; quantity: string; shouldAdd: boolean }[];
    }
  | { kind: 'guestCheckout'; redirectPattern: string; preservedLines: LineExpectation[] }
  | { kind: 'persistence'; lines: LineExpectation[] };

type CartCase = {
  id: string;
  title: string;
  requiresAuth: boolean;
  setup: SetupStep[];
  expected: Expected;
};

const dataFile = path.join(__dirname, '..', 'test-data', 'cart.json');
const data = JSON.parse(readFileSync(dataFile, 'utf-8')) as {
  products: Record<ProductKey, ProductRef>;
  credentials: { email: string; password: string };
  cases: CartCase[];
};

const { products, credentials, cases } = data;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Login.jsx khong gan htmlFor/id giua <label> va <input> (giong Register.jsx),
 * nen getByLabel() vo dung - phai thu hep theo khoi <div> chua nhan.
 */
function loginField(page: Page, label: string): Locator {
  return page.locator('form > div').filter({ hasText: label }).locator('input');
}

async function login(page: Page): Promise<void> {
  await page.goto('/login');
  // Trang dang nhap dat nhan o email la "Username" va nut submit ten "Sign In"
  // (khong phai "Dang nhap") - da xac minh trong Login.jsx.
  await loginField(page, 'Username').fill(credentials.email);
  await loginField(page, 'Mật khẩu').fill(credentials.password);
  await page.getByRole('button', { name: 'Sign In' }).click();
  // Header doi sang trang thai da dang nhap (App.jsx:29).
  await expect(page.getByRole('button', { name: 'Thoát' })).toBeVisible();
}

/** Dieu huong SPA ve trang chu (giu nguyen gio hang trong state). */
async function goHome(page: Page): Promise<void> {
  await page.getByRole('link', { name: 'EShop' }).click();
  await expect(page.getByRole('heading', { name: 'Danh sách sản phẩm' })).toBeVisible();
}

/** Dieu huong SPA sang gio hang (giu nguyen gio hang trong state). */
async function goCart(page: Page): Promise<void> {
  await page.getByRole('link', { name: 'Giỏ hàng', exact: true }).click();
  await expect(page).toHaveURL(/\/cart$/);
}

/** The san pham tren trang chu (Home.jsx:76-104). */
function productCard(page: Page, name: string): Locator {
  return page.locator('div.grid > div').filter({ hasText: name });
}

/**
 * Them vao gio tu trang chu. Nut nay (Home.jsx:97-102) goi thang addToCart nen
 * KHONG dinh bug clickCount cua trang chi tiet - dung lam duong seed on dinh.
 */
async function addViaHome(page: Page, name: string): Promise<void> {
  await productCard(page, name)
    .getByRole('button', { name: 'Thêm vào giỏ', exact: true })
    .click();
}

/**
 * Them vao gio tu trang chi tiet, cho phep chon so luong va SO LAN CLICK.
 *
 * ProductDetail.jsx:21-31 nuot click dau tien (clickCount === 0 thi return),
 * nen so lan click la tham so co y nghia kiem thu:
 *  - clicks = 1: dung theo spec, dung cho TC-CART-001 de phoi bay bug do.
 *  - clicks = 2: co y bu tru bug tren khi can seed du lieu that, hoac khi can
 *    kiem mot yeu cau KHAC (validation so luong o TC-CART-011) ma neu de
 *    clicks = 1 se bi FALSE PASS.
 */
async function addViaDetail(
  page: Page,
  product: ProductRef,
  quantity: number | string,
  clicks: number,
): Promise<void> {
  await productCard(page, product.name).getByRole('link', { name: 'Xem chi tiết' }).click();
  await expect(page.getByRole('heading', { name: product.name })).toBeVisible();

  const quantityInput = page.locator('input[type="number"]');
  await quantityInput.fill(String(quantity));

  const addButton = page.getByRole('button', { name: 'Thêm vào giỏ hàng' });
  for (let i = 0; i < clicks; i++) {
    await addButton.click();
  }
}

async function runSetup(page: Page, steps: SetupStep[]): Promise<void> {
  for (const step of steps) {
    const product = products[step.product];
    if (step.via === 'home') {
      await goHome(page);
      await addViaHome(page, product.name);
    } else {
      await goHome(page);
      await addViaDetail(page, product, step.quantity, step.clicks ?? 1);
    }
  }
}

/** Cac dong san pham trong bang gio hang (Cart.jsx:42-59). */
function cartRows(page: Page): Locator {
  return page.locator('table tbody tr');
}

/**
 * Da doi tu hasText (khop chuoi con, khong phan biet hoa/thuong) sang khop
 * CHINH XAC noi dung cell "San pham" - cung mot lop loi da xac nhan that o
 * productRow() trong product.spec.ts (TC-PRODUCT-003, ten 1 ky tu "A" khop
 * nham 5-6 dong khac). Du cart.json hien chi dung ten dai/duy nhat nen chua
 * gay fail that, day van la cung dang locator gion, sua truoc de tranh lap
 * lai dung bug da biet neu sau nay them du lieu ten ngan.
 */
function rowFor(page: Page, name: string): Locator {
  return cartRows(page).filter({ has: page.getByRole('cell', { name, exact: true }) });
}

/**
 * Dinh dang tien te dung dung locale cua BROWSER dang chay, vi Cart.jsx dung
 * Number(...).toLocaleString() phia client. Tinh o phia Node se lech locale
 * giua 3 browser.
 */
async function formatMoney(page: Page, value: number): Promise<string> {
  return page.evaluate((n) => Number(n).toLocaleString(), value);
}

/** Don gia that lay tu API - khong hardcode trong file du lieu. */
async function unitPrice(request: APIRequestContext, id: number): Promise<number> {
  const res = await request.get(`${API_BASE}/api/products/${id}`);
  const body = await res.json();
  return Number(body.price);
}

/** Kiem tra tung dong + tong cong, doi chieu voi don gia lay tu API. */
async function assertLines(
  page: Page,
  request: APIRequestContext,
  lines: LineExpectation[],
): Promise<void> {
  await expect(cartRows(page), 'So dong trong gio hang phai dung nhu ky vong').toHaveCount(
    lines.length,
  );

  let grandTotal = 0;
  for (const line of lines) {
    const product = products[line.product];
    const price = await unitPrice(request, product.id);
    const lineTotal = price * line.quantity;
    grandTotal += lineTotal;

    const row = rowFor(page, product.name);
    await expect(row, `Phai co dung 1 dong cho "${product.name}"`).toHaveCount(1);

    // Cot: 0 San pham | 1 Don gia | 2 So luong | 3 Thanh tien | 4 Thao tac
    await expect(row.locator('td').nth(2), `So luong cua "${product.name}"`).toHaveText(
      String(line.quantity),
    );
    await expect(row.locator('td').nth(3), `Thanh tien cua "${product.name}"`).toContainText(
      await formatMoney(page, lineTotal),
    );
  }

  // Khu vuc tong tien nam ngoai bang (Cart.jsx:61-64).
  await expect(
    page.locator('div.text-xl.font-bold'),
    'Tong cong phai bang tong Thanh tien cac dong',
  ).toContainText(await formatMoney(page, grandTotal));
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

test.describe('FR-07 - Gio hang', () => {
  for (const testCase of cases) {
    test(`${testCase.id}: ${testCase.title}`, async ({ page, request }) => {
      const expected = testCase.expected;

      if (testCase.requiresAuth) {
        await login(page);
      } else {
        // TC-CART-012 / 013 chay o trang thai khach vang lai dung theo
        // Preconditions ghi trong file test case tuong ung.
        await page.goto('/');
      }

      // quantityGuard tu quan ly viec seed cho tung bo du lieu.
      if (expected.kind !== 'quantityGuard') {
        await runSetup(page, testCase.setup);
        await goCart(page);
      }

      switch (expected.kind) {
        // Pattern 1 - doi chieu du lieu hien thi tren UI voi du lieu goc lay tu
        // API (so dong, so luong, thanh tien, tong cong).
        case 'cartLines': {
          if (expected.requiredColumns) {
            for (const column of expected.requiredColumns) {
              await expect
                .soft(
                  page.getByRole('columnheader', { name: column, exact: true }),
                  `FR-07 yeu cau bang gio hang co cot "${column}"`,
                )
                .toHaveCount(1);
            }
          }
          await assertLines(page, request, expected.lines);
          break;
        }

        // Pattern 2 - assertion tren su TON TAI cua element bat buoc theo spec.
        // Chi assert count, KHONG click vao locator rong de tranh timeout mu mo.
        case 'elementMissing': {
          const row = rowFor(page, products[expected.product].name);
          for (const control of expected.controls) {
            await expect(
              row.getByRole('button', { name: control, exact: true }),
              `${expected.reason} - khong tim thay nut "${control}"`,
            ).toHaveCount(1);
          }
          break;
        }

        // Pattern 3 - assertion tren noi dung van ban hien thi cho nguoi dung.
        case 'totalLabel': {
          await expect
            .soft(
              page.getByText(expected.label, { exact: false }),
              `FR-07 yeu cau nhan tong tien dung chu "${expected.label}"`,
            )
            .toHaveCount(1);
          await assertLines(page, request, expected.lines);
          // Dinh dang tien: ky hieu d kem phan cach hang nghin.
          await expect(page.locator('div.text-xl.font-bold')).toContainText('₫');
          break;
        }

        // Pattern 4 - assertion tren su kien cua trinh duyet (dialog).
        case 'confirmDialog': {
          let dialogShown = false;
          page.on('dialog', async (dialog) => {
            dialogShown = true;
            if (expected.dialogAction === 'accept') {
              await dialog.accept();
            } else {
              await dialog.dismiss();
            }
          });

          await rowFor(page, products[expected.removeProduct].name)
            .getByRole('button', { name: 'Xóa' })
            .click();

          expect
            .soft(dialogShown, 'FR-07 yeu cau phai co dialog xac nhan truoc khi xoa san pham')
            .toBe(true);

          await assertLines(page, request, expected.remainingLines);
          break;
        }

        case 'emptyState': {
          await rowFor(page, products[expected.removeProduct].name)
            .getByRole('button', { name: 'Xóa' })
            .click();

          await expect(page.getByText(new RegExp(expected.messageContains, 'i'))).toBeVisible();
          await expect(cartRows(page), 'Khong con bang san pham khi gio rong').toHaveCount(0);

          // FR-24: empty state phai co icon/hinh minh hoa, khong chi co chu.
          await expect
            .soft(
              page.locator('main img, main svg'),
              'FR-24 yeu cau empty state co icon/hinh minh hoa',
            )
            .not.toHaveCount(0);
          break;
        }

        // Pattern 5 - assertion tren dieu huong.
        case 'navigate': {
          const link = page.getByRole('link', { name: expected.linkName, exact: true });
          await expect(
            link,
            `FR-07 yeu cau nut quay lai co nhan dung "${expected.linkName}"`,
          ).toHaveCount(1);
          await link.click();
          await expect(page).toHaveURL(new RegExp(expected.urlPattern));
          break;
        }

        case 'quantityGuard': {
          const product = products[expected.product];
          for (const dataset of expected.datasets) {
            // page.goto la full reload -> reset gio hang, dung lam trang thai
            // sach cho tung bo du lieu.
            await page.goto('/');
            // clicks = 2 la co y: xem giai thich o addViaDetail().
            await addViaDetail(page, product, dataset.quantity, 2);
            await goCart(page);

            // Dung .soft() vi day la vong lap qua 4 bo du lieu BVA (D1-D4) trong
            // CUNG 1 test: expect() cung se nem loi va DUNG vong lap ngay o bo
            // dau tien fail, khien D2/D3/D4 khong bao gio duoc kiem va bao cao.
            // Da xac minh dieu nay bang cach chay that: khong co soft, run chi
            // bao loi D1 roi dung, che khuat ket qua cua D2-D4.
            if (dataset.shouldAdd) {
              await expect
                .soft(
                  cartRows(page),
                  `${dataset.label}: So luong hop le phai tao dung 1 dong`,
                )
                .toHaveCount(1);
            } else {
              await expect
                .soft(
                  cartRows(page),
                  `${dataset.label}: So luong "${dataset.quantity}" khong hop le, khong duoc tao dong nao trong gio`,
                )
                .toHaveCount(0);
            }

            await expect
              .soft(
                page.locator('main'),
                `${dataset.label}: gio hang khong duoc hien thi NaN`,
              )
              .not.toContainText('NaN');
          }
          break;
        }

        case 'guestCheckout': {
          await page.getByRole('button', { name: 'Tiến hành thanh toán' }).click();
          await expect(page).toHaveURL(new RegExp(expected.redirectPattern));

          // Gio hang phai con nguyen khi quay lai bang dieu huong noi bo.
          await goCart(page);
          await assertLines(page, request, expected.preservedLines);

          // FR-08: vao thang URL /checkout khi chua dang nhap cung phai bi chan.
          await page.goto('/checkout');
          await expect(
            page.getByRole('heading', { name: 'Xác Nhận Đơn Hàng' }),
            'FR-08 yeu cau chan truy cap /checkout khi chua dang nhap',
          ).toHaveCount(0);
          break;
        }

        case 'persistence': {
          await assertLines(page, request, expected.lines);

          // Day la thao tac can kiem: reload that (F5), khong phai dieu huong SPA.
          await page.reload();
          await expect(
            page.getByText('Giỏ hàng của bạn đang trống'),
            'FR-07: sau khi tai lai trang, gio hang khong duoc roi ve empty state',
          ).toHaveCount(0);
          await assertLines(page, request, expected.lines);
          break;
        }
      }
    });
  }
});
