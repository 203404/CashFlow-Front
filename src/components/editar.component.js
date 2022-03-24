import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Categorias = [
    {
      Categorias: "ingreso",
    },
    {
      Categorias: "Costo-venta",
    },
    {
      Categorias: "Gasto-AOC",
    },
  ];

class Editar extends React.Component {
  state = {
    form: {
      id: "",
      categoria: "",
      sub_categoria: "",
    },
    error: false,
    errorMsg: "",
  };

  manejadorChange = (e) => {
    console.log(e.target);
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
    console.log(this.state.form);
  };

  put = () => {
    let url = "http://localhost:3001/api/v1/categoria"; //Url backend
    if (this.state.form.id !== null && this.state.form.categoria !== null && this.state.form.sub_categoria !== "") {
      axios
        .put(url, this.state.form)
        .then((response) => {
          alert("Datos editados correctamente");
          window.location = "http://localhost:3000/categorias";
          console.log(response);
        })
        .catch((err) => {
          alert(err);
          console.log(err);
        });
    }else{
      alert('Datos no correctos para actualizar la categoria')
      window.location="http://localhost:3000/categorias";
    }
  };

  manejadorSumbit = (e) => {
    e.preventDefault();
    this.put();
  };

  componentDidMount() {
    const {
      match: { params },
    } = this.props;

    let url = "http://localhost:3001/api/v1/categoria/" + params.id; //Url backend
    // alert('holaaaaaaa')
    axios.get(url).then((response) => {
      console.log(response);
      this.setState({
        form: {
          id: params.id,
          categoria: response.data.categoria,
          sub_categoria: response.data.sub_categoria,
        },
      });
    });
  }

  changecategoria=(e)=>{
    const i=e.target.value
    console.log(i);
    switch (i) {
      case "0":
        this.setState({
          form: {
            ...this.state.form,
            categoria : "Ingreso",
          },
        });
        
        break;
      case "1":
        this.setState({
          form: {
            ...this.state.form,
            categoria : "Costo-venta",
          },
        });
        
        break;
      case "2":
        this.setState({
          form: {
            ...this.state.form,
            categoria : "Gasto-AOC",
          },
        });
        
        break;
    
      default:
        this.setState({
          form: {
            ...this.state.form,
            categoria : null,
          },
        });
        break;
    }
  }

  render() {
    const form = this.state.form;
    return (
      <div>
        <h1>Editar Categoria</h1>
        <form onSubmit={this.manejadorSumbit}>
          <div className="form-group">
            <label>Categoria</label>
            <select
              name="categoria"
              id="txtCategoria"
              onClick={(e) => this.changecategoria(e)}
            >
              <option value={-1}>Seleccione una categoria</option>
              {Categorias.map((item, i) => (
                <option key={"categoria" + i} value={i}>
                  {item.Categorias}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Sub Categoria</label>
            <input
              type="text"
              className="form-control"
              name="sub_categoria"
              placeholder="Sub Categoria"
              value={form.sub_categoria}
              onChange={this.manejadorChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Guardar
          </button>
        </form>
        <Link to={"/mainMenu"}>
            <button className="btn btn-secondary">Menu principal</button>

          </Link>
      </div>
    );
  }
}
export default Editar;
