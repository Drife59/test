import React from 'react'

import { UserContext } from "../store/UserProvider";

import UserApi from "./UserApi";


class FormAuthent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateEmail = this.updateEmail.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
    }

    //will call parent App to add article in global main state
    handleSubmit() {
        //Get value exposed by Context
        let value = this.context;

        if (this.state.value !== undefined) {
            console.info('Try to authent with ' + this.state.email + " / " + this.state.password);
        }

        // Call authenticate from dedicated UserApi Object
        // Add the setUser callback from App.js, to inform main app when the user is set and update main Context
        UserApi.authenticate(this.state.email, this.state.password, value.setUser, value.setCarEntity);
    }

    //In order to retain the current value in field text 
    updateEmail(evt) {
        this.setState({ email: evt.target.value });
    }

    updatePassword(evt) {
        this.setState({ password: evt.target.value });
    }

    render() {
        return (
            <div id="authent">
                <h2> Authentifiez vous</h2>
                <label htmlFor="email">Email:</label>
                <input id="email" type="text" onChange={this.updateEmail}/> 
                
                <label htmlFor="password">Password:</label>
                <input id="password" type="text" onChange={this.updatePassword}/> 
                
                <button onClick={this.handleSubmit} > Valider </button>
            </div>
        )
    }
}

// define UserContext for user, to be able to access Value
FormAuthent.contextType = UserContext; 

export default FormAuthent