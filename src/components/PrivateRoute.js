import { Redirect, Route } from "react-router-dom";
import React from "react";

export default function PrivateRoute(props){

    const user = null;
    if(!user) return <Redirect to="/" />

    return(
        <Route {... props}/>
    ) 
    
};
