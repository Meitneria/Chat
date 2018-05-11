import React, { Component } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import {USER_CONNECTED, LOGOUT} from "../Events";
import LoginForm from './LoginForm'
import ChatContainer from './ChatContainer'

const socketUrl ="http://172.16.6.209:3231";
class Layout extends Component {
    constructor(props){
        super(props);
        this.state = {
            socket: null,
            user: null,
            data:[]
        };
    this.loadMessagesFromServer = this.loadMessagesFromServer.bind(this);
    }

    loadMessagesFromServer(){
        axios.get(this.props.url)
            .then(res => this.setState({ data: res.data }));
    }

    componentDidMount() {
        this.loadMessagesFromServer();
    }

    componentWillMount(){
        this.initSocket()
    }

    initSocket = () => {
        const socket = io(socketUrl);
        this.setState({socket});
    };

    setUser = (user) =>{
        const {socket} = this.state;
        socket.emit(USER_CONNECTED, user);
        this.setState({user});
    };

    logout = () =>{
        const {socket} = this.state;
        socket.emit(LOGOUT);
        this.setState({user:null});
    };

    render() {
        const {socket, user, data} = this.state;
        return (
            <div className="container">
                {
                    !user ?
                        <LoginForm socket={socket} setUser={this.setUser} />
                        :
                        <ChatContainer socket={socket}
                                       user={user}
                                       logout={this.logout}
                                       data = {data}
                        />
                }
            </div>
        );
    }
}

export default Layout;