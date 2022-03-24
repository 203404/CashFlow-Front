import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
function Navbar() {
    return(
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/categorias"}>Categorias</Link>
              </li>
              <li>
                <Link className="nav-link" to={"/flujo"}>Flujo</Link>
              </li>
              <li>
                <Link className="nav-link" to={"/registros"}>Indicadores</Link>
              </li>
              <li>
                <Link className="nav-link" to={"/reporteFlujo"}>Factura</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
}
export default Navbar;