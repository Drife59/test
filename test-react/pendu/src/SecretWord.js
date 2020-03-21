import React from 'react'
import PropTypes from 'prop-types'

import './SecretWord.css'


const SecretWord = ({ wordToDisplay }) => (
    <div id="secretWord">
        Devine le mot: 
        {/* Fetch each letter, display it if it has been found */}
        {
        wordToDisplay.map(( letter, index ) => (
            letter === '*' ? 
                <span className="hidden_letter" key={index}    > _ </span> : 
                <span className="displayed_letter" key={index} > {letter} </span>
        ))
        }
    </div>
)

SecretWord.propTypes = {
    wordToDisplay: PropTypes.array.isRequired,
}

SecretWord.defaultProps = {
    wordToDisplay: "BENJAMIN",
  }


export default SecretWord
