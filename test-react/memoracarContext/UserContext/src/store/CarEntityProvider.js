/*
Date: 24/03/2020
Author: Benjamin GRASSART

CarEntityProvider.js    

CarEntityContext is used to retain the user information and to do the API call.
*/



import React, { createContext, Component } from "react";

const axios = require('axios');


//Define endpoint

// This will be in conf later
const endpointBack = "https://localhost:5001";

const getSingleCarAPI = "user/{userId}/carEntity/{carEntityId}";
const getAllCarsAPI = "user/{userId}/carEntitys";


//Ensure the string used for user Session is always the same 
//const USERSESSION = "userSession";


/*
The car entity model is like below: 

{
"carEntityId": 6,
  "mileage": 100000,
  "immatriculationDate": "2020-05-01T00:00:00",
  "vin": "VIN-cF95ew0cp0ZhxE=w",
  "licencePlate": "GR-999-RT"
  carModelId: 1
}

*/

export const CarEntityContext = createContext({
    userId:-1,
    token: "",
    carSelected: {},
    carsAvailable: [],
    setUser: () => {}
});

class CarEntityProvider extends Component {

    constructor(props) {
        super(props);

        // Bind manually all needed method
        // This need to be done BEFORE this.state init
        this.authenticate = this.authenticate.bind(this);
        this.setUser = this.setUser.bind(this);


        this.state = {
            userId: -1,
            token: "",
            carSelected: {},
            carsAvailable: [],
            authenticate: this.authenticate,
            setUser: this.setUser
        }
    }

    setUser(userId, token){
        this.setState({
            userId: userId,
            token: token
        })
        console.info("[CarEntityProvider] Set user: " + userId + " / " + token);
    }

    render() {
        return (
            /**
             * la propriété value est très importante ici, elle rend
             * le contenu du state disponible aux `Consumers` de l'application
             */
            <CarEntityContext.Provider value={this.state} >
                {this.props.children}
            </CarEntityContext.Provider>
        );
    }
}

export default CarEntityProvider;