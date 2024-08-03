import BaseComponent from "../../../components/BaseComponent.js"
import RegistrationPopup from "./RegistrationPopup.js"


export default class SignInPopup extends BaseComponent {
  constructor(page) {
      super(page,  page.locator('app-signin-modal'))
      this.emailInput =  this.container.locator('#signinEmail')
      this.emailValidationMessage =  this.emailInput.locator(' + .invalid-feedback')
      this.passwordInput =  this.container.locator('#signinPassword')
      this.passwordValidationMessage =  this.passwordInput.locator(' + .invalid-feedback')
      this.loginBtn =  this.container.locator('.btn-primary')
      this.registrationBtn = page.locator('.modal-footer.d-flex.justify-content-between .btn-link')
     }

     async fill ({email, password}) {
          email && await this.emailInput.fill(email)
          password && await this.passwordInput.fill(password)
     }

     async login ({email, password}){
          await this.fill({email, password})
          await this.loginBtn.click()
     }

     async goToRegistrationForm(){
          await this.registrationBtn.click()
          return new RegistrationPopup(this._page)
        }
}
