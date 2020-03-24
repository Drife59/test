import React, { Component } from 'react';
import './App.css';

import FormAuthent from "./FormAuthent";

import { UserContext } from "./store/UserProvider";
import UpdatePassword from './UpdatePassword';
import LoadSession from './LoadSession';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {userLoggedIn: false};

        this.updateUserLoggedIn = this.updateUserLoggedIn.bind(this);

    }

    componentDidMount(){
        let value = this.context;

        this.setState({
            userLoggedIn: value.isUserLoggedIn()
        });
    }

    updateUserLoggedIn(status){
        this.setState({
            userLoggedIn: status
        })
    }

    render() {
        
        return (
            <UserContext.Consumer>
            {value => 
            <div className="App" >
                <h1> Bienvenu dans le programme de test user context </h1>

                <table >
                    <tbody>
                    <tr><td>User id:</td><td>{value.userid}</td></tr>
                    <tr><td>User email:</td><td>{value.email}</td></tr>
                    <tr><td>User token:</td><td>{value.token}</td></tr>
                    <tr><td>User role:</td><td>{value.role}</td></tr>
                    </tbody>
                </table>

                <FormAuthent updateUserLoggedIn={this.updateUserLoggedIn}/>
                <UpdatePassword/>
                <LoadSession userLoggedIn={this.state.userLoggedIn} updateUserLoggedIn={this.updateUserLoggedIn}/>
            </div>
            }
            </UserContext.Consumer>
        );
    }
}

App.contextType = UserContext; 

export default App;
