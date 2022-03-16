import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import Categorias from "./components/categorias.component";
function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/"}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-up"}>
                    Sign up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/categorias"}>
                    Categorias
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Switch>
              <Route
                path="/"
                exact
                render={(props) => <Login {...props} />}
              ></Route>
              <Route
                path="/sign-up"
                exact
                render={(props) => <SignUp {...props} />}
              ></Route>
              <Route
                path="/categorias"
                exact
                render={(props) => <Categorias {...props} />}
              ></Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}
export default App;
