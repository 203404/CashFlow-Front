import { Redirect, Route } from "react-router-dom";
import React from "react";


function PrivateRoute(props){

    
    if(localStorage.getItem('session')==="admin"){
        return(
            <Route {... props}/>
        ) 
    }
    if(localStorage.getItem('session')==="conta"){
        
    }
    return <Redirect to="/" />
    
    
};

export default PrivateRoute;
