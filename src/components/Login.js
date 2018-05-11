import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
//import {VERIFY_USER} from "../Events";
class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nickname: "",
            password: "",
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        //const {socket} = this.props;
        const {nickname,password} = this.state;

        //socket.emit(VERIFY_USER, nickname, this.setUser);
         axios.post('http://localhost:3231/login', { nickname, password })
            .then((result) => {
                localStorage.setItem('jwtToken', result.data.token);
                this.props.history.push('/')
            })
            .catch((error) => {
                if(error.response.status === 401) {
                    console.log('Login failed. Username or password not match');
                }
            });
    };
    handleChange = (e) =>{
        this.setState({[e.target.name]:e.target.value})
    };

    render() {
        const { nickname, password } = this.state;
        return (
            <div className="login">
                <form onSubmit={this.handleSubmit} className="login-form">
                     <h2 className="form-signin-heading">Please sign in</h2>
                     <label htmlFor="nickname">
                         <h2>Got a nickname?</h2>
                     </label>
                     <input
                         ref={(input) => {this.textInput = input}} //??
                         type="text"
                         name="nickname"
                         id = "nickname"
                         value={nickname}
                         onChange={this.handleChange}
                         placeholder={'YourUsername'}
                         required />
                     <label htmlFor="inputPassword"><h2>Password</h2></label>
                     <input
                         ref={(input) => {this.textInput = input}} //??
                         type="password"
                         name='password'
                         id = "password"
                         value={password}
                         onChange={this.handleChange}
                         placeholder={'Password'}
                         required/>
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Login</button>
                    <p>
                        Not a member? <Link to="/register"><span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Register here</Link>
                    </p>
                </form>
            </div>
        );
    }
}

export default Login;