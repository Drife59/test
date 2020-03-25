import React from 'react'

import UserApi from "./UserApi";

import { UserContext } from "../store/UserProvider";


class UpdatePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {password: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
    }

    //will call parent App to add article in global main state
    handleSubmit() {
        //Get value exposed by Context
        let value = this.context;
        UserApi.updatePassword(value.token, value.userId, this.state.password);
    }

    updatePassword(evt) {
        this.setState({ password: evt.target.value });
    }

    render() {
        return (
            <div id="authent">
                <h2> MAJ Password</h2>
                
                <label htmlFor="password">Password:</label>
                <input id="password" type="text" onChange={this.updatePassword}/> 
                
                <button onClick={this.handleSubmit} > Valider </button>
            </div>
        )
    }
}

// define UserContext for user, to be able to access Value
UpdatePassword.contextType = UserContext; 

export default UpdatePassword