import {test, expect} from "../../src/fixtures/myFixtures.js";

test.describe('Garage', () => {
    test.beforeEach(async ({ garagePage}) => {
        await garagePage.navigate()
    })

    test('should be able to open the garage', async ({garagePage}) => {
          await expect(garagePage.addCarButton).toBeVisible();
      });

    test('should be able to open the garage 2', async ({garagePage}) => {
        await expect(garagePage.addCarButton).toBeEnabled();
    });
})
