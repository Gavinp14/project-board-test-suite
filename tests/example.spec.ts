import { test } from '@playwright/test';
import { loginToApplication } from '../helpers/authHelper';
import { navigateToTab } from '../helpers/navHelper';
import { verifyTaskInColumn } from '../helpers/verifyHelper';
import testCases from '../data/testData.json';

// @ts-ignore
process.loadEnvFile();

test.describe('Project Board Test Suite', () => {

  for (const caseData of testCases) {
    
    test(`Test Case ${caseData.id}: Verify "${caseData.taskName}" on ${caseData.navigation}`, async ({ page }) => {

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