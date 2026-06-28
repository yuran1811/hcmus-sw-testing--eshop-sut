import { test, expect, Page } from '@playwright/test';
import { apiLogin, ensureCategory, createProduct, ADMIN_CREDS } from './utils/api-helpers';

/**
 * FR-07 — Giỏ hàng (frontend-web, /cart).
 *
 * Điều hướng trong suite này:
 *   - Chỉ dùng `page.goto()` cho điều hướng ĐẦU TIÊN của mỗi test.
 *   - Mọi điều hướng sau đó dùng click() vào Link trong app (SPA, không reload) để giữ state.
 */

const PRODUCT_A = { name: 'Sản phẩm A', price: 100000 };
const PRODUCT_B = { name: 'Sản phẩm B', price: 50000 };

let productAId: number;
let productBId: number;

test.beforeAll(async ({ request }) => {
  const { token } = await apiLogin(request, ADMIN_CREDS.email, ADMIN_CREDS.password);
  const categoryId = await ensureCategory(request, token, 'Thời trang');
  productAId = await createProduct(request, { ...PRODUCT_A, category_id: categoryId });
  productBId = await createProduct(request, { ...PRODUCT_B, category_id: categoryId });
});

const cartLink = (page: Page) => page.getByRole('link', { name: 'Giỏ hàng' });
const productCard = (page: Page, name: string) => page.locator('.grid > div', { hasText: name });
const addToCartFromDetail = (page: Page) =>
  page.getByRole('button', { name: /Thêm vào giỏ hàng|Đã thêm/ });
const cartRow = (page: Page, name: string) => page.locator('table tbody tr', { hasText: name });
const cartTotalText = (page: Page) => page.locator('div.text-xl.font-bold');

/** Mở trang chi tiết sản phẩm và bấm "Thêm vào giỏ hàng" đúng 2 lần. */
async function addProductViaDetailPage(page: Page, productId: number) {
  await page.goto(`/product/${productId}`);
  const addBtn = addToCartFromDetail(page);
  await addBtn.click();
  await addBtn.click();
}

/** Thêm nhanh từ Home (nút "Thêm vào giỏ" trên card) — dùng để setup precondition. */
async function addProductFromHome(page: Page, name: string) {
  await productCard(page, name).getByRole('button', { name: 'Thêm vào giỏ' }).click();
}

test.describe('FR-07 Giỏ hàng', () => {
  test('TC-CART-001: Thêm sản phẩm chưa có trong giỏ -> tạo dòng mới', async ({ page }) => {
    await addProductViaDetailPage(page, productAId);
    await cartLink(page).click();

    await expect(page.locator('table tbody tr')).toHaveCount(1);
    const row = cartRow(page, PRODUCT_A.name);
    await expect(row).toContainText('1');
    await expect(row).toContainText('100.000');
    await expect(cartTotalText(page)).toContainText('100.000');
  });

  test('TC-CART-002: Thêm lại sản phẩm đã có trong giỏ -> tăng số lượng, không tạo dòng trùng', async ({ page }) => {
    await page.goto('/');
    // Lần 1: vào trang chi tiết Sản phẩm A và thêm vào giỏ (đúng theo Steps của test case).
    await productCard(page, PRODUCT_A.name).getByRole('link', { name: 'Xem chi tiết' }).click();
    let addBtn = addToCartFromDetail(page);
    await addBtn.click();
    await addBtn.click();

    // Quay lại Home bằng SPA link (không dùng page.goto) để giữ nguyên trạng thái giỏ hàng,
    // rồi vào lại trang chi tiết Sản phẩm A để thêm LẦN 2.
    await page.getByRole('link', { name: 'EShop' }).click();
    await productCard(page, PRODUCT_A.name).getByRole('link', { name: 'Xem chi tiết' }).click();
    addBtn = addToCartFromDetail(page);
    await addBtn.click();
    await addBtn.click();

    await cartLink(page).click();

    await expect(page.locator('table tbody tr', { hasText: PRODUCT_A.name })).toHaveCount(1);
    await expect(cartRow(page, PRODUCT_A.name)).toContainText('2');
    await expect(cartTotalText(page)).toContainText('200.000');
  });

  test('TC-CART-003: Tăng Số lượng bằng nút "+" -> Thành tiền & Tổng cộng cập nhật', async ({ page }) => {
    await addProductViaDetailPage(page, productAId);
    await cartLink(page).click();

    // Dùng timeout ngắn (5s) để fail nhanh, rõ ràng thay vì chờ hết 30s mặc định.
    await cartRow(page, PRODUCT_A.name).getByRole('button', { name: '+' }).click({ timeout: 5_000 });

    await expect(cartRow(page, PRODUCT_A.name)).toContainText('2');
    await expect(cartRow(page, PRODUCT_A.name)).toContainText('200.000');
    await expect(cartTotalText(page)).toContainText('200.000');
  });

  test('TC-CART-004: Giảm Số lượng bằng nút "-" khi đang > 1 (chạm biên dưới hợp lệ = 1)', async ({ page }) => {
    await addProductViaDetailPage(page, productAId);
    await cartLink(page).click();
    // Precondition cần Qty = 2 trước, dùng nút "+" để thiết lập.
    await cartRow(page, PRODUCT_A.name).getByRole('button', { name: '+' }).click({ timeout: 5_000 });

    await cartRow(page, PRODUCT_A.name).getByRole('button', { name: '-' }).click({ timeout: 5_000 });
    await expect(cartRow(page, PRODUCT_A.name)).toContainText('1');
    await expect(cartTotalText(page)).toContainText('100.000');
  });

  test('TC-CART-005: Bấm "-" khi Số lượng = 1 -> chặn vượt biên dưới (không cho xuống 0)', async ({ page }) => {
    await addProductViaDetailPage(page, productAId);
    await cartLink(page).click();

    await cartRow(page, PRODUCT_A.name).getByRole('button', { name: '-' }).click({ timeout: 5_000 });

    await expect(cartRow(page, PRODUCT_A.name)).toContainText('1');
    await expect(cartTotalText(page)).toContainText('100.000');
  });

  test('TC-CART-006: Tổng cộng = tổng Thành tiền nhiều dòng; nhãn đúng "Tổng cộng"', async ({ page }) => {
    await page.goto('/');
    // Dùng nút "Thêm vào giỏ" trực tiếp trên Home để setup nhanh, vì phần đang kiểm thử ở đây
    // là phép tính Tổng cộng, không phải luồng thêm-vào-giỏ.
    await addProductFromHome(page, PRODUCT_A.name); // Sản phẩm A x1 = 100.000
    await addProductFromHome(page, PRODUCT_B.name); // Sản phẩm B lần 1
    await addProductFromHome(page, PRODUCT_B.name); // Sản phẩm B lần 2 -> cộng dồn Tổng = 100.000
    await cartLink(page).click();

    await expect(cartTotalText(page)).toContainText('200.000');
    await expect(cartTotalText(page)).toContainText('Tổng cộng');
  });

  test('TC-CART-007: Xóa sản phẩm và xác nhận dialog -> dòng bị xóa, Tổng cộng cập nhật', async ({ page }) => {
    await page.goto('/');
    await addProductFromHome(page, PRODUCT_A.name);
    await addProductFromHome(page, PRODUCT_B.name);
    await cartLink(page).click();

    // Nếu app có window.confirm() thật, tự động bấm OK.
    page.once('dialog', (dialog) => dialog.accept());
    await cartRow(page, PRODUCT_A.name).getByRole('button', { name: 'Xóa' }).click();

    await expect(page.locator('table tbody tr', { hasText: PRODUCT_A.name })).toHaveCount(0);
    await expect(cartRow(page, PRODUCT_B.name)).toBeVisible();
    await expect(cartTotalText(page)).toContainText('50.000');
  });

  test('TC-CART-008: Xóa sản phẩm nhưng hủy dialog -> dòng giữ nguyên', async ({ page }) => {
    await page.goto('/');
    await addProductFromHome(page, PRODUCT_A.name);
    await addProductFromHome(page, PRODUCT_B.name);
    await cartLink(page).click();

    await cartRow(page, PRODUCT_A.name).getByRole('button', { name: 'Xóa' }).click();
    // Theo spec phải có dialog xác nhận với nút "Hủy"; dùng timeout ngắn (5s) để fail nhanh nếu không tìm thấy.
    await page.getByRole('button', { name: 'Hủy' }).click({ timeout: 5_000 });

    await expect(page.locator('table tbody tr', { hasText: PRODUCT_A.name })).toHaveCount(1);
  });

  test('TC-CART-009: Xóa hết sản phẩm -> giỏ rỗng hiển thị empty state', async ({ page }) => {
    await page.goto('/');
    await addProductFromHome(page, PRODUCT_A.name);
    await cartLink(page).click();

    page.once('dialog', (dialog) => dialog.accept());
    await cartRow(page, PRODUCT_A.name).getByRole('button', { name: 'Xóa' }).click();

    await expect(page.getByText('Giỏ hàng của bạn đang trống')).toBeVisible();
    await expect(page.locator('table')).toHaveCount(0);
    // Spec yêu cầu có illustration/icon kèm thông báo khi giỏ hàng rỗng.
    await expect(page.locator('main img, main svg')).toBeVisible({ timeout: 5_000 });
  });

  test('TC-CART-010: Bấm "Tiếp tục mua sắm" -> điều hướng về trang chủ', async ({ page }) => {
    await page.goto('/cart');
    await expect(page.getByText('Giỏ hàng của bạn đang trống')).toBeVisible();

    await page.getByRole('link', { name: 'Tiếp tục mua sắm' }).click();
    await expect(page).toHaveURL('http://localhost:5173/');
  });
});
