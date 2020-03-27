import React, { Component } from 'react';
import './App.css';

import { UserContext } from "./store/UserProvider";
import { CarEntityContext } from "./store/CarEntityProvider";


import UserHome from './user/Home';
import CarEntityHome from './carEntity/Home';


import UserSession from './user/UserSession';
import CarEntitySession from './carEntity/CarEntitySession';
import RepairHome from './Repair/Home';

import * as CONST from './const';


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

            //WARNING: we MUST init the carEntity car, with embedded carModel prop
            // If not, render will fail because it will occur  when the carEntity var is
            // not loaded from API, and we will try to access to carEntity.carSelected.carModel which does not exists
            this.setState({
                userId: userId,
                token: token,
                email: email,
                role: role,
                carEntity: {
                    carSelected: {
                        carModel: {}
                    },
                    carsAvailable: []
                }
            })
        }

        // Set all car available for user in system
        this.setCarEntity = (carSelected, carsAvailable, skipSession) => {

            console.info("[App] / [setCarEntity] : " + JSON.stringify(carSelected, null, 4));
            this.setState({
                carEntity: {
                    carSelected: carSelected,
                    carsAvailable: carsAvailable,
                }
            },
            () => {
                // default, save session
                if(!skipSession){
                    CarEntitySession.saveSession(this.state.carEntity);
                }
            });  
        }

        // Select the car with carEntity id and set it in state which will update Context
        this.selectCar = (event) => {
            const carSelectId = parseInt(event.target.value);

            let carSelected = this.state.carEntity.carsAvailable.filter(function(car) {
                return car["carEntityId"] === carSelectId;
            });

            //Only the matching result is now present in list, extract it
            carSelected = carSelected[0];
              
            let newCarEntity = this.state.carEntity;
            newCarEntity["carSelected"] = carSelected;
            
            this.setState({
                carEntity: newCarEntity
            });
        }

        this.state = {
            userId: CONST.NOUSER,
            token: CONST.NOTOKEN,
            email: CONST.NOEMAIL,
            role: CONST.NOROLE,
            setUser: this.setUser,
            carEntity: {
                carSelected: {
                    carModel: {}
                },
                carsAvailable: [],
            },  
            setCarEntity: this.setCarEntity,
            selectCar: this.selectCar
        };
    }

    render() {
        
        return (
            <div className="App" >
                <UserContext.Provider value={this.state}>
                    <UserHome/>
                    <CarEntityContext.Provider value={{
                            carSelected: this.state.carEntity.carSelected,
                            carsAvailable: this.state.carEntity.carsAvailable,
                            selectCar: this.state.selectCar
                        }} >
                        <CarEntityHome/>
                    </CarEntityContext.Provider>
                    <RepairHome/>
                </UserContext.Provider>
            </div>
        );
    }
}

// define UserContext for user, to be able to access Value
App.contextType = UserContext; 

export default App;