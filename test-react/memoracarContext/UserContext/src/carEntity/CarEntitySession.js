/*
Date: 26/03/2020
Author: Benjamin GRASSART

CarEntitySession.js

Define as static object / function all API needed to manage local storage session for cars.
*/

//Ensure the string used for carEntity Session is always the same 
const CARENTITYSESSION = "carEntitySession";

var CarEntitySession = {
    //Save the current CarEntity session in Local storage
    saveSession: function (carEntity) {
        console.debug("[CarEntitySession]/[saveSession] Saving carEntity: " + JSON.stringify(carEntity, null, 4));

        //There is always one key in carSelected object, the model key.
        if(Object.keys(carEntity["carSelected"]).length < 2){
            console.warn("[CarEntitySession]/[saveSession] No car in app, don't save session.");
        }

        // Clear old data for sure
        localStorage.removeItem(CARENTITYSESSION);
        // Save in local storage as String
        localStorage.setItem(CARENTITYSESSION, JSON.stringify(carEntity));
    },

    //Load carEntity session from local storage
    loadSession: function (setCarEntityCallback) {
        if (!CarEntitySession.isCarEntityInSession()) {
            console.warn("[CarEntitySession]/[loadSession] No session available, cannot load carEntity session");
            return false;
        }

        let carEntitySession = JSON.parse(localStorage.getItem(CARENTITYSESSION));
        console.debug("[CarEntitySession]/[loadSession] Loading carEntity: " + JSON.stringify(carEntitySession, null, 4));
        setCarEntityCallback(carEntitySession["carSelected"], carEntitySession["carsAvailable"], true);
        return true;
    },

    clearSession: function () {
        console.debug("[CarEntitySession]/[clearSession] Clear session carEntity");
        // Clear old data for sure
        localStorage.removeItem(CARENTITYSESSION);
    },

    isCarEntityInSession: function(){
        return localStorage.getItem(CARENTITYSESSION) !== null;
    }
}

export default CarEntitySession;
