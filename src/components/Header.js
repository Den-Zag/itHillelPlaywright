import SignInPopup from "../pageObjects/welcomePage/components/SignInPopup.js"
import BaseComponent from "./BaseComponent.js"


export default class Header  extends  BaseComponent {
  constructor(page) {
  super(page)
  this.signInBtn = page.locator('.header_signin')
  }

  async clickSignInButton(){
    await this.signInBtn.click()
    return new SignInPopup(this._page)
  }
}
