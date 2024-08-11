import {test, expect} from "../../src/fixtures/myFixtures.js";


test.describe('Network - Garage', () => {
  
  test.beforeEach(async ({ garagePage}) => {
    await garagePage.navigate()
  })

  test('Mocked value', async ({garagePage, page}) => {
    const mockedUsersProfile = {
      "status": "ok",
      "data": {
        "lastName": "testLastName",
        "name": "testName",
        "photoFilename": "default-user.png",
        "userId": 131720
      }
    }
    
    await page.route("/api/users/profile", async route =>{
      await route.fulfill({
        status: 200,
        json: mockedUsersProfile
      })
    })
    
    await garagePage.profileButton.click()
    await expect(garagePage.profilNameAndLastName).toHaveText(mockedUsersProfile.data.name + ' ' + mockedUsersProfile.data.lastName)
    
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
    const expectedResponseBody = {
      "message": "Brand not found", 
      "status": "error"
    }

    const response = await request.post('/api/cars', {
        data: requestBody
    })

    expect(response).not.toBeOK()
    expect(response.status()).toBe(404)

    const body = await response.json()
    expect(body).toMatchObject(expectedResponseBody)

  })

  test("Creating a car without mileage", async({request})=>{
    const requestBody = {
      "carBrandId": 2,
      "carModelId": 1
    }
    const expectedResponseBody = {
      "message": "Mileage is required", 
      "status": "error"
    }

    const response = await request.post('/api/cars', {
        data: requestBody
    })

    expect(response).not.toBeOK()
    expect(response.status()).toBe(400)

    const body = await response.json()
    expect(body).toMatchObject(expectedResponseBody)

  })
})
