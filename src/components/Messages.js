import React, { Component } from 'react';
import moment from 'moment';

export default class Messages extends Component {
    constructor(props) {
        super(props);

        this.scrollDown = this.scrollDown.bind(this)
    }

    scrollDown(){
        const { container } = this.refs;
        container.scrollTop = container.scrollHeight
    }

    componentDidMount() {
        this.scrollDown()
    }

    componentDidUpdate(prevProps, prevState) {
        this.scrollDown()
    }

    render() {
        const { messages, user, typingUsers, data } = this.props;
        return (
            <div ref='container'
                 className="thread-container">

                <div className="thread">
                    <div>{data.map((data)=>{
                        return( <div
                                key={data._id}
                                className={`message-container ${data.sender === user.name && 'right'}`}
                            >
                                <div className="time">{moment.duration(moment(data.date).diff(moment())).humanize(true)}</div>
                                <div className="data">
                                    <div className="message">{data.message}</div>
                                    <div className="name">{data.sender}</div>
                                </div>
                            </div>
                        )
                    })}</div>
                    {
                        messages.map((mes)=>{
                            return (
                                <div
                                    key={mes.id}
                                    className={`message-container ${mes.sender === user.name && 'right'}`}
                                >
                                    <div className="time">{moment.duration(moment(mes.date).diff(moment())).humanize(true)}</div>
                                    <div className="data">
                                        <div className="message">{mes.message}</div>
                                        <div className="name">{mes.sender}</div>
                                    </div>
                                </div>

                            )
                        })
                    }
                    {
                        typingUsers.map((name)=>{
                            return (
                                <div key={name} className="typing-user">
                                    {`${name} is typing . . .`}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}