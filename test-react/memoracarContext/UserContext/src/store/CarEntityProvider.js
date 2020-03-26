/*
Date: 25/03/2020
Author: Benjamin GRASSART

CarEntityProvider.js    

CarEntityContext is used to retain the use car entitys.
*/


import { createContext } from "react";

/*
The car entity model is like below: 

{
"carEntityId": 6,
  "mileage": 100000,
  "immatriculationDate": "2020-05-01T00:00:00",
  "vin": "VIN-cF95ew0cp0ZhxE=w",
  "licencePlate": "GR-999-RT"
  "carModel": {
      "carModelId": 2,
      "brand": "Fiat",
      "model": "Tipo",
      "motor": "1.7D",
      "horsePower": 57,
      "kwPower": 40,
      "fiscalPower": 4,
      "energy": "petrol",
      "finition": "Pop",
      "maintenancePlan": null
    }
}

{
  carSelected:
  { 
    "carEntityId": 6,
      "mileage": 100000,
      "immatriculationDate": "2020-05-01T00:00:00",
      "vin": "VIN-cF95ew0cp0ZhxE=w",
      "licencePlate": "GR-999-RT"
      "carModel": {
          "carModelId": 2,
          "brand": "Fiat",
          "model": "Tipo",
          "motor": "1.7D",
      }
  }
  carsAvailable: [
    { 
      <list of car like car selected>
    }
  ]
    
}

*/

export const CarEntityContext = createContext({
    carSelected: {
        carEntityId: -1,
        mileage: -1,
        immatriculationDate: "",
        vin: "",
        licencePlate: "",
        carModel: {
            carModelId: -1,
            brand: "",
            model: "",
            motor: ""
        }
    },
    carModel: {},
    carsAvailable: []
});