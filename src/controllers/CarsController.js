

export default class CarsController {
  #CREATE_CAR_PATH = '/api/cars'
  #GET_CARS_PATH = '/api/cars'
  #GET_BRANDS_PATH = '/api/cars/brands'
  #GET_MODELS_PATH = '/api/cars/models'
  
  #DELETE_CAR_PATH = (id) => `/api/cars/${id}`
  #GET_BRAND_PATH = (id) => `/api/cars/brands/${id}`
  #PUT_CARS_PATH = (id) => `/api/cars/${id}`
  #GET_MODEL_PATH = (id) => `/api/cars/models/${id}`
  #GET_CAR_PATH = (id) => `/api/cars/${id}`
  
  constructor(request){
    this._request = request
  }

  async getCars(){
    console.log("Get all user's cars")
    return this._request.get(this.#GET_CARS_PATH)
  }

  async getCar(id){
    console.log(`Get user's car id`)
    return this._request.get(this.#GET_CAR_PATH(id))
  }

  async getBrands(id){
    console.log(`Get all user's brands`)
    return this._request.get(this.#GET_BRANDS_PATH)
  }

  async getBrand(id){
    console.log(`Get user's brand id`)
    return this._request.get(this.#GET_BRAND_PATH(id))
  }

  async getModels(id){
    console.log(`Get all user's models`)
    return this._request.get(this.#GET_MODELS_PATH)
  }

  async getModel(id){
    console.log(`Get user's model id`)
    return this._request.get(this.#GET_MODEL_PATH(id))
  }

  async createCar(requestBody){
    console.log("Create car")
    return this._request.post(this.#CREATE_CAR_PATH, {
      data: requestBody
    })
  }

  async editCar(id, requestBody){
    console.log(`Editing a user's car  id`)
    return this._request.put(this.#PUT_CARS_PATH(id), {
      data: requestBody
    })
  }

  async deleteCar(id){
    console.log(`Delete car bt id`)
    return this._request.delete(this.#DELETE_CAR_PATH(id))
  }
}