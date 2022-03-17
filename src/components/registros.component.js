import React from "react";
import axios from "axios";
import { Switch } from "react-router-dom";

const Registro = [
    {
        Registro: "Cuentas por Cobrar",
    },
    {
        Registro: "Cuentas por Pagar",
    },
    {
        Registro: "Bancos"
    }
];
const Mes = [
    {
        Mes: "Enero",
    },
    {
        Mes: "Febrero",
    },
    {
        Mes: "Marzo"
    },
    {
        Mes: "Abril",
    },
    {
        Mes: "Mayo",
    },
    {
        Mes: "Junio"
    },
    {
        Mes: "Julio",
    },
    {
        Mes: "Agosto",
    },
    {
        Mes: "Septiembre"
    },
    {
        Mes: "Octubre",
    },
    {
        Mes: "Noviembre",
    },
    {
        Mes: "Diciembre"
    }
];
const NSemana = [
    {
        NSemana: "1"
    },
    {
        NSemana: "2"
    },
    {
        NSemana: "3"
    },
    {
        NSemana: "4"
    }
];
class Registros extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ObjetoRegistro: [],
            tipo_registro: "",
            num_sem: "",
            descrip: "",
            mes: "",
            monto: "",
        };
    }
    // componentDidMount() {
    //     //Url backend 
    //     let url = "http://localhost:3001/api/v1/indicador";
    //     axios.get(url).then((response) => {
    //         this.setState({
    //             ObjetoRegistro: response.data,
    //         });
    //     });
    // }

    postCategoria = () => {
        //Url backend 
        let url = "http://localhost:3001/api/v1/indicador";
        this.state.num_sem = parseFloat(this.state.num_sem)
        this.state.monto = parseFloat(this.state.monto)
        var postData = {
            tipo_registro: this.state.tipo_registro,
            num_sem: this.state.num_sem,
            descrip: this.state.descrip,
            mes: this.state.mes,
            monto: this.state.monto,
        }

        console.log("tipo_registro: " + typeof (this.state.tipo_registro))
        console.log("num_sem: " + typeof (this.state.num_sem))
        console.log("descrip: " + typeof (this.state.descrip))
        console.log("mes: " + typeof (this.state.mes))
        console.log("monto: " + typeof (this.state.monto))

        console.log(postData)
        var noEnviar = true
        noEnviar = this.verificarDatos(noEnviar);
        if (noEnviar) {
            //No se en que parte del codigo se envia, pero en todo caso va dentro de este IF
            axios
            .post(url, postData, {
            headers: { "Content-Type": "application/json" },
            })
            .then((response) => {
            console.log(response)
            alert("Registro Guardado");
            window.location.reload();
            }).catch((err)=>{
                console.log(err)
            })
        }
    };
    verificarDatos(noEnviar) {
        var alerta="";
        if (!this.state.tipo_registro) {
            noEnviar = false
            alerta+="Dato Tipo de Registro introducido no correcto\n"
        }

        if (!this.state.num_sem) {
            noEnviar = false
            alerta+="Dato Numero de Semana introducido no correcto\n"
        } 

        if (!this.state.descrip) {
            noEnviar = false
            alerta+="Dato Razón Social introducido no correcto\n"
        }

        if (!this.state.mes ) {
            noEnviar = false
            alerta+="Dato Mes introducido no correcto\n"
        }

        if (this.state.monto == null || isNaN(this.state.monto)) {
            noEnviar = false
            alerta+="Dato Monto introducido no correcto\n"
        } 
        if(alerta){
            alert(alerta)
        }
        return noEnviar;
    }
    
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });

        console.log(event.target.value);
    };
    cambioSemana(e) {
        let resultado;
        switch (e.target.value) {
            case "0":
                resultado = 1;
                break;
            case "1": resultado = 2;
                break;
            case "2": resultado = 3;
                break;
            case "3": resultado = 4;
                break;
            default: resultado = null;
                break;
        }
        return resultado;
    }
    cambiotipo_registro(e) {
        let resultado;
        switch (e.target.value) {
            case "0":
                resultado = "Cuentas por Cobrar";
                break;
            case "1":
                resultado = "Cuentas por Pagar";
                break;
            case "2":
                resultado = "Bancos";
                break;
            default:
                resultado = null;
                break;
        }
        return resultado;
    }
    cambioMes(e) {
        let resultado;
        switch (e.target.value) {
            case "0":
                resultado = "Enero";
                break;
            case "1":
                resultado = "Febrero";
                break;
            case "2":
                resultado = "Marzo";
                break;
            case "3":
                resultado = "Abril";
                break;
            case "4":
                resultado = "Mayo";
                break;
            case "5":
                resultado = "Junio";
                break;
            case "6":
                resultado = "Julio";
                break;
            case "7":
                resultado = "Agosto";
                break;
            case "8":
                resultado = "Septiembre";
                break;
            case "9":
                resultado = "Octubre";
                break;
            case "10":
                resultado = "Noviembre";
                break;
            case "11":
                resultado = "Diciembre";
                break;
            default:
                resultado = null;
                break;
        }
        return resultado;
    }
    render() {
        return (
            <div className="any">
                <div>
                    <div>
                        <h2><text>{'Registro de \t'}</text>
                            <select
                                name="tipo_registro"
                                id="selRegistro"
                                onChange={(e) => this.setState({ tipo_registro: this.cambiotipo_registro(e) })}
                            >
                                <option value={-1}>- - - - - - - - - - - - - </option>
                                {Registro.map((item, i) => (
                                    <option key={"registro" + i} value={i}>
                                        {item.Registro}
                                    </option>
                                ))}
                            </select>
                            .
                        </h2>
                        <div>
                            <h2>Periodo</h2>
                            <select
                                name="num_sem"
                                id="num_sem"

                                onChange={(e) => this.setState({ num_sem: this.cambioSemana(e) })}

                            >

                                <option value={-1}>Numero de Semana</option>
                                {NSemana.map((item, i) => (
                                    <option key={"num_sem" + i} value={i}>
                                        {item.NSemana}
                                    </option>
                                ))}
                            </select>
                            <text>{"\t"}</text>
                            <select
                                name="mes"
                                id="selMes"
                                onChange={(e) => this.setState({ mes: this.cambioMes(e) })}
                            >
                                <option value={-1}>Mes</option>
                                {Mes.map((item, i) => (
                                    <option key={"mes" + i} value={i}>
                                        {item.Mes}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <h2>Razón Social</h2>
                            <input
                                type="text"
                                id="txtdescrip"
                                name="descrip"
                                placeholder="Razón Social"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div>
                            <h2>Monto</h2>
                            <input
                                type="number"
                                id="txtMonto"
                                name="monto"
                                placeholder="Monto $:"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div>
                            <button type="submit" className="btn btn-primary btn-block" onClick={this.postCategoria}>Submit</button>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
} export default Registros;