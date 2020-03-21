import React from 'react'

import Article from './Article.js'

import { ArticleContext } from "./store/ArticleProvider";


const ApprovedArticles = ({ }) => (

    <ArticleContext.Consumer>
    {value => 
    <div id="ApprovedArticles">
        <h2> Les articles Approuvés ( ou non ;) )</h2>
        <div>
        <ul>
            {
            value.articles.map(( article, index ) => (
                article.approved === true ? 
                <li key={article.id}> <Article article={article} status=" [ Approved ] " /></li> :
                <li key={article.id}> <Article article={article} status=" [ Rejected ] " /></li>
            ))
            }
        </ul>
        </div>
    </div>
    }
    </ArticleContext.Consumer>

)

export default ApprovedArticles
