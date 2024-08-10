import {test, expect} from "../../src/fixtures/myFixtures.js";


const mockedCarBrands = {
  "status": "ok",
  "data": {
    "lastName": "testLastName",
    "name": "testName",
    "photoFilename": "default-user.png",
    "userId": 131720
  }
}

test.describe('Network - Garage', () => {
  
  test.beforeEach(async ({ garagePage}) => {
    await garagePage.navigate()
  })

  test('Mocked value', async ({garagePage, page}) => {
    await page.route("/api/users/profile", async route =>{
      await route.fulfill({
          status: 200,
          json: mockedCarBrands
        })
    })
    await page.pause()
  });
})


test.describe("Cars", ()=>{
  
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

  test("Creating a car with valid values", async({request})=>{
    const requestBody = {
        "carBrandId": 1,
        "carModelId": 1,
        "mileage": 122
    }

    const response = await request.post('/api/cars', {
        data: requestBody
    })

    const body = await response.json()
    expect(body.data, "Car should be created").toMatchObject(requestBody)
  }),

  test("Creating a car with invalid values for carBrandId", async({request})=>{
    const requestBody = {
        "carBrandId": 1000000,
        "carModelId": 1,
        "mileage": 122
    }

    const response = await request.post('/api/cars', {
        data: requestBody
    })

    expect(response.ok()).toBeFalsy()
    
  })
})
