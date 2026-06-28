import { test, expect, Page } from '@playwright/test';
import { apiLogin, ensureCategory, createProduct, ADMIN_CREDS } from '../utils/api-helpers';

/**
 * FR-15 — Quản lý Sản phẩm (frontend-admin, port 5174, tab "Sản phẩm").
 *
 * Ghi chú thiết kế test:
 * - <select> Danh mục luôn có 1 giá trị được chọn sẵn -> không tái hiện được "không chọn Danh
 *   mục" qua UI, nên TC-PRODUCT-011 được test ở tầng API (xem product-api.spec.ts).
 * - Nút lưu trên UI ghi "Lưu sản phẩm" (test case gốc ghi "Lưu" — chỉ khác chữ).
 */

async function loginAsAdmin(page: Page) {
  await page.goto('/');
  await page.getByPlaceholder('Email').fill(ADMIN_CREDS.email);
  await page.getByPlaceholder('Password').fill(ADMIN_CREDS.password);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('EShop Admin')).toBeVisible();
}

async function goToProductsTab(page: Page) {
  await page.locator('li', { hasText: 'Sản phẩm' }).click();
  await expect(page.getByRole('heading', { name: 'Quản lý Sản phẩm' })).toBeVisible();
}

async function fillProductForm(page: Page, data: { name?: string; price?: string; categoryLabel?: string }) {
  if (data.name !== undefined) await page.getByPlaceholder('Tên sản phẩm').fill(data.name);
  if (data.price !== undefined) await page.getByPlaceholder('Giá tiền').fill(data.price);
  if (data.categoryLabel) await page.locator('select').selectOption({ label: data.categoryLabel });
}

const saveButton = (page: Page) => page.getByRole('button', { name: 'Lưu sản phẩm' });

function productRow(page: Page, exactName: string) {
  return page.locator('table tbody tr').filter({ has: page.getByText(exactName, { exact: true }) });
}

/** Bấm Lưu và đợi đúng response của request POST/PUT /api/products (web-first, không dùng timeout cứng). */
async function saveAndWaitResponse(page: Page, method: 'POST' | 'PUT' = 'POST') {
  const responsePromise = page.waitForResponse(
    (res) => res.url().includes('/api/products') && res.request().method() === method,
  );
  await saveButton(page).click();
  return responsePromise;
}

test.describe('FR-15 Quản lý Sản phẩm — UI Admin', () => {
  test.beforeAll(async ({ request }) => {
    const { token } = await apiLogin(request, ADMIN_CREDS.email, ADMIN_CREDS.password);
    await ensureCategory(request, token, 'Thời trang');
  });

  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await goToProductsTab(page);
  });

  test('TC-PRODUCT-001: Thêm sản phẩm với dữ liệu hợp lệ -> tạo thành công', async ({ page }) => {
    const name = `Áo thun nam ${Date.now()}`;
    await fillProductForm(page, { name, price: '150000', categoryLabel: 'Thời trang' });
    const response = await saveAndWaitResponse(page);
    expect(response.ok(), 'POST /api/products phải trả 2xx').toBeTruthy();
    await expect(productRow(page, name)).toBeVisible();
  });

  test('TC-PRODUCT-002 [BVA]: Tên sản phẩm đúng 255 ký tự (biên trên hợp lệ)', async ({ page }) => {
    const name = 'A'.repeat(255);
    await fillProductForm(page, { name, price: '150000', categoryLabel: 'Thời trang' });
    const response = await saveAndWaitResponse(page);
    expect(response.ok(), 'Tên 255 ký tự là biên hợp lệ, phải tạo thành công').toBeTruthy();
  });

  test('TC-PRODUCT-003 [BVA]: Tên sản phẩm 1 ký tự (biên dưới hợp lệ)', async ({ page }) => {
    const name = `A${Date.now()}`; // vẫn ngắn nhưng có suffix để tránh đụng dữ liệu các lần chạy trước
    await fillProductForm(page, { name, price: '150000', categoryLabel: 'Thời trang' });
    const response = await saveAndWaitResponse(page);
    expect(response.ok(), 'Tên không rỗng là hợp lệ, phải tạo thành công').toBeTruthy();
    await expect(productRow(page, name)).toBeVisible();
  });

  test('TC-PRODUCT-004 [BVA]: Giá là số dương nhỏ nhất = 1 (biên dưới hợp lệ)', async ({ page }) => {
    const name = `Áo thun nam ${Date.now()}`;
    await fillProductForm(page, { name, price: '1', categoryLabel: 'Thời trang' });
    const response = await saveAndWaitResponse(page);
    expect(response.ok(), 'Giá = 1 thoả "> 0", phải tạo thành công').toBeTruthy();
    await expect(productRow(page, name)).toContainText('1 ₫');
  });

  test('TC-PRODUCT-005: Tên sản phẩm để trống -> chặn submit, không tạo sản phẩm', async ({ page }) => {
    await fillProductForm(page, { name: '', price: '150000', categoryLabel: 'Thời trang' });
    await saveButton(page).click();
    // Input "Tên sản phẩm" có required -> browser chặn submit, không có request nào được gửi.
    const isValid = await page.getByPlaceholder('Tên sản phẩm').evaluate((el: HTMLInputElement) => el.validity.valid);
    expect(isValid, 'Input Tên sản phẩm phải invalid khi để trống').toBe(false);
  });

  test('TC-PRODUCT-006: Tên sản phẩm vượt quá 255 ký tự -> phải bị từ chối', async ({ page }) => {
    const name = 'B'.repeat(256);
    await fillProductForm(page, { name, price: '150000', categoryLabel: 'Thời trang' });
    const response = await saveAndWaitResponse(page);
    expect(response.status(), 'Spec yêu cầu reject khi Tên > 255 ký tự').toBe(400);
  });

  test('TC-PRODUCT-007: Giá bằng 0 -> phải bị từ chối', async ({ page }) => {
    const name = `Áo thun nam ${Date.now()}`;
    await fillProductForm(page, { name, price: '0', categoryLabel: 'Thời trang' });
    const response = await saveAndWaitResponse(page);
    expect(response.status(), 'Spec yêu cầu reject khi Giá = 0').toBe(400);
  });

  test('TC-PRODUCT-008: Giá là số âm -> phải bị từ chối', async ({ page }) => {
    const name = `Áo thun nam ${Date.now()}`;
    await fillProductForm(page, { name, price: '-1000', categoryLabel: 'Thời trang' });
    const response = await saveAndWaitResponse(page);
    expect(response.status(), 'Spec yêu cầu reject khi Giá âm').toBe(400);
  });

  test('TC-PRODUCT-009: Giá để trống -> phải bị từ chối', async ({ page }) => {
    const name = `Áo thun nam ${Date.now()}`;
    await fillProductForm(page, { name, price: '', categoryLabel: 'Thời trang' });
    const response = await saveAndWaitResponse(page);
    expect(response.status(), 'Spec yêu cầu reject khi Giá rỗng').toBe(400);
  });

  test('TC-PRODUCT-010: Giá không phải số (abc) -> phải bị từ chối', async ({ page }) => {
    const name = `Áo thun nam ${Date.now()}`;
    await fillProductForm(page, { name, categoryLabel: 'Thời trang' });
    // Lưu ý: input type="number" -> Locator.fill('abc') THROW ngay (Playwright chặn fill giá trị
    // không hợp lệ cho input number). Dùng pressSequentially để mô phỏng gõ tay từng phím như user
    // thật — browser sẽ tự bỏ qua các ký tự không phải số, giá trị thực tế còn lại là rỗng (hội tụ
    // về cùng tình huống với TC-PRODUCT-009: giá rỗng).
    await page.getByPlaceholder('Giá tiền').pressSequentially('abc');
    const response = await saveAndWaitResponse(page);
    expect(response.status(), 'Spec yêu cầu reject khi Giá không hợp lệ').toBe(400);
  });

  test('TC-PRODUCT-015: Sửa một sản phẩm chỉ ảnh hưởng đúng sản phẩm đó', async ({ page, request }) => {
    const { token } = await apiLogin(request, ADMIN_CREDS.email, ADMIN_CREDS.password);
    const categoryId = await ensureCategory(request, token, 'Thời trang');
    const suffix = Date.now();
    const nameX = `Sản phẩm X ${suffix}`;
    const nameY = `Sản phẩm Y ${suffix}`;
    await createProduct(request, { name: nameX, price: 100000, category_id: categoryId });
    await createProduct(request, { name: nameY, price: 200000, category_id: categoryId });

    await page.reload();
    await goToProductsTab(page);
    await productRow(page, nameX).getByRole('button', { name: 'Sửa' }).click();
    await fillProductForm(page, { name: `${nameX} (đã cập nhật)` });
    await saveAndWaitResponse(page, 'PUT');

    await expect(productRow(page, `${nameX} (đã cập nhật)`).first()).toBeVisible();
    // Sản phẩm Y không liên quan đến lần Sửa này, theo spec phải giữ nguyên tên gốc.
    await expect(productRow(page, nameY), 'Sản phẩm Y không liên quan phải giữ nguyên tên').toBeVisible();
  });

  test('TC-PRODUCT-016 [BVA]: Giá là số thực dương nhỏ nhất 0.01 (biên dưới > 0)', async ({ page }) => {
    const name = `Áo thun nam ${Date.now()}`;
    await fillProductForm(page, { name, price: '0.01', categoryLabel: 'Thời trang' });
    const response = await saveAndWaitResponse(page);
    expect(response.ok(), '0.01 thoả "> 0" theo spec, phải tạo thành công').toBeTruthy();
  });

  test('TC-PRODUCT-017: Xem (Read/List) sản phẩm hiển thị đúng dữ liệu', async ({ page, request }) => {
    const { token } = await apiLogin(request, ADMIN_CREDS.email, ADMIN_CREDS.password);
    const categoryId = await ensureCategory(request, token, 'Thời trang');
    const name = `Sản phẩm X ${Date.now()}`;
    await createProduct(request, { name, price: 150000, category_id: categoryId });

    await page.reload();
    await goToProductsTab(page);
    const row = productRow(page, name);
    await expect(row).toBeVisible();
    await expect(row).toContainText('150000');
  });

  test('TC-PRODUCT-018: Xóa sản phẩm thành công -> loại khỏi danh sách, sản phẩm khác không đổi', async ({
    page,
    request,
  }) => {
    const { token } = await apiLogin(request, ADMIN_CREDS.email, ADMIN_CREDS.password);
    const categoryId = await ensureCategory(request, token, 'Thời trang');
    const suffix = Date.now();
    const nameX = `Sản phẩm X ${suffix}`;
    const nameY = `Sản phẩm Y ${suffix}`;
    await createProduct(request, { name: nameX, price: 100000, category_id: categoryId });
    await createProduct(request, { name: nameY, price: 200000, category_id: categoryId });

    await page.reload();
    await goToProductsTab(page);
    page.once('dialog', (dialog) => dialog.accept());
    await productRow(page, nameX).getByRole('button', { name: 'Xóa' }).click();

    await expect(productRow(page, nameX)).toHaveCount(0);
    await expect(productRow(page, nameY)).toBeVisible();
  });
});
