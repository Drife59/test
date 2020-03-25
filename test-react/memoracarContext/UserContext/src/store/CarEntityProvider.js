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

*/

export const CarEntityContext = createContext({
    userId:-1,
    token: "",
    carSelected: {},
    carsAvailable: [],
});