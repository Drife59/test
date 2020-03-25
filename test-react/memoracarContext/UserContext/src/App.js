import React, { Component } from 'react';
import './App.css';

//import CarEntityProvider, { CarEntityContext } from "./store/CarEntityProvider";
import { UserContext } from "./store/UserProvider";

import UserHome from './user/Home';

import UserSession from './user/UserSession';


class App extends Component {
    constructor(props) {
        super(props);

        this.setUser = (userId, token, email, role) => {
            console.info("[App] Set user: " + userId + " / " + token);

            // We save the user in session (local storage)
            // This need to be done before setState, because
            // when LoadSession component re-render, we want the session to exists
            // and the indicator to say "YES"
            UserSession.saveSession(userId, token, email, role);

            this.setState({
                userId: userId,
                token: token,
                email: email,
                role: role
            })
        }

        this.state = {
            userId: -1,
            token: "NO-TOKEN",
            email: "NO-EMAIL",
            role: "NO-ROLE",
            setUser: this.setUser
        };
    }

    render() {
        
        return (
            <div className="App" >
                <UserContext.Provider value={this.state}>
                    <UserHome/>
                </UserContext.Provider>
            </div>
        );
    }
}

// define UserContext for user, to be able to access Value
App.contextType = UserContext; 

export default App;
