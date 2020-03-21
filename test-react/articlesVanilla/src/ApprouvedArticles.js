import React from 'react'
import PropTypes from 'prop-types'

import Article from './Article.js'

//import './ApprovedArticles.css'


const ApprovedArticles = ({ articles, deleteArticle }) => (
    <div id="ApprovedArticles">
        <h2> Les articles Approuvés ( ou non ;) )</h2>
        <div>
        <ul>
            {
            articles.map(( article, index ) => (
                article.approved === true ? 
                <li key={article.id}> <Article article={article} deleteArticle={deleteArticle} status=" [ Approved ] " /></li> :
                <li key={article.id}> <Article article={article} deleteArticle={deleteArticle} status=" [ Rejected ] " /></li>
            ))
            }
        </ul>
        </div>
    </div>
)

ApprovedArticles.propTypes = {
    articles: PropTypes.array.isRequired,
    deleteArticle: PropTypes.func.isRequired
}

export default ApprovedArticles
