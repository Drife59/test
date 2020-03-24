import React from 'react'

import { UserContext } from "../store/UserProvider";


class LoadSession extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleSessionLoad = this.handleSessionLoad.bind(this);
        this.handleSessionClear = this.handleSessionClear.bind(this);
    }

    //will call parent App to add article in global main state
    handleSessionLoad() {
        //Get value exposed by Context
        let value = this.context;

        // Load the session from local storage
        value.loadSession();
    }

    //will call parent App to add article in global main state
    handleSessionClear() {
        //Get value exposed by Context
        let value = this.context;

        // Load the session from local storage
        value.clearSession();
    }

    render() {
        let value = this.context;

        return (
            <div id="authent">
                <h2> Chargement de la session utilisateur</h2>
                
                <p> Présence d'une session à charger: {
                    value.isUserInSession() && <span>OUI</span>
                }    
                {
                    !value.isUserInSession() && <span>NON</span>
                }
                </p>
                <p> Présence de l'utilisateur chargé dans l'app: {
                    value.isUserLoadedInApp() && <span>OUI</span>
                }    
                {
                    !value.isUserLoadedInApp() && <span>NON</span>
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