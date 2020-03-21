import React from 'react'
import PropTypes from 'prop-types'

import './Keyboard.css'

const allLetter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const Keyboard = ({ tryLetter, getLetterStatusClass }) => (
    <div id="keyboard">
        {
        allLetter.split("").map(( letter, index ) => (
            <span className={`keyboard_letter  ${getLetterStatusClass(letter)}`} key={index} onClick={() => tryLetter(letter)}> {letter} </span> 
        ))
        }
    </div>
)


Keyboard.propTypes = {
    tryLetter: PropTypes.func.isRequired
}

export default Keyboard
