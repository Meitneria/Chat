import React, {Component} from 'react';

export default class MessageInput extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: "",
            isTyping: false,
            sender: this.props.user.name
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.sendMessage();
        const {message, sender} = this.state;


        fetch('http://localhost:3231/api/messages', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({message, sender}),
        })
            .then(res => res.json())
            .then(res => {
                if (!res.success) return this.setState({error: res.error.message || res.error});
                this.setState({message: ''});
            });
    };

    sendMessage = () => {
        this.props.sendMessage(this.state.message)
    };

    componentWillUnmount() {
        this.stopCheckingTyping()
    }

    sendTyping = () => {
        this.lastUpdateTime = Date.now();
        if (!this.state.isTyping) {
            this.setState({isTyping: true});
            this.props.sendTyping(true);
            this.startCheckingTyping()
        }
    };

    startCheckingTyping = () => {
        this.typingInterval = setInterval(() => {
            if ((Date.now() - this.lastUpdateTime) > 300) {
                this.setState({isTyping: false});
                this.stopCheckingTyping()
            }
        }, 300)
    };

    stopCheckingTyping = () => {
        if (this.typingInterval) {
            clearInterval(this.typingInterval);
            this.props.sendTyping(false)
        }
    };

    render() {
        const {message} = this.state;
        return (
            <div className="message-input">
                <form
                    onSubmit={this.handleSubmit}
                    className="message-form">

                    <input
                        id="message"
                        ref={"messageinput"}
                        type="text"
                        className="form-control"
                        value={message}
                        autoComplete={'off'}
                        placeholder="Type something interesting"
                        onKeyUp={e => {
                            e.keyCode !== 13 && this.sendTyping()
                        }}
                        onChange={
                            ({target}) => {
                                this.setState({message: target.value})
                            }
                        }
                    />
                    <button
                        disabled={message.length < 1}
                        type="submit"
                        className="send"

                    > Send
                    </button>
                </form>
            </div>
        );
    }
}