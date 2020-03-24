import React, { Component } from 'react';

import { UserContext } from "../store/UserProvider";

import FormAuthent from "../user/FormAuthent";
import UpdatePassword from '../user/UpdatePassword';
import LoadSession from '../user/LoadSession';


class UserHome extends Component {
    constructor(props) {
        super(props);
        this.state = {showUserHome: true}

        this.toggleUserDisplay = this.toggleUserDisplay.bind(this);
    }

    toggleUserDisplay(){
        this.setState({
            showUserHome: !this.state.showUserHome
        });
    }

    render() {
        
        return (
            <UserContext.Consumer>
            {value => 
            <div id="homeUser" style={{display: this.state.showUserHome ? 'block' : 'none' }} >
                    <h1 onClick={this.toggleUserDisplay}> user context section </h1>

                    <table >
                        <tbody>
                        <tr><td>User id:</td><td>{value.userid}</td></tr>
                        <tr><td>User email:</td><td>{value.email}</td></tr>
                        <tr><td>User token:</td><td>{value.token}</td></tr>
                        <tr><td>User role:</td><td>{value.role}</td></tr>
                        </tbody>
                    </table>

                    <FormAuthent />
                    <UpdatePassword/>
                    <LoadSession />
            </div>
            }
            </UserContext.Consumer>
        );
    }
}

UserHome.contextType = UserContext; 

export default UserHome;
