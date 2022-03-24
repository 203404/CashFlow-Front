import axios from "axios";
import React from "react";

let ingresos = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];
let gastos = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];
let utilidad = [0,0,0,0,0];
let rentabilidad = [0,0,0,0,0];

export default class Factura extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ObjetoFlujo: [],
      mes: 3,
      ingresoState:[],
    };
  }

  componentDidMount() {
    this.cargarFlujos();
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
          if (element.categoria == "Costo-venta") {
            gastos[0][semana] += cantidad;
          }
          if (element.categoria == "Gasto-AOC") {
            gastos[1][semana] += cantidad;
          }
          gastos[2][semana] = gastos[0][semana] + gastos[1][semana];
          
        }      
      }
      for (let index = 0; index < 5; index++) {
        utilidad[index] = ingresos[2][index] - gastos[2][index];
        rentabilidad[index] = utilidad [index] * 100 / ingresos [2][index];
      }
      this.setState({
        ingresoState:ingresos 
      })
      console.log(utilidad);
      console.log(rentabilidad);
      console.log(ingresos);
      console.log(gastos);
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
            
                <tr >
                  <td>Efectivo</td>
                  <td>{ingresos[0][0]}</td>
                  <td>{ingresos[0][1]}</td>
                  <td>{ingresos[0][2]}</td>
                  <td>{ingresos[0][3]}</td>
                  <td>{ingresos[0][4]}</td>
                  <td>{}</td>
                </tr>
                <tr >
                  <td>Tarjeta</td>
                  <td>{ingresos[1][0]}</td>
                  <td>{ingresos[1][1]}</td>
                  <td>{ingresos[1][2]}</td>
                  <td>{ingresos[1][3]}</td>
                  <td>{ingresos[1][4]}</td>
                  <td>{}</td>
                </tr>
                <tr >
                  <td>Total</td>
                  <td>{ingresos[2][0]}</td>
                  <td>{ingresos[2][1]}</td>
                  <td>{ingresos[2][2]}</td>
                  <td>{ingresos[2][3]}</td>
                  <td>{ingresos[2][4]}</td>
                  <td>{}</td>
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
            {this.state.ObjetoFlujo.map((value, index) => {
              if (value.mes === this.state.mes) {
                return (
                  <tr key={index}>
                    <td>{value.descrip}</td>
                    <td>{value.num_sem === 1 ? value.monto : "---"}</td>
                    <td>{value.num_sem === 2 ? value.monto : "---"}</td>
                    <td>{value.num_sem === 3 ? value.monto : "---"}</td>
                    <td>{value.num_sem === 4 ? value.monto : "---"}</td>
                    <td>{}</td>
                  </tr>
                );
              }
            })}
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
            {this.state.ObjetoFlujo.map((value, index) => {
              if (value.mes === this.state.mes) {
                return (
                  <tr key={index}>
                    <td>{value.descrip}</td>
                    <td>{value.num_sem === 1 ? value.monto : "---"}</td>
                    <td>{value.num_sem === 2 ? value.monto : "---"}</td>
                    <td>{value.num_sem === 3 ? value.monto : "---"}</td>
                    <td>{value.num_sem === 4 ? value.monto : "---"}</td>
                    <td>{}</td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
