import React, { Component } from 'react';
import { toast } from 'react-toastify';
import fetcher from '../../fetchFunctions';

import SubMenu from '../common/SubMenu';
import MessageTableElement from '../messages/MessageTableEl';

const MESSAGES_ENDPOINT = 'messages/all';
const MESSAGES_READ_ENDPOINT = 'messages/read';

export default class MyMessages extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: []
        }

        this.fetchMessages = this.fetchMessages.bind(this);
        this.readMessage = this.readMessage.bind(this);
    }

    componentDidMount() {
        this.fetchMessages();
    }

    fetchMessages () {
        fetcher.get(MESSAGES_ENDPOINT, res => {
            if (res.err) {
                toast.error(res.err);
                return;
            }

            this.setState({
                messages: res.messages
            });
        });
    }

    readMessage (id) {
        let body ={
            id
        };

        fetcher.post(MESSAGES_READ_ENDPOINT, body, res => {
            if (res.error) {
                toast.error(res.err);

                return;
            }

            toast.info(res.message);
            this.fetchMessages();
        })
    }

    render() {
        return (
            <div className="container">
                <SubMenu />
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>N</th>
                                <th>Message</th>
                                <th>Sender</th>
                                <th>Recipient</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.messages.map((message, index) => <MessageTableElement {...message} key={index + 1} index={index+1} readMessage={this.readMessage}/>)}
                        </tbody>
                        </table>
                    </div>
            </div>
        )
    }
}