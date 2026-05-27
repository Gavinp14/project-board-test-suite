import { test } from '@playwright/test';
import { loginToApplication } from '../helpers/authHelper';
import { navigateToTab } from '../helpers/navHelper';
import { verifyTaskInColumn } from '../helpers/verifyHelper';
import testCases from '../data/testData.json';
import fs from 'fs'; // Required to safely check file existence

// Safely load the local .env file only if it exists (Local runs)
// In GitHub Actions, Node skips this block and natively reads GitHub Secrets
if (fs.existsSync('.env')) {
  // @ts-ignore
  process.loadEnvFile();
}

test.describe('Project Board Test Suite', () => {

  for (const caseData of testCases) {
    
    test(`Test Case ${caseData.id}: Verify "${caseData.taskName}" on ${caseData.navigation}`, async ({ page }) => {

      // Validate that the critical credentials exist before running the test
      if (!process.env.EMAIL || !process.env.PASSWORD) {
        throw new Error('Missing EMAIL or PASSWORD environment variables.');
      }

      await loginToApplication(page, process.env.EMAIL, process.env.PASSWORD); 
      
      await navigateToTab(page, caseData.navigation);
      
      await verifyTaskInColumn(
        page, 
        caseData.column, 
        caseData.taskName, 
        caseData.tags
      );
    });
  }
});