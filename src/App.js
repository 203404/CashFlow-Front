import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import Categorias from "./components/categorias.component";
import Flujo from "./components/flujo.component";
import Registros from './components/registros.component';
import Editar from './components/editar.component'
import PrivateRoute from './components/PrivateRoute';
import MainMenu from "./components/mainMenu.component";

function App() {
  return (<Router>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/"}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/categorias"}>Categorias</Link>
              </li>
              <li>
                <Link className="nav-link" to={"/flujo"}>Flujo</Link>
              </li>
              <li>
                <Link className="nav-link" to={"/registros"}>Indicadores</Link>
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
            {/* <Route exact path='/' component={Login} /> */}
            <Route
                path="/sign-up"
                exact
                render={(props) => <SignUp{...props} />}
              ></Route>
            {/* <Route path="/sign-up" component={SignUp} /> */}

            <PrivateRoute
              path="/categorias"
              exact
              render={(props) => <Categorias{...props} />}
            ></PrivateRoute>
            {/* <PrivateRoute path="/categorias" component={Categorias} /> */}

            <PrivateRoute
              path="/flujo"
              exact
              render={(props) => <Flujo{...props} />}
            ></PrivateRoute>
            {/* <PrivateRoute path="/flujo" component={Flujo} /> */}

            <PrivateRoute
              path="/registros"
              exact
              render={(props) => <Registros{...props} />}
            ></PrivateRoute>
            {/* <PrivateRoute path="/registros" component={Registros} /> */}

            <PrivateRoute
              path="/editar/:id"
              exact
              render={(props) => <Editar{...props} />}
            ></PrivateRoute>
            {/* <Route path="/editar:id" component={editar} /> */}
            <PrivateRoute
              path="/mainMenu"
              exact
              render={(props) => <MainMenu{...props} />}
            ></PrivateRoute>
            {/* <Route path="/mainMenu:id" component={mainMenu} /> */}
          </Switch>
        </div>
      </div>
    </div></Router>
  );
}
export default App;
