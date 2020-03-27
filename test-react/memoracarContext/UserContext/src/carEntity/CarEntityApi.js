
/*
Date: 25/03/2020
Author: Benjamin GRASSART

CarEntityApi.js

Define as static object / function the API entry point needed to manager User.
All API file need to be agnostic from token, userId and others parameters.
These parameters must be provided by stateful components. 
*/

const axios = require('axios');

//Define endpoint

// This will be in conf later
const endpointBack = "https://localhost:5001/";

//const getSingleCarAPI = "user/{userId}/carEntity/{carEntityId}";
const getAllCarsAPI = "user/{userId}/carEntitys";

var CarEntityApi = {

    // Get all car entity and set the first one as Car selected
    getCarEntitys(token, userId, callbackSetCarEntity){
        var finalApi = endpointBack + getAllCarsAPI;
        finalApi = finalApi.replace("{userId}", userId);
        console.debug("[CarEntityApi]/[getCarEntitys] Api: " + finalApi);

        const finalToken = "Bearer " + token;

        axios({
            method: 'get',
            url: finalApi,
            headers: { 'Authorization': finalToken },
        })
            .then(function (response) {
                let carSelected = response.data[0];
                let carAvailable = response.data;
                callbackSetCarEntity(carSelected, carAvailable);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
};

export default CarEntityApi;