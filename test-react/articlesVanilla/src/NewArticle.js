import React from 'react'
import PropTypes from 'prop-types'


class NewArticle extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.submitArticle = this.submitArticle.bind(this);
        this.updateInput = this.updateInput.bind(this);
    }

    static propTypes = {
        addArticle: PropTypes.func.isRequired
    };

    //will call parent App to add article in global main state
    submitArticle() {
        if (this.state.value !== undefined) {
            console.info('Article going to be added: ' + this.state.value)
        }
        this.props.addArticle(this.state.value);
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

export default NewArticle