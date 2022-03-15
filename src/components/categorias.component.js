import React, { Component, useState } from "react";
import axios from "axios";
const categorias = [
  {
    nombre: "Categoria 1",
    articulos: ["objeto 1", "objeto 2", "objeto 3"],
  },
  {
    nombre: "Categoria 2",
    articulos: ["objeto 1.x", "objeto 2.x", "objeto 3.x"],
  },
];

function Categorias() {
  const [idArticulos, setIdArticulos] = useState(-1);

  const handlerCargarArticulos = function(e) {
    const opcion = e.target.value;
    setIdArticulos(opcion);
  };
  return (
    <div>
      <div>
        <div>
          <h2>Categorias</h2>
          <select
            name="categorias"
            id="selCategorias"
            onClick={handlerCargarArticulos}
          >
            <option value={-1}>Seleccione una categoria</option>
            {categorias.map((item, i) => (
              <option key={"categoria" + i} value={i}>
                {item.nombre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <h2>Subcategorias</h2>
          <select name="articulos" id="selarticulo">
            {idArticulos > -1 &&
              categorias[idArticulos].articulos.map((item, i) => (
                <option key={"articulo" + 1} value="">
                  {" "}
                  {item}{" "}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td colspan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Categorias;
