
/*
Date: 25/03/2020
Author: Benjamin GRASSART

UserSession.js

Define as static object / function the API entry point needed to User session in browser.
*/

//Ensure the string used for user Session is always the same 
const USERSESSION = "userSession";

var UserSession = {
    //Save the current User session in Local storage
    saveSession: function (userId, token, email, role) {

        let dataToSave = {
            userId: userId,
            token: token,
            email: email,
            role: role
        };
        console.log("[UserSession]/[saveSession] Saving user: " + JSON.stringify(dataToSave, null, 4));

        // Clear old data for sure
        localStorage.removeItem(USERSESSION);
        // Save in local storage as String
        localStorage.setItem(USERSESSION, JSON.stringify(dataToSave));
    },

    //Load user session from local storage
    loadSession: function (setUserCallback) {
        if (!UserSession.isUserInSession()) {
            console.warn("[UserSession]/[loadSession] No session available, cannot load user session");
            return false;
        }

        let userSession = JSON.parse(localStorage.getItem(USERSESSION));
        console.log("[UserSession]/[loadSession] Loading user: " + JSON.stringify(userSession, null, 4));
        setUserCallback(userSession.userId, userSession.token, userSession.email, userSession.role);
        return true;
    },

    clearSession: function () {
        console.log("[UserSession]/[clearSession] Clear session user");
        // Clear old data for sure
        localStorage.removeItem(USERSESSION);
    },

    isUserInSession: function(){
        return localStorage.getItem(USERSESSION) !== null;
    }
}

export default UserSession;
