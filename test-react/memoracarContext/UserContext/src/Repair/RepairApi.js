
/*
Date: 27/03/2020
Author: Benjamin GRASSART

Repair.js

Define as static object / function the API entry point needed to manager Repair in system.
All API file need to be agnostic from token, userId and others parameters.
These parameters must be provided by stateful components. 
*/

const axios = require('axios');

//Define endpoint

// This will be in conf later
const endpointBack = "https://localhost:5001/";

const getAllRepairAPI = "repairs";
const addRepairDoneAPI = "repairDone/user/{userId}/carEntity/{carEntityId}"

var Repair = {

    // Get all repairs available in the system
    getRepairs(token, callbackSetRepair){
        var finalApi = endpointBack + getAllRepairAPI;
        console.debug("[Repair]/[getRepairs] Api: " + finalApi);

        const finalToken = "Bearer " + token;

        axios({
            method: 'get',
            url: finalApi,
            headers: { 'Authorization': finalToken },
        })
            .then(function (response) {
                console.log("[Repair] / [getRepairs] loaded all repair (" + response.data.length + ") from back-end.");
                callbackSetRepair(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    addRepairDone(token, userId, carEntityId, data){
        var finalApi = endpointBack + addRepairDoneAPI;
        finalApi = finalApi.replace("{userId}", userId);
        finalApi = finalApi.replace("{carEntityId}", carEntityId);

        console.debug("[Repair]/[addRepairDone] Api: " + finalApi);

        const finalToken = "Bearer " + token;

        axios({
            method: 'post',
            url: finalApi,
            headers: { 'Authorization': finalToken },
            data: data
        })
            .then(function (response) {
                console.log("[Repair] / [addRepairDone] Add repair done successfull.");
                //callbackSetRepair(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }


};

export default Repair;