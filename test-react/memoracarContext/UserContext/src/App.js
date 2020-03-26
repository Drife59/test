import React, { Component } from 'react';
import './App.css';

import { UserContext } from "./store/UserProvider";
import { CarEntityContext } from "./store/CarEntityProvider";


import UserHome from './user/Home';
import CarEntityHome from './carEntity/Home';


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

        this.setCarEntity = (carSelected, carsAvailable) => {
            this.setState({
                carEntity: {
                    carSelected: carSelected,
                    carsAvailable: carsAvailable,
                }
            })
        }

        this.state = {
            userId: -1,
            token: "NO-TOKEN",
            email: "NO-EMAIL",
            role: "NO-ROLE",
            setUser: this.setUser,
            carEntity: {
                carSelected: {
                    carModel: {}
                },
                carsAvailable: [],
            },  
            setCarEntity: this.setCarEntity
        };
    }

    render() {
        
        return (
            <div className="App" >
                <UserContext.Provider value={this.state}>
                    <UserHome/>
                    <CarEntityContext.Provider value={{
                            carSelected: this.state.carEntity.carSelected,
                            carsAvailable: this.state.carEntity.carsAvailable
                        }} >
                        <CarEntityHome/>
                    </CarEntityContext.Provider>
                </UserContext.Provider>
            </div>
        );
    }
}

// define UserContext for user, to be able to access Value
App.contextType = UserContext; 

export default App;