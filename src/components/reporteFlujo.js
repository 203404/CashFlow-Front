import axios from "axios";
import React from "react";
import Navbar from "./navbar.component";

let ingresos = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];
let gastos = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];
let utilidad = [0, 0, 0, 0, 0];
let rentabilidad = [0, 0, 0, 0, 0];

export default class Factura extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ObjetoFlujo: [],
      mes:null,
      ingresoState: [],
    };
  }
  crearMes(){
    switch (this.props.mes){
      case "Enero":
        this.setState({
          mes:1
        })
        break;
        case "Febrero":
          this.setState({
            mes:2
          })
          break;
          case "Marzo":
        this.setState({
          mes:3
        })
        break;
        case "Abril":
        this.setState({
          mes:4
        })
        break;
        case "Mayo":
        this.setState({
          mes:5
        })
        break;
        case "Junio":
        this.setState({
          mes:6
        })
        break;
        case "Julio":
        this.setState({
          mes:7
        })
        break;
        case "Agosto":
        this.setState({
          mes:8
        })
        break;
        case "Septiembre":
        this.setState({
          mes:9
        })
        break;
        case "Octubre":
        this.setState({
          mes:10
        })
        break;
        case "Noviembre":
        this.setState({
          mes:11
        })
        break;
        case "Diciembre":
        this.setState({
          mes:12
        })
        break;
    }
  }
  componentDidMount() {
    this.cargarFlujos();
    this.crearMes();
  }

  cargarFlujos = () => {
    let Ingresos = [];
    let mesFlujo = [];
    let semana, cantidad;
    let url = "http://localhost:3001/api/v1/flujoEfectivos"; //Url backend
    axios.get(url).then((response) => {
      this.setState({
        ObjetoFlujo: response.data,
      });

      for (let index = 0; index < this.state.ObjetoFlujo.length; index++) {
        const element = this.state.ObjetoFlujo[index];
        console.log(parseInt(element.fecha.substr(5, 2)));
        cantidad = parseInt(element.cantidad);
        if (parseInt(element.fecha.substr(5, 2)) === this.state.mes) {
          mesFlujo.push(element);
          let dia = parseInt(element.fecha.substr(8, 2));
          if (dia < 8) {
            semana = 0;
          }
          if (dia > 7 && dia < 15) {
            semana = 1;
          }
          if (dia > 14 && dia < 22) {
            semana = 2;
          }
          if (dia > 21) {
            semana = 3;
          }
          if (element.sub_categoria === "Efectivo") {
            ingresos[0][semana] += cantidad;
          }
          if (element.sub_categoria === "deposito") {
            ingresos[1][semana] += cantidad;
          }
          ingresos[2][semana] = ingresos[0][semana] + ingresos[1][semana];
          if (element.categoria === "Costo-venta") {
            gastos[0][semana] += cantidad;
          }
          if (element.categoria === "Gasto-AOC") {
            gastos[1][semana] += cantidad;
          }
          gastos[2][semana] = gastos[0][semana] + gastos[1][semana];
        }
      }
      for (let i = 0; i < 3; i++) {
        for (let index = 0; index < 4; index++) {
          ingresos[i][4] += ingresos[i][index];
        }

        for (let index = 0; index < 4; index++) {
          gastos[i][4] += gastos[i][index];
        }
      }

      for (let index = 0; index < 5; index++) {
        utilidad[index] = ingresos[2][index] - gastos[2][index];
        rentabilidad[index] = (utilidad[index] * 100) / ingresos[2][index];
      }
      this.setState({
        ingresoState: ingresos,
      });
    });
  };
  render() {
    return (
      <div>
        <h1>Flujo efectivo</h1>
        <h6>Ingresos</h6>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">descripcion</th>
              <th scope="col">sem 1</th>
              <th scope="col">sem 2</th>
              <th scope="col">sem 3</th>
              <th scope="col">sem 4</th>
              <th scope="col">final</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Efectivo</td>
              <td>{ingresos[0][0]}</td>
              <td>{ingresos[0][1]}</td>
              <td>{ingresos[0][2]}</td>
              <td>{ingresos[0][3]}</td>
              <td>{ingresos[0][4]}</td>
            </tr>
            <tr>
              <td>Tarjeta</td>
              <td>{ingresos[1][0]}</td>
              <td>{ingresos[1][1]}</td>
              <td>{ingresos[1][2]}</td>
              <td>{ingresos[1][3]}</td>
              <td>{ingresos[1][4]}</td>
            </tr>
            <tr>
              <td>Total</td>
              <td>{ingresos[2][0]}</td>
              <td>{ingresos[2][1]}</td>
              <td>{ingresos[2][2]}</td>
              <td>{ingresos[2][3]}</td>
              <td>{ingresos[2][4]}</td>
            </tr>
          </tbody>
        </table>
        <br></br>
        <h6>Gastos</h6>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">descripcion</th>
              <th scope="col">sem 1</th>
              <th scope="col">sem 2</th>
              <th scope="col">sem 3</th>
              <th scope="col">sem 4</th>
              <th scope="col">final</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Costos de ventas</td>
              <td>{gastos[0][0]}</td>
              <td>{gastos[0][1]}</td>
              <td>{gastos[0][2]}</td>
              <td>{gastos[0][3]}</td>
              <td>{gastos[0][4]}</td>
            </tr>
            <tr>
              <td>Gastos fijos Operativos</td>
              <td>{gastos[1][0]}</td>
              <td>{gastos[1][1]}</td>
              <td>{gastos[1][2]}</td>
              <td>{gastos[1][3]}</td>
              <td>{gastos[1][4]}</td>
            </tr>
            <tr>
              <td>Total Gastos</td>
              <td>{gastos[2][0]}</td>
              <td>{gastos[2][1]}</td>
              <td>{gastos[2][2]}</td>
              <td>{gastos[2][3]}</td>
              <td>{gastos[2][4]}</td>
            </tr>
          </tbody>
        </table>
        <br></br>
        <h6>Diferencia</h6>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">descripcion</th>
              <th scope="col">sem 1</th>
              <th scope="col">sem 2</th>
              <th scope="col">sem 3</th>
              <th scope="col">sem 4</th>
              <th scope="col">final</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>total utilidad</td>
              <td>{utilidad[0]}</td>
              <td>{utilidad[1]}</td>
              <td>{utilidad[2]}</td>
              <td>{utilidad[3]}</td>
              <td>{utilidad[4]}</td>           
            </tr>
            <tr>
              <td>margen de rentabilidad</td>
              <td>{rentabilidad[0]}%</td>
              <td>{rentabilidad[1]}%</td>
              <td>{rentabilidad[2]}%</td>
              <td>{rentabilidad[3]}%</td>
              <td>{rentabilidad[4]}%</td>           
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
