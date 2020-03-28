import React, { useState, useEffect } from 'react'

import { ALLFAMILY } from "../const";

function AddRepair({allRepair, addRepairDone}) {
    const [repairId, setRepair] = useState(-1);
    const [family, setFamily] = useState("all");
    const [date, setDate] = useState("10/10/1989");
    const [mileage, setMileage] = useState("100000");

    // We set to set the defaut repairId as the first one.
    // If we don't do that and user don't touch the list of repair, 
    // the repairId will still be -1
    useEffect(() => {
        // For the first rendering, the allRepair could be not defined
        if(allRepair[0] !== undefined){
            setRepair(allRepair[0].repairId);
        }
    });

    const allFamily = ["all"].concat(ALLFAMILY);

    const listFamily = allFamily.map((family) =>
            <option key={family} value={family}>
                {family}
            </option>
        );

    const listRepair = allRepair.filter(repair => repair.mainCategory === family || family === "all")
            .map((repair) =>
                <option key={repair.repairId} value={repair.repairId}>
                    {repair.repairFixedId} {repair.mainCategory} {repair.description}
                </option>
        );

    const handleSubmit = function(){
        console.info("Repairid: " + repairId);
        let data={
            repairId: repairId.toString(),
            reparationDate: date,
            reparationMileage: parseInt(mileage)
        }
        addRepairDone(data);
    }

    return <p>
            <label htmlFor="repair-select">Choisissez une réparation:</label>

            <select name="family" id="family-select" onChange={ (e) => setFamily(e.target.value) } >
                {listFamily}
            </select>

            <select name="repairs" id="repair-select" onChange={ (e) => setRepair(e.target.value)} >
                {listRepair}
            </select>
            <br />
            id selected: {repairId}
            <br />
            family selected: {family}
            <br />

            <label htmlFor="date-select">Date de réparation:</label>
            <input id="date-select" type="text" onChange={ (e) => setDate(e.target.value)} value={date}/>

            <label htmlFor="km-select">Km de réparation:</label>
            <input id="date-select" type="text" onChange={ (e) => setMileage(e.target.value)} value={mileage}/>
            <br />
            <button onClick={handleSubmit}> Ajouter </button>
            </p>

}

export default AddRepair