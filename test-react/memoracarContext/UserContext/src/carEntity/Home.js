import React, { Component } from 'react';

import { UserContext } from "../store/UserProvider";


class CarEntityHome extends Component {
    constructor(props) {
        super(props);
        this.state = {showCarEntityHome: true}

        this.toggleUserDisplay = this.toggleUserDisplay.bind(this);
    }

    toggleUserDisplay(){
        this.setState({
            showCarEntityHome: !this.state.showCarEntityHome
        });
    }

    render() {
        
        return (
            <UserContext.Consumer>
            {value => 
            <div id="homeUser" >
                    <h1 onClick={this.toggleUserDisplay}> user context section </h1>
                    <div style={{display: this.state.showCarEntityHome ? 'block' : 'none' }} >
                        <table >
                            <tbody>
                            <tr><td>User id:</td><td>{value.userId}</td></tr>
                            <tr><td>User email:</td><td>{value.email}</td></tr>
                            <tr><td>User token:</td><td>{value.token}</td></tr>
                            <tr><td>User role:</td><td>{value.role}</td></tr>
                            </tbody>
                        </table>
                    </div>
            </div>
            }
            </UserContext.Consumer>
        );
    }
}

CarEntityHome.contextType = UserContext; 

export default CarEntityHome;
