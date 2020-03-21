import React from 'react'
import PropTypes from 'prop-types'

import { ArticleContext } from "./store/ArticleProvider";


class NewArticle extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.submitArticle = this.submitArticle.bind(this);
        this.updateInput = this.updateInput.bind(this);
    }

    //will call parent App to add article in global main state
    submitArticle() {
        //Get value exposed by Context
        let value = this.context;

        if (this.state.value !== undefined) {
            console.info('Article going to be added: ' + this.state.value)
        }
        // Call addArticle from Context
        value.addArticle(this.state.value);
    }

    //In order to retain the current value in field text 
    updateInput(evt) {
        this.setState({ value: evt.target.value });
    }

    render() {
        return (
            <div id="NewArticle">
                <h2> Ajout d'un article</h2>
                <input type="text" onChange={this.updateInput}/> 
                <button onClick={this.submitArticle} > Valider </button>
            </div>
        )
    }
}

// define ArticleContext for user, to be able to access Value
NewArticle.contextType = ArticleContext; 

export default NewArticle