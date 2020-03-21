import React from 'react'

import './Keyboard.css'

import { PenduContext } from "./store/PenduProvider";

const allLetter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const Keyboard = ({  }) => (
    <PenduContext.Consumer>
    {value => 
    <div id="keyboard">
        {
        allLetter.split("").map(( letter, index ) => (
            <span className={`keyboard_letter  ${value.getLetterStatusClass(letter)}`} key={index} onClick={() => value.tryLetter(letter)}> {letter} </span> 
        ))
        }
    </div>
    }
    </PenduContext.Consumer>
)



export default Keyboard
