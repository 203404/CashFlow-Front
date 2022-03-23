import React from "react";
import {  Link } from "react-router-dom";

class MainMenu extends React.Component {

    render() {
        return (
            <div className="navbar navbar-expand-lg">
            <div className="container">
            <div >
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to={"/categorias"}>Categorias</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={"/flujo"}>Flujo de efectivo</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={"/registros"}>Indicadores</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={"/reporteFlujo"}>Factura</Link>
                    </li>
                </ul>
            </div>
            </div>
            </div>
        );
    }
}
export default MainMenu;