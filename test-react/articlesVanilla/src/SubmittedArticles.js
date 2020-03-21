import React from 'react'
import PropTypes from 'prop-types'

import Article from './Article.js'

import './SubmittedArticles.css'


const SubmittedArticles = ({ articles, deleteArticle }) => (
    <div id="submittedArticles">
        <h2> Les articles soumis</h2>
        <div>
        <ul>
            {
            articles.map(( article, index ) => (
                <li key={article.id}> <Article article={article} deleteArticle={deleteArticle} /></li>
            ))
            }
        </ul>
        </div>
    </div>
)

SubmittedArticles.propTypes = {
    articles: PropTypes.array.isRequired,
    deleteArticle: PropTypes.func.isRequired
}

export default SubmittedArticles
