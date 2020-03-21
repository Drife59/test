import React, { Component } from 'react';
import './App.css';

import TentativeCount from './TentativeCount';
import SecretWord from './SecretWord';
import Keyboard from './Keyboard';
import Words from './Dict';


class App extends Component {
    constructor(props) {
        super(props);

        //Initiate word picking
        let hiddenWord = this.getRandomWord();
        let hiddenTab = [];

        hiddenWord.split("").map((letter) => (
            hiddenTab.push("*")
        ));

        this.state = {
            tentativeCount: 0,
            mistakeCount: 0,
            wordToGuess: hiddenWord,
            currentWord: hiddenTab,
            wrongLetters: [],
            hasWon: false,
        }

        //Bind manually all needed method
        this.tryLetter = this.tryLetter.bind(this);
        this.newGame = this.newGame.bind(this);
        this.getLetterStatusClass = this.getLetterStatusClass.bind(this);
    }

    //Get a random word from the list and return it
    getRandomWord(){
        var index = Math.round(Math.random() * (Words.length-1));
        console.info("Chose word: " + Words[index]);
        return Words[index];
    }


    //Algo when a letter is tried
    tryLetter(letterTried){
        let newTentativeCount = this.state.tentativeCount + 1;

        //The letter is in the secret word :) !
        if(this.state.wordToGuess.indexOf(letterTried) !== -1){
            var newCurrentWord = this.state.currentWord;
            for(let i=0 ; i<this.state.wordToGuess.length ; i++){
                if(this.state.wordToGuess[i] === letterTried){
                    newCurrentWord[i] = letterTried;
                }
            }
            this.setState({ currentWord: newCurrentWord });

            if(newCurrentWord.join("") === this.state.wordToGuess){
                this.setState({hasWon: true});
            }
        }
        else{
            let newMistakeCount = this.state.mistakeCount + 1;
            let newWrongLetter = this.state.wrongLetters;
            newWrongLetter.push(letterTried);
            this.setState({mistakeCount: newMistakeCount, wrongLetters:newWrongLetter});
        }
        this.setState({tentativeCount: newTentativeCount});
    }

    //Return the ccs class that shoud be applied to current letter 
    getLetterStatusClass(letter){

        console.info("The current wrong letter are: " + this.state.wrongLetters);

        //this letter has already been tried and is not in the word
        if(this.state.wrongLetters.includes(letter)){
            console.info("Bad letter");
            return "wrongLetter";
        }
        //this letter is in the word and has already been found
        else if(this.state.currentWord.includes(letter)){
            console.info("good letter");

            return "goodLetter";
        }
        return "notTriedLetter";
    }

    //Pick up a new word, reset all stat and restart game
    newGame(){
        let newHiddenWord = this.getRandomWord();
        let newHiddenTab = [];
        newHiddenWord.split("").map((letter) => (
            newHiddenTab.push("*")
        ));

        this.setState({
            tentativeCount: 0,
            mistakeCount: 0,
            wordToGuess: newHiddenWord,
            currentWord: newHiddenTab,
            wrongLetters: [],
            hasWon: false
        })
    }

    render(){
        return(
        <div className = "App" >
            <h1> Bienvenu dans le jeu du pendu ! </h1>
            <TentativeCount tentativeCount={this.state.tentativeCount} mistakeCount={this.state.mistakeCount} />
            <SecretWord wordToDisplay={this.state.currentWord} />
            <Keyboard tryLetter={this.tryLetter} getLetterStatusClass={this.getLetterStatusClass} />

            {this.state.hasWon && <p id="endingGame"> Un vrai génie :) <button onClick={this.newGame}> Rejouer </button> </p> }
            {this.state.hasWon && <p><em>(Ouai, j'en ai rien à foutre du design du bouton </em> 
                <span role="img" className="bigLetter"> 😂 </span> )</p>}
        </div>
        );
    }
}

export default App;
