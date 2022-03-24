import React, { Component } from "react";
export default class SignUp extends Component {
    render() {
        return (
            <form>
                <h3>Sign Up</h3>
                <div className="form-group">
                    <label>User Name</label>
                    <input type="text" className="form-control" placeholder="User name" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Password" />
                </div>
                <div className="form-group">
                    <label>Rol</label>
                    <input type="text" className="form-control" placeholder="Rol" />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                
            </form>
        );
    }
}
