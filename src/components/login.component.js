import React, { Component } from "react";
import axios from "axios";


export default class Login extends Component {
    
    state={
        form:{
            'user':'',
            'password':''
        },
        error:false,
        errorMessage:''
    }

    manejadorSubmit = (e) => {
        e.preventDefault();
    }

    manejadorChange =  e=>{
        this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            
            }
        })
        console.log(this.state.form);
    }

    manejadorBoton=()=>{
        
        console.log('enviado')
        let url='http://localhost:3001/api/v1/login';
        console.log(this.state.form)
        axios.post(url,this.state.form)
        .then(res=>{
            console.log(res.status);
            if (res.status===203){
                localStorage.removeItem('session')
                alert(res.data.message)
            }else{
                alert('Login correcto')
                localStorage.setItem('session',res.data.tipo)
                window.location="http://localhost:3000/mainMenu";
            }
        }).catch((err)=>{
            console.log(err)
        })
    }

    render() {
        return (
            <form onSubmit={this.manejadorSubmit}> 
                <h3>Sign In</h3>
                <div className="form-group">
                    <label>user address</label>
                    <input type="text" className="form-control" name='user' placeholder="Enter username" onChange={this.manejadorChange}/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" name='password' placeholder="Enter password" onChange={this.manejadorChange} />
                </div>
                
                <button type="submit" className="btn btn-primary btn-block" onClick={this.manejadorBoton}>Submit</button>
    
            </form>
        );
    }
}

