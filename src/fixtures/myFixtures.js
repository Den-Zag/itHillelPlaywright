import {test as base, expect as baseExpect, request as apiRequest} from "@playwright/test";
import GaragePage from "../pageObjects/garagePage/GaragePage.js";
import ProfilePage from "../pageObjects/ProfilePage/ProfilePage.js";
import {USER1_STORAGE_STATE_PATH} from "../data/constants.js";
import { CAR_BRANDS } from "../data/carBrands.spec.js";
import { CAR_MODELS } from "../data/carModels.spec.js";
import CarsController from "../controllers/CarsController.js";

export const test = base.extend({
  context: async ({browser}, use)=>{
    const ctx = await browser.newContext({
      //  get from file
      storageState: USER1_STORAGE_STATE_PATH
    })

    await use(ctx)
    await ctx.close()
    },

  request: async ({}, use)=>{
    const ctx = await apiRequest.newContext({
        //  get from file
        storageState: USER1_STORAGE_STATE_PATH
    })

    await use(ctx)
    await ctx.dispose()
  },
    
  garagePage: async ({page}, use)=>{
    // before test
    const gp = new GaragePage(page)

    // pass to test
    use(gp)

     // after test
  },

  profilePage: async ({page}, use)=>{
    // before test
    const pp = new ProfilePage(page)

    // pass to test
    use(pp)

     // after test
  },

  carsController:  async ({request}, use)=>{
    await use(new CarsController(request))
  },

  expensesController:  async ({request}, use)=>{
    await use(new ExpensesController(request))
  },

  newCar: async ({request, carsController}, use)=>{
    const carBrand = CAR_BRANDS.Audi.id
    const carModel = CAR_MODELS.Audi[3].id
    
    const requestBody = {
      "carBrandId": carBrand,
      "carModelId": carModel,
      "mileage": Math.floor(Math.random() * 10) + 1
    }
    const response = await carsController.createCar(requestBody)
    const body = await response.json()
 
    await use(body.data)

    await request.delete(`/api/cars/${body.data.id}`)
  },

})

export const expect = baseExpect
