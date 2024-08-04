import {expect, test} from "@playwright/test";
import WelcomePage from "../../src/pageObjects/welcomePage/WelcomePage";


test.describe('Registration form tests', () => {
  let signInPopup
  let registrationPopup

  test.beforeEach(async ({ page }) => {
    const welcomePage = new WelcomePage(page)
    await welcomePage.navigate()
    signInPopup = await welcomePage.header.clickSignInButton()
    registrationPopup = await signInPopup.goToRegistrationForm()
  });

  test('Checking titles', async ({ page }) => {
    await expect(registrationPopup.formTitle).toBeVisible()
  });
})

test.describe('Registration form - Name', () => {
  let signInPopup
  let registrationPopup

  test.beforeEach(async ({ page }) => {
    const welcomePage = new WelcomePage(page)
    await welcomePage.navigate()
    signInPopup = await welcomePage.header.clickSignInButton()
    registrationPopup = await signInPopup.goToRegistrationForm()
  });

  test('The value is valid', async ({ page }) => {
    await registrationPopup.nameInput.type('Denys')
    await registrationPopup.nameInput.blur()
    await expect(registrationPopup.errorMessage).not.toBeVisible()
  });

  test('2 letters in the input field', async ({ page }) => {
    await registrationPopup.nameInput.type('De')
    await registrationPopup.nameInput.blur()
    await expect(registrationPopup.errorMessage).not.toBeVisible()
  });

  test('20 letters in the input field', async ({ page }) => {
    await registrationPopup.nameInput.type('Tdlrfgcagwbkfmchscdp')
    await registrationPopup.nameInput.blur()
    await expect(registrationPopup.errorMessage).not.toBeVisible()
  });

  test('One letter in the input field', async ({ page }) => {
    await registrationPopup.nameInput.type('D')
    await registrationPopup.nameInput.blur()
    await expect(registrationPopup.errorMessage).toBeVisible()
    await expect(registrationPopup.nameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)')
    await expect(registrationPopup.errorMessage).toHaveText('Name has to be from 2 to 20 characters long')
  });

  test('21 letters in the input field', async ({ page }) => {
    await registrationPopup.nameInput.type('Tdlrfgcagwbkfmchscdpr')
    await registrationPopup.nameInput.blur()
    await expect(registrationPopup.errorMessage).toBeVisible()
    await expect(registrationPopup.nameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)')
    await expect(registrationPopup.errorMessage).toHaveText('Name has to be from 2 to 20 characters long')
  });
})

test.describe('Registration form tests - Last lastName', () => {
  let signInPopup
  let registrationPopup

  test.beforeEach(async ({ page }) => {
    const welcomePage = new WelcomePage(page)
    await welcomePage.navigate()
    signInPopup = await welcomePage.header.clickSignInButton()
    registrationPopup = await signInPopup.goToRegistrationForm()
  });

  test('The value is valid', async ({ page }) => {
    await registrationPopup.lastNameInput.type('Zagrebelnti')
    await registrationPopup.lastNameInput.blur()
    await expect(registrationPopup.errorMessage).not.toBeVisible()
  });

  test('2 letters in the input field', async ({ page }) => {
    await registrationPopup.lastNameInput.type('Za')
    await registrationPopup.lastNameInput.blur()
    await expect(registrationPopup.errorMessage).not.toBeVisible()
  });

  test('20 letters in the input field', async ({ page }) => {
    await registrationPopup.lastNameInput.type('Tdlrfgcagwbkfmchscdp')
    await registrationPopup.lastNameInput.blur()
    await expect(registrationPopup.errorMessage).not.toBeVisible()
  });

  test('Empty input field', async ({ page }) => {
    await registrationPopup.lastNameInput.click()
    await registrationPopup.lastNameInput.blur()
    await expect(registrationPopup.errorMessage).toBeVisible()
    await expect(registrationPopup.errorMessage).toHaveText('Last name required')
  });

  test('One letter in the input field', async ({ page }) => {
    await registrationPopup.lastNameInput.type('Z')
    await registrationPopup.lastNameInput.blur()
    await expect(registrationPopup.errorMessage).toBeVisible()
    await expect(registrationPopup.lastNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)')
    await expect(registrationPopup.errorMessage).toHaveText('Last name has to be from 2 to 20 characters long')
  });

  test('21 letters in the input field', async ({ page }) => {
    await registrationPopup.lastNameInput.type('Tdlrfgcagwbkfmchscdpr')
    await registrationPopup.lastNameInput.blur()
    await expect(registrationPopup.errorMessage).toBeVisible()
    await expect(registrationPopup.lastNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)')
    await expect(registrationPopup.errorMessage).toHaveText('Last name has to be from 2 to 20 characters long')
  });
})

test.describe('Registration form - Email', () => {
  let signInPopup
  let registrationPopup

  test.beforeEach(async ({ page }) => {
    const welcomePage = new WelcomePage(page)
    await welcomePage.navigate()
    signInPopup = await welcomePage.header.clickSignInButton()
    registrationPopup = await signInPopup.goToRegistrationForm()
  });

  test('The value is valid', async ({ page }) => {
    await registrationPopup.emailInput.type('denzag.user1.v5@gmail.com')
    await registrationPopup.emailInput.blur()
    await expect(registrationPopup.errorMessage).not.toBeVisible()
  });

  test('Empty input field', async ({ page }) => {
    await registrationPopup.emailInput.click()
    await registrationPopup.emailInput.blur()
    await expect(registrationPopup.errorMessage).toBeVisible()
    await expect(registrationPopup.errorMessage).toHaveText('Email required')
  });

  test('Values without "at" (@)', async ({ page }) => {
    await registrationPopup.emailInput.type('denzagrebelnyigmail.com')
    await registrationPopup.emailInput.blur()
    await expect(registrationPopup.errorMessage).toBeVisible()
    await expect(registrationPopup.errorMessage).toHaveText('Email is incorrect')
  });

  test('Values without a dot after the domain', async ({ page }) => {
    await registrationPopup.emailInput.type('denzagrebelnyi@gmailcom')
    await registrationPopup.emailInput.blur()
    await expect(registrationPopup.errorMessage).toBeVisible()
    await expect(registrationPopup.errorMessage).toHaveText('Email is incorrect')
  });

  test('Values without a domain', async ({ page }) => {
    await registrationPopup.emailInput.type('denzagrebelnyi@.com')
    await registrationPopup.emailInput.blur()
    await expect(registrationPopup.errorMessage).toBeVisible()
    await expect(registrationPopup.errorMessage).toHaveText('Email is incorrect')
  });

  test('Value without local part', async ({ page }) => {
    await registrationPopup.emailInput.type('@gmail.com')
    await registrationPopup.emailInput.blur()
    await expect(registrationPopup.errorMessage).toBeVisible()
    await expect(registrationPopup.errorMessage).toHaveText('Email is incorrect')
  });

  test('Values without a top-level domain', async ({ page }) => {
    await registrationPopup.emailInput.type('denzagrebelnyi@gmail.')
    await registrationPopup.emailInput.blur()
    await expect(registrationPopup.errorMessage).toBeVisible()
    await expect(registrationPopup.errorMessage).toHaveText('Email is incorrect')
  });
})

test.describe('Registration form - Password', () => {
  let signInPopup
  let registrationPopup

  test.beforeEach(async ({ page }) => {
    const welcomePage = new WelcomePage(page)
    await welcomePage.navigate()
    signInPopup = await welcomePage.header.clickSignInButton()
    registrationPopup = await signInPopup.goToRegistrationForm()
  });

  test('The value is valid - 8 characters', async ({ page }) => {
    await registrationPopup.passwordInput.type('Tes@3D1d')
    await registrationPopup.passwordInput.blur()
    await expect(registrationPopup.errorMessage).not.toBeVisible()
  });
  
  test('The value is valid - 15 characters', async ({ page }) => {
    await registrationPopup.passwordInput.type('Test3De1vHc3vB4')
    await registrationPopup.passwordInput.blur()
    await expect(registrationPopup.errorMessage).not.toBeVisible()
  });
  
  test('Empty input field', async ({ page }) => {
    await registrationPopup.passwordInput.type('denzagrebelnyi@gmail.')
    await registrationPopup.passwordInput.blur()
    await expect(registrationPopup.errorMessage).toBeVisible()
    await expect(registrationPopup.errorMessage).toHaveText(registrationPopup.errorText)
  });

  test('7 characters', async ({ page }) => {
    await registrationPopup.passwordInput.type('Tet1De1')
    await registrationPopup.passwordInput.blur()
    await expect(registrationPopup.errorMessage).toBeVisible()
    await expect(registrationPopup.errorMessage).toHaveText(registrationPopup.errorText)
  });

  test('16 characters', async ({ page }) => {
    await registrationPopup.passwordInput.type('Test@de1nd84bciQ')
    await registrationPopup.passwordInput.blur()
    await expect(registrationPopup.errorMessage).toBeVisible()
    await expect(registrationPopup.errorMessage).toHaveText(registrationPopup.errorText)
  });

  test('Without capital letters', async ({ page }) => {
    await registrationPopup.passwordInput.type('vfkvnv7hvn2hfk')
    await registrationPopup.passwordInput.blur()
    await expect(registrationPopup.errorMessage).toBeVisible()
    await expect(registrationPopup.errorMessage).toHaveText(registrationPopup.errorText)
  });

  test('Without owercase letters', async ({ page }) => {
    await registrationPopup.passwordInput.type('E1GHJHKJLKKB')
    await registrationPopup.passwordInput.blur()
    await expect(registrationPopup.errorMessage).toBeVisible()
    await expect(registrationPopup.errorMessage).toHaveText(registrationPopup.errorText)
  });

  test('Without numbers', async ({ page }) => {
    await registrationPopup.passwordInput.type('nkJhGfBcC')
    await registrationPopup.passwordInput.blur()
    await expect(registrationPopup.errorMessage).toBeVisible()
    await expect(registrationPopup.errorMessage).toHaveText(registrationPopup.errorText)
    });
})

test.describe('Registration form - Re-Password', () => {
  let signInPopup
  let registrationPopup

  test.beforeEach(async ({ page }) => {
    const welcomePage = new WelcomePage(page)
    await welcomePage.navigate()
    signInPopup = await welcomePage.header.clickSignInButton()
    registrationPopup = await signInPopup.goToRegistrationForm()
  });

  test('The value is valid - 8 characters', async ({ page }) => {
    await registrationPopup.passwordInput.type('Tes@3D1d')
    await registrationPopup.rePasswordInput.type('Tes@3D1d')
    await registrationPopup.rePasswordInput.blur()
    await expect(registrationPopup.errorMessage).not.toBeVisible()
  });
  
  test('The value is valid - 15 characters', async ({ page }) => {
    await registrationPopup.passwordInput.type('Test3De1vHc3vB4')
    await registrationPopup.rePasswordInput.type('Test3De1vHc3vB4')
    await registrationPopup.rePasswordInput.blur()
    await expect(registrationPopup.errorMessage).not.toBeVisible()
  });
  
  test('Empty input field', async ({ page }) => {
    await registrationPopup.passwordInput.type('denDagw213')
    await registrationPopup.rePasswordInput.type('')
    await registrationPopup.rePasswordInput.blur()
    await expect(registrationPopup.errorMessage).toBeVisible()
    await expect(registrationPopup.errorMessage).toHaveText('Re-enter password required')
  });
})

test.describe('Registration form - Create a New Account', () => {
  let signInPopup
  let registrationPopup

  test.beforeEach(async ({ page }) => {
    const welcomePage = new WelcomePage(page)
    await welcomePage.navigate()
    signInPopup = await welcomePage.header.clickSignInButton()
    registrationPopup = await signInPopup.goToRegistrationForm()
  });

  test('Create a New Account', async ({ page }) => {
    await registrationPopup.nameInput.type('Denys')
    await registrationPopup.lastNameInput.type('Zagrebelnyi')
    await registrationPopup.emailInput.type('aqa-denzag.user1.v7@gmail.com')
    await registrationPopup.passwordInput.type('Test3De1vHc3vB1')
    await registrationPopup.rePasswordInput.type('Test3De1vHc3vB1')
    await expect(registrationPopup.errorMessage).not.toBeVisible()
  });
});

test.describe('Registration form - Register button', () => {
  let signInPopup
  let registrationPopup

  test.beforeEach(async ({ page }) => {
    const welcomePage = new WelcomePage(page)
    await welcomePage.navigate()
    signInPopup = await welcomePage.header.clickSignInButton()
    registrationPopup = await signInPopup.goToRegistrationForm()
  });

  test('Register button', async ({ page }) => {
    await registrationPopup.nameInput.type('Denys')
    await registrationPopup.lastNameInput.type('Zagrebelnyi')
    await registrationPopup.emailInput.type('aqa-denzag.user1.v5@gmail.com')
    await registrationPopup.passwordInput.type('Test3De1vHc3vB4')
    await expect(registrationPopup.registerBtn).toBeDisabled()
    await registrationPopup.rePasswordInput.type('Test3De1vHc3vB4')
    await expect(registrationPopup.registerBtn).not.toBeDisabled()
    });
});
