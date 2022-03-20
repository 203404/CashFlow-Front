import { Redirect, Route } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";


function PrivateRoute(props){

    
    if(localStorage.getItem('session')==="admin"){
        return(
            <Route {... props}/>
        ) 
    }
    return <Redirect to="/" />
    
    
};

export default PrivateRoute;
