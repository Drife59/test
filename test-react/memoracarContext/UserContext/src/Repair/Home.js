import React, { Component } from 'react';

import { UserContext } from "../store/UserProvider";

import RepairApi from "./RepairApi";
import AddRepair from './addRepair';

import { NOTOKEN } from '../const';

class RepairHome extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            showRepairHome: true,
            repairs: []
        }

        this.toggleUserDisplay = this.toggleUserDisplay.bind(this);
        this.setRepair = this.setRepair.bind(this);
    }

    //Set all the available repairs in state
    setRepair(repairs){
        console.info("Setting all repair : " + repairs.length);
        this.setState({
            repairs: repairs
        })
    }

    toggleUserDisplay(){
        this.setState({
            showRepairHome: !this.state.showRepairHome
        });
    }

    // If a token was provided, we need to try to load all the repair if it is not already in app
    componentDidUpdate(){
        //The list of repair has not been initialised yet, need to load it
        if(this.state.repairs.length === 0){
            //console.info("repair in state is empty");
            //Load repairs from back-end when building for the first time object
            let userContext = this.context;
            if(userContext.token !== NOTOKEN){
                console.info("[RepairHome] / [componentDidUpdate]: loading all repair with token " + userContext.token);
                RepairApi.getRepairs(userContext.token, this.setRepair)
            }
        }
    }

    render() {
        return (
            <div id="homeRepair" >
                    <h1 onClick={this.toggleUserDisplay}> Repair section </h1>
                    <div style={{display: this.state.showRepairHome ? 'block' : 'none' }} >
                        <AddRepair allRepair={this.state.repairs}/>
                    </div>    
            </div>
        );
    }
}

RepairHome.contextType = UserContext; 

export default RepairHome;