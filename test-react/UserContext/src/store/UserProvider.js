/*
Date: 22/03/2020
Author: Benjamin GRASSART

UserProvider.js

UserContext is used to retain the user information and to do the API call.
*/



import React, { createContext, Component } from "react";

const axios = require('axios');


//Define endpoint

// This will be in conf later
const endpointBack = "https://localhost:5001";
const authenticateApi = "/user/authenticate";
const updatePasswordApi = "/user/password/userId/";

//Ensure the string used for user Session is always the same 
const USERSESSION = "userSession";

export const UserContext = createContext({
    userId: -1,
    email: "",
    token: "",
    role: "User",
    authenticate: () => {},
    updatePassword: () => {},
    getDataUser: () => {},
    saveSession: () => {},
    clearSession: () => {},
    isUserLoggedIn: () => {}
});

class UserProvider extends Component {

    constructor(props) {
        super(props);

        // Bind manually all needed method
        // This need to be done BEFORE this.state init
        this.authenticate = this.authenticate.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.getDataUser = this.getDataUser.bind(this);
        this.loadSession = this.loadSession.bind(this);
        this.saveSession = this.saveSession.bind(this);
        this.clearSession = this.clearSession.bind(this);
        this.isUserLoggedIn = this.isUserLoggedIn.bind(this);
        this.isUserLoadedInApp = this.isUserLoadedInApp.bind(this);
        this.isUserInSession = this.isUserInSession.bind(this);

        this.state = {
            userId: -1,
            email: "",
            token: "",
            role: "User",
            authenticate: this.authenticate,
            updatePassword: this.updatePassword,
            getDataUser: this.getDataUser,
            loadSession: this.loadSession,
            saveSession: this.saveSession,
            clearSession: this.clearSession,
            isUserLoggedIn: this.isUserLoggedIn,
            isUserLoadedInApp: this.isUserLoadedInApp,
            isUserInSession: this.isUserInSession
        }
    }

    // Get the current data as JSON
    // With Context, we need to have the function declared in the state... But sometimes 
    // we just want the user data. Filter state and return only user data
    getDataUser(){
        return {
            userId: this.state.userId,
            email: this.state.email,
            token: this.state.token,
            role: this.state.role
        }
    }

    //Save the current User session in Local storage
    saveSession(sessionData){
        //let dataUser = this.getDataUser();
        
        let dataToSave = {
            userId: sessionData.id,
            email: sessionData.email,
            token: sessionData.token,
            role: sessionData.role
        }
        console.log("Saving User session: " + JSON.stringify(dataToSave, null, 4));

        // Clear old data for sure
        localStorage.removeItem(USERSESSION);
        // Save in local storage as String
        localStorage.setItem(USERSESSION, JSON.stringify(dataToSave));

        // Save state and re-render properly all associated components
        this.setState(dataToSave);      
    }

    // Load the user session from local storage
    loadSession(){
        if( !this.isUserLoggedIn()){
            console.warn("No session was saved, cannot load user session");
            return false;
        }

        let userSession = JSON.parse(localStorage.getItem(USERSESSION));
        this.setState({
            userId: userSession.userId,
            email: userSession.email,
            token: userSession.token,
            role: userSession.role
        })
        return true;
    }

    clearSession(){
        console.log("Clear session user");
        // Clear old data for sure
        localStorage.removeItem(USERSESSION);

        // Init state so change is propagated and component are re-rendered
        this.setState({
            userId: -1,
            email: "",
            token: "",
            role: "User"
        })
    }

    isUserLoggedIn(){
        // If a user in in RAM or in session, we are logged in
        return this.isUserLoadedInApp() || this.isUserInSession() ;
    }

    isUserLoadedInApp(){
        return this.state.userId !== -1;
    }

    isUserInSession(){
        return localStorage.getItem(USERSESSION) !== null;
    }

    // Authenticate a User against back-end
    authenticate(email, password)  {
        const finalApi = endpointBack + authenticateApi;
        console.log("Api: " + finalApi);
        console.log("trying to authenticate with " + email + " / " + password);

        // Need to keep this because this will be override in Axios call
        var trueThis = this;

        axios.post(finalApi, {
            email: email,
            password: password
        })
        .then(function (response) {

            /*WARNING: we mustn't set the state here.
            If we do that, the isUserInSession will return a false result,
            as the session has not been set and the components will re-render
            before the session was set.
            Need to do the setState (and launch the rendering) AFTER
            the session was saved.
            */
           
            trueThis.saveSession(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    updatePassword(newPassword) {
        var finalApi = endpointBack + updatePasswordApi + newPassword;
        finalApi = finalApi.replace("userId", this.state.userId);
        console.log("Api: " + finalApi);
        console.log("trying update password " + newPassword);

        const finalToken = "Bearer " + this.state.token;

        axios({
            method: 'post',
            url: finalApi,
            headers: {'Authorization': finalToken},
          })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            /**
             * la propriété value est très importante ici, elle rend
             * le contenu du state disponible aux `Consumers` de l'application
             */
            <UserContext.Provider value={this.state} >
                {this.props.children}
            </UserContext.Provider>
        );
    }
}

export default UserProvider;