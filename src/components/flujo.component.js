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
        let url = "http://localhost:3001/api/v1/flujoEfectivos"; //Url backend
        axios.get(url).then((response) => {
            this.setState({
                ObjetoFlujo: response.data,
            });
        });
    }
    postCategoria = () => {
        let url = "http://localhost:3001/api/v1/flujoEfectivo"; //Url backend
        var postData = {
            id_categoria: this.state.id_categoria,
            es_ingreso: this.state.es_ingreso,
            descripcion: this.state.descripcion,
            cantidad: this.state.cantidad,
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
    validacion(valor) {
        if (valor === true){
            return "Si";
        }
        else return "No";
    }
    cortarFecha(fecha){
        return fecha.substring(0, 10)
    }

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
                        <h2>¿Se trata de un ingreso?</h2>
                        <select
                            name="es_ingreso"
                            id="seles_ingreso"
                            onClick={(e) => e.target.value === '0' ? this.setState({ es_ingreso: true }) : (e.target.value === '1' ? this.setState({ es_ingreso: false }) : (e.target.value === '-1' ? this.setState({ es_ingreso: null }) : null))}
                        //onClick={this.handleChange}
                        >
                            <option value={-1}>Seleccione una opcion</option>
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
                                    <td>{this.validacion(value.es_ingreso)}</td>
                                    <td>{value.descripcion}</td>
                                    <td>{value.cantidad}</td>
                                    <td>{this.cortarFecha(value.fecha)}</td>
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