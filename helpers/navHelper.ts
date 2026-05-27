// Inside helpers/navHelper.ts
export async function navigateToTab(page: Page, tabName: string) {
  await page.getByRole('button', { name: tabName }).click();
  // Ensure the page content container is visible before handing control back to the test
  await page.waitForLoadState('networkidle'); 
}