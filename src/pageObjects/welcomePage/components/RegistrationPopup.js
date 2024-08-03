import BaseComponent from "../../../components/BaseComponent.js"


export default class RegistrationPopup extends BaseComponent {
  constructor(page) {
      super(page,  page.locator('.modal-content'))
      this.formTitle = this.container.locator('.modal-title', {hasText: 'Registration'})
      this.formTitlefieldPassword = this.container.locator('label[for="signupPassword"]')
      this.formTitlefieldRePassword = this.container.locator('label[for="signupRepeatPassword"]')
      this.nameInput = this.container.locator('#signupName')
      this.lastNameInput = this.container.locator('#signupLastName')
      this.emailInput = this.container.locator('#signupEmail')
      this.passwordInput = this.container.locator('#signupPassword')
      this.rePasswordInput = this.container.locator('#signupRepeatPassword')
      this.registerBtn = this.container.locator('.btn-primary', {hasText: 'Register'})
      this.errorMessage = this.container.locator('.invalid-feedback')
      this.errorText = 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
    }

    async getTitleNameLastNameEmail(value){
      this.container.locator('label[for="signupEmail"]').toHaveText(value)
    }

    async fill({name, lastName, email, password, rePassword}){
      name && await this.nameInput.fill(name)
      lastName && await this.lastNameInput.fill(lastName)
      email && await this.emailInput.fill(email)
      password && await this.passwordInput.fill(password)
      rePassword && await this.rePasswordInput.fill(rePassword)
    }

    async createNewAccount({name, lastName, email, password, rePassword}){
      await this.fill({name, lastName, email, password, rePassword})
      await this.registerBtn.click()
    }
}
