import React, { Component } from 'react';
import axios from 'axios';
class Create extends Component {

    constructor() {
        super();
        this.state = {
            nickname: '',
            password: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        const {nickname,password} = this.state;
        //socket.emit(VERIFY_USER, nickname, this.setUser);
        axios.post('http://localhost:3231/register', { nickname, password })
            .then((result) => {
                this.props.history.push("/login")
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
                    <h2 className="form-signin-heading">Register</h2>
                    <label htmlFor="nickname">
                        <h2>Write a nickname</h2>
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
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>

                </form>
            </div>
        );
    }
}

export default Create;