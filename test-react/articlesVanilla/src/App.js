import React, { Component } from 'react';
import './App.css';

import SubmittedArticles from './SubmittedArticles'
import ApprouvedArticles from './ApprouvedArticles'
import NewArticle from './NewArticle'


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            articles:
            [
                {
                    id: 1,
                    text: "Premier",
                    approved: true,
                    rejected: false
                }
            ],
            nb_articles: 1,
            display_error: false
        }

        //Bind manually all needed method
        this.addArticle = this.addArticle.bind(this);
        this.deleteArticle = this.deleteArticle.bind(this);
    }

    addArticle(text){
        console.info("Contenu de l'article à ajouter: " + text);

        if(this.state.nb_articles > 4){
            this.setState({display_error: true})
        }else{
            this.setState((prevState) => {
                return {
                    articles: [
                        ...prevState.articles,
                        {
                            id: prevState.articles.reduce((maxId, article) => Math.max(article.id, maxId), -1) + 1,
                            text: text,
                            approved: text.length < 10,
                            rejected: !(text.length < 10)
                        },
                    ],
                    nb_articles: prevState.nb_articles + 1,
                }
            })   
        }
    }

    deleteArticle(article_id){
        this.setState((prevState) => {
			return {
                articles: prevState.articles.filter((article) => article.id !== article_id),
                nb_articles: prevState.nb_articles - 1
			}
        })
        var true_this = this;
        setTimeout(function () {
            if(true_this.state.nb_articles < 5){
                true_this.setState({display_error: false})
            }
        }, 200);
        
    }

    render() {
        console.log(this.state);
        return (
            <div className="App" >
                <h1> Bienvenu dans cette liste d'articles </h1>
                <NewArticle addArticle={this.addArticle} />
                <SubmittedArticles articles={this.state.articles} deleteArticle={this.deleteArticle} />
                <ApprouvedArticles articles={this.state.articles} deleteArticle={this.deleteArticle} />

                {this.state.display_error && <p className="error"> Il y a déjà 5 articles, impossible d'en ajouter davantage</p> }
            </div>
        );
    }
}


export default App;
