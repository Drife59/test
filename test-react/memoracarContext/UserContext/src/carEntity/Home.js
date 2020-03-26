import React, { Component } from 'react';

import { UserContext } from "../store/UserProvider";

import CarSelected from "./CarSelected";
import CarAvailable from "./CarAvailable";

import CarEntitySession from "./CarEntitySession";


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

    UNSAFE_componentWillMount(){
        let value = this.context;
        CarEntitySession.loadSession(value.setCarEntity);
    }

    render() {
        
        return (
            <div id="homeCarEntity" >
                    <h1 onClick={this.toggleUserDisplay}> Car entity section </h1>
                    <div style={{display: this.state.showCarEntityHome ? 'block' : 'none' }} >
                        <CarSelected/>
                        <CarAvailable/>
                    </div>    
            </div>
        );
    }
}

CarEntityHome.contextType = UserContext; 

export default CarEntityHome;

/*
<CarEntityContext.Consumer>
                        {valueCE => 
                             (valueCE !== null && valueCE.carSelected !== null) &&
                            <p> Car selected | id {valueCE.carSelected.carEntityId} / {valueCE.carSelected.mileage} km <br/>
                                Car model id: {valueCE.carSelected.carModel.carModelId}
                            </p>
                        }
                    </CarEntityContext.Consumer>
                    */