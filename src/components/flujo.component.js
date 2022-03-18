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
            ObjetoCategoria: [],
            ObjetoFlujo: [],
            id_categoria: null,
            es_ingreso: null,
            descripcion: "",
            cantidad: 0,
        };
    }
    componentDidMount() {
        this.cargarFlujos();
        this.cargarCategorias();
    }
    cargarFlujos = () => {
        let url = "http://localhost:3001/api/v1/flujoEfectivos"; //Url backend
        axios.get(url).then((response) => {
            this.setState({
                ObjetoFlujo: response.data,
            });
        });
    }
    cargarCategorias = () => {
        let url = "http://localhost:3001/api/v1/categorias"; //Url backend
        axios.get(url).then((response) => {
            this.setState({
                ObjetoCategoria: response.data,
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
        let correctos=true; //Agregado por Lorenzo
        correctos=this.comprobarTipos(correctos)//Agregado por Lorenzo
        if(correctos){//Agregado por Lorenzo
        axios
            .post(url, postData, {
                headers: { "Content-Type": "application/json" },
            })
            .then((response) => {
                console.log(response)
                alert("Registro creado");
                window.location.reload();
            });
        }
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });

        console.log(event.target.value);
    };
    validacion(valor) {
        if (valor === true) {
            return "Si";
        }
        else return "No";
    }
    cortarFecha(fecha) {
        return fecha.substring(0, 10)
    }

    selectId(e){
        let result=e.target.value
        console.log(result)
        return result;
    }
    comprobarTipos(correctos){ //Agregado por Lorenzo
        console.log(this.state.es_ingreso)
        let alerta="";
        if(!this.state.id_categoria){
            correctos=false;
            alerta+="Datos ingresados en 'id Categoria' no validos\n"
        }
        if(this.state.es_ingreso==null){

            correctos=false;
            alerta+="Datos ingresados en '¿Se trata de un Ingreso?' no validos\n"
        }
        if(!this.state.descripcion){
            correctos=false;
            alerta+="Datos ingresados en Descripción no validos\n"
        }
        if(!this.state.cantidad){
            correctos=false;
            alerta+="Datos ingresados en Cantidad no validos\n"
        }
        if(!correctos){
            alert(alerta)
        }
        return correctos;
    }

    render() {
        return (
            <div className="any">
                <div>


                    <div>
                        <h2>Categoria</h2>
                        <select
                            name="id_categoria"
                            id="selid_categoria"
                            onClick={(e)=>{this.setState({id_categoria:this.selectId(e)})}}
                        //onClick={this.handleChange}
                        >
                            <option value={-1}>Seleccione una categoria / subcategoria</option>
                            {this.state.ObjetoCategoria.map((value, index) => {
                                return (
                                    <option key={index}  value={this.state.ObjetoCategoria[index].id}>
                                        {value.categoria +" / "+ value.sub_categoria}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div>
                        <h2>¿Se trata de un ingreso?</h2>
                        <select
                            name="es_ingreso"
                            id="seles_ingreso"
                            onClick={(e) => e.target.value === '0' ? this.setState({ es_ingreso: true }) : (e.target.value === '1' ? this.setState({ es_ingreso: false }) : (e.target.value === '-1' ? this.setState({ es_ingreso: null }) : null))}
                        //onClick={this.handleChange}
                        >
                            <option value={-1}>¿es ingreso?</option>
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
                            placeholder="ingrese una descripción"
                            name="descripcion"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <h2>Cantidad</h2>
                        <input
                            type="number"
                            id="txtCantiad"
                            placeholder="ingresa la cantidad"
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
