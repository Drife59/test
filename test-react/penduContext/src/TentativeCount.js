import React from 'react'

import { PenduContext } from "./store/PenduProvider";

const TentativeCount = ({ }) => (
    <PenduContext.Consumer>
        {value =>
            <div id="countSection">
                <div> Nombre de tentative(s): {value.tentativeCount} </div>
                <div > Nombre de connerie(s):  <span className="errorCount"> {value.mistakeCount} </span> </div>
            </div>
        }
    </PenduContext.Consumer>
)


export default TentativeCount
