import { Page } from '@playwright/test';
import { URL } from '../constants';

export async function loginToApplication(page: Page, username?: string, password?: string) {
  if (!username || !password) {
    throw new Error('CRITICAL SECURITY ERROR: Secrets were not passed from the environment file.');
  }

  await page.goto(URL);
  await page.getByLabel('Username').fill(username);
  await page.getByLabel('Password').fill(password);
  await page.waitForTimeout(5000); 
  await page.getByRole('button', { name: 'Sign in' }).click();
}