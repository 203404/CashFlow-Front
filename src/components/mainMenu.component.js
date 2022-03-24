import React from "react";
import { Link } from "react-router-dom";
class MainMenu extends React.Component {
    logout() {
        localStorage.removeItem('session')
        window.location.reload();
    }
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
                                <Link className="nav-link" to={"/reportes"}  >Reportes</Link>
                            </li>

                        </ul>

                        <Link to={"/sign-up"}>
                            <button className="btn btn-info">SignUp</button>

                        </Link>
                        <button className="btn btn-danger" onClick={this.logout}>Logout</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default MainMenu;