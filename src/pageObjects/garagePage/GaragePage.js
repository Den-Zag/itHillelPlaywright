import BasePage from "../BasePage.js";


export default class GaragePage  extends BasePage {
  constructor(page) {
    super(page, "/panel/garage", page.getByRole('button', { name: 'Add car' }))
      this.addCarButton = page.getByRole('button', { name: 'Add car' })
      this.profileButton = page.locator(".btn.btn-white.btn-sidebar.sidebar_btn.-profile")
      this.profilNameAndLastName = page.locator(".profile_name.display-4")
    }
}
