import { test, expect } from '@playwright/test';
import exp from 'constants';

const signUpBtn = '.btn-primary';
const registrationForm = 'div[class="modal-content"]';
const formTitle = 'div[class="modal-content"] .modal-title'
const formTitleName = 'label[for="signupEmail"]'
const formTitleLastName = 'label[for="signupEmail"]'
const formTitleEmail = 'label[for="signupEmail"]'
const formTitlefieldPassword = 'label[for="signupPassword"]'
const formTitlefieldRePassword = 'label[for="signupRepeatPassword"]'
const fieldName = 'div[class="modal-content"] #signupName'
const fieldLastName = 'div[class="modal-content"] #signupLastName'
const fieldEmail = 'div[class="modal-content"] #signupEmail'
const fieldPassword = 'div[class="modal-content"] #signupPassword'
const fieldRePassword = 'div[class="modal-content"] #signupRepeatPassword'
const registerBtn = 'div[class="modal-content"] .btn-primary' 
const errorMessage = 'div[class="modal-content"] .invalid-feedback'
const message = 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'

test.describe('Registration form tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator(signUpBtn).click();
  });

  test('Opening the registration form', async ({ page }) => {
    await expect(page.locator(registrationForm)).toBeVisible()
  });

  test('Checking titles', async ({ page }) => {
    await expect(page.locator(formTitle)).toHaveText('Registration')
    await expect(page.locator(formTitleName).nth(0)).toHaveText('Name')
    await expect(page.locator(formTitleLastName).nth(1)).toHaveText('Last name')
    await expect(page.locator(formTitleEmail).nth(2)).toHaveText('Email')
    await expect(page.locator(formTitlefieldPassword)).toHaveText('Password')
    await expect(page.locator(formTitlefieldRePassword)).toHaveText('Re-enter password')
    await expect(page.locator(registerBtn)).toHaveText('Register')
  });

});

test.describe('Registration form tests - Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator(signUpBtn).click();
  });
  
  test('The value is valid', async ({ page }) => {
    await page.locator(fieldName).fill('Denys')
    await page.locator(fieldName).blur()
    await expect(page.locator(errorMessage)).not.toBeVisible()
  });

  test('2 letters in the input field', async ({ page }) => {
    await page.locator(fieldName).fill('De')
    await page.locator(fieldName).blur()
    await expect(page.locator(errorMessage)).not.toBeVisible()
  });

  test('20 letters in the input field', async ({ page }) => {
    await page.locator(fieldName).fill('Tdlrfgcagwbkfmchscdp')
    await page.locator(fieldName).blur()
    await expect(page.locator(errorMessage)).not.toBeVisible()
  });

  test('One letter in the input field', async ({ page }) => {
    await page.locator(fieldName).fill('D')
    await page.locator(fieldName).blur()
    await expect(page.locator(errorMessage)).toBeVisible()
    await expect(page.locator(fieldName)).toHaveCSS('border-color', 'rgb(220, 53, 69)')
    await expect(page.locator(errorMessage)).toHaveText('Name has to be from 2 to 20 characters long')
  });

  test('21 letters in the input field', async ({ page }) => {
    await page.locator(fieldName).fill('Tdlrfgcagwbkfmchscdpr')
    await page.locator(fieldName).blur()
    await expect(page.locator(errorMessage)).toBeVisible()
    await expect(page.locator(errorMessage)).toHaveText('Name has to be from 2 to 20 characters long')
  });

  test('Empty input field', async ({ page }) => {
    await page.locator(fieldName).click()
    await page.locator(fieldName).blur()
    await expect(page.locator(errorMessage)).toBeVisible()
    await expect(page.locator(errorMessage)).toHaveText('Name required')
  });

  test('Values with a space', async ({ page }) => {
    await page.locator(fieldName).fill('De ')
    await page.locator(fieldName).blur()
    await expect(page.locator(errorMessage)).toBeVisible()
    await expect(page.locator(errorMessage)).toHaveText('Name is invalid')
  });

  test('Values with a number', async ({ page }) => {
    await page.locator(fieldName).fill('Den3ys')
    await page.locator(fieldName).blur()
    await expect(page.locator(errorMessage)).toBeVisible()
    await expect(page.locator(errorMessage)).toHaveText('Name is invalid')
  });

  test('Values with special character', async ({ page }) => {
    await page.locator(fieldName).fill('Lukk@')
    await page.locator(fieldName).blur()
    await expect(page.locator(errorMessage)).toBeVisible()
    await expect(page.locator(errorMessage)).toHaveText('Name is invalid')
  });

});

test.describe('Registration form - Last Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator(signUpBtn).click();
  });

  test('The value is valid', async ({ page }) => {
    await page.locator(fieldLastName).fill('Zagrebelnyi')
    await page.locator(fieldLastName).blur()
    await expect(page.locator(errorMessage)).not.toBeVisible()
  });

  test('2 letters in the input field', async ({ page }) => {
    await page.locator(fieldLastName).fill('Za')
    await page.locator(fieldLastName).blur()
    await expect(page.locator(errorMessage)).not.toBeVisible()
  });

  test('20 letters in the input field', async ({ page }) => {
    await page.locator(fieldLastName).fill('Tdlrfgcagwbkfmchscdp')
    await page.locator(fieldLastName).blur()
    await expect(page.locator(errorMessage)).not.toBeVisible()
  });

  test('One letter in the input field', async ({ page }) => {
    await page.locator(fieldLastName).fill('Z')
    await page.locator(fieldLastName).blur()
    await expect(page.locator(errorMessage)).toBeVisible()
    await expect(page.locator(errorMessage)).toHaveText('Last name has to be from 2 to 20 characters long')
  });

  test('21 letters in the input field', async ({ page }) => {
    await page.locator(fieldLastName).fill('Tdlrfgcagwbkfmchscdpr')
    await page.locator(fieldLastName).blur()
    await expect(page.locator(errorMessage)).toBeVisible()
    await expect(page.locator(errorMessage)).toHaveText('Last name has to be from 2 to 20 characters long')
  });

  test('Empty input field', async ({ page }) => {
    await page.locator(fieldLastName).click()
    await page.locator(fieldLastName).blur()
    await expect(page.locator(errorMessage)).toBeVisible()
    await expect(page.locator(errorMessage)).toHaveText('Last name required')
  });

  test('Values with a space', async ({ page }) => {
    await page.locator(fieldLastName).fill('De ')
    await page.locator(fieldLastName).blur()
    await expect(page.locator(errorMessage)).toBeVisible()
    await expect(page.locator(errorMessage)).toHaveText('Last name is invalid')
  });

  test('Values with a number', async ({ page }) => {
    await page.locator(fieldLastName).fill('Zagrebelnyi9')
    await page.locator(fieldLastName).blur()
    await expect(page.locator(errorMessage)).toBeVisible()
    await expect(page.locator(errorMessage)).toHaveText('Last name is invalid')
  });

  test('Values with special character', async ({ page }) => {
    await page.locator(fieldLastName).fill('Z@grebelnti')
    await page.locator(fieldLastName).blur()
    await expect(page.locator(errorMessage)).toBeVisible()
    await expect(page.locator(errorMessage)).toHaveText('Last name is invalid')
  });

});

test.describe('Registration form - Email', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator(signUpBtn).click();
  });

  test('The value is valid', async ({ page }) => {
    await page.locator(fieldEmail).fill('denzag.user1.v5@gmail.com')
    await page.locator(fieldEmail).blur()
    await expect(page.locator(errorMessage)).not.toBeVisible()
  });

  test('Empty input field', async ({ page }) => {
    await page.locator(fieldEmail).click('')
    await page.locator(fieldEmail).blur()
    await expect(page.locator(errorMessage)).toBeVisible()
    await expect(page.locator(errorMessage)).toHaveText('Email required')
  });

  test('Values without "at" (@)', async ({ page }) => {
    await page.locator(fieldEmail).fill('denzagrebelnyigmail.com')
    await page.locator(fieldEmail).blur()
    await expect(page.locator(errorMessage)).toBeVisible()
    await expect(page.locator(errorMessage)).toHaveText('Email is incorrect')
  });

  test('Values without a dot after the domain', async ({ page }) => {
    await page.locator(fieldEmail).fill('denzagrebelnyi@gmailcom')
    await page.locator(fieldEmail).blur()
    await expect(page.locator(errorMessage)).toBeVisible()
    await expect(page.locator(errorMessage)).toHaveText('Email is incorrect')
  });

  test('Values without a domain', async ({ page }) => {
    await page.locator(fieldEmail).fill('denzagrebelnyi@.com')
    await page.locator(fieldEmail).blur()
    await expect(page.locator(errorMessage)).toBeVisible()
    await expect(page.locator(errorMessage)).toHaveText('Email is incorrect')
  });

  test('Value without local part', async ({ page }) => {
    await page.locator(fieldEmail).fill('@gmail.com')
    await page.locator(fieldEmail).blur()
    await expect(page.locator(errorMessage)).toBeVisible()
    await expect(page.locator(errorMessage)).toHaveText('Email is incorrect')
  });

  test('Values without a top-level domain', async ({ page }) => {
    await page.locator(fieldEmail).fill('denzagrebelnyi@gmail.')
    await page.locator(fieldEmail).blur()
    await expect(page.locator(errorMessage)).toBeVisible()
    await expect(page.locator(errorMessage)).toHaveText('Email is incorrect')
  });

});

test.describe('Registration form - Password', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator(signUpBtn).click();
  });

  test('The value is valid - 8 characters', async ({ page }) => {
    await page.locator(fieldPassword).fill('Tes@3D1d')
    await page.locator(fieldPassword).blur()
    await expect(page.locator(errorMessage)).not.toBeVisible()
  });
  
  test('The value is valid - 15 characters', async ({ page }) => {
    await page.locator(fieldPassword).fill('Test3De1vHc3vB4')
    await page.locator(fieldPassword).blur()
    await expect(page.locator(errorMessage)).not.toBeVisible()
  });
  
  test('Empty input field', async ({ page }) => {
  await page.locator(fieldPassword).fill('denzagrebelnyi@gmail.')
  await page.locator(fieldPassword).blur()
  await expect(page.locator(errorMessage)).toBeVisible()
  await expect(page.locator(errorMessage)).toHaveText(message)
  });

  test('7 characters', async ({ page }) => {
  await page.locator(fieldPassword).fill('Tet1De1')
  await page.locator(fieldPassword).blur()
  await expect(page.locator(errorMessage)).toBeVisible()
  await expect(page.locator(errorMessage)).toHaveText(message)
  });

  test('16 characters', async ({ page }) => {
  await page.locator(fieldPassword).fill('Test@de1nd84bciQ')
  await page.locator(fieldPassword).blur()
  await expect(page.locator(errorMessage)).toBeVisible()
  await expect(page.locator(errorMessage)).toHaveText(message)
  });

  test('Without capital letters', async ({ page }) => {
  await page.locator(fieldPassword).fill('vfkvnv7hvn2hfk')
  await page.locator(fieldPassword).blur()
  await expect(page.locator(errorMessage)).toBeVisible()
  await expect(page.locator(errorMessage)).toHaveText(message)
  });

  test('Without owercase letters', async ({ page }) => {
  await page.locator(fieldPassword).fill('E1GHJHKJLKKB')
  await page.locator(fieldPassword).blur()
  await expect(page.locator(errorMessage)).toBeVisible()
  await expect(page.locator(errorMessage)).toHaveText(message)
  });

  test('Without numbers', async ({ page }) => {
  await page.locator(fieldPassword).fill('nkJhGfBcC')
  await page.locator(fieldPassword).blur()
  await expect(page.locator(errorMessage)).toBeVisible()
  await expect(page.locator(errorMessage)).toHaveText(message)
  });

});

test.describe('Registration form - Re Password', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator(signUpBtn).click();
  });

  test('The value is valid - 8 characters', async ({ page }) => {
    await page.locator(fieldPassword).fill('Tes@3D1d')
    await page.locator(fieldRePassword).fill('Tes@3D1d')
    await page.locator(fieldRePassword).blur()
    await expect(page.locator(errorMessage)).not.toBeVisible()
  });
  
  test('The value is valid - 15 characters', async ({ page }) => {
    await page.locator(fieldPassword).fill('Test3De1vHc3vB4')
    await page.locator(fieldRePassword).fill('Test3De1vHc3vB4')
    await page.locator(fieldRePassword).blur()
    await expect(page.locator(errorMessage)).not.toBeVisible()
  });

  test('Passwords do not match', async ({ page }) => {
    await page.locator(fieldPassword).fill('Test3De1vHc3vB4')
    await page.locator(fieldRePassword).fill('Test3e1vHc3vB4')
    await page.locator(fieldRePassword).blur()
    await expect(page.locator(errorMessage)).toBeVisible('Passwords do not match')
  });
  
  test('Empty input field', async ({ page }) => {
  await page.locator(fieldRePassword).fill('denzagrebelnyi@gmail.')
  await page.locator(fieldRePassword).blur()
  await expect(page.locator(errorMessage)).toBeVisible()
  await expect(page.locator(errorMessage)).toHaveText(message)
  });

  test('7 characters', async ({ page }) => {
  await page.locator(fieldRePassword).fill('Tet1De1')
  await page.locator(fieldRePassword).blur()
  await expect(page.locator(errorMessage)).toBeVisible()
  await expect(page.locator(errorMessage)).toHaveText(message)
  });

  test('16 characters', async ({ page }) => {
  await page.locator(fieldRePassword).fill('Test@de1nd84bciQ')
  await page.locator(fieldRePassword).blur()
  await expect(page.locator(errorMessage)).toBeVisible()
  await expect(page.locator(errorMessage)).toHaveText(message)
  });

  test('Without capital letters', async ({ page }) => {
  await page.locator(fieldRePassword).fill('vfkvnv7hvn2hfk')
  await page.locator(fieldRePassword).blur()
  await expect(page.locator(errorMessage)).toBeVisible()
  await expect(page.locator(errorMessage)).toHaveText(message)
  });

  test('Without owercase letters', async ({ page }) => {
  await page.locator(fieldRePassword).fill('E1GHJHKJLKKB')
  await page.locator(fieldRePassword).blur()
  await expect(page.locator(errorMessage)).toBeVisible()
  await expect(page.locator(errorMessage)).toHaveText(message)
  });

  test('Without numbers', async ({ page }) => {
  await page.locator(fieldRePassword).fill('nkJhGfBcC')
  await page.locator(fieldRePassword).blur()
  await expect(page.locator(errorMessage)).toBeVisible()
  await expect(page.locator(errorMessage)).toHaveText(message)
  });

});

test.describe('Registration form - Create a New Account', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator(signUpBtn).click();
  });

  test('Create a New Account', async ({ page }) => {
    await page.locator(fieldName).fill('Denys')
    await page.locator(fieldLastName).fill('Zagrebelnyi')
    await page.locator(fieldEmail).fill('aqa-denzag.user1.v5@gmail.com')
    await page.locator(fieldPassword).fill('Test3De1vHc3vB4')
    await page.locator(fieldRePassword).fill('Test3De1vHc3vB4')
    await page.locator(registerBtn).click()
    await expect(page.locator(errorMessage)).not.toBeVisible()
    });

  });

test.describe('Registration form - Register button', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator(signUpBtn).click();
  });

  test('Register button', async ({ page }) => {
    await page.locator(fieldName).fill('Denys')
    await page.locator(fieldLastName).fill('Zagrebelnyi')
    await page.locator(fieldEmail).fill('aqa-denzag.user1.v5@gmail.com')
    await page.locator(fieldPassword).fill('Test3De1vHc3vB4')
    await expect(page.locator(registerBtn)).toBeDisabled()
    await page.locator(fieldRePassword).fill('Test3De1vHc3vB4')
    await expect(page.locator(registerBtn)).not.toBeDisabled()
    });
});

  