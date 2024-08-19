import {expect, test} from "../../../src/fixtures/myFixtures.js";
import CarsController from "../../../src/controllers/CarsController.js";
import { CAR_BRANDS } from "../../../src/data/carBrands.spec.js";
import { CAR_MODELS } from "../../../src/data/carModels.spec.js";



test.describe("Endpoint GET - Brands", ()=>{

  test("Get all user's brands", async({carsController}) => {
    const expectedBrands = Object.values(CAR_BRANDS)
    const response = await carsController.getBrands()
    const body = await response.json()

    expect(body.data).toEqual(expectedBrands)

  })

  test("Get a user's brand", async({carsController}) => {
    const brandId = Math.floor(Math.random() * 5) + 1
    const expectedBrand = Object.values(CAR_BRANDS).find(brand => brand.id === brandId)
    const response = await carsController.getBrand(brandId)
    const body = await response.json()

    expect(body.data).toEqual(expectedBrand)

  })

})

test.describe("Endpoint GET - Models", ()=>{

  test("Get all user's models", async({carsController}) => {
    const expectedModels = Object.values(CAR_MODELS).flat()
    const response = await carsController.getModels()
    const body = await response.json()

    expect(body.data).toEqual(expectedModels)

  })

  test("Get a user's model", async({carsController}) => {
    const modalId = Math.floor(Math.random() * 23) + 1
    const getModels = Object.values(CAR_MODELS).flat()
    const expectedModel = getModels.find(model => model.id === modalId)
    const response = await carsController.getModel(modalId)
    const body = await response.json()

    expect(body.data).toEqual(expectedModel)

  })

})

test.describe("Endpoint GET - Cars", ()=>{

  test("Gets current user cars", async({carsController}) => {
    const response = await carsController.getCars()
    const body = await response.json()

    expect(body.status).toBe('ok')
    body.data.map(car => {
      expect(car).toEqual({
        id: expect.any(Number),
        carBrandId: expect.any(Number),
        carModelId: expect.any(Number),
        initialMileage: expect.any(Number),
        updatedMileageAt: expect.any(String),
        carCreatedAt: expect.any(String),
        mileage: expect.any(Number),
        brand: expect.any(String),
        model: expect.any(String),
        logo: expect.any(String),
      })
    })

  })

  test("Gets current user car by id", async({newCar: createdCar, carsController}) => {
    const carId = createdCar.id
    const response = await carsController.getCar(carId)
    const body = await response.json()

    expect(body.data.id).toEqual(createdCar.id)
    expect(body.data.carBrandId).toEqual(CAR_BRANDS.Audi.id)
    expect(body.data.carModelId).toEqual(CAR_MODELS.Audi[3].id)
  })

})

test.describe("Endpoint POST - Create cars", ()=>{
  test.afterEach(async ({request})=>{
    const carsList = await request.get('/api/cars')
    const {data: cars} = await carsList.json()
    
    await Promise.all(
      cars.map((car)=>(async ()=>{
        const res = await request.delete(`/api/cars/${car.id}`)
        await expect(res).toBeOK()
      })())
    )
  })

  for (const carBrand of Object.values(CAR_BRANDS)) {
    for (const carModel of Object.values((CAR_MODELS[carBrand.title]))) {
      test(`Create car with brand ${carBrand.title} and model ${carModel.title}`, async({carsController})=>{
        const requestBody = {
          "carBrandId": carBrand.id,
          "carModelId": carModel.id,
          "mileage": Math.floor(Math.random() * 100)
        }
        const response = await carsController.createCar(requestBody)
        expect(response.status(), "Status code should be valid").toBe(201)
        const actualBody = await response.json()

        expect(actualBody).toEqual({
          "status": "ok",
          "data": {
            "id": expect.any(Number),
            "carBrandId": requestBody.carBrandId,
            "carModelId": requestBody.carModelId,
            "initialMileage": requestBody.mileage,
            "updatedMileageAt": expect.any(String),
            "carCreatedAt": expect.any(String),
            "mileage": requestBody.mileage,
            "brand": carBrand.title,
            "model": carModel.title,
            "logo": carBrand.logoFilename
          }
        })
      })
    }
  }
})

test.describe("Endpoint PUT - Edits existing car", ()=>{

  test("Get a user's car", async({carsController, newCar: createdCar}) => {
    const carId = createdCar.id
    const carBrandId = CAR_BRANDS.BMW.id
    const carModelId = CAR_MODELS.BMW[2].id
    const mileage = 100
    const responseBody = {
      "carBrandId": carBrandId,
      "carModelId": carModelId,
      "mileage": mileage
    }
    const response = await carsController.editCar(carId, responseBody)
    const body = await response.json()

    expect(body.data.carBrandId).toEqual(carBrandId)
    expect(body.data.carModelId).toEqual(carModelId)
    expect(body.data.mileage).toEqual(mileage)
  })

})

test.describe("Endpoint DELETE - Deletes existing car", ()=>{

  test("Deletes a user's car", async({carsController}) => {
    const requestBody = {
      "carBrandId":  CAR_BRANDS.Fiat.id,
      "carModelId": CAR_MODELS.Fiat[2].id,
      "mileage": Math.floor(Math.random() * 10) + 1
    }
    const responseCreate = await carsController.createCar(requestBody)
    const bodyCreate = await responseCreate.json()
    const carIdCreate = bodyCreate.data.id

    const responseDelete = await carsController.deleteCar(carIdCreate)
    const bodyDelete = await responseDelete.json()

    expect(bodyDelete.data.carId).toEqual(carIdCreate)
  })

})
