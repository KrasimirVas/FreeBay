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
            <div className="row">
                <form className="col-md-8" onSubmit={this.handleSubmit}>
                    <div className="form-group text-left">
                        <label htmlFor="message"><b>Contact Seller</b></label>
                        <textarea onChange={this.handleChange} rows="6" cols="20" className="form-control" placeholder="Your message.." name="message" id="message" value={this.state.message} required />
                    </div>
                        <input type="submit" className="btn btn-success text-left" value="Send Message" />
                </form>
            </div>
        )
    }
}