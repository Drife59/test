import React, { Component } from 'react';
import './App.css';


import UserHome from './user/Home';


class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        
        return (
            <div className="App" >
                <UserHome />
            </div>
        );
    }
}

export default App;
