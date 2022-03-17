import { Redirect, Route } from "react-router-dom";
import React from "react";

export default function PrivateRoute(props){

    if(!localStorage.getItem("id")) return <Redirect to="/" />

    return(
        <Route {... props}/>
    ) 
    
};
