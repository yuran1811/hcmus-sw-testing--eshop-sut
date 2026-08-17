# TC-FORGOT-PASSWORD-005: Step 1 - Navigation back to Login page

## Requirement ID

FR-03

## Module / Test type / Technique

forgot-password / Functional / Navigation Flow

## Preconditions

- Home page is running and accessible at `http://localhost:5173`.

## Test data

None

## Test steps

1. Navigate to EShop home page at `http://localhost:5173`.
2. Click on the "Đăng nhập" link/button to open the Login page.
3. Click on the "Quên mật khẩu?" link.
4. Verify that the Forgot Password form is displayed with Step Indicator "Bước 1 / 2".
5. Verify the "Quay lại đăng nhập" button is present.
6. Click the "Quay lại đăng nhập" button.

## Expected result

- The user is redirected back to the Login page (`http://localhost:5173/login` or equivalent login route).
- The Forgot Password form is no longer displayed.

## Status / Related bugs

Not Run / None
