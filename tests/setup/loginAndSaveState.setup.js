import {expect, test as setup} from "@playwright/test";
import {USERS} from "../../src/data/users.js";
import WelcomePage from "../../src/pageObjects/welcomePage/WelcomePage.js";
import {USER1_STORAGE_STATE_PATH} from "../../src/data/constants.js";


setup(`Login as ${USERS.USER1.email} and save storage state`, async ({page})=>{
    const welcomePage = new WelcomePage(page)
    await welcomePage.navigate()
    const signInPopup = await welcomePage.header.clickSignInButton()
    await signInPopup.emailInput.fill(USERS.USER1.email);
    await signInPopup.passwordInput.fill(USERS.USER1.password);
    await signInPopup.loginBtn.click()

    await expect(page).toHaveURL(/garage/)

    //  save to file
    await page.context().storageState({
        path: USER1_STORAGE_STATE_PATH
    })
})
