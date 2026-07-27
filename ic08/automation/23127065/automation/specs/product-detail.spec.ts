import { expect, test as base, type APIRequestContext } from "@playwright/test";
import { loadProductDetailCases } from "../src/data/load-product-detail-cases";
import type {
  PreparedScenario,
  ProductAction,
  ProductDetailCase,
  ProductExpectation,
} from "../src/models/product-detail";
import { ProductDetailPage } from "../src/pages/product-detail-page";

const cases = loadProductDetailCases();
const casesById = new Map(cases.map((record) => [record.caseId, record]));
const apiBaseUrl = process.env.API_BASE_URL ?? "http://127.0.0.1:3000";

const test = base.extend<{ preparedScenario: PreparedScenario }>({
  preparedScenario: async ({ page, request }, use, testInfo) => {
    const caseId = testInfo.title.match(/\[(TC-PRODUCT-DETAIL-\d{3})\]/)?.[1];
    const record = caseId ? casesById.get(caseId) : undefined;
    if (!record) throw new Error(`Automation defect: no dataset record matches '${testInfo.title}'`);

    let token: string | undefined;
    let createdProductId: number | undefined;
    let createdProductName: string | undefined;
    let routeParam = record.routeParam;

    try {
      if (record.authentication === "authenticated") {
        const loginResponse = await request.post(`${apiBaseUrl}/api/login`, {
          data: {
            email: process.env.ESHOP_USER_EMAIL ?? "test@eshop.com",
            password: process.env.ESHOP_USER_PASSWORD ?? "Test1234!",
          },
        });
        if (!loginResponse.ok()) {
          throw new Error(`Environment failure: login API returned ${loginResponse.status()}`);
        }
        const loginBody = (await loginResponse.json()) as { token?: unknown };
        if (typeof loginBody.token !== "string" || loginBody.token.length === 0) {
          throw new Error("Environment failure: login API did not return a JWT token");
        }
        token = loginBody.token;
        await page.addInitScript((jwt) => localStorage.setItem("token", jwt), token);
      }

      if (record.product.kind === "malicious") {
        createdProductName = `${record.product.namePrefix} [${Date.now()}-${testInfo.retry}]`;
        const createResponse = await request.post(`${apiBaseUrl}/api/products`, {
          data: {
            name: createdProductName,
            price: record.product.price,
            description: record.product.description,
            imageUrl: record.product.imageUrl,
            category_id: record.product.categoryId,
          },
        });
        if (!createResponse.ok()) {
          throw new Error(
            `Environment failure: malicious product setup returned ${createResponse.status()}`,
          );
        }
        const createBody = (await createResponse.json()) as { id?: unknown };
        if (typeof createBody.id !== "number") {
          throw new Error("Automation defect: product setup response did not contain a numeric id");
        }
        createdProductId = createBody.id;
        routeParam = String(createdProductId);
      }

      await use({ record, routeParam, token, createdProductId, createdProductName });
    } finally {
      if (createdProductId !== undefined) {
        const deleteResponse = await request.delete(
          `${apiBaseUrl}/api/products/${createdProductId}`,
        );
        if (!deleteResponse.ok()) {
          throw new Error(
            `Environment failure: product cleanup returned ${deleteResponse.status()}`,
          );
        }
      }
    }
  },
});

test.beforeEach(async ({ request }) => {
  const response = await request.get(`${apiBaseUrl}/api/products/1`);
  expect(response.status(), "The seeded Product Detail API must be reachable").toBe(200);
});

async function performAction(
  action: ProductAction,
  productPage: ProductDetailPage,
  routeParam: string,
): Promise<void> {
  await productPage.open(routeParam);
  switch (action.key) {
    case "view_product":
      return;
    case "add_to_cart":
      await productPage.enterQuantity(action.quantity);
      await productPage.clickAddToCartOnce();
      return;
  }
}

async function assertExpectation(
  expectation: ProductExpectation,
  productPage: ProductDetailPage,
  scenario: PreparedScenario,
  request: APIRequestContext,
): Promise<void> {
  switch (expectation.key) {
    case "product_details":
      expect(productPage.productApiStatus()).toBe(expectation.httpStatus);
      await expect(productPage.main.getByRole("heading", { level: 1 })).toHaveText(
        expectation.name,
      );
      await expect(productPage.productImage).toBeVisible();
      await expect(productPage.main).toContainText(expectation.description);
      await expect(
        productPage.main.getByText(expectation.category, { exact: true }),
      ).toBeVisible();
      await expect(productPage.main).toContainText(
        new RegExp(expectation.formattedPricePattern),
      );
      return;
    case "error_state":
      expect(productPage.productApiStatus()).toBe(expectation.httpStatus);
      await expect(productPage.main).toContainText(new RegExp(expectation.messagePattern, "i"));
      await expect(productPage.main).not.toBeEmpty();
      return;
    case "cart_accepted": {
      await expect.soft(productPage.addToCartButton).toHaveText(expectation.successText, {
        timeout: 1_000,
      });
      await productPage.openCart();
      await expect.soft(productPage.cartRows()).toHaveCount(1);
      const row = productPage.cartRows().first();
      await expect.soft(row).toContainText(expectation.productName);
      await expect.soft(row.getByRole("cell").nth(2)).toHaveText(expectation.expectedQuantity);
      expect(expectation.cartChange).toBe(Number(expectation.expectedQuantity));
      return;
    }
    case "quantity_rejected":
      await expect.soft(productPage.main).toContainText(
        new RegExp(expectation.errorPattern, "i"),
        { timeout: 1_000 },
      );
      await productPage.openCart();
      await expect.soft(productPage.cartEmptyState()).toBeVisible();
      await expect.soft(productPage.cartRows()).toHaveCount(expectation.cartChange);
      return;
    case "unauthenticated_rejected": {
      const unauthenticatedResponse = await request.post(`${apiBaseUrl}/api/cart`, {
        data: { product_id: Number(scenario.routeParam), quantity: 1 },
      });
      expect(unauthenticatedResponse.status()).toBe(expectation.httpStatus);
      await expect.soft(productPage.main).toContainText(
        new RegExp(expectation.errorPattern, "i"),
        { timeout: 1_000 },
      );
      await expect.soft(productPage.addToCartButton).not.toHaveText("Đã thêm");
      await expect.soft(productPage.page).toHaveURL(
        new RegExp(`${expectation.redirectUrl.replace("/", "\\/")}$`),
      );
      await productPage.openCart();
      await expect.soft(productPage.cartRows()).toHaveCount(expectation.cartChange);
      return;
    }
    case "breadcrumb_navigation": {
      const homeLink = productPage.main.getByRole("link", { name: expectation.linkText });
      await expect(homeLink).toBeVisible();
      await homeLink.click();
      await expect(productPage.page).toHaveURL(
        new RegExp(`${expectation.targetUrl.replace("/", "\\/")}$`),
      );
      return;
    }
    case "nonempty_alt":
      await expect(productPage.productImage).toHaveAttribute(
        expectation.attribute,
        new RegExp(expectation.valuePattern),
      );
      return;
    case "escaped_content":
      expect(productPage.dialogCount()).toBe(expectation.dialogCount);
      await expect(productPage.main.getByRole("heading", { level: 1 })).toContainText(
        expectation.nameText,
      );
      await expect(productPage.main).toContainText(expectation.descriptionText);
      await expect(productPage.main.locator("script")).toHaveCount(0);
      await expect(
        productPage.main.locator(`img[src="${expectation.forbiddenImageSource}"]`),
      ).toHaveCount(0);
      return;
  }
}

for (const record of cases) {
  test(`[${record.caseId}] ${record.title}`, async ({ preparedScenario, request, page }) => {
    expect(preparedScenario.record.caseId).toBe(record.caseId);
    const productPage = new ProductDetailPage(page);
    await performAction(record.action, productPage, preparedScenario.routeParam);
    await assertExpectation(record.expectation, productPage, preparedScenario, request);
  });
}
