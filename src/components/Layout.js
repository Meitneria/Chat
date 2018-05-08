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
        this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
    }

    loadMessagesFromServer(){

        axios.get(this.props.url)
            .then(res => {
                this.setState({ data: res.data });
            })
    }
    handleMessageSubmit(message) {
        let messages = this.state.data;
        let newMessages = messages.concat([message]);
        this.setState({ data: newMessages });
        axios.post(this.props.url, message)
            .catch(err => {
                console.error(err);
                this.setState({ data: messages });
            });
    }
    componentDidMount() {
        this.loadMessagesFromServer();
        setInterval(this.loadMessageFromServer, this.props.pollInterval);
    }

    componentWillMount(){
        this.initSocket()
    }

    initSocket = () => {
        const socket = io(socketUrl);
        socket.on('connect', ()=>{
            console.log("Connected");
        });
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
                                       onMessageSubmit = {this.handleMessageSubmit}/>
                }



            </div>
        );
    }
}

export default Layout;