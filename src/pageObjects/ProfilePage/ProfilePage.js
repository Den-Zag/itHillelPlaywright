import BasePage from "../BasePage.js";


export default class ProfilePage extends BasePage {
  constructor(page) {
    super(page, "/panel/profile", page.locator(".main"))
      this.profileButton = page.locator(".btn.btn-white.btn-sidebar.sidebar_btn.-profile")
      this.profilNameAndLastName = page.locator(".profile_name.display-4")
    }
}
