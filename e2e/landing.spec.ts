import { expect, test } from '@playwright/test';

const APP_NAME = 'GymTrack';
const TEST_EMAIL = 'tester@test.com';
// @TODO - add in auth check + staging backend server + test user

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/');
});

test('has correct title', async ({ page }) => {
  await expect(page).toHaveTitle(APP_NAME);
});

test('has proper header', async ({ page }) => {
  await expect(page.getByRole('heading', { name: /Track your fitness journey/ })).toBeVisible();
});

test("has theme toggle and defaults to user's preferred color scheme", async ({ page }) => {
  await expect(page.getByTestId('theme-toggle')).toBeVisible();
  // playwright colorScheme in config is default set to 'dark'
  await expect(page.getByLabel('Dark')).toHaveAttribute('checked', '');
});

test.describe('Sign Up Flow', () => {
  test('modal does not open with invalid email', async ({ page }) => {
    await page.getByPlaceholder('Email').fill('invalid');
    await page.getByRole('button', { name: 'SIGN UP TODAY' }).click();

    await expect(page.getByText(/Let's Get Started/)).not.toBeVisible();
  });

  test('validation works', async ({ page }) => {
    await page.getByPlaceholder('Email').fill(TEST_EMAIL);
    await page.getByRole('button', { name: 'SIGN UP TODAY' }).click();

    // check initial state
    const signupModal = page.getByRole('dialog');
    await expect(signupModal.getByText("Let's Get Started")).toBeVisible();
    await expect(signupModal.locator('input#signupEmail')).toHaveValue(TEST_EMAIL);
    await expect(signupModal.getByText('PASSWORD MUST BE AT LEAST 6 CHARACTERS', { exact: true })).toBeVisible();
    await expect(signupModal.getByRole('button', { name: 'Sign Up' })).toBeDisabled();

    // fill in one password input
    await page.getByPlaceholder('Enter password').fill('password');

    // fill in confirm password input incorrectly
    await page.getByPlaceholder('Confirm Password').fill('password1');
    await expect(signupModal.getByText('PASSWORDS ENTERED ARE DIFFERENT')).toBeVisible();
    await expect(signupModal.getByRole('button', { name: 'Sign Up' })).toBeDisabled();

    // fix confirm password
    await page.getByPlaceholder('Confirm Password').fill('password');
    await expect(signupModal.getByRole('button', { name: 'Sign Up' })).toBeEnabled();
  });
});

test.describe('Login Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.getByRole('button', { name: 'Login' }).click();
  });

  test('validation works', async ({ page }) => {
    const loginModal = page.getByRole('dialog');
    await expect(loginModal).toBeVisible();

    const loginModalPrimaryButton = loginModal.getByRole('button', { name: 'Login' });
    await expect(loginModalPrimaryButton).toBeDisabled();

    await loginModal.getByPlaceholder('email', { exact: true }).fill(TEST_EMAIL);
    await loginModal.getByPlaceholder('password').fill('password');
    await expect(loginModalPrimaryButton).toBeEnabled();
  });
});
