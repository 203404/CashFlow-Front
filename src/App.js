import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import Categorias from "./components/categorias.component";
import Flujo from "./components/flujo.component";
import Registros from './components/registros.component';
import Editar from './components/editar.component'
import PrivateRoute from './components/PrivateRoute';
import MainMenu from "./components/mainMenu.component";
import ReporteFlujo from './components/reporteFlujo';
import ReporteCuentasCobrar from './components/reporte_cuentasCobrar';
import ReporteCuentasPagar from './components/reporte_cuentasPagar';
import ReporteBancos from './components/reporte_bancos';

function App() {
  return (<Router>
    <div className="App">
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

            <Route
              path="/categorias"
              exact
              render={(props) => <Categorias{...props} />}
            ></Route>
            {/* <Route path="/categorias" component={Categorias} /> */}

            <Route
              path="/flujo"
              exact
              render={(props) => <Flujo{...props} />}
            ></Route>
            {/* <Route path="/flujo" component={Flujo} /> */}

            <Route
              path="/registros"
              exact
              render={(props) => <Registros{...props} />}
            ></Route>
            {/* <Route path="/registros" component={Registros} /> */}

            <Route
              path="/editar/:id"
              exact
              render={(props) => <Editar{...props} />}
            ></Route>
            {/* <Route path="/editar:id" component={editar} /> */}
            <Route
              path="/mainMenu"
              exact
              render={(props) => <MainMenu{...props} />}
            ></Route>
            {/* <Route path="/mainMenu:id" component={mainMenu} /> */}
            <Route
              path="/reporteFlujo"
              exact
              render={(props) => <ReporteFlujo{...props} />}
            ></Route>
            <Route
              path="/reporte_Cuentas_Cobrar"
              exact
              render={(props) => <ReporteCuentasCobrar{...props} />}
            ></Route>
            <Route
              path="/reporte_Cuentas_Pagar"
              exact
              render={(props) => <ReporteCuentasPagar{...props} />}
            ></Route>
            <Route
              path="/reporte_Bancos"
              exact
              render={(props) => <ReporteBancos{...props} />}
            ></Route>
          </Switch>
        </div>
      </div>
    </div></Router>
  );
}
export default App;
