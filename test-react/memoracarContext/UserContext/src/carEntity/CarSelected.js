import React from 'react'
import { useContext } from 'react';

import { CarEntityContext } from "../store/CarEntityProvider";

function CarSelected({}) {
    const carEntity = useContext(CarEntityContext);
    const carSelected = carEntity.carSelected;

    return <p> Car selected | id {carEntity.carSelected.carEntityId} / {carEntity.carSelected.mileage} km / {carEntity.carSelected.licencePlate} <br/>
            Car model id: {carEntity.carSelected.carModel.carModelId} : {carEntity.carSelected.carModel.brand} {carSelected.carModel.model}
            </p>
}

export default CarSelected