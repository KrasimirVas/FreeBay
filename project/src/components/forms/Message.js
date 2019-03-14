import React, { Component } from 'react';

export default class Message extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: ''
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        this.setState({[event.target.name] : event.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();

        let body = {
            message: this.state.message
        }

        this.props.sendMessage(body);
        this.setState({message : ''});
    }
    render () {
        return (
            <div className="messageForm">
                <form onSubmit={this.handleSubmit}>
                    <div className="message">
                        <label htmlFor="message"><b>Contact Owner</b></label>
                        <br/>
                        <textarea onChange={this.handleChange} rows="6" cols="20"  placeholder="Write your message here..." name="message" id="message" value={this.state.message} required />
                    </div>
                        <input type="submit"  value="Send " />
                </form>
            </div>
        )
    }
}