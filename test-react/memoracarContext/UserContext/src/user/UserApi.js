
/*
Date: 25/03/2020
Author: Benjamin GRASSART

UserApi.js

Define as static object / function the API entry point needed to manager User.
All API file need to be agnostic from token, userId and others parameters.
These parameters must be provided by stateful components. 
*/
import CarEntityApi from "../carEntity/CarEntityApi";


const axios = require('axios');


//Define endpoint

// This will be in conf later
const endpointBack = "https://localhost:5001";
const authenticateApi = "/user/authenticate";
const updatePasswordApi = "/user/password/userId/";

var UserApi = {
    // Authenticate a User against back-end, getting token
    // This function accept a clallback, which is to set in main UserContext
    // the user returned by API
    authenticate: function (email, password, setUserCallback, setCarEntityCallback) {
        const finalApi = endpointBack + authenticateApi;
        console.log("[UserApi]/[authenticate] Api: " + finalApi);

        axios.post(finalApi, {
            email: email,
            password: password
        })
            .then(function (response) {
                setUserCallback(response.data.id, response.data.token, response.data.email, response.data.role);

                console.info("[FormAuthent] / [handleSubmit] After authent, try to load car: " + 
                response.data.id + " / " + response.data.token);
                // setCarEntity as a callback to set in Context the car entity
                CarEntityApi.getCarEntitys(response.data.token, response.data.id, setCarEntityCallback);
            })
            .catch(function (error) {
                console.log("[UserApi]/[authenticate] " + error);
            });
    },

    updatePassword: function (token, userId, newPassword) {
        var finalApi = endpointBack + updatePasswordApi + newPassword;
        finalApi = finalApi.replace("userId", userId);
        console.log("[UserApi]/[updatePassword] Api: " + finalApi);

        const finalToken = "Bearer " + token;

        axios({
            method: 'post',
            url: finalApi,
            headers: { 'Authorization': finalToken },
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
};

export default UserApi;