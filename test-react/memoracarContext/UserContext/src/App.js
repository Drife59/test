import React, { Component } from 'react';
import './App.css';

import { CarEntityContext } from "./store/CarEntityProvider";

import UserHome from './user/Home';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: -1,
            token: ""
        };

        this.setUser = this.setUser.bind(this);
    }

    setUser(userId, token){
        this.setState({
            userId: userId,
            token: token
        })

        let contextCarEntity = this.context;
        console.info("Set in App user: " + userId + " / " + token);

        contextCarEntity.setUser(userId, token);
    }


    render() {
        
        return (
            <div className="App" >
                <UserHome setUser={this.setUser}/>
            </div>
        );
    }
}

// define UserContext for user, to be able to access Value
App.contextType = CarEntityContext; 

export default App;
