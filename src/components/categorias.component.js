import React from "react";
import axios from "axios";//importar axios

const Clasificacion = [
  {
    Clasificacion: "ingreso",
  },
  {
    Clasificacion: "egreso",
  },
];

class Categorias extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      ObjetoClasificacion: [],
      clasificacion: null,
      categorias: "",
      sub_categoria: "",
    };
  }
  clickId(id){
    console.log(id);
    this.props.history.push(`/editar/${id}`);
  }

  componentDidMount() {
    let url = "http://localhost:3001/api/v1/categorias"; //Url backend
    axios.get(url).then((response) => {
      this.setState({
        ObjetoClasificacion: response.data,
      });
    });
  }

  postCategoria = () => {
    let url = "http://localhost:3001/api/v1/categorias"; //Url backend
    var postData = {
      clasificacion: this.state.clasificacion,
      categoria: this.state.categoria,
      sub_categoria: this.state.sub_categoria,
    }
    console.log(postData)
    axios
      .post(url, postData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log(response)
        alert("Categoria creada");
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
      <div >
        <div>
          <div>
            <h2>Clasificacion</h2>
            <select
              name="clasificacion"
              id="selclasificacion"
              onClick={(e) => e.target.value==='0'?this.setState({clasificacion: "ingreso"}):(e.target.value==='1'?this.setState({clasificacion: "egreso"}):(e.target.value==='-1'?this.setState({clasificacion: null}):null))}
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
            <h2>Categorias</h2>
            <input
              type="text"
              id="txtCategoria"
              name="categoria"
              placeholder="categoria"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <h2>Subcategorias</h2>
            <input
              type="text"
              id="txtSubcategoria"
              placeholder="sub-categoria"
              name="sub_categoria"
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block" onClick={this.postCategoria}>Submit</button>
        </div>
        <div>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">Clasificacion</th>
                <th scope="col">Categoria</th>
                <th scope="col">Subcategorias</th>
              </tr>
            </thead>
            <tbody>
              {this.state.ObjetoClasificacion.map((value, index) => {
                return (
                  <tr key={index} onClick={()=>this.clickId(value.id)}>
                    <td>{value.id}</td>
                    <td>{value.clasificacion}</td>
                    <td>{value.categoria}</td>
                    <td>{value.sub_categoria}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default Categorias;
