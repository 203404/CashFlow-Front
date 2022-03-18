import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class MainMenu extends React.Component {

    render() {
        return (
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
                </ul>
            </div>
        );
    }
}
export default MainMenu;