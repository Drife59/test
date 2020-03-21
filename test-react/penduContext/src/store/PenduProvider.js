// store/PenduProvider.js
import React, { createContext, Component } from "react";

import Words from '../Dict';


/**
 * `createContext` contient 2 propriétés :
 * `Provider` et `Consumer`. Nous les rendons accessibles
 * via la constante `PenduContext` et on initialise une
 * propriété par défaut "name" qui sera une chaîne vide.
 * On exporte ce contexte afin qu'il soit exploitable par
 * d'autres composants par la suite via le `Consumer`
 */
export const PenduContext = createContext({
    tentativeCount: 0,
    mistakeCount: 0,
    wordToGuess: "",
    currentWord: [],
    wrongLetters: [],
    hasWon: false,
    getRandomWord: () => {},
    tryLetter: () => {},
    getLetterStatusClass: () => {},
    newGame: () => {}
});

/**
 * la classe PenduProvider fera office de... Provider (!)
 * en englobant son enfant direct
 * dans le composant éponyme. De cette façon, ses values
 * seront accessibles de manière globale via le `Consumer`
 */
class PenduProvider extends Component {

    constructor(props) {
        super(props);

        //Initiate word picking
        let hiddenWord = this.getRandomWord();
        let hiddenTab = [];

        hiddenWord.split("").map((letter) => (
            hiddenTab.push("*")
        ));

        //Bind manually all needed method
        this.tryLetter = this.tryLetter.bind(this);
        this.newGame = this.newGame.bind(this);
        this.getLetterStatusClass = this.getLetterStatusClass.bind(this);

        this.state = {
            tentativeCount: 0,
            mistakeCount: 0,
            wordToGuess: hiddenWord,
            currentWord: hiddenTab,
            wrongLetters: [],
            hasWon: false,
            getRandomWord: this.getRandomWord,
            tryLetter: this.tryLetter,
            getLetterStatusClass: this.getLetterStatusClass,
            newGame: this.newGame
        }
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

    render() {
        return (
            /**
             * la propriété value est très importante ici, elle rend
             * le contenu du state disponible aux `Consumers` de l'application
             */
            <PenduContext.Provider value={this.state} >
                {this.props.children}
            </PenduContext.Provider>
        );
    }
}

export default PenduProvider;