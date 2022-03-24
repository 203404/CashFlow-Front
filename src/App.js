import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import Categorias from "./components/categorias.component";
import Flujo from "./components/flujo.component";
import Registros from './components/registros.component';
import Editar from './components/editar.component'
import Reportes from './components/reportes.component';
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
            <PrivateRoute
                path="/sign-up"
                exact
                render={(props) => <SignUp{...props} />}
              ></PrivateRoute>
            {/* <PrivateRoute path="/sign-up" component={SignUp} /> */}

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
            {/* <PrivateRoute path="/editar:id" component={editar} /> */}
            <PrivateRoute
              path="/mainMenu"
              exact
              render={(props) => <MainMenu{...props} />}
            ></PrivateRoute>
            {/* <PrivateRoute path="/mainMenu:id" component={mainMenu} /> */}
            <PrivateRoute
              path="/reporteFlujo"
              exact
              render={(props) => <ReporteFlujo{...props} />}
            ></PrivateRoute>
            <PrivateRoute
              path="/reporte_Cuentas_Cobrar"
              exact
              render={(props) => <ReporteCuentasCobrar{...props} />}
            ></PrivateRoute>
            <PrivateRoute
              path="/reporte_Cuentas_Pagar"
              exact
              render={(props) => <ReporteCuentasPagar{...props} />}
            ></PrivateRoute>
            <PrivateRoute
              path="/reporte_Bancos"
              exact
              render={(props) => <ReporteBancos{...props} />}
            ></PrivateRoute>
            <PrivateRoute
              path="/reportes"
              exact
              render={(props) => <Reportes{...props} />}
              
            ></PrivateRoute>
            
          </Switch>
          
          
        </div>
      </div>
    </div></Router>
  );
}


export default App;
