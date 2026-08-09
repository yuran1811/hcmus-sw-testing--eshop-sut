import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

/**
 * Represents the structure of a test case for the FR-19 Admin User Management feature.
 * Data is dynamically loaded from the external JSON file.
 */
interface TestCase {
  /** Unique identifier for the test case, e.g., F19-TC-001 */
  caseId: string;
  /** The test category (e.g., Access Control, User List, Functional, Security, GUI) */
  category: string;
  /** Detailed description of the test case purpose */
  purpose: string;
  /** Optional email address of the user to be verified, deleted, or tested */
  email?: string;
  /** Optional password of the user */
  password?: string;
  /** Expected browser alert dialog message, if any */
  expectedAlert?: string;
}

/** Base URL for the SUT backend API */
const API_BASE_URL = 'http://localhost:3000';

/** Default admin account credentials for API seeding and login operations */
const ADMIN_CREDENTIALS = { email: 'admin@eshop.com', password: 'Admin123!' };

// Load external JSON test data
const dataPath = path.join(__dirname, '..', 'test-data', 'FR19_data.json');
const testCases: TestCase[] = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

if (testCases.length < 12) {
  throw new Error(`Data file must contain at least 12 test cases, found ${testCases.length}`);
}

// Store IDs for DB cleanup and setup
let adminUserId: number | null = null;
let standardUserId: number | null = null;
let deleteUserId: number | null = null;
let xssUserId: number | null = null;

// Synchronous helper to re-seed admin user to prevent test pollution
function reseedAdminSync() {
  try {
    const backendDbPath = path.resolve(__dirname, '..', '..', 'backend');
    const dbFile = path.join(backendDbPath, 'database.sqlite');
    const nodeModulesPath = path.join(backendDbPath, 'node_modules');
    
    const script = `
      const sqlite3 = require(require('path').join('${nodeModulesPath.replace(/\\/g, '\\\\')}', 'sqlite3'));
      const db = new sqlite3.Database('${dbFile.replace(/\\/g, '\\\\')}');
      db.serialize(() => {
        db.get("SELECT * FROM users WHERE email = 'admin@eshop.com'", (err, row) => {
          if (!row) {
            db.run("INSERT INTO users (id, name, email, password, role) VALUES (1, 'Admin User', 'admin@eshop.com', 'Admin123!', 'admin')", (err) => {
              db.close();
              if (err) console.error('Reseed error:', err.message);
              else console.log('Admin user re-seeded successfully.');
            });
          } else {
            db.close();
          }
        });
      });
    `;
    execSync(`node -e "${script.replace(/"/g, '\\"').replace(/\n/g, ' ')}"`);
  } catch (e: any) {
    console.error('Failed to run reseed script:', e.message);
  }
}

// Clean and Seed Hook
test.beforeAll(async ({ playwright }) => {
  // Ensure admin user exists in case previous runs left it deleted
  reseedAdminSync();

  // 1. Database Cleanup
  try {
    const backendDbPath = path.resolve(__dirname, '..', '..', 'backend');
    const dbFile = path.join(backendDbPath, 'database.sqlite');
    const nodeModulesPath = path.join(backendDbPath, 'node_modules');
    
    // Cleanup any user records containing _f19_
    const cleanupScript = `
      const sqlite3 = require(require('path').join('${nodeModulesPath.replace(/\\/g, '\\\\')}', 'sqlite3'));
      const db = new sqlite3.Database('${dbFile.replace(/\\/g, '\\\\')}');
      db.serialize(() => {
        db.run("DELETE FROM users WHERE email LIKE '%_f19_%'");
        db.close();
      });
    `;
    execSync(`node -e "${cleanupScript.replace(/"/g, '\\"').replace(/\n/g, ' ')}"`);
    console.log('Database cleaned successfully before seeding FR-19.');
  } catch (e: any) {
    console.error('Database cleanup failed:', e.message);
  }

  // 2. Pre-register test users via SUT API
  const requestContext = await playwright.request.newContext();
  
  // Register user_f19_delete
  try {
    const res = await requestContext.post(`${API_BASE_URL}/api/register`, {
      data: {
        name: "User F19 Delete",
        email: "user_f19_delete@eshop.com",
        password: "Delete123!"
      }
    });
    const data = await res.json();
    deleteUserId = data.id;
  } catch (e: any) {
    console.error('Failed to register user_f19_delete:', e.message);
  }

  // Register user_f19_xss
  try {
    const res = await requestContext.post(`${API_BASE_URL}/api/register`, {
      data: {
        name: "<script id=\"xss-test\">console.log('xss-run')</script>",
        email: "user_f19_xss@eshop.com",
        password: "Xss1234!"
      }
    });
    const data = await res.json();
    xssUserId = data.id;

    // Login and update profile to insert XSS payload into phone field
    const loginRes = await requestContext.post(`${API_BASE_URL}/api/login`, {
      data: { email: 'user_f19_xss@eshop.com', password: 'Xss1234!' }
    });
    const loginData = await loginRes.json();
    const xssToken = loginData.token;

    await requestContext.put(`${API_BASE_URL}/api/users/me`, {
      headers: { Authorization: `Bearer ${xssToken}` },
      data: {
        name: "<script id=\"xss-test\">console.log('xss-run')</script>",
        phone: "<script id=\"xss-phone\">console.log('xss-phone')</script>",
        shipping_address: "HCMC"
      }
    });
  } catch (e: any) {
    console.error('Failed to register and set XSS payloads for user_f19_xss:', e.message);
  }

  // Retrieve user IDs for admin and standard user to verify or perform API checks
  try {
    const adminLogin = await requestContext.post(`${API_BASE_URL}/api/login`, {
      data: ADMIN_CREDENTIALS
    });
    const adminData = await adminLogin.json();
    adminUserId = adminData.user.id;

    const stdLogin = await requestContext.post(`${API_BASE_URL}/api/login`, {
      data: { email: 'test@eshop.com', password: 'Test1234!' }
    });
    const stdData = await stdLogin.json();
    standardUserId = stdData.user.id;
  } catch (e: any) {
    console.error('Failed to fetch default user IDs:', e.message);
  }

  await requestContext.dispose();
});

// Ensure admin is restored after each test in case of deletion
test.afterEach(async () => {
  reseedAdminSync();
});

// Helper: Perform admin login flow on the page
async function loginAsAdmin(page: any) {
  await page.goto('http://localhost:5174/');
  await page.getByPlaceholder('Email').fill('admin@eshop.com');
  await page.getByPlaceholder('Password').fill('Admin123!');
  await page.getByRole('button', { name: 'Login' }).click();
  // Wait for sidebar dashboard elements to be visible
  await expect(page.getByText('EShop Admin')).toBeVisible();
}

// Generate tests dynamically
for (const tc of testCases) {
  test(`${tc.caseId}: ${tc.purpose}`, async ({ page, playwright }) => {
    // Dialog listener to record alert messages
    let lastDialogMessage = '';
    page.on('dialog', async (dialog) => {
      lastDialogMessage = dialog.message();
      console.log(`[Dialog Alert - ${tc.caseId}] message: "${lastDialogMessage}"`);
      await dialog.accept();
    });

    const requestContext = await playwright.request.newContext();

    if (tc.caseId === 'F19-TC-001') {
      // Guest access control: should not see admin panel
      await page.goto('http://localhost:5174/');
      await expect(page.getByPlaceholder('Email')).toBeVisible();
      await expect(page.getByText('Quản lý Người dùng')).toBeHidden();
      return;
    }

    if (tc.caseId === 'F19-TC-002') {
      // Standard user login rejection
      await page.goto('http://localhost:5174/');
      await page.getByPlaceholder('Email').fill(tc.email || '');
      await page.getByPlaceholder('Password').fill(tc.password || '');
      await page.getByRole('button', { name: 'Login' }).click();
      
      // Wait a short bit to ensure dialog fires
      await page.waitForTimeout(500);
      expect(lastDialogMessage).toBe(tc.expectedAlert);
      await expect(page.getByText('EShop Admin')).toBeHidden();
      return;
    }

    if (tc.caseId === 'F19-TC-003') {
      // Admin login success
      await loginAsAdmin(page);
      await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
      return;
    }

    if (tc.caseId === 'F19-TC-004') {
      // API Guest block: GET /api/admin/users without token
      const res = await requestContext.get(`${API_BASE_URL}/api/admin/users`);
      expect(res.status()).toBe(401);
      return;
    }

    if (tc.caseId === 'F19-TC-005') {
      // API Standard user block: GET /api/admin/users with user token
      const loginRes = await requestContext.post(`${API_BASE_URL}/api/login`, {
        data: { email: tc.email, password: tc.password }
      });
      const loginData = await loginRes.json();
      const token = loginData.token;

      const res = await requestContext.get(`${API_BASE_URL}/api/admin/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // SUT failure expectation (Bug): SUT lacks role validation in middleware
      // We assert 403 per spec, but document the SUT vulnerability if it returns 200
      expect(res.status()).toBe(403);
      return;
    }

    if (tc.caseId === 'F19-TC-006') {
      // API Standard user block: DELETE /api/admin/users/:id with user token
      const loginRes = await requestContext.post(`${API_BASE_URL}/api/login`, {
        data: { email: tc.email, password: tc.password }
      });
      const loginData = await loginRes.json();
      const token = loginData.token;

      const res = await requestContext.delete(`${API_BASE_URL}/api/admin/users/${deleteUserId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // SUT failure expectation (Bug): SUT lacks role validation in middleware
      // We assert 403 per spec
      expect(res.status()).toBe(403);
      return;
    }

    if (tc.caseId === 'F19-TC-007') {
      // User list UI rendering
      await loginAsAdmin(page);
      await page.getByText('Người dùng').click();
      
      const headerRow = page.locator('table thead tr');
      await expect(headerRow).toContainText('ID');
      await expect(headerRow).toContainText('Email');
      await expect(headerRow).toContainText('Role');
      await expect(headerRow).toContainText('Số ĐT');
      await expect(headerRow).toContainText('Hành động');

      // Verify default admin and standard user rows are rendered
      await expect(page.locator('table tbody tr', { hasText: 'admin@eshop.com' })).toBeVisible();
      await expect(page.locator('table tbody tr', { hasText: 'test@eshop.com' })).toBeVisible();
      return;
    }

    if (tc.caseId === 'F19-TC-008') {
      // Password exposure validation
      await loginAsAdmin(page);
      await page.getByText('Người dùng').click();
      
      // 1. UI Check: DOM shouldn't contain plaintext or hashed passwords
      const pageContent = await page.content();
      expect(pageContent).not.toContain('Admin123!');
      expect(pageContent).not.toContain('Test1234!');

      // 2. API Check: Fetch user list and check properties
      const adminLogin = await requestContext.post(`${API_BASE_URL}/api/login`, {
        data: ADMIN_CREDENTIALS
      });
      const adminData = await adminLogin.json();
      const adminToken = adminData.token;

      const res = await requestContext.get(`${API_BASE_URL}/api/admin/users`, {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      const users = await res.json();
      for (const u of users) {
        expect(u.password).toBeUndefined();
      }
      return;
    }

    if (tc.caseId === 'F19-TC-009') {
      // Vietnamese Language consistency
      await loginAsAdmin(page);
      await page.getByText('Người dùng').click();
      
      // Page elements check
      await expect(page.locator('h2')).toHaveText('Quản lý Người dùng');
      await expect(page.getByText('Đăng xuất')).toBeVisible();
      await expect(page.getByRole('button', { name: 'Xóa' }).first()).toBeVisible();
      return;
    }

    if (tc.caseId === 'F19-TC-010') {
      // Delete standard user
      await loginAsAdmin(page);
      await page.getByText('Người dùng').click();

      const userRow = page.locator('table tbody tr', { hasText: tc.email || '' });
      await expect(userRow).toBeVisible();
      
      // Click delete on the target user's row
      await userRow.getByRole('button', { name: 'Xóa' }).click();
      
      // Wait for table to reload and confirm user is removed
      await expect(userRow).toBeHidden({ timeout: 5000 });
      return;
    }

    if (tc.caseId === 'F19-TC-011') {
      // Prevent Self-Deletion (UI)
      await loginAsAdmin(page);
      await page.getByText('Người dùng').click();

      const adminRow = page.locator('table tbody tr', { hasText: 'admin@eshop.com' });
      await expect(adminRow).toBeVisible();
      
      // Verify delete button is disabled or hidden for the currently logged in admin user
      const deleteBtn = adminRow.getByRole('button', { name: 'Xóa' });
      // SUT failure expectation (Bug): SUT renders the Xóa button active for admin.
      // The assertion below checks for disabled or hidden status as per the FR-19 spec.
      const isDisabled = await deleteBtn.isDisabled();
      const isHidden = await deleteBtn.isHidden();
      expect(isDisabled || isHidden).toBe(true);
      return;
    }

    if (tc.caseId === 'F19-TC-012') {
      // Prevent Self-Deletion (API)
      const adminLogin = await requestContext.post(`${API_BASE_URL}/api/login`, {
        data: ADMIN_CREDENTIALS
      });
      const adminData = await adminLogin.json();
      const adminToken = adminData.token;

      // Request self-deletion via API
      const res = await requestContext.delete(`${API_BASE_URL}/api/admin/users/${adminUserId}`, {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      
      // SUT failure expectation (Bug): SUT returns 200 and deletes the admin!
      // Re-seed admin user immediately if deletion succeeded to keep DB state clean
      if (res.status() === 200) {
        console.warn('SUT deleted the logged-in admin! Recreating admin user to prevent database corruption...');
        reseedAdminSync();
      }

      // Per specification, self-deletion must be blocked (400 or 403)
      expect(res.status()).toBeGreaterThanOrEqual(400);
      return;
    }

    if (tc.caseId === 'F19-TC-013') {
      // Delete button color is red
      await loginAsAdmin(page);
      await page.getByText('Người dùng').click();

      const deleteBtn = page.getByRole('button', { name: 'Xóa' }).first();
      await expect(deleteBtn).toBeVisible();

      // Verify class contains bg-red-500 or style has red background-color
      const className = await deleteBtn.getAttribute('class') || '';
      const isTailwindRed = className.includes('bg-red-');
      const styleBg = await deleteBtn.evaluate(el => window.getComputedStyle(el).backgroundColor);
      const isRGBRed = styleBg.includes('rgb(239, 68, 68)') || styleBg.includes('rgb(220, 38, 38)') || styleBg.includes('rgb(185, 28, 28)');
      
      expect(isTailwindRed || isRGBRed).toBe(true);
      return;
    }

    if (tc.caseId === 'F19-TC-014') {
      // Page heading: exactly one h1 per page describing content
      await loginAsAdmin(page);
      await page.getByText('Người dùng').click();

      // Check number of h1 tags in DOM
      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBe(1);

      // Verify the h1 element describes the page content
      // SUT failure expectation (Bug): EShop Admin uses <h1> for brand logo and <h2> for main page titles.
      const h1Text = await page.locator('h1').first().textContent();
      expect(h1Text).toBe('Quản lý Người dùng');
      return;
    }

    if (tc.caseId === 'F19-TC-015') {
      // Keyboard Accessibility: Tab order top-to-bottom, left-to-right
      await loginAsAdmin(page);
      await page.getByText('Người dùng').click();

      // Verify table headers appear in DOM in the correct sequential order
      const tableHeaders = page.locator('table thead th');
      const count = await tableHeaders.count();
      expect(count).toBeGreaterThan(0);
      
      const headersText: string[] = [];
      for (let i = 0; i < count; i++) {
        headersText.push((await tableHeaders.nth(i).innerText()).trim());
      }
      expect(headersText).toEqual(['', 'ID', 'Email', 'Role', 'Số ĐT', 'Hành động']);
      return;
    }

    if (tc.caseId === 'F19-TC-016') {
      // Security: XSS safety check in user list rendering
      await loginAsAdmin(page);
      await page.getByText('Người dùng').click();

      const xssRow = page.locator('table tbody tr', { hasText: 'user_f19_xss@eshop.com' });
      await expect(xssRow).toBeVisible();

      // Verify script tags are printed raw as text inside cells (not executed)
      const isXssScriptNodePresent = await page.locator('script#xss-test').count();
      const isXssPhoneNodePresent = await page.locator('script#xss-phone').count();
      
      expect(isXssScriptNodePresent).toBe(0);
      expect(isXssPhoneNodePresent).toBe(0);
      return;
    }

    await requestContext.dispose();
  });
}
