import React, { Component } from "react";
import axios from "axios";

const Clasificacion = [
    {
        Clasificacion: "Si",
    },
    {
        Clasificacion: "No",
    },
];

class Flujo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ObjetoFlujo: [],
            id_categoria: "",
            es_ingreso: null,
            descripcion: "",
            cantidad: 0,
        };
    }
    componentDidMount() {
        let url = "http://localhost:3001/api/v1/flujo_efectivo"; //Url backend
        axios.get(url).then((response) => {
            this.setState({
                ObjetoFlujo: response.data,
            });
        });
    }
    postCategoria = () => {
        let url = "http://localhost:3001/api/v1/flujo_efectivo"; //Url backend
        var postData = {
            id_categoria: this.state.id_categoria,
            es_ingreso: this.state.es_ingreso,
            descripcion: this.state.descripcion,
            cantidad: this.state.cantidad,
            fecha: this.state.fecha,
        }
        console.log(postData)
        axios
            .post(url, postData, {
                headers: { "Content-Type": "application/json" },
            })
            .then((response) => {
                console.log(response)
                alert("Registro creado");
                window.location.reload();
            });
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });

        console.log(event.target.value);
    };

    render() {
        return (
            <div>
                <div>
                    

                    <div>
                        <h2>id Categoria</h2>
                        <input
                            type="text"
                            id="txtCategoria"
                            name="id_categoria"
                            placeholder="id Categoria"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <h2>Registros</h2>
                        <select
                            name="es_ingreso"
                            id="selclasificacion"
                            onClick={(e) => e.target.value === '0' ? this.setState({ clasificacion: "No" }) : (e.target.value === '1' ? this.setState({ clasificacion: "egreso" }) : (e.target.value === '-1' ? this.setState({ clasificacion: null }) : null))}
                        //onClick={this.handleChange}
                        >
                            <option value={-1}>Seleccione una clasificacion</option>
                            {Clasificacion.map((item, i) => (
                                <option key={"clasificacion" + i} value={i}>
                                    {item.Clasificacion}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <h2>Descripcion</h2>
                        <input
                            type="text"
                            id="txtDescripcion"
                            placeholder="Descripcion"
                            name="descripcion"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <h2>Cantidad</h2>
                        <input
                            type="bigint"
                            id="txtCantiad"
                            placeholder="Cantidad"
                            name="cantidad"
                            onChange={this.handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block" onClick={this.postCategoria}>Submit</button>
                </div>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">id_categoria</th>
                            <th scope="col">Es ingreso</th>
                            <th scope="col">Descripcion</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.ObjetoFlujo.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <td>{value.id_categoria}</td>
                                    <td>{value.es_ingreso}</td>
                                    <td>{value.descripcion}</td>
                                    <td>{value.cantidad}</td>
                                    <td>{value.fecha}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}
export default Flujo;
