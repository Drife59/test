import React, { useState } from 'react'
//import { useContext } from 'react';

import { ALLFAMILY } from "../const";

function AddRepair({allRepair}) {
    const [repairId, setRepair] = useState();
    const [family, setFamily] = useState("all");
    const [date, setDate] = useState("01/01/2020");
    const [mileage, setMileage] = useState("151000");

    const allFamily = ["all"].concat(ALLFAMILY);

    const listFamily = allFamily.map((family) =>
            <option key={family} value={family}>
                {family}
            </option>
        );

    console.info("All repair: " + allRepair.length);
    let repairFiltered = allRepair.filter(repair => repair.mainCategory === family || family === "all");
    console.log("repair filtered: " + JSON.stringify(repairFiltered, null, 4));

    const listRepair = allRepair.filter(repair => repair.mainCategory === family || family === "all")
            .map((repair) =>
                <option key={repair.repairId} value={repair.repairId}>
                    {repair.repairFixedId} {repair.mainCategory} {repair.description}
                </option>
        );

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
            </p>

}

export default AddRepair