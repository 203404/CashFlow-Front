import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    form: {
      user: "",
      password: "",
    },
    error: false,
    errorMsg: "",
  };

  manejadorSubmit = (e) => {
    e.preventDefault();
  };

  manejadorChange = async (e) => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
    console.log(this.state.form);
  };

  manejadorBoton = () => {
    console.log("enviado");
    let url = "http://localhost:3001/api/login";
    console.log(this.state.form);
    axios
      .post(url, this.state.form)
      .then((response) => {
        if (response.data.status === "ok") {
          localStorage.setItem("token", response.data.result.token);
          this.props.history.push("/categorias");
        } else {
          this.setState({
            error: true,
            errorMsg: "Usuario o contraseña incorrectos",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          error: true,
          errorMsg: "Error al coneccionar con el servidor",
        });
      });
  };

  render() {
    return (
      <form onSubmit={this.manejadorSubmit}>
        <h3>Sign In</h3>
        <div className="form-group">
          <label>user address</label>
          <input
            type="text"
            className="form-control"
            name="user"
            placeholder="Enter username"
            onChange={this.manejadorChange}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Enter password"
            onChange={this.manejadorChange}
          />
        </div>
        <div className="form-group">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary btn-block"
          onClick={this.manejadorBoton}
        >
          Submit
        </button>
        <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p>

        {this.state.error === true && (
          <div class="alert alert-danger" role="alert">
            {this.state.errorMsg}
          </div>
        )}
      </form>
    );
  }
}
