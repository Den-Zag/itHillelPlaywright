import {expect, test} from "../../../src/fixtures/myFixtures.js"
import {CAR_BRANDS} from "../../../src/data/carBrands.spec.js"
import {CAR_MODELS} from "../../../src/data/carModels.spec.js"


const bodyForRequest = {
  "carBrandId": CAR_BRANDS.Audi.id,
  "carModelId": CAR_MODELS.Audi[3].id,
  "mileage": 10
}
var carId = null

test.describe("Expenses", ()=>{
  test.beforeEach(async ({request})=>{
    const res = await request.post('/api/cars', {
      data: bodyForRequest
    })

    const body = await res.json()
    carId = body.data.id
    await expect(res).toBeOK()
  })

  test('Add expenses', async ({request}) => {
    const requestBody = {
      "carId": carId,
      "reportedAt": new Date().toISOString().split('T')[0],
      "mileage": bodyForRequest.mileage + 1,
      "liters": 1,
      "totalCost": 100,
      "forceMileage": false
    }

    const responseExpense = await request.post('/api/expenses', {
      data: requestBody
    })

    const actualBody = await responseExpense.json()
    expect(actualBody).toEqual({
      status: 'ok',
      data: {
        carId: carId,
        reportedAt: requestBody.reportedAt,
        liters: requestBody.liters,
        id: expect.any(Number),
        mileage: requestBody.mileage,
        totalCost: expect.any(Number)
      }
    })
  })

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
})
