import React from 'react'

import Article from './Article.js'

import { ArticleContext } from "./store/ArticleProvider";

import './SubmittedArticles.css'


const SubmittedArticles = ({ }) => (

    //ArticleContext is used to provide the list of articles
    <ArticleContext.Consumer>
        {value => 
        <div id="submittedArticles">
            <h2> Les articles soumis</h2>
            <div>
            <ul>
                {
                value.articles.map(( article, index ) => (
                    <li key={article.id}> <Article article={article} /></li>
                ))
                }
            </ul>
            </div>
        </div>
        }
    </ArticleContext.Consumer>
)

export default SubmittedArticles
