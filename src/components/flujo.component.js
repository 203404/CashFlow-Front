import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
            categoria:null,
            sub_categoria:null,
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
    postFlujo = () => {
        let url = "http://localhost:3001/api/v1/flujoEfectivo"; //Url backend
        var postData = {
            categoria:this.state.categoria,
            sub_categoria:this.state.sub_categoria,
            id_categoria: this.state.id_categoria,
            es_ingreso: this.state.es_ingreso,
            descripcion: this.state.descripcion,
            cantidad: this.state.cantidad,
        }
        console.log(postData)
        let correctos = true; //Agregado por Lorenzo
        correctos = this.comprobarTipos(correctos)//Agregado por Lorenzo
        if (correctos) {//Agregado por Lorenzo
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

    selectId(e) {
        // let result = e.target.value
        // console.log(result)
        // return result;
        if (e.target.value!==-1){
            axios.get('http://localhost:3001/api/v1/categoria/'+e.target.value)
            .then((res)=>{
                console.log(res.data)
                this.setState({
                    id_categoria:e.target.value,
                    categoria:res.data.categoria,
                    sub_categoria:res.data.sub_categoria
                })
            })
        }
        
        
    }
    comprobarTipos(correctos) { //Agregado por Lorenzo
        console.log(this.state.es_ingreso)
        let alerta = "";
        if (this.state.id_categoria ===null || this.state.id_categoria===-1) {
            correctos = false;
            alerta += "Datos ingresados en 'Categoria' no validos\n"
        }
        if (this.state.es_ingreso === null) {

            correctos = false;
            alerta += "Datos ingresados en '¿Se trata de un Ingreso?' no validos\n"
        }
        if (!this.state.descripcion) {
            correctos = false;
            alerta += "Datos ingresados en Descripción no validos\n"
        }
        if (!this.state.cantidad) {
            correctos = false;
            alerta += "Datos ingresados en Cantidad no validos\n"
        }
        if (!correctos) {
            alert(alerta)
        }
        return correctos;
    }

    render() {
        return (
            <div className="any">
                <div>
                    <div>
                        <h2>¿Se trata de un ingreso?</h2>
                        <select
                            name="es_ingreso"
                            id="seles_ingreso"
                            onClick={(e) => e.target.value === '0' ? this.setState({ es_ingreso: true, id_categoria:null }) : (e.target.value === '1' ? this.setState({ es_ingreso: false, id_categoria:null }) : (e.target.value === '-1' ? this.setState({ es_ingreso: null , id_categoria:null}) : null))}
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
                        <h2>Categoria</h2>
                        <select
                            name="id_categoria"
                            id="selid_categoria"
                            onClick={(e) => { this.selectId(e) }}
                        //onClick={this.handleChange}
                        >

                            <option value={-1}>Seleccione una categoria / subcategoria</option>
                            {this.state.ObjetoCategoria.map((value, index) => {

                                if ((this.state.ObjetoCategoria[index].categoria=== "INGRESO" ||this.state.ObjetoCategoria[index].categoria=== "Ingreso" ) && this.state.es_ingreso=== true) {

                                    return (

                                        <option key={index} value={this.state.ObjetoCategoria[index].id}>
                                            {value.categoria + "/" + value.sub_categoria}
                                        </option>
                                    );
                                }
                                if ((this.state.ObjetoCategoria[index].categoria === "COSTO-VENTA" || this.state.ObjetoCategoria[index].categoria === "GASTO-AOC") && this.state.es_ingreso === false) {

                                    return (

                                        <option key={index} value={this.state.ObjetoCategoria[index].id}>
                                            {value.categoria + "/" + value.sub_categoria}
                                        </option>
                                    );
                                }

                                /*
                                 return (
                                 
                                     <option key={index}  value={this.state.ObjetoCategoria[index].id}>
                                         {value.categoria +"/" +value.sub_categoria}
                                     </option>
                                 );
                                 */



                            })}
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
                    <button type="submit" className="btn btn-primary btn-block" onClick={this.postFlujo}>Submit</button>
                    
                </div>
                
                <table class="table table-bordered">
                    <thead>
                        <tr>
                        <th scope="col">Categoria</th>
                            <th scope="col">Sub-categoria</th>
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
                                    
                                    <td>{value.categoria}</td>
                                    <td>{value.sub_categoria}</td>
                                    <td>{this.validacion(value.es_ingreso)}</td>
                                    <td>{value.descripcion}</td>
                                    <td>{value.cantidad}</td>
                                    <td>{this.cortarFecha(value.fecha)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <Link to={"/mainMenu"}>
            <button className="btn btn-secondary">Menu principal</button>

          </Link>
            </div>
        );
    }
}
export default Flujo;
