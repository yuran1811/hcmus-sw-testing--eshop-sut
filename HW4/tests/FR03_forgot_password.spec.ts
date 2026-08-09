import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// Define the TestCase interface to match our JSON schema
interface TestCase {
  caseId: string;
  category: string;
  purpose: string;
  email: string;
  newPassword?: string;
  confirmPassword?: string;
  otpType: 'valid' | 'invalid' | 'reused' | 'crossEmail' | 'none';
  expectedError?: string;
  expectedRoute?: string;
}

// Load external JSON test data
const dataPath = path.join(__dirname, '..', 'test-data', 'FR03_data.json');
const testCases: TestCase[] = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

// Verify that we have at least 12 test cases per assignment requirements
if (testCases.length < 12) {
  throw new Error(`Data file must contain at least 12 test cases, found ${testCases.length}`);
}

// Setup/Seed hook: Register all required test users via SUT API prior to test execution
test.beforeAll(async ({ playwright }) => {
  const requestContext = await playwright.request.newContext();
  
  // Register users from user_f03_01 to user_f03_22 to ensure no missing emails
  const users = Array.from({ length: 22 }, (_, i) => {
    const num = String(i + 1).padStart(2, '0');
    return {
      name: `User F03 ${num}`,
      email: `user_f03_${num}@eshop.com`,
      password: 'OldPass123!'
    };
  });

  for (const user of users) {
    try {
      await requestContext.post('http://localhost:3000/api/register', {
        data: user,
      });
    } catch (e) {
      console.log(`Pre-registration note: ${user.email} registration attempt completed (already exists or DB error).`);
    }
  }
  await requestContext.dispose();
});

// Dynamic test generation from JSON file
for (const tc of testCases) {
  test(`${tc.caseId}: ${tc.purpose}`, async ({ page }) => {
    // Dialog listener to capture browser alert/confirm messages from the SUT
    let lastDialogMessage = '';
    page.on('dialog', async (dialog) => {
      lastDialogMessage = dialog.message();
      console.log(`[Dialog Alert - ${tc.caseId}] message: "${lastDialogMessage}"`);
      await dialog.accept();
    });

    // 1. Navigate to Forgot Password page
    await page.goto('/forgot-password');

    // 2. GUI / Special Case checks before step transitions
    if (tc.caseId === 'F03-TC-017') {
      // Step Indicator and Back to Login navigation
      // Spec compliance checks: display Step Indicator "Bước 1 / 2" and link back to login
      await expect(page.locator('text=Bước 1 / 2')).toBeVisible({ timeout: 2000 }); 
      await expect(page.getByRole('link', { name: 'Quay lại đăng nhập' })).toBeVisible({ timeout: 2000 }); 
      return;
    }

    if (tc.caseId === 'F03-TC-018') {
      // Required markers (*) and submit button styling (blue)
      const labelText = await page.locator('label').first().textContent();
      expect(labelText).toContain('*'); 
      const submitBtn = page.getByRole('button', { name: 'Lấy mã OTP' });
      await expect(submitBtn).toHaveClass(/bg-blue-600/, { timeout: 2000 });
      return;
    }

    if (tc.caseId === 'F03-TC-019') {
      // Error message position (above submit button)
      await page.locator('input').first().fill('nonexist@eshop.com');
      await page.getByRole('button', { name: 'Lấy mã OTP' }).click();
      
      const errorText = page.locator('.error-message'); 
      await expect(errorText).toBeVisible({ timeout: 2000 });
      const errorBox = await errorText.boundingBox();
      const buttonBox = await page.getByRole('button', { name: 'Lấy mã OTP' }).boundingBox();
      expect(errorBox!.y).toBeLessThan(buttonBox!.y);
      return;
    }

    if (tc.caseId === 'F03-TC-021') {
      // Double Submit Prevention (Disable button on submit)
      await page.locator('input').first().fill('user_f03_21@eshop.com');
      const submitBtn = page.getByRole('button', { name: 'Lấy mã OTP' });
      await submitBtn.click();
      await expect(submitBtn).toBeDisabled({ timeout: 2000 });
      return;
    }

    if (tc.caseId === 'F03-TC-022') {
      // Input field HTML5 email formatting check
      const emailInput = page.locator('input').first();
      await expect(emailInput).toHaveAttribute('type', 'email', { timeout: 2000 });
      return;
    }

    if (tc.caseId === 'F03-TC-016') {
      // Spamming requests for OTP: submit Lấy mã OTP rapidly before transition
      await page.locator('input').first().fill(tc.email);
      const submitBtn = page.getByRole('button', { name: 'Lấy mã OTP' });
      for (let i = 0; i < 5; i++) {
        await submitBtn.click();
      }
      await page.waitForTimeout(500);
      expect(lastDialogMessage).toContain('Thử lại sau');
      return;
    }

    // 3. Email request step (Step 1)
    if (tc.caseId === 'F03-TC-003') {
      // Empty email HTML5 required validation check
      await page.locator('input').first().fill('');
      await page.getByRole('button', { name: 'Lấy mã OTP' }).click();
      const emailInput = page.locator('input').first();
      const validationMessage = await emailInput.evaluate((el: HTMLInputElement) => el.validationMessage);
      expect(validationMessage).not.toBe('');
      return;
    }

    if (tc.caseId === 'F03-TC-004') {
      // Format validation for invalid email (should block at browser level)
      await page.locator('input').first().fill(tc.email);
      await page.getByRole('button', { name: 'Lấy mã OTP' }).click();
      const emailInput = page.locator('input').first();
      const validationMessage = await emailInput.evaluate((el: HTMLInputElement) => el.validationMessage);
      expect(validationMessage, 'Expected browser validation to block invalid email format').not.toBe('');
      return;
    }

    // Input email and submit
    await page.locator('input').first().fill(tc.email);
    await page.getByRole('button', { name: 'Lấy mã OTP' }).click();
    await page.waitForTimeout(500); // Allow server request round-trip

    // Verify error outcome at Step 1 (if no OTP is generated)
    if (tc.otpType === 'none' && tc.expectedError) {
      expect(lastDialogMessage).toContain(tc.expectedError);
      return;
    }

    // 4. Verification/Reset step (Step 2)
    // Retrieve OTP from the green message banner in React (demo server returns OTP directly in response)
    const messageDiv = page.locator('.bg-green-100');
    try {
      await expect(messageDiv).toBeVisible({ timeout: 2000 });
    } catch (e) {
      console.log(`[Error - ${tc.caseId}] Green message banner not visible. SUT alert message: "${lastDialogMessage}"`);
      throw e;
    }
    const textContent = await messageDiv.textContent();
    const match = textContent ? textContent.match(/\d+/) : null;
    const otp = match ? match[0] : '';

    // Verify Confirm Password field exists (TC-012)
    if (tc.caseId === 'F03-TC-012') {
      const confirmInput = page.locator('label:has-text("Xác nhận mật khẩu") + input');
      await expect(confirmInput).toBeVisible({ timeout: 2000 }); // Spec compliance: must show confirm password field
      await confirmInput.fill(tc.confirmPassword || '');
      
      await page.locator('label:has-text("Mã OTP") + input').fill(otp);
      await page.locator('label:has-text("Mật khẩu mới") + input').fill(tc.newPassword || '');
      await page.getByRole('button', { name: 'Đặt lại mật khẩu' }).click();
      await page.waitForTimeout(300);
      expect(lastDialogMessage).toContain(tc.expectedError || 'mật khẩu không khớp');
      return;
    }

    // Set OTP to submit based on test cases
    let otpToSubmit = otp;
    if (tc.otpType === 'invalid') {
      otpToSubmit = '999999';
    } else if (tc.otpType === 'crossEmail') {
      otpToSubmit = '1234'; // Incorrect OTP for this email
    }

    // Fill Step 2 fields
    await page.locator('label:has-text("Mã OTP") + input').fill(otpToSubmit);
    await page.locator('label:has-text("Mật khẩu mới") + input').fill(tc.newPassword || '');

    const resetSubmitBtn = page.getByRole('button', { name: 'Đặt lại mật khẩu' });
    await resetSubmitBtn.click();
    await page.waitForTimeout(500); // Allow API round-trip

    // Verify results
    if (tc.otpType !== 'reused') {
      if (tc.expectedError) {
        expect(lastDialogMessage).toContain(tc.expectedError);
      } else if (tc.expectedRoute) {
        // REDIRECTION AND LOGIN E2E VERIFICATION
        await page.waitForURL(`**${tc.expectedRoute}`, { timeout: 5000 });
        expect(page.url()).toContain(tc.expectedRoute);

        // Verify login with new password
        await page.goto('/login');
        // Login uses 'Username' and 'Mật khẩu' labels on the SUT UI
        await page.locator('label:has-text("Username") + input').fill(tc.email);
        // Login password input on the SUT is type="text" due to security bug
        await page.locator('label:has-text("Mật khẩu") + input').fill(tc.newPassword || '');
        await page.getByRole('button', { name: 'Sign In' }).click();
        await page.waitForTimeout(500);

        // Verify login success (Logout button 'Thoát' is visible)
        await expect(page.getByRole('button', { name: 'Thoát' })).toBeVisible();
      }
    }

    // OTP Reuse Verification (TC-013)
    if (tc.caseId === 'F03-TC-013') {
      // First check that the first reset succeeded
      expect(lastDialogMessage).toContain('Đổi mật khẩu thành công!');
      
      // Reuse the exact same OTP token by sending request again
      await page.goto('/forgot-password');
      await page.locator('input').first().fill(tc.email);
      await page.getByRole('button', { name: 'Lấy mã OTP' }).click();
      await page.waitForTimeout(500);

      await page.locator('label:has-text("Mã OTP") + input').fill(otp); // Reuse old OTP
      await page.locator('label:has-text("Mật khẩu mới") + input').fill(tc.newPassword || '');
      await page.getByRole('button', { name: 'Đặt lại mật khẩu' }).click();
      await page.waitForTimeout(500);

      expect(lastDialogMessage).toContain(tc.expectedError);
    }
  });
}
