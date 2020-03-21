import React, { Component } from 'react';
import './App.css';

import TentativeCount from './TentativeCount';
import SecretWord from './SecretWord';
import Keyboard from './Keyboard';

import { PenduContext } from "./store/PenduProvider";

class App extends Component {
    

    render(){
        return(
        <PenduContext.Consumer>
        {value => 
        <div className = "App" >
            <h1> Bienvenu dans le jeu du pendu ! </h1>
            <TentativeCount />
            <SecretWord />
            <Keyboard />

            {value.hasWon && <p id="endingGame"> Un vrai génie :) <button onClick={value.newGame}> Rejouer </button> </p> }
            {value.hasWon && <p><em>(Ouai, j'en ai rien à foutre du design du bouton </em> 
                <span role="img" className="bigLetter"> 😂 </span> )</p>}
        </div>
        }
        </PenduContext.Consumer>
        );
    }
}

export default App;
