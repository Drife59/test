import React from 'react'

import { UserContext } from "../store/UserProvider";

import UserSession from './UserSession';


class LoadSession extends React.Component {
    constructor(props) {
        super(props);
        this.state = {sessionAvailable: UserSession.isUserInSession()};
        this.handleSessionLoad = this.handleSessionLoad.bind(this);
        this.handleSessionClear = this.handleSessionClear.bind(this);
        this.handlecheckSession = this.handlecheckSession.bind(this);
    }

    //will call parent App to add article in global main state
    handleSessionLoad() {
        //Get value exposed by Context
        let value = this.context;

        // Load the session from local storage
        UserSession.loadSession(value.setUser);
    }

    //will call parent App to add article in global main state
    handleSessionClear() {
        //We modify the state only the re-render the component when clicking on button clear
        this.setState({
            sessionAvailable: false
        })
        UserSession.clearSession();
    }

    handlecheckSession(){
        this.forceUpdate();
    }

    render() {
        let value = this.context;

        return (
            <div id="authent">
                <h2> Chargement de la session utilisateur</h2>
                
                <p> Présence d'une session à charger: {
                    UserSession.isUserInSession() && <span>OUI</span>
                }    
                {
                    !UserSession.isUserInSession() && <span>NON</span>
                }
                </p>
                <div> <button onClick={this.handlecheckSession}> Check session </button> </div>
                <p> Présence de l'utilisateur chargé dans l'app: {
                    value.userId !== -1 && <span>OUI</span>
                }    
                {
                    value.userId === -1 && <span>NON</span>
                }
                </p>
                <button onClick={this.handleSessionLoad} > Charger la session </button>
                <button onClick={this.handleSessionClear} > Supprimer la session </button>

            </div>
        )
    }
}

// define UserContext for user, to be able to access Value
LoadSession.contextType = UserContext; 

export default LoadSession