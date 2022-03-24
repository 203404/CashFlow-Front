import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class SignUp extends Component {
    
        state={
            username:"",
            password:"",
            rol:""
        }
    
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    postRegister = async() => {
        let url = "http://localhost:3001/api/v1/register"; //Url backend
        var postData = {
            user: this.state.username,
            password: this.state.password,
            rol: this.state.rol,
        }
        console.log(postData)

        try {
            const resul = await axios.post(url, postData, {
                headers: { "Content-Type": "application/json" }
            })

            console.log(resul)
            alert('Registro creado')
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        return (
            <form>
                <h3>Sign Up</h3>
                <div className="form-group">
                    <label>User Name</label>
                    <input required type="text" className="form-control" placeholder="User name" name="username" onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input required type="password" className="form-control" placeholder="Password" name="password" onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <label>Rol</label>
                    <input required type="text" className="form-control" placeholder="Rol" name="rol" onChange={this.handleChange} />
                </div>
                <button  className="btn btn-primary btn-block" onClick={this.postRegister}>Sign Up</button>


                <Link to={"/mainMenu"}>
                    <button className="btn btn-secondary">Menu principal</button>

                </Link>
                
            </form>
        );
    }
}
