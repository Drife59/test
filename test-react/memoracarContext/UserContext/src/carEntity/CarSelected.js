import React from 'react'
import { useContext } from 'react';

import { CarEntityContext } from "../store/CarEntityProvider";

function CarSelected({}) {
    const carSelected = useContext(CarEntityContext).carSelected;

    return <p> Car selected | id {carSelected.carEntityId} / {carSelected.mileage} km / {carSelected.licencePlate} <br/>
            Car model id: {carSelected.carModel.carModelId} : {carSelected.carModel.brand} {carSelected.carModel.model}
            </p>
}

export default CarSelected