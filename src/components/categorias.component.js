import React from "react";
import axios from "axios";

const clasificacion=[
  {
    'Clasificacion':'ingreso'
  },
  {
    'Clasificacion':'egreso'
  }
]

class Categorias extends React.Component {
  state = {
    Categorias: []
  }

  componentDidMount() {
    let url; //Url backend
    axios.get(url).then((response) => {
      this.setState({
        Categorias: response.data,
      });
    });
  }

  render() {
    return (
      <div>
        <div>
          <div>
            <h2>Clasificacion</h2>
            <select name="Categorias" id="selCategorias">
              <option value={-1}>Seleccione una clasificacion</option>
              {clasificacion.map((item, i) => (
                <option key={"clasificacion" + i} value={i}>
                  {item.Clasificacion}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h2>Categorias</h2>
            <input type="text" id="txtCategoria" placeholder="categoria" />
          </div>
          <div>
            <h2>Subcategorias</h2>
            <input
              type="text"
              id="txtSubcategoria"
              placeholder="sub-categoria"
            />
          </div>
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
              {this.state.Categorias.map((value, index) => {
                return (
                  <tr key={index}>
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
