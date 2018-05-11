import React, { Component } from 'react';
import axios from 'axios'
import {VERIFY_USER} from '../Events';

class LoginForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            nickname:"",
            error:""
        };
    }

    setUser = ({user, isUser}) => {
        console.log(user, isUser);
        if(isUser){
            this.setError("Username is already exists")
        } else{
            this.props.setUser(user);
            this.setError("")
        }
    };

    setError = (error) =>{
        this.setState({error})
    };

    handleSubmit = (e) =>{
        e.preventDefault();
        const {socket} = this.props;
        const {nickname} = this.state;
        socket.emit(VERIFY_USER, nickname, this.setUser);
        axios.post('/',{
            name:nickname
        })
        .then(response => {
            console.log(response);
            if(response.data){
                console.log('successfull signup');
                //this.setUser;
            }
            else {
                console.log("signup error");
            }
        })
    };

    handleChange = (e) =>{
        this.setState({nickname:e.target.value})
    };


    render() {
        const{nickname, error} = this.state;
        return (
            <div className="login">
                <form onSubmit={this.handleSubmit} className="login-form">
                    <label htmlFor="nickname">
                        <h2>Got a nickname?</h2>
                    </label>
                    <input
                        ref={(input) => {this.textInput = input}} //??
                        type="text"
                        id = "nickname"
                        value={nickname}
                        onChange={this.handleChange}
                        placeholder={'YourUsername'}
                        />
                    <div className="error">{error ? error:null}</div>
                </form>
            </div>
        );
    }
}
export default LoginForm;