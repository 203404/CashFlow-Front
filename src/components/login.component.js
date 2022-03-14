import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {

    state={
        form:{
            'email':'',
            'password':''
        },
        error:false,
        errorMessage:''
    }

    manejadorSubmit = (e) => {
        e.preventDefault();
    }

    manejadorChange = async e=>{
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            
            }
        })
        console.log(this.state.form);
    }

    manejadorBoton=()=>{
        console.log('enviado')
        let url;
        axios.post(url,this.state.form)
        .then(res=>{
            console.log(res);
        })
    }

    render() {
        return (
            <form onSubmit={this.manejadorSubmit}> 
                <h3>Sign In</h3>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" name='email' placeholder="Enter email" onChange={this.manejadorChange}/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" name='password' placeholder="Enter password" onChange={this.manejadorChange} />
                </div>
                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary btn-block" onClick={this.manejadorBoton}>Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
        );
    }
}

