import React from 'react'

import './SecretWord.css'

import { PenduContext } from "./store/PenduProvider";

const SecretWord = ({  }) => (
    <PenduContext.Consumer>
    {value => 
    <div id="secretWord">
        Devine le mot: 
        {/* Fetch each letter, display it if it has been found */}
        {
        value.currentWord.map(( letter, index ) => (
            letter === '*' ? 
                <span className="hidden_letter" key={index}    > _ </span> : 
                <span className="displayed_letter" key={index} > {letter} </span>
        ))
        }
    </div>
    }
    </PenduContext.Consumer>
)


export default SecretWord
