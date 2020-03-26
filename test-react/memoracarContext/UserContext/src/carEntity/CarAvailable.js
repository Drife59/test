import React from 'react'
import { useContext } from 'react';

import { CarEntityContext } from "../store/CarEntityProvider";

function CarAvailable({}) {
    const carsAvailable  = useContext(CarEntityContext).carsAvailable;

    console.info("carsAvailable: " + carsAvailable);

    
    const listCars = carsAvailable.map((car) =>
            <option key={car.carEntityId}>
                {car.carModel.model} {car.carModel.brand} {car.carModel.motor}
            </option>
        );
    
    return <p>
            <label htmlFor="car-select">Choisissez une voiture:</label>

            <select name="cars" id="car-select">
                {listCars}
            </select>
            </p>
}

export default CarAvailable