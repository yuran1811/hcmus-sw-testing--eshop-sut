import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

// Define the TestCase interface for typing
interface TestCase {
  caseId: string;
  category: string;
  purpose: string;
  email: string;
  amount: number;
  expectedLabel: string;
  expectedClass?: string;
}

// Load external JSON test data
const dataPath = path.join(__dirname, '..', 'test-data', 'FR11_data.json');
const testCases: TestCase[] = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

if (testCases.length < 12) {
  throw new Error(`Data file must contain at least 12 test cases, found ${testCases.length}`);
}

// Setup/Seed hook: Clean database, pre-register test users, and seed required orders via SUT APIs
test.beforeAll(async ({ playwright }) => {
  // 0. Clean up database to ensure test isolation
  try {
    const backendDbPath = path.resolve(__dirname, '..', '..', 'backend');
    const dbFile = path.join(backendDbPath, 'database.sqlite');
    const nodeModulesPath = path.join(backendDbPath, 'node_modules');
    
    // We execute an inline node script utilizing the backend's sqlite3
    const cleanupScript = `
      const sqlite3 = require(require('path').join('${nodeModulesPath.replace(/\\/g, '\\\\')}', 'sqlite3'));
      const db = new sqlite3.Database('${dbFile.replace(/\\/g, '\\\\')}');
      db.serialize(() => {
        db.run('DELETE FROM orders');
        db.run("DELETE FROM users WHERE email LIKE 'user_f11_%'");
      });
    `;
    execSync(`node -e "${cleanupScript.replace(/"/g, '\\"').replace(/\n/g, ' ')}"`);
    console.log('Database cleaned successfully before seeding.');
  } catch (e) {
    console.error('Database cleanup failed:', e.message);
  }

  const requestContext = await playwright.request.newContext();
  
  // 1. Pre-register required accounts
  const usersToRegister = [
    { name: "User F11 Main", email: "user_f11_main@eshop.com", password: "Main1234!" },
    { name: "User F11 Empty", email: "user_f11_empty@eshop.com", password: "Empty1234!" },
    { name: "User F11 Other", email: "user_f11_other@eshop.com", password: "Other1234!" },
  ];

  for (const u of usersToRegister) {
    try {
      await requestContext.post('http://localhost:3000/api/register', { data: u });
    } catch (e) {
      console.log(`Pre-registration note: ${u.email} already exists or failed: ${e.message}`);
    }
  }

  // 2. Obtain JWT tokens via Login
  let adminToken = '';
  try {
    const adminRes = await requestContext.post('http://localhost:3000/api/login', {
      data: { email: 'admin@eshop.com', password: 'Admin123!' }
    });
    const adminData = await adminRes.json();
    adminToken = adminData.token;
  } catch (e) {
    console.error('Failed to login admin for seeding:', e.message);
  }

  let mainToken = '';
  try {
    const mainRes = await requestContext.post('http://localhost:3000/api/login', {
      data: { email: 'user_f11_main@eshop.com', password: 'Main1234!' }
    });
    const mainData = await mainRes.json();
    mainToken = mainData.token;
  } catch (e) {
    console.error('Failed to login main user for seeding:', e.message);
  }

  let otherToken = '';
  try {
    const otherRes = await requestContext.post('http://localhost:3000/api/login', {
      data: { email: 'user_f11_other@eshop.com', password: 'Other1234!' }
    });
    const otherData = await otherRes.json();
    otherToken = otherData.token;
  } catch (e) {
    console.error('Failed to login other user for seeding:', e.message);
  }

  // Helper function to create an order and advance its status using state transitions
  const seedOrder = async (token: string, amount: number, finalStatus: string) => {
    // Create pending order
    const checkoutRes = await requestContext.post('http://localhost:3000/api/checkout', {
      headers: { Authorization: `Bearer ${token}` },
      data: { total_amount: amount, shipping_address: '123 Test Street, District 1, HCMC' }
    });
    const checkoutData = await checkoutRes.json();
    const orderId = checkoutData.orderId;

    if (!orderId) {
      console.error(`Failed to create order with amount ${amount} - response:`, checkoutData);
      return;
    }

    // Transition state sequentially if final status is not pending
    if (finalStatus !== 'pending') {
      const transitions = [];
      if (finalStatus === 'confirmed') {
        transitions.push('confirmed');
      } else if (finalStatus === 'shipping') {
        transitions.push('confirmed', 'shipping');
      } else if (finalStatus === 'delivered') {
        transitions.push('confirmed', 'shipping', 'delivered');
      } else if (finalStatus === 'canceled') {
        transitions.push('confirmed', 'canceled');
      }

      for (const status of transitions) {
        await requestContext.put(`http://localhost:3000/api/admin/orders/${orderId}/status`, {
          headers: { Authorization: `Bearer ${adminToken || token}` },
          data: { status }
        });
      }
    }
  };

  // Seed orders for main user
  if (mainToken) {
    await seedOrder(mainToken, 100000, 'pending');
    await seedOrder(mainToken, 200000, 'confirmed');
    await seedOrder(mainToken, 300000, 'shipping');
    await seedOrder(mainToken, 400000, 'delivered');
    await seedOrder(mainToken, 500000, 'canceled');
    await seedOrder(mainToken, 600000, 'pending'); // For cancellation test 11
    await seedOrder(mainToken, 700000, 'confirmed'); // For cancellation test 12
    await seedOrder(mainToken, 800000, 'shipping'); // For cancellation test 13 (should not cancel)
  }

  // Seed order for other user (to verify isolation)
  if (otherToken) {
    await seedOrder(otherToken, 900000, 'pending');
  }

  await requestContext.dispose();
});

// Dynamic test generation from JSON file
for (const tc of testCases) {
  test(`${tc.caseId}: ${tc.purpose}`, async ({ page }) => {
    // Dialog listener to capture alert messages
    let lastDialogMessage = '';
    page.on('dialog', async (dialog) => {
      lastDialogMessage = dialog.message();
      console.log(`[Dialog Alert - ${tc.caseId}] message: "${lastDialogMessage}"`);
      await dialog.accept();
    });

    // 1. Navigation and Authentication setup
    if (tc.email) {
      // Go to Login Page
      await page.goto('/login');
      // Fill login credentials
      await page.locator('label:has-text("Username") + input').fill(tc.email);
      const password = tc.email.includes('empty') ? 'Empty1234!' : 'Main1234!';
      await page.locator('label:has-text("Mật khẩu") + input').fill(password);
      await page.getByRole('button', { name: 'Sign In' }).click();
      await page.waitForTimeout(500); // Allow login redirect
      
      // Go to Profile Page
      await page.goto('/profile');
    } else {
      // Unauthenticated direct access
      await page.goto('/profile');
    }

    // 2. Assertions
    if (tc.caseId === 'F11-TC-001') {
      // Access Control: Block guest
      await expect(page.getByText('Vui lòng đăng nhập')).toBeVisible({ timeout: 3000 });
      return;
    }

    if (tc.caseId === 'F11-TC-002') {
      // Access Control: Isolation
      await expect(page.getByText('Bạn chưa có đơn hàng nào.')).toBeVisible({ timeout: 3000 });
      // Ensure other user's order is not visible
      const otherOrderRow = page.locator('tr', { hasText: /900[.,]000/ });
      await expect(otherOrderRow).toBeHidden();
      return;
    }

    if (tc.caseId === 'F11-TC-003') {
      // Data Display: Required columns
      const tableHeader = page.locator('table thead tr');
      await expect(tableHeader).toBeVisible();
      await expect(tableHeader).toContainText('Mã ĐH');
      await expect(tableHeader).toContainText('Ngày đặt');
      await expect(tableHeader).toContainText('Tổng tiền');
      await expect(tableHeader).toContainText('Trạng thái');
      await expect(tableHeader).toContainText('Thao tác');
      return;
    }

    if (tc.caseId === 'F11-TC-004') {
      // Data Display: Currency formatting
      const orderRow = page.locator('tr', { hasText: /100[.,]000/ });
      await expect(orderRow).toBeVisible();
      const totalAmountCell = orderRow.locator('td.text-red-600');
      // Assert thousand separator and ₫ suffix
      await expect(totalAmountCell).toHaveText(/100[.,]000\s*₫/);
      return;
    }

    if (['F11-TC-005', 'F11-TC-006', 'F11-TC-007', 'F11-TC-008', 'F11-TC-009'].includes(tc.caseId)) {
      // Status Label and Color (Tailwind classes) check
      const amountStr = `${tc.amount / 1000}[.,]000`;
      const orderRow = page.locator('tr', { hasText: new RegExp(amountStr) });
      await expect(orderRow).toBeVisible();
      
      const statusSpan = orderRow.locator('td span');
      // 1. Text Assert
      await expect(statusSpan).toHaveText(tc.expectedLabel);
      // 2. Class Assert
      if (tc.expectedClass) {
        await expect(statusSpan).toHaveClass(new RegExp(tc.expectedClass));
      }
      return;
    }

    if (tc.caseId === 'F11-TC-010') {
      // Empty State visual/illustration check
      await expect(page.getByText('Bạn chưa có đơn hàng nào.')).toBeVisible();
      // Spec requirement (FR-24): illustration/icon must exist
      // Since SUT only has text <p>, this assertion is expected to fail on SUT.
      const illustration = page.locator('.w-full.md\\:w-2\\:3 img, .w-full.md\\:w-2\\:3 svg, p:has(svg)');
      await expect(illustration).toBeVisible({ timeout: 2000 });
      return;
    }

    if (tc.caseId === 'F11-TC-011' || tc.caseId === 'F11-TC-012') {
      // Cancellation of pending/confirmed orders
      const amountStr = `${tc.amount / 1000}[.,]000`;
      const orderRow = page.locator('tr', { hasText: new RegExp(amountStr) });
      await expect(orderRow).toBeVisible();
      
      const cancelBtn = orderRow.getByRole('button', { name: 'Hủy đơn' });
      await expect(cancelBtn).toBeVisible();
      await cancelBtn.click();
      await page.waitForTimeout(500); // Allow update
      
      expect(lastDialogMessage).toContain('Hủy đơn thành công!');
      
      const statusSpan = orderRow.locator('td span');
      await expect(statusSpan).toHaveText('Đã hủy');
      await expect(statusSpan).toHaveClass(/bg-red-100 text-red-800/);
      return;
    }

    if (tc.caseId === 'F11-TC-013') {
      // Shipping Cancellation Restriction: User must not be allowed to cancel a shipping order.
      // Spec (FR-10): button hidden or disabled.
      // SUT Bug: SUT renders "Hủy đơn" for shipping status and successfully cancels it.
      // This will fail on SUT, proving the bug.
      const amountStr = `${tc.amount / 1000}[.,]000`;
      const orderRow = page.locator('tr', { hasText: new RegExp(amountStr) });
      await expect(orderRow).toBeVisible();
      
      const cancelBtn = orderRow.getByRole('button', { name: 'Hủy đơn' });
      await expect(cancelBtn).toBeHidden({ timeout: 2000 });
      return;
    }

    if (tc.caseId === 'F11-TC-014' || tc.caseId === 'F11-TC-015') {
      // Delivered/Canceled orders cancellation button visibility: Button must not be visible.
      const amountStr = `${tc.amount / 1000}[.,]000`;
      const orderRow = page.locator('tr', { hasText: new RegExp(amountStr) });
      await expect(orderRow).toBeVisible();
      
      const cancelBtn = orderRow.getByRole('button', { name: 'Hủy đơn' });
      await expect(cancelBtn).toBeHidden();
      return;
    }

    if (tc.caseId === 'F11-TC-016') {
      // GUI: Exactly one h1 tag per page
      // SUT Bug: lacks <h1>. Will fail on SUT.
      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBe(1);
      return;
    }

    if (tc.caseId === 'F11-TC-017') {
      // GUI: Highlight active navbar menu item
      // SUT Bug: no dynamic active page highlight styling. Will fail on SUT.
      const profileLink = page.getByRole('link', { name: /Chào, / });
      await expect(profileLink).toHaveClass(/active|highlight|bg-blue-800/);
      return;
    }

    if (tc.caseId === 'F11-TC-018') {
      // GUI: Logout button must be labeled "Đăng xuất"
      // SUT Bug: Labeled "Thoát". Will fail on SUT.
      const logoutBtn = page.getByRole('button', { name: 'Đăng xuất' });
      await expect(logoutBtn).toBeVisible({ timeout: 2000 });
      return;
    }
  });
}
