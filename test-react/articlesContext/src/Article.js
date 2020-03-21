import React from 'react'

import { ArticleContext } from "./store/ArticleProvider";


const Article = ({ article, status }) => (
    <ArticleContext.Consumer>
    {value => 
    <span className="article">
        Article: {article.id}: {article.text} {!!status && status } 
        <button onClick={() => value.deleteArticle(article.id)}> X </button>
    </span>
    }
    </ArticleContext.Consumer>
    
)

export default Article

