import { expect, Page } from '@playwright/test';

export async function verifyTaskInColumn(
  page: Page,
  columnName: string,
  taskName: string,
  tags: string[]
) {
  // Wait for board columns to be present before doing anything
  await page.waitForSelector('.flex.flex-col.w-80.bg-gray-50', { timeout: 10000 });

  // Find the column by its h2 heading
  const column = page.locator('.flex.flex-col.w-80.bg-gray-50.rounded-lg.p-4')
    .filter({ has: page.locator('h2', { hasText: columnName }) });

  await expect(column).toBeVisible({ timeout: 10000 });

  // Find the card inside the cards container
  const taskCard = column.locator('.flex.flex-col.gap-3 > .bg-white.p-4')
    .filter({ has: page.locator('h3, p, [class*="font"]', { hasText: taskName }) });

  await expect(taskCard).toBeVisible({ timeout: 7000 });

  for (const expectedTag of tags) {
    await expect(taskCard.getByText(expectedTag, { exact: true })).toBeVisible();
  }
}