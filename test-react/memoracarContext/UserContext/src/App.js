import React, { Component } from 'react';
import './App.css';


import { UserContext } from "./store/UserProvider";
import UserHome from './user/Home';


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
                <UserHome />
            </div>
            }
            </UserContext.Consumer>
        );
    }
}

App.contextType = UserContext; 

export default App;
