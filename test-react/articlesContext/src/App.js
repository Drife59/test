import React, { Component } from 'react';
import './App.css';

import SubmittedArticles from './SubmittedArticles'
import ApprouvedArticles from './ApprouvedArticles'
import NewArticle from './NewArticle'

import { ArticleContext } from "./store/ArticleProvider";


class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        
        return (
            <ArticleContext.Consumer>
            {value => 
            <div className="App" >
                <h1> Bienvenu dans cette liste d'articles </h1>
                <NewArticle />
                <SubmittedArticles  />
                <ApprouvedArticles  />

                { (value.articles.length > 4) && <p className="error"> Il y a déjà 5 articles, impossible d'en ajouter davantage</p> }
            </div>
            }
            </ArticleContext.Consumer>
        );
    }
}


export default App;
