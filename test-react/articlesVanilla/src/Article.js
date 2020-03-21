import React from 'react'
import PropTypes from 'prop-types'


const Article = ({ article, deleteArticle, status }) => (
    <span className="article">
        Article: {article.id}: {article.text} {!!status && status } 
        <button onClick={() => deleteArticle(article.id)}> X </button>
    </span>
    
)

Article.propTypes = {
    article: PropTypes.object.isRequired,
}

export default Article

