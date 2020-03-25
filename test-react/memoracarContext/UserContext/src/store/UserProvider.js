/*
Date: 22/03/2020
Author: Benjamin GRASSART

UserProvider.js

UserContext is used to retain and share the user information.
*/


import { createContext } from "react";


export const UserContext = createContext({
    userId: -1,
    email: "",
    token: "",
    role: "User",
    setUser: () => { console.warn("[UserProvider]/[setUser]: Function not initialised !")}
});
